import { TypingMetrics } from '../../types';

export interface ScoringInput {
  totalCharsTyped: number;
  correctChars: number;
  incorrectChars: number;
  elapsedMs: number;
  durationSeconds: number;
}

/**
 * Standard touch-typing calculation specifications:
 * - 1 standard word = 5 characters (including spaces & punctuation)
 * - Gross WPM = (Total characters typed / 5) / (elapsed minutes)
 * - Net WPM = max(0, Gross WPM - (unfixed errors / 5) / (elapsed minutes))
 * - Accuracy % = (Correct characters / Total characters typed) * 100
 * - CPM = Total characters typed / (elapsed minutes)
 */
export function calculateTypingMetrics(input: ScoringInput): TypingMetrics {
  const { totalCharsTyped, correctChars, incorrectChars, elapsedMs, durationSeconds } = input;

  // Safe guard: zero or negative elapsed time
  if (elapsedMs <= 0 || totalCharsTyped <= 0) {
    return {
      durationSeconds,
      elapsedSeconds: Math.max(0, elapsedMs / 1000),
      grossWPM: 0,
      netWPM: 0,
      accuracy: 100,
      cpm: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
    };
  }

  const elapsedMinutes = elapsedMs / 60000;
  const elapsedSeconds = Math.min(durationSeconds, Math.round((elapsedMs / 1000) * 10) / 10);

  // Standard 5-character word convention
  const grossWPM = Math.round((totalCharsTyped / 5 / elapsedMinutes) * 10) / 10;
  const errorPenalty = incorrectChars / 5 / elapsedMinutes;
  const netWPM = Math.max(0, Math.round((grossWPM - errorPenalty) * 10) / 10);

  const accuracy = Math.round((correctChars / totalCharsTyped) * 1000) / 10;
  const cpm = Math.round(totalCharsTyped / elapsedMinutes);

  return {
    durationSeconds,
    elapsedSeconds,
    grossWPM: isFinite(grossWPM) ? grossWPM : 0,
    netWPM: isFinite(netWPM) ? netWPM : 0,
    accuracy: isFinite(accuracy) ? Math.min(100, Math.max(0, accuracy)) : 100,
    cpm: isFinite(cpm) ? cpm : 0,
    correctChars,
    incorrectChars,
    totalChars: totalCharsTyped,
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
      feedback: 'Focus on accuracy and keeping your fingers on the home row.',
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

