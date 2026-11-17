import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { BookOpen, CheckCircle2, Target, Award } from 'lucide-react';

interface TypingPracticePageProps {
  onNavigate?: (path: string) => void;
}

interface Drill {
  id: string;
  title: string;
  category: string;
  description: string;
  targetKeys: string;
}

const DRILLS: Drill[] = [
  {
    id: 'home-row',
    title: 'Home Row Mastery',
    category: 'Beginner',
    description: 'Anchor fingers on ASDF and JKL;. The core foundation of touch typing.',
    targetKeys: 'A S D F J K L ;',
  },
  {
    id: 'top-row',
    title: 'Top Row Reach',
    category: 'Technique',
    description: 'Practice reaching upwards to QWERTY and UIOP without shifting your wrist.',
    targetKeys: 'Q W E R T Y U I O P',
  },
  {
    id: 'bottom-row',
    title: 'Bottom Row Precision',
    category: 'Technique',
    description: 'Downward finger curl for ZXCVB and NM,./ while maintaining light touch.',
    targetKeys: 'Z X C V B N M , . /',
  },
  {
    id: 'common-bigrams',
    title: 'Common Bigrams & Blends',
    category: 'Speed',
    description: 'Master the most frequent two-letter pairs in English (th, he, in, er, an, re).',
    targetKeys: 'th he in er an re nd en',
  },
  {
    id: 'numbers-symbols',
    title: 'Number & Punctuation Row',
    category: 'Advanced',
    description: 'Typing numbers and symbols without breaking your typing cadence.',
    targetKeys: '1 2 3 4 5 6 7 8 9 0 ! ?',
  },
];

export const TypingPracticePage: React.FC<TypingPracticePageProps> = () => {
  const [selectedDrill, setSelectedDrill] = useState<Drill>(DRILLS[0]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">Deliberate Practice</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Touch Typing Lessons & Targeted Practice Drills
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Build subconscious muscle memory, eliminate finger hesitations, and master every zone of the keyboard.
        </p>
      </div>

      {/* Drill Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {DRILLS.map((drill) => {
          const isSelected = selectedDrill.id === drill.id;
          return (
            <button
              key={drill.id}
              onClick={() => setSelectedDrill(drill)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                  : 'border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {drill.category}
                </span>
                <h2 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  {drill.title}
                </h2>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-surface-dark-border text-[11px] font-mono text-brand-600 dark:text-brand-400">
                {drill.targetKeys}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Drill Overview */}
      <div className="mb-6 p-4 rounded-xl bg-slate-100 dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-500" />
            <span>Active Drill: {selectedDrill.title}</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            {selectedDrill.description}
          </p>
        </div>
        <Badge variant="neutral">Target Keys: {selectedDrill.targetKeys}</Badge>
      </div>

      {/* Typing Workspace */}
      <div className="mb-12">
        <TypingWorkspaceShell initialDuration={30} initialMode="words" />
      </div>

      {/* Touch Typing Methodology & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
            <Target className="w-4 h-4" />
            <h3>1. The 100% Accuracy Rule</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Typing fast with errors trains your brain to make mistakes. Slow down until you can type with 98%+
            accuracy before attempting to increase your raw speed.
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <h3>2. Return to the Home Row</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Feel the small tactile bumps on the &apos;F&apos; and &apos;J&apos; keys with your index fingers. After reaching
            up or down for any key, immediately return your fingers to the home row.
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <h3>3. Daily 15-Minute Habit</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Three 5-minute sessions per day are significantly more effective for neuro-muscular adaptation than a
            single 2-hour cram session once a week.
          </p>
        </Card>
      </div>
    </div>
  );
};
