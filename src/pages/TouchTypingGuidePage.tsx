import React from 'react';
import { ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface TouchTypingGuidePageProps {
  onNavigate?: (path: string) => void;
}

export const TouchTypingGuidePage: React.FC<TouchTypingGuidePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Touch Typing Complete Guide & Ergonomics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          What Is Touch Typing? The Definitive Guide
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Understand the biomechanics of touch typing, the 8 home row anchor keys, ergonomic posture, and how to double your typing speed without looking down.
        </p>
      </div>

      {/* Quick Definition Callout Box for AEO / Featured Snippets */}
      <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
          Definition Summary
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          <strong>Touch typing</strong> is a method of typing without looking at the keyboard, relying entirely on tactile muscle memory to locate keys using eight home-row anchor positions (<strong>A, S, D, F</strong> for the left hand and <strong>J, K, L, ;</strong> for the right hand). By dedicating each finger to a specific geometric zone, touch typists achieve sustained speeds exceeding 60 to 100+ Words Per Minute (WPM).
        </p>
      </div>

      {/* Main Content Article */}
      <article className="prose dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            1. The Biomechanics of the Home Row Anchor System
          </h2>
          <p>
            In standard QWERTY touch typing, your fingers maintain a resting home base on the middle row of the keyboard. This layout divides the keyboard symmetrically between your two hands:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-2">
              <div className="font-bold text-slate-900 dark:text-white text-sm">Left Hand Home Keys</div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                <li>• Pinky finger: <strong>A</strong> (also reaches Q, Z, Shift)</li>
                <li>• Ring finger: <strong>S</strong> (also reaches W, X)</li>
                <li>• Middle finger: <strong>D</strong> (also reaches E, C)</li>
                <li>• Index finger: <strong>F</strong> (tactile bump anchor, reaches R, T, G, V, B)</li>
                <li>• Thumb: <strong>Space Bar</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-2">
              <div className="font-bold text-slate-900 dark:text-white text-sm">Right Hand Home Keys</div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                <li>• Index finger: <strong>J</strong> (tactile bump anchor, reaches Y, U, H, N, M)</li>
                <li>• Middle finger: <strong>K</strong> (also reaches I, comma ,)</li>
                <li>• Ring finger: <strong>L</strong> (also reaches O, period .)</li>
                <li>• Pinky finger: <strong>;</strong> (also reaches P, slash /, Enter, Shift)</li>
                <li>• Thumb: <strong>Space Bar</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            2. The 5 Golden Rules of Touch Typing
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Never gaze down at the keyboard:</strong> Looking at your hands breaks the cognitive loop between visual text comprehension and motor execution. Trust your fingers.
            </li>
            <li>
              <strong>Always return to home base:</strong> After striking an upward key (such as <em>E</em> or <em>T</em>) or downward key (such as <em>C</em> or <em>V</em>), immediately retract your fingers to rest lightly on the home row.
            </li>
            <li>
              <strong>Prioritize rhythm and cadence over sudden speed bursts:</strong> Fast typing is smooth and metronomic. Typists who sprint through easy words and stall on difficult ones make 4x more errors.
            </li>
            <li>
              <strong>Maintain 98%+ accuracy:</strong> Correcting errors requires hitting backspace, locating the mistake, and re-typing, which penalizes your net speed drastically.
            </li>
            <li>
              <strong>Use both thumbs for the space bar:</strong> Standard convention assigns the space bar to the thumb of your dominant writing hand, or alternates depending on the preceding letter.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            3. Ergonomics and Injury Prevention
          </h2>
          <p>
            Repetitive Strain Injury (RSI) and Carpal Tunnel Syndrome occur when typists place undue tension on their wrists and forearm flexor tendons. Follow these ergonomic adjustments:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Floating Wrists:</strong> Keep wrists straight and elevated slightly above the desk while typing; do not plant them rigidly on a wrist rest while keystrokes are in flight.</li>
            <li><strong>Elbow Angle:</strong> Maintain elbows at a 90 to 100-degree relaxed angle close to your torso.</li>
            <li><strong>Monitor Position:</strong> Position your screen so the top third of the monitor aligns with your natural eye level, preventing neck strain.</li>
          </ul>
        </section>
      </article>

      {/* CTA Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Ready to Master Touch Typing?</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Start our free 10-step curriculum with interactive finger guidance.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={() => onNavigate && onNavigate('/typing-lessons/')}
            className="w-full sm:w-auto gap-2"
          >
            <span>Start Lesson 1</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-surface-dark-border">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <HelpCircle className="w-5 h-5 text-brand-500" />
          <span>Frequently Asked Questions About Touch Typing</span>
        </div>

        <div className="space-y-3">
          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              What is the difference between hunt-and-peck and touch typing?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Hunt-and-peck is a visual typing method where a person uses two to four fingers and looks back and forth between the keyboard and monitor. Touch typing utilizes all ten fingers anchored to designated positions, relying entirely on muscle memory without ever looking at the keyboard.
            </p>
          </details>

          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              Is touch typing faster than two-finger typing?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Yes. While exceptional two-finger typists occasionally peak around 50–60 WPM, touch typists routinely reach 80 to 120+ WPM with dramatically lower cognitive strain and higher physical ergonomics.
            </p>
          </details>

          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              Which keyboard layout is best for touch typing?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              QWERTY is the universal standard for virtually all computers and competitive exams. Alternative ergonomic layouts like Dvorak and Colemak reduce finger travel distance, but QWERTY remains the global standard for workplaces and government examinations.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};
