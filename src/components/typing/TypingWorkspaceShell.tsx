import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCcw,
  Clock,
  Target,
  Gauge,
  RefreshCw,
  AlertCircle,
  Maximize2,
  Minimize2,
  Keyboard as KeyboardIcon,
  Smartphone,
} from 'lucide-react';
import { TestDuration, TestMode, TestDifficulty } from '../../types';
import { useTypingEngine } from '../../features/typing-engine/useTypingEngine';
import { ResultsModal } from '../../features/results/ResultsModal';
import { VirtualKeyboard } from './VirtualKeyboard';

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('cts_show_keyboard') === 'true' ||
        localStorage.getItem('typefast_show_keyboard') === 'true'
      );
    }
    return false;
  });

  const workspaceRef = useRef<HTMLDivElement>(null);
  const passageContainerRef = useRef<HTMLDivElement>(null);
  const currentCaretRef = useRef<HTMLSpanElement>(null);

  const {
    status,
    chars,
    currentIndex,
    remainingSeconds,
    metrics,
    inputRef,
    handleKeyDown,
    handleBeforeInput,
    handleChange,
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

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsInputFocused(true);
    }
  }, [inputRef]);

  // Keep active caret visible on mobile screens when typing long passages
  useEffect(() => {
    if (currentCaretRef.current && passageContainerRef.current) {
      const container = passageContainerRef.current;
      const caret = currentCaretRef.current;
      const containerRect = container.getBoundingClientRect();
      const caretRect = caret.getBoundingClientRect();

      if (caretRect.bottom > containerRect.bottom - 36) {
        container.scrollTop += caretRect.bottom - containerRect.bottom + 36;
      } else if (caretRect.top < containerRect.top + 24) {
        container.scrollTop = Math.max(0, container.scrollTop - (containerRect.top - caretRect.top + 24));
      }
    }
  }, [currentIndex, status]);

  const handleRestart = (customOptions?: any) => {
    restart(customOptions);
    if (passageContainerRef.current) {
      passageContainerRef.current.scrollTop = 0;
    }
    focusInput();
  };

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

  const toggleKeyboard = () => {
    setShowKeyboard((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cts_show_keyboard', String(next));
      }
      return next;
    });
  };

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;

    if (!document.fullscreenElement && !isFullscreen) {
      if (workspaceRef.current?.requestFullscreen) {
        workspaceRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Synchronize fullscreen state with document events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullscreen]);

  // Keep focus on hidden input automatically without triggering forced layout reflow
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [inputRef, status, isFullscreen]);

  const durations: TestDuration[] = [15, 30, 60, 120, 300, 600];
  const difficulties: { label: string; value: TestDifficulty }[] = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];

  const currentChar = chars.find((c) => c.status === 'current')?.char || '';

  return (
    <div
      ref={workspaceRef}
      className={`w-full max-w-4xl mx-auto flex flex-col gap-4 transition-all duration-200 ${
        isFullscreen
          ? 'fixed inset-0 z-50 max-w-none bg-slate-950 text-slate-100 p-4 sm:p-8 overflow-y-auto flex justify-center items-center'
          : ''
      }`}
    >
      <div className={`w-full ${isFullscreen ? 'max-w-4xl flex flex-col gap-4' : 'flex flex-col gap-4'}`}>
        {/* Control Bar: Mode, Difficulty, Duration & View Options */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm">
          {/* Left: Mode & Difficulty Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Selector */}
            <div className="flex items-center rounded-xl bg-surface-light-muted dark:bg-surface-dark-muted p-1 text-xs font-medium">
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
            <div className="flex items-center rounded-xl bg-surface-light-muted dark:bg-surface-dark-muted p-1 text-xs font-medium">
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
                      : 'border-surface-light-border dark:border-surface-dark-border text-slate-500 hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted'
                  }`}
                >
                  Punctuation
                </button>
                <button
                  onClick={toggleNumbers}
                  className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                    withNumbers
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                      : 'border-surface-light-border dark:border-surface-dark-border text-slate-500 hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted'
                  }`}
                >
                  Numbers
                </button>
              </div>
            )}
          </div>

          {/* Right: Duration Presets & View Controls (Fullscreen + Keyboard) */}
          <div className="flex items-center gap-2">
            {/* Duration Selector */}
            <div className="flex items-center gap-1 rounded-xl bg-surface-light-muted dark:bg-surface-dark-muted p-1 text-xs font-mono font-medium">
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

            {/* View Controls: Keyboard Guide & Fullscreen */}
            <div className="flex items-center gap-1 border-l border-surface-light-border dark:border-surface-dark-border pl-2">
              <button
                onClick={toggleKeyboard}
                type="button"
                className={`hidden md:inline-flex p-2 rounded-lg border transition-all ${
                  showKeyboard
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400'
                    : 'border-surface-light-border dark:border-surface-dark-border text-slate-600 dark:text-slate-400 hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted'
                }`}
                title={showKeyboard ? 'Hide virtual keyboard guide' : 'Show virtual keyboard guide'}
                aria-label="Toggle virtual keyboard guide"
              >
                <KeyboardIcon className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullscreen}
                type="button"
                className={`p-2 rounded-lg border transition-all ${
                  isFullscreen
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400'
                    : 'border-surface-light-border dark:border-surface-dark-border text-slate-600 dark:text-slate-400 hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted'
                }`}
                title={isFullscreen ? 'Exit full screen (Esc)' : 'Enter full screen'}
                aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Metrics Header: Fully Responsive (cram-free on small mobile screens) */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
          {/* Time Remaining */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm">
            <div className="p-1.5 sm:p-2 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Clock className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider truncate">
                Time
              </div>
              <div className="text-base sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-tight">
                {remainingSeconds}s
              </div>
            </div>
          </div>

          {/* Net Speed (WPM) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm">
            <div className="p-1.5 sm:p-2 rounded-lg bg-ochre-50 dark:bg-ochre-950/40 text-ochre-600 dark:text-ochre-400">
              <Gauge className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider truncate">
                Speed
              </div>
              <div className="text-base sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-tight">
                {metrics.netWPM} <span className="text-[9px] sm:text-xs font-normal text-slate-400">WPM</span>
              </div>
            </div>
          </div>

          {/* Accuracy % */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm">
            <div className="p-1.5 sm:p-2 rounded-lg bg-sage-50 dark:bg-sage-950/40 text-sage-600 dark:text-sage-400">
              <Target className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider truncate">
                Accuracy
              </div>
              <div className="text-base sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-tight">
                {metrics.accuracy}%
              </div>
            </div>
          </div>

          {/* Errors Committed */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm">
            <div className="p-1.5 sm:p-2 rounded-lg bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-600 dark:text-terracotta-400">
              <AlertCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[11px] font-medium uppercase text-slate-500 dark:text-slate-400 tracking-wider truncate">
                Errors
              </div>
              <div className="text-base sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-tight">
                {metrics.incorrectChars}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tap-to-Type Status Pill (Visible only on mobile screens < sm) */}
        <div className="sm:hidden flex items-center justify-between px-3 py-1.5 rounded-xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200/70 dark:border-brand-800/50 text-xs">
          <div className="flex items-center gap-1.5 text-brand-800 dark:text-brand-300 font-medium">
            <Smartphone className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 flex-shrink-0" />
            <span>{isInputFocused ? 'Keyboard active • Type now' : 'Tap below to open keyboard'}</span>
          </div>
          <button
            onClick={focusInput}
            type="button"
            className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 underline underline-offset-2"
          >
            {isInputFocused ? 'Ready' : 'Tap to Type'}
          </button>
        </div>

        {/* Typing Surface: Distraction-free with Scoped Touch Input */}
        <div
          className={`rounded-2xl bg-white dark:bg-surface-dark-card border-2 p-4 sm:p-8 shadow-sm transition-all ${
            isInputFocused
              ? 'border-brand-500 ring-2 ring-brand-500/20 dark:border-brand-500'
              : 'border-surface-light-border dark:border-surface-dark-border'
          }`}
        >
          {/* Passage Container with Scoped Input Overlay */}
          <div
            onClick={focusInput}
            className="relative cursor-text"
          >
            {/* Hidden full-coverage accessible input scoped strictly to the text passage:
                - 16px font-size prevents iOS Safari auto-zoom
                - Absolute overlay guarantees native touch focus on iOS & Android
                - onBeforeInput & onChange capture virtual keyboard text & backspace */}
            <input
              ref={inputRef}
              type="text"
              className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10 text-base"
              style={{ fontSize: '16px' }}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              inputMode="text"
              enterKeyHint="done"
              aria-label="Typing test input area. Tap anywhere here to open your mobile keyboard."
              onKeyDown={handleKeyDown}
              onBeforeInput={handleBeforeInput}
              onChange={handleChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />

            {/* Character-by-Character Rendering with Modern Vertical Caret */}
            <div
              ref={passageContainerRef}
              className="font-mono text-base sm:text-2xl sm:leading-relaxed leading-relaxed select-none tracking-wide min-h-[140px] max-h-[220px] sm:max-h-[300px] overflow-y-auto"
            >
              {chars.map((item, idx) => {
                if (item.status === 'correct') {
                  return (
                    <span
                      key={idx}
                      className={
                        item.hadError
                          ? 'text-ochre-700 dark:text-ochre-400 font-medium'
                          : 'text-sage-700 dark:text-sage-400 font-medium'
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
                      className="text-terracotta-700 dark:text-terracotta-400 bg-terracotta-100/70 dark:bg-terracotta-950/70 underline decoration-terracotta-500 font-medium"
                    >
                      {item.char === ' ' ? '␣' : item.char}
                    </span>
                  );
                }
                if (item.status === 'current') {
                  return (
                    <span
                      key={idx}
                      ref={currentCaretRef}
                      className="relative text-slate-900 dark:text-white font-semibold"
                    >
                      <span className="caret-blinker" aria-hidden="true" />
                      {item.char}
                    </span>
                  );
                }
                return (
                  <span key={idx} className="text-slate-500 dark:text-slate-400">
                    {item.char}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Helper Footer: Status, Shortcuts & Reset Buttons */}
          <div className="relative z-20 mt-4 pt-3 sm:mt-6 sm:pt-4 border-t border-surface-light-border dark:border-surface-dark-border flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs">
                {status === 'ready'
                  ? 'Type the first letter to begin timer. All calculations run client-side in browser memory.'
                  : 'Maintain a steady cadence. Consistent rhythm prevents finger fatigue.'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {!isInputFocused && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    focusInput();
                  }}
                  type="button"
                  className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
                >
                  <KeyboardIcon className="w-3.5 h-3.5" />
                  <span>Open Keyboard</span>
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestart({ keepSameText: true });
                }}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-light-border dark:border-surface-dark-border hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestart({});
                }}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-light-border dark:border-surface-dark-border hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Test</span>
              </button>
            </div>
          </div>
        </div>

        {/* Optional Virtual Touch-Typing Keyboard */}
        {showKeyboard && (
          <div className="animate-in fade-in duration-200">
            <VirtualKeyboard activeChar={currentChar} />
          </div>
        )}

        {/* Fullscreen Exit Pill for quick touch/click */}
        {isFullscreen && (
          <div className="text-center">
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono font-medium"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Exit Full Screen (Esc)</span>
            </button>
          </div>
        )}
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
