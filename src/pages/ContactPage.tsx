import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="brand">Get In Touch</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Contact &amp; Feedback
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Have an idea, found an issue, or want an exam format or language added? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <Card className="p-5 space-y-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-brand-600 dark:text-brand-400 w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Direct Email</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For general inquiries, school partnerships, and developer questions:
            </p>
            <div className="text-xs font-mono text-brand-600 dark:text-brand-400">
              support@typingtest.example.com
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 w-fit">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Exam Format Suggestions</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Tell us about typing exam requirements for SSC, State High Courts, CPCT, or corporate benchmarks.
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card className="p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Thank You for Your Feedback!
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  We review feedback and suggestions regularly to keep TypeFast accurate, fast, and helpful for typists worldwide.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white text-sm focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white text-sm focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Message or Suggestion
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we make TypeFast better for you?"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark text-slate-900 dark:text-white text-sm focus-ring"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full sm:w-auto gap-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

