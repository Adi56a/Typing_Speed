import { describe, it, expect } from 'vitest';
import { ROUTE_LIST, SITE_URL } from '../seo/routes';
import { buildJsonLd } from '../seo/jsonld';

describe('SEO & Metadata Integrity', () => {
  it('ensures all routes have unique titles and descriptions', () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const route of ROUTE_LIST) {
      expect(route.title).toBeTruthy();
      expect(route.description).toBeTruthy();
      expect(route.heading).toBeTruthy();

      // Check description length within optimal SERP snippet bounds (50 - 180 chars)
      expect(route.description.length).toBeGreaterThan(40);
      expect(route.description.length).toBeLessThan(180);

      // Verify uniqueness
      expect(titles.has(route.title)).toBe(false);
      expect(descriptions.has(route.description)).toBe(false);

      titles.add(route.title);
      descriptions.add(route.description);
    }
  });

  it('enforces canonical trailing slash policy and HTTPS schema', () => {
    for (const route of ROUTE_LIST) {
      expect(route.path.endsWith('/')).toBe(true);
      expect(route.path).toBe(route.path.toLowerCase());

      const canonical = route.canonical || `${SITE_URL}${route.path}`;
      expect(canonical.startsWith('https://')).toBe(true);
      expect(canonical.endsWith('/')).toBe(true);
    }
  });

  it('generates valid parseable JSON-LD structured data with @graph for every route', () => {
    for (const route of ROUTE_LIST) {
      const data = buildJsonLd(route) as { '@context': string; '@graph': Array<{ '@type': string; [key: string]: unknown }> };
      expect(data['@context']).toBe('https://schema.org');
      expect(Array.isArray(data['@graph'])).toBe(true);

      const types = data['@graph'].map((item) => item['@type']);

      if (route.path === '/') {
        expect(types).toContain('WebSite');
        expect(types).toContain('Organization');
        expect(types).toContain('WebApplication');
        expect(types).toContain('FAQPage');
      }

      if (route.path !== '/') {
        expect(types).toContain('BreadcrumbList');
      }

      if (route.kind === 'tool') {
        expect(types).toContain('WebApplication');
      }

      if (route.kind === 'article') {
        expect(types).toContain('Article');
      }
    }
  });

  it('includes a compliant Google Search Organization logo in structured data', () => {
    const data = buildJsonLd(ROUTE_LIST.find((r) => r.path === '/')!) as { '@graph': Array<{ '@type': string; logo?: { url: string } }> };
    const org = data['@graph'].find((item) => item['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org?.logo?.url).toBe('https://checktypingspeeds.com/favicon-512x512.png');
  });
});
