import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './app/App';
import { getRoute, routes, SITE_URL, SeoRoute } from './seo/routes';
import { generateStructuredData } from './seo/structuredData';

export function getRoutes(): SeoRoute[] {
  return routes;
}

export function render(url: string) {
  const route = getRoute(url) || getRoute('/')!;

  const html = renderToString(
    <React.StrictMode>
      <App initialPath={route.path} />
    </React.StrictMode>
  );

  const structuredData = generateStructuredData(route);
  const canonicalUrl = route.canonical || `${SITE_URL}${route.path}`;
  const isNoIndex = route.path === '/404/' || route.noIndex;
  const robotsDirective = isNoIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const head = `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="robots" content="${robotsDirective}" />
    
    <!-- Open Graph / Social (Google, Bing, Teams, LinkedIn) -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CheckTypingSpeeds" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${SITE_URL}/logo.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="670" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${SITE_URL}/logo.webp" />

    <!-- Structured Data (Schema.org) -->
    <script type="application/ld+json">
${structuredData}
    </script>
  `.trim();

  return { html, head };
}

