import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; path: string; badge?: string }[] = [
    { label: 'Speed Test', path: '/' },
    { label: 'All Tests', path: '/typing-test/' },
    { label: 'SSC Exam', path: '/ssc-typing-test/', badge: 'EXAM' },
    { label: 'Lessons', path: '/typing-lessons/' },
    { label: 'Practice', path: '/typing-practice/' },
    { label: 'Speed Chart', path: '/typing-speed-chart/' },
    { label: 'Games', path: '/typing-games/' },
    { label: 'WPM Calc', path: '/wpm-calculator/' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-surface-dark/80 border-b border-surface-light-border dark:border-surface-dark-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2 font-bold text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 dark:text-white focus-ring rounded-md py-1 flex-shrink-0 whitespace-nowrap"
        >
          <img
            src="/logo-sm.webp"
            alt="CheckTypingSpeeds TS Crest"
            width="32"
            height="32"
            decoding="async"
            className="w-8 h-8 rounded-lg object-cover shadow-xs border border-surface-light-border dark:border-surface-dark-border"
          />
          <span className="tracking-tight">
            Check<span className="text-brand-500">TypingSpeeds</span>
          </span>
          <span className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-400">
            Free
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 text-xs xl:text-sm font-medium whitespace-nowrap">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1 transition-colors focus-ring ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-dark-muted'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1 py-0.5 text-[9px] font-extrabold uppercase rounded bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400 leading-none">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
          <ThemeToggle />

          {/* Quick Start Button */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors focus-ring shadow-sm whitespace-nowrap flex-shrink-0"
          >
            <span>Start Test</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-lg border border-surface-light-border dark:border-surface-dark-border text-slate-700 dark:text-slate-300 hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted focus-ring"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark px-4 pt-2 pb-6 shadow-xl transition-all">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-dark-muted'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="w-full flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors"
              >
                <span>Start Free Typing Test</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

