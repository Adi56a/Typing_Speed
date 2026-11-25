# CheckTypingSpeeds.com — SEO Fix Plan for the Coding Agent

**Stack:** React + Vite, prerendered static HTML (hydrated with `hydrateRoot`), served behind Cloudflare.
**Live site:** https://checktypingspeeds.com
**Audit date:** 2026-11-26

---

## 🤖 INSTRUCTIONS FOR THE AGENT — READ THIS FIRST

You are fixing SEO issues on a React + Vite website. The issues below are **ranked by how much each one blocks Google/Bing rankings**: Issue 1 is the most damaging. Follow these rules exactly:

1. **Do Step 0 first.** It finds how this repo works (prerender method, head/meta handling, hosting). Every later issue depends on what you find there.
2. **Work on ONE issue at a time, in number order.** Do not start the next issue until the current one passes all of its "✅ Done when" checks.
3. **After each issue:** run `npm run build`, then `npm run seo:check` (created in Step 0). Then STOP and report to the user:
   - the issue number and title
   - files changed (list)
   - the output of the checks
   - anything you could not do, and why
   Wait for the user to say "next" before continuing.
4. **Never invent facts** (exam rules, statistics, author names, ratings). Where the plan says `<<ASK USER>>`, stop and ask.
5. **Do not delete or rename any existing URL** unless the issue says so. URLs are ranking assets.
6. **Keep the site working.** The typing test must still work after every change. Test it in the dev server (`npm run dev`) and the production preview (`npm run build && npm run preview`).
7. **Every SEO value (title, meta, H1, schema) must exist in the prerendered HTML** in `dist/`, not only after JavaScript runs. Always verify by reading the built `.html` files in `dist/`.
8. Make small, focused commits, one per issue: `seo(issue-N): <short title>`.

---

## STEP 0 — Inspect the repo and add the SEO check script (do this before Issue 1)

### 0.1 Find out how the project works and report it
Inspect the repo and answer each question before changing anything:

| Question | Where to look |
|---|---|
| How are pages prerendered to static HTML? | `vite.config.*` plugins (e.g. `vite-plugin-prerender`, `vite-react-ssg`, `vite-plugin-ssr`/`vike`, `react-snap`), `package.json` scripts, any `prerender*.{js,ts,mjs}` / `entry-server.*` file |
| Where is the list of prerendered routes? | Prerender config, router file (`src/main.tsx`, `src/App.tsx`, `src/routes*`) |
| How are `<title>`, meta, canonical and JSON-LD set per page? | `react-helmet-async`, `react-helmet`, a custom `<Seo>`/`<Head>` component, or string replacement in the prerender script |
| Where is `sitemap.xml` produced? | `public/sitemap.xml` (static) or a build script |
| Where is the site hosted? | `wrangler.toml` / `public/_redirects` / `public/_headers` ⇒ **Cloudflare Pages**; `vercel.json` ⇒ **Vercel**; `netlify.toml` ⇒ **Netlify** |
| Where are the fonts loaded? | `index.html` (currently Google Fonts `<link>`) |

Write the answers into a new file `SEO_NOTES.md` at the repo root. Later issues refer to it as "the prerender route list", "the head component", and "the hosting config".

### 0.2 Create one central SEO config
Create `src/seo/routes.ts`. It becomes the **single source of truth** for every page's SEO data. The head component, the prerender route list and the sitemap generator must all read from it.

```ts
// src/seo/routes.ts
export const SITE_URL = 'https://checktypingspeeds.com';
export const SITE_NAME = 'CheckTypingSpeeds';

export type PageKind = 'tool' | 'article' | 'hub' | 'legal' | 'about' | 'contact';

export interface FaqItem { q: string; a: string }

export interface SeoRoute {
  path: string;            // always with trailing slash, e.g. '/typing-test/3-minute/'
  kind: PageKind;
  title: string;           // 50–62 characters
  description: string;     // 120–158 characters
  h1: string;
  breadcrumb: string;      // short name used in BreadcrumbList
  faqs?: FaqItem[];        // must also be rendered visibly on the page
  inSitemap?: boolean;     // default true
  noindex?: boolean;       // default false
  ogImage?: string;        // default `/og/<slug>.png` (Issue 12)
  datePublished?: string;  // articles only, YYYY-MM-DD
}

export const routes: SeoRoute[] = [
  // filled in during Issue 2
];

export const getRoute = (path: string) => routes.find(r => r.path === path);
```

Refactor the existing head component so that every page gets `title`, `description`, canonical (`SITE_URL + path`), og:* and twitter:* tags from `getRoute(path)`. **Do not change any copy yet.** Move the current values into `routes.ts` exactly as they are; Issue 2 rewrites them.

### 0.3 Add the SEO check script
Install the parser: `npm i -D node-html-parser`

Create `scripts/seo-check.mjs`:

```js
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
```

Add to `package.json` scripts: `"seo:check": "node scripts/seo-check.mjs"`

> If the shared header/footer or the test widget's sample text is not inside `<header>`/`<footer>`/`<nav>`, wrap the page's unique content in `<main>` so the duplicate check only measures page content.

### ✅ Step 0 is done when
- [x] `SEO_NOTES.md` exists and answers every question in 0.1
- [x] `src/seo/routes.ts` holds every existing page, and all head tags come from it
- [x] `npm run build && npm run seo:check` runs. It is **expected to FAIL** right now, with a duplicate-content error between `/typing-speed-test/` and `/typing-test/1-minute/`. Paste the full output to the user.

---

## ISSUE 1 — Duplicate page `/typing-speed-test/` competes with the homepage and the 1-minute page
**Priority:** 🔴 Critical · **Effort:** 30 min

**Problem:** `/typing-speed-test/` shares 10 of its 11 body sentences with `/typing-test/1-minute/`, and one of its headings literally says "Why Take a 1-Minute Typing Test?". The homepage also targets "typing speed test". Google sees three URLs for one query and ranks none of them well.

**Fix:** merge `/typing-speed-test/` into the homepage with a permanent 301 redirect.

### Steps
1. Add a 301 redirect in the hosting config identified in Step 0:
   - **Cloudflare Pages:** create or append to `public/_redirects`:
     ```
     /typing-speed-test/   /   301
     /typing-speed-test    /   301
     ```
   - **Vercel:** in `vercel.json`:
     ```json
     { "redirects": [ { "source": "/typing-speed-test/:path*", "destination": "/", "permanent": true },
                      { "source": "/typing-speed-test", "destination": "/", "permanent": true } ] }
     ```
   - **Netlify:** same lines as Cloudflare in `public/_redirects`.
2. Remove `/typing-speed-test/` from the prerender route list, the React router, and `src/seo/routes.ts`. Delete its page component if nothing else uses it.
3. Search the whole `src/` folder for `typing-speed-test` and change every internal link to `/`. This includes the nav item "Speed Test", the footer, in-content links and any breadcrumb.
4. If any unique paragraph on that page is worth keeping, move it to the homepage. Do not copy text that already exists on the 1-minute page.

### ✅ Done when
- [x] `grep -r "typing-speed-test" src/` returns nothing
- [x] `dist/typing-speed-test/` does not exist after the build
- [x] `npm run seo:check` shows no duplicate-content error for that pair
- [ ] After deploy: `curl -sI https://checktypingspeeds.com/typing-speed-test/` shows `301` and `location: https://checktypingspeeds.com/`

---

## ISSUE 2 — Titles, meta descriptions and H1s target the brand name instead of what people search
**Priority:** 🔴 Critical · **Effort:** 1–2 h

**Problem:** every title and meta is built around "Check Typing Speed(s)", which is the brand. People actually search "typing test", "typing speed test", "1 minute typing test", "average typing speed" and similar. The homepage H1 "Check Typing Speeds Online Free" matches no real search.

**Fix:** replace the copy below **exactly**, in `src/seo/routes.ts` and in each page's visible `<h1>`. The H1 in the JSX must equal `route.h1`.

| Path | title | description | h1 |
|---|---|---|---|
| `/` | Typing Test – Free Typing Speed Test (WPM) \| CheckTypingSpeeds | Take a free typing test and check your typing speed in WPM and accuracy. 30-second, 1, 3, 5 and 10-minute tests. No sign-up, no ads. | Typing Speed Test |
| `/typing-test/1-minute/` | 1 Minute Typing Test – Check Your WPM in 60 Seconds | Free 1-minute typing test. Type for 60 seconds and get your WPM, accuracy and error count instantly. No login required. | 1 Minute Typing Test |
| `/typing-test/2-minute/` | 2 Minute Typing Test – Free WPM Speed Check | Free 2-minute typing test. Measure your words per minute and accuracy over two minutes with instant results and no sign-up. | 2 Minute Typing Test |
| `/typing-test/5-minute/` | 5 Minute Typing Test – Net WPM & Accuracy (Free) | Free 5-minute typing test used for job and exam prep. Measures net WPM, accuracy and errors over a full five minutes. | 5 Minute Typing Test |
| `/typing-test/10-minute/` | 10 Minute Typing Test – Endurance WPM Test | Free 10-minute typing test to measure sustained typing speed and accuracy, ideal for SSC CHSL and long data-entry tests. | 10 Minute Typing Test |
| `/ssc-typing-test/` | SSC Typing Test Online – CGL DEST & CHSL Practice (Free) | Free SSC typing test simulator for CGL DEST and CHSL with official full/half mistake rules, KDPH score and net WPM. Practice online. | SSC Typing Test – CGL & CHSL Practice |
| `/typing-speed-chart/` | Average Typing Speed (WPM) by Age & Job – Typing Speed Chart | The average typing speed is about 40 WPM. See WPM benchmarks by age, job and percentile, and find out what a good typing speed is. | Average Typing Speed & WPM Chart |
| `/how-wpm-is-calculated/` | How Is WPM Calculated? Gross vs Net WPM Formula | Learn exactly how WPM is calculated: the 5-character word rule, gross vs net WPM, error penalties and a worked example. | How WPM Is Calculated (Formula + Example) |
| `/wpm-calculator/` | WPM Calculator – Words Per Minute, CPM & Net WPM | Free WPM calculator. Enter characters typed, time and errors to get gross WPM, net WPM and CPM. Includes a KDPH to WPM converter. | WPM Calculator |
| `/typing-practice/` | Typing Practice – Free Drills for Home Row, Numbers & Symbols | Free typing practice drills for the home row, top and bottom rows, common letter pairs, numbers and punctuation. Build speed and accuracy. | Typing Practice Drills |
| `/typing-lessons/` | Free Typing Lessons – Learn Touch Typing Step by Step | Learn touch typing with 10 free step-by-step typing lessons. Correct finger placement, home row keys and drills to type without looking. | Free Typing Lessons |
| `/typing-games/` | Free Typing Games – Improve Your WPM While You Play | Play free typing games that build speed and accuracy. Type falling words before they land and beat your high score. No download. | Typing Games |
| `/touch-typing/` | Touch Typing – How to Type Without Looking (Guide) | Learn how to touch type: finger placement, home row position, posture and a practice plan to type faster without looking at the keyboard. | How to Touch Type |

Keep `/about/`, `/methodology/`, `/contact/`, `/privacy/` and `/terms/` as they are, but make sure each has a unique title and description.

### Also change on the page
1. **Homepage hero:** under the H1, use exactly one short line: `Free typing test — start typing below to measure your WPM and accuracy. No sign-up, no ads.`
2. **Homepage hero badge:** replace `ANSI Standard 5-Char Norm • Monotonic Timer • 100% Client-Side Privacy` with `No sign-up · No ads · Results in 60 seconds`.
3. **Homepage H2s,** in this order (keep the existing content under the closest-matching H2, and rewrite the wording to match):
   - `What Is a Good Typing Speed? (WPM Chart)` ← old "Global Typing Speed Percentiles"
   - `Typing Test by Duration: 30 Sec, 1, 3, 5 & 10 Minutes` ← old "Choose Your Test Duration & Mode"
   - `Typing Tests for Jobs & Government Exams` ← old "Government & Recruitment Benchmarks"
   - `How Is WPM Calculated?` ← old "Typing Engine Specifications & Standards"
   - `Typing Test FAQ` ← old "Frequently Asked Questions & Methodology"
4. **On `/typing-games/`:** rename H2 `Word Cascade: Kinetic Defense` to `Word Cascade Typing Game`.
5. **Replace jargon sitewide** with plain words people search for:
   - "monotonic timer" → "accurate timer"
   - "deterministic scoring" → "instant, consistent scoring"
   - "Tactile Anchor Keys" → "Home Row Keys (F and J)"
   - "kinetic defense" → (remove)
6. Make sure og:title, og:description, twitter:title and twitter:description all come from the same route values.

### ✅ Done when
- [x] For every row above, `dist/<path>/index.html` contains the exact title, description and a single `<h1>` with the exact text
- [x] `npm run seo:check` shows no title or description length warnings for these pages
- [x] The typing test still works on the homepage

---

## ISSUE 3 — High-demand pages are missing: 3-minute and 30-second tests return 404
**Priority:** 🔴 Critical · **Effort:** 2–3 h

**Problem:** "3 minute typing test" is one of the highest-volume duration searches (it's the length employers use), and `/typing-test/3-minute/` returns 404. `/typing-test/30-second/` is also missing. The existing duration pages share one template with near-identical text.

### Steps
1. Find the component used by `/typing-test/1-minute/` etc. Refactor it so **all copy comes from a data file**, not shared JSX paragraphs. Create `src/data/durationPages.ts`:
   ```ts
   export interface DurationPage {
     path: string;           // '/typing-test/3-minute/'
     seconds: number;        // 180
     label: string;          // '3 Minute'
     directAnswer: string;   // 40–60 words, unique
     whoUsesIt: string;      // 80–150 words, unique
     scoreNotes: string;     // 60–120 words: how scores behave at this length
     faqs: { q: string; a: string }[]; // 3–4, unique per page
   }
   ```
2. Add two new entries: `/typing-test/3-minute/` (180 s) and `/typing-test/30-second/` (30 s). Also move the 1, 2, 5 and 10-minute pages onto this data file, and **rewrite their text so that no two pages share more than 2 sentences.**
3. Each duration page must render in this order:
   1. `<h1>` (from routes.ts)
   2. **The typing test widget, preset to that duration** (directly under the H1, before any paragraph)
   3. `<h2>What Is a Good {label} Typing Score?</h2>` + `directAnswer` + this table:

      | Level | WPM |
      |---|---|
      | Beginner | under 30 |
      | Average | 35–45 |
      | Good | 50–65 |
      | Fast | 70–90 |
      | Professional | 100+ |

      followed by `scoreNotes`
   4. `<h2>Who Uses a {label} Typing Test?</h2>` + `whoUsesIt`
   5. `<h2>Compare Typing Test Lengths</h2>` with links to every other duration, using anchor text like `3 minute typing test`
   6. `<h2>{label} Typing Test FAQ</h2>` + the FAQs (visible)
4. Direction for the unique copy (write it in plain English, without jargon):
   - **30-second:** quick warm-up and fast check; scores run higher because you don't get tired; good for daily tracking.
   - **1-minute:** the most common standard test; quick snapshot of speed.
   - **2-minute:** balance between speed and consistency.
   - **3-minute:** the length many employers and HR screening tests use; balances speed and stamina; the score to put on a CV.
   - **5-minute:** clerical, data-entry and government-exam prep; errors add up over time.
   - **10-minute:** endurance; matches SSC CHSL length; shows how much you slow down when tired.
5. Add routes.ts entries:

   | Path | title | description | h1 |
   |---|---|---|---|
   | `/typing-test/3-minute/` | 3 Minute Typing Test – Free WPM & Accuracy Test | Take a free 3-minute typing test, the length many employers use. Get your net WPM, accuracy and errors instantly. No sign-up. | 3 Minute Typing Test |
   | `/typing-test/30-second/` | 30 Second Typing Test – Quick WPM Check | Check your typing speed in just 30 seconds. Get your WPM and accuracy instantly with this free quick typing test. No sign-up needed. | 30 Second Typing Test |

6. Add both new pages to: the prerender route list, the router, the duration pills in the test widget (add `3m` between `2m` and `5m`; `30s` already exists), the homepage "Typing Test by Duration" section, the footer "Timed Tests" list, and the header nav if it lists durations.

### ✅ Done when
- [ ] `dist/typing-test/3-minute/index.html` and `dist/typing-test/30-second/index.html` exist, with the correct title and H1 in the raw HTML
- [ ] The widget on each page starts preset to the right duration
- [ ] `npm run seo:check` shows **zero duplicate-content errors** between any duration pages
- [ ] Every duration page links to every other duration page

---

## ISSUE 4 — Schema markup is messy and partly wrong
**Priority:** 🟠 High · **Effort:** 2 h

**Problem:**
- The homepage `WebApplication.name` is a stuffed 90-character string.
- Every page repeats the full WebSite + Organization blocks.
- Article pages are marked up as `WebApplication`.
- Nothing connects the blocks with `@id`.

### Steps
1. Create `src/seo/jsonld.ts` with a function `buildJsonLd(route: SeoRoute): object` that returns ONE `@graph`, built from these rules:

```ts
import { SITE_URL, SITE_NAME, type SeoRoute } from './routes';

const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const website = {
  '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE_URL}/`, name: SITE_NAME,
  alternateName: ['Check Typing Speeds', 'CheckTypingSpeeds.com'],
  publisher: { '@id': ORG_ID }, inLanguage: 'en',
};
const org = {
  '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon-512x512.png`, width: 512, height: 512 },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: `${SITE_URL}/contact/` },
};

export function buildJsonLd(r: SeoRoute) {
  const url = SITE_URL + r.path;
  const graph: object[] = [];
  if (r.path === '/') graph.push(website, org); // full entities only on the homepage

  graph.push({
    '@type': r.kind === 'about' ? 'AboutPage' : r.kind === 'contact' ? 'ContactPage' : 'WebPage',
    '@id': `${url}#webpage`, url, name: r.title.split(' | ')[0],
    description: r.description, isPartOf: { '@id': WEBSITE_ID },
    dateModified: BUILD_DATE, inLanguage: 'en',
  });

  if (r.kind === 'tool' || r.path === '/') {
    graph.push({
      '@type': 'WebApplication', '@id': `${url}#app`,
      name: r.h1, url, applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any', browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': ORG_ID },
    });
  }

  if (r.kind === 'article') {
    graph.push({
      '@type': 'Article', '@id': `${url}#article`, headline: r.h1,
      datePublished: r.datePublished ?? '2026-11-21', dateModified: BUILD_DATE,
      author: { '@type': 'Person', name: '<<ASK USER: real author name>>', url: `${SITE_URL}/about/` },
      publisher: { '@id': ORG_ID }, mainEntityOfPage: { '@id': `${url}#webpage` },
      image: `${SITE_URL}${r.ogImage ?? '/logo.webp'}`,
    });
  }

  if (r.path !== '/') {
    const parts = r.path.split('/').filter(Boolean);
    const items = [{ name: 'Home', item: `${SITE_URL}/` }];
    if (parts[0] === 'typing-test' && parts.length > 1) items.push({ name: 'Typing Tests', item: `${SITE_URL}/typing-test/` });
    items.push({ name: r.breadcrumb, item: url });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, ...it })),
    });
  }

  if (r.faqs?.length) {
    graph.push({
      '@type': 'FAQPage', '@id': `${url}#faq`,
      mainEntity: r.faqs.map(f => ({ '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
```

2. In the head component, **remove all old JSON-LD** and output exactly one `<script type="application/ld+json">{JSON.stringify(buildJsonLd(route))}</script>` per page.
3. Set `kind` in routes.ts:
   - `tool`: all `/typing-test/*`, `/ssc-typing-test/`, `/wpm-calculator/`, `/typing-games/`, `/typing-practice/`, `/typing-lessons/`
   - `article`: `/how-wpm-is-calculated/`, `/touch-typing/`, `/typing-speed-chart/`, `/methodology/`
   - `about`: `/about/` · `contact`: `/contact/` · `legal`: `/privacy/`, `/terms/`
4. **Article author:** stop and ask the user for a real author name and a one-line bio. Then add a visible byline under the H1 of article pages: `By <Name> · Updated <Month D, YYYY>`. Add an author bio box on `/about/`.
5. **Homepage FAQs:** put these 4 in `routes.ts` for `/`, and render them visibly, word for word, in the homepage FAQ section. Keep existing FAQ items that aren't duplicates.
   - **What is a good typing speed?** — The average typing speed is about 40 words per minute (WPM). 50–65 WPM is good, 70–90 WPM is fast, and 100+ WPM is professional level. Most office jobs ask for 40–50 WPM with at least 95% accuracy.
   - **How is typing speed (WPM) calculated?** — One word is counted as 5 characters including spaces. Gross WPM = (characters typed ÷ 5) ÷ minutes. Net WPM subtracts uncorrected errors per minute from gross WPM.
   - **How long is a typing test?** — Most typing tests last 1 minute. Employers commonly use 3 or 5-minute tests, and SSC exams use 10 or 15 minutes. CheckTypingSpeeds offers 30-second, 1, 2, 3, 5 and 10-minute tests.
   - **Is this typing test free?** — Yes. The typing test is 100% free, needs no account, shows no ads and runs entirely in your browser.
6. **Rules:**
   - Never add `aggregateRating` or `review` (no real ratings exist).
   - FAQ JSON-LD text must match the visible FAQ text exactly.
   - Remove the gmail address from schema (the contact page URL is enough).

### ✅ Done when
- [ ] Every built page has exactly 1 JSON-LD script, and `npm run seo:check` reports no invalid JSON-LD
- [ ] Paste the homepage and `/typing-test/3-minute/` JSON-LD into https://validator.schema.org (have the user do it if you can't browse) with 0 errors
- [ ] Google Rich Results Test on `/` shows no errors (have the user run it)

---

## ISSUE 5 — Sitemap is hand-written, with fake dates and missing pages
**Priority:** 🟠 High · **Effort:** 1 h

**Problem:** `public/sitemap.xml` lists 19 URLs. All share the same `lastmod` and the same priority, it will miss every new page, and it would still list `/typing-speed-test/` (now redirected).

### Steps
1. Delete `public/sitemap.xml`.
2. Create `scripts/generate-sitemap.mjs`. It runs after the build and writes `dist/sitemap.xml` from `src/seo/routes.ts`.
   - Because `routes.ts` is TypeScript, either export the route list as JSON at build time (e.g. `src/seo/routes.json` imported by routes.ts), or run the script with `npx tsx`. Pick whichever matches the repo; prefer `tsx`: `npm i -D tsx`.
   ```js
   // scripts/generate-sitemap.mjs  (run with: npx tsx scripts/generate-sitemap.mjs)
   import fs from 'node:fs';
   import { execSync } from 'node:child_process';
   import { routes, SITE_URL } from '../src/seo/routes.ts';

   const lastmodFor = (r) => {
     // last git commit date of the page's source; fallback to today
     try {
       const file = r.sourceFile; // optional field: add `sourceFile` to SeoRoute if you can map it
       if (file) return execSync(`git log -1 --format=%cs -- "${file}"`).toString().trim() || today();
     } catch {}
     return today();
   };
   const today = () => new Date().toISOString().slice(0, 10);

   const urls = routes
     .filter(r => r.inSitemap !== false && !r.noindex && r.kind !== 'legal')
     .map(r => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmodFor(r)}</lastmod>\n  </url>`)
     .join('\n');

   fs.writeFileSync('dist/sitemap.xml',
     `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
   console.log('sitemap.xml written');
   ```
   - No `<priority>` and no `<changefreq>` (Google ignores them).
   - `/privacy/` and `/terms/` stay indexable but are left out of the sitemap.
3. Update `package.json`: `"build": "<existing build command> && npx tsx scripts/generate-sitemap.mjs"`
4. Simplify `public/robots.txt` to:
   ```
   User-agent: *
   Allow: /

   Sitemap: https://checktypingspeeds.com/sitemap.xml
   ```

### ✅ Done when
- [ ] `dist/sitemap.xml` contains every indexable route (including `/typing-test/3-minute/` and `/typing-test/30-second/`) and does NOT contain `/typing-speed-test/`, `/privacy/` or `/terms/`
- [ ] The file is valid XML (open it in a browser or run `xmllint --noout dist/sitemap.xml`)

---

## ISSUE 6 — No IndexNow, so Bing finds changes days late
**Priority:** 🟠 High · **Effort:** 30 min

**Problem:** Bing, Yandex, Seznam and Naver use IndexNow to discover changed pages within minutes. The site has no key file and never pings it.

### Steps
1. Generate a key: `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"` (32 hex characters).
2. Create `public/<KEY>.txt` whose only content is `<KEY>` (no newline, no spaces).
3. Add `INDEXNOW_KEY=<KEY>` to `.env` (not committed) and to the deploy environment. The key is public by design, so it's fine that it also appears in `public/`.
4. Create `scripts/indexnow.mjs`:
   ```js
   // scripts/indexnow.mjs — run AFTER the deploy is live
   import fs from 'node:fs';
   const KEY = process.env.INDEXNOW_KEY;
   if (!KEY) { console.error('INDEXNOW_KEY missing'); process.exit(1); }
   const xml = fs.readFileSync('dist/sitemap.xml', 'utf8');
   const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
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
   ```
5. Add `"indexnow": "node --env-file=.env scripts/indexnow.mjs"` to package.json. Tell the user to run `npm run indexnow` **after every deploy**, or add it as a post-deploy step in CI.
6. Tell the user to also do this manually in Cloudflare: **Dashboard → Caching → Configuration → Crawler Hints → On**.

### ✅ Done when
- [ ] After deploy, `https://checktypingspeeds.com/<KEY>.txt` returns the key
- [ ] `npm run indexnow` prints status 200 or 202

---

## ISSUE 7 — HTML is not cached at Cloudflare's edge (slow server response, 0.4–0.95 s)
**Priority:** 🟠 High · **Effort:** 30 min (+ a manual Cloudflare step)

**Problem:** HTML responses come back with `cf-cache-status: DYNAMIC` and `Cache-Control: public, max-age=0, must-revalidate`. Every visit waits on the origin. Hashed assets in `/assets/` are already correctly `immutable`.

### Steps
1. **Cloudflare Pages:** create or extend `public/_headers`:
   ```
   /*
     Cache-Control: public, max-age=0, s-maxage=86400, stale-while-revalidate=604800
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin

   /assets/*
     Cache-Control: public, max-age=31536000, immutable

   /fonts/*
     Cache-Control: public, max-age=31536000, immutable
   ```
   **Vercel:** add the same values as `headers` entries in `vercel.json`.
   Keep the existing `X-Frame-Options: SAMEORIGIN` if it's set somewhere.
2. Tell the user to do this **manual Cloudflare step** (the agent can't do it):
   Cloudflare Dashboard → checktypingspeeds.com → **Caching → Cache Rules → Create rule**
   - Name: `Cache prerendered HTML`
   - If: Hostname equals `checktypingspeeds.com`
   - Then: **Eligible for cache** · Edge TTL: **Use cache-control header if present** · Browser TTL: **Respect origin**
   - Save. After every deploy, **Caching → Configuration → Purge Everything** (Cloudflare Pages on the same zone purges automatically).

### ✅ Done when
- [ ] After deploy and the Cache Rule, a second request shows `cf-cache-status: HIT`:
  `curl -sI https://checktypingspeeds.com/ | grep -i cf-cache-status`

---

## ISSUE 8 — Fonts load from Google and delay the typing box (Largest Contentful Paint)
**Priority:** 🟠 High · **Effort:** 1 h

**Problem:** the biggest element on screen at load (LCP) is the monospace word box. It waits for JetBrains Mono from fonts.gstatic.com through a render-blocking Google Fonts stylesheet, then repaints when the font swaps in. Seven font weights are loaded.

### Steps
1. `npm i -D @fontsource/jetbrains-mono @fontsource-variable/inter`
2. Copy these files into `public/fonts/` (create the folder):
   - `node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2`
   - `node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2`
   - `node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2`

   (If the file names differ in the installed version, list the folder and use the latin 400/500 normal files.) After that, remove the two packages again if nothing imports them.
3. In `index.html`, **delete** the Google Fonts `<link rel="stylesheet" ...fonts.googleapis.com...>` and both `preconnect` links to fonts.googleapis.com and fonts.gstatic.com.
4. In `index.html` `<head>`, before any CSS, add:
   ```html
   <link rel="preload" href="/fonts/jetbrains-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
   ```
5. In the global CSS (e.g. `src/index.css`), at the top:
   ```css
   @font-face {
     font-family: 'Inter';
     src: url('/fonts/inter-latin-wght-normal.woff2') format('woff2');
     font-weight: 100 900; font-style: normal; font-display: swap;
   }
   @font-face {
     font-family: 'JetBrains Mono';
     src: url('/fonts/jetbrains-mono-latin-400-normal.woff2') format('woff2');
     font-weight: 400; font-style: normal; font-display: swap;
   }
   @font-face {
     font-family: 'JetBrains Mono';
     src: url('/fonts/jetbrains-mono-latin-500-normal.woff2') format('woff2');
     font-weight: 500; font-style: normal; font-display: swap;
   }
   /* metric-matched fallback so the word box doesn't jump/repaint when the font arrives */
   @font-face {
     font-family: 'JBM Fallback';
     src: local('Courier New'), local('Courier');
     size-adjust: 100%; ascent-override: 102%; descent-override: 30%; line-gap-override: 0%;
   }
   ```
6. Update the Tailwind config (`tailwind.config.*` → `theme.extend.fontFamily`):
   ```js
   fontFamily: {
     sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
     mono: ['"JetBrains Mono"', '"JBM Fallback"', 'ui-monospace', 'monospace'],
   }
   ```
   Remove any usage of the 600 weight of JetBrains Mono (replace it with 500).

### ✅ Done when
- [ ] `grep -ri "fonts.googleapis\|fonts.gstatic" index.html src/` returns nothing
- [ ] In `npm run preview`, the DevTools Network tab shows fonts loading from `/fonts/` and no request to Google
- [ ] Ask the user to run Lighthouse mobile and paste LCP, TBT and CLS:
  `npx lighthouse https://checktypingspeeds.com/ --preset=perf --form-factor=mobile --view`
  Targets: **LCP < 2.5 s, TBT < 200 ms, CLS < 0.1**

---

## ISSUE 9 — One 407 KB JavaScript bundle loads on every page
**Priority:** 🟡 Medium-High · **Effort:** 1–2 h

**Problem:** `assets/index-*.js` is 407 KB raw (106 KB brotli) and contains the games, lessons, calculator and SSC simulator, even on the plain test page. That slows hydration and responsiveness to typing input (INP) on mobile.

### Steps
1. In the router, lazy-load every route except the homepage and the duration pages:
   ```tsx
   import { lazy, Suspense } from 'react';
   const TypingGames   = lazy(() => import('./pages/TypingGames'));
   const TypingLessons = lazy(() => import('./pages/TypingLessons'));
   const TypingPractice= lazy(() => import('./pages/TypingPractice'));
   const WpmCalculator = lazy(() => import('./pages/WpmCalculator'));
   const SscTypingTest = lazy(() => import('./pages/SscTypingTest'));
   // wrap routes: <Suspense fallback={null}>...</Suspense>
   ```
   ⚠️ **Prerender/hydration safety:** the lazy chunk must be loaded before `hydrateRoot` on those pages, or React throws a hydration mismatch. Use the pattern your prerender tool supports. For example, in `vite-react-ssg`, use its built-in `lazy` route option; with a custom setup, `await` the matched route's `import()` in `main.tsx` before calling `hydrateRoot`. Check the browser console for hydration errors on every lazy page.
2. In `vite.config.ts`:
   ```ts
   build: {
     rollupOptions: { output: { manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] } } },
     target: 'es2020',
   }
   ```
   (Leave out `react-router-dom` if the project doesn't use it.)
3. Remove unused dependencies and large icon imports. Import icons individually, never the whole library.

### ✅ Done when
- [ ] JS loaded on `/` is **≤ 70 KB brotli** in total (check the DevTools Network tab with "Big request rows", or `npx vite-bundle-visualizer`)
- [ ] No hydration errors in the console on any page in `npm run preview`
- [ ] All pages still work

---

## ISSUE 10 — The typing test starts below the fold on mobile
**Priority:** 🟡 Medium-High · **Effort:** 1–2 h

**Problem:** on a 375×812 phone, the word box starts about 650 px down. The badge, H1, paragraph, 3 rows of settings and 4 stat tiles all sit above it. Desktop (1366×768): the input sits at about 500 px. Visitors who don't see the test right away leave, which is a bad engagement signal.

### Steps
1. Add `data-test-box` to the word box container.
2. On every page with the test, use this order: **H1 (1 line) → word box → duration pills → stats row → other settings → page copy.**
3. On mobile (`<640px`):
   - hide the hero badge
   - limit the intro to one line or move it below the test
   - show the duration pills (`15s 30s 1m 2m 3m 5m 10m`) as one horizontally scrollable row
   - move Words/Statements and Easy/Medium/Hard plus Punctuation/Numbers into a "⚙ Settings" button that opens a popover or bottom sheet
   - turn the 4 stat tiles into one compact row: `60s · 0 WPM · 100% · 0 err`
4. On desktop, autofocus the hidden input on load (`if (window.matchMedia('(pointer:fine)').matches) input.focus()`). Do not autofocus on touch devices.
5. Make sure the layout doesn't shift when the stats update (fixed widths and `tabular-nums` on numbers).

### ✅ Done when
- [ ] At 375×812: `document.querySelector('[data-test-box]').getBoundingClientRect().top < 320`
- [ ] At 1366×768: the same value is `< 300`
- [ ] Lighthouse CLS stays < 0.1

---

## ISSUE 11 — Pages lack short "direct answer" paragraphs (Bing, Google snippets, AI search)
**Priority:** 🟡 Medium · **Effort:** 2–3 h

**Problem:** search engines and AI answers pull short, clear answers. Only `/how-wpm-is-calculated/` has one. `/typing-speed-chart/` should own the big query "average typing speed", but it has only 637 words.

### Steps
1. Add a 40–60 word **direct answer paragraph** as the first text under the first H2 of every indexable page. It should answer the page's main question in plain words, with real numbers. Examples:
   - `/typing-speed-chart/` → H2 "What Is the Average Typing Speed?" → "The average typing speed is about 40 words per minute (WPM)…" and so on.
   - `/wpm-calculator/` → H2 "How Do You Calculate WPM?" → formula in one sentence plus an example.
   - `/typing-lessons/` → H2 "How Long Does It Take to Learn Touch Typing?"
   - `/ssc-typing-test/` → H2 "What Is the SSC Typing Test Speed Requirement?"
2. Expand `/typing-speed-chart/` to at least 1,200 words with these H2s:
   1. What Is the Average Typing Speed? (direct answer)
   2. What Is a Good Typing Speed? (Beginner → Professional table)
   3. Average Typing Speed by Age (table)
   4. Typing Speed Requirements by Job (table: data entry, admin assistant, transcriptionist, programmer, legal secretary, court stenographer, customer support)
   5. Typing Speed Percentiles (table)
   6. How to Improve Your Typing Speed (5 numbered steps, linking to `/typing-lessons/` and `/typing-practice/`)
   7. FAQ (4 questions, visible + schema)

   ⚠️ Every number must have a source. Use the site's existing figures and cite where they come from. If the source of a statistic isn't known, **ask the user** before publishing it. Do not invent statistics.
3. Add contextual internal links: every guide page links to at least 2 test pages with descriptive anchor text (e.g. "take a 3 minute typing test"), and every test page links to `/typing-speed-chart/` with anchor "average typing speed".

### ✅ Done when
- [ ] Every indexable page has a direct answer paragraph of 40–60 words under its first H2
- [ ] `/typing-speed-chart/` has ≥ 1,200 words and passes `seo:check`

---

## ISSUE 12 — Every page shares the same WebP logo as its social preview image
**Priority:** 🟡 Medium · **Effort:** 1–2 h

**Problem:** og:image is `logo.webp` (103 KB) on every page. Some platforms don't render WebP previews, and shared links all look identical.

### Steps
1. `npm i -D satori @resvg/resvg-js`
2. Create `scripts/generate-og.mjs`. For each route in `routes.ts`, render a 1200×630 PNG to `dist/og/<slug>.png` (homepage → `dist/og/home.png`; slug = path without slashes, `/` replaced by `-`). Layout: dark background in the site's brand colours, the H1 in large text, "CheckTypingSpeeds.com" small at the bottom. Load the Inter font from `public/fonts/` for satori.
3. Set `ogImage` for each route to `/og/<slug>.png`, and output `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:type=image/png` and `twitter:image` from it.
4. Run it in the build after the sitemap: `&& node scripts/generate-og.mjs`

### ✅ Done when
- [ ] `dist/og/` contains one PNG per route, each < 120 KB
- [ ] `og:image` on every page points to its own PNG

---

## ISSUE 13 — No pages for high-intent long-tail searches (exams, jobs, 10-key, Hindi)
**Priority:** 🟢 Growth (biggest traffic multiplier) · **Effort:** 1–2 weeks, in waves

**Problem:** competitors rank with one page per exam, job type and test type. The site has a single SSC page and no pages for 10-key, data entry, jobs or Hindi.

### Steps
1. Create `src/data/testPages.ts` with the interface below, and ONE page component `src/pages/TestLanding.tsx` that renders any config. Register every config in routes.ts, the prerender list and the router automatically (map over the array).
   ```ts
   export interface TestLanding {
     slug: string;                 // 'ssc-cgl' -> /typing-test/ssc-cgl/
     title: string; description: string; h1: string; breadcrumb: string;
     preset: {
       durationSec: number;
       mode: 'words' | 'paragraph' | 'numbers' | 'numpad' | 'code' | 'hindi';
       difficulty?: 'easy' | 'medium' | 'hard';
       scoring?: 'standard' | 'ssc-cgl' | 'ssc-chsl' | 'kdph' | 'kph';
     };
     directAnswer: string;         // 40–60 words
     rulesTable?: { label: string; value: string }[];
     officialSource?: { label: string; url: string };   // required for exam pages
     sections: { h2: string; body: string }[];          // total >= 600 unique words
     faqs: { q: string; a: string }[];                  // 3–5
     related: string[];            // 3–6 slugs
   }
   ```
2. Page layout: H1 → **test widget with the preset** → H2 + direct answer → rules table (if any) → sections → "Related typing tests" (links) → FAQ.
3. **Wave 1** (build these first, ONE PAGE PER COMMIT, and report after each):

   | slug | h1 | Needs new widget mode? |
   |---|---|---|
   | `ssc-cgl` | SSC CGL Typing Test (DEST) Online | uses existing SSC CGL scoring |
   | `ssc-chsl` | SSC CHSL Typing Test Online | uses existing SSC CHSL scoring |
   | `10-key` | 10 Key Typing Test (Numeric Keypad) | **yes**: `numpad` mode — digits only, scores KPH (keystrokes per hour) |
   | `data-entry` | Data Entry Typing Test | **yes**: mixed text + numbers + names/addresses-style lines |
   | `for-jobs` | Typing Test for Jobs | no: 3-minute paragraph test |
   | `hindi` | Hindi Typing Test (Mangal – InScript & Remington Gail) | **yes**: Hindi text + layout choice. Build last in Wave 1 |

   **Exam pages:** the rules table must list duration, passage length, required speed (WPM and KDPH), allowed errors by category, and a link to the official SSC notice. **Do not guess exam rules.** Pull them from the existing `/ssc-typing-test/` page (which the user already verified), and ask the user to confirm anything not already on the site.

4. Turn `/ssc-typing-test/` (keep this URL, do NOT redirect it) into a hub: H1 "SSC & Government Typing Tests". It keeps its simulator, and adds cards linking to `/typing-test/ssc-cgl/`, `/typing-test/ssc-chsl/` and later Wave-2 exam pages. Its text must not duplicate the CGL/CHSL pages.
5. Create the hub `/typing-test/` with H1 "All Typing Tests". Group links into: By Duration · Government Exams · Jobs & Data Entry · Languages · Skills. Add "All Tests" to the main nav.
6. **Wave 2** (after the user confirms Wave 1 is indexed): `rrb-ntpc`, `high-court`, `cpct`, `dsssb`, `ibps-clerk`, `krutidev`, `paragraph`, `numbers`, `punctuation`, `for-kids`, `for-beginners`, `coding`, `python`, `javascript`.

### ✅ Done when (per page)
- [ ] Prerendered HTML has a unique title, description and H1, the widget preset works, and the page has ≥ 600 words
- [ ] `npm run seo:check` passes (no duplicates, valid JSON-LD)
- [ ] The page appears in `dist/sitemap.xml` and in the `/typing-test/` hub
- [ ] `npm run indexnow` is run after deploy

---

## ISSUE 14 — Results can't be shared (no social proof, no return visits)
**Priority:** 🟢 Growth · **Effort:** 1 day

**Problem:** the results screen has no shareable link or image. Every share is a free backlink and a free return visit.

### Steps
1. On the results screen, add a **"Share my score"** button. It builds `https://checktypingspeeds.com/r/?w={wpm}&a={acc}&d={seconds}`.
   - Mobile: use `navigator.share({ title, text, url })`
   - Desktop: show Copy link, X, LinkedIn and WhatsApp buttons
   - Share text: `I typed {wpm} WPM with {acc}% accuracy on a {N}-minute typing test. Can you beat me?`
2. Create the route `/r/` (prerendered once). On the client it reads the query params, shows "{wpm} WPM · {acc}% accuracy" plus a big **"Beat this score"** button that starts the test, and includes the live test widget.
   - `<meta name="robots" content="noindex, follow">` · canonical → `https://checktypingspeeds.com/`
   - Validate params: wpm must be an integer 0–250, acc 0–100, d one of 15/30/60/120/180/300/600. Otherwise show the plain test.
3. **Dynamic preview image** (requires Cloudflare Pages Functions or Vercel Edge): add `functions/og/result.ts` that returns a 1200×630 PNG with the score, using `workers-og` (Cloudflare) or `@vercel/og` (Vercel). Point the `/r/` page's `og:image` to `/og/result?w=..&a=..&d=..`.
   - Because `/r/` is static, link-preview bots won't run JS. So also add a Pages Function / Edge middleware for `/r/` that injects the per-score `og:title` and `og:image` into the HTML response.
4. Exclude `/r/` from the sitemap.

### ✅ Done when
- [ ] Sharing a result on WhatsApp/X/LinkedIn shows a preview card with the score (test with https://www.opengraph.xyz)
- [ ] `/r/` is noindex and not in the sitemap

---

## ISSUE 15 — No typing certificate (the main way competitors earn backlinks)
**Priority:** 🟢 Authority · **Effort:** 2–4 days · **Only start when the user confirms**

**Problem:** typing certificates that people link from LinkedIn, CVs and school sites are one of the strongest backlink sources in this niche. The site has none.

### Steps (Cloudflare Pages Functions + D1; adapt if hosting differs)
1. Create a D1 database `certs` with this table:
   `certificates(id TEXT PRIMARY KEY, name TEXT, wpm INT, acc INT, duration INT, created TEXT)`
2. `POST /api/cert`: accepts `{name, wpm, acc, duration, keystrokeLog}` and validates:
   - duration ≥ 180 s, accuracy ≥ 90%
   - name 2–40 characters, letters and spaces only
   - **anti-cheat:** reject if the median keystroke interval < 25 ms or WPM > 250
   - rate-limit 5 requests per IP per day

   Store the record, return `{ id }` (10-character random id).
3. `/certificate/` (indexable). Title "Free Typing Certificate – Get a Verified WPM Certificate", H1 "Free Typing Certificate". Explains the rules and includes the 3-minute test, then the name form.
4. `/c/{id}` (Pages Function, server-rendered, `noindex, follow`): a printable certificate with name, WPM, accuracy, duration, date, verification URL and a QR code. Buttons:
   - **Download PDF** (`window.print()` with print CSS)
   - **Add to LinkedIn:** `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Typing%20Speed%20Certificate&organizationName=CheckTypingSpeeds&issueYear=YYYY&issueMonth=M&certUrl=https%3A%2F%2Fchecktypingspeeds.com%2Fc%2F{id}&certId={id}` (build it with `encodeURIComponent`, no spaces or hidden characters)
5. Update `/privacy/` to say that certificates store only the name the user types and the score. The site claims "zero tracking", so the certificate must be opt-in only.
6. Add a "Get your free certificate" call to action on the results screen when duration ≥ 3 min and accuracy ≥ 90%.

### ✅ Done when
- [ ] The full flow works end to end on the preview deployment
- [ ] Faked results (WPM 300, or 0 ms keystrokes) are rejected
- [ ] `/certificate/` is in the sitemap; `/c/*` is noindex

---

## 👤 MANUAL STEPS FOR THE USER (the agent cannot do these)

Do these once Issues 1–6 are deployed:

1. **Google Search Console:** verify the domain property (DNS) if not done. Submit `https://checktypingspeeds.com/sitemap.xml`. Use URL Inspection → **Request indexing** for `/`, `/typing-test/1-minute/`, `/typing-test/3-minute/`, `/ssc-typing-test/`.
2. **Bing Webmaster Tools:** add the site (or "Import from GSC"), submit the sitemap, and check that IndexNow shows received URLs.
3. **Cloudflare:** turn on Crawler Hints (Issue 6) and create the Cache Rule (Issue 7).
4. **After Issue 8:** run Lighthouse mobile and send the LCP, TBT and CLS numbers.
5. **Every deploy:** run `npm run indexnow`.
6. **2 weeks after Issues 1–5:** export GSC → Performance → Queries (top 50) and Pages → "Why pages aren't indexed", to plan the next round.

---

## 📋 Progress tracker (agent: tick each box as you finish)

- [x] Step 0 — Repo inspection, central SEO config, seo-check script
- [x] Issue 1 — Redirect duplicate `/typing-speed-test/`
- [x] Issue 2 — Rewrite titles, metas, H1s, remove jargon
- [ ] Issue 3 — Add 3-minute + 30-second pages, de-duplicate duration pages
- [ ] Issue 4 — Clean JSON-LD schema with @graph
- [ ] Issue 5 — Generated sitemap + clean robots.txt
- [ ] Issue 6 — IndexNow
- [ ] Issue 7 — Edge-cache HTML
- [ ] Issue 8 — Self-host + preload fonts
- [ ] Issue 9 — Code-split JS bundle
- [ ] Issue 10 — Test box above the fold
- [ ] Issue 11 — Direct-answer paragraphs + average-typing-speed page
- [ ] Issue 12 — Per-page OG images
- [ ] Issue 13 — Programmatic test pages (Wave 1, then Wave 2)
- [ ] Issue 14 — Shareable result card
- [ ] Issue 15 — Typing certificate (only on user's go-ahead)
