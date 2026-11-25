import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { routes, SITE_URL } from '../src/seo/routes.ts';

const today = () => new Date().toISOString().slice(0, 10);
const lastmodFor = (r) => {
  try {
    const file = r.sourceFile;
    if (file) return execSync(`git log -1 --format=%cs -- "${file}"`).toString().trim() || today();
  } catch {}
  return today();
};

const urls = routes
  .filter((r) => r.inSitemap !== false && !r.noindex && !r.noIndex && r.kind !== 'legal' && r.path !== '/404/')
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmodFor(r)}</lastmod>\n  </url>`)
  .join('\n');

fs.writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log('sitemap.xml written to dist/sitemap.xml');
