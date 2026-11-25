import React from 'react';
import { RouteMeta, TestDuration } from '../types';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { DURATION_PAGES, ALL_DURATION_PATHS } from '../data/durationPages';
import { HelpCircle } from 'lucide-react';

interface TimedTestPageProps {
  route: RouteMeta;
  onNavigate?: (path: string) => void;
}

export const TimedTestPage: React.FC<TimedTestPageProps> = ({ route, onNavigate }) => {
  const durationData = DURATION_PAGES[route.path] || DURATION_PAGES['/typing-test/1-minute/'];
  const testDuration = (route.presetDuration || durationData.seconds) as TestDuration;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const otherDurations = ALL_DURATION_PATHS.filter((d) => d.path !== route.path);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* 1. H1 (from routes.ts) */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          {route.h1 || route.heading}
        </h1>
      </div>

      {/* 2. Typing Test Widget Preset to That Duration (directly under H1, before any paragraph) */}
      <div className="mb-14">
        <TypingWorkspaceShell initialDuration={testDuration} initialMode="words" />
      </div>

      {/* Educational Content & Analysis */}
      <div className="space-y-12">
        {/* 3. What Is a Good {label} Typing Score? */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            What Is a Good {durationData.label} Typing Score?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {durationData.directAnswer}
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-surface-dark-border text-slate-400 font-mono">
                  <th className="pb-3 font-medium">Level</th>
                  <th className="pb-3 font-medium">WPM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border/60">
                <tr>
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Beginner</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300 font-mono">under 30</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Average</td>
                  <td className="py-2.5 text-brand-600 dark:text-brand-400 font-mono font-bold">35–45</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Good</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300 font-mono">50–65</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Fast</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300 font-mono">70–90</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">Professional</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300 font-mono">100+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {durationData.scoreNotes}
          </p>
        </section>

        {/* 4. Who Uses a {label} Typing Test? */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Who Uses a {durationData.label} Typing Test?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {durationData.whoUsesIt}
          </p>
        </section>

        {/* 5. Compare Typing Test Lengths */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-100 dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
            Compare Typing Test Lengths
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherDurations.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className="p-3.5 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 dark:hover:border-brand-500 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 text-center transition-all capitalize"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        {/* 6. {label} Typing Test FAQ */}
        <section className="border-t border-surface-light-border dark:border-surface-dark-border pt-10">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {durationData.label} Typing Test FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {durationData.faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
