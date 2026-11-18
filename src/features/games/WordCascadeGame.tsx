import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Shield,
  Trophy,
  Flame,
  Zap,
  Gauge,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface FallingWord {
  id: number;
  text: string;
  typedChars: string;
  x: number; // Percentage 8% to 83%
  y: number; // Percentage -5% to 100%
  speed: number;
}

interface ScoreBurst {
  id: number;
  text: string;
  x: number;
  y: number;
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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      osc.frequency.setValueAtTime(540, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
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
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
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

  playLevelUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(880, now + 0.16); // A5
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
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
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
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
      return parseInt(
        localStorage.getItem('cts_cascade_highscore') ||
          localStorage.getItem('typefast_cascade_highscore') ||
          '0',
        10
      );
    }
    return 0;
  });
  const [shields, setShields] = useState(3);
  const [streak, setStreak] = useState(0);
  const [wordsDestroyed, setWordsDestroyed] = useState(0);
  const [wave, setWave] = useState(1);
  const [velocity, setVelocity] = useState(1.0);
  const [waveBanner, setWaveBanner] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [scoreBursts, setScoreBursts] = useState<ScoreBurst[]>([]);

  // Simulation state refs to eliminate React state race conditions during 60 FPS loop
  const wordsRef = useRef<FallingWord[]>([]);
  const targetWordIdRef = useRef<number | null>(null);
  const nextWordIdRef = useRef(1);
  const lastSpawnTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef(0);
  const gameStartTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const shieldsRef = useRef(3);
  const wordsDestroyedRef = useRef(0);
  const currentWaveRef = useRef(1);

  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Difficulty base presets
  const diffConfig = {
    cadet: { speedMult: 0.8, spawnInterval: 2200 },
    pilot: { speedMult: 1.0, spawnInterval: 1750 },
    ace: { speedMult: 1.35, spawnInterval: 1300 },
  }[difficulty];

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    synth.enabled = next;
  };

  // Fullscreen actions
  const enterFullscreen = useCallback(() => {
    if (typeof document === 'undefined') return;
    const el = gameContainerRef.current;
    if (el?.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        setIsFullscreen(true);
      });
    } else {
      setIsFullscreen(true);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (typeof document === 'undefined') return;
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen || (typeof document !== 'undefined' && document.fullscreenElement)) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Synchronize fullscreen state and Esc key
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    window.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullscreen, exitFullscreen]);

  // Spawn a new falling word into wordsRef
  const spawnWord = useCallback(() => {
    if (wordsRef.current.length >= 6) return; // Prevent overcrowding

    const wordText = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
    const xPos = Math.floor(Math.random() * 75) + 8; // 8% to 83% width
    const baseSpeed = (11 + Math.random() * 4) * diffConfig.speedMult; // % per second

    const newWord: FallingWord = {
      id: nextWordIdRef.current++,
      text: wordText,
      typedChars: '',
      x: xPos,
      y: -5,
      speed: baseSpeed,
    };

    wordsRef.current = [...wordsRef.current, newWord];
    setFallingWords([...wordsRef.current]);
  }, [diffConfig.speedMult]);

  // Start game with automatic fullscreen
  const startGame = useCallback(() => {
    enterFullscreen();

    const now = performance.now();
    gameStartTimeRef.current = now;
    lastSpawnTimeRef.current = now;
    lastTickTimeRef.current = now;

    scoreRef.current = 0;
    streakRef.current = 0;
    shieldsRef.current = 3;
    wordsDestroyedRef.current = 0;
    currentWaveRef.current = 1;
    wordsRef.current = [];
    targetWordIdRef.current = null;
    nextWordIdRef.current = 1;

    setScore(0);
    setShields(3);
    setStreak(0);
    setWordsDestroyed(0);
    setWave(1);
    setVelocity(1.0);
    setWaveBanner(null);
    setFallingWords([]);
    setScoreBursts([]);
    setGameState('playing');
  }, [enterFullscreen]);

  // Process a typed character with guaranteed synchronous word destruction
  const processKey = useCallback(
    (pressedKey: string) => {
      const currentWords = wordsRef.current;
      if (currentWords.length === 0) return;

      let target = currentWords.find((w) => w.id === targetWordIdRef.current);

      // If no active target, acquire lowest matching word starting with pressedKey
      if (!target) {
        const candidates = currentWords.filter((w) => w.text.startsWith(pressedKey));
        if (candidates.length > 0) {
          // Sort by highest y (closest to bottom)
          candidates.sort((a, b) => b.y - a.y);
          target = candidates[0];
          targetWordIdRef.current = target.id;
        }
      }

      if (!target) {
        // Missed keypress
        streakRef.current = 0;
        setStreak(0);
        return;
      }

      // Check expected character
      const expectedChar = target.text[target.typedChars.length]?.toLowerCase();

      if (pressedKey === expectedChar) {
        const nextTyped = target.typedChars + target.text[target.typedChars.length];

        // CHECK IF COMPLETED (Including the LAST letter!)
        if (nextTyped.length === target.text.length) {
          // Play success chime
          synth.playWordSuccess();

          // Calculate score & multiplier
          streakRef.current += 1;
          const currentStreak = streakRef.current;
          const multiplier = Math.min(5, 1 + Math.floor(currentStreak / 5));
          const earnedPoints = target.text.length * 20 * multiplier;

          scoreRef.current += earnedPoints;
          wordsDestroyedRef.current += 1;

          const destroyedCount = wordsDestroyedRef.current;
          const newScore = scoreRef.current;
          setScore(newScore);
          setStreak(currentStreak);
          setWordsDestroyed(destroyedCount);

          // Check Wave Level Up (every 7 words destroyed increases wave!)
          const newWave = 1 + Math.floor(destroyedCount / 7);
          if (newWave > currentWaveRef.current) {
            currentWaveRef.current = newWave;
            setWave(newWave);
            synth.playLevelUp();
            setWaveBanner(`WAVE ${newWave}: SPEED ESCALATING!`);
            setTimeout(() => {
              setWaveBanner(null);
            }, 1600);
          }

          if (newScore > highScore) {
            setHighScore(newScore);
            if (typeof window !== 'undefined') {
              localStorage.setItem('cts_cascade_highscore', String(newScore));
            }
          }

          // Trigger visual score burst
          const burstId = Date.now() + Math.random();
          const burstX = target.x;
          const burstY = Math.max(10, target.y);
          setScoreBursts((b) => [
            ...b,
            { id: burstId, text: `+${earnedPoints} (${multiplier}x)`, x: burstX, y: burstY },
          ]);
          setTimeout(() => {
            setScoreBursts((b) => b.filter((item) => item.id !== burstId));
          }, 800);

          // SYNCHRONOUSLY DESTROY WORD
          targetWordIdRef.current = null;
          wordsRef.current = wordsRef.current.filter((w) => w.id !== target.id);
          setFallingWords([...wordsRef.current]);
        } else {
          // Advance character
          synth.playKey();
          target.typedChars = nextTyped;
          wordsRef.current = wordsRef.current.map((w) =>
            w.id === target.id ? { ...w, typedChars: nextTyped } : w
          );
          setFallingWords([...wordsRef.current]);
        }
      } else {
        // Typo on active target
        streakRef.current = 0;
        setStreak(0);
      }
    },
    [highScore]
  );

  // Global Keydown Listener: catches all keys without needing focus on a specific div!
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Space or Enter shortcuts for Start/Restart
      if (e.key === ' ' || e.code === 'Space' || e.key === 'Enter') {
        if (gameState === 'idle' || gameState === 'gameover') {
          e.preventDefault();
          startGame();
          return;
        }
      }

      if (gameState !== 'playing') return;

      // Lock Space key from scrolling the page
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
      }

      // Ignore modifiers and function keys
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      e.preventDefault();
      const pressedKey = e.key.toLowerCase();
      processKey(pressedKey);
    };

    window.addEventListener('keydown', handleGlobalKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, { capture: true });
  }, [gameState, startGame, processKey]);

  // Main game loop via requestAnimationFrame with progressive speed scaling
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTickTimeRef.current) / 1000;
      lastTickTimeRef.current = currentTime;

      const elapsedSec = (currentTime - gameStartTimeRef.current) / 1000;

      // DYNAMIC PROGRESSIVE SPEED SCALING:
      // Speed gradually scales with every word destroyed (+2.5% each) and time survived (+1% per 5s)
      const wordsScale = wordsDestroyedRef.current * 0.025;
      const timeScale = Math.min(0.5, elapsedSec * 0.002);
      const dynamicMultiplier = Math.min(2.5, 1.0 + wordsScale + timeScale);

      // Dynamically tighten spawn intervals as player speeds up
      const currentSpawnInterval = Math.max(
        750,
        diffConfig.spawnInterval / (1 + wordsDestroyedRef.current * 0.018)
      );

      // Check spawn
      if (currentTime - lastSpawnTimeRef.current > currentSpawnInterval) {
        spawnWord();
        lastSpawnTimeRef.current = currentTime;
      }

      // Update positions with progressive acceleration
      let breached = false;
      const updatedWords: FallingWord[] = [];

      for (const w of wordsRef.current) {
        const currentSpeed = w.speed * dynamicMultiplier;
        const nextY = w.y + currentSpeed * delta;

        if (nextY >= 92) {
          // Word breached defense perimeter!
          breached = true;
          synth.playBreach();
          if (targetWordIdRef.current === w.id) {
            targetWordIdRef.current = null;
          }
        } else {
          updatedWords.push({ ...w, y: nextY });
        }
      }

      wordsRef.current = updatedWords;
      setFallingWords([...updatedWords]);
      setVelocity(dynamicMultiplier);

      if (breached) {
        shieldsRef.current = Math.max(0, shieldsRef.current - 1);
        streakRef.current = 0;
        setShields(shieldsRef.current);
        setStreak(0);

        if (shieldsRef.current <= 0) {
          setGameState('gameover');
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    lastTickTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, diffConfig.spawnInterval, spawnWord]);

  return (
    <div
      ref={gameContainerRef}
      className={`w-full transition-all duration-200 select-none ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen bg-slate-950 p-3 sm:p-6 flex flex-col justify-between overflow-hidden'
          : 'max-w-4xl mx-auto flex flex-col gap-4'
      }`}
    >
      {/* Game Control HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
        {/* Score, Streak & Dynamic Velocity HUD */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Score</div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
              {score.toLocaleString()}
            </div>
          </div>

          <div className="border-l border-slate-200 dark:border-surface-dark-border pl-3 sm:pl-4">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-ochre-500" />
              <span>Streak</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-ochre-600 dark:text-ochre-400">
              {streak}x
            </div>
          </div>

          <div className="border-l border-slate-200 dark:border-surface-dark-border pl-3 sm:pl-4">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-brand-500" />
              <span>Wave {wave}</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-brand-500 dark:text-brand-400 flex items-baseline gap-1">
              <span>{velocity.toFixed(1)}x</span>
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Shields Display */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-surface-dark-muted px-3 py-1.5 rounded-xl text-xs font-medium">
            <Shield className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            <div className="flex gap-1 ml-1">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i < shields ? 'bg-sage-500 shadow-sm shadow-sage-500/50' : 'bg-slate-300 dark:bg-slate-700'
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

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            type="button"
            className={`p-2 rounded-xl border transition-colors ${
              isFullscreen
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400'
                : 'border-slate-200 dark:border-surface-dark-border text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark-muted'
            }`}
            title={isFullscreen ? 'Exit full screen (Esc)' : 'Enter full screen'}
            aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Arcade Canvas / Arena */}
      <div
        className={`relative w-full rounded-2xl bg-slate-950 border-2 border-slate-800 shadow-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-crosshair font-mono ${
          isFullscreen ? 'flex-1 my-2.5 min-h-[350px]' : 'h-[480px]'
        }`}
        aria-label="Word Cascade typing game arena"
      >
        {/* Subtle Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#4a8292 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Wave Level Escalation Banner */}
        {waveBanner && (
          <div className="absolute top-1/4 left-0 right-0 text-center pointer-events-none z-30 animate-pulse">
            <span className="inline-block px-5 py-2 rounded-xl bg-brand-500/20 border border-brand-500/50 text-brand-300 font-extrabold text-base sm:text-lg tracking-wider shadow-lg shadow-brand-500/30">
              ⚡ {waveBanner}
            </span>
          </div>
        )}

        {/* Floating Score Bursts */}
        {scoreBursts.map((b) => (
          <div
            key={b.id}
            className="absolute pointer-events-none text-ochre-400 font-mono font-extrabold text-sm sm:text-base animate-bounce z-30 transition-all"
            style={{ left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%, -100%)' }}
          >
            {b.text}
          </div>
        ))}

        {/* Defense Barrier Laser Line */}
        <div className="absolute bottom-[8%] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-terracotta-500 to-transparent shadow-[0_0_8px_#b96c54]" />
        <div className="absolute bottom-[4%] left-0 right-0 text-center text-[10px] uppercase font-mono tracking-widest text-terracotta-400/90 pointer-events-none">
          Defensive Perimeter • Do Not Let Words Breach
        </div>

        {/* Falling Words with Dynamic Speed */}
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
                    ? 'bg-slate-900/95 text-white border-2 border-brand-400 shadow-[0_0_15px_rgba(74,130,146,0.6)] scale-110 z-20'
                    : 'bg-slate-900/70 text-slate-300 border border-slate-700'
                }`}
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className="text-ochre-400 underline decoration-ochre-400">{typedPart}</span>
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
              Words descend with progressive velocity. Type words before they breach your shield barrier.
              Speed escalates with each wave completed.
            </p>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Game (Auto Fullscreen)</span>
            </button>
            <div className="text-[11px] text-slate-500 mt-4">
              Difficulty: <span className="text-slate-300 capitalize">{difficulty}</span> • Progressive speed escalation
            </div>
          </div>
        )}

        {/* Game Over Modal */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-xl bg-terracotta-500/10 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Defense Perimeter Breached</h2>
            <p className="text-xs text-slate-400 mb-6">All shield energy depleted.</p>

            <div className="grid grid-cols-3 gap-2.5 max-w-sm w-full mb-6">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400 uppercase">Final Score</div>
                <div className="text-lg font-bold font-mono text-brand-400">{score.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400 uppercase">Words Hit</div>
                <div className="text-lg font-bold font-mono text-white">{wordsDestroyed}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400 uppercase">Top Wave</div>
                <div className="text-lg font-bold font-mono text-ochre-400">Wave {wave}</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again [Space / Enter]</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Controls & Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 gap-2">
        <span>Type letters to destroy targets • Velocity escalates with each wave</span>
        {isFullscreen ? (
          <button
            onClick={exitFullscreen}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono font-medium"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Fullscreen (Esc)</span>
          </button>
        ) : (
          <span className="hidden sm:inline font-mono">Press Space or Enter to restart</span>
        )}
      </div>
    </div>
  );
};
