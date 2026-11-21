import { TypingMetrics } from '../../types';

export interface ScoringInput {
  totalCharsTyped: number;
  correctChars: number;
  incorrectChars: number; // Cumulative errors committed
  elapsedMs: number;
  durationSeconds: number;
  uncorrectedErrors?: number;
  wordsWithErrors?: number;
  cleanWords?: number;
  wpmHistory?: { wpm: number }[];
  weakKeys?: string[];
}

/**
 * Standard touch-typing calculation specifications:
 * - 1 standard word = 5 characters (including spaces & punctuation)
 * - Gross WPM = (Total characters typed / 5) / (elapsed minutes)
 * - Net WPM = max(0, Gross WPM - (total errors / 5) / (elapsed minutes))
 * - Accuracy % = (Net Correct Keystrokes / Total Keystrokes Typed) * 100
 * - CPM = Total characters typed / (elapsed minutes)
 * - KDPH = Key Depressions Per Hour = CPM * 60
 * - Consistency % = 100 - Coefficient of Variation of WPM across test intervals
 */
export function calculateTypingMetrics(input: ScoringInput): TypingMetrics {
  const {
    totalCharsTyped,
    correctChars,
    incorrectChars,
    elapsedMs,
    durationSeconds,
    uncorrectedErrors = 0,
    wordsWithErrors = 0,
    cleanWords = 0,
    wpmHistory = [],
    weakKeys = [],
  } = input;

  // Safety guard: zero or negative elapsed time or empty input
  if (elapsedMs <= 0 || totalCharsTyped <= 0) {
    return {
      durationSeconds,
      elapsedSeconds: Math.max(0, elapsedMs / 1000),
      grossWPM: 0,
      netWPM: 0,
      accuracy: 100,
      cpm: 0,
      kdph: 0,
      consistency: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      uncorrectedErrors: 0,
      wordsWithErrors: 0,
      cleanWords: 0,
      weakKeys: [],
    };
  }

  const elapsedMinutes = elapsedMs / 60000;
  const elapsedSeconds = Math.min(durationSeconds, Math.round((elapsedMs / 1000) * 10) / 10);

  // Standard 5-character word convention
  const grossWPM = Math.round((totalCharsTyped / 5 / elapsedMinutes) * 10) / 10;
  const errorPenalty = incorrectChars / 5 / elapsedMinutes;
  const netWPM = Math.max(0, Math.round((grossWPM - errorPenalty) * 10) / 10);

  // Net correct keystrokes out of all attempts (penalizes mistakes even if backspaced)
  const netCorrect = Math.max(0, totalCharsTyped - incorrectChars);
  const accuracy = Math.round((netCorrect / totalCharsTyped) * 1000) / 10;
  const cpm = Math.round(totalCharsTyped / elapsedMinutes);
  const kdph = Math.round(cpm * 60);

  // Calculate consistency percentage based on WPM sample variance
  const consistency = calculateConsistency(wpmHistory);

  return {
    durationSeconds,
    elapsedSeconds,
    grossWPM: isFinite(grossWPM) ? grossWPM : 0,
    netWPM: isFinite(netWPM) ? netWPM : 0,
    accuracy: isFinite(accuracy) ? Math.min(100, Math.max(0, accuracy)) : 100,
    cpm: isFinite(cpm) ? cpm : 0,
    kdph: isFinite(kdph) ? kdph : 0,
    consistency: isFinite(consistency) ? consistency : 100,
    correctChars,
    incorrectChars,
    totalChars: totalCharsTyped,
    uncorrectedErrors,
    wordsWithErrors,
    cleanWords,
    weakKeys,
  };
}

/**
 * Calculates typing consistency score (0 - 100%)
 * Measures standard deviation of WPM across test duration.
 */
export function calculateConsistency(wpmHistory: { wpm: number }[]): number {
  if (!wpmHistory || wpmHistory.length < 3) return 100;

  // Filter out the first sample if it was zero during test warmup
  const validSamples = wpmHistory.filter((s) => s.wpm > 0);
  if (validSamples.length < 2) return 100;

  const wpms = validSamples.map((s) => s.wpm);
  const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
  if (mean <= 0) return 100;

  const variance = wpms.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / wpms.length;
  const stdDev = Math.sqrt(variance);

  // Coefficient of variation: (stdDev / mean) * 100
  const cov = (stdDev / mean) * 100;
  const consistency = Math.max(0, Math.min(100, Math.round(100 - cov)));
  return consistency;
}

/**
 * Staff Selection Commission (SSC) Exam Evaluation Model
 * Official Rules:
 * Full Mistakes (1.0 error):
 * - Omission of a word
 * - Substitution of wrong word
 * - Addition of extra word
 * - Incomplete words
 * 
 * Half Mistakes (0.5 error):
 * - Spacing errors
 * - Wrong capitalization
 * - Punctuation errors
 * - Transposition of adjacent words
 */
export interface SscEvaluationResult {
  fullMistakes: number;
  halfMistakes: number;
  totalMistakes: number;
  totalWordsMaster: number;
  totalWordsTyped: number;
  errorPercentage: number;
  kdph: number;
  netWpm: number;
  isQualified: boolean;
  permissibleLimit: number;
  details: {
    omissions: number;
    substitutions: number;
    additions: number;
    capitalizationErrors: number;
    spacingErrors: number;
    punctuationErrors: number;
  };
}

export function evaluateSscPassage(
  masterText: string,
  typedText: string,
  elapsedMinutes: number,
  category: 'UR' | 'RESERVED' = 'UR'
): SscEvaluationResult {
  const masterWords = masterText.trim().split(/\s+/).filter(Boolean);
  const typedWords = typedText.trim().split(/\s+/).filter(Boolean);

  let omissions = 0;
  let substitutions = 0;
  let additions = 0;
  let capitalizationErrors = 0;
  let punctuationErrors = 0;
  let spacingErrors = 0;

  const compareLength = Math.max(masterWords.length, typedWords.length);

  for (let i = 0; i < compareLength; i++) {
    const masterWord = masterWords[i];
    const typedWord = typedWords[i];

    if (!typedWord && masterWord) {
      omissions++;
      continue;
    }

    if (!masterWord && typedWord) {
      additions++;
      continue;
    }

    if (masterWord && typedWord) {
      if (masterWord === typedWord) {
        continue;
      }

      // Check case-insensitive match (Capitalization error = 0.5 mistake)
      if (masterWord.toLowerCase() === typedWord.toLowerCase()) {
        capitalizationErrors++;
        continue;
      }

      // Strip punctuation to check if it is merely a punctuation error
      const cleanMaster = masterWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, '');
      const cleanTyped = typedWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, '');

      if (cleanMaster.toLowerCase() === cleanTyped.toLowerCase()) {
        punctuationErrors++;
        continue;
      }

      // Fundamental word mismatch = substitution (1.0 mistake)
      substitutions++;
    }
  }

  const fullMistakes = omissions + substitutions + additions;
  const halfMistakes = capitalizationErrors + punctuationErrors + spacingErrors;
  const totalMistakes = fullMistakes + 0.5 * halfMistakes;

  const totalWordsMaster = masterWords.length || 1;
  const errorPercentage = Math.round((totalMistakes / totalWordsMaster) * 1000) / 10;

  const totalKeystrokes = typedText.length;
  const validMinutes = Math.max(0.1, elapsedMinutes);
  const kdph = Math.round((totalKeystrokes / validMinutes) * 60);
  const netWpm = Math.max(0, Math.round(((totalKeystrokes / 5 - totalMistakes * 5) / validMinutes) * 10) / 10);

  // Permissible cutoffs: 7% for UR/General, 10% for Reserved categories
  const permissibleLimit = category === 'UR' ? 7.0 : 10.0;
  const isQualified = errorPercentage <= permissibleLimit;

  return {
    fullMistakes,
    halfMistakes,
    totalMistakes,
    totalWordsMaster,
    totalWordsTyped: typedWords.length,
    errorPercentage,
    kdph,
    netWpm,
    isQualified,
    permissibleLimit,
    details: {
      omissions,
      substitutions,
      additions,
      capitalizationErrors,
      spacingErrors,
      punctuationErrors,
    },
  };
}

/**
 * Evaluates skill tier based on Net WPM
 */
export function getSpeedRating(netWPM: number): {
  level: string;
  percentile: string;
  feedback: string;
} {
  if (netWPM < 25) {
    return {
      level: 'Beginner',
      percentile: 'Top 90%',
      feedback: 'Focus on accuracy and keeping your fingers anchored on the home row.',
    };
  }
  if (netWPM < 45) {
    return {
      level: 'Average',
      percentile: 'Top 50%',
      feedback: 'Good baseline speed for everyday communication and web browsing.',
    };
  }
  if (netWPM < 65) {
    return {
      level: 'Fluent',
      percentile: 'Top 25%',
      feedback: 'Solid professional speed. Qualifies for most corporate & office roles.',
    };
  }
  if (netWPM < 85) {
    return {
      level: 'Advanced',
      percentile: 'Top 10%',
      feedback: 'Fast, efficient typist. Meets high-speed exam & data entry requirements.',
    };
  }
  if (netWPM < 105) {
    return {
      level: 'Master',
      percentile: 'Top 2%',
      feedback: 'Exceptional speed. Suitable for live court transcription and programming.',
    };
  }
  return {
    level: 'Elite',
    percentile: 'Top 0.5%',
    feedback: 'World-class typing speed! You are among the fastest typists worldwide.',
  };
}
