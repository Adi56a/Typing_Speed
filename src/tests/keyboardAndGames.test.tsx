import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VirtualKeyboard } from '../components/typing/VirtualKeyboard';
import { TypingGamesPage } from '../pages/TypingGamesPage';
import { WordCascadeGame } from '../features/games/WordCascadeGame';

describe('VirtualKeyboard Component', () => {
  it('renders the interactive QWERTY layout with tactile guide markers', () => {
    const { container } = render(<VirtualKeyboard activeChar="f" />);

    // Check presence of key guide
    expect(screen.getByLabelText(/Virtual touch-typing guide keyboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive QWERTY Finger Placement Guide/i)).toBeInTheDocument();

    // Check that finger indicator for 'f' is Left Index
    expect(screen.getByText(/Left Index/i)).toBeInTheDocument();

    // Verify tactile bump elements are present for 'f' and 'j'
    const tactileBumps = container.querySelectorAll('[title="Home row tactile index bump"]');
    expect(tactileBumps.length).toBe(2);
  });

  it('correctly maps uppercase and symbol keys to their physical base key', () => {
    render(<VirtualKeyboard activeChar="!" />);
    // Exclamation mark '!' is typed on base key '1' with Shift
    expect(screen.getByText(/Left Pinky/i)).toBeInTheDocument();
  });
});

describe('WordCascadeGame & TypingGamesPage', () => {
  it('renders the WordCascadeGame arena in idle state with start and fullscreen controls', () => {
    render(<WordCascadeGame />);

    expect(screen.getByText(/Word Cascade: Kinetic Defense/i)).toBeInTheDocument();
    expect(screen.getByText(/Launch Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Streak/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter full screen/i)).toBeInTheDocument();
  });

  it('renders the TypingGamesPage with cognitive science educational section', () => {
    render(<TypingGamesPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Free Online Typing Games/i })).toBeInTheDocument();
    expect(screen.getByText(/The Cognitive Science of Gamified Typing/i)).toBeInTheDocument();
    expect(screen.getByText(/Eliminating the Visual Confirmation Feedback Loop/i)).toBeInTheDocument();
    expect(screen.getByText(/Overcoming the 60 WPM Skill Plateau/i)).toBeInTheDocument();
  });
});
