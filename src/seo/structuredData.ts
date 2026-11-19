import { RouteMeta } from '../types';
import { SITE_NAME, SITE_URL } from './routes';

export function generateStructuredData(route: RouteMeta): string {
  const canonicalUrl = route.canonical || `${SITE_URL}${route.path}`;

  const jsonLdObjects: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CheckTypingSpeeds',
      alternateName: ['Check Typing Speeds', 'CheckTypingSpeeds.com', 'Check Typing Speed'],
      url: SITE_URL,
      description: 'Check your typing speed and accuracy in WPM with clean, ad-free online typing tests.',
      image: `${SITE_URL}/logo.webp`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/typing-test/{search_term_string}/`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CheckTypingSpeeds',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon-512x512.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@checktypingspeeds.com',
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

  // FAQ Schema on high-intent routes to capture Google FAQ Rich Snippets in SERP
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
