import { TypingMetrics } from '../../types';
import { calculateTypingMetrics } from './scoring';

export type CharStatus = 'pending' | 'correct' | 'incorrect' | 'current';

export interface CharState {
  char: string;
  status: CharStatus;
  inputChar?: string;
}

export type EngineStatus = 'ready' | 'running' | 'completed';

export interface WpmSample {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
}

export class TypingEngine {
  private targetText: string;
  private durationSeconds: number;
  private status: EngineStatus = 'ready';
  private chars: CharState[] = [];
  private currentIndex: number = 0;
  private startTime: number | null = null;
  private endTime: number | null = null;
  private correctCount: number = 0;
  private incorrectCount: number = 0;
  private totalTypedCount: number = 0;
  private wpmHistory: WpmSample[] = [];
  private lastSampleSecond: number = -1;

  constructor(targetText: string, durationSeconds: number = 60) {
    this.targetText = targetText;
    this.durationSeconds = durationSeconds;
    this.initChars();
  }

  private initChars() {
    this.chars = Array.from(this.targetText).map((char, idx) => ({
      char,
      status: idx === 0 ? 'current' : 'pending',
    }));
  }

  public getStatus(): EngineStatus {
    return this.status;
  }

  public getTargetText(): string {
    return this.targetText;
  }

  public getChars(): CharState[] {
    return this.chars;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getDurationSeconds(): number {
    return this.durationSeconds;
  }

  public getWpmHistory(): WpmSample[] {
    return this.wpmHistory;
  }

  /**
   * Processes a single incoming character.
   * Monotonic timestamp currentTime should be performance.now() or equivalent.
   */
  public handleInput(inputChar: string, currentTime: number): void {
    if (this.status === 'completed') return;

    // Start on first character typed
    if (this.status === 'ready') {
      this.status = 'running';
      this.startTime = currentTime;
      this.lastSampleSecond = 0;
    }

    if (this.currentIndex >= this.targetText.length) {
      this.complete(currentTime);
      return;
    }

    const expectedChar = this.targetText[this.currentIndex];
    const isCorrect = inputChar === expectedChar;

    this.totalTypedCount++;
    if (isCorrect) {
      this.correctCount++;
      this.chars[this.currentIndex] = {
        char: expectedChar,
        status: 'correct',
        inputChar,
      };
    } else {
      this.incorrectCount++;
      this.chars[this.currentIndex] = {
        char: expectedChar,
        status: 'incorrect',
        inputChar,
      };
    }

    this.currentIndex++;

    // Update upcoming current cursor
    if (this.currentIndex < this.chars.length) {
      this.chars[this.currentIndex].status = 'current';
    } else {
      // Completed all characters in the passage!
      this.complete(currentTime);
    }

    this.recordSampleIfNewSecond(currentTime);
  }

  /**
   * Handles backspace action
   */
  public handleBackspace(): void {
    if (this.status !== 'running' || this.currentIndex <= 0) return;

    // Clear current position cursor
    if (this.currentIndex < this.chars.length) {
      this.chars[this.currentIndex].status = 'pending';
    }

    this.currentIndex--;
    const prevChar = this.chars[this.currentIndex];

    // Revert counts
    if (prevChar.status === 'correct') {
      this.correctCount = Math.max(0, this.correctCount - 1);
    } else if (prevChar.status === 'incorrect') {
      this.incorrectCount = Math.max(0, this.incorrectCount - 1);
    }

    this.chars[this.currentIndex] = {
      char: this.targetText[this.currentIndex],
      status: 'current',
    };
  }

  /**
   * Periodic tick check using monotonic time
   */
  public tick(currentTime: number): boolean {
    if (this.status !== 'running' || this.startTime === null) return false;

    const elapsedMs = currentTime - this.startTime;
    const elapsedSeconds = elapsedMs / 1000;

    this.recordSampleIfNewSecond(currentTime);

    if (elapsedSeconds >= this.durationSeconds) {
      this.complete(currentTime);
      return true;
    }

    return false;
  }

  private complete(currentTime: number): void {
    if (this.status === 'completed') return;
    this.status = 'completed';
    this.endTime = currentTime;

    // Clean up cursor indicator
    if (this.currentIndex < this.chars.length) {
      this.chars[this.currentIndex].status = 'pending';
    }

    // Add final sample point
    this.recordSample(currentTime);
  }

  private recordSampleIfNewSecond(currentTime: number): void {
    if (this.startTime === null) return;
    const elapsedSeconds = Math.floor((currentTime - this.startTime) / 1000);
    if (elapsedSeconds > this.lastSampleSecond && elapsedSeconds <= this.durationSeconds) {
      this.lastSampleSecond = elapsedSeconds;
      this.recordSample(currentTime);
    }
  }

  private recordSample(currentTime: number): void {
    const metrics = this.getMetrics(currentTime);
    this.wpmHistory.push({
      second: metrics.elapsedSeconds,
      wpm: metrics.netWPM,
      rawWpm: metrics.grossWPM,
      errors: metrics.incorrectChars,
    });
  }

  public getElapsedMs(currentTime: number = 0): number {
    if (this.status === 'ready' || this.startTime === null) return 0;
    if (this.status === 'completed' && this.endTime !== null) {
      return this.endTime - this.startTime;
    }
    return Math.max(0, currentTime - this.startTime);
  }

  public getRemainingSeconds(currentTime: number = 0): number {
    if (this.status === 'ready') return this.durationSeconds;
    const elapsedSeconds = this.getElapsedMs(currentTime) / 1000;
    return Math.max(0, Math.ceil(this.durationSeconds - elapsedSeconds));
  }

  public getMetrics(currentTime: number = 0): TypingMetrics {
    const elapsedMs = this.getElapsedMs(currentTime);
    return calculateTypingMetrics({
      totalCharsTyped: this.totalTypedCount,
      correctChars: this.correctCount,
      incorrectChars: this.incorrectCount,
      elapsedMs,
      durationSeconds: this.durationSeconds,
    });
  }
}
