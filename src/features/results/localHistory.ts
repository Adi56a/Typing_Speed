import { TypingMetrics } from '../../types';

export interface SavedResult {
  id: string;
  timestamp: number;
  netWPM: number;
  grossWPM: number;
  accuracy: number;
  durationSeconds: number;
  mode: string;
  errors: number;
}

export interface PersonalBests {
  bestNetWPM: number;
  bestAccuracy: number;
  totalTestsCompleted: number;
  totalMinutesPracticed: number;
}

const STORAGE_KEY = 'cts_local_history_v1';
const LEGACY_STORAGE_KEY = 'typefast_local_history_v1';

export function getSavedResults(): SavedResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveResult(metrics: TypingMetrics, mode: string = 'words'): SavedResult {
  const result: SavedResult = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    timestamp: Date.now(),
    netWPM: metrics.netWPM,
    grossWPM: metrics.grossWPM,
    accuracy: metrics.accuracy,
    durationSeconds: metrics.durationSeconds,
    mode,
    errors: metrics.incorrectChars,
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getSavedResults();
      // Keep most recent 50 tests locally
      const updated = [result, ...existing].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // LocalStorage could be full or disabled
    }
  }

  return result;
}

export function getPersonalBests(): PersonalBests {
  const results = getSavedResults();
  if (results.length === 0) {
    return {
      bestNetWPM: 0,
      bestAccuracy: 0,
      totalTestsCompleted: 0,
      totalMinutesPracticed: 0,
    };
  }

  const bestNetWPM = Math.max(...results.map((r) => r.netWPM));
  const bestAccuracy = Math.max(...results.map((r) => r.accuracy));
  const totalSeconds = results.reduce((acc, r) => acc + r.durationSeconds, 0);

  return {
    bestNetWPM,
    bestAccuracy,
    totalTestsCompleted: results.length,
    totalMinutesPracticed: Math.round((totalSeconds / 60) * 10) / 10,
  };
}

export function clearLocalHistory(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}

