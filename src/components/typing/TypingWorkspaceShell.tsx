import React, { useState, useEffect } from 'react';
import { RotateCcw, Clock, Target, Gauge, Sparkles, RefreshCw } from 'lucide-react';
import { TestDuration, TestMode } from '../../types';
import { useTypingEngine } from '../../features/typing-engine/useTypingEngine';
import { ResultsModal } from '../../features/results/ResultsModal';

interface TypingWorkspaceShellProps {
  initialDuration?: TestDuration;
  initialMode?: TestMode;
}

export const TypingWorkspaceShell: React.FC<TypingWorkspaceShellProps> = ({
  initialDuration = 60,
  initialMode = 'words',
}) => {
  const [duration, setDuration] = useState<TestDuration>(initialDuration);
  const [mode, setMode] = useState<TestMode>(initialMode);
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
    punctuation: withPunctuation,
    numbers: withNumbers,
  });

  // Re-initialize when duration or mode changes
  const handleDurationChange = (d: TestDuration) => {
    setDuration(d);
    restart({ duration: d });
  };

  const handleModeChange = (m: TestMode) => {
    setMode(m);
    restart({ mode: m });
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

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Control Bar: Duration, Mode & Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
        {/* Mode & Modifiers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
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
              Quotes
            </button>
          </div>

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
        </div>

        {/* Duration Presets */}
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
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-brand-600 dark:text-brand-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Time
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {remainingSeconds}s
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Speed
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {metrics.netWPM} <span className="text-xs font-normal text-slate-400">WPM</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Accuracy
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {metrics.accuracy}%
            </div>
          </div>
        </div>
      </div>

      {/* Typing Surface: The Visual Focus */}
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

        {/* Character-by-Character Rendering */}
        <div className="font-mono text-lg sm:text-2xl sm:leading-relaxed leading-relaxed select-none tracking-wide min-h-[140px] max-h-[300px] overflow-y-auto">
          {chars.map((item, idx) => {
            if (item.status === 'correct') {
              return (
                <span key={idx} className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {item.char}
                </span>
              );
            }
            if (item.status === 'incorrect') {
              return (
                <span
                  key={idx}
                  className="text-rose-600 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-950/60 underline decoration-rose-500"
                >
                  {item.char === ' ' ? '␣' : item.char}
                </span>
              );
            }
            if (item.status === 'current') {
              return (
                <span
                  key={idx}
                  className="relative text-brand-600 dark:text-brand-400 font-bold border-b-2 border-brand-500 animate-pulse bg-brand-50 dark:bg-brand-950/40 rounded-sm"
                >
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

        {/* Start / Focus Instruction overlay banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-surface-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>
              {status === 'ready'
                ? 'Click here or begin typing on your keyboard to start test.'
                : 'Keep typing with rhythm. Accuracy builds speed.'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => restart()}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:bg-slate-100 dark:hover:bg-surface-dark-muted font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
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
