import { RouteMeta } from '../types';
import { SITE_NAME, SITE_URL, SeoRoute } from './routes';

export function generateStructuredData(route: RouteMeta | SeoRoute): string {
  const canonicalUrl = route.canonical || `${SITE_URL}${route.path}`;

  const jsonLdObjects: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CheckTypingSpeeds',
      alternateName: ['Check Typing Speeds', 'CheckTypingSpeeds.com', 'Check Typing Speed'],
      url: SITE_URL,
      description: 'Check your typing speed and accuracy in WPM with clean, ad-free online typing tests.',
      image: `${SITE_URL}/favicon-512x512.png`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CheckTypingSpeeds',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon-512x512.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'checktypingspeeds@gmail.com',
        contactType: 'Customer Support',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${route.heading} | ${SITE_NAME}`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All modern web browsers (Chrome, Edge, Firefox, Safari, Mobile)',
      url: canonicalUrl,
      image: `${SITE_URL}/logo.webp`,
      browserRequirements: 'Requires JavaScript. Operates offline after initial page load.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Check typing speed in 1-minute, 2-minute, 5-minute, and 10-minute tests',
        'Official SSC CGL DEST & CHSL government typing exam simulator',
        'Touch-typing academy with 10 structured interactive lessons',
        'Monotonic high-precision typing timer without clock drift',
        'Gross and Net Words Per Minute (WPM) calculation',
        'Keystroke accuracy percentage and CPM metrics',
        'Kinetic typing arcade defense game (Word Cascade)',
        'Virtual touch-typing finger guide keyboard',
        '100% client-side privacy guarantee: zero keystroke logging',
      ],
    },
  ];

  // Breadcrumbs for child pages
  if (route.path !== '/') {
    jsonLdObjects.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.heading,
          item: canonicalUrl,
        },
      ],
    });
  }

  // FAQ Schema for SSC Typing Test
  if (route.path === '/ssc-typing-test/') {
    jsonLdObjects.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is backspace allowed in SSC CGL and CHSL typing tests?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, backspace and arrow keys are fully permitted in official SSC typing skill tests. Candidates can navigate back and correct errors. However, excessive backspacing consumes valuable time needed to complete the required keystroke count.',
          },
        },
        {
          '@type': 'Question',
          name: 'What counts as a Full Mistake versus a Half Mistake in SSC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Full Mistake (1.0) occurs when an entire word is omitted, substituted with an incorrect word, or added unnecessarily. A Half Mistake (0.5) occurs when the word is correct but contains spacing errors, wrong capitalization, or punctuation slips.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the conversion between KDPH and WPM?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Under standard touch-typing and SSC guidelines, 1 word equals 5 key depressions. Dividing Key Depressions Per Hour (KDPH) by 300 gives Words Per Minute (WPM). Thus, 8,000 KDPH equals 26.67 WPM, and 10,500 KDPH equals exactly 35 WPM.',
          },
        },
      ],
    });
  }

  // FAQ Schema for Typing Lessons
  if (route.path === '/typing-lessons/') {
    jsonLdObjects.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does it take to learn touch typing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most beginners achieve 30 to 40 WPM within two to three weeks of consistent 15-minute daily practice on the home row keys. Advanced speeds exceeding 60+ WPM develop with 2 to 3 months of regular typing drills.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do keyboards have little bumps on the F and J keys?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The raised tactile bumps on F and J are indexing anchors. They allow touch typists to align their index fingers on the home row by feel alone without looking down at the keyboard.',
          },
        },
      ],
    });
  }

  // FAQ Schema for Touch Typing Guide
  if (route.path === '/touch-typing/') {
    jsonLdObjects.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is touch typing and why is it important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Touch typing is typing without looking at the keyboard using all ten fingers anchored to the home row keys (ASDF JKL;). It doubles or triples typing speed and eliminates cognitive distraction.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the 8 home row keys?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 8 home row keys are A, S, D, F for the left hand and J, K, L, semicolon (;) for the right hand, with thumbs resting gently on the space bar.',
          },
        },
      ],
    });
  }

  // FAQ Schema for Typing Speed Chart
  if (route.path === '/typing-speed-chart/') {
    jsonLdObjects.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is 50 WPM a good typing speed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 50 WPM is comfortably above the global average of ~40 WPM, placing you in the top 35% of all typists and qualifying for most corporate and administrative office jobs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is considered an average typing speed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The average typing speed worldwide is approximately 38 to 42 Words Per Minute (WPM) with 92% accuracy.',
          },
        },
      ],
    });
  }

  // FAQ Schema on core home and speed test routes
  if (
    route.path === '/' ||
    route.path === '/typing-speed-test/' ||
    route.path === '/typing-test/1-minute/' ||
    route.path === '/how-wpm-is-calculated/'
  ) {
    jsonLdObjects.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I check my typing speed on CheckTypingSpeeds?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To check your typing speed on CheckTypingSpeeds, simply start typing the words displayed on screen. The timer begins automatically with your first keystroke. No account, sign-in, or payment is required. When the timer finishes, you receive your Net WPM, Gross WPM, accuracy percentage, and error analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is WPM in typing and how is it calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WPM stands for Words Per Minute. Under international touch-typing conventions, one standardized word is defined as 5 characters (including spaces and punctuation). Gross WPM is calculated as (Total Characters / 5) / Elapsed Minutes. Net WPM subtracts uncorrected errors to measure true typing speed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good typing speed for jobs and competitive exams?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An average typist types between 38 and 42 WPM. Professional office roles typically look for 50 to 60 WPM. Most government exams in India (e.g. SSC CGL, CHSL, RRB, CPCT) require 30 to 35 WPM in English with at least 95% accuracy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does CheckTypingSpeeds log or store my keystrokes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. CheckTypingSpeeds operates with 100% client-side privacy. All timer calculations and keystroke evaluations occur purely in your local browser memory. Zero keystrokes, passages, or personal telemetry are transmitted over the network.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I increase my typing speed quickly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To increase typing speed: 1) Prioritize 100% accuracy over raw speed to train neuromuscular memory; 2) Master touch typing on the home row keys (ASDF JKL;) without looking at the keyboard; 3) Practice consistently in 5 to 15-minute daily sessions on CheckTypingSpeeds.',
          },
        },
      ],
    });
  }

  return JSON.stringify(jsonLdObjects, null, 2);
}
