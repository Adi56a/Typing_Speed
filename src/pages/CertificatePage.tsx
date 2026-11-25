import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, CheckCircle2, ArrowRight, AlertCircle, FileCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { generateCertHash, saveCertificate, validateCertificateEligibility, CertificateData } from '../features/certificate/certUtils';

interface CertificatePageProps {
  onNavigate?: (path: string) => void;
}

export const CertificatePage: React.FC<CertificatePageProps> = ({ onNavigate }) => {
  const [candidateName, setCandidateName] = useState<string>('');
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180);
  const [hasScore, setHasScore] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const rawW = parseInt(params.get('w') || '0', 10);
      const rawA = parseInt(params.get('a') || '0', 10);
      const rawD = parseInt(params.get('d') || '180', 10);

      if (rawW > 0 && rawA > 0) {
        setWpm(rawW);
        setAccuracy(rawA);
        setDuration(rawD);
        setHasScore(true);
      }
    }
  }, []);

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = candidateName.trim();
    if (cleanName.length < 2 || cleanName.length > 40) {
      setErrorMessage('Please enter a full name between 2 and 40 characters.');
      return;
    }

    if (!/^[a-zA-Z\s.'-]+$/.test(cleanName)) {
      setErrorMessage('Name must contain letters and spaces only.');
      return;
    }

    const validation = validateCertificateEligibility(wpm, accuracy, duration);
    if (!validation.eligible) {
      setErrorMessage(validation.reason || 'You do not meet the minimum requirements.');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const certHash = generateCertHash(cleanName, wpm, accuracy, duration, today);
    const certId = certHash.slice(0, 10).toLowerCase();

    const certificate: CertificateData = {
      id: certId,
      name: cleanName,
      wpm,
      accuracy,
      durationSeconds: duration,
      date: today,
      hash: certHash,
    };

    saveCertificate(certificate);

    const certUrl = `/c/${certId}/`;
    if (onNavigate) {
      onNavigate(certUrl);
    } else {
      window.location.href = certUrl;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ochre-100 dark:bg-ochre-950/40 border border-ochre-300 dark:border-ochre-800 text-xs font-bold text-ochre-800 dark:text-ochre-300">
          <Award className="w-4 h-4 text-ochre-600 dark:text-ochre-400" />
          <span>Official Typing Certification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Free Typing Certificate
        </h1>
        <div className="text-xs text-slate-500 dark:text-slate-400">By Aditya Vardhan · Updated November 2026</div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Earn a verified, printable typing certificate to showcase on your CV, resume, or LinkedIn profile. 100% free with tamper-proof verification.
        </p>
      </div>

      {/* Claim Certificate Form if score qualifies */}
      {hasScore && wpm > 0 && accuracy >= 90 && duration >= 180 ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-ochre-500/10 via-brand-500/10 to-transparent border-2 border-ochre-400 dark:border-ochre-600 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-ochre-500 text-white font-bold">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Congratulations! You Qualified for Certification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You achieved <strong>{wpm} WPM</strong> with <strong>{accuracy}% accuracy</strong> over a {Math.round(duration / 60)}-minute test.
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateCertificate} className="space-y-4 max-w-lg">
            <div>
              <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name for Certificate
              </label>
              <input
                id="name-input"
                type="text"
                required
                maxLength={40}
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Aditya Vardhan"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-medium text-base focus-ring"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Enter your name exactly as you want it to appear on the official certificate.
              </span>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full sm:w-auto px-6 py-3 text-sm font-bold gap-2">
              <span>Generate Official Certificate</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      ) : (
        /* Requirements Banner */
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <span>Official Certification Requirements</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To ensure credibility with employers and educational institutions, certificates are granted only upon passing our standardized 3-minute evaluation under the following anti-cheat guidelines:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>1. Minimum 3 Minutes</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tests under 180 seconds are disqualified to evaluate sustained typing stamina.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>2. At Least 90% Accuracy</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You must maintain strict typographical precision with sub-10% error margin.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark-muted border border-slate-200 dark:border-surface-dark-border">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>3. Anti-Cheat Integrity</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Keystroke intervals are validated against robotic macro automation and copy-pasting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Embedded 3-Minute Qualifying Test */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Take the 3-Minute Qualifying Test
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete this test with ≥ 90% accuracy to unlock your certificate instantly.
          </p>
        </div>

        <TypingWorkspaceShell initialDuration={180} initialMode="words" />
      </div>
    </div>
  );
};
