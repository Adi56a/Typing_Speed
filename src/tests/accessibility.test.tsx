import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { ResultsModal } from '../features/results/ResultsModal';

describe('Accessibility & UI Component Verification', () => {
  it('renders Button with accessible attributes and focus handling', () => {
    render(<Button aria-label="Accessible Test Button">Click Me</Button>);
    const btn = screen.getByRole('button', { name: /Accessible Test Button/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('focus-ring');
  });

  it('renders ThemeToggle with descriptive aria-label', () => {
    render(<ThemeToggle />);
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('aria-label');
  });

  it('renders ResultsModal with proper ARIA dialog semantics', () => {
    const mockMetrics = {
      durationSeconds: 60,
      elapsedSeconds: 60,
      grossWPM: 75,
      netWPM: 70,
      accuracy: 98,
      cpm: 375,
      correctChars: 340,
      incorrectChars: 5,
      totalChars: 345,
    };

    render(
      <ResultsModal
        metrics={mockMetrics}
        onRestart={() => {}}
        onNewTest={() => {}}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'results-title');
  });
});
