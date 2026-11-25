import React from 'react';
import { TestLanding } from '../data/testPages';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { ExternalLink, HelpCircle, BookOpen } from 'lucide-react';
import { TestDuration } from '../types';

interface TestLandingProps {
  landing: TestLanding;
  onNavigate?: (path: string) => void;
}

export const TestLandingPage: React.FC<TestLandingProps> = ({ landing, onNavigate }) => {
  const navigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const durationSec = landing.preset.durationSec as TestDuration;
  const isNumpad = landing.preset.mode === 'numpad';
  const isParagraph = landing.preset.mode === 'paragraph';
  const scoring = landing.preset.scoring === 'kph' ? 'kph' : landing.preset.scoring === 'kdph' ? 'kdph' : 'wpm';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* 1. H1 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Typing Benchmark &amp; Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          {landing.h1}
        </h1>
        <div className="text-xs text-slate-500 dark:text-slate-400">By Aditya Vardhan · Updated November 2026</div>
      </div>

      {/* 2. Preset Typing Test Widget */}
      <div className="mb-14">
        <TypingWorkspaceShell
          initialDuration={durationSec}
          initialMode={isNumpad ? 'words' : isParagraph ? 'quote' : 'words'}
          initialDifficulty={landing.preset.difficulty || 'medium'}
          initialWithPunctuation={landing.preset.withPunctuation || false}
          initialWithNumbers={landing.preset.withNumbers || false}
          initialCustomText={landing.preset.customText}
          scoringLabel={scoring}
        />
      </div>

      {/* Educational Article Content */}
      <div className="space-y-10">
        {/* 3. Direct Answer Section */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Overview &amp; Qualifying Requirement
          </h2>
          <div className="p-5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800 mb-6">
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {landing.directAnswer}
            </p>
          </div>

          {/* Rules Table */}
          {landing.rulesTable && landing.rulesTable.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-surface-dark-border mb-6">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-surface-dark-border bg-slate-50 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Evaluation Metric</th>
                    <th className="py-3 px-4">Official Requirement / Guideline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border text-slate-700 dark:text-slate-300">
                  {landing.rulesTable.map((rule, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{rule.label}</td>
                      <td className="py-3 px-4 font-mono font-medium">{rule.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Official Source Link */}
          {landing.officialSource && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-surface-dark-border">
              <span>Verified Official Source:</span>
              <a
                href={landing.officialSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                <span>{landing.officialSource.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </section>

        {/* 4. Content Sections */}
        {landing.sections.map((section, idx) => (
          <section
            key={idx}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border shadow-sm space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {section.h2}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {section.body}
            </p>
          </section>
        ))}

        {/* 5. Related Typing Tests */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-100 dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
            Related Typing Tests &amp; Practice Drills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {landing.related.map((slug) => {
              const href = `/typing-test/${slug}/`;
              const label =
                slug === 'ssc-cgl'
                  ? 'SSC CGL DEST'
                  : slug === 'ssc-chsl'
                    ? 'SSC CHSL 35 WPM'
                    : slug === '10-key'
                      ? '10-Key Numpad'
                      : slug === 'data-entry'
                        ? 'Data Entry Test'
                        : slug === 'for-jobs'
                          ? 'Typing for Jobs'
                          : slug === 'hindi'
                            ? 'Hindi Typing Test'
                            : slug;
              return (
                <a
                  key={slug}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                  }}
                  className="p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border text-center hover:border-brand-500 hover:text-brand-600 transition-colors shadow-xs group"
                >
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    {label}
                  </div>
                </a>
              );
            })}
            <a
              href="/typing-test/3-minute/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/typing-test/3-minute/');
              }}
              className="p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border text-center hover:border-brand-500 hover:text-brand-600 transition-colors shadow-xs group"
            >
              <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                3 Minute Test
              </div>
            </a>
            <a
              href="/typing-test/1-minute/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/typing-test/1-minute/');
              }}
              className="p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border text-center hover:border-brand-500 hover:text-brand-600 transition-colors shadow-xs group"
            >
              <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                1 Minute Test
              </div>
            </a>
            <a
              href="/typing-speed-chart/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/typing-speed-chart/');
              }}
              className="p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border text-center hover:border-brand-500 hover:text-brand-600 transition-colors shadow-xs group"
            >
              <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                Speed Benchmarks
              </div>
            </a>
            <a
              href="/typing-test/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/typing-test/');
              }}
              className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-center hover:border-brand-500 transition-colors shadow-xs group"
            >
              <div className="text-xs sm:text-sm font-bold text-brand-700 dark:text-brand-300">
                All Typing Tests →
              </div>
            </a>
          </div>
        </section>

        {/* 6. FAQ Section */}
        {landing.faqs && landing.faqs.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-surface-dark-border">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-500" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3">
              {landing.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border text-sm shadow-xs"
                >
                  <summary className="font-bold text-base text-slate-900 dark:text-white cursor-pointer select-none">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
