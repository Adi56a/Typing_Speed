import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './app/App';
import { getRoute, routes, SITE_URL, SeoRoute } from './seo/routes';
import { buildJsonLd } from './seo/jsonld';

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

  const canonicalUrl = route.canonical || `${SITE_URL}${route.path}`;
  const isNoIndex = route.path === '/404/' || route.noIndex || route.noindex;
  const isNoFollow = route.path === '/404/';
  const robotsDirective = isNoIndex
    ? isNoFollow
      ? 'noindex, nofollow'
      : 'noindex, follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const ogSlug = route.path === '/' ? 'home' : route.path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
  const ogImageUrl = `${SITE_URL}/og/${ogSlug}.png`;

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
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${ogImageUrl}" />

    <!-- Structured Data (Schema.org @graph) -->
    <script type="application/ld+json">
${JSON.stringify(buildJsonLd(route))}
    </script>
  `.trim();

  return { html, head };
}

