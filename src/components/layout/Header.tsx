import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Speed Test', path: '/typing-speed-test/' },
    { label: 'SSC Exam', path: '/ssc-typing-test/', badge: 'Exam' },
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white focus-ring rounded-md py-1"
        >
          <img
            src="/logo-sm.webp"
            alt="CheckTypingSpeeds TS Crest"
            width="36"
            height="36"
            decoding="async"
            className="w-9 h-9 rounded-lg object-cover shadow-sm border border-surface-light-border dark:border-surface-dark-border"
          />
          <span>
            Check<span className="text-brand-500">TypingSpeeds</span>
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-400">
            Free
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50 dark:bg-brand-950/40 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-ochre-100 text-ochre-800 dark:bg-ochre-950 dark:text-ochre-300">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Quick CTA button for Desktop */}
          <a
            href="/typing-speed-test/"
            onClick={(e) => handleLinkClick(e, '/typing-speed-test/')}
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Start Test
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted focus-ring"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-ochre-100 text-ochre-800 dark:bg-ochre-950 dark:text-ochre-300">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
