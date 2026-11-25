import { SITE_URL, SITE_NAME, type SeoRoute } from './routes';

const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: ['Check Typing Speeds', 'CheckTypingSpeeds.com'],
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

const org = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/favicon-512x512.png`,
    width: 512,
    height: 512,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${SITE_URL}/contact/`,
  },
};

export function buildJsonLd(r: SeoRoute): object {
  const url = `${SITE_URL}${r.path}`;
  const graph: object[] = [];

  if (r.path === '/') {
    graph.push(website, org);
  }

  const pageType =
    r.kind === 'about'
      ? 'AboutPage'
      : r.kind === 'contact'
        ? 'ContactPage'
        : 'WebPage';

  graph.push({
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: r.title.split(' | ')[0],
    description: r.description,
    isPartOf: { '@id': WEBSITE_ID },
    dateModified: BUILD_DATE,
    inLanguage: 'en',
  });

  if (r.kind === 'tool' || r.path === '/') {
    graph.push({
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name: r.h1,
      url,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: { '@id': ORG_ID },
    });
  }

  const ogSlug = r.path === '/' ? 'home' : r.path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
  const ogImageUrl = `${SITE_URL}/og/${ogSlug}.png`;

  if (r.kind === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: r.h1,
      datePublished: r.datePublished ?? '2026-11-21',
      dateModified: BUILD_DATE,
      author: {
        '@type': 'Person',
        name: 'Aditya Vardhan',
        url: `${SITE_URL}/about/`,
      },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      image: r.ogImage ? `${SITE_URL}${r.ogImage}` : ogImageUrl,
    });
  }

  if (r.path !== '/') {
    const parts = r.path.split('/').filter(Boolean);
    const items = [{ name: 'Home', item: `${SITE_URL}/` }];
    if (parts[0] === 'typing-test' && parts.length > 1) {
      items.push({ name: 'Typing Tests', item: `${SITE_URL}/typing-test/` });
    }
    items.push({ name: r.breadcrumb, item: url });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        item: it.item,
      })),
    });
  }

  if (r.faqs && r.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: r.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
