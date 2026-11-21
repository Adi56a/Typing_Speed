import React, { useState, useRef } from 'react';
import { TypingMetrics } from '../../types';
import { Award, Printer, X, Check, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface TypingCertificateModalProps {
  metrics: TypingMetrics;
  onClose: () => void;
}

export const TypingCertificateModal: React.FC<TypingCertificateModalProps> = ({ metrics, onClose }) => {
  const [userName, setUserName] = useState<string>('Candidate Typist');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const certRef = useRef<HTMLDivElement>(null);
  const dateFormatted = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-surface-dark-border">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Official Typing Certificate</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close certificate"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Area */}
        <div
          ref={certRef}
          className="relative p-8 rounded-xl bg-gradient-to-br from-[#faf8f5] to-[#f4efe6] dark:from-[#1a1f1d] dark:to-[#131716] border-4 border-double border-ochre-400/40 text-center space-y-5 shadow-inner"
        >
          {/* Header & Watermark */}
          <div className="flex justify-center items-center gap-2 text-xs font-bold tracking-widest text-ochre-700 dark:text-ochre-400 uppercase">
            <ShieldCheck className="w-4 h-4 text-ochre-500" />
            <span>CheckTypingSpeeds Verified Achievement</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
              Certificate of Typing Proficiency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Standardized Touch-Typing Evaluation (ANSI 5-Character Norm)
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">This certifies that</p>
            {isEditingName ? (
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-3 py-1 text-center font-bold text-lg rounded border border-brand-500 bg-white dark:bg-surface-dark text-slate-900 dark:text-white"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="p-1.5 rounded bg-brand-500 text-white text-xs font-semibold"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                title="Click to edit name"
                className="cursor-pointer text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400 underline decoration-dashed underline-offset-4 decoration-brand-400/50 hover:opacity-80 transition-opacity"
              >
                {userName}
              </div>
            )}
            <p className="text-[11px] text-slate-400 mt-1 italic">(Click name above to customize for your resume)</p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            has demonstrated verified keyboard competence and completed a timed touch-typing evaluation on CheckTypingSpeeds.com with the following certified metrics:
          </p>

          {/* Core Metrics Box */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-white/70 dark:bg-surface-dark/70 border border-ochre-200/50 dark:border-ochre-900/40 max-w-md mx-auto">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Net Speed</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-brand-600 dark:text-brand-400">
                {metrics.netWPM}
              </div>
              <div className="text-[10px] text-slate-400">WPM</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Accuracy</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                {metrics.accuracy}%
              </div>
              <div className="text-[10px] text-slate-400">{metrics.incorrectChars} typos</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Duration</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                {metrics.durationSeconds}s
              </div>
              <div className="text-[10px] text-slate-400">Timed Test</div>
            </div>
          </div>

          {/* Footer Seal & Verification Date */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-surface-dark-border text-left text-[11px] text-slate-500 dark:text-slate-400">
            <div>
              <div>Issued on: <span className="font-semibold text-slate-700 dark:text-slate-300">{dateFormatted}</span></div>
              <div className="text-[10px] text-slate-400">Verification ID: CTS-{Date.now().toString(36).toUpperCase()}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-800 dark:text-slate-200">CheckTypingSpeeds.com</div>
              <div className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">100% Client-Side Verified</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint} className="w-full sm:w-auto gap-2">
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
