export type Theme = 'light' | 'dark' | 'system';

export type TestDuration = 15 | 30 | 60 | 120 | 300 | 600;

export type TestMode = 'words' | 'quote' | 'custom';

export type TestDifficulty = 'easy' | 'medium' | 'hard';

export interface TypingMetrics {
  durationSeconds: number;
  elapsedSeconds: number;
  grossWPM: number;
  netWPM: number;
  accuracy: number;
  cpm: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  heading: string;
  subheading?: string;
  canonical?: string;
  presetDuration?: TestDuration;
  presetMode?: TestMode;
}
