# SEO, AEO & GEO Strategy
## Global + India Typing Test Platform

**Document status:** Implementation specification v1.0  
**Goal:** Establish #1 ranking capability and dominant organic market presence across Google, Bing, and AI discovery engines (AEO/GEO) through best-in-class technical SEO, full static prerendering, unmatched Core Web Vitals, and deep, intent-conquering content authority.

---

## 1. Strategic approach

The website must satisfy the visitor's intent better than competing pages. Technical SEO makes pages discoverable; original utility and content create reasons to rank, be cited, shared and revisited.

Use these principles:
1. Build the best usable typing test, not a page that merely repeats the keyword.
2. Make each indexable page serve a distinct intent.
3. Publish original, accurate and maintained explanations.
4. Make key content accessible in initial HTML.
5. Build authority through real usage, references, partnerships and useful resources.
6. Measure Google and Bing separately, by country, device, query and landing page.

Google's current guidance says established SEO fundamentals remain relevant to AI features; there are no special AI Overview requirements or guaranteed inclusion. Do not build around supposed AEO/GEO hacks. See official references at the end.

## 2. Audience and geographic strategy

### One international domain
Use one canonical domain with a clear global architecture. Do not launch separate India and global domains without a compelling business reason.

Recommended initial structure:
```text
/
 /typing-test/
 /typing-speed-test/
 /typing-test/1-minute/
 /typing-test/2-minute/
 /typing-test/5-minute/
 /typing-test/10-minute/
 /typing-practice/
 /typing-test/english/
 /typing-test/hindi/             # only after full Hindi QA
 /typing-lessons/
 /typing-lessons/beginner/
 /typing-lessons/home-row/
 /typing-lessons/accuracy/
 /typing-lessons/numbers/
 /typing-lessons/punctuation/
 /wpm-calculator/
 /typing-speed-chart/
 /how-wpm-is-calculated/
 /typing-test-for-students/
 /typing-test-for-job-applicants/
 /india/                         # only if it provides distinct India-specific value
 /about/
 /methodology/
 /contact/
 /privacy/
 /terms/
```

### India + global content
- Homepage should be globally understandable and not imply that the product is only for one country.
- Add India-focused pages only where there is distinct value: verified exam formats, Indian keyboard/input method guidance, Hindi typing and relevant regional-language support.
- Add global pages for international English, general productivity, school and workplace use.
- Avoid creating a country page for every country with only the country name swapped.
- Use locale-specific pages only when the text, examples, functionality or user need genuinely differs.
- If equivalent localized pages exist, implement reciprocal `hreflang` annotations and self-referencing canonicals. Use valid BCP 47 language/region codes such as `en-IN`, `en`, and `hi-IN` only where those versions exist. Include an `x-default` where appropriate.
- Do not redirect users or crawlers solely by IP in a way that prevents access to alternate versions. Offer a visible locale selector.

## 3. Keyword research and intent map

The following is a seed map, not a claim about search volume. Validate search demand, competition, SERP features and country variations with Search Console, Keyword Planner, Bing Webmaster Tools and reputable keyword research tools before final prioritization.

| Cluster | Example queries | Primary destination | Intent |
|---|---|---|---|
| Core | typing test, online typing test | `/` | Take a test |
| Speed | typing speed test, test typing speed | `/typing-speed-test/` | Measure speed |
| Timed | 1 minute typing test, 5 minute typing test, 10 minute typing test | timed test pages | Take timed test |
| Practice | typing practice, free typing practice | `/typing-practice/` | Improve |
| Accuracy | typing accuracy test, improve typing accuracy | accuracy lesson/test | Improve skill |
| Beginner | typing test for beginners, learn touch typing | beginner lesson | Learn |
| Calculation | WPM calculator, words per minute calculator | `/wpm-calculator/` | Calculate/understand |
| Language | English typing test, Hindi typing test | language-specific test | Test in language |
| India | typing test for students in India, Hindi typing practice | India-specific page only if useful | Local task |
| Exam | typing test for [specific exam] | exam guide only after format verification | Prepare |
| Educational | what is WPM, how is typing speed calculated | explanatory guide | Learn |

For each target page record:
- primary intent and primary query cluster
- secondary query variations
- target country/language
- SERP review date
- competing pages and content gaps
- unique product feature or information offered
- internal links in and out
- owner, publication date and next review date

Do not create one page for every keyword variation. Consolidate close variants when they share the same intent.

## 4. Page templates and content requirements

### Core test page
Must include:
- immediately usable typing test
- concise explanation of what is tested
- visible duration/mode options
- clear WPM, accuracy and error definitions
- transparent scoring formula and example
- keyboard/mobile instructions
- useful FAQs based on real user questions
- links to relevant practice and related durations
- original text and tested functionality

### Timed landing pages
Each duration page must offer a working test preselected to that duration, explain who benefits from that duration, and provide genuinely distinct guidance. Avoid cloning the same text with only “1 minute” replaced by “5 minutes.”

### Practice and lessons
Provide actionable drills, progression, examples, expected mistakes and a way to practice the skill. Content should be written or reviewed by someone with relevant knowledge. Cite reliable external sources for factual claims.

### Calculator and methodology
Explain all inputs, formulas, assumptions, edge cases and differences among scoring conventions. Make the calculator functional and test calculations against known examples.

### India-specific pages
Only publish when product and content support the claim. Verify exam-specific formats with official exam authority sources before describing them. Do not imply official affiliation or endorsement. Explain the difference between English typing and Hindi/Devanagari typing, including input-method considerations.

## 5. Technical SEO requirements

### Rendering and crawlability
- Important page text, headings, links and metadata must be present in prerendered/static HTML or server-rendered HTML.
- Do not rely on client-side JavaScript to inject the only meaningful page content.
- Internal navigation must use crawlable anchor links with descriptive text.
- Each indexable URL must return HTTP 200 and render its intended content without requiring a logged-in state.
- Do not block essential CSS/JS assets in robots.txt.
- Provide useful 404 page and correct 301 redirects when URLs change.
- Avoid soft 404s and redirect chains.

### URL rules
- lowercase, descriptive, short, hyphen-separated paths
- one canonical URL per content item
- consistent trailing slash policy
- no session IDs, tracking parameters or user-specific state in canonical URLs
- avoid duplicate query-string variants being indexed
- redirect legacy variants to the canonical route

### Metadata
Every indexable page needs:
- unique, accurate `<title>` (clear topic and brand where useful)
- unique meta description that accurately describes the page
- one clear visible H1
- descriptive H2/H3 hierarchy
- canonical URL
- Open Graph title/description/image
- social preview image with appropriate dimensions and alt text
- correct language metadata
- meaningful image alt text; decorative images use empty alt text

Do not stuff keywords or generate boilerplate descriptions.

### Sitemap
- XML sitemap index if URL count justifies it; otherwise one sitemap.
- Include only canonical, indexable, 200-status URLs.
- Include accurate `lastmod` only when meaningful page content changes.
- Split large sitemaps within search-engine limits.
- Submit in Google Search Console and Bing Webmaster Tools.
- Never include noindex, redirected, duplicate or error URLs.

### Robots and indexing
- Provide a deliberate `robots.txt` referencing sitemap.
- Use `noindex` for internal search pages, private account pages, staging, duplicate filters and thin utility states where appropriate.
- Do not accidentally noindex public landing pages.
- Keep staging protected and out of public indexing.
- Verify production robots headers and meta robots after deployment.

### Canonicals and internationalization
- Every indexable page should have a self-referencing canonical unless it is a deliberate duplicate.
- Localized equivalents should reference each other with reciprocal `hreflang`.
- Use correct language-region values; do not use country codes as language codes.
- Canonical should point to the same language version, not automatically to the global English page.
- Provide an accessible language/region selector.

### Structured data
Add JSON-LD only when it accurately represents visible page content:
- `WebSite` for the site identity.
- `Organization` only if there is a real organization with accurate details.
- `WebApplication` or `SoftwareApplication` for the actual typing application where appropriate.
- `BreadcrumbList` for pages with visible breadcrumbs.
- `Article`/`BlogPosting` only for genuine editorial articles with author and dates.
- `Person` for real, accountable authors/reviewers where applicable.

Do not add fake ratings, reviews, awards, prices, certifications, authors, organization details or exam affiliations. Do not expect FAQ schema to create a rich result; FAQs can still help users when genuinely useful. Structured data must match visible content and pass validation. Schema does not guarantee ranking or rich-result display.

## 6. AEO — answer engine optimization

AEO here means making useful answers easy for users and answer systems to identify and verify.

For pages that answer questions:
- State the direct answer near the top in plain language.
- Define terms before using jargon.
- Use descriptive question headings where they match real user questions.
- Include concise explanations, examples, formulas and caveats.
- Provide a deeper explanation after the short answer.
- Use tables for comparisons and ordered steps for procedures.
- Cite authoritative sources for claims.
- Keep visible content accessible in HTML; do not hide essential answers in images.
- Show author/reviewer information and update dates where editorial accountability matters.
- Ensure the page offers original value beyond a generic answer.

Example:
**Question:** What is WPM in typing?  
**Direct answer:** WPM means words per minute, a measure of typing speed. Many typing tests estimate one word as five characters, including spaces, but scoring conventions vary.  
Then explain the formula used by this product, an example, and why net and gross WPM can differ.

Do not produce keyword-stuffed Q&A blocks solely for snippets. Do not claim that a particular formatting trick guarantees AI citations.

## 7. GEO — generative engine optimization

GEO should be treated as a distribution and credibility outcome, not a separate markup hack.

- Publish original methodology and transparent scoring rules.
- Create useful tools and data that other educators, trainers and writers can reference.
- Make authorship, ownership, contact and editorial standards clear.
- Support factual statements with credible sources.
- Keep important information current.
- Use consistent entity and product naming across the website and legitimate public profiles.
- Earn genuine references from typing educators, schools, accessibility resources and relevant communities.
- Make pages easy to crawl, understand and cite.
- Avoid fabricated testimonials, paid link schemes, mass-generated pages and fake brand mentions.
- Monitor referral traffic and mentions from AI assistants where analytics makes this observable; don't infer citations from generic traffic.

Google's current AI search guidance explicitly prioritizes strong foundational SEO and unique, helpful content, and cautions against unnecessary AI files and GEO hacks. Bing's guidance also connects SEO fundamentals with Copilot grounding and citations.

## 8. Content authority and editorial system

Create a small set of excellent topic clusters:
1. Typing tests and measurement.
2. Typing speed and accuracy improvement.
3. Touch typing and keyboard technique.
4. Language and input-method guidance.
5. Student and workplace typing practice.

Every article must have:
- intended reader and search intent
- original outline and examples
- fact-checking and citations for factual claims
- author and reviewer identity where appropriate
- publish/update date
- related tool or lesson link
- editorial quality review
- no copied competitor text

Potential original assets:
- documented WPM methodology
- transparent scoring comparison
- anonymized aggregate typing benchmarks only after sufficient sample size and privacy review
- keyboard-layout and language-input guides
- free classroom practice packs
- original drills and downloadable practice material

Do not publish benchmark claims until data collection and methodology are defensible.

## 9. Performance and Core Web Vitals

Targets at the 75th percentile:
- LCP <= 2.5 seconds
- INP <= 200 milliseconds
- CLS <= 0.1

Implementation:
- minimize JavaScript and third-party scripts
- code-split non-critical routes
- preload only genuinely critical fonts/assets
- use modern image formats, explicit dimensions and responsive images
- lazy-load below-the-fold images
- avoid large animation bundles and layout-shifting ads
- keep typing key processing local and efficient
- avoid rerendering the entire app for each keystroke
- use CDN caching for static assets with hashed filenames
- test on mid-range Android devices and slower networks, not just developer hardware

Measure with PageSpeed Insights, Lighthouse, Chrome UX Report/Search Console where available, and real-device testing.

## 10. Discovery and authority

- Create and verify Google Search Console property.
- Submit sitemap and inspect representative URLs.
- Create Bing Webmaster Tools property and submit sitemap.
- Enable IndexNow for eligible URL changes if supported by the hosting/deployment workflow; do not treat it as a ranking guarantee.
- Configure analytics with privacy/legal requirements observed.
- Build legitimate links through useful resources, educator outreach, open educational materials and partnerships.
- Earn mentions by giving people something worth citing.
- Do not buy spam links, automate mass comments, exchange irrelevant links or use private blog networks.

## 11. Measurement dashboard

Weekly:
- clicks, impressions, CTR and average position by page/query/country/device
- top growing and declining queries
- indexed pages and crawl/indexing issues
- Core Web Vitals and page performance
- test starts/completions from organic landing pages
- conversion from landing page to completed test
- returning users
- earned referring domains and relevant mentions

Monthly:
- keyword cluster performance in India vs rest of world
- content quality and freshness audit
- cannibalization and duplicate-page audit
- competitor feature/content gap review
- internal link audit
- technical SEO audit
- roadmap priorities based on actual data

Do not use a single “SEO score” as the measure of success.

## 12. Launch checklist

- [ ] Domain and HTTPS work correctly.
- [ ] Production canonical host is consistent (www or non-www).
- [ ] Important pages render meaningful HTML.
- [ ] Titles, descriptions and H1s are unique.
- [ ] Canonicals are correct.
- [ ] Robots.txt is correct.
- [ ] Sitemap contains only canonical, indexable URLs.
- [ ] No staging URLs or development content are indexed.
- [ ] Structured data matches visible content and validates.
- [ ] Internal links work.
- [ ] 404 and redirect behavior are tested.
- [ ] Mobile UX and keyboard interaction are tested.
- [ ] Core Web Vitals are measured.
- [ ] Google Search Console and Bing Webmaster Tools are verified.
- [ ] Analytics events exclude raw typed text and keystrokes.
- [ ] Privacy, terms, contact and methodology pages are published.
- [ ] Hindi/localized routes are not published until fully QA'd.

## 13. Official references

Use these as the source of truth and re-check them during implementation:
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AI features guidance: https://developers.google.com/search/docs/appearance/ai-features
- Google generative AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- Schema.org WebApplication: https://schema.org/WebApplication
- Schema.org SoftwareApplication: https://schema.org/SoftwareApplication
- web.dev Core Web Vitals: https://web.dev/articles/vitals

**Agent rule:** Do not invent current keyword volumes, rankings, backlink counts or search-engine guarantees. If fresh research is needed, record the source, date, market and method in `docs/research/`.
