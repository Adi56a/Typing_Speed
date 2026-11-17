import { TestDifficulty, TestMode } from '../../types';

export const COMMON_WORDS_EASY = [
  'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they',
  'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'his',
  'from', 'they', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would',
  'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
  'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
  'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
  'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use',
  'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
  'any', 'these', 'give', 'day', 'most', 'us',
];

export const COMMON_WORDS_MEDIUM = [
  ...COMMON_WORDS_EASY,
  'system', 'program', 'computer', 'network', 'keyboard', 'practice', 'accuracy', 'progress',
  'learning', 'language', 'standard', 'sentence', 'duration', 'performance', 'developer',
  'browser', 'document', 'function', 'variable', 'efficient', 'keyboarding', 'consistent',
  'knowledge', 'frequency', 'operation', 'experience', 'technology', 'education', 'challenge',
  'measurement', 'rhythm', 'technique', 'position', 'productive', 'training', 'interface',
];

export const COMMON_WORDS_HARD = [
  ...COMMON_WORDS_MEDIUM,
  'extraordinary', 'unprecedented', 'deterministic', 'architecture', 'accessibility',
  'infrastructure', 'configuration', 'cryptography', 'monochrome', 'synchronous',
  'asynchronous', 'circumstance', 'distraction', 'optimization', 'transcription',
  'jurisdiction', 'proportional', 'electromagnetic', 'perpendicular', 'sustainability',
  'recommendation', 'implementation', 'comprehension', 'internationalization',
];

export const CURATED_QUOTES = [
  {
    quote: 'The only way to do great work is to love what you do. Stay hungry, stay foolish.',
    source: 'Steve Jobs',
  },
  {
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    source: 'Winston Churchill',
  },
  {
    quote: 'In the middle of difficulty lies opportunity. Keep your focus steady and fingers poised.',
    source: 'Albert Einstein',
  },
  {
    quote: 'Simplicity is prerequisite for reliability. Measure twice, cut once, and type with precision.',
    source: 'Edsger W. Dijkstra',
  },
  {
    quote: 'Practice makes permanent. Correct finger placement on the home row keys builds effortless speed.',
    source: 'Typing Fundamentals',
  },
  {
    quote: 'Speed is a byproduct of muscle memory and relaxation. Never rush at the expense of accuracy.',
    source: 'Touch Typing Guild',
  },
  {
    quote: 'To prepare for competitive exams, train consistently in timed blocks under focused examination conditions.',
    source: 'Exam Prep Guide',
  },
];

export interface TextOptions {
  mode: TestMode;
  difficulty?: TestDifficulty;
  punctuation?: boolean;
  numbers?: boolean;
  wordCount?: number;
}

export function generateTestText(options: TextOptions): string {
  const { mode, difficulty = 'easy', punctuation = false, numbers = false, wordCount = 60 } = options;

  if (mode === 'quote') {
    const randomIndex = Math.floor(Math.random() * CURATED_QUOTES.length);
    return CURATED_QUOTES[randomIndex].quote;
  }

  let bank = COMMON_WORDS_EASY;
  if (difficulty === 'medium') bank = COMMON_WORDS_MEDIUM;
  if (difficulty === 'hard') bank = COMMON_WORDS_HARD;

  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomWord = bank[Math.floor(Math.random() * bank.length)];
    let word = randomWord;

    // Apply numbers if toggled
    if (numbers && i % 8 === 7) {
      word = Math.floor(Math.random() * 1000).toString();
    }

    // Apply punctuation if toggled
    if (punctuation && i > 0 && i % 6 === 0) {
      const punctMarks = ['.', ',', ';', '!', '?'];
      const mark = punctMarks[Math.floor(Math.random() * punctMarks.length)];
      word = word + mark;
    }

    // Capitalize start of sentence if punctuation is enabled
    if (punctuation && (i === 0 || words[i - 1]?.endsWith('.'))) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    words.push(word);
  }

  return words.join(' ');
}
