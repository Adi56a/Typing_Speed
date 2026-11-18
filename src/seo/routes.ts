import { RouteMeta } from '../types';

export const SITE_URL = 'https://checktypingspeeds.com';
export const SITE_NAME = 'CheckTypingSpeeds - Free Online Typing Speed Test (WPM)';

export const ROUTES: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'Check Typing Speeds | Free Online Typing Speed Test (WPM)',
    description:
      'Check your typing speed and accuracy in WPM with CheckTypingSpeeds. Fast, ad-free online typing test with 1-min, 2-min, 5-min checks and instant results.',
    heading: 'Check Typing Speeds Online Free',
    subheading: 'Check your words per minute (WPM), track keystroke accuracy, and master touch typing with instant client-side scoring.',
    canonical: `${SITE_URL}/`,
  },
  '/typing-speed-test/': {
    path: '/typing-speed-test/',
    title: 'Typing Speed Test | Check Typing Speed & Accuracy Online',
    description:
      'Check typing speed online in words per minute. Accurate WPM measurement, character accuracy percentage, and touch typing error analysis.',
    heading: 'Typing Speed Test (WPM)',
    subheading: 'Check your keyboard speed with real-time metrics, live error penalties, and instant feedback.',
    canonical: `${SITE_URL}/typing-speed-test/`,
  },
  '/typing-test/1-minute/': {
    path: '/typing-test/1-minute/',
    title: '1 Minute Typing Test | Check Typing Speed in 60 Seconds',
    description:
      'Check typing speed in 60 seconds with our 1-minute typing test. Instant WPM calculation, accuracy score, and error breakdown. Free with no login.',
    heading: '1 Minute Typing Speed Test',
    subheading: 'A quick 60-second speed challenge to check your typing speed benchmark and daily progress.',
    canonical: `${SITE_URL}/typing-test/1-minute/`,
    presetDuration: 60,
  },
  '/typing-test/2-minute/': {
    path: '/typing-test/2-minute/',
    title: '2 Minute Typing Test | Check Typing Speed & Endurance',
    description:
      'Check typing speed and cadence with a 2-minute (120-second) typing test. Test concentration and touch-typing stamina with accurate Net WPM scoring.',
    heading: '2 Minute Typing Speed Test',
    subheading: 'Test sustained typing cadence and error resilience over 120 seconds.',
    canonical: `${SITE_URL}/typing-test/2-minute/`,
    presetDuration: 120,
  },
  '/typing-test/5-minute/': {
    path: '/typing-test/5-minute/',
    title: '5 Minute Typing Test | Check Typing Speed for Exam Prep',
    description:
      'Check typing speed for job interviews and government recruitment exams. 5-minute timed typing test with ANSI standard 5-character word scoring.',
    heading: '5 Minute Typing Speed Test',
    subheading: 'Official 5-minute test simulating employment screening benchmarks and competitive exams.',
    canonical: `${SITE_URL}/typing-test/5-minute/`,
    presetDuration: 300,
  },
  '/typing-test/10-minute/': {
    path: '/typing-test/10-minute/',
    title: '10 Minute Typing Test | Check Typing Speed & Stamina',
    description:
      'Check typing speed and long-form stamina with a 10-minute typing test. Ideal for SSC CGL, CHSL, High Court typist exams, and transcriptionists.',
    heading: '10 Minute Typing Speed Test',
    subheading: 'Full endurance test simulating formal government exam environments and long-form typing.',
    canonical: `${SITE_URL}/typing-test/10-minute/`,
    presetDuration: 600,
  },
  '/typing-practice/': {
    path: '/typing-practice/',
    title: 'Typing Practice & Drills | Check Typing Speeds & Form',
    description:
      'Practice touch typing with interactive drills. Master home row keys, common English bigrams, punctuation, and numbers to check typing speed growth.',
    heading: 'Free Typing Practice & Drills',
    subheading: 'Targeted exercises to build neuromuscular muscle memory and steadily increase your WPM.',
    canonical: `${SITE_URL}/typing-practice/`,
  },
  '/typing-games/': {
    path: '/typing-games/',
    title: 'Free Online Typing Games | Check Typing Speeds Arcade',
    description:
      'Play Word Cascade typing defense game to check typing speeds and reflexes. Vaporize descending vocabulary, build finger agility, and beat high scores.',
    heading: 'Free Online Typing Games',
    subheading: 'Kinetic arcade typing challenges designed to sharpen reflexes and eliminate finger hesitation.',
    canonical: `${SITE_URL}/typing-games/`,
  },
  '/wpm-calculator/': {
    path: '/wpm-calculator/',
    title: 'WPM Calculator | Check Typing Speed Formulas & CPM',
    description:
      'Interactive WPM calculator to check typing speed metrics. Convert total keystrokes, elapsed time, and errors into Gross WPM, Net WPM, and CPM.',
    heading: 'Interactive WPM Calculator',
    subheading: 'Explore the exact mathematical formulas behind Words Per Minute and calculate your typing metrics.',
    canonical: `${SITE_URL}/wpm-calculator/`,
  },
  '/how-wpm-is-calculated/': {
    path: '/how-wpm-is-calculated/',
    title: 'How WPM Is Calculated | Check Typing Speed Formulas',
    description:
      'Learn how to check typing speed accurately. Complete guide to Gross WPM, Net WPM error penalties, ANSI 5-character word standard, and CPM calculation.',
    heading: 'How WPM Is Calculated: The Complete Guide',
    subheading: 'Transparent breakdown of standard touch typing formulas, error deductions, and exam scoring.',
    canonical: `${SITE_URL}/how-wpm-is-calculated/`,
  },
  '/about/': {
    path: '/about/',
    title: 'About CheckTypingSpeeds | Fast, Free & Private Platform',
    description:
      'Learn about CheckTypingSpeeds. Our mission is to provide the cleanest, fastest, ad-free typing test with 100% client-side privacy for typists worldwide.',
    heading: 'About CheckTypingSpeeds',
    subheading: 'Built on privacy-by-design, local-first performance, and distraction-free typing evaluation.',
    canonical: `${SITE_URL}/about/`,
  },
  '/methodology/': {
    path: '/methodology/',
    title: 'Typing Test Methodology | Check Typing Speed Precision',
    description:
      'Technical specifications of CheckTypingSpeeds: monotonic hardware timers, 5-character word norm, IME composition handling, and Net WPM formulas.',
    heading: 'Engine & Scoring Methodology',
    subheading: 'Mathematical precision, zero timer drift, and standardized touch-typing metrics.',
    canonical: `${SITE_URL}/methodology/`,
  },
  '/contact/': {
    path: '/contact/',
    title: 'Contact CheckTypingSpeeds | Feedback & Suggestions',
    description:
      'Get in touch with the CheckTypingSpeeds team. Submit feedback, report bugs, suggest exam passage formats, or inquire about educational use.',
    heading: 'Contact CheckTypingSpeeds',
    subheading: 'We welcome community feedback, bug reports, and exam format suggestions.',
    canonical: `${SITE_URL}/contact/`,
  },
  '/privacy/': {
    path: '/privacy/',
    title: 'Privacy Policy | CheckTypingSpeeds Zero Keystroke Log',
    description:
      'CheckTypingSpeeds privacy policy: We guarantee zero keystroke logging, no account requirement, and 100% local client-side typing speed calculation.',
    heading: 'Privacy Policy',
    subheading: 'Our privacy pledge: No keystroke tracking, no required sign-ups, and complete client-side security.',
    canonical: `${SITE_URL}/privacy/`,
  },
  '/terms/': {
    path: '/terms/',
    title: 'Terms of Service | CheckTypingSpeeds Usage Guidelines',
    description:
      'Terms of service and usage guidelines for CheckTypingSpeeds. Free educational typing test and touch-typing practice platform for everyone.',
    heading: 'Terms of Service',
    subheading: 'Clear, transparent terms for using our open educational typing speed platform.',
    canonical: `${SITE_URL}/terms/`,
  },
  '/404/': {
    path: '/404/',
    title: 'Page Not Found (404) | CheckTypingSpeeds',
    description: 'The requested page could not be found. Return to CheckTypingSpeeds to check your typing speed free online.',
    heading: 'Page Not Found',
    canonical: `${SITE_URL}/404/`,
  },
};

export const ROUTE_LIST = Object.values(ROUTES);
