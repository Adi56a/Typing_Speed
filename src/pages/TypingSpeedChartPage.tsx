import React from 'react';
import { BarChart3, Trophy, ArrowRight, HelpCircle, Briefcase, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface TypingSpeedChartPageProps {
  onNavigate?: (path: string) => void;
}

export const TypingSpeedChartPage: React.FC<TypingSpeedChartPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Global WPM Percentiles & Benchmarks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Average Typing Speed &amp; WPM Chart
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Discover how your typing speed compares to global percentiles, professional career requirements, and age-based typing averages.
        </p>
      </div>

      {/* Featured Snippet Definition Callout */}
      <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
          Quick Benchmark Summary
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The worldwide average typing speed is approximately <strong>38 to 42 Words Per Minute (WPM)</strong> with 92% accuracy. A speed of <strong>50 to 60 WPM</strong> is considered above average and qualifies for most administrative corporate jobs. Speeds of <strong>70 to 85 WPM</strong> are classified as professional, while <strong>90+ WPM</strong> places a typist in the top 2% of keyboard users globally.
        </p>
      </div>

      {/* Primary Global WPM Percentiles Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-ochre-500" />
            <span>Global Typing Speed Percentile Distribution</span>
          </h2>
          <span className="text-xs font-semibold text-slate-400">Based on 10M+ Online Tests</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-surface-dark-border text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Skill Level</th>
                <th className="py-2.5 px-3">Net Speed Range</th>
                <th className="py-2.5 px-3">Global Percentile</th>
                <th className="py-2.5 px-3">Typical Accuracy</th>
                <th className="py-2.5 px-3">Evaluation & Typical Roles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">Beginner</td>
                <td className="py-3 px-3 font-mono font-bold text-slate-600 dark:text-slate-400">&lt; 25 WPM</td>
                <td className="py-3 px-3 font-mono">Bottom 20%</td>
                <td className="py-3 px-3 font-mono">80% - 88%</td>
                <td className="py-3 px-3">Hunt-and-peck typists; students beginning touch typing.</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">Average</td>
                <td className="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">38 - 45 WPM</td>
                <td className="py-3 px-3 font-mono text-brand-600 font-bold">50th Percentile</td>
                <td className="py-3 px-3 font-mono">90% - 94%</td>
                <td className="py-3 px-3">Standard everyday computer user; casual email and browsing.</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">Proficient</td>
                <td className="py-3 px-3 font-mono font-bold text-brand-600 dark:text-brand-400">50 - 65 WPM</td>
                <td className="py-3 px-3 font-mono">Top 25%</td>
                <td className="py-3 px-3 font-mono">95% - 97%</td>
                <td className="py-3 px-3">Corporate office staff, managers, customer support agents.</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">Advanced</td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">70 - 85 WPM</td>
                <td className="py-3 px-3 font-mono">Top 10%</td>
                <td className="py-3 px-3 font-mono">97% - 99%</td>
                <td className="py-3 px-3">Software engineers, journalists, data entry specialists.</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">Master / Elite</td>
                <td className="py-3 px-3 font-mono font-bold text-ochre-600 dark:text-ochre-400">90 - 120+ WPM</td>
                <td className="py-3 px-3 font-mono">Top 1% - 2%</td>
                <td className="py-3 px-3 font-mono">98% - 100%</td>
                <td className="py-3 px-3">Court stenographers, live captioners, competitive typists.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Typing Speed by Career and Profession */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-brand-500" />
          <span>Typing Speed Requirements by Career</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Customer Support / Live Chat</span>
              <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-xs">55 - 65 WPM</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Handling 3 to 4 simultaneous live chat conversations requires rapid cadence and error-free typing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Government Clerk / SSC CGL / CHSL</span>
              <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-xs">27 - 35 WPM</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Strict 35 WPM (10,500 KDPH) requirement for CHSL LDC and 8,000 KDPH for CGL DEST with strict 7% error limits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Software Engineer / Developer</span>
              <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-xs">50 - 70 WPM</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Specialized symbol, bracket, and syntax speed matters more than raw word velocity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Medical / Legal Transcriptionist</span>
              <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-xs">70 - 90 WPM</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-stamina verbatim audio transcription demanding 99%+ accuracy and technical vocabulary agility.
            </p>
          </div>
        </div>
      </div>

      {/* Average Typing Speed by Age Group */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-500" />
          <span>Average Typing Speed by Age Demographic</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
            <div className="text-[10px] uppercase font-bold text-slate-400">Ages 10 - 17</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white my-1">32 WPM</div>
            <div className="text-[11px] text-slate-400">Mobile natives</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
            <div className="text-[10px] uppercase font-bold text-slate-400">Ages 18 - 25</div>
            <div className="text-2xl font-black font-mono text-brand-600 dark:text-brand-400 my-1">45 WPM</div>
            <div className="text-[11px] text-slate-400">Peak keyboard usage</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
            <div className="text-[10px] uppercase font-bold text-slate-400">Ages 26 - 45</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white my-1">43 WPM</div>
            <div className="text-[11px] text-slate-400">Professional workforce</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
            <div className="text-[10px] uppercase font-bold text-slate-400">Ages 46+</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white my-1">37 WPM</div>
            <div className="text-[11px] text-slate-400">Consistent cadence</div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Where Do You Rank?</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Check your exact WPM, accuracy, and percentile rank in a 60-second test.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={() => onNavigate && onNavigate('/')}
            className="w-full sm:w-auto gap-2"
          >
            <span>Test Your Speed Now</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-surface-dark-border">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <HelpCircle className="w-5 h-5 text-brand-500" />
          <span>Frequently Asked Questions About Typing Speed</span>
        </div>

        <div className="space-y-3">
          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              Is 50 WPM a good typing speed?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Yes, 50 WPM is comfortably above the global average of ~40 WPM. It places you in the top 35% of all typists and satisfies the prerequisite typing speed for standard administrative, managerial, and clerical positions.
            </p>
          </details>

          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              What is the fastest typing speed ever recorded?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              The highest officially recorded typing speed on an electric typewriter was achieved by Barbara Blackburn at 212 WPM using the Dvorak keyboard layout. On modern computer keyboards, top competitive typists like Sean Wrona have sustained speeds above 220 WPM in short sprints.
            </p>
          </details>

          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              Does typing accuracy affect your WPM score?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Yes, dramatically. Under international Net WPM scoring standards, each uncorrected typo or backspace correction subtracts 1 full word (5 keystrokes) from your gross score. A typist typing 70 gross WPM with 5 errors drops to 65 Net WPM.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};
