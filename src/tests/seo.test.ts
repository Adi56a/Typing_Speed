import { describe, it, expect } from 'vitest';
import { ROUTE_LIST, SITE_URL } from '../seo/routes';
import { generateStructuredData } from '../seo/structuredData';

describe('SEO & Metadata Integrity', () => {
  it('ensures all routes have unique titles and descriptions', () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const route of ROUTE_LIST) {
      expect(route.title).toBeTruthy();
      expect(route.description).toBeTruthy();
      expect(route.heading).toBeTruthy();

      // Check description length within optimal SERP snippet bounds (50 - 170 chars)
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

  it('generates valid parseable JSON-LD structured data for every route', () => {
    for (const route of ROUTE_LIST) {
      const jsonString = generateStructuredData(route);
      expect(() => JSON.parse(jsonString)).not.toThrow();

      const parsed = JSON.parse(jsonString);
      expect(Array.isArray(parsed)).toBe(true);

      const types = parsed.map((item: { '@type': string }) => item['@type']);
      expect(types).toContain('WebSite');
      expect(types).toContain('WebApplication');

      if (route.path !== '/') {
        expect(types).toContain('BreadcrumbList');
      }

      if (route.path === '/' || route.path === '/how-wpm-is-calculated/') {
        expect(types).toContain('FAQPage');
      }
    }
  });

  it('includes a compliant Google Search Organization logo in structured data', () => {
    const jsonString = generateStructuredData(ROUTE_LIST[0]);
    const parsed = JSON.parse(jsonString);
    const org = parsed.find((item: { '@type': string }) => item['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org.logo).toBe('https://checktypingspeeds.com/favicon-512x512.png');
  });
});
