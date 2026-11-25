import React from 'react';
import { Clock, Briefcase, Award, Languages, BookOpen, ArrowRight } from 'lucide-react';

interface AllTypingTestsPageProps {
  onNavigate?: (path: string) => void;
}

export const AllTypingTestsPage: React.FC<AllTypingTestsPageProps> = ({ onNavigate }) => {
  const navigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const timedCategories = [
    { name: '30 Second Typing Test', path: '/typing-test/30-second/', desc: 'Quick warm-up sprint to test burst speed and reflex accuracy.' },
    { name: '1 Minute Typing Test', path: '/typing-test/1-minute/', desc: 'The universal international standard speed check benchmark.' },
    { name: '2 Minute Typing Test', path: '/typing-test/2-minute/', desc: 'Balanced medium challenge evaluating typing consistency.' },
    { name: '3 Minute Typing Test', path: '/typing-test/3-minute/', desc: 'The length most corporate recruiters and HR screenings use.' },
    { name: '5 Minute Typing Test', path: '/typing-test/5-minute/', desc: 'Comprehensive clerical and pre-employment stamina test.' },
    { name: '10 Minute Typing Test', path: '/typing-test/10-minute/', desc: 'Full endurance test simulating formal government exam rooms.' },
  ];

  const examCategories = [
    { name: 'SSC CGL Typing Test (DEST)', path: '/typing-test/ssc-cgl/', desc: 'Official 15-minute 2,000 keystroke test with 7% error cutoff.' },
    { name: 'SSC CHSL Typing Test', path: '/typing-test/ssc-chsl/', desc: 'Official 10-minute 35 WPM / 10,500 KDPH clerical assessment.' },
    { name: 'SSC Exam Simulator Hub', path: '/ssc-typing-test/', desc: 'Interactive simulator with CGL, CHSL, and High Court scoring.' },
  ];

  const jobCategories = [
    { name: 'Typing Test for Jobs', path: '/typing-test/for-jobs/', desc: '3-minute pre-employment test for corporate and administrative roles.' },
    { name: 'Data Entry Typing Test', path: '/typing-test/data-entry/', desc: 'Mixed alphanumeric drills: addresses, invoice numbers, and currencies.' },
    { name: '10 Key Numeric Keypad Test', path: '/typing-test/10-key/', desc: 'Numpad speed test measured in Keystrokes Per Hour (KPH).' },
  ];

  const languageCategories = [
    { name: 'Hindi Typing Test', path: '/typing-test/hindi/', desc: 'Devanagari typing in Mangal Unicode font (InScript & Remington Gail).' },
  ];

  const toolsCategories = [
    { name: 'Free Typing Lessons', path: '/typing-lessons/', desc: '10-step interactive touch typing curriculum from home row to full keyboard.' },
    { name: 'Typing Practice Drills', path: '/typing-practice/', desc: 'Targeted exercises for home row, numbers, and common letter pairs.' },
    { name: 'Touch Typing Guide', path: '/touch-typing/', desc: 'Comprehensive ergonomics, finger placement, and posture fundamentals.' },
    { name: 'Average Typing Speed Chart', path: '/typing-speed-chart/', desc: 'Global WPM percentiles by age demographic, career, and level.' },
    { name: 'WPM Calculator', path: '/wpm-calculator/', desc: 'Calculate Gross WPM, Net WPM, accuracy, and KDPH conversions.' },
    { name: 'Free Typing Games', path: '/typing-games/', desc: 'Sharpen your keyboard reflexes with kinetic word cascade challenges.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete Catalog of Typing Assessments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          All Typing Tests
        </h1>
        <div className="text-xs text-slate-500 dark:text-slate-400">By Aditya Vardhan · Updated November 2026</div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore our complete directory of free online typing speed tests, government exam simulators, pre-employment job evaluations, and touch typing practice tools.
        </p>
      </div>

      {/* 1. By Duration */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-500" />
          <span>Typing Tests by Duration</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {timedCategories.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {item.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Start Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 2. Government & Recruitment Exams */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-ochre-500" />
          <span>Government &amp; Recruitment Exams</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {examCategories.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {item.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Practice Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Jobs & Data Entry */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-500" />
          <span>Jobs &amp; Data Entry Tests</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {jobCategories.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {item.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Start Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Languages */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Languages className="w-5 h-5 text-purple-500" />
          <span>Regional &amp; Multi-Language Tests</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {languageCategories.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {item.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Start Hindi Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 5. Tools & Learning Guides */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-500" />
          <span>Learning Lessons, Practice &amp; WPM Calculators</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {toolsCategories.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {item.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Open Resource</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
