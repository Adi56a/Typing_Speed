import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './app/App';
import { ROUTES, ROUTE_LIST, SITE_URL } from './seo/routes';
import { generateStructuredData } from './seo/structuredData';
import { RouteMeta } from './types';

export function getRoutes(): RouteMeta[] {
  return ROUTE_LIST;
}

export function render(url: string) {
  const route = ROUTES[url] || ROUTES['/'];

  const html = renderToString(
    <React.StrictMode>
      <App initialPath={route.path} />
    </React.StrictMode>
  );

  const structuredData = generateStructuredData(route);
  const canonicalUrl = route.canonical || `${SITE_URL}${route.path}`;

  const head = `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />

    <!-- Structured Data (Schema.org) -->
    <script type="application/ld+json">
${structuredData}
    </script>
  `.trim();

  return { html, head };
}

