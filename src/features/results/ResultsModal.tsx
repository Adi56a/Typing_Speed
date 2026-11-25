import React, { useState, useEffect } from 'react';
import { TypingMetrics } from '../../types';
import { getSpeedRating } from '../typing-engine/scoring';
import { saveResult, getPersonalBests } from './localHistory';
import { RotateCcw, Share2, Check, Award, Trophy, RefreshCw, Linkedin } from 'lucide-react';
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
  const [showShareOptions, setShowShareOptions] = useState(false);
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

  const durationMinutes = Math.round(metrics.durationSeconds / 60);
  const durationText = durationMinutes >= 1 ? `${durationMinutes}-minute` : `${metrics.durationSeconds}-second`;
  const shareText = `I typed ${metrics.netWPM} WPM with ${metrics.accuracy}% accuracy on a ${durationText} typing test. Can you beat me?`;
  const shareUrl = `https://checktypingspeeds.com/r/?w=${metrics.netWPM}&a=${metrics.accuracy}&d=${metrics.durationSeconds}`;

  const handleShare = async () => {
    // Native mobile share sheet (iOS Safari & Android Chrome)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'CheckTypingSpeeds - My Typing Speed Result',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled share or failed, proceed to desktop popover
      }
    }
    setShowShareOptions((prev) => !prev);
  };

  const handleCopyLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {}
    }
  };

  const isCertEligible = metrics.durationSeconds >= 180 && metrics.accuracy >= 90;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5"
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

        {/* Certificate CTA when duration >= 180s and accuracy >= 90% */}
        {isCertEligible && (
          <div className="p-3.5 rounded-xl bg-ochre-50/80 dark:bg-ochre-950/40 border border-ochre-300 dark:border-ochre-800 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-ochre-600 dark:text-ochre-400 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  You qualified for an Official Certificate!
                </span>{' '}
                <span className="text-slate-500 dark:text-slate-400">
                  ({metrics.netWPM} WPM · {metrics.accuracy}% Acc)
                </span>
              </div>
            </div>
            <a
              href={`/certificate/?w=${metrics.netWPM}&a=${metrics.accuracy}&d=${metrics.durationSeconds}`}
              className="px-3 py-1.5 rounded-lg bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap"
            >
              Claim Certificate →
            </a>
          </div>
        )}

        {/* Share Options Drawer */}
        {showShareOptions && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border space-y-3 animate-in fade-in">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Share your score link:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 flex items-center gap-1.5 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-black text-white hover:bg-slate-800 flex items-center gap-1.5 shadow-xs"
              >
                <span>X / Twitter</span>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] flex items-center gap-1.5 shadow-xs"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#0077b5] text-white hover:bg-[#006396] flex items-center gap-1.5 shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              onClick={onRestart}
              variant="primary"
              className="flex-1 sm:flex-none gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Test</span>
            </Button>
            <Button
              type="button"
              onClick={onNewTest}
              variant="secondary"
              className="flex-1 sm:flex-none gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Test</span>
            </Button>
          </div>

          <Button onClick={handleShare} variant="outline" className="w-full sm:w-auto gap-1.5">
            <Share2 className="w-4 h-4" />
            <span>Share My Score</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
