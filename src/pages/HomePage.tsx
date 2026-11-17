import React from 'react';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { ShieldCheck, Zap, Award, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
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
        <div className="inline-flex items-center gap-1.5 mb-3">
          <Badge variant="brand">Zero Ads • No Account Required • 100% Private</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          Free Online <span className="text-brand-600 dark:text-brand-400">Typing Speed Test</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Measure your Words Per Minute (WPM), track keystroke accuracy, and master touch typing with our clean,
          instant-start keyboard test.
        </p>
      </section>

      {/* Main Interactive Typing Module */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <TypingWorkspaceShell initialDuration={initialDuration} />
      </section>

      {/* Feature & Value Proposition Grid */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col items-start text-left">
            <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Sub-Millisecond Speed
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every keystroke is processed in local browser memory using high-precision monotonic timers.
              Zero network lag, zero input drops.
            </p>
          </Card>

          <Card className="flex flex-col items-start text-left">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              100% Private By Design
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never record, send, or store your keystrokes or typed passages. All calculations happen entirely
              on your device.
            </p>
          </Card>

          <Card className="flex flex-col items-start text-left">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Standardized Metrics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Strict adherence to international typing benchmarks: 5 characters per standardized word, gross WPM,
              net WPM penalty model, and CPM.
            </p>
          </Card>
        </div>
      </section>

      {/* Practice & Duration Hub for High-Intent Crawlers */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="rounded-2xl bg-slate-100 dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Choose Your Test Duration
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Whether you need a quick 60-second speed benchmark or full 10-minute exam endurance practice.
              </p>
            </div>
            <a
              href="/typing-practice/"
              onClick={(e) => handleLinkClick(e, '/typing-practice/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>Explore Practice Drills</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { duration: '1 Minute', path: '/typing-test/1-minute/', desc: 'Quick daily benchmark' },
              { duration: '2 Minute', path: '/typing-test/2-minute/', desc: 'Burst & stamina balance' },
              { duration: '5 Minute', path: '/typing-test/5-minute/', desc: 'Job candidate standard' },
              { duration: '10 Minute', path: '/typing-test/10-minute/', desc: 'Govt & academic exams' },
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

      {/* Direct Answer Educational Section (AEO/GEO Optimized) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="border-t border-slate-200 dark:border-surface-dark-border pt-12">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions & Methodology
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
            Clear, transparent answers about how typing speed is evaluated and how to improve.
          </p>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                What is WPM and how is it calculated?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>WPM stands for Words Per Minute</strong>. Under standard international typing conventions,
                one standardized &quot;word&quot; is equal to <strong>5 characters</strong> (including letters, spaces,
                and punctuation). Gross WPM is calculated as{' '}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-surface-dark-muted font-mono text-xs">
                  (Total Characters / 5) / Elapsed Minutes
                </code>
                . Net WPM subtracts uncorrected errors to measure true usable speed.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                What is a good typing speed for students and professionals?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Average Typist</div>
                  <div className="text-brand-600 dark:text-brand-400 font-mono font-semibold text-base mt-1">
                    38 - 42 WPM
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Everyday computer use</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Above Average / Pro</div>
                  <div className="text-brand-600 dark:text-brand-400 font-mono font-semibold text-base mt-1">
                    55 - 75 WPM
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">High office productivity</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Competitive / Expert</div>
                  <div className="text-brand-600 dark:text-brand-400 font-mono font-semibold text-base mt-1">
                    80 - 120+ WPM
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Transcription & coding</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Most government exams in India (e.g. SSC, CPCT, High Court) require 30 to 35 WPM in English with at least
                90% to 95% accuracy.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
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
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
