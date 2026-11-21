import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TypingEngine, CharState, EngineStatus, WpmSample } from './engine';
import { generateTestText, TextOptions, CANONICAL_INITIAL_TEXT } from './textBank';
import { TestDuration, TestMode, TestDifficulty, TypingMetrics } from '../../types';

export interface UseTypingEngineProps {
  duration?: TestDuration;
  mode?: TestMode;
  difficulty?: TestDifficulty;
  punctuation?: boolean;
  numbers?: boolean;
  wordCount?: number;
  customText?: string;
}

export function useTypingEngine(props: UseTypingEngineProps = {}) {
  const {
    duration = 60,
    mode = 'time',
    difficulty = 'easy',
    punctuation = false,
    numbers = false,
    wordCount = 60,
    customText,
  } = props;

  const [engine, setEngine] = useState<TypingEngine>(() => {
    // Deterministic canonical text for initial render to guarantee 100% SSR-client hydration match and 0 CLS
    if (customText) {
      return new TypingEngine(customText, duration);
    }
    const isDefaultInitial = (mode === 'time' || mode === 'words') && !punctuation && !numbers && wordCount === 60;
    const initialText = isDefaultInitial
      ? CANONICAL_INITIAL_TEXT
      : generateTestText({ mode, difficulty, punctuation, numbers, wordCount });
    return new TypingEngine(initialText, duration);
  });

  const [status, setStatus] = useState<EngineStatus>('ready');
  const [chars, setChars] = useState<CharState[]>(() => engine.getChars());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(duration);
  const [metrics, setMetrics] = useState<TypingMetrics>(() => engine.getMetrics());
  const [wpmHistory, setWpmHistory] = useState<WpmSample[]>([]);
  const isComposingRef = useRef<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastProcessedTimeRef = useRef<number>(0);
  const lastProcessedCharRef = useRef<string>('');

  // Normalize iOS / mobile smart punctuation (curly quotes, smart dashes)
  const normalizeChar = (char: string): string => {
    if (char === '\u2018' || char === '\u2019' || char === '`') return "'";
    if (char === '\u201C' || char === '\u201D') return '"';
    if (char === '\u2013' || char === '\u2014') return '-';
    return char;
  };

  // Sync state from engine
  const syncState = useCallback(() => {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    setStatus(engine.getStatus());
    setChars([...engine.getChars()]);
    setCurrentIndex(engine.getCurrentIndex());
    setRemainingSeconds(engine.getRemainingSeconds(now));
    setMetrics(engine.getMetrics(now));
    setWpmHistory([...engine.getWpmHistory()]);
  }, [engine]);

  // Restart or generate new test
  const restart = useCallback(
    (customOptions?: Partial<TextOptions & { duration: TestDuration; customText?: string }>) => {
      const activeDuration = customOptions?.duration || duration;
      const activeMode = customOptions?.mode || mode;
      const activeDiff = customOptions?.difficulty || difficulty;
      const activePunct = customOptions?.punctuation !== undefined ? customOptions.punctuation : punctuation;
      const activeNums = customOptions?.numbers !== undefined ? customOptions.numbers : numbers;
      const activeWordCount = customOptions?.wordCount || wordCount || 60;

      let newText: string;
      if (customOptions?.customText) {
        newText = customOptions.customText;
      } else {
        newText = generateTestText({
          mode: activeMode,
          difficulty: activeDiff,
          punctuation: activePunct,
          numbers: activeNums,
          wordCount: activeWordCount,
        });
      }

      const newEngine = new TypingEngine(newText, activeDuration);
      setEngine(newEngine);
      setStatus('ready');
      setChars(newEngine.getChars());
      setCurrentIndex(0);
      setRemainingSeconds(activeDuration);
      setMetrics(newEngine.getMetrics());
      setWpmHistory([]);

      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    },
    [duration, mode, difficulty, punctuation, numbers, wordCount]
  );

  // Run monotonic clock loop while engine is running
  useEffect(() => {
    if (status !== 'running') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const loop = () => {
      const now = performance.now();
      const didComplete = engine.tick(now);
      syncState();

      if (didComplete) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status, engine, syncState]);

  // Key event handler for physical keyboards
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
      // Ignore if user is composing via IME
      if (isComposingRef.current) return;

      // Shortcut: Tab + Enter or Escape to restart
      if (e.key === 'Escape' || (e.key === 'Enter' && e.shiftKey)) {
        e.preventDefault();
        restart();
        return;
      }

      if (engine.getStatus() === 'completed') return;

      // On Android / mobile virtual keyboards, key is 'Unidentified' or keyCode 229;
      // let handleBeforeInput / handleChange handle it to avoid dropped keys
      if (e.key === 'Unidentified' || e.keyCode === 229) {
        return;
      }

      const now = performance.now();

      if (e.key === 'Backspace') {
        e.preventDefault();
        engine.handleBackspace();
        lastProcessedTimeRef.current = now;
        lastProcessedCharRef.current = 'Backspace';
        syncState();
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      // Ignore modifiers and non-printable keys
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const normalized = normalizeChar(e.key);
        engine.handleInput(normalized, now);
        lastProcessedTimeRef.current = now;
        lastProcessedCharRef.current = normalized;
        syncState();
        if (inputRef.current) inputRef.current.value = '';
      }
    },
    [engine, syncState, restart]
  );

  // InputEvent handler for mobile / virtual keyboards (iOS Safari, Android Chrome, Gboard, SwiftKey)
  const handleBeforeInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const nativeEvent = e.nativeEvent as InputEvent;
      if (!nativeEvent || engine.getStatus() === 'completed') return;

      const now = performance.now();
      const inputType = nativeEvent.inputType;
      const data = nativeEvent.data;

      // Handle Backspace on mobile keyboards
      if (
        inputType === 'deleteContentBackward' ||
        inputType === 'deleteWordBackward' ||
        inputType === 'deleteHardLineBackward'
      ) {
        // Prevent duplicate if already handled by keydown
        if (lastProcessedCharRef.current === 'Backspace' && now - lastProcessedTimeRef.current < 50) {
          return;
        }
        e.preventDefault();
        engine.handleBackspace();
        lastProcessedTimeRef.current = now;
        lastProcessedCharRef.current = 'Backspace';
        syncState();
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      // Handle text input on mobile keyboards
      if (
        inputType === 'insertText' ||
        inputType === 'insertCompositionText' ||
        inputType === 'insertReplacementText'
      ) {
        if (data) {
          // Prevent duplicate if physical keydown already handled this exact character
          if (
            data.length === 1 &&
            data === lastProcessedCharRef.current &&
            now - lastProcessedTimeRef.current < 50
          ) {
            e.preventDefault();
            if (inputRef.current) inputRef.current.value = '';
            return;
          }

          e.preventDefault();
          for (const rawChar of data) {
            const normalized = normalizeChar(rawChar);
            engine.handleInput(normalized, now);
            lastProcessedCharRef.current = normalized;
          }
          lastProcessedTimeRef.current = now;
          syncState();
          if (inputRef.current) inputRef.current.value = '';
        }
      }
    },
    [engine, syncState]
  );

  // Safety net change handler for mobile devices where beforeinput default cannot be cancelled
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!val || engine.getStatus() === 'completed') return;

      const now = performance.now();
      for (const rawChar of val) {
        const normalized = normalizeChar(rawChar);
        engine.handleInput(normalized, now);
      }
      syncState();
      e.target.value = '';
    },
    [engine, syncState]
  );

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    if (e.data && engine.getStatus() !== 'completed') {
      const now = performance.now();
      for (const rawChar of e.data) {
        const normalized = normalizeChar(rawChar);
        engine.handleInput(normalized, now);
      }
      syncState();
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return {
    status,
    chars,
    currentIndex,
    remainingSeconds,
    metrics,
    wpmHistory,
    targetText: engine.getTargetText(),
    duration,
    inputRef,
    handleKeyDown,
    handleBeforeInput,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
    restart,
  };
}
