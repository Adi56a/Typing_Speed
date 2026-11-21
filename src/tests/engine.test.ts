import { describe, it, expect } from 'vitest';
import { TypingEngine } from '../features/typing-engine/engine';
import { calculateTypingMetrics, getSpeedRating, calculateConsistency, evaluateSscPassage } from '../features/typing-engine/scoring';
import { generateTestText, CURATED_QUOTES } from '../features/typing-engine/textBank';

describe('Scoring Module', () => {
  it('handles zero elapsed time and empty input safely without NaN or Infinity', () => {
    const metrics = calculateTypingMetrics({
      totalCharsTyped: 0,
      correctChars: 0,
      incorrectChars: 0,
      elapsedMs: 0,
      durationSeconds: 60,
    });

    expect(metrics.grossWPM).toBe(0);
    expect(metrics.netWPM).toBe(0);
    expect(metrics.accuracy).toBe(100);
    expect(metrics.cpm).toBe(0);
    expect(Number.isNaN(metrics.grossWPM)).toBe(false);
    expect(Number.isFinite(metrics.grossWPM)).toBe(true);
  });

  it('calculates 100% accuracy and expected standard WPM for all-correct input', () => {
    // 300 characters in 60,000ms (1 minute) = 60 gross WPM, 60 net WPM
    const metrics = calculateTypingMetrics({
      totalCharsTyped: 300,
      correctChars: 300,
      incorrectChars: 0,
      elapsedMs: 60000,
      durationSeconds: 60,
    });

    expect(metrics.grossWPM).toBe(60);
    expect(metrics.netWPM).toBe(60);
    expect(metrics.accuracy).toBe(100);
    expect(metrics.cpm).toBe(300);
  });

  it('applies penalty to Net WPM for incorrect characters', () => {
    // 300 total chars typed, 280 correct, 20 incorrect in 1 minute
    // gross = 300 / 5 = 60 WPM
    // penalty = 20 / 5 = 4 WPM
    // net = 60 - 4 = 56 WPM
    // accuracy = (280 / 300) * 100 = 93.3%
    const metrics = calculateTypingMetrics({
      totalCharsTyped: 300,
      correctChars: 280,
      incorrectChars: 20,
      elapsedMs: 60000,
      durationSeconds: 60,
    });

    expect(metrics.grossWPM).toBe(60);
    expect(metrics.netWPM).toBe(56);
    expect(metrics.accuracy).toBe(93.3);
  });

  it('clamps Net WPM at zero if errors exceed gross WPM', () => {
    const metrics = calculateTypingMetrics({
      totalCharsTyped: 10,
      correctChars: 0,
      incorrectChars: 10,
      elapsedMs: 60000,
      durationSeconds: 60,
    });

    expect(metrics.netWPM).toBe(0);
  });

  it('assigns correct speed tiers', () => {
    expect(getSpeedRating(20).level).toBe('Beginner');
    expect(getSpeedRating(40).level).toBe('Average');
    expect(getSpeedRating(60).level).toBe('Fluent');
    expect(getSpeedRating(80).level).toBe('Advanced');
    expect(getSpeedRating(100).level).toBe('Master');
    expect(getSpeedRating(120).level).toBe('Elite');
  });
});

describe('TypingEngine', () => {
  it('initializes cleanly in ready state', () => {
    const engine = new TypingEngine('hello world', 60);
    expect(engine.getStatus()).toBe('ready');
    expect(engine.getCurrentIndex()).toBe(0);
    expect(engine.getRemainingSeconds()).toBe(60);

    const chars = engine.getChars();
    expect(chars[0].status).toBe('current');
    expect(chars[1].status).toBe('pending');
  });

  it('transitions to running on first input and updates character states', () => {
    const engine = new TypingEngine('hello', 60);
    const t0 = 1000;

    engine.handleInput('h', t0);
    expect(engine.getStatus()).toBe('running');
    expect(engine.getCurrentIndex()).toBe(1);

    const chars = engine.getChars();
    expect(chars[0].status).toBe('correct');
    expect(chars[1].status).toBe('current');
  });

  it('records incorrect characters accurately', () => {
    const engine = new TypingEngine('hello', 60);
    const t0 = 1000;

    engine.handleInput('x', t0); // Expected 'h'
    expect(engine.getChars()[0].status).toBe('incorrect');

    const metrics = engine.getMetrics(t0 + 1000);
    expect(metrics.incorrectChars).toBe(1);
    expect(metrics.correctChars).toBe(0);
  });

  it('handles backspace correctly and reverts counts and statuses', () => {
    const engine = new TypingEngine('hello', 60);
    const t0 = 1000;

    engine.handleInput('h', t0);
    expect(engine.getCurrentIndex()).toBe(1);

    engine.handleBackspace();
    expect(engine.getCurrentIndex()).toBe(0);
    expect(engine.getChars()[0].status).toBe('current');
  });

  it('preserves error count and penalizes accuracy when a user mistypes and corrects with backspace', () => {
    // Target text: "cat"
    // User types: 'x' (mistake!), Backspace, 'c' (correct), 'a' (correct), 't' (correct)
    const engine = new TypingEngine('cat', 60);
    const t0 = 1000;

    engine.handleInput('x', t0); // typo
    expect(engine.getChars()[0].status).toBe('incorrect');

    engine.handleBackspace(); // user fixes with backspace
    expect(engine.getCurrentIndex()).toBe(0);

    engine.handleInput('c', t0 + 100);
    engine.handleInput('a', t0 + 200);
    engine.handleInput('t', t0 + 300);

    const metrics = engine.getMetrics(t0 + 1000);

    // In standard scoring, the mistake made is NOT erased into a false 100% accuracy:
    // Total keystrokes typed = 4 ('x', 'c', 'a', 't')
    // Mistakes made = 1 ('x')
    // Correct characters = 3
    expect(metrics.totalChars).toBe(4);
    expect(metrics.incorrectChars).toBe(1);
    expect(metrics.correctChars).toBe(3);
    expect(metrics.accuracy).toBe(75); // (4 - 1) / 4 = 75%, NOT 100%!
    expect(metrics.wordsWithErrors).toBe(1);
    expect(metrics.cleanWords).toBe(0);
  });

  it('completes automatically when duration elapses via tick', () => {
    const engine = new TypingEngine('the quick brown fox', 15);
    const t0 = 1000;

    engine.handleInput('t', t0);
    expect(engine.getStatus()).toBe('running');

    // 14 seconds passed: not completed
    const didCompleteEarly = engine.tick(t0 + 14000);
    expect(didCompleteEarly).toBe(false);
    expect(engine.getStatus()).toBe('running');

    // 15 seconds passed: completed
    const didComplete = engine.tick(t0 + 15000);
    expect(didComplete).toBe(true);
    expect(engine.getStatus()).toBe('completed');
  });

  it('completes early when entire passage is finished before timer expires', () => {
    const engine = new TypingEngine('cat', 60);
    const t0 = 1000;

    engine.handleInput('c', t0);
    engine.handleInput('a', t0 + 100);
    engine.handleInput('t', t0 + 200);

    expect(engine.getStatus()).toBe('completed');
    expect(engine.getCurrentIndex()).toBe(3);
  });
});

describe('TextBank', () => {
  it('generates words according to options', () => {
    const text = generateTestText({ mode: 'words', difficulty: 'easy', wordCount: 20 });
    const words = text.split(' ');
    expect(words.length).toBe(20);
  });

  it('selects curated quote in quote mode', () => {
    const text = generateTestText({ mode: 'quote' });
    expect(text.length).toBeGreaterThan(10);
  });

  it('contains a rich bank of at least 80 to 100 meaningful statements across easy, medium, and hard', () => {
    expect(CURATED_QUOTES.length).toBeGreaterThanOrEqual(80);
    const easyQuotes = CURATED_QUOTES.filter((q) => q.difficulty === 'easy');
    const mediumQuotes = CURATED_QUOTES.filter((q) => q.difficulty === 'medium');
    const hardQuotes = CURATED_QUOTES.filter((q) => q.difficulty === 'hard');

    expect(easyQuotes.length).toBeGreaterThanOrEqual(20);
    expect(mediumQuotes.length).toBeGreaterThanOrEqual(25);
    expect(hardQuotes.length).toBeGreaterThanOrEqual(25);
  });

  it('includes punctuation when requested', () => {
    const text = generateTestText({ mode: 'words', punctuation: true, wordCount: 30 });
    const hasPunctuation = /[.,!?;]/.test(text);
    expect(hasPunctuation).toBe(true);
  });

  it('includes numbers when requested', () => {
    const text = generateTestText({ mode: 'words', numbers: true, wordCount: 30 });
    const hasNumbers = /\d/.test(text);
    expect(hasNumbers).toBe(true);
  });
});

describe('Consistency & Weak Key Analysis', () => {
  it('calculates 100% consistency when WPM is stable or samples are sparse', () => {
    expect(calculateConsistency([])).toBe(100);
    expect(calculateConsistency([{ wpm: 50 }, { wpm: 50 }])).toBe(100);
  });

  it('calculates lower consistency when WPM fluctuates wildly', () => {
    const erratic = [
      { wpm: 20 },
      { wpm: 80 },
      { wpm: 30 },
      { wpm: 90 },
      { wpm: 25 },
    ];
    const score = calculateConsistency(erratic);
    expect(score).toBeLessThan(70);
  });

  it('tracks weak keys when errors are committed in TypingEngine', () => {
    const engine = new TypingEngine('abcd', 60);
    const t0 = 1000;

    // Type 'x' instead of 'a', 'y' instead of 'b', 'x' instead of 'c'
    engine.handleInput('x', t0);
    engine.handleInput('y', t0 + 100);
    engine.handleInput('x', t0 + 200);

    const weakKeys = engine.getWeakKeys();
    expect(weakKeys).toBeDefined();
    expect(weakKeys.length).toBeGreaterThan(0);
    expect(weakKeys).toContain('A');
  });
});

describe('SSC Government Exam Evaluation Model', () => {
  it('accurately distinguishes full mistakes and half mistakes according to official SSC rules', () => {
    const master = 'The economic progress of India is rapid and steady';
    // Typed with:
    // 'india' (capitalization error = 0.5 mistake)
    // 'speedy' instead of 'steady' (substitution = 1.0 mistake)
    const typed = 'The economic progress of india is rapid and speedy';

    const result = evaluateSscPassage(master, typed, 1, 'UR');
    expect(result.fullMistakes).toBe(1); // 'steady' -> 'speedy'
    expect(result.halfMistakes).toBe(1); // 'India' -> 'india'
    expect(result.totalMistakes).toBe(1.5); // 1 + 0.5 = 1.5 mistakes
  });

  it('correctly qualifies candidates within the permissible error cut-off (7% for UR)', () => {
    // 100-word master passage
    const words = Array(100).fill('word').join(' ');
    // 5 errors out of 100 words = 5% error (under 7% cutoff)
    const typedWords = Array(95).fill('word').concat(Array(5).fill('typo')).join(' ');

    const result = evaluateSscPassage(words, typedWords, 10, 'UR');
    expect(result.errorPercentage).toBe(5.0);
    expect(result.isQualified).toBe(true);
  });

  it('correctly disqualifies candidates exceeding the permissible error cut-off', () => {
    const words = Array(100).fill('word').join(' ');
    // 8 errors out of 100 words = 8% error (exceeds 7% UR cutoff)
    const typedWords = Array(92).fill('word').concat(Array(8).fill('typo')).join(' ');

    const result = evaluateSscPassage(words, typedWords, 10, 'UR');
    expect(result.errorPercentage).toBe(8.0);
    expect(result.isQualified).toBe(false); // Disqualified for UR!

    // But should qualify under Reserved category (10% ceiling)
    const resReserved = evaluateSscPassage(words, typedWords, 10, 'RESERVED');
    expect(resReserved.isQualified).toBe(true);
  });
});

