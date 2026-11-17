import { RouteMeta } from '../types';
import { SITE_NAME, SITE_URL } from './routes';

export function generateStructuredData(route: RouteMeta): string {
  const jsonLdObjects: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: 'Free, fast, ad-free online typing speed test and practice platform.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${route.heading} | ${SITE_NAME}`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All modern browsers (Desktop & Mobile)',
      url: route.canonical || `${SITE_URL}${route.path}`,
      browserRequirements: 'Requires JavaScript. Works offline after initial load.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ];

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
          item: route.canonical || `${SITE_URL}${route.path}`,
        },
      ],
    });
  }

  return JSON.stringify(jsonLdObjects, null, 2);
}
