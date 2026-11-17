import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">{isPrivacy ? 'Privacy First' : 'Transparent Terms'}</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          {isPrivacy ? 'Privacy Policy: Zero Keystroke Logging Guarantee' : 'Terms of Service'}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Last updated: November 2026 • Valid worldwide
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {isPrivacy ? (
          <>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Our Core Privacy Commitment</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  We believe your keystrokes are personal. <strong>We do not log, transmit, record, or store any
                  passages you type or keystrokes you make on this website.</strong> All calculations happen purely in
                  your local browser memory.
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Data We Do Not Collect</h2>
            <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm">
              <li>No raw keystrokes or timing intervals per key.</li>
              <li>No typed text, custom pasted passages, or user inputs.</li>
              <li>No passwords, usernames, or mandatory personal profile data.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Local Storage Usage</h2>
            <p className="text-xs sm:text-sm">
              We use standard browser <code>localStorage</code> solely to remember your UI preference (light, dark, or
              system theme). This preference never leaves your browser.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Third-Party Analytics</h2>
            <p className="text-xs sm:text-sm">
              We may collect privacy-conscious aggregate page visits (e.g. total page views and general geographic
              country) to understand which test durations are most popular. No personal identifiers or typing metrics
              are ever linked to analytics.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-xs sm:text-sm">
              By accessing and using TypeFast, you agree to these Terms of Service. If you do not agree, you may discontinue
              using the service at any time.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Free Educational Service</h2>
            <p className="text-xs sm:text-sm">
              TypeFast is provided free of charge for educational, practice, and personal skill evaluation purposes.
              While our scoring follows international typing standards, test results do not constitute an official
              government or commercial certificate unless verified under supervised proctored examination.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Acceptable Use</h2>
            <p className="text-xs sm:text-sm">
              You agree to use this platform in good faith for personal learning and practice. You may not attempt to
              disrupt the service, launch denial of service attacks, or reverse engineer backend infrastructure.
            </p>
          </>
        )}
      </Card>
    </div>
  );
};
