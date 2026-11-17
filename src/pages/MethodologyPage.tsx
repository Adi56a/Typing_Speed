import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Cpu, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">Technical Methodology</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Typing Engine & Measurement Methodology
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          How TypeFast ensures sub-millisecond precision, clock drift immunity, and mathematically sound touch-typing scoring.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Monotonic Clock */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-500" />
            <span>1. Monotonic Timing vs. Interval Tick Drift</span>
          </h2>
          <p>
            Many legacy typing websites measure elapsed time by running a JavaScript <code>setInterval(fn, 1000)</code> and
            incrementing a seconds counter. However, when browser tabs are backgrounded or when the CPU experiences a brief
            workload spike, JavaScript timers are throttled by the browser runtime, causing significant drift (often 10–20%
            error over a 5-minute test).
          </p>
          <p>
            <strong>TypeFast eliminates timer drift by using monotonic hardware timestamps:</strong>
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-surface-dark-border">
            elapsedMilliseconds = performance.now() - testStartTime;
            <br />
            elapsedMinutes = elapsedMilliseconds / 60000;
          </div>
          <p>
            By computing elapsed duration directly against the system&apos;s high-resolution monotonic clock on every frame,
            our timer remains perfectly accurate to the millisecond regardless of tab switching or CPU throttling.
          </p>
        </Card>

        {/* Standard 5-Character Word Rule */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>2. The 5-Character Standard Word Rule</span>
          </h2>
          <p>
            In professional touch typing, raw space-delimited word counts can fluctuate wildly depending on vocabulary
            difficulty. To ensure fair and reproducible measurement:
          </p>
          <ul className="space-y-2 list-none p-0">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>1 Standard Word = 5 Keystrokes:</strong> Every 5 characters typed (including letters, spaces, and punctuation) counts as exactly 1 word.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Gross WPM (Words Per Minute):</strong> Calculated as <code>(Total Characters Typed / 5) / Elapsed Minutes</code>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Net WPM (Penalized Speed):</strong> Calculated as <code>max(0, Gross WPM - (Uncorrected Errors / 5) / Elapsed Minutes)</code>.
              </span>
            </li>
          </ul>
        </Card>

        {/* Input Method and Unicode Handling */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-500" />
            <span>3. Unicode &amp; Input Method Composition (IME)</span>
          </h2>
          <p>
            To prevent partial keystrokes during complex multi-key compositions (such as accents or Devanagari/Hindi matras)
            from corrupting your score, our engine hooks into standard DOM composition events:
          </p>
          <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm">
            <li><code>compositionstart</code>: Pauses single-keystroke counting during intermediate character construction.</li>
            <li><code>compositionend</code>: Commits only the final normalized Unicode character string to the typing engine.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

