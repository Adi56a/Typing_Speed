import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, ExternalLink, Sparkles } from 'lucide-react';

const DESTINATION_EMAIL = 'checktypingspeeds@gmail.com';

const CATEGORIES = [
  'General Feedback & Suggestions',
  'Bug Report / Website Issue',
  'Exam & Passage Request (SSC, Court, State Exams)',
  'Feature Suggestion',
  'Partnership & Inquiries',
] as const;

type FeedbackCategory = typeof CATEGORIES[number];

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<FeedbackCategory>('General Feedback & Suggestions');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState(''); // Anti-spam bot honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Generate fallback mailto URL with pre-filled content
  const mailtoUrl = `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(
    `[CheckTypingSpeeds Feedback] ${category}: ${name.trim() || 'Anonymous Typist'}`
  )}&body=${encodeURIComponent(
    `Category: ${category}\nFrom: ${name.trim() || 'Anonymous Typist'}\nReply Email: ${
      email.trim() || 'Not provided'
    }\n\nMessage:\n${message}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Discard spam bots if honeypot was filled
    if (honey.trim().length > 0) {
      setStatus('success');
      return;
    }

    if (!message.trim()) {
      setErrorMessage('Please enter your message or feedback.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // Free endpoint powered by FormSubmit (unlimited submissions for static web apps)
      const endpoint = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;
      
      const payload: Record<string, string> = {
        name: name.trim() || 'Anonymous Typist',
        category,
        message: message.trim(),
        _subject: `[CheckTypingSpeeds] ${category} from ${name.trim() || 'Typist'}`,
        _template: 'table',
        _captcha: 'false',
      };

      // Set reply-to email only if user optionally provided one
      if (email.trim()) {
        payload.email = email.trim();
        payload._replyto = email.trim();
      } else {
        payload.email = 'no-reply@checktypingspeeds.com';
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Service returned status ${res.status}`);
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'The automated service could not deliver your message right now (possibly due to network or ad-blocker restrictions). You can click below to send it directly from your email app.'
      );
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setCategory('General Feedback & Suggestions');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">Feedback &amp; Inquiries</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Contact &amp; Connect With Us
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Have an idea, found an issue, or want an exam format or regional language added? Submit your thoughts below or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <Card className="p-5 space-y-3">
            <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Direct Email</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              For suggestions, government exam queries, or general questions, you can always reach us directly:
            </p>
            <a
              href={`mailto:${DESTINATION_EMAIL}`}
              className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-brand-600 dark:text-brand-400 hover:underline break-all"
            >
              <span>{DESTINATION_EMAIL}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="p-2.5 rounded-lg bg-sage-50 dark:bg-sage-950/40 text-sage-600 dark:text-sage-400 w-fit">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Exam Passage Requests</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Preparing for SSC CGL DEST, CHSL, High Court typist, RRB NTPC, or CPCT? Tell us what master passage standards or tests you need added.
            </p>
          </Card>

          <Card className="p-5 space-y-3 bg-slate-50 dark:bg-surface-dark-muted border-dashed">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Free &amp; Privacy-Friendly</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your email is completely optional. You can submit feedback anonymously without providing personal information.
            </p>
          </Card>
        </div>

        {/* Contact Form Main Card */}
        <div className="md:col-span-2">
          <Card className="p-6 sm:p-8">
            {status === 'success' ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Thank You for Your Feedback!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Your message was delivered directly to <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{DESTINATION_EMAIL}</span>.
                  {email.trim()
                    ? ' Since you provided an email, we will follow up with you if needed.'
                    : ' Thank you for helping us make CheckTypingSpeeds better for everyone.'}
                </p>
                <div className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for bot protection (hidden from humans) */}
                <input
                  type="text"
                  name="_honey"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Feedback Category */}
                <div>
                  <label htmlFor="feedback-category" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Topic / Category
                  </label>
                  <select
                    id="feedback-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white text-sm focus-ring cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="feedback-name" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Your Name
                    </label>
                    <span className="text-[11px] text-slate-400">Optional</span>
                  </div>
                  <input
                    id="feedback-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (or leave blank to stay anonymous)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white text-sm focus-ring"
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="feedback-email" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Your Email Address
                    </label>
                    <span className="text-[11px] text-slate-400">Optional (for replies)</span>
                  </div>
                  <input
                    id="feedback-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com (only if you'd like a response)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white text-sm focus-ring"
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    We respect your privacy. Zero marketing emails, zero spam.
                  </p>
                </div>

                {/* Message (Required) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="feedback-message" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Message / Feedback <span className="text-terracotta-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Required</span>
                  </div>
                  <textarea
                    id="feedback-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we make CheckTypingSpeeds better for you? Share bugs, feature requests, or new exam passage ideas..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white text-sm focus-ring resize-y leading-relaxed"
                  />
                </div>

                {/* Error Banner with 1-Click Email App Fallback */}
                {status === 'error' && (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-amber-800 dark:text-amber-300">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                      <span>{errorMessage}</span>
                    </div>
                    <div className="pt-1">
                      <a
                        href={mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Your Email App (Pre-filled)</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === 'sending' || !message.trim()}
                    className="w-full sm:w-auto gap-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>

                  {/* Direct mailto fallback link */}
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Or send via email app</span>
                  </a>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
