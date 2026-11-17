import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Shield, Trophy, Flame, Zap } from 'lucide-react';

interface FallingWord {
  id: number;
  text: string;
  typedChars: string;
  x: number; // Percentage 5% to 85%
  y: number; // Percentage 0% to 100%
  speed: number;
}

type GameDifficulty = 'cadet' | 'pilot' | 'ace';

const WORD_POOL = [
  'fast', 'code', 'flow', 'wave', 'glow', 'type', 'grid', 'byte',
  'pulse', 'shift', 'orbit', 'focus', 'light', 'clean', 'drive', 'logic',
  'speed', 'spark', 'vector', 'matrix', 'stream', 'engine', 'atomic',
  'flight', 'cyber', 'energy', 'signal', 'photon', 'stellar', 'kinetic',
  'quantum', 'rhythm', 'dynamic', 'circuit', 'terminal', 'velocity',
  'spectrum', 'horizon', 'algorithm', 'resonance', 'precision', 'cascade',
];

// Audio synthesizer for zero-dependency sound effects
class SoundSynth {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playKey() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio not permitted or suspended
    }
  }

  playWordSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio not permitted
    }
  }

  playBreach() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio not permitted
    }
  }
}

const synth = new SoundSynth();

export const WordCascadeGame: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('pilot');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('typefast_cascade_highscore') || '0', 10);
    }
    return 0;
  });
  const [shields, setShields] = useState(3);
  const [streak, setStreak] = useState(0);
  const [wordsDestroyed, setWordsDestroyed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const targetWordIdRef = useRef<number | null>(null);
  const nextWordIdRef = useRef(1);
  const lastSpawnTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Speed and spawn configurations
  const diffConfig = {
    cadet: { speedMult: 0.7, spawnInterval: 2400 },
    pilot: { speedMult: 1.0, spawnInterval: 1800 },
    ace: { speedMult: 1.45, spawnInterval: 1300 },
  }[difficulty];

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    synth.enabled = next;
  };

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setShields(3);
    setStreak(0);
    setWordsDestroyed(0);
    setFallingWords([]);
    targetWordIdRef.current = null;
    nextWordIdRef.current = 1;
    lastSpawnTimeRef.current = performance.now();
    lastTickTimeRef.current = performance.now();
    gameAreaRef.current?.focus();
  }, []);

  // Spawn a new falling word
  const spawnWord = useCallback(() => {
    const wordText = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
    const xPos = Math.floor(Math.random() * 75) + 8; // 8% to 83% width
    const baseSpeed = (10 + Math.random() * 6) * diffConfig.speedMult; // % per second

    const newWord: FallingWord = {
      id: nextWordIdRef.current++,
      text: wordText,
      typedChars: '',
      x: xPos,
      y: -5,
      speed: baseSpeed,
    };

    setFallingWords((prev) => [...prev, newWord]);
  }, [diffConfig.speedMult]);

  // Main game loop via requestAnimationFrame
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTickTimeRef.current) / 1000;
      lastTickTimeRef.current = currentTime;

      // Check spawn
      if (currentTime - lastSpawnTimeRef.current > diffConfig.spawnInterval) {
        spawnWord();
        lastSpawnTimeRef.current = currentTime;
      }

      // Update positions
      setFallingWords((prev) => {
        let breached = false;
        const updated: FallingWord[] = [];

        for (const w of prev) {
          const nextY = w.y + w.speed * delta;
          if (nextY >= 92) {
            // Word reached defense line!
            breached = true;
            synth.playBreach();
            if (targetWordIdRef.current === w.id) {
              targetWordIdRef.current = null;
            }
          } else {
            updated.push({ ...w, y: nextY });
          }
        }

        if (breached) {
          setShields((prevShields) => {
            const nextShields = prevShields - 1;
            if (nextShields <= 0) {
              setGameState('gameover');
            }
            return Math.max(0, nextShields);
          });
          setStreak(0);
        }

        return updated;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    lastTickTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, diffConfig.spawnInterval, spawnWord]);

  // Handle typing input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameState === 'idle') {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        startGame();
      }
      return;
    }

    if (gameState === 'gameover') {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        startGame();
      }
      return;
    }

    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    const pressedKey = e.key.toLowerCase();

    setFallingWords((prev) => {
      let activeTarget = prev.find((w) => w.id === targetWordIdRef.current);

      // If no active target, find the lowest word whose next character matches
      if (!activeTarget) {
        const candidates = prev.filter((w) => w.text.startsWith(pressedKey));
        if (candidates.length > 0) {
          // Target candidate with highest y (closest to bottom)
          candidates.sort((a, b) => b.y - a.y);
          activeTarget = candidates[0];
          targetWordIdRef.current = activeTarget.id;
        }
      }

      if (!activeTarget) {
        // Missed keypress
        setStreak(0);
        return prev;
      }

      // Check next expected character of target
      const expectedChar = activeTarget.text[activeTarget.typedChars.length]?.toLowerCase();

      if (pressedKey === expectedChar) {
        synth.playKey();
        const nextTyped = activeTarget.typedChars + activeTarget.text[activeTarget.typedChars.length];

        if (nextTyped.length === activeTarget.text.length) {
          // Word completed and destroyed!
          synth.playWordSuccess();
          targetWordIdRef.current = null;

          setStreak((prevStreak) => {
            const newStreak = prevStreak + 1;
            const multiplier = Math.min(5, 1 + Math.floor(newStreak / 5));
            const earnedPoints = activeTarget.text.length * 15 * multiplier;

            setScore((s) => {
              const newScore = s + earnedPoints;
              if (newScore > highScore) {
                setHighScore(newScore);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('typefast_cascade_highscore', String(newScore));
                }
              }
              return newScore;
            });

            return newStreak;
          });

          setWordsDestroyed((c) => c + 1);

          // Remove the destroyed word
          return prev.filter((w) => w.id !== activeTarget.id);
        } else {
          // Advance character
          return prev.map((w) => (w.id === activeTarget.id ? { ...w, typedChars: nextTyped } : w));
        }
      } else {
        // Typo on active target
        setStreak(0);
        return prev;
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 select-none">
      {/* Game Control HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
        {/* Score & Combo */}
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Score</div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
              {score.toLocaleString()}
            </div>
          </div>

          <div className="border-l border-slate-200 dark:border-surface-dark-border pl-4">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500" />
              <span>Streak</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-amber-500">
              {streak}x
            </div>
          </div>

          <div className="hidden sm:block border-l border-slate-200 dark:border-surface-dark-border pl-4">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-brand-500" />
              <span>Best</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-slate-700 dark:text-slate-300">
              {highScore.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Shields & Controls */}
        <div className="flex items-center gap-3">
          {/* Shields Display */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-surface-dark-muted px-3 py-1.5 rounded-xl text-xs font-medium">
            <Shield className="w-4 h-4 text-emerald-500" />
            <div className="flex gap-1 ml-1">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i < shields ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Difficulty Tabs */}
          {gameState !== 'playing' && (
            <div className="hidden md:flex items-center rounded-xl bg-slate-100 dark:bg-surface-dark-muted p-1 text-xs font-medium">
              {(['cadet', 'pilot', 'ace'] as GameDifficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                    difficulty === d
                      ? 'bg-white dark:bg-surface-dark-card text-brand-600 dark:text-brand-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            type="button"
            className="p-2 rounded-xl border border-slate-200 dark:border-surface-dark-border text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark-muted transition-colors"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            aria-label="Toggle sound effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Arcade Canvas / Arena */}
      <div
        ref={gameAreaRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative w-full h-[460px] rounded-2xl bg-slate-950 border-2 border-slate-800 shadow-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-crosshair font-mono"
        aria-label="Word Cascade typing game arena"
      >
        {/* Subtle Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Defense Barrier Laser Line */}
        <div className="absolute bottom-[8%] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_8px_#f43f5e]" />
        <div className="absolute bottom-[4%] left-0 right-0 text-center text-[10px] uppercase font-mono tracking-widest text-rose-500/80 pointer-events-none">
          Defensive Perimeter • Do Not Let Words Breach
        </div>

        {/* Falling Words */}
        {gameState === 'playing' &&
          fallingWords.map((word) => {
            const isTarget = targetWordIdRef.current === word.id;
            const typedPart = word.text.slice(0, word.typedChars.length);
            const remainingPart = word.text.slice(word.typedChars.length);

            return (
              <div
                key={word.id}
                className={`absolute px-2.5 py-1 rounded-lg text-sm sm:text-base font-bold transition-transform duration-75 ${
                  isTarget
                    ? 'bg-slate-900/90 text-white border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110 z-20'
                    : 'bg-slate-900/70 text-slate-300 border border-slate-700'
                }`}
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className="text-emerald-400 underline decoration-emerald-400">{typedPart}</span>
                <span className={isTarget ? 'text-white' : 'text-slate-300'}>{remainingPart}</span>
              </div>
            );
          })}

        {/* Idle Start Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4 shadow-lg shadow-brand-500/20">
              <Zap className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Word Cascade: Kinetic Defense</h2>
            <p className="max-w-md text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Words descend from above. Type their letters to vaporize them before they cross your defensive perimeter.
              Consecutive words build combo multipliers.
            </p>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Game [Space / Enter]</span>
            </button>
            <div className="text-[11px] text-slate-500 mt-4">
              Difficulty: <span className="text-slate-300 capitalize">{difficulty}</span> • Synthesizer audio enabled
            </div>
          </div>
        )}

        {/* Game Over Modal */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Defense Perimeter Breached</h2>
            <p className="text-xs text-slate-400 mb-6">All shield energy depleted.</p>

            <div className="grid grid-cols-2 gap-3 max-w-xs w-full mb-6">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400 uppercase">Final Score</div>
                <div className="text-xl font-bold font-mono text-emerald-400">{score.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400 uppercase">Words Destroyed</div>
                <div className="text-xl font-bold font-mono text-white">{wordsDestroyed}</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again [Space]</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Click the arena to focus • Type matching letters to acquire target</span>
        <span className="hidden sm:inline font-mono">Press Space or Enter to restart</span>
      </div>
    </div>
  );
};
