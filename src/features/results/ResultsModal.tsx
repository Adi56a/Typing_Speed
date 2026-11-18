import React, { useState, useEffect } from 'react';
import { TypingMetrics } from '../../types';
import { getSpeedRating } from '../typing-engine/scoring';
import { saveResult, getPersonalBests } from './localHistory';
import { RotateCcw, Share2, Check, Award, ArrowRight, Target, Trophy } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface ResultsModalProps {
  metrics: TypingMetrics;
  onRestart: () => void;
  onNewTest: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({ metrics, onRestart, onNewTest }) => {
  const [copied, setCopied] = useState(false);
  const [isPersonalBest, setIsPersonalBest] = useState(false);
  const [previousBest, setPreviousBest] = useState<number>(0);
  const rating = getSpeedRating(metrics.netWPM);

  useEffect(() => {
    const bBefore = getPersonalBests();
    setPreviousBest(bBefore.bestNetWPM);
    if (metrics.netWPM > bBefore.bestNetWPM && metrics.netWPM > 0) {
      setIsPersonalBest(true);
    }
    // Save locally
    saveResult(metrics, 'words');
  }, [metrics]);

  const handleShare = async () => {
    const summaryText = `🚀 CheckTypingSpeeds Results:
• Speed: ${metrics.netWPM} Net WPM (Raw: ${metrics.grossWPM} WPM)
• Accuracy: ${metrics.accuracy}%
• Duration: ${metrics.durationSeconds}s
• Consistency: ${metrics.cpm} CPM | ${metrics.incorrectChars} errors
${isPersonalBest ? '🏆 New Personal Best!\n' : ''}Check your typing speed free at: https://checktypingspeeds.com`;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-title"
      >
        {/* Header & Speed Tier Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-surface-dark-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Test Completed
              </span>
              {isPersonalBest && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ochre-100 text-ochre-800 dark:bg-ochre-950 dark:text-ochre-300 text-[10px] font-bold">
                  <Trophy className="w-3 h-3 text-ochre-600 dark:text-ochre-400" />
                  <span>New Personal Best!</span>
                </span>
              )}
            </div>
            <h2 id="results-title" className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Your Typing Results
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
            <Award className="w-4 h-4 text-brand-500" />
            <span>
              {rating.level} ({rating.percentile})
            </span>
          </div>
        </div>

        {/* Primary Hero Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Net WPM */}
          <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-500/30 flex flex-col items-center text-center">
            <span className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Net Speed</span>
            <div className="text-4xl font-black font-mono text-brand-600 dark:text-brand-400 my-1">
              {metrics.netWPM}
            </div>
            <span className="text-[11px] text-brand-600/80 dark:text-brand-400/80 font-mono font-medium">WPM</span>
          </div>

          {/* Accuracy */}
          <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border flex flex-col items-center text-center">
            <span className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Accuracy</span>
            <div className="text-4xl font-black font-mono text-slate-900 dark:text-white my-1">
              {metrics.accuracy}%
            </div>
            <span className="text-[11px] text-slate-400 font-mono">{metrics.incorrectChars} errors</span>
          </div>

          {/* Raw / Gross WPM */}
          <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border flex flex-col items-center text-center">
            <span className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Raw Speed</span>
            <div className="text-4xl font-black font-mono text-slate-900 dark:text-white my-1">
              {metrics.grossWPM}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Prev Best: {previousBest} WPM
            </span>
          </div>
        </div>

        {/* Secondary Detail Row */}
        <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-xl bg-slate-50 dark:bg-surface-dark-muted text-xs">
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Duration</div>
            <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {metrics.durationSeconds}s
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Chars</div>
            <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {metrics.totalChars}
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Correct</div>
            <div className="font-mono font-bold text-sage-600 dark:text-sage-400 mt-0.5">
              {metrics.correctChars}
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">CPM</div>
            <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {metrics.cpm}
            </div>
          </div>
        </div>

        {/* Transparent Formula & Coaching Feedback */}
        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 p-3 rounded-xl border border-slate-100 dark:border-surface-dark-border bg-slate-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
            <Target className="w-3.5 h-3.5 text-brand-500" />
            <span>Scoring Breakdown:</span>
          </div>
          <p className="leading-relaxed">
            Net WPM = Gross WPM ({metrics.grossWPM}) - Error Penalty (
            {Math.round((metrics.incorrectChars / 5 / (metrics.elapsedSeconds / 60)) * 10) / 10 || 0}) ={' '}
            <strong className="text-brand-600 dark:text-brand-400">{metrics.netWPM} WPM</strong>. {rating.feedback}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button onClick={onRestart} variant="primary" className="flex-1 sm:flex-none gap-1.5">
              <RotateCcw className="w-4 h-4" />
              <span>Retry Test</span>
            </Button>
            <Button onClick={onNewTest} variant="secondary" className="flex-1 sm:flex-none gap-1.5">
              <span>New Passage</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={handleShare} variant="outline" className="w-full sm:w-auto gap-1.5">
            {copied ? (
              <>
                <Check className="w-4 h-4 text-brand-500" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Result</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
