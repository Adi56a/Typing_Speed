import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark-card py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Privacy Pledge */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-lg text-slate-900 dark:text-white">
              <img
                src="/logo-sm.webp"
                alt="CheckTypingSpeeds TS Crest"
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
                className="w-8 h-8 rounded-lg object-cover shadow-sm border border-surface-light-border dark:border-surface-dark-border"
              />
              <span>
                Check<span className="text-brand-500">TypingSpeeds</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fast, distraction-free typing platform designed for global typists and students in India.
              Check typing speed, master touch typing, and pass typing exams.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-[11px] text-brand-800 dark:text-brand-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>100% Client-Side Privacy: No Keystroke Logging</span>
            </div>
          </div>

          {/* Timed Speed Tests */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Timed Tests
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/typing-test/1-minute/"
                  onClick={(e) => handleLinkClick(e, '/typing-test/1-minute/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  1 Minute Typing Test
                </a>
              </li>
              <li>
                <a
                  href="/typing-test/2-minute/"
                  onClick={(e) => handleLinkClick(e, '/typing-test/2-minute/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  2 Minute Typing Test
                </a>
              </li>
              <li>
                <a
                  href="/typing-test/5-minute/"
                  onClick={(e) => handleLinkClick(e, '/typing-test/5-minute/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  5 Minute Typing Test
                </a>
              </li>
              <li>
                <a
                  href="/typing-test/10-minute/"
                  onClick={(e) => handleLinkClick(e, '/typing-test/10-minute/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  10 Minute Typing Test
                </a>
              </li>
            </ul>
          </div>

          {/* Practice & Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Practice & Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/typing-practice/"
                  onClick={(e) => handleLinkClick(e, '/typing-practice/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Typing Practice & Drills
                </a>
              </li>
              <li>
                <a
                  href="/typing-games/"
                  onClick={(e) => handleLinkClick(e, '/typing-games/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Typing Games (Word Cascade)
                </a>
              </li>
              <li>
                <a
                  href="/wpm-calculator/"
                  onClick={(e) => handleLinkClick(e, '/wpm-calculator/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  WPM Calculator
                </a>
              </li>
              <li>
                <a
                  href="/how-wpm-is-calculated/"
                  onClick={(e) => handleLinkClick(e, '/how-wpm-is-calculated/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  How WPM Is Calculated
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Policies */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              About & Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/about/"
                  onClick={(e) => handleLinkClick(e, '/about/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  About Our Platform
                </a>
              </li>
              <li>
                <a
                  href="/methodology/"
                  onClick={(e) => handleLinkClick(e, '/methodology/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Scoring Methodology
                </a>
              </li>
              <li>
                <a
                  href="/contact/"
                  onClick={(e) => handleLinkClick(e, '/contact/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Contact & Feedback
                </a>
              </li>
              <li>
                <a
                  href="/privacy/"
                  onClick={(e) => handleLinkClick(e, '/privacy/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms/"
                  onClick={(e) => handleLinkClick(e, '/terms/')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-surface-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} CheckTypingSpeeds. All rights reserved. Free and accessible for everyone.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500" />
            <span>for speed and accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

