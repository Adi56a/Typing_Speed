import React, { useState, useEffect } from 'react';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { TestDuration } from '../types';

interface SharedResultPageProps {
  onNavigate?: (path: string) => void;
}

export const SharedResultPage: React.FC<SharedResultPageProps> = ({ onNavigate: _onNavigate }) => {
  const [wpm, setWpm] = useState<number>(65);
  const [accuracy, setAccuracy] = useState<number>(98);
  const [duration, setDuration] = useState<TestDuration>(60);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const rawW = parseInt(params.get('w') || '65', 10);
      const rawA = parseInt(params.get('a') || '98', 10);
      const rawD = parseInt(params.get('d') || '60', 10);

      // Validate bounds
      if (!isNaN(rawW) && rawW >= 0 && rawW <= 250) setWpm(rawW);
      if (!isNaN(rawA) && rawA >= 0 && rawA <= 100) setAccuracy(rawA);
      if ([15, 30, 60, 120, 180, 300, 600, 900].includes(rawD)) {
        setDuration(rawD as TestDuration);
      }
    }
  }, []);

  const durationLabel =
    duration === 30
      ? '30 Second'
      : duration === 60
        ? '1 Minute'
        : duration === 120
          ? '2 Minute'
          : duration === 180
            ? '3 Minute'
            : duration === 300
              ? '5 Minute'
              : duration === 600
                ? '10 Minute'
                : `${duration}s`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Challenger Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 text-white shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-brand-100 border border-white/20">
          <Trophy className="w-3.5 h-3.5 text-ochre-300" />
          <span>Score Challenge</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Can You Beat This Score?
        </h1>

        <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto">
          A friend challenged you to beat their typing score achieved on a {durationLabel} test.
        </p>

        {/* Score Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
          <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[120px]">
            <div className="text-xs uppercase text-brand-200 font-semibold">Speed</div>
            <div className="text-3xl sm:text-4xl font-black font-mono mt-0.5">{wpm} <span className="text-sm font-normal">WPM</span></div>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[120px]">
            <div className="text-xs uppercase text-brand-200 font-semibold">Accuracy</div>
            <div className="text-3xl sm:text-4xl font-black font-mono mt-0.5">{accuracy}%</div>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[120px]">
            <div className="text-xs uppercase text-brand-200 font-semibold">Length</div>
            <div className="text-3xl sm:text-4xl font-black font-mono mt-0.5">{duration}s</div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              const testBox = document.querySelector('[data-test-box]');
              if (testBox) {
                testBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="px-6 py-3 text-sm font-bold shadow-lg"
          >
            <span>Beat This Score Now</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Typing Workspace */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Take Your Free {durationLabel} Typing Test
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Type the passage below to see if your WPM beats the benchmark.
          </p>
        </div>

        <TypingWorkspaceShell initialDuration={duration} initialMode="words" />
      </div>
    </div>
  );
};
