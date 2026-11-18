import { RouteMeta } from '../types';
import { SITE_NAME, SITE_URL } from './routes';

export function generateStructuredData(route: RouteMeta): string {
  const canonicalUrl = route.canonical || `${SITE_URL}${route.path}`;

  const jsonLdObjects: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: 'Free, fast, ad-free online typing speed test and practice platform.',
      image: `${SITE_URL}/logo.webp`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/typing-test/{search_term_string}/`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${route.heading} | ${SITE_NAME}`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All modern web browsers (Chrome, Edge, Firefox, Safari)',
      url: canonicalUrl,
      image: `${SITE_URL}/logo.webp`,
      browserRequirements: 'Requires JavaScript. Operates offline after initial page load.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Monotonic high-precision typing timer',
        'Gross and Net Words Per Minute calculation',
        'Accuracy percentage and CPM metrics',
        'Distraction-free typing surface',
        'Zero keystroke logging guarantee',
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

  // FAQ Schema on Homepage & How WPM is calculated
  if (route.path === '/' || route.path === '/how-wpm-is-calculated/') {
    jsonLdObjects.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is WPM in typing and how is it calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WPM stands for Words Per Minute. Under international touch-typing conventions, one standardized word is defined as 5 characters (including spaces and punctuation). Gross WPM is calculated as (Total Characters / 5) / Elapsed Minutes. Net WPM subtracts uncorrected errors.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good typing speed for job exams and students?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An average typist types between 38 and 42 WPM. Professional office roles typically look for 50 to 60 WPM. Most government exams in India (e.g. SSC CGL, CHSL, RRB, CPCT) require 30 to 35 WPM in English with at least 95% accuracy.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I increase my typing speed quickly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To increase typing speed: 1) Prioritize 100% accuracy over raw speed to train neuromuscular memory; 2) Master touch typing on the home row keys (ASDF JKL;); 3) Practice consistently in 5 to 15-minute daily sessions.',
          },
        },
      ],
    });
  }

  return JSON.stringify(jsonLdObjects, null, 2);
}
