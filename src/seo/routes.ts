import { TestDuration, TestMode } from '../types';

export const SITE_URL = 'https://checktypingspeeds.com';
export const SITE_NAME = 'CheckTypingSpeeds';

export type PageKind = 'tool' | 'article' | 'hub' | 'legal' | 'about' | 'contact';

export interface FaqItem {
  q: string;
  a: string;
}

export interface SeoRoute {
  path: string;            // always with trailing slash, e.g. '/typing-test/1-minute/'
  kind: PageKind;
  title: string;           // 50–62 characters
  description: string;     // 120–158 characters
  h1: string;
  heading: string;        // backward-compat with existing page props
  subheading?: string;
  breadcrumb: string;      // short name used in BreadcrumbList
  faqs?: FaqItem[];        // must also be rendered visibly on the page
  inSitemap?: boolean;     // default true
  noindex?: boolean;       // default false
  noIndex?: boolean;       // backward-compat
  ogImage?: string;        // default `/og/<slug>.png` (Issue 12)
  datePublished?: string;  // articles only, YYYY-MM-DD
  canonical?: string;
  presetDuration?: TestDuration;
  presetMode?: TestMode;
}

export const routes: SeoRoute[] = [
  {
    path: '/',
    kind: 'tool',
    title: 'Check Typing Speeds | Free Online Typing Speed Test (WPM)',
    description:
      'Check your typing speed and accuracy in WPM with CheckTypingSpeeds. Fast, ad-free online typing test with 1-min, 2-min, 5-min checks and instant results.',
    h1: 'Check Typing Speeds Online Free',
    heading: 'Check Typing Speeds Online Free',
    subheading: 'Check your words per minute (WPM), track keystroke accuracy, and master touch typing with instant client-side scoring.',
    breadcrumb: 'Home',
    canonical: `${SITE_URL}/`,
  },
  {
    path: '/typing-test/1-minute/',
    kind: 'tool',
    title: '1 Minute Typing Test | Check Typing Speed in 60 Seconds',
    description:
      'Check typing speed in 60 seconds with our 1-minute typing test. Instant WPM calculation, accuracy score, and error breakdown. Free with no login.',
    h1: '1 Minute Typing Speed Test',
    heading: '1 Minute Typing Speed Test',
    subheading: 'A quick 60-second speed challenge to check your typing speed benchmark and daily progress.',
    breadcrumb: '1 Minute',
    canonical: `${SITE_URL}/typing-test/1-minute/`,
    presetDuration: 60,
  },
  {
    path: '/typing-test/2-minute/',
    kind: 'tool',
    title: '2 Minute Typing Test | Check Typing Speed & Endurance',
    description:
      'Check typing speed and cadence with a 2-minute (120-second) typing test. Test concentration and touch-typing stamina with accurate Net WPM scoring.',
    h1: '2 Minute Typing Speed Test',
    heading: '2 Minute Typing Speed Test',
    subheading: 'Test sustained typing cadence and error resilience over 120 seconds.',
    breadcrumb: '2 Minute',
    canonical: `${SITE_URL}/typing-test/2-minute/`,
    presetDuration: 120,
  },
  {
    path: '/typing-test/5-minute/',
    kind: 'tool',
    title: '5 Minute Typing Test | Check Typing Speed for Exam Prep',
    description:
      'Check typing speed for job interviews and government recruitment exams. 5-minute timed typing test with ANSI standard 5-character word scoring.',
    h1: '5 Minute Typing Speed Test',
    heading: '5 Minute Typing Speed Test',
    subheading: 'Official 5-minute test simulating employment screening benchmarks and competitive exams.',
    breadcrumb: '5 Minute',
    canonical: `${SITE_URL}/typing-test/5-minute/`,
    presetDuration: 300,
  },
  {
    path: '/typing-test/10-minute/',
    kind: 'tool',
    title: '10 Minute Typing Test | Check Typing Speed & Stamina',
    description:
      'Check typing speed and long-form stamina with a 10-minute typing test. Ideal for SSC CGL, CHSL, High Court typist exams, and transcriptionists.',
    h1: '10 Minute Typing Speed Test',
    heading: '10 Minute Typing Speed Test',
    subheading: 'Full endurance test simulating formal government exam environments and long-form typing.',
    breadcrumb: '10 Minute',
    canonical: `${SITE_URL}/typing-test/10-minute/`,
    presetDuration: 600,
  },
  {
    path: '/ssc-typing-test/',
    kind: 'tool',
    title: 'SSC CGL & CHSL Typing Test Simulator | Official KDPH & Error Rules',
    description:
      'Practice SSC CGL DEST (15 min / 2000 strokes) and SSC CHSL (10 min / 35 WPM) typing test online. Official full/half mistake evaluation and KDPH scoring.',
    h1: 'SSC CGL & CHSL Typing Test Simulator',
    heading: 'SSC CGL & CHSL Typing Test Simulator',
    subheading: 'Simulate the official Staff Selection Commission skill test with live KDPH tracking and category cut-off evaluation.',
    breadcrumb: 'SSC Exam',
    canonical: `${SITE_URL}/ssc-typing-test/`,
  },
  {
    path: '/typing-lessons/',
    kind: 'tool',
    title: 'Free Online Typing Lessons | Learn Touch Typing Step-by-Step',
    description:
      'Learn touch typing with free interactive typing lessons. Master home row keys, finger placement, and 10 structured drills without looking at the keyboard.',
    h1: 'Free Online Typing Lessons',
    heading: 'Free Online Typing Lessons',
    subheading: 'Master touch-typing foundations with our step-by-step interactive curriculum and finger placement guides.',
    breadcrumb: 'Lessons',
    canonical: `${SITE_URL}/typing-lessons/`,
  },
  {
    path: '/touch-typing/',
    kind: 'article',
    title: 'What Is Touch Typing? Complete Guide & Ergonomics',
    description:
      'Complete guide to touch typing: anchor keys (ASDF JKL;), tactile bumps, muscle memory, proper ergonomics, and the 5 golden rules to double your WPM.',
    h1: 'What Is Touch Typing? The Complete Guide',
    heading: 'What Is Touch Typing? The Complete Guide',
    subheading: 'Learn how touch typing works, why the home row is essential, and how proper ergonomics prevent fatigue.',
    breadcrumb: 'Touch Typing',
    canonical: `${SITE_URL}/touch-typing/`,
    datePublished: '2026-11-21',
  },
  {
    path: '/typing-speed-chart/',
    kind: 'article',
    title: 'Typing Speed Chart & WPM Benchmarks | Average Typing Speed',
    description:
      'Check typing speed charts and global WPM percentiles. Compare your words per minute against age demographics, office jobs, and competitive benchmarks.',
    h1: 'Typing Speed Chart & Global WPM Benchmarks',
    heading: 'Typing Speed Chart & Global WPM Benchmarks',
    subheading: 'See where your typing speed ranks across international percentiles, corporate careers, and competitive examinations.',
    breadcrumb: 'Speed Chart',
    canonical: `${SITE_URL}/typing-speed-chart/`,
    datePublished: '2026-11-21',
  },
  {
    path: '/typing-practice/',
    kind: 'tool',
    title: 'Typing Practice & Drills | Check Typing Speeds & Form',
    description:
      'Practice touch typing with interactive drills. Master home row keys, common English bigrams, punctuation, and numbers to check typing speed growth.',
    h1: 'Free Typing Practice & Drills',
    heading: 'Free Typing Practice & Drills',
    subheading: 'Targeted exercises to build neuromuscular muscle memory and steadily increase your WPM.',
    breadcrumb: 'Practice',
    canonical: `${SITE_URL}/typing-practice/`,
  },
  {
    path: '/typing-games/',
    kind: 'tool',
    title: 'Free Online Typing Games | Check Typing Speeds Arcade',
    description:
      'Play Word Cascade typing defense game to check typing speeds and reflexes. Vaporize descending vocabulary, build finger agility, and beat high scores.',
    h1: 'Free Online Typing Games',
    heading: 'Free Online Typing Games',
    subheading: 'Kinetic arcade typing challenges designed to sharpen reflexes and eliminate finger hesitation.',
    breadcrumb: 'Games',
    canonical: `${SITE_URL}/typing-games/`,
  },
  {
    path: '/wpm-calculator/',
    kind: 'tool',
    title: 'WPM Calculator | Check Typing Speed Formulas & CPM',
    description:
      'Interactive WPM calculator to check typing speed metrics. Convert total keystrokes, elapsed time, and errors into Gross WPM, Net WPM, and CPM.',
    h1: 'Interactive WPM Calculator',
    heading: 'Interactive WPM Calculator',
    subheading: 'Explore the exact mathematical formulas behind Words Per Minute and calculate your typing metrics.',
    breadcrumb: 'WPM Calc',
    canonical: `${SITE_URL}/wpm-calculator/`,
  },
  {
    path: '/how-wpm-is-calculated/',
    kind: 'article',
    title: 'How WPM Is Calculated | Check Typing Speed Formulas',
    description:
      'Learn how to check typing speed accurately. Complete guide to Gross WPM, Net WPM error penalties, ANSI 5-character word standard, and CPM calculation.',
    h1: 'How WPM Is Calculated: The Complete Guide',
    heading: 'How WPM Is Calculated: The Complete Guide',
    subheading: 'Transparent breakdown of standard touch typing formulas, error deductions, and exam scoring.',
    breadcrumb: 'How WPM Is Calculated',
    canonical: `${SITE_URL}/how-wpm-is-calculated/`,
    datePublished: '2026-11-21',
  },
  {
    path: '/about/',
    kind: 'about',
    title: 'About CheckTypingSpeeds | Fast, Free & Private Platform',
    description:
      'Learn about CheckTypingSpeeds. Our mission is to provide the cleanest, fastest, ad-free typing test with 100% client-side privacy for typists worldwide.',
    h1: 'About CheckTypingSpeeds',
    heading: 'About CheckTypingSpeeds',
    subheading: 'Built on privacy-by-design, local-first performance, and distraction-free typing evaluation.',
    breadcrumb: 'About',
    canonical: `${SITE_URL}/about/`,
  },
  {
    path: '/methodology/',
    kind: 'article',
    title: 'Typing Test Methodology | Check Typing Speed Precision',
    description:
      'Technical specifications of CheckTypingSpeeds: monotonic hardware timers, 5-character word norm, IME composition handling, and Net WPM formulas.',
    h1: 'Engine & Scoring Methodology',
    heading: 'Engine & Scoring Methodology',
    subheading: 'Mathematical precision, zero timer drift, and standardized touch-typing metrics.',
    breadcrumb: 'Methodology',
    canonical: `${SITE_URL}/methodology/`,
    datePublished: '2026-11-21',
  },
  {
    path: '/contact/',
    kind: 'contact',
    title: 'Contact CheckTypingSpeeds | Feedback & Suggestions',
    description:
      'Get in touch with the CheckTypingSpeeds team. Submit feedback, report bugs, suggest exam passage formats, or inquire about educational use.',
    h1: 'Contact CheckTypingSpeeds',
    heading: 'Contact CheckTypingSpeeds',
    subheading: 'We welcome community feedback, bug reports, and exam format suggestions.',
    breadcrumb: 'Contact',
    canonical: `${SITE_URL}/contact/`,
  },
  {
    path: '/privacy/',
    kind: 'legal',
    title: 'Privacy Policy | CheckTypingSpeeds Zero Keystroke Log',
    description:
      'CheckTypingSpeeds privacy policy: We guarantee zero keystroke logging, no account requirement, and 100% local client-side typing speed calculation.',
    h1: 'Privacy Policy',
    heading: 'Privacy Policy',
    subheading: 'Our privacy pledge: No keystroke tracking, no required sign-ups, and complete client-side security.',
    breadcrumb: 'Privacy',
    canonical: `${SITE_URL}/privacy/`,
    inSitemap: false,
  },
  {
    path: '/terms/',
    kind: 'legal',
    title: 'Terms of Service | CheckTypingSpeeds Usage Guidelines',
    description:
      'Terms of service and usage guidelines for CheckTypingSpeeds. Free educational typing test and touch-typing practice platform for everyone.',
    h1: 'Terms of Service',
    heading: 'Terms of Service',
    subheading: 'Clear, transparent terms for using our open educational typing speed platform.',
    breadcrumb: 'Terms',
    canonical: `${SITE_URL}/terms/`,
    inSitemap: false,
  },
  {
    path: '/404/',
    kind: 'tool',
    title: 'Page Not Found (404) | CheckTypingSpeeds',
    description: 'The requested page could not be found. Return to CheckTypingSpeeds to check your typing speed free online.',
    h1: 'Page Not Found',
    heading: 'Page Not Found',
    breadcrumb: 'Not Found',
    canonical: `${SITE_URL}/404/`,
    inSitemap: false,
    noindex: true,
    noIndex: true,
  },
];

export const getRoute = (path: string): SeoRoute | undefined => {
  // Normalize trailing slash if needed
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return routes.find((r) => r.path === normalized || r.path === path);
};

export const ROUTES: Record<string, SeoRoute> = Object.fromEntries(
  routes.map((r) => [r.path, r])
);

export const ROUTE_LIST: SeoRoute[] = routes;
