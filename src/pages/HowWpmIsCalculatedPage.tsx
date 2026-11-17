import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowWpmIsCalculatedPageProps {
  onNavigate?: (path: string) => void;
}

export const HowWpmIsCalculatedPage: React.FC<HowWpmIsCalculatedPageProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">Definitive Guide</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          How WPM Is Calculated: Formulas, Rules & Standards
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          A transparent, mathematically rigorous explanation of Gross WPM, Net WPM, CPM, and error penalty conventions.
        </p>
      </div>

      {/* Snippet / Direct Answer Box for Google & AI Engines */}
      <div className="mb-10 p-6 rounded-2xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-500/30">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-500" />
          <span>Direct Answer: How is typing speed calculated?</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          <strong>Words Per Minute (WPM)</strong> is measured by counting the total number of characters typed
          divided by 5 (the international standard word length), divided by the elapsed time in minutes.
          <strong>Net WPM</strong> then deducts uncorrected errors to reflect actual usable productivity.
        </p>
        <div className="p-3 rounded-lg bg-white dark:bg-surface-dark-card border border-brand-500/20 font-mono text-xs text-brand-700 dark:text-brand-300">
          Gross WPM = (Total Keystrokes / 5) / (Time in Seconds / 60)
          <br />
          Net WPM = max(0, Gross WPM - (Errors / 5) / (Time in Seconds / 60))
        </div>
      </div>

      {/* Deep Educational Content */}
      <div className="space-y-8">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. Why 1 Word = 5 Characters? (The Standard Word Convention)
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Words in English vary drastically in length: comparing someone typing &quot;an ox on an ax&quot; against someone typing
            &quot;electromagnetic radiation synchronization&quot; would yield vastly different raw word counts for the exact same
            finger speed.
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            To make typing speed scientific and repeatable across any text passage, typing authorities standardized
            one <strong>&quot;word&quot;</strong> as exactly <strong>5 keystrokes</strong> (including letters, spaces, and punctuation).
          </p>
        </Card>

        {/* Formula Comparison Table */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Gross WPM vs. Net WPM vs. CPM
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-surface-dark-muted text-slate-900 dark:text-white font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3 rounded-l-lg">Metric</th>
                  <th className="p-3">Formula</th>
                  <th className="p-3">What It Measures</th>
                  <th className="p-3 rounded-r-lg">Standard Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border">
                <tr>
                  <td className="p-3 font-bold text-brand-600 dark:text-brand-400">Gross WPM (Raw)</td>
                  <td className="p-3 font-mono">(Chars / 5) / Minutes</td>
                  <td className="p-3">Raw motor speed regardless of typos</td>
                  <td className="p-3">Speed tracking & drills</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Net WPM</td>
                  <td className="p-3 font-mono">Gross WPM - (Errors / 5) / Minutes</td>
                  <td className="p-3">True usable typing speed</td>
                  <td className="p-3">Employment & exams</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Accuracy %</td>
                  <td className="p-3 font-mono">(Correct / Total) * 100</td>
                  <td className="p-3">Percentage of keystrokes without errors</td>
                  <td className="p-3">Quality & certification</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400">CPM</td>
                  <td className="p-3 font-mono">Characters / Minutes</td>
                  <td className="p-3">Characters per minute (approx. WPM * 5)</td>
                  <td className="p-3">European & Asian standards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Step-by-Step Worked Example */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. Step-by-Step Worked Example
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Suppose you take a <strong>1-minute (60 seconds)</strong> typing test:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>You typed a total of <strong>350 characters</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>You made <strong>4 uncorrected errors</strong> (meaning 346 correct characters).</span>
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark space-y-2 text-xs font-mono">
            <div>Step 1: Gross WPM = (350 / 5) / 1 = <strong>70 WPM</strong></div>
            <div>Step 2: Error penalty = (4 / 5) / 1 = <strong>0.8 WPM</strong></div>
            <div>Step 3: Net WPM = 70 - 0.8 = <strong>69.2 Net WPM</strong></div>
            <div>Step 4: Accuracy = (346 / 350) * 100 = <strong>98.9%</strong></div>
          </div>
        </Card>

        {/* CTAs */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-emerald-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Ready to Benchmark Your Real WPM?</h3>
            <p className="text-xs text-white/80 mt-1">
              Take our clean, ad-free 1-minute test with instant deterministic scoring.
            </p>
          </div>
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-md"
          >
            <span>Start 1-Minute Test</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

