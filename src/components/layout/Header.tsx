import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Keyboard, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Speed Test', path: '/typing-speed-test/' },
    { label: '1 Min', path: '/typing-test/1-minute/' },
    { label: '5 Min', path: '/typing-test/5-minute/' },
    { label: 'Practice', path: '/typing-practice/' },
    { label: 'Games', path: '/typing-games/' },
    { label: 'WPM Calc', path: '/wpm-calculator/' },
    { label: 'About', path: '/about/' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-surface-dark/80 border-b border-slate-200/80 dark:border-surface-dark-border/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white focus-ring rounded-md py-1"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/30">
            <Keyboard className="w-5 h-5" />
          </div>
          <span>
            Type<span className="text-brand-500">Fast</span>
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-400">
            Free
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`px-3 py-1.5 rounded-md transition-colors focus-ring ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-dark-muted'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Quick Start Button */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors focus-ring shadow-sm"
          >
            <span>Start Test</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-surface-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark-muted focus-ring"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark px-4 pt-2 pb-6 shadow-xl transition-all">
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

