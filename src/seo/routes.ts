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
    title: 'Typing Test – Free Typing Speed Test (WPM) | CheckTypingSpeeds',
    description:
      'Take a free typing test and check your typing speed in WPM and accuracy. 30-second, 1, 3, 5 and 10-minute tests. No sign-up, no ads.',
    h1: 'Typing Speed Test',
    heading: 'Typing Speed Test',
    subheading: 'Check your words per minute (WPM), track keystroke accuracy, and master touch typing with instant client-side scoring.',
    breadcrumb: 'Home',
    canonical: `${SITE_URL}/`,
  },
  {
    path: '/typing-test/1-minute/',
    kind: 'tool',
    title: '1 Minute Typing Test – Check Your WPM in 60 Seconds',
    description:
      'Free 1-minute typing test. Type for 60 seconds and get your WPM, accuracy and error count instantly. No login required.',
    h1: '1 Minute Typing Test',
    heading: '1 Minute Typing Test',
    subheading: 'A quick 60-second speed challenge to check your typing speed benchmark and daily progress.',
    breadcrumb: '1 Minute',
    canonical: `${SITE_URL}/typing-test/1-minute/`,
    presetDuration: 60,
  },
  {
    path: '/typing-test/2-minute/',
    kind: 'tool',
    title: '2 Minute Typing Test – Free WPM Speed Check',
    description:
      'Free 2-minute typing test. Measure your words per minute and accuracy over two minutes with instant results and no sign-up.',
    h1: '2 Minute Typing Test',
    heading: '2 Minute Typing Test',
    subheading: 'Test sustained typing cadence and error resilience over 120 seconds.',
    breadcrumb: '2 Minute',
    canonical: `${SITE_URL}/typing-test/2-minute/`,
    presetDuration: 120,
  },
  {
    path: '/typing-test/5-minute/',
    kind: 'tool',
    title: '5 Minute Typing Test – Net WPM & Accuracy (Free)',
    description:
      'Free 5-minute typing test used for job and exam prep. Measures net WPM, accuracy and errors over a full five minutes.',
    h1: '5 Minute Typing Test',
    heading: '5 Minute Typing Test',
    subheading: 'Official 5-minute test simulating employment screening benchmarks and competitive exams.',
    breadcrumb: '5 Minute',
    canonical: `${SITE_URL}/typing-test/5-minute/`,
    presetDuration: 300,
  },
  {
    path: '/typing-test/10-minute/',
    kind: 'tool',
    title: '10 Minute Typing Test – Endurance WPM Test',
    description:
      'Free 10-minute typing test to measure sustained typing speed and accuracy, ideal for SSC CHSL and long data-entry tests.',
    h1: '10 Minute Typing Test',
    heading: '10 Minute Typing Test',
    subheading: 'Full endurance test simulating formal government exam environments and long-form typing.',
    breadcrumb: '10 Minute',
    canonical: `${SITE_URL}/typing-test/10-minute/`,
    presetDuration: 600,
  },
  {
    path: '/ssc-typing-test/',
    kind: 'tool',
    title: 'SSC Typing Test Online – CGL DEST & CHSL Practice (Free)',
    description:
      'Free SSC typing test simulator for CGL DEST and CHSL with official full/half mistake rules, KDPH score and net WPM. Practice online.',
    h1: 'SSC Typing Test – CGL & CHSL Practice',
    heading: 'SSC Typing Test – CGL & CHSL Practice',
    subheading: 'Simulate the official Staff Selection Commission skill test with live KDPH tracking and category cut-off evaluation.',
    breadcrumb: 'SSC Exam',
    canonical: `${SITE_URL}/ssc-typing-test/`,
  },
  {
    path: '/typing-lessons/',
    kind: 'tool',
    title: 'Free Typing Lessons – Learn Touch Typing Step by Step',
    description:
      'Learn touch typing with 10 free step-by-step typing lessons. Correct finger placement, home row keys and drills to type without looking.',
    h1: 'Free Typing Lessons',
    heading: 'Free Typing Lessons',
    subheading: 'Master touch-typing foundations with our step-by-step interactive curriculum and finger placement guides.',
    breadcrumb: 'Lessons',
    canonical: `${SITE_URL}/typing-lessons/`,
  },
  {
    path: '/touch-typing/',
    kind: 'article',
    title: 'Touch Typing – How to Type Without Looking (Guide)',
    description:
      'Learn how to touch type: finger placement, home row position, posture and a practice plan to type faster without looking at the keyboard.',
    h1: 'How to Touch Type',
    heading: 'How to Touch Type',
    subheading: 'Learn how touch typing works, why the home row is essential, and how proper ergonomics prevent fatigue.',
    breadcrumb: 'Touch Typing',
    canonical: `${SITE_URL}/touch-typing/`,
    datePublished: '2026-11-21',
  },
  {
    path: '/typing-speed-chart/',
    kind: 'article',
    title: 'Average Typing Speed (WPM) by Age & Job – Typing Speed Chart',
    description:
      'The average typing speed is about 40 WPM. See WPM benchmarks by age, job and percentile, and find out what a good typing speed is.',
    h1: 'Average Typing Speed & WPM Chart',
    heading: 'Average Typing Speed & WPM Chart',
    subheading: 'See where your typing speed ranks across international percentiles, corporate careers, and competitive examinations.',
    breadcrumb: 'Speed Chart',
    canonical: `${SITE_URL}/typing-speed-chart/`,
    datePublished: '2026-11-21',
  },
  {
    path: '/typing-practice/',
    kind: 'tool',
    title: 'Typing Practice – Free Drills for Home Row, Numbers & Symbols',
    description:
      'Free typing practice drills for the home row, top and bottom rows, common letter pairs, numbers and punctuation. Build speed and accuracy.',
    h1: 'Typing Practice Drills',
    heading: 'Typing Practice Drills',
    subheading: 'Targeted exercises to build neuromuscular muscle memory and steadily increase your WPM.',
    breadcrumb: 'Practice',
    canonical: `${SITE_URL}/typing-practice/`,
  },
  {
    path: '/typing-games/',
    kind: 'tool',
    title: 'Free Typing Games – Improve Your WPM While You Play',
    description:
      'Play free typing games that build speed and accuracy. Type falling words before they land and beat your high score. No download.',
    h1: 'Typing Games',
    heading: 'Typing Games',
    subheading: 'Kinetic arcade typing challenges designed to sharpen reflexes and eliminate finger hesitation.',
    breadcrumb: 'Games',
    canonical: `${SITE_URL}/typing-games/`,
  },
  {
    path: '/wpm-calculator/',
    kind: 'tool',
    title: 'WPM Calculator – Words Per Minute, CPM & Net WPM',
    description:
      'Free WPM calculator. Enter characters typed, time and errors to get gross WPM, net WPM and CPM. Includes a KDPH to WPM converter.',
    h1: 'WPM Calculator',
    heading: 'WPM Calculator',
    subheading: 'Explore the exact mathematical formulas behind Words Per Minute and calculate your typing metrics.',
    breadcrumb: 'WPM Calc',
    canonical: `${SITE_URL}/wpm-calculator/`,
  },
  {
    path: '/how-wpm-is-calculated/',
    kind: 'article',
    title: 'How Is WPM Calculated? Gross vs Net WPM Formula',
    description:
      'Learn exactly how WPM is calculated: the 5-character word rule, gross vs net WPM, error penalties and a worked example.',
    h1: 'How WPM Is Calculated (Formula + Example)',
    heading: 'How WPM Is Calculated (Formula + Example)',
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
