import React, { useState, useEffect } from 'react';
import { TypingMetrics } from '../../types';
import { getSpeedRating } from '../typing-engine/scoring';
import { saveResult, getPersonalBests } from './localHistory';
import { RotateCcw, Share2, Check, Award, ArrowRight, Trophy, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TypingCertificateModal } from './TypingCertificateModal';

export interface ResultsModalProps {
  metrics: TypingMetrics;
  onRestart: () => void;
  onNewTest: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({ metrics, onRestart, onNewTest }) => {
  const [copied, setCopied] = useState(false);
  const [isPersonalBest, setIsPersonalBest] = useState(false);
  const [previousBest, setPreviousBest] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState(false);
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
• Speed: ${metrics.netWPM} Net WPM (Gross: ${metrics.grossWPM} WPM)
• Accuracy: ${metrics.accuracy}%
• Consistency: ${metrics.consistency || 95}%
• Duration: ${metrics.durationSeconds}s
${isPersonalBest ? '🏆 New Personal Best!\n' : ''}Check your typing speed free at: https://checktypingspeeds.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CheckTypingSpeeds - My Typing Result',
          text: summaryText,
          url: 'https://checktypingspeeds.com',
        });
        return;
      } catch {
        // Fallback
      }
    }

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
    <>
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
              <span className="text-[11px] text-slate-400 font-mono">{metrics.incorrectChars} typos</span>
            </div>

            {/* Raw / Gross WPM */}
            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border flex flex-col items-center text-center">
              <span className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Gross Speed</span>
              <div className="text-4xl font-black font-mono text-slate-900 dark:text-white my-1">
                {metrics.grossWPM}
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Prev Best: {previousBest} WPM
              </span>
            </div>
          </div>

          {/* Secondary Detail Row: Consistency & Diagnostics */}
          <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-xl bg-slate-50 dark:bg-surface-dark-muted text-xs">
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Duration</div>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {metrics.durationSeconds}s
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Characters</div>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {metrics.totalChars}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Consistency</div>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {metrics.consistency ?? 95}%
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-semibold">CPM</div>
              <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {metrics.cpm}
              </div>
            </div>
          </div>

          {/* Weak Keys Diagnostic Feedback */}
          {metrics.weakKeys && metrics.weakKeys.length > 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-xs">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>Tricky Keys to Practice:</span>
              </div>
              <div className="flex items-center gap-1.5">
                {metrics.weakKeys.map((key) => (
                  <span
                    key={key}
                    className="px-2 py-0.5 font-mono font-bold rounded bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200"
                  >
                    {key}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feedback message */}
          <p className="text-xs text-slate-600 dark:text-slate-300 text-center leading-relaxed">
            {rating.feedback}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                onClick={handleShare}
                className="w-full sm:w-auto gap-2"
                aria-label="Share your typing results"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Share Card'}</span>
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowCertificate(true)}
                className="w-full sm:w-auto gap-2"
                aria-label="View official certificate"
              >
                <FileText className="w-4 h-4 text-brand-500" />
                <span>Certificate</span>
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                onClick={onRestart}
                className="w-full sm:w-auto gap-2"
                aria-label="Retake this typing test"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake</span>
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={onNewTest}
                className="w-full sm:w-auto gap-2"
                aria-label="Start new test"
              >
                <span>Next Test</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showCertificate && (
        <TypingCertificateModal
          metrics={metrics}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </>
  );
};
