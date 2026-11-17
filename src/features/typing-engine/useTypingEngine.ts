import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TypingEngine, CharState, EngineStatus, WpmSample } from './engine';
import { generateTestText, TextOptions } from './textBank';
import { TestDuration, TestMode, TestDifficulty, TypingMetrics } from '../../types';

export interface UseTypingEngineProps {
  duration?: TestDuration;
  mode?: TestMode;
  difficulty?: TestDifficulty;
  punctuation?: boolean;
  numbers?: boolean;
}

export function useTypingEngine(props: UseTypingEngineProps = {}) {
  const {
    duration = 60,
    mode = 'words',
    difficulty = 'easy',
    punctuation = false,
    numbers = false,
  } = props;

  const [engine, setEngine] = useState<TypingEngine>(() => {
    const initialText = generateTestText({ mode, difficulty, punctuation, numbers, wordCount: 80 });
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
    (customOptions?: Partial<TextOptions & { duration: TestDuration }>) => {
      const activeDuration = customOptions?.duration || duration;
      const activeMode = customOptions?.mode || mode;
      const activeDiff = customOptions?.difficulty || difficulty;
      const activePunct = customOptions?.punctuation !== undefined ? customOptions.punctuation : punctuation;
      const activeNums = customOptions?.numbers !== undefined ? customOptions.numbers : numbers;

      const newText = generateTestText({
        mode: activeMode,
        difficulty: activeDiff,
        punctuation: activePunct,
        numbers: activeNums,
        wordCount: 80,
      });

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
    [duration, mode, difficulty, punctuation, numbers]
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

  // Key event handler
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

      const now = performance.now();

      if (e.key === 'Backspace') {
        e.preventDefault();
        engine.handleBackspace();
        syncState();
        return;
      }

      // Ignore modifiers and non-printable keys
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        engine.handleInput(e.key, now);
        syncState();
      }
    },
    [engine, syncState, restart]
  );

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    if (e.data && engine.getStatus() !== 'completed') {
      const now = performance.now();
      for (const char of e.data) {
        engine.handleInput(char, now);
      }
      syncState();
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
    handleCompositionStart,
    handleCompositionEnd,
    restart,
  };
}
