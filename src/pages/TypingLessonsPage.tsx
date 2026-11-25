import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Keyboard as KeyboardIcon, HelpCircle } from 'lucide-react';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';

interface TypingLessonsPageProps {
  onNavigate?: (path: string) => void;
}

interface LessonItem {
  id: number;
  title: string;
  category: string;
  keys: string[];
  fingerGuide: string;
  description: string;
  targetDuration: number;
}

const LESSONS: LessonItem[] = [
  {
    id: 1,
    title: 'Lesson 1: Home Row Keys (F and J)',
    category: 'Home Row Foundation',
    keys: ['F', 'J', 'Space'],
    fingerGuide: 'Left Index on F, Right Index on J, Thumbs on Space',
    description: 'Master the small raised tactile bumps on F and J. These are the physical anchors of touch typing.',
    targetDuration: 60,
  },
  {
    id: 2,
    title: 'Lesson 2: Left Hand Home Row',
    category: 'Home Row Foundation',
    keys: ['A', 'S', 'D', 'F'],
    fingerGuide: 'Pinky (A), Ring (S), Middle (D), Index (F)',
    description: 'Drill left-hand muscular coordination across the four primary home keys without looking down.',
    targetDuration: 60,
  },
  {
    id: 3,
    title: 'Lesson 3: Right Hand Home Row',
    category: 'Home Row Foundation',
    keys: ['J', 'K', 'L', ';'],
    fingerGuide: 'Index (J), Middle (K), Ring (L), Pinky (;)',
    description: 'Anchor the right hand across J, K, L, and semicolon. Establish smooth alternating rhythm.',
    targetDuration: 60,
  },
  {
    id: 4,
    title: 'Lesson 4: Center Reaches & Enter',
    category: 'Home Row Expansion',
    keys: ['G', 'H', "'", 'Enter'],
    fingerGuide: 'Left Index reaches to G, Right Index reaches to H',
    description: 'Train lateral finger stretches to the center keys and return immediately to the anchor bumps.',
    targetDuration: 60,
  },
  {
    id: 5,
    title: 'Lesson 5: Top Row Left Hand',
    category: 'Top Row Mastery',
    keys: ['Q', 'W', 'E', 'R', 'T'],
    fingerGuide: 'Pinky (Q), Ring (W), Middle (E), Index (R/T)',
    description: 'Reach upward diagonally from the home row. Ensure fingers return home after each keystroke.',
    targetDuration: 60,
  },
  {
    id: 6,
    title: 'Lesson 6: Top Row Right Hand',
    category: 'Top Row Mastery',
    keys: ['Y', 'U', 'I', 'O', 'P'],
    fingerGuide: 'Index (Y/U), Middle (I), Ring (O), Pinky (P)',
    description: 'Complete the top row alphabet reach. Master the common English vowels E, I, O, and U.',
    targetDuration: 60,
  },
  {
    id: 7,
    title: 'Lesson 7: Bottom Row Left Hand',
    category: 'Bottom Row Agility',
    keys: ['Z', 'X', 'C', 'V'],
    fingerGuide: 'Pinky (Z), Ring (X), Middle (C), Index (V)',
    description: 'Downward diagonal reaches require relaxed wrists and gentle curved fingers to prevent strain.',
    targetDuration: 60,
  },
  {
    id: 8,
    title: 'Lesson 8: Bottom Row Right Hand',
    category: 'Bottom Row Agility',
    keys: ['B', 'N', 'M', ',', '.'],
    fingerGuide: 'Index (B/N), Middle (M), Ring (,), Pinky (.)',
    description: 'Master bottom row navigation including period and comma for punctuation fluidity.',
    targetDuration: 60,
  },
  {
    id: 9,
    title: 'Lesson 9: Number Row Drills',
    category: 'Numbers & Symbols',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    fingerGuide: 'Extend fingers upward two rows while keeping palm resting position steady',
    description: 'Eliminate the habit of glancing down at digits. Train muscle memory for rapid numerical entry.',
    targetDuration: 60,
  },
  {
    id: 10,
    title: 'Lesson 10: Touch-Typing Graduation Test',
    category: 'Full Keyboard Mastery',
    keys: ['Full Alphabet', 'Punctuation', 'Capitalization'],
    fingerGuide: 'All 10 fingers functioning collaboratively across all keyboard rows',
    description: 'Comprehensive 60-second speed & accuracy evaluation testing full touch-typing fluency.',
    targetDuration: 60,
  },
];

export const TypingLessonsPage: React.FC<TypingLessonsPageProps> = ({ onNavigate: _onNavigate }) => {
  const [activeLessonId, setActiveLessonId] = useState<number>(1);
  const activeLesson = LESSONS.find((l) => l.id === activeLessonId) || LESSONS[0];

  return (
    <div className="space-y-12 py-6">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Touch Typing Academy • 10-Step Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Free Typing Lessons
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Learn touch typing from scratch with step-by-step interactive drills. Master finger placement, build muscle memory, and stop looking at the keyboard.
        </p>
      </div>

      {/* Main Interactive Lesson Shell */}
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Active Lesson Header Banner */}
        <div className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {activeLesson.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {activeLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {activeLesson.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Focus Keys:</span>
            {activeLesson.keys.map((k) => (
              <span
                key={k}
                className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-xs"
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* Embedded Practice Engine */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border p-4 sm:p-6 shadow-sm">
          <TypingWorkspaceShell
            key={`lesson-${activeLessonId}`}
            initialDuration={60}
            initialMode="words"
            initialDifficulty={activeLessonId <= 4 ? 'easy' : activeLessonId <= 8 ? 'medium' : 'hard'}
          />
        </div>

        {/* Finger Placement Guidance Box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <KeyboardIcon className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-white">Proper Finger Placement: </strong>
            {activeLesson.fingerGuide}. Curve your fingers naturally like holding a tennis ball. Always return your fingers to the home row anchor keys between words.
          </div>
        </div>
      </div>

      {/* Curriculum Lesson Selector Grid */}
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complete Lesson Curriculum</h2>
          <span className="text-xs font-semibold text-slate-400">10 Structured Lessons</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LESSONS.map((lesson) => {
            const isActive = lesson.id === activeLessonId;
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-brand-50/60 dark:bg-brand-950/30 border-brand-500 shadow-xs'
                    : 'bg-white dark:bg-surface-dark-card border-surface-light-border dark:border-surface-dark-border hover:border-brand-300 dark:hover:border-brand-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Step {lesson.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{lesson.category}</span>
                  </div>
                  <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {lesson.title.replace(/^Lesson \d+: /, '')}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {lesson.description}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-300 dark:text-slate-600'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Educational Article Content: How to Learn Touch Typing */}
      <div className="max-w-4xl mx-auto px-4 space-y-8 pt-6 border-t border-slate-200 dark:border-surface-dark-border">
        <article className="prose dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How Long Does It Take to Learn Touch Typing?
          </h2>
          <div className="p-5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800 not-prose my-4">
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              Learning touch typing typically takes two to three weeks of consistent 15-minute daily practice. Most dedicated beginners progress from hunt-and-peck typing to 30–40 WPM without looking at the keyboard within 20 days. Reaching 50 to 65 WPM with 95% accuracy usually requires two months of steady muscle memory training.
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            The Fundamental Principles of Touch Typing
          </h3>
          <p>
            Touch typing is the discipline of typing without visually consulting your keyboard. Instead of "hunting and pecking" with two fingers, touch typists rely entirely on neuromuscular muscle memory, positioning all ten fingers over dedicated keyboard sectors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>1. Never Look Down</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Resist looking at your hands. If you hit a wrong key, feeling where the error occurred builds faster neural pathways than visually hunting for it.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>2. Anchor on F and J</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your index fingers rest on the tactile ridges of F and J. Whenever your fingers reach for the top or bottom row, bounce them back home.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>3. Accuracy Over Speed</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Speed is an effortless byproduct of accuracy. Train at a steady tempo where you make fewer than 2 mistakes per 100 keystrokes.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Daily Practice Recommendation
          </h3>
          <p>
            Consistent 15-minute daily sessions produce significantly faster muscle memory adaptation than a single 2-hour cram session. Work through Lessons 1 through 4 during week one. Advance to top and bottom rows during week two, and test your speed on our 1-minute and 5-minute typing tests in week three.
          </p>
        </article>

        {/* FAQ Section */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-surface-dark-border">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <span>Frequently Asked Questions About Typing Lessons</span>
          </div>

          <div className="space-y-3">
            <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                How long does it take to learn touch typing?
              </summary>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                Most beginners achieve 30 to 40 WPM within two to three weeks of consistent 15-minute daily practice. Mastery beyond 60+ WPM generally takes two to three months of regular typing and deliberate error-reduction drills.
              </p>
            </details>

            <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                Are these typing lessons completely free?
              </summary>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                Yes. All 10 lessons on CheckTypingSpeeds are 100% free with no account registration, subscriptions, or intrusive display ads. All test evaluations happen client-side in your web browser.
              </p>
            </details>

            <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                Why do keyboards have little bumps on the F and J keys?
              </summary>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                The tactile bumps on the F and J keys are physical indexing guides invented in 1988 by June E. Botich. They allow touch typists to orient their hands on the home row by touch alone without ever having to look down from their monitor.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};
