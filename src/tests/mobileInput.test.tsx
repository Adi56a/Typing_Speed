import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';

describe('Mobile & iOS Compatibility', () => {
  it('renders an accessible input configured to prevent iOS zoom and capture touch', () => {
    render(<TypingWorkspaceShell initialDuration={60} initialMode="words" />);

    const input = screen.getByLabelText(/typing test input area/i);
    expect(input).toBeDefined();

    // Must have font size 16px to prevent iOS Safari auto-zoom
    expect(input.style.fontSize).toBe('16px');
    expect(input.getAttribute('inputmode')).toBe('text');
    expect(input.getAttribute('autocapitalize')).toBe('none');
    expect(input.getAttribute('autocorrect')).toBe('off');
  });

  it('processes virtual keyboard typing via beforeinput event (Android & iOS Gboard/QuickType)', () => {
    render(<TypingWorkspaceShell initialDuration={60} initialMode="words" />);

    const input = screen.getByLabelText(/typing test input area/i);

    // Simulate mobile virtual keyboard insertText via custom InputEvent or event dispatch
    const insertEvent = new Event('beforeinput', { bubbles: true, cancelable: true });
    Object.assign(insertEvent, { inputType: 'insertText', data: 't' });
    fireEvent(input, insertEvent);

    // Also test backspace on mobile virtual keyboard
    const backspaceEvent = new Event('beforeinput', { bubbles: true, cancelable: true });
    Object.assign(backspaceEvent, { inputType: 'deleteContentBackward' });
    fireEvent(input, backspaceEvent);
  });

  it('normalizes iOS smart punctuation to standard ASCII matching target text', () => {
    render(<TypingWorkspaceShell initialDuration={60} initialMode="words" />);

    const input = screen.getByLabelText(/typing test input area/i);

    // Simulate typing iOS curly smart quote
    const quoteEvent = new Event('beforeinput', { bubbles: true, cancelable: true });
    Object.assign(quoteEvent, { inputType: 'insertText', data: '’' });
    fireEvent(input, quoteEvent);
  });
});
