import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, Zap, Award, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">Our Mission</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          About TypeSpeed
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          The fastest, most accessible, and trustworthy free typing speed platform for global learners and students in India.
        </p>
      </div>

      {/* Brand Hero Artwork */}
      <div className="w-full max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-surface-dark-border shadow-md">
        <img
          src="/logo.webp"
          alt="TypeSpeed TS Crest - Focus, Elevation and Precision"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Why We Built This */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Why We Built TypeSpeed
          </h2>
          <p>
            The web is flooded with typing speed tests that have lost sight of their core utility: they are bloated
            with intrusive popup advertisements, forced subscription paywalls, distracting animated banners, and
            unnecessary mandatory account registrations.
          </p>
          <p>
            <strong>TypeSpeed was engineered on an uncompromising principle: Utility First.</strong> When you arrive
            at our website, you can start typing immediately without a single click, without an account, and with zero
            tracking scripts recording your keystrokes.
          </p>
        </Card>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-5 space-y-2">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-brand-600 dark:text-brand-400 w-fit mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Local-First Speed</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Keystroke validation and monotonic timers run 100% locally in your browser. No network latency per key.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 w-fit mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Zero Keystroke Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              We never transmit your keystrokes or typed text passages over the network. Your inputs stay strictly private.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 w-fit mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Honest Metrics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Clear distinction between Gross and Net WPM using international 5-character touch-typing standards.
            </p>
          </Card>
        </div>

        {/* Global + India Dedication */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Supporting Indian Government & Competitive Exams
          </h2>
          <p>
            Every year, hundreds of thousands of aspirants prepare for exams like <strong>SSC CGL, SSC CHSL, RRB NTPC,
            State High Court typist exams, and CPCT (Computer Proficiency Certification Test)</strong>. Many online typing
            tools do not offer the formal 5-minute and 10-minute endurance tests or the exact error penalty standards
            used by exam boards.
          </p>
          <p>
            TypeFast is specifically designed to provide free, realistic timed simulations (including 5 and 10-minute
            tests) with rigorous accuracy tracking to help students pass their skill qualification tests with confidence.
          </p>
        </Card>

        {/* Contact & Editorial Accountability */}
        <Card className="p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-500" />
            <span>Contact & Editorial Accountability</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Have suggestions, found a bug, or want specific exam passage formats added? We welcome feedback from
            learners, trainers, and educators worldwide.
          </p>
          <div className="pt-2 text-xs font-mono text-brand-600 dark:text-brand-400">
            Email: contact@typingtest.example.com
          </div>
        </Card>
      </div>
    </div>
  );
};
