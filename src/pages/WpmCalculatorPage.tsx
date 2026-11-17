import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { calculateTypingMetrics, getSpeedRating } from '../features/typing-engine/scoring';
import { Calculator, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

interface WpmCalculatorPageProps {
  onNavigate?: (path: string) => void;
}

export const WpmCalculatorPage: React.FC<WpmCalculatorPageProps> = ({ onNavigate }) => {
  const [totalChars, setTotalChars] = useState<number>(300);
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(0);
  const [errors, setErrors] = useState<number>(3);

  const elapsedMs = Math.max(1000, (minutes * 60 + seconds) * 1000);
  const correctChars = Math.max(0, totalChars - errors);

  const metrics = calculateTypingMetrics({
    totalCharsTyped: totalChars,
    correctChars,
    incorrectChars: errors,
    elapsedMs,
    durationSeconds: minutes * 60 + seconds,
  });

  const rating = getSpeedRating(metrics.netWPM);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">Interactive Tool</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Interactive Words Per Minute (WPM) Calculator
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Calculate your Gross WPM, Net WPM, Accuracy, and CPM from any typing test or exam text passage.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Input Form */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-surface-dark-border pb-3">
            <Calculator className="w-5 h-5 text-brand-500" />
            <span>Enter Your Test Values</span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Total Keystrokes / Characters Typed
            </label>
            <input
              type="number"
              min={1}
              value={totalChars}
              onChange={(e) => setTotalChars(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-mono text-base focus-ring"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Includes letters, spaces, and punctuation characters.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Minutes
              </label>
              <input
                type="number"
                min={0}
                max={60}
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-mono text-base focus-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Seconds
              </label>
              <input
                type="number"
                min={0}
                max={59}
                value={seconds}
                onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-mono text-base focus-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Total Errors &amp; Mistakes Made (Including Backspaced Typos)
            </label>
            <input
              type="number"
              min={0}
              value={errors}
              onChange={(e) => setErrors(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-mono text-base focus-ring"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              In touch-typing exams and standard scoring, each missed character is counted as an error even if fixed with Backspace.
            </span>
          </div>
        </Card>

        {/* Calculated Results Card */}
        <Card className="p-6 flex flex-col justify-between bg-gradient-to-br from-white to-brand-50/30 dark:from-surface-dark-card dark:to-brand-950/20 border-brand-500/20">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-surface-dark-border pb-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Calculated Metrics
              </span>
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                {rating.level} ({rating.percentile})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Net Speed</span>
                <div className="text-4xl font-black font-mono text-brand-600 dark:text-brand-400 my-1">
                  {metrics.netWPM}
                </div>
                <span className="text-xs font-mono text-slate-400">Net WPM</span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Accuracy</span>
                <div className="text-4xl font-black font-mono text-slate-900 dark:text-white my-1">
                  {metrics.accuracy}%
                </div>
                <span className="text-xs font-mono text-slate-400">{correctChars} correct</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-lg bg-slate-100 dark:bg-surface-dark-muted font-mono">
              <div>Gross WPM: <strong>{metrics.grossWPM}</strong></div>
              <div>CPM: <strong>{metrics.cpm}</strong></div>
              <div>Time: <strong>{metrics.elapsedSeconds}s</strong></div>
              <div>Errors: <strong>{errors}</strong></div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-surface-dark-border">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/');
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <span>Take Live Typing Test Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Card>
      </div>

      {/* Educational Guide & Exam Benchmarks */}
      <div className="space-y-6">
        <Card className="p-6 text-sm text-slate-700 dark:text-slate-300 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <span>How the WPM Formula Works</span>
          </h2>
          <p className="leading-relaxed">
            In touch-typing measurement, speed is standardized across different passage complexities by defining{' '}
            <strong>1 word = 5 characters</strong> (including spaces). This ensures tests with longer vocabulary
            do not artificially lower your measured speed compared to tests with shorter words.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark font-mono text-xs space-y-2 border border-slate-200 dark:border-surface-dark-border">
            <div>
              <strong>Gross WPM:</strong> (Total Characters Typed / 5) / Elapsed Minutes
            </div>
            <div>
              <strong>Error Penalty:</strong> (Uncorrected Errors / 5) / Elapsed Minutes
            </div>
            <div>
              <strong>Net WPM:</strong> Gross WPM - Error Penalty
            </div>
            <div>
              <strong>Accuracy %:</strong> (Correct Characters / Total Characters) * 100
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
            Common Government & Corporate Speed Benchmarks
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>SSC CGL / CHSL (India):</strong> 35 WPM in English (approx. 10,500 KDPH key depressions per hour) or 30 WPM in Hindi, with $\le 5\%$ error margin.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Court & Legal Transcription:</strong> 60 to 80+ Net WPM with 98% accuracy.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>General Office & Administrative:</strong> 40 to 50 Net WPM.
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

