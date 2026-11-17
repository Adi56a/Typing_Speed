import { RouteMeta } from '../types';

export const SITE_URL = 'https://typingtest.example.com';
export const SITE_NAME = 'TypeFast - Free Online Typing Speed Test & Practice';

export const ROUTES: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'Typing Speed Test | Free Online Typing Test & Practice',
    description:
      'Test your typing speed and accuracy in WPM with our clean, ad-free online typing test. Instant results, timed tests (1, 2, 5 min), and practice drills.',
    heading: 'Free Online Typing Speed Test',
    subheading: 'Measure your words per minute (WPM), improve accuracy, and master touch typing with zero distractions.',
    canonical: `${SITE_URL}/`,
  },
  '/typing-speed-test/': {
    path: '/typing-speed-test/',
    title: 'Typing Speed Test (WPM) - Check Your Keyboard Speed Online',
    description:
      'Accurate, real-time typing speed test. Check raw WPM, net WPM, accuracy percentage, and keystroke errors instantly with deterministic scoring.',
    heading: 'Typing Speed Test (WPM)',
    subheading: 'Benchmark your keyboard speed with real-time metrics and error tracking.',
    canonical: `${SITE_URL}/typing-speed-test/`,
  },
  '/typing-test/1-minute/': {
    path: '/typing-test/1-minute/',
    title: '1 Minute Typing Test - Fast 60-Second WPM Speed Check',
    description:
      'Take a quick 1-minute typing test to measure your typing speed in 60 seconds. Ideal for quick daily warm-ups, speed benchmarking, and job readiness.',
    heading: '1 Minute Typing Test',
    subheading: 'A fast 60-second challenge to measure your baseline typing speed and accuracy.',
    canonical: `${SITE_URL}/typing-test/1-minute/`,
    presetDuration: 60,
  },
  '/typing-test/2-minute/': {
    path: '/typing-test/2-minute/',
    title: '2 Minute Typing Test - Medium Duration Typing Speed Exam',
    description:
      'Measure sustained typing pace and concentration with a 2-minute (120-second) typing test. Perfect balance between burst speed and endurance.',
    heading: '2 Minute Typing Test',
    subheading: 'Test sustained typing stamina and accuracy over 120 seconds.',
    canonical: `${SITE_URL}/typing-test/2-minute/`,
    presetDuration: 120,
  },
  '/typing-test/5-minute/': {
    path: '/typing-test/5-minute/',
    title: '5 Minute Typing Test - Professional & Exam Typing Practice',
    description:
      'Take a 5-minute online typing test for employment screening, competitive typing exams, and deep typing endurance evaluation.',
    heading: '5 Minute Typing Test',
    subheading: 'Standard endurance evaluation required by corporate job screenings and government exams.',
    canonical: `${SITE_URL}/typing-test/5-minute/`,
    presetDuration: 300,
  },
  '/typing-test/10-minute/': {
    path: '/typing-test/10-minute/',
    title: '10 Minute Typing Test - Full Stamina & Government Exam Prep',
    description:
      'Comprehensive 10-minute typing speed test designed for government recruitment exams (SSC, High Court) and serious transcriptionists.',
    heading: '10 Minute Typing Test',
    subheading: 'Full endurance test simulating formal government exam environments and long-form transcription.',
    canonical: `${SITE_URL}/typing-test/10-minute/`,
    presetDuration: 600,
  },
  '/typing-practice/': {
    path: '/typing-practice/',
    title: 'Typing Practice - Free Touch Typing Lessons & Drills',
    description:
      'Master touch typing with focused practice exercises. Practice home row keys, common English bigrams, punctuation, and number keys.',
    heading: 'Free Typing Practice & Drills',
    subheading: 'Targeted drills to build muscle memory, reduce typos, and steadily raise your WPM.',
    canonical: `${SITE_URL}/typing-practice/`,
  },
  '/wpm-calculator/': {
    path: '/wpm-calculator/',
    title: 'WPM Calculator - Calculate Words Per Minute, Accuracy & CPM',
    description:
      'Interactive WPM calculator. Convert characters typed, elapsed time, and errors into gross WPM, net WPM, and accuracy percentage.',
    heading: 'Interactive WPM Calculator',
    subheading: 'Learn the exact math behind Words Per Minute and calculate your typing metrics with custom values.',
    canonical: `${SITE_URL}/wpm-calculator/`,
  },
  '/how-wpm-is-calculated/': {
    path: '/how-wpm-is-calculated/',
    title: 'How WPM Is Calculated - The Standard Typing Speed Formula',
    description:
      'Transparent guide to typing speed measurement formulas: Gross WPM, Net WPM penalty calculations, standard 5-character word rule, and CPM.',
    heading: 'How WPM Is Calculated: The Complete Guide',
    subheading: 'Everything you need to know about standard typing formulas, error penalties, and industry scoring conventions.',
    canonical: `${SITE_URL}/how-wpm-is-calculated/`,
  },
  '/about/': {
    path: '/about/',
    title: 'About Us - Fast, Free & Private Typing Platform',
    description:
      'Our mission is to provide the fastest, cleanest, most accessible ad-free typing test on the web for global learners and students in India.',
    heading: 'About Our Typing Platform',
    subheading: 'Built on privacy-by-design, local-first performance, and distraction-free learning.',
    canonical: `${SITE_URL}/about/`,
  },
  '/methodology/': {
    path: '/methodology/',
    title: 'Typing Test Scoring Methodology - Formulas, Clock Sync & Standards',
    description:
      'Detailed engineering and mathematical specification of our typing engine: monotonic performance.now timers, 5-character word convention, and Net WPM penalty rules.',
    heading: 'Engine & Scoring Methodology',
    subheading: 'Mathematical precision, clock drift immunity, and standardized metrics.',
    canonical: `${SITE_URL}/methodology/`,
  },
  '/contact/': {
    path: '/contact/',
    title: 'Contact Us & Feedback - Global Typing Speed Platform',
    description:
      'Get in touch with the TypeFast team. Send feedback, report bugs, suggest exam formats, or discuss school/educator partnerships.',
    heading: 'Contact & Feedback',
    subheading: 'We welcome ideas, bug reports, and exam format suggestions.',
    canonical: `${SITE_URL}/contact/`,
  },
  '/privacy/': {
    path: '/privacy/',
    title: 'Privacy Policy - Zero Keystroke Logging Guarantee',
    description:
      'Read our privacy policy. We do not log, transmit, or store your typed keystrokes or text passages. 100% client-side typing evaluation.',
    heading: 'Privacy Policy',
    subheading: 'Our promise: Zero keystroke tracking, no required accounts, and complete data privacy.',
    canonical: `${SITE_URL}/privacy/`,
  },
  '/terms/': {
    path: '/terms/',
    title: 'Terms of Service - Free Typing Test Platform',
    description: 'Terms of service and usage guidelines for our free online typing test and practice platform.',
    heading: 'Terms of Service',
    subheading: 'Clear, transparent terms for using our open educational typing platform.',
    canonical: `${SITE_URL}/terms/`,
  },
  '/404/': {
    path: '/404/',
    title: 'Page Not Found (404) | TypeFast Typing Test',
    description: 'The requested page could not be found. Return to our free online typing speed test.',
    heading: 'Page Not Found',
    canonical: `${SITE_URL}/404/`,
  },
};

export const ROUTE_LIST = Object.values(ROUTES);

