import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, AlertCircle, RotateCcw, Clock, CheckCircle2, HelpCircle, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { evaluateSscPassage, SscEvaluationResult } from '../features/typing-engine/scoring';

interface SscTypingTestPageProps {
  onNavigate?: (path: string) => void;
}

const SSC_PASSAGES = {
  cgl: `The economic progress of a developing nation is profoundly linked to the modernization of its administrative and digital infrastructure. Over the past decade, governance systems have transitioned rapidly toward automated service delivery, ensuring that public resources are distributed with enhanced transparency and minimal friction. Civil servants and data operators bear the critical responsibility of maintaining absolute fidelity in official documentation, legislative records, and public communications. Accuracy in key depressions is not merely a technical prerequisite; it represents the bedrock of administrative precision. A single typographical substitution or omitted clause in legal proceedings can alter statutory interpretations and compromise procedural fairness. Therefore, competitive examinations rigorously evaluate typing stamina, error tolerance, and sustained focus under strict time constraints. Candidates must cultivate disciplined touch typing habits, keeping their wrists elevated and their attention anchored strictly on the master text without pausing to inspect the physical keyboard.`,
  chsl: `Public administration in the modern era demands swift, reliable, and error-free processing of citizen grievances and departmental correspondence. Data entry operators serving across various ministries and subordinate offices act as the primary interface between governance policy and operational execution. The Staff Selection Commission mandates a minimum benchmark of thirty-five words per minute in English, corresponding to ten thousand five hundred key depressions per hour, to ensure that candidates possess the necessary cadence and cognitive stamina for demanding clerical assignments. While raw keystroke speed is advantageous, the evaluation methodology strictly penalizes uncorrected omissions, unwarranted substitutions, and irregular spacing. Candidates are strongly encouraged to train with consistent daily drills, prioritizing ninety-five percent accuracy before attempting to accelerate their typing velocity. Sustained concentration and ergonomic posture remain the most dependable pathways toward qualifying the skill assessment test.`,
  court: `The judicial system functions on the immutable principle that justice must not only be done, but must manifestly and undoubtedly be seen to be done. Court stenographers and bench typists occupy positions of extraordinary trust, transcribing verbatim testimony, witness affidavits, and judicial decrees in real-time courtroom proceedings. Any deviation between the spoken deposition and the transcribed court record can result in severe miscarriages of justice, prolonged appellate litigation, and irreversible prejudice to litigants. Candidates aspiring to judicial clerical services must demonstrate flawless accuracy, impeccable punctuation discipline, and the psychological composure required to type continuously under high-pressure hearing conditions. Regular training with formal legal vocabulary and multi-sentence syntax is indispensable for success.`,
};

export const SscTypingTestPage: React.FC<SscTypingTestPageProps> = ({ onNavigate: _onNavigate }) => {
  const [examType, setExamType] = useState<'cgl' | 'chsl' | 'court'>('cgl');
  const [category, setCategory] = useState<'UR' | 'RESERVED'>('UR');
  const [testDurationMinutes, setTestDurationMinutes] = useState<number>(15);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [examResult, setExamResult] = useState<SscEvaluationResult | null>(null);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const activeMasterPassage = SSC_PASSAGES[examType];

  // Set duration according to exam type
  useEffect(() => {
    if (examType === 'cgl') setTestDurationMinutes(15);
    else if (examType === 'chsl') setTestDurationMinutes(10);
    else if (examType === 'court') setTestDurationMinutes(5);
    handleReset();
  }, [examType]);

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsStarted(false);
    setIsCompleted(false);
    setTypedText('');
    setElapsedSeconds(0);
    setExamResult(null);
    startTimeRef.current = null;
  };

  const handleStartExam = () => {
    handleReset();
    setIsStarted(true);
    startTimeRef.current = performance.now();
    if (inputRef.current) {
      inputRef.current.focus();
    }

    timerRef.current = window.setInterval(() => {
      if (!startTimeRef.current) return;
      const now = performance.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);

      const totalTargetSeconds = testDurationMinutes * 60;
      if (elapsed >= totalTargetSeconds) {
        handleFinishExam(activeMasterPassage, typedText, testDurationMinutes, category);
      }
    }, 1000);
  };

  const handleFinishExam = (
    master: string,
    typed: string,
    durationMins: number,
    cat: 'UR' | 'RESERVED'
  ) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsStarted(false);
    setIsCompleted(true);

    const actualMinutes = elapsedSeconds > 0 ? elapsedSeconds / 60 : durationMins;
    const result = evaluateSscPassage(master, typed, actualMinutes, cat);
    setExamResult(result);
  };

  const remainingSeconds = Math.max(0, testDurationMinutes * 60 - elapsedSeconds);
  const minutesLeft = Math.floor(remainingSeconds / 60);
  const secondsLeft = remainingSeconds % 60;

  // Live KDPH estimation
  const currentKeystrokes = typedText.length;
  const liveMinutes = Math.max(0.1, elapsedSeconds / 60);
  const liveKdph = Math.round((currentKeystrokes / liveMinutes) * 60);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ochre-100 dark:bg-ochre-950/40 border border-ochre-300 dark:border-ochre-800 text-xs font-bold text-ochre-800 dark:text-ochre-300">
          <ShieldCheck className="w-4 h-4 text-ochre-600 dark:text-ochre-400" />
          <span>SSC CGL DEST & CHSL Official Typing Exam Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Indian Government Typing Test Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Simulate official Staff Selection Commission (SSC) typing skill tests with authentic two-pane interface, KDPH live counter, and Full/Half mistake evaluation.
        </p>
      </div>

      {/* Exam Configuration Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Exam Type Toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Exam:</span>
          <button
            onClick={() => setExamType('cgl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              examType === 'cgl'
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-slate-50 dark:bg-surface-dark-muted text-slate-700 dark:text-slate-300 border-slate-200 dark:border-surface-dark-border'
            }`}
          >
            SSC CGL DEST (15 Min / 2000 Strokes)
          </button>
          <button
            onClick={() => setExamType('chsl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              examType === 'chsl'
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-slate-50 dark:bg-surface-dark-muted text-slate-700 dark:text-slate-300 border-slate-200 dark:border-surface-dark-border'
            }`}
          >
            SSC CHSL (10 Min / 35 WPM)
          </button>
          <button
            onClick={() => setExamType('court')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              examType === 'court'
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-slate-50 dark:bg-surface-dark-muted text-slate-700 dark:text-slate-300 border-slate-200 dark:border-surface-dark-border'
            }`}
          >
            High Court / Steno (5 Min)
          </button>
        </div>

        {/* Category Tolerance Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cut-off:</span>
          <button
            onClick={() => setCategory('UR')}
            className={`px-2.5 py-1 text-xs font-semibold rounded border ${
              category === 'UR'
                ? 'bg-ochre-600 text-white border-ochre-600'
                : 'bg-slate-100 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400 border-transparent'
            }`}
          >
            UR / General (Max 7% Error)
          </button>
          <button
            onClick={() => setCategory('RESERVED')}
            className={`px-2.5 py-1 text-xs font-semibold rounded border ${
              category === 'RESERVED'
                ? 'bg-ochre-600 text-white border-ochre-600'
                : 'bg-slate-100 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400 border-transparent'
            }`}
          >
            OBC / SC / ST (Max 10% Error)
          </button>
        </div>
      </div>

      {/* Main Two-Pane Exam Console */}
      <div className="space-y-4">
        {/* Exam Status Bar */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-ochre-400" />
            <span>Time Left: {String(minutesLeft).padStart(2, '0')}:{String(secondsLeft).padStart(2, '0')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div>Strokes: {currentKeystrokes}</div>
            <div>Live KDPH: {isStarted ? liveKdph : 0}</div>
            <div className="text-ochre-300">Norm: {examType === 'cgl' ? '8,000 KDPH' : '10,500 KDPH'}</div>
          </div>
        </div>

        {/* Top Pane: Official Master Passage */}
        <div className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-surface-dark-border pb-2">
            <span>Official Master Passage (Replicating SSC Exam Software)</span>
            <span>Length: {activeMasterPassage.length} Characters (~{activeMasterPassage.split(' ').length} Words)</span>
          </div>
          <div className="font-mono text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 select-none max-h-48 overflow-y-auto p-2 bg-slate-50/50 dark:bg-surface-dark-muted/30 rounded-lg">
            {activeMasterPassage}
          </div>
        </div>

        {/* Bottom Pane: Candidate Input Box */}
        <div className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-surface-dark-border pb-2">
            <span>Candidate Typing Area (Backspace Allowed)</span>
            <span className={currentKeystrokes >= 2000 ? 'text-emerald-500' : 'text-slate-400'}>
              Progress: {currentKeystrokes} / {examType === 'cgl' ? '2000' : '1750'} Keystrokes
            </span>
          </div>

          <textarea
            ref={inputRef}
            disabled={!isStarted || isCompleted}
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder={isStarted ? 'Type the passage exactly as shown above. Maintain accurate spacing and capitalization...' : 'Click "Start Exam Session" below to begin the timer...'}
            className="w-full h-44 p-4 font-mono text-sm sm:text-base rounded-xl border border-slate-200 dark:border-surface-dark-border bg-slate-50 dark:bg-surface-dark-muted text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none leading-relaxed"
          />

          {/* Exam Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500">
              *Full mistakes (1.0): omissions, substitutions. Half mistakes (0.5): capitalization, spacing, punctuation.
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isStarted && !isCompleted && (
                <Button variant="primary" size="lg" onClick={handleStartExam} className="w-full sm:w-auto">
                  Start Exam Session
                </Button>
              )}
              {isStarted && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleFinishExam(activeMasterPassage, typedText, testDurationMinutes, category)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit & Evaluate
                </Button>
              )}
              {(isStarted || isCompleted) && (
                <Button variant="secondary" size="lg" onClick={handleReset} className="w-full sm:w-auto gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Official Exam Evaluation Result Card */}
      {examResult && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-surface-dark-border pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Staff Selection Commission Evaluation
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Exam Qualification Assessment
              </h2>
            </div>
            <div
              className={`px-4 py-2 rounded-xl text-sm font-extrabold flex items-center gap-2 ${
                examResult.isQualified
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
              }`}
            >
              {examResult.isQualified ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>QUALIFIED FOR APPOINTMENT</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span>DISQUALIFIED (ERROR EXCEEDED CUTOFF)</span>
                </>
              )}
            </div>
          </div>

          {/* Primary Scoring Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
              <div className="text-[10px] uppercase font-bold text-slate-500">Total Mistakes</div>
              <div className="text-3xl font-black font-mono text-slate-900 dark:text-white my-1">
                {examResult.totalMistakes}
              </div>
              <div className="text-[11px] text-slate-400">
                Full: {examResult.fullMistakes} | Half: {examResult.halfMistakes}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
              <div className="text-[10px] uppercase font-bold text-slate-500">Error Percentage</div>
              <div
                className={`text-3xl font-black font-mono my-1 ${
                  examResult.errorPercentage <= examResult.permissibleLimit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {examResult.errorPercentage}%
              </div>
              <div className="text-[11px] text-slate-400">
                Permissible Ceiling: {examResult.permissibleLimit}%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
              <div className="text-[10px] uppercase font-bold text-slate-500">Key Depressions / Hour</div>
              <div className="text-3xl font-black font-mono text-slate-900 dark:text-white my-1">
                {examResult.kdph}
              </div>
              <div className="text-[11px] text-slate-400">KDPH Benchmark</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
              <div className="text-[10px] uppercase font-bold text-slate-500">Net Typing Speed</div>
              <div className="text-3xl font-black font-mono text-brand-600 dark:text-brand-400 my-1">
                {examResult.netWpm}
              </div>
              <div className="text-[11px] text-slate-400">Net Words / Minute</div>
            </div>
          </div>

          {/* Granular Mistake Analysis Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Itemized Mistake Breakdown (Official SSC Rubric)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
                <span className="text-slate-500">Omissions (1.0 Mistake):</span>
                <span className="font-mono font-bold float-right text-slate-900 dark:text-white">{examResult.details.omissions}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
                <span className="text-slate-500">Substitutions (1.0 Mistake):</span>
                <span className="font-mono font-bold float-right text-slate-900 dark:text-white">{examResult.details.substitutions}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
                <span className="text-slate-500">Additions (1.0 Mistake):</span>
                <span className="font-mono font-bold float-right text-slate-900 dark:text-white">{examResult.details.additions}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
                <span className="text-slate-500">Capitalization (0.5 Mistake):</span>
                <span className="font-mono font-bold float-right text-slate-900 dark:text-white">{examResult.details.capitalizationErrors}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
                <span className="text-slate-500">Punctuation (0.5 Mistake):</span>
                <span className="font-mono font-bold float-right text-slate-900 dark:text-white">{examResult.details.punctuationErrors}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
                <span className="text-slate-500">Spacing Slips (0.5 Mistake):</span>
                <span className="font-mono font-bold float-right text-slate-900 dark:text-white">{examResult.details.spacingErrors}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official SSC Exam Rules Reference Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-500" />
          <span>Official SSC Typing Test Guidelines & Evaluation Scheme</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-surface-dark-border text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Examination Category</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Speed Benchmark</th>
                <th className="py-2.5 px-3">Key Depressions (KDPH)</th>
                <th className="py-2.5 px-3">Permissible Error %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">SSC CGL Tier 2 DEST</td>
                <td className="py-3 px-3 font-mono">15 Minutes</td>
                <td className="py-3 px-3 font-mono">~27 WPM (2,000 Keystrokes)</td>
                <td className="py-3 px-3 font-mono">8,000 KDPH</td>
                <td className="py-3 px-3 font-mono text-ochre-600 dark:text-ochre-400 font-bold">UR: 7% | Reserved: 10%</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">SSC CHSL (LDC / JSA)</td>
                <td className="py-3 px-3 font-mono">10 Minutes</td>
                <td className="py-3 px-3 font-mono">35 WPM (English)</td>
                <td className="py-3 px-3 font-mono">10,500 KDPH</td>
                <td className="py-3 px-3 font-mono text-ochre-600 dark:text-ochre-400 font-bold">UR: 7% | Reserved: 10%</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">SSC CHSL (Hindi Typing)</td>
                <td className="py-3 px-3 font-mono">10 Minutes</td>
                <td className="py-3 px-3 font-mono">30 WPM (Hindi)</td>
                <td className="py-3 px-3 font-mono">9,000 KDPH</td>
                <td className="py-3 px-3 font-mono text-ochre-600 dark:text-ochre-400 font-bold">UR: 7% | Reserved: 10%</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">High Court Junior Assistant</td>
                <td className="py-3 px-3 font-mono">5 - 10 Minutes</td>
                <td className="py-3 px-3 font-mono">30 - 40 WPM</td>
                <td className="py-3 px-3 font-mono">9,000 - 12,000 KDPH</td>
                <td className="py-3 px-3 font-mono font-bold">5% to 7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-surface-dark-border">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <HelpCircle className="w-5 h-5 text-brand-500" />
          <span>Frequently Asked Questions About SSC Typing Tests</span>
        </div>

        <div className="space-y-3">
          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              Is backspace allowed in SSC CGL and CHSL typing tests?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Yes, backspace and arrow keys are fully permitted in the official SSC typing software. You can navigate back and correct your errors during the 15-minute or 10-minute exam. However, spending excessive time backspacing will decrease your total completed key depressions.
            </p>
          </details>

          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              What counts as a "Full Mistake" versus a "Half Mistake" in SSC?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              A <strong>Full Mistake (1.0)</strong> occurs when an entire word is omitted, substituted with a different word, added unnecessarily, or heavily misspelled. A <strong>Half Mistake (0.5)</strong> occurs when the word is correct but has a minor spacing error, wrong capitalization (e.g., typing "india" instead of "India"), or incorrect punctuation mark.
            </p>
          </details>

          <details className="p-4 rounded-xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm">
            <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
              What is the conversion between KDPH and WPM?
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Under international and SSC conventions, 1 word equals 5 key depressions. Key Depressions Per Hour (KDPH) divided by 300 gives Words Per Minute (WPM). Thus, 8,000 KDPH equals 26.67 WPM, and 10,500 KDPH equals exactly 35.0 WPM.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};
