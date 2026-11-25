import React from 'react';
import { BarChart3, Trophy, ArrowRight, HelpCircle, Briefcase, Users, Target, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface TypingSpeedChartPageProps {
  onNavigate?: (path: string) => void;
}

export const TypingSpeedChartPage: React.FC<TypingSpeedChartPageProps> = ({ onNavigate }) => {
  const navigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Global WPM Benchmarks &amp; Percentiles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Average Typing Speed &amp; WPM Chart
        </h1>
        <div className="text-xs text-slate-500 dark:text-slate-400">By Aditya Vardhan · Updated November 2026</div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Discover how your keyboard performance compares to global percentiles, demographic groups, and recruitment requirements across modern employment sectors.
        </p>
      </div>

      {/* Section 1: What Is the Average Typing Speed? */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          What Is the Average Typing Speed?
        </h2>
        {/* Direct Answer Paragraph (40-60 words) */}
        <div className="p-5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800">
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            The average typing speed across all computer users is approximately 40 words per minute (WPM), equivalent to about 200 characters per minute. Most untrained typists type between 35 and 45 WPM with 92% accuracy. Reaching 50 to 60 WPM places you above average, while speeds exceeding 70 WPM rank in the top 10% globally.
          </p>
        </div>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            When calculating typing velocity, international measurement protocols standardize one "word" as exactly five keystrokes, encompassing letters, punctuation marks, digits, and spaces. Therefore, an individual typing at 40 WPM processes 200 distinct physical switch actuations every sixty seconds. Speed is recorded in two distinct metrics: Gross Words Per Minute (the unadjusted total count of keys struck divided by five minutes elapsed) and Net Words Per Minute (which deducts penalties for uncorrected spelling mistakes or syntactical omissions).
          </p>
          <p>
            Most casual computer users practice informal hunt-and-peck techniques, using between two and four fingers while continuously shifting visual attention between the monitor and the physical keys. This physical interruption caps their sustained throughput at around 35 to 40 WPM. In contrast, individuals trained in structured touch typing utilize all ten digits, keeping their hands anchored over the home row. By relying entirely on subconscious muscle memory rather than ocular confirmation, touch typists routinely sustain 60 to 90 WPM with error rates below 3%.
          </p>
          <p>
            You can evaluate your own current baseline right now with our free online assessments: take a <a href="/typing-test/1-minute/" onClick={(e) => { e.preventDefault(); navigate('/typing-test/1-minute/'); }} className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700">1 minute typing test</a> for a quick snapshot, or complete an official <a href="/typing-test/3-minute/" onClick={(e) => { e.preventDefault(); navigate('/typing-test/3-minute/'); }} className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700">3 minute typing test</a> to simulate standard workplace hiring evaluations.
          </p>
        </div>
      </section>

      {/* Section 2: What Is a Good Typing Speed? */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-ochre-500" />
          <span>What Is a Good Typing Speed?</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Whether a typing speed is considered "good" depends directly upon your professional domain and communicative objectives. For informal email correspondence and web browsing, 45 WPM is perfectly adequate. However, for office administrative roles, technical programming, or legal transcription, expectations rise significantly. The benchmark classification table below categorizes performance levels from novice to elite typist.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-surface-dark-border bg-slate-50 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Skill Tier</th>
                <th className="py-3 px-4 font-bold">Net Speed (WPM)</th>
                <th className="py-3 px-4 font-bold">Global Percentile</th>
                <th className="py-3 px-4 font-bold">Target Accuracy</th>
                <th className="py-3 px-4 font-bold">Practical Assessment &amp; Roles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Beginner</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-600 dark:text-slate-400">Under 30 WPM</td>
                <td className="py-3.5 px-4 font-mono">Bottom 20%</td>
                <td className="py-3.5 px-4 font-mono">80% – 88%</td>
                <td className="py-3.5 px-4">Hunt-and-peck typists; students just beginning keyboard training.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Average</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">35 – 45 WPM</td>
                <td className="py-3.5 px-4 font-mono text-brand-600 dark:text-brand-400 font-bold">50th Percentile</td>
                <td className="py-3.5 px-4 font-mono">90% – 93%</td>
                <td className="py-3.5 px-4">Typical everyday computer users, casual writers, and standard students.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Good</td>
                <td className="py-3.5 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">50 – 65 WPM</td>
                <td className="py-3.5 px-4 font-mono">Top 30%</td>
                <td className="py-3.5 px-4 font-mono">94% – 96%</td>
                <td className="py-3.5 px-4">Administrative assistants, customer support agents, office managers.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Fast</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">70 – 90 WPM</td>
                <td className="py-3.5 px-4 font-mono">Top 10%</td>
                <td className="py-3.5 px-4 font-mono">97% – 99%</td>
                <td className="py-3.5 px-4">Software engineers, legal secretaries, journalists, copywriters.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Professional</td>
                <td className="py-3.5 px-4 font-mono font-bold text-ochre-600 dark:text-ochre-400">100+ WPM</td>
                <td className="py-3.5 px-4 font-mono">Top 1% – 2%</td>
                <td className="py-3.5 px-4 font-mono">98% – 100%</td>
                <td className="py-3.5 px-4">Court reporters, closed-caption transcribers, competitive typists.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Average Typing Speed by Age */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-brand-500" />
          <span>Average Typing Speed by Age</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Typing speeds vary demonstrably across generational cohorts due to developmental neuro-motor agility, keyboard exposure, and device usage patterns. Young adults who entered formal education during the expansion of laptop-based curricula demonstrate the highest average keyboard velocity, while mobile-first younger generations often show higher proficiency on touchscreens than physical keyboards.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-surface-dark-border bg-slate-50 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Age Demographic</th>
                <th className="py-3 px-4 font-bold">Average WPM</th>
                <th className="py-3 px-4 font-bold">Typical Accuracy</th>
                <th className="py-3 px-4 font-bold">Primary Device Habit &amp; Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Ages 10 – 17 (School Age)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">32 WPM</td>
                <td className="py-3.5 px-4 font-mono">89%</td>
                <td className="py-3.5 px-4">Smartphone natives; high thumb speed on glass screens, developing mechanical keyboard familiarity.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Ages 18 – 25 (College &amp; Early Career)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">45 WPM</td>
                <td className="py-3.5 px-4 font-mono">93%</td>
                <td className="py-3.5 px-4">Peak daily physical keyboard hours; academic essay writing, coding, and continuous digital chat interaction.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Ages 26 – 45 (Professional Workforce)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">43 WPM</td>
                <td className="py-3.5 px-4 font-mono">94%</td>
                <td className="py-3.5 px-4">Sustained administrative, commercial, and technical workplace typing; steady rhythm with low typographical variance.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Ages 46 – 60 (Senior Workforce)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">38 WPM</td>
                <td className="py-3.5 px-4 font-mono">94%</td>
                <td className="py-3.5 px-4">High accuracy discipline; frequently learned on early mechanical typewriters and desktop computing terminals.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Ages 61+ (Retirement Age)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-600 dark:text-slate-400">31 WPM</td>
                <td className="py-3.5 px-4 font-mono">91%</td>
                <td className="py-3.5 px-4">Deliberate, careful keystroke pace prioritizing precision over velocity; lower daily keyboard hours.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Typing Speed Requirements by Job */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-brand-500" />
          <span>Typing Speed Requirements by Job</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Employers across government agencies, corporate headquarters, law firms, and medical facilities enforce strict minimum WPM thresholds as pre-employment screening hurdles. Failing to meet the cut-off score on an initial 3-minute or 5-minute typing test often disqualifies an applicant prior to interview consideration. The benchmark matrix below summarizes mandatory expectations for key professions.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-surface-dark-border bg-slate-50 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Career &amp; Role</th>
                <th className="py-3 px-4 font-bold">Required WPM</th>
                <th className="py-3 px-4 font-bold">Accuracy Floor</th>
                <th className="py-3 px-4 font-bold">Operational Context &amp; Assessment Conditions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Data Entry Specialist</td>
                <td className="py-3.5 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">60 – 75 WPM</td>
                <td className="py-3.5 px-4 font-mono">98% – 99%</td>
                <td className="py-3.5 px-4">Numeric keypad mastery (10-key KPH) combined with rapid alphanumeric entry of addresses and account ledgers.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Administrative Assistant</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">45 – 55 WPM</td>
                <td className="py-3.5 px-4 font-mono">95%</td>
                <td className="py-3.5 px-4">Standard business correspondence, executive scheduling, formal memorandum drafting, and internal documentation.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Medical / Legal Transcriptionist</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">70 – 90 WPM</td>
                <td className="py-3.5 px-4 font-mono">99%+</td>
                <td className="py-3.5 px-4">Continuous audio dictation transcription requiring specialized medical terminology and zero tolerance for clinical error.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Software Engineer / Programmer</td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">50 – 70 WPM</td>
                <td className="py-3.5 px-4 font-mono">95%</td>
                <td className="py-3.5 px-4">Symbol agility (brackets, semicolons, operators, camelCase variable syntax) outweighs raw prose velocity.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Legal Secretary / Paralegal</td>
                <td className="py-3.5 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">60 – 75 WPM</td>
                <td className="py-3.5 px-4 font-mono">98%</td>
                <td className="py-3.5 px-4">Preparation of formal affidavits, statutory filings, and judicial contracts under pressing court deadlines.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Court Stenographer</td>
                <td className="py-3.5 px-4 font-mono font-bold text-ochre-600 dark:text-ochre-400">200 – 225+ WPM</td>
                <td className="py-3.5 px-4 font-mono">99.5%</td>
                <td className="py-3.5 px-4">Verbatim judicial proceedings recorded using 22-key chorded steno machines operating on phonetic shorthand systems.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Customer Support / Live Chat</td>
                <td className="py-3.5 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">55 – 65 WPM</td>
                <td className="py-3.5 px-4 font-mono">95%</td>
                <td className="py-3.5 px-4">Simultaneous management of 3 to 4 live customer inquiry channels requiring fast, polite, and error-free typing.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Typing Speed Percentiles */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-brand-500" />
          <span>Typing Speed Percentiles</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Aggregating data from over ten million standardized typing sessions conducted on online testing platforms reveals a distinct bell curve distribution. The median sits firmly at 41 WPM. The percentile breakdown below illustrates where your typing velocity situates you relative to the global population of keyboard operators.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-surface-dark-border bg-slate-50 dark:bg-surface-dark-muted text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Percentile Ranking</th>
                <th className="py-3 px-4 font-bold">Net Speed (WPM)</th>
                <th className="py-3 px-4 font-bold">Relative Standing &amp; Characterization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-surface-dark-border text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">10th Percentile</td>
                <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400 font-bold">22 WPM</td>
                <td className="py-3.5 px-4">Novice speed. Slow hunt-and-peck typing with frequent visual glances down at the keyboard.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">25th Percentile</td>
                <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400 font-bold">31 WPM</td>
                <td className="py-3.5 px-4">Below average. Functional for short messages, but creates cognitive bottlenecks during long essays.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">50th Percentile (Median)</td>
                <td className="py-3.5 px-4 font-mono text-brand-600 dark:text-brand-400 font-bold">41 WPM</td>
                <td className="py-3.5 px-4">Standard worldwide average. Half of all computer users type slower than this mark, and half type faster.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">75th Percentile</td>
                <td className="py-3.5 px-4 font-mono text-slate-800 dark:text-slate-200 font-bold">55 WPM</td>
                <td className="py-3.5 px-4">Proficient touch typist. Capable of drafting emails and reports without conscious keystroke effort.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">90th Percentile</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">72 WPM</td>
                <td className="py-3.5 px-4">Advanced level. Faster than 9 out of 10 computer users. Strong asset on any resume or CV.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">95th Percentile</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">84 WPM</td>
                <td className="py-3.5 px-4">Exceptional velocity. Near the physical threshold for standard multi-row QWERTY ergonomics.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">99th Percentile</td>
                <td className="py-3.5 px-4 font-mono text-ochre-600 dark:text-ochre-400 font-bold">102+ WPM</td>
                <td className="py-3.5 px-4">Top 1% elite worldwide. Subconscious motor automation, flawless rhythm, and high error recovery speed.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: How to Improve Your Typing Speed */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-brand-500" />
          <span>How to Improve Your Typing Speed</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Transitioning from an average typist (40 WPM) to an advanced operator (70+ WPM) does not require superior finger dexterity. Instead, it demands structured neuromuscular conditioning and deliberate elimination of visual dependence. Follow this five-step training regimen to steadily elevate your score.
        </p>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card space-y-2 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center text-sm">1</span>
              <span>Anchor on the Home Row and Never Look Down</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every keyboard has small raised ridges on the F and J keys. Use these tactile markers to position your left index finger on F and your right index finger on J without glancing down. Your remaining fingers naturally fall onto A-S-D and K-L-;. Whenever a finger reaches for the top or bottom row, immediately spring it back to its anchor key. Learn the foundational mechanics in our free <a href="/typing-lessons/" onClick={(e) => { e.preventDefault(); navigate('/typing-lessons/'); }} className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700">typing lessons</a> curriculum.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card space-y-2 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center text-sm">2</span>
              <span>Prioritize 98% Accuracy Over Raw Velocity</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Typing rapidly while making typos is counterproductive: backspacing requires three to four additional keystrokes, completely halting your cognitive flow. Slow down your keystroke tempo until your accuracy consistently holds at 98% or higher. Speed develops naturally as an effortless byproduct of clean muscle memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card space-y-2 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center text-sm">3</span>
              <span>Drill High-Frequency Letter Blends and Bigrams</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              The English language relies heavily on recurring letter sequences known as bigrams and trigrams, including <em>th</em>, <em>he</em>, <em>in</em>, <em>er</em>, <em>an</em>, and <em>tion</em>. Training your fingers to execute these common clusters as single unified rhythmic chords drastically reduces pauses. Isolate your weak fingers with targeted <a href="/typing-practice/" onClick={(e) => { e.preventDefault(); navigate('/typing-practice/'); }} className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700">typing practice drills</a>.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card space-y-2 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center text-sm">4</span>
              <span>Maintain Neutral Ergonomic Posture</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Position your elbows at a 90-degree angle, keep your feet flat on the floor, and elevate your wrists slightly above the desk surface so they do not press against hard edges. Straining your tendons leads to muscular fatigue and carpal tunnel syndrome, which severely degrades your typing stamina during prolonged work sessions.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-card space-y-2 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center text-sm">5</span>
              <span>Practice in Short, Daily 15-Minute Sprints</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Neurological motor adaptation occurs during sleep after deliberate practice. A single 15-minute focused daily session produces substantially faster gains than a 2-hour weekend cram session. Regularly test your progress: take a <a href="/typing-test/3-minute/" onClick={(e) => { e.preventDefault(); navigate('/typing-test/3-minute/'); }} className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700">3 minute typing test</a> weekly to assess your endurance, or test your speed on a <a href="/typing-test/5-minute/" onClick={(e) => { e.preventDefault(); navigate('/typing-test/5-minute/'); }} className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700">5 minute typing test</a> when preparing for official employment assessments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Check Your WPM Right Now</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Measure your exact words per minute, keystroke accuracy, and global percentile ranking.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto gap-2"
          >
            <span>Start Free Typing Test</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Section 7: FAQ (4 questions, visible + schema) */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-surface-dark-border">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-brand-500" />
          <span>Frequently Asked Questions About Typing Speed</span>
        </h2>

        <div className="space-y-3">
          <details className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm shadow-xs" open>
            <summary className="font-bold text-base text-slate-900 dark:text-white cursor-pointer select-none">
              What is the average typing speed in WPM?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              The worldwide average typing speed across all computer users is 40 words per minute (WPM), which equals roughly 200 characters or key depressions per minute. Most untrained keyboard users sustain between 35 and 45 WPM with an accuracy rate of 92%.
            </p>
          </details>

          <details className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm shadow-xs">
            <summary className="font-bold text-base text-slate-900 dark:text-white cursor-pointer select-none">
              Is 50 WPM a good typing speed?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Yes, 50 WPM is an above-average typing speed. It places you in the top 35% of all computer users worldwide and meets or exceeds the minimum typing prerequisite for most administrative, customer service, and corporate office positions.
            </p>
          </details>

          <details className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm shadow-xs">
            <summary className="font-bold text-base text-slate-900 dark:text-white cursor-pointer select-none">
              What typing speed is required for professional jobs?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Most office and administrative jobs require 40 to 50 WPM. Specialized careers have higher requirements: data entry specialists typically need 60 to 75 WPM, legal transcriptionists need 70 to 90 WPM, and court stenographers must type at 200+ WPM with specialized chorded equipment.
            </p>
          </details>

          <details className="p-5 rounded-2xl bg-white dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border text-sm shadow-xs">
            <summary className="font-bold text-base text-slate-900 dark:text-white cursor-pointer select-none">
              How fast can humans possibly type?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              The fastest officially recorded typing speed on a standard QWERTY keyboard belongs to competitive typists reaching 200 to 220 WPM in short sprints. Barbara Blackburn held the historic Guinness record of 212 WPM on an electric Dvorak typewriter.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
};
