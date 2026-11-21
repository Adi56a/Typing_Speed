export type Theme = 'light' | 'dark' | 'system';

export type TestDuration = 15 | 30 | 60 | 120 | 300 | 600 | 900;

export type TestMode = 'time' | 'words' | 'quote' | 'custom' | 'exam';

export type TestDifficulty = 'easy' | 'medium' | 'hard';

export type WordCountPreset = 10 | 25 | 50 | 100;

export type ExamType = 'ssc_cgl' | 'ssc_chsl' | 'high_court' | 'rrb_ntpc';

export interface TypingMetrics {
  durationSeconds: number;
  elapsedSeconds: number;
  grossWPM: number;
  netWPM: number;
  accuracy: number;
  cpm: number;
  kdph?: number;
  consistency?: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  uncorrectedErrors?: number;
  wordsWithErrors?: number;
  cleanWords?: number;
  weakKeys?: string[];
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
  noIndex?: boolean;
}

export interface TestResultRecord {
  id: string;
  timestamp: number;
  netWpm: number;
  grossWpm: number;
  accuracy: number;
  durationSeconds: number;
  mode: TestMode;
  dateStr: string;
}
