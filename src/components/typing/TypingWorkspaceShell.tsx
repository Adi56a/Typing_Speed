import React, { useState } from 'react';
import { RotateCcw, Clock, Target, Gauge, Sparkles } from 'lucide-react';
import { TestDuration, TestMode } from '../../types';

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

  // Sample static passage for Phase 1 visual shell demo
  const sampleText =
    'The quick brown fox jumps over the lazy dog. Consistent practice and accurate finger placement on the home row keys develop speed naturally over time.';

  const durations: TestDuration[] = [15, 30, 60, 120, 300, 600];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Control Bar: Duration, Mode & Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
        {/* Mode & Options */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-surface-dark-muted p-1 text-xs font-medium">
            <button
              onClick={() => setMode('words')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mode === 'words'
                  ? 'bg-white dark:bg-surface-dark-card text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Words
            </button>
            <button
              onClick={() => setMode('quote')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mode === 'quote'
                  ? 'bg-white dark:bg-surface-dark-card text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Quotes
            </button>
          </div>

          {/* Modifiers */}
          <div className="hidden sm:flex items-center gap-1 text-xs">
            <button
              onClick={() => setWithPunctuation(!withPunctuation)}
              className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                withPunctuation
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'border-slate-200 dark:border-surface-dark-border text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark-muted'
              }`}
            >
              Punctuation
            </button>
            <button
              onClick={() => setWithNumbers(!withNumbers)}
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
              onClick={() => setDuration(d)}
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
              {duration}s
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
              0 <span className="text-xs font-normal text-slate-400">WPM</span>
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
              100%
            </div>
          </div>
        </div>
      </div>

      {/* Typing Surface: The Visual Centerpiece */}
      <div className="relative rounded-2xl bg-white dark:bg-surface-dark-card border-2 border-slate-200 dark:border-surface-dark-border p-6 sm:p-8 shadow-sm transition-all focus-within:border-brand-500 dark:focus-within:border-brand-500">
        {/* Distraction-Free Passage Rendering */}
        <div className="font-mono text-lg sm:text-2xl sm:leading-relaxed leading-relaxed select-none tracking-wide text-slate-400 dark:text-slate-500 min-h-[140px]">
          <span className="text-brand-600 dark:text-brand-400 font-semibold border-b-2 border-brand-500 animate-pulse">
            T
          </span>
          <span>{sampleText.slice(1)}</span>
        </div>

        {/* Start / Focus Instruction overlay banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-surface-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Click or start typing to begin test countdown automatically.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:bg-slate-100 dark:hover:bg-surface-dark-muted font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Test</span>
            </button>
            <span className="hidden md:inline text-[11px] text-slate-400 font-mono">
              [Tab + Enter]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
