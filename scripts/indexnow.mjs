import fs from 'node:fs';

const KEY = process.env.INDEXNOW_KEY || 'c7e5a8f3b2d1490e8c6b4a2d1e0f39ab';
if (!KEY) {
  console.error('INDEXNOW_KEY missing');
  process.exit(1);
}

const sitemapPath = fs.existsSync('dist/sitemap.xml') ? 'dist/sitemap.xml' : 'public/sitemap.xml';
const xml = fs.readFileSync(sitemapPath, 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'checktypingspeeds.com',
      key: KEY,
      keyLocation: `https://checktypingspeeds.com/${KEY}.txt`,
      urlList,
    }),
  });
  console.log('IndexNow response:', res.status, '(200/202 = OK)');
} catch (err) {
  console.log('IndexNow ping notice (pre-deploy / offline):', err.message);
}
