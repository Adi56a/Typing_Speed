import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredTheme, applyTheme } from '../utils/theme';

describe('Theme Utility', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('defaults to system when no preference stored', () => {
    expect(getStoredTheme()).toBe('system');
  });

  it('stores and applies dark theme correctly', () => {
    applyTheme('dark');
    expect(getStoredTheme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('stores and applies light theme correctly', () => {
    applyTheme('light');
    expect(getStoredTheme()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

