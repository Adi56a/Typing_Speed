import React from 'react';
import { WordCascadeGame } from '../features/games/WordCascadeGame';
import { Gamepad2, Trophy, Flame, Target, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface TypingGamesPageProps {
  onNavigate?: (path: string) => void;
}

export const TypingGamesPage: React.FC<TypingGamesPageProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-slate-200 dark:border-surface-dark-border text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-surface-dark-card mb-3">
          <Gamepad2 className="w-3.5 h-3.5 text-brand-500" />
          <span>Interactive Kinetic Muscle Memory Training</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          Typing Games
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Sharpen keystroke reflexes, crush finger hesitation, and break through WPM plateaus with kinetic typing challenges.
        </p>
      </section>

      {/* Featured Game: Word Cascade */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <WordCascadeGame />
      </section>

      {/* Game Catalog & Practice Suite */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Typing Challenge Arcade
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore diverse training modes designed to develop speed bursts, symbol fluency, and continuous focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col justify-between border-2 border-brand-500/30">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  Active Game
                </span>
                <Flame className="w-4 h-4 text-ochre-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Word Cascade: Defense
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Vaporize descending vocabulary before it breaches your perimeter. Builds rapid visual target acquisition
                and reflex finger initiation.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-surface-dark-border text-xs font-semibold text-brand-600 dark:text-brand-400">
              ● Ready to Play Above
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-light-muted text-slate-700 dark:bg-surface-dark-muted dark:text-slate-300">
                  Benchmark Mode
                </span>
                <Target className="w-4 h-4 text-brand-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Timed Speed Sprints
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Structured 1-minute and 5-minute timed typing tests with deterministic Net WPM scoring, error penalties,
                and exam certificates.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-surface-dark-border">
              <a
                href="/typing-test/1-minute/"
                onClick={(e) => handleLinkClick(e, '/typing-test/1-minute/')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Launch 1-Min Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ochre-100 text-ochre-800 dark:bg-ochre-950 dark:text-ochre-300">
                  Targeted Drills
                </span>
                <Trophy className="w-4 h-4 text-ochre-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Home Row & Bigram Drills
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Master the fundamental finger anchors (ASDF JKL;) and the 50 most common English letter pairings
                to build unshakeable speed.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-surface-dark-border">
              <a
                href="/typing-practice/"
                onClick={(e) => handleLinkClick(e, '/typing-practice/')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Explore Drills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Authoritative Educational & Cognitive Science Content */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="border-t border-slate-200 dark:border-surface-dark-border pt-12">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Cognitive Science of Gamified Typing
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
            Why dynamic, time-pressured arcade games break mechanical speed plateaus faster than passive reading.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                1. Eliminating the Visual Confirmation Feedback Loop
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                When practicing on standard static paragraphs, beginners frequently glance between the screen and their hands to verify key locations. This creates a conscious latency penalty of <strong>180 to 250 milliseconds per character</strong>. In kinetic typing games like <em>Word Cascade</em>, the downward movement of the target forces the player’s gaze to stay locked on the descending word, forcing the motor cortex to execute keystrokes entirely via proprioceptive muscle memory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                2. Overcoming the 60 WPM Skill Plateau
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Most self-taught typists plateau between 50 and 65 WPM because they read and type on a letter-by-letter basis. Kinetic arcade games train <strong>word-level recognition (chunking)</strong>:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Motor Chunking:</strong> Common prefixes and suffixes (such as <em>-tion</em>, <em>-ing</em>, <em>pre-</em>, and <em>inter-</em>) are executed as single fluid motor cascades rather than separate finger decisions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Stress Tolerance:</strong> Simulating time pressure conditions trains autonomic nervous system resilience, ensuring you stay calm and accurate during real-world exams like SSC, CPCT, or court stenography tests.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant Auditory Reinforcement:</strong> Immediate pitch-based audio cues inform the brain of typing success without requiring visual verification.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

