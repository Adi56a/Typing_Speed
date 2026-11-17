import React from 'react';
import { RouteMeta } from '../types';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Clock, Award } from 'lucide-react';

interface TimedTestPageProps {
  route: RouteMeta;
  onNavigate?: (path: string) => void;
}

export const TimedTestPage: React.FC<TimedTestPageProps> = ({ route, onNavigate }) => {
  const duration = route.presetDuration || 60;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  // Intent-specific guidance based on duration
  const durationGuidance: Record<number, {
    tag: string;
    heading: string;
    summary: string;
    bestFor: string;
    benchmark: string;
  }> = {
    15: {
      tag: 'Sprint Speed Check',
      heading: 'Why Take a 15-Second Typing Test?',
      summary:
        'A quick 15-second sprint measures maximum mechanical burst speed and finger twitch reflexes without endurance decay.',
      bestFor: 'Burst speed benchmarking and rapid reflex testing.',
      benchmark: 'Average: 45 WPM • Good: 65 WPM • Fast: 90+ WPM',
    },
    30: {
      tag: 'Short Benchmark',
      heading: 'Why Take a 30-Second Typing Test?',
      summary:
        'A fast 30-second challenge tests whether you can sustain high initial sprint speed across several complete sentences.',
      bestFor: 'Rapid daily skill checks and interval practice.',
      benchmark: 'Average: 42 WPM • Good: 62 WPM • Fast: 85+ WPM',
    },
    60: {
      tag: 'Most Popular Benchmark',
      heading: 'Why Take a 1-Minute Typing Test?',
      summary:
        'A 60-second test is the global standard for measuring quick burst speed, finger agility, and daily progress warm-ups.',
      bestFor: 'Daily warm-ups, measuring burst speed, quick progress checks.',
      benchmark: 'Average: 40 WPM • Good: 60 WPM • Fast: 80+ WPM',
    },
    120: {
      tag: 'Pacing & Rhythm Test',
      heading: 'Why Take a 2-Minute Typing Test?',
      summary:
        'A 120-second test strikes the optimal balance between initial burst speed and sustained cadence without causing finger fatigue.',
      bestFor: 'Developing consistent typing rhythm and minimizing sudden error spikes.',
      benchmark: 'Average: 38 WPM • Good: 55 WPM • Fast: 75+ WPM',
    },
    300: {
      tag: 'Corporate Employment Standard',
      heading: 'Why Take a 5-Minute Typing Test?',
      summary:
        'Corporate recruiters, legal firms, and data processing centers standardly use 5-minute typing tests to eliminate lucky burst runs.',
      bestFor: 'Job candidate readiness, corporate screening, stamina evaluation.',
      benchmark: 'Average: 35 WPM • Good: 50 WPM • Fast: 70+ WPM',
    },
    600: {
      tag: 'Government & Exam Simulation',
      heading: 'Why Take a 10-Minute Typing Test?',
      summary:
        'Government typing tests (such as SSC CGL, CHSL, CPCT, and High Court exams) require sustained 10-minute keyboard stamina under strict error ceilings.',
      bestFor: 'Government exam preparation, court reporting, professional transcription.',
      benchmark: 'SSC Requirement: 35 WPM (English) with 95% accuracy.',
    },
  };

  const guidance = durationGuidance[duration] || durationGuidance[60];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Title & Hero */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">{guidance.tag}</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          {route.heading}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {route.subheading || route.description}
        </p>
      </div>

      {/* Main Interactive Typing Engine */}
      <div className="mb-14">
        <TypingWorkspaceShell initialDuration={duration} initialMode="words" />
      </div>

      {/* Duration Specific Educational Analysis */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-500" />
              <span>{guidance.heading}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {guidance.summary}
            </p>
            <div className="pt-2 text-xs font-medium text-slate-800 dark:text-slate-200">
              <strong>Best For:</strong> {guidance.bestFor}
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Target Benchmarks for {duration >= 60 ? `${duration / 60} Minute` : `${duration}s`} Test</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {guidance.benchmark}
            </p>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
              Scored using standard international convention (1 word = 5 characters) with Net WPM error penalties.
            </div>
          </Card>
        </div>

        {/* Other Timed Test Links */}
        <div className="p-6 rounded-2xl bg-slate-100 dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Explore Other Test Durations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { duration: '1 Minute', path: '/typing-test/1-minute/' },
              { duration: '2 Minute', path: '/typing-test/2-minute/' },
              { duration: '5 Minute', path: '/typing-test/5-minute/' },
              { duration: '10 Minute', path: '/typing-test/10-minute/' },
            ].map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className="p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 dark:hover:border-brand-500 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 text-center transition-colors"
              >
                {item.duration} Test
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
