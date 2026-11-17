import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Theme } from '../../types';
import { applyTheme, getStoredTheme } from '../../utils/theme';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const cycleTheme = () => {
    const nextTheme: Record<Theme, Theme> = {
      system: 'dark',
      dark: 'light',
      light: 'system',
    };
    const next = nextTheme[theme];
    setTheme(next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-slate-200 dark:border-surface-dark-border" />
    );
  }

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="p-2 rounded-lg border border-slate-200 dark:border-surface-dark-border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark-muted transition-colors focus-ring"
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
      title={`Theme: ${theme.toUpperCase()}`}
    >
      {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
      {theme === 'dark' && <Moon className="w-4 h-4 text-brand-400" />}
      {theme === 'system' && <Monitor className="w-4 h-4 text-slate-400" />}
    </button>
  );
};
