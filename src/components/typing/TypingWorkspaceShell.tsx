import React, { useState, useEffect } from 'react';
import { RotateCcw, Clock, Target, Gauge, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { TestDuration, TestMode, TestDifficulty } from '../../types';
import { useTypingEngine } from '../../features/typing-engine/useTypingEngine';
import { ResultsModal } from '../../features/results/ResultsModal';

interface TypingWorkspaceShellProps {
  initialDuration?: TestDuration;
  initialMode?: TestMode;
  initialDifficulty?: TestDifficulty;
}

export const TypingWorkspaceShell: React.FC<TypingWorkspaceShellProps> = ({
  initialDuration = 60,
  initialMode = 'words',
  initialDifficulty = 'medium',
}) => {
  const [duration, setDuration] = useState<TestDuration>(initialDuration);
  const [mode, setMode] = useState<TestMode>(initialMode);
  const [difficulty, setDifficulty] = useState<TestDifficulty>(initialDifficulty);
  const [withPunctuation, setWithPunctuation] = useState(false);
  const [withNumbers, setWithNumbers] = useState(false);

  const {
    status,
    chars,
    remainingSeconds,
    metrics,
    inputRef,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
    restart,
  } = useTypingEngine({
    duration,
    mode,
    difficulty,
    punctuation: withPunctuation,
    numbers: withNumbers,
  });

  // Re-initialize when duration, mode or difficulty changes
  const handleDurationChange = (d: TestDuration) => {
    setDuration(d);
    restart({ duration: d });
  };

  const handleModeChange = (m: TestMode) => {
    setMode(m);
    restart({ mode: m });
  };

  const handleDifficultyChange = (diff: TestDifficulty) => {
    setDifficulty(diff);
    restart({ difficulty: diff });
  };

  const togglePunctuation = () => {
    const next = !withPunctuation;
    setWithPunctuation(next);
    restart({ punctuation: next });
  };

  const toggleNumbers = () => {
    const next = !withNumbers;
    setWithNumbers(next);
    restart({ numbers: next });
  };

  // Keep focus on input automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, status]);

  const durations: TestDuration[] = [15, 30, 60, 120, 300, 600];
  const difficulties: { label: string; value: TestDifficulty }[] = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      {/* Control Bar: Mode, Difficulty, Modifiers & Duration */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
        {/* Left: Mode & Difficulty Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Selector */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-surface-dark-muted p-1 text-xs font-medium">
            <button
              onClick={() => handleModeChange('words')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mode === 'words'
                  ? 'bg-white dark:bg-surface-dark-card text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Words
            </button>
            <button
              onClick={() => handleModeChange('quote')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mode === 'quote'
                  ? 'bg-white dark:bg-surface-dark-card text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Statements
            </button>
          </div>

          {/* Difficulty Selector: Easy / Medium / Hard */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-surface-dark-muted p-1 text-xs font-medium">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => handleDifficultyChange(diff.value)}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  difficulty === diff.value
                    ? 'bg-white dark:bg-surface-dark-card text-brand-600 dark:text-brand-400 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={`Set difficulty to ${diff.label}`}
              >
                {diff.label}
              </button>
            ))}
          </div>

          {/* Modifiers (Punctuation / Numbers) */}
          {mode === 'words' && (
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <button
                onClick={togglePunctuation}
                className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                  withPunctuation
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                    : 'border-slate-200 dark:border-surface-dark-border text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark-muted'
                }`}
              >
                Punctuation
              </button>
              <button
                onClick={toggleNumbers}
                className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                  withNumbers
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                    : 'border-slate-200 dark:border-surface-dark-border text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark-muted'
                }`}
              >
                Numbers
              </button>
            </div>
          )}
        </div>

        {/* Right: Duration Presets */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-surface-dark-muted p-1 text-xs font-mono font-medium">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => handleDurationChange(d)}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                duration === d
                  ? 'bg-brand-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {d >= 60 ? `${d / 60}m` : `${d}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Live Stats Header */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {/* Time Remaining */}
        <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-brand-600 dark:text-brand-400">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Time
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {remainingSeconds}s
            </div>
          </div>
        </div>

        {/* Net Speed (WPM) */}
        <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Speed
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {metrics.netWPM} <span className="text-[10px] sm:text-xs font-normal text-slate-400">WPM</span>
            </div>
          </div>
        </div>

        {/* Accuracy % */}
        <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Accuracy
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {metrics.accuracy}%
            </div>
          </div>
        </div>

        {/* Errors Committed */}
        <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Errors
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {metrics.incorrectChars}
            </div>
          </div>
        </div>
      </div>

      {/* Typing Surface: Distraction-free with Sleek Vertical Caret Blinker */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="relative rounded-2xl bg-white dark:bg-surface-dark-card border-2 border-slate-200 dark:border-surface-dark-border p-6 sm:p-8 shadow-sm transition-all focus-within:border-brand-500 dark:focus-within:border-brand-500 cursor-text"
      >
        {/* Hidden accessible input for mobile keyboards and key capture */}
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          aria-label="Typing test input area"
        />

        {/* Character-by-Character Rendering with Modern Vertical Caret */}
        <div className="font-mono text-lg sm:text-2xl sm:leading-relaxed leading-relaxed select-none tracking-wide min-h-[140px] max-h-[300px] overflow-y-auto">
          {chars.map((item, idx) => {
            if (item.status === 'correct') {
              return (
                <span
                  key={idx}
                  className={
                    item.hadError
                      ? 'text-amber-600 dark:text-amber-400 font-medium'
                      : 'text-emerald-600 dark:text-emerald-400 font-medium'
                  }
                  title={item.hadError ? 'Corrected typo' : undefined}
                >
                  {item.char}
                </span>
              );
            }
            if (item.status === 'incorrect') {
              return (
                <span
                  key={idx}
                  className="text-rose-600 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-950/60 underline decoration-rose-500 font-medium"
                >
                  {item.char === ' ' ? '␣' : item.char}
                </span>
              );
            }
            if (item.status === 'current') {
              return (
                <span
                  key={idx}
                  className="relative text-slate-900 dark:text-white font-semibold"
                >
                  {/* Sleek, professional vertical blinking caret */}
                  <span className="caret-blinker" aria-hidden="true" />
                  {item.char}
                </span>
              );
            }
            return (
              <span key={idx} className="text-slate-400 dark:text-slate-600">
                {item.char}
              </span>
            );
          })}
        </div>

        {/* Helper Footer: Status, Shortcuts & Reset */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-surface-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span>
              {status === 'ready'
                ? 'Begin typing to start timer. Typos corrected with backspace are tracked for true accuracy.'
                : 'Maintain smooth rhythm. Quality finger placement delivers effortless speed.'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => restart()}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:bg-slate-100 dark:hover:bg-surface-dark-muted font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <button
              onClick={() => restart({})}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:bg-slate-100 dark:hover:bg-surface-dark-muted font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Text</span>
            </button>
            <span className="hidden md:inline text-[11px] text-slate-400 font-mono">[Esc to reset]</span>
          </div>
        </div>
      </div>

      {/* Completion Results Modal */}
      {status === 'completed' && (
        <ResultsModal
          metrics={metrics}
          onRestart={() => restart()}
          onNewTest={() => restart({})}
        />
      )}
    </div>
  );
};
