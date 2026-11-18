import React from 'react';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { HelpCircle, CheckCircle2, ArrowRight, Gamepad2, Activity } from 'lucide-react';
import { TestDuration } from '../types';

interface HomePageProps {
  initialDuration?: TestDuration;
  onNavigate?: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ initialDuration = 60, onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-surface-light-border dark:border-surface-dark-border text-slate-600 dark:text-slate-300 bg-surface-light-muted dark:bg-surface-dark-card mb-4">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span>ANSI Standard 5-Char Norm • Monotonic Timer • 100% Client-Side Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          Check <span className="text-brand-600 dark:text-brand-400">Typing Speeds</span> Online Free
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Check your words per minute (WPM), track keystroke accuracy, and build touch typing muscle memory with
          instant deterministic scoring. 100% free, zero ads, zero tracking, instant start.
        </p>
      </section>

      {/* Main Interactive Typing Module */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <TypingWorkspaceShell initialDuration={initialDuration} />
      </section>

      {/* Technical Specifications & Measurement Standards */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-surface-dark-border">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-500" />
                <span>Typing Engine Specifications &amp; Standards</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Engineered to strict touch-typing measurement standards used by civil service exams and international competitions.
              </p>
            </div>
            <a
              href="/methodology/"
              onClick={(e) => handleLinkClick(e, '/methodology/')}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>Full Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200/60 dark:border-surface-dark-border/60">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Word Metric</div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">5.0 Chars / Word</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Standardized ANSI convention. All characters, spaces, and punctuation normalize to 5 keystrokes per word.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200/60 dark:border-surface-dark-border/60">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Clock Precision</div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">&lt; 0.1ms Resolution</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                High-resolution monotonic browser timer via <code className="text-[11px] font-mono">performance.now()</code>. Zero drift across background tabs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200/60 dark:border-surface-dark-border/60">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Scoring Model</div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">Net WPM Penalties</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Mistyped characters reduce net output. Accuracy reflects all typos committed during the session.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200/60 dark:border-surface-dark-border/60">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Data Privacy</div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">100% Client-Side</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Zero network requests during keystrokes. No telemetry or server storage of your typed words.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Speed Percentiles & Exam Standards */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Global WPM Percentiles Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Global Typing Speed Percentiles
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Statistical distribution based on standardized 5-character words per minute benchmarks:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-surface-dark-border text-slate-400 font-mono">
                    <th className="pb-2 font-medium">Tier</th>
                    <th className="pb-2 font-medium">Net WPM</th>
                    <th className="pb-2 font-medium">Percentile</th>
                    <th className="pb-2 font-medium">Competency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border/60">
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Beginner</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">15 - 30</td>
                    <td className="py-2.5 text-slate-500">Bottom 25%</td>
                    <td className="py-2.5 text-slate-500">Hunt-and-peck typist</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Average</td>
                    <td className="py-2.5 font-mono text-brand-600 dark:text-brand-400 font-bold">38 - 45</td>
                    <td className="py-2.5 text-slate-500">Median (50%)</td>
                    <td className="py-2.5 text-slate-500">Everyday office fluency</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Productive</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">46 - 65</td>
                    <td className="py-2.5 text-slate-500">Top 30%</td>
                    <td className="py-2.5 text-slate-500">Software devs &amp; writers</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Advanced</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">66 - 85</td>
                    <td className="py-2.5 text-slate-500">Top 10%</td>
                    <td className="py-2.5 text-slate-500">Touch typing mastery</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Expert / Steno</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">86 - 120+</td>
                    <td className="py-2.5 text-slate-500">Top 1%</td>
                    <td className="py-2.5 text-slate-500">Court reporters &amp; transcriptionists</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Civil Service & Exam Benchmarks */}
          <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Government &amp; Recruitment Benchmarks
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Mandatory qualification standards for key Indian civil service and international clerical exams:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-surface-dark-border text-slate-400 font-mono">
                    <th className="pb-2 font-medium">Exam / Body</th>
                    <th className="pb-2 font-medium">Required WPM</th>
                    <th className="pb-2 font-medium">Key Depressions</th>
                    <th className="pb-2 font-medium">Accuracy Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border/60">
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">SSC CGL (DEST)</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">27 WPM</td>
                    <td className="py-2.5 text-slate-500">2,000 KDPH / 15 min</td>
                    <td className="py-2.5 text-slate-500">&le; 5% errors</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">SSC CHSL (LDC/JSA)</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">35 WPM English</td>
                    <td className="py-2.5 text-slate-500">10,500 KDPH</td>
                    <td className="py-2.5 text-slate-500">&le; 7% errors</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">CPCT (Madhya Pradesh)</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">30 WPM English / 20 Hindi</td>
                    <td className="py-2.5 text-slate-500">15 min duration</td>
                    <td className="py-2.5 text-slate-500">Qualifying score</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">High Court Steno</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">80 - 100 WPM</td>
                    <td className="py-2.5 text-slate-500">Shorthand + Transcription</td>
                    <td className="py-2.5 text-slate-500">&le; 3% error limit</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white">IBPS / State Clerk</td>
                    <td className="py-2.5 font-mono text-slate-600 dark:text-slate-300">30 WPM</td>
                    <td className="py-2.5 text-slate-500">Computer typing test</td>
                    <td className="py-2.5 text-slate-500">&ge; 90% accuracy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Practice & Duration Hub */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="rounded-2xl bg-slate-100 dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Choose Your Test Duration &amp; Mode
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Whether you need a quick 60-second speed benchmark, full 10-minute exam endurance, or interactive games.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/typing-games/"
                onClick={(e) => handleLinkClick(e, '/typing-games/')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Play Typing Games</span>
              </a>
              <a
                href="/typing-practice/"
                onClick={(e) => handleLinkClick(e, '/typing-practice/')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Practice Drills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { duration: '1 Minute Test', path: '/typing-test/1-minute/', desc: 'Daily benchmark sprint' },
              { duration: '2 Minute Test', path: '/typing-test/2-minute/', desc: 'Cadence & stamina balance' },
              { duration: '5 Minute Test', path: '/typing-test/5-minute/', desc: 'Job candidate evaluation' },
              { duration: '10 Minute Test', path: '/typing-test/10-minute/', desc: 'Govt & academic exam prep' },
            ].map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className="flex flex-col p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 dark:hover:border-brand-500 transition-all group"
              >
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {item.duration}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{item.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Answer Educational Section (AEO/GEO & FAQ Snippet Optimized) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="border-t border-surface-light-border dark:border-surface-dark-border pt-12">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions &amp; Methodology
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
            Clear, transparent answers on how to check your typing speed, how WPM is calculated, and how to improve.
          </p>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                How do I check my typing speed on CheckTypingSpeeds?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                To check your typing speed, simply start typing the words displayed on screen above. The monotonic timer starts
                automatically with your first keystroke. No login, account creation, or software installation is required. When
                the timer expires, you instantly get your Net WPM, Gross WPM, accuracy %, and error analysis.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                What is WPM and how is it calculated?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>WPM stands for Words Per Minute</strong>. Under standard international typing conventions,
                one standardized &quot;word&quot; is equal to <strong>5 characters</strong> (including letters, spaces,
                and punctuation). Gross WPM is calculated as{' '}
                <code className="px-1.5 py-0.5 rounded bg-surface-light-muted dark:bg-surface-dark-muted font-mono text-xs">
                  (Total Characters / 5) / Elapsed Minutes
                </code>
                . Net WPM subtracts uncorrected errors to measure true usable speed.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                What is the difference between Gross WPM and Net WPM?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                <strong>Gross WPM (Raw Speed)</strong> measures how quickly you press keys regardless of mistakes. <strong>Net WPM (Accurate Speed)</strong> imposes penalties for errors made:
              </p>
              <div className="p-3 rounded-lg bg-surface-light-muted dark:bg-surface-dark-muted font-mono text-xs text-slate-700 dark:text-slate-300">
                Net WPM = Gross WPM - (Errors / Test Duration in Minutes)
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                In employment and civil service examinations, only Net WPM qualifies candidates. A high raw speed with 80% accuracy results in failure.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Does CheckTypingSpeeds log or record what I type?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Zero keystroke logging.</strong> CheckTypingSpeeds executes 100% in your local browser memory. No keystrokes,
                typed passages, or personal data are ever recorded or transmitted across the network.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                How can I increase my typing speed quickly?
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Prioritize Accuracy Over Speed:</strong> Slow down to eliminate errors. Speed is a natural byproduct of muscle memory.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Master the Home Row:</strong> Rest your fingers on ASDF (left hand) and JKL; (right hand). Always return to the home row keys.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Stop Looking at the Keyboard:</strong> Touch typing trains your brain to map keys by spatial position rather than visual confirmation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Play Kinetic Typing Games:</strong> Play Word Cascade on CheckTypingSpeeds to break visual verification dependencies and eliminate finger hesitation.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
