import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Keyboard, Zap, Clock } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate?: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="inline-flex items-center gap-1.5 mb-4">
        <Badge variant="neutral">404 Error: Page Not Found</Badge>
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-3">
        Page Not Found
      </h1>
      <p className="max-w-md mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8">
        The link you followed may be broken or the test page has moved. Let&apos;s get you right back to typing!
      </p>

      {/* Suggested Quick Links */}
      <Card className="p-6 text-left max-w-lg mx-auto space-y-4 mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Popular Typing Tests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Keyboard className="w-4 h-4 text-brand-500" />
            <span>Main Typing Test</span>
          </a>
          <a
            href="/typing-test/1-minute/"
            onClick={(e) => handleLinkClick(e, '/typing-test/1-minute/')}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Clock className="w-4 h-4 text-brand-500" />
            <span>1 Minute Test</span>
          </a>
          <a
            href="/typing-test/5-minute/"
            onClick={(e) => handleLinkClick(e, '/typing-test/5-minute/')}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Zap className="w-4 h-4 text-brand-500" />
            <span>5 Minute Test</span>
          </a>
          <a
            href="/wpm-calculator/"
            onClick={(e) => handleLinkClick(e, '/wpm-calculator/')}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-surface-dark-border hover:border-brand-500 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Clock className="w-4 h-4 text-brand-500" />
            <span>WPM Calculator</span>
          </a>
        </div>
      </Card>

      <a
        href="/"
        onClick={(e) => handleLinkClick(e, '/')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Homepage</span>
      </a>
    </div>
  );
};
