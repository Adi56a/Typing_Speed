// scripts/seo-check.mjs — run after `npm run build`. Exits 1 on any error.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const DIST = 'dist';
const SITE = 'https://checktypingspeeds.com';
const errors = [];
const warns = [];
const pages = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') pages.push(p);
  }
}
walk(DIST);

const sentenceIndex = new Map(); // sentence -> [urls]

for (const file of pages) {
  const rel = '/' + path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  const url = rel === '/' ? '/' : rel + '/';
  const html = fs.readFileSync(file, 'utf8');
  const root = parse(html);
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  if (robots.includes('noindex')) continue;

  const title = root.querySelector('title')?.text.trim() || '';
  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const canon = root.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const h1s = root.querySelectorAll('h1');

  if (!title) errors.push(`${url}: missing <title>`);
  else if (title.length < 30 || title.length > 65) warns.push(`${url}: title length ${title.length} (${title})`);
  if (!desc) errors.push(`${url}: missing meta description`);
  else if (desc.length < 110 || desc.length > 160) warns.push(`${url}: description length ${desc.length}`);
  if (canon !== SITE + url) errors.push(`${url}: canonical is "${canon}", expected "${SITE + url}"`);
  if (h1s.length !== 1) errors.push(`${url}: has ${h1s.length} <h1> (must be exactly 1)`);

  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try { JSON.parse(s.text); } catch (e) { errors.push(`${url}: invalid JSON-LD (${e.message})`); }
  }

  // body text for word count + duplicate detection
  const main = root.querySelector('main') || root.querySelector('body');
  main?.querySelectorAll('script,style,nav,header,footer').forEach(n => n.remove());
  const text = (main?.text || '').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').length;
  if (words < 400) warns.push(`${url}: only ${words} words of body text`);
  for (const s of text.match(/[^.!?]{40,}[.!?]/g) || []) {
    const k = s.trim().toLowerCase();
    sentenceIndex.set(k, [...(sentenceIndex.get(k) || []), url]);
  }
}

// duplicate content: count shared sentences per page pair
const pairCount = new Map();
for (const urls of sentenceIndex.values()) {
  const u = [...new Set(urls)];
  for (let i = 0; i < u.length; i++) for (let j = i + 1; j < u.length; j++) {
    const key = `${u[i]} <-> ${u[j]}`;
    pairCount.set(key, (pairCount.get(key) || 0) + 1);
  }
}
for (const [pair, n] of pairCount) if (n > 2) errors.push(`DUPLICATE CONTENT: ${pair} share ${n} sentences (max 2)`);

console.log(`Checked ${pages.length} pages.`);
warns.forEach(w => console.log('WARN  ' + w));
errors.forEach(e => console.log('ERROR ' + e));
if (errors.length) { console.log(`\n${errors.length} error(s).`); process.exit(1); }
console.log('\nSEO check passed.');
