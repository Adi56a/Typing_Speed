import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');
const serverEntryPath = path.resolve(distDir, 'server/entry-server.js');

async function prerender() {
  console.log('🚀 Starting Static Site Generation (SSG) Prerender...');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Client template not found at ${templatePath}. Run vite build first.`);
  }

  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`Server entry not found at ${serverEntryPath}. Run vite build --ssr first.`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  // Use pathToFileURL for Windows compatibility with ESM imports
  const { render, getRoutes } = await import(pathToFileURL(serverEntryPath).href);

  const routes = getRoutes();
  console.log(`📄 Found ${routes.length} canonical routes to prerender.\n`);

  for (const route of routes) {
    const { html: appHtml, head: appHead } = render(route.path);

    let pageHtml = template
      .replace('<!--app-html-->', appHtml)
      .replace('<!--app-head-->', appHead);

    // Also replace default title and meta description if present in template
    if (route.title) {
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    }
    if (route.description) {
      pageHtml = pageHtml.replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${route.description}" />`
      );
    }

    const relativePath = route.path === '/' ? 'index.html' : path.join(route.path.replace(/^\//, ''), 'index.html');
    const outFilePath = path.resolve(distDir, relativePath);
    const outDir = path.dirname(outFilePath);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outFilePath, pageHtml, 'utf-8');
    const stats = fs.statSync(outFilePath);
    console.log(`  ✓ ${route.path.padEnd(32)} -> ${relativePath} (${(stats.size / 1024).toFixed(2)} KB)`);
  }

  // Generate sitemap.xml
  generateSitemap(routes);

  console.log('\n✨ Static prerendering completed successfully!');
}

function generateSitemap(routes) {
  const siteUrl = 'https://typingtest.example.com';
  const today = new Date().toISOString().split('T')[0];

  const urlsXml = routes
    .map(
      (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  const sitemapPath = path.resolve(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`\n🗺️  Generated sitemap.xml with ${routes.length} canonical URLs.`);
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
