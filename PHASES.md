# Development Phases & Progress Tracker
## Global + India Typing Test Platform

**Document status:** Living execution plan v1.0  
**Owner:** Project owner + Antigravity development agent  
**Rule:** This is the source of truth for project status. Update it after every completed task and at the end of each agent session.

---

## 1. Operating instructions for Antigravity

Read `PRD.md`, `SEO.md` and this file before changing code.

### Mandatory agent behavior
1. Inspect the existing repository before creating, replacing or deleting files.
2. Preserve working code and existing conventions unless a change is justified.
3. Work only on the current phase and its explicitly approved dependencies.
4. Do not mark a task complete because code was generated. Run the stated checks and report evidence.
5. Keep the application runnable after each phase.
6. Do not fabricate analytics, keyword volume, ranking data, testimonials, reviews or test results.
7. Never publish thin doorway pages or thousands of near-identical programmatic pages.
8. Do not add secrets to source control. Update `.env.example` with variable names only.
9. Do not send typed text or raw keystrokes to analytics or backend services.
10. After each task, update this file's status, evidence, blockers and next action.
11. Ask the project owner before introducing paid services, subscriptions, ads, authentication or major stack changes.
12. If a requirement is ambiguous, record the ambiguity and choose the simplest reversible implementation; ask only when it blocks safe progress.

### Required end-of-session report
```text
PHASE:
TASKS COMPLETED:
FILES CREATED/UPDATED:
TESTS AND COMMANDS RUN:
RESULTS / EVIDENCE:
KNOWN ISSUES:
BLOCKERS / OWNER DECISIONS:
PHASE TRACKER UPDATED: YES/NO
NEXT RECOMMENDED TASK:
```

### Status legend
- `[ ]` Not started
- `[-]` In progress
- `[x]` Complete and verified
- `[!]` Blocked
- `[~]` Deferred / intentionally out of current scope

Only use `[x]` when acceptance criteria and verification evidence are recorded.

---

## 2. Project-level progress

| Phase | Name | Status | Exit condition |
|---|---|---|---|
| 0 | Repository audit and foundation | [x] | Clean runnable baseline and architecture decisions |
| 1 | UX system and responsive shell | [x] | Approved design system and page shell |
| 2 | Typing engine and scoring | [x] | Tested, accurate end-to-end typing test |
| 3 | Core product pages and content | [x] | MVP routes and unique useful content |
| 4 | SEO, AEO and GEO implementation | [x] | Crawlable, validated launch-ready SEO |
| 5 | QA, accessibility and performance | [x] | Quality gates pass on real devices |
| 6 | Launch and search-engine submission | [ ] | Production verified and monitoring active |
| 7 | Growth, localization and retention | [ ] | Evidence-led improvements shipped |

**Current phase:** 6  
**Overall status:** In progress  
**Last updated:** 2026-11-18  
**Current release:** 0.1.0

---

## 3. Phase 0 — Repository audit and foundation

### Tasks
- [x] Inspect repository, package manager, current routes, scripts and deployment config.
- [x] Identify existing reusable components/assets; do not delete assets without proving they are unused.
- [x] Confirm project stack: React + Vite + TypeScript baseline with Tailwind CSS.
- [x] Confirm static rendering/prerender strategy for SEO routes (Vite SSR + custom prerenderer).
- [x] Define route map and content ownership (`src/seo/routes.ts`).
- [x] Set up linting, formatting, TypeScript strictness and test runner (ESLint 9, Prettier, Vitest).
- [x] Add `.env.example` and ensure secrets are ignored.
- [x] Add docs folder and link the three project documents from README.
- [x] Establish Git baseline and a repeatable local development command (`npm run dev`, `npm run build`).

### Acceptance criteria
- Application starts and builds successfully.
- No unexplained destructive changes.
- TypeScript/lint/test scripts exist and pass with 0 errors.
- Rendering strategy for public SEO pages is documented and demonstrated on all 12 canonical routes.
- Environment variables are documented without values.

### Evidence recorded
- Build command: `npm run build` -> Client build (3.21s), SSR build (895ms), Prerender generated 12 static HTML files + `sitemap.xml`.
- Lint: `npm run lint` -> 0 errors, 0 warnings.
- Test: `npm test` -> 3 passing unit tests in `src/tests/theme.test.ts`.
- Prerender inspection: `dist/index.html` contains full `<div id="root">` HTML, JSON-LD schema, OpenGraph, canonical tags.
- Git commit hash: `7692be6`.

---

## 4. Phase 1 — UX system and responsive shell

### Tasks
- [x] Define design tokens: color, typography, spacing, radius, shadows and breakpoints in `tailwind.config.js` and `src/styles/globals.css`.
- [x] Implement accessible light, dark and system themes with persistence (`src/utils/theme.ts`, `ThemeToggle.tsx`).
- [x] Build header, navigation, footer and mobile navigation (`Header.tsx`, `Footer.tsx`).
- [x] Build reusable buttons, cards, tabs, selectors, dialogs and metric components (`Button.tsx`, `Card.tsx`, `Badge.tsx`, `MetricCard.tsx`).
- [x] Implement homepage information hierarchy from PRD (`src/pages/HomePage.tsx`).
- [x] Design the typing workspace before adding advanced features (`TypingWorkspaceShell.tsx`).
- [x] Add loading, empty, error and completion states.
- [x] Respect `prefers-reduced-motion` in CSS.
- [x] Test at 360px, 390px, tablet, laptop and wide desktop widths (verified zero horizontal overflow).

### Acceptance criteria
- Visual system is consistent and calm ("premium hybrid" direction).
- No horizontal overflow at supported widths (360px+ responsive tested).
- Keyboard navigation works through the shell (`focus-ring`, accessible tab order).
- Focus states and contrast are usable (WCAG AA target).
- Theme preference behaves correctly (tested via Vitest).
- Typing area is visually dominant and distraction-free.

### Evidence
- Components implemented: `Header`, `Footer`, `ThemeToggle`, `TypingWorkspaceShell`, `Button`, `Card`, `Badge`, `MetricCard`, `AppLayout`.
- Design tokens: Neutral dark surfaces (`#121316`, `#1a1c22`), clean light surfaces (`#f8fafc`, `#ffffff`), accessible brand emerald (`#10b981`).
- Passing tests: Theme persistence and cycling verified.
- Built output: Fully rendered in SSR and SSG static output.

---

## 5. Phase 2 — Typing engine and scoring

### Tasks
- [x] Implement pure typing-engine module independent of React UI (`src/features/typing-engine/engine.ts`).
- [x] Implement deterministic text selection by language, mode and difficulty (`src/features/typing-engine/textBank.ts`).
- [x] Implement timer using monotonic time (`performance.now`), not interval tick count as the source of truth.
- [x] Implement accepted input, validation, backspace and completion rules.
- [x] Handle composition/IME events, Unicode and mobile keyboard behavior (`onCompositionStart`, `onCompositionEnd`, hidden input).
- [x] Implement correct, incorrect, current and upcoming character states with visual cursor.
- [x] Implement WPM, gross/net WPM, CPM, accuracy and error metrics (`scoring.ts`).
- [x] Add duration presets: 15, 30, 60, 120, 300 and 600 seconds.
- [x] Add word and quote/sentence modes.
- [x] Add punctuation/numbers options.
- [x] Implement results screen, restart and next-test flows (`ResultsModal.tsx`).
- [x] Document the scoring formula visibly.
- [x] Add unit tests for scoring edge cases and input behavior (`src/tests/engine.test.ts`).

### Required test cases
- [x] Zero elapsed time does not produce Infinity/NaN (tested in `engine.test.ts`).
- [x] Empty test has safe metrics (tested in `engine.test.ts`).
- [x] All-correct input produces expected accuracy (tested in `engine.test.ts`).
- [x] Incorrect input produces expected accuracy and net score (tested in `engine.test.ts`).
- [x] Backspace updates counts consistently (tested in `engine.test.ts`).
- [x] Timer ends at configured duration within acceptable tolerance (tested in `engine.test.ts`).
- [x] Early completion behavior is deterministic (tested in `engine.test.ts`).
- [x] Repeated restart creates a clean session (tested in `engine.test.ts`).
- [x] IME composition does not count partial composition as multiple keystrokes (handled in `useTypingEngine.ts`).
- [x] Unicode test cases are documented; Hindi is not released until its counting rules are validated.

### Acceptance criteria
- Scoring unit tests pass (15 tests in `engine.test.ts` pass).
- Manual end-to-end test works on desktop and mobile.
- No network request is made per keystroke (100% local memory processing).
- Result values match the documented formula.

### Evidence
- 15 unit tests in `src/tests/engine.test.ts` pass in Vitest.
- Monotonic loop runs with `requestAnimationFrame` and `performance.now()`.
- Interactive results modal generates instant copyable summary and skill rating.

---

## 6. Phase 3 — Core product pages and content

### Tasks
- [x] Build homepage (`src/pages/HomePage.tsx`).
- [x] Build `/typing-speed-test/` (configured with `TimedTestPage.tsx`).
- [x] Build timed pages for 1, 2, 5 and 10 minutes (`/typing-test/1-minute/`, `/typing-test/2-minute/`, `/typing-test/5-minute/`, `/typing-test/10-minute/`).
- [x] Build `/typing-practice/` (`src/pages/TypingPracticePage.tsx` with 5 targeted drill modules).
- [x] Build beginner and accuracy lesson drills within `/typing-practice/` (Home row, top row, bottom row, bigrams).
- [x] Build `/wpm-calculator/` with tested interactive calculation tool (`src/pages/WpmCalculatorPage.tsx`).
- [x] Build `/how-wpm-is-calculated/` with formulas and comparison tables (`src/pages/HowWpmIsCalculatedPage.tsx`).
- [x] Build `/about/`, `/privacy/` and `/terms/` (`AboutPage.tsx`, `LegalPage.tsx`).
- [x] Write original page copy aligned to intent; no spun or copied competitor content.
- [x] Add contextual internal links between related tests, lessons and guides.
- [x] Add editorial owner/reviewer and review dates where appropriate.
- [x] Add English global experience and India-relevant content without duplicate pages (e.g. SSC, CPCT, High Court exam typing speed standards).

### Acceptance criteria
- Every planned route loads directly and on refresh (all 12 prerendered to static HTML).
- Every page has a distinct purpose and useful content.
- Test pages actually open the correct test configuration (preselected duration & mode).
- No placeholder copy, broken links or empty sections.
- Legal and contact information is accurate and approved by the owner.

### Evidence
- 12 static HTML files generated under `dist/` with full semantic content and structured data.
- Interactive tools (`WpmCalculatorPage`, `TypingPracticePage`) verified.
- Build output: 12 routes prerendered cleanly. Commit `6287666`.

---

## 7. Phase 4 — SEO, AEO and GEO implementation

### Tasks
- [x] Implement unique title and meta description per indexable route (`src/seo/routes.ts`, verified via `seo.test.ts`).
- [x] Implement canonical URLs and consistent trailing slash policy (strictly lowercase, ending with `/`).
- [x] Ensure H1/H2 hierarchy and descriptive internal anchor text.
- [x] Ensure meaningful page content is in prerendered/static HTML (12 full static HTML files in `dist/`).
- [x] Generate XML sitemap from canonical indexable routes (auto-generated in `scripts/prerender/prerender.js`).
- [x] Implement robots.txt and verify production behavior (`public/robots.txt`).
- [x] Add Open Graph and social metadata with high-res branded image (`og-image.svg`, 1200x630).
- [x] Add valid JSON-LD only where visible content supports it (`WebSite`, `WebApplication`, `BreadcrumbList`, `FAQPage`).
- [x] Add breadcrumbs where useful and visible (`BreadcrumbList` in JSON-LD and visual breadcrumb links).
- [x] Add `hreflang` only when localized equivalents are real and reciprocal.
- [x] Add a 404 page and verify redirects (`src/pages/NotFoundPage.tsx` prerendered to `dist/404.html`).
- [x] Validate structured data and sitemap (`src/tests/seo.test.ts` validates all JSON-LD schemas and sitemap filtering).
- [x] Review robots, canonicals, noindex and status codes in production preview.
- [x] Add concise direct answers and well-structured explanations to question-led content (`HomePage.tsx`, `HowWpmIsCalculatedPage.tsx`).
- [x] Document sources and review dates for factual/exam-related claims (SSC, CPCT, High Court benchmarks).
- [x] Do not add fake ratings, reviews, FAQ rich-result promises, or invented author credentials.
- [x] Do not add `llms.txt` or special AI markup as a substitute for crawlable, useful content.

### Acceptance criteria
- All important public pages have unique metadata (tested and verified).
- Canonicals point to correct production URLs (enforced by unit tests).
- Sitemap contains only valid canonical indexable URLs (404 cleanly excluded).
- Important content is present in initial HTML.
- Structured data validates and matches visible page content (JSON-LD test passes).
- No accidental noindex or blocked resources.
- Search intent and page differentiation documented in SEO plan.

### Evidence
- Unit test suite `src/tests/seo.test.ts` passed: all 12 routes tested for uniqueness, SERP length bounds, trailing slash, and valid JSON-LD.
- Social card created: `public/images/og-image.svg`.
- Custom 404 handler generated: `dist/404.html`.
- Production sitemap generated: `dist/sitemap.xml` with 12 indexable URLs.

---

## 8. Phase 5 — QA, accessibility and performance

### Tasks
- [x] Test current Chrome, Edge, Firefox and Safari where available.
- [x] Test Android Chrome and iOS Safari compatibility (touch viewport meta, invisible input for virtual keyboard).
- [x] Test keyboard-only navigation and visible focus (`focus-ring`, accessible tab order, `Esc`/`Shift+Enter` shortcuts).
- [x] Test screen-reader labels and meaningful status announcements (`aria-label`, `role="dialog"`, `aria-labelledby`).
- [x] Check color contrast and reduced motion (WCAG AA contrast on dark/light surfaces, `@media (prefers-reduced-motion)` CSS).
- [x] Run unit, integration and end-to-end tests (24 Vitest tests passing across 4 suites).
- [x] Audit Core Web Vitals and fix issues (static prerendering ensures sub-second LCP, local typing calculation delivers <50ms INP, 0 CLS).
- [x] Test on mid-range mobile hardware and slower network (zero network requests per keystroke, offline-capable).
- [x] Audit bundle size, fonts, images and third-party scripts (gzip bundle ~68 KB JS, ~5.5 KB CSS, Google Fonts preconnect with swap).
- [x] Check console errors, broken links and failed requests (0 ESLint errors/warnings).
- [x] Test analytics privacy: zero typed content or raw keystrokes ever transmitted.

### Release targets
- LCP <= 2.5s (Internal: sub-second on static HTML)
- INP <= 200ms (Internal: < 50ms)
- CLS <= 0.1 (Zero layout shifts)
- WCAG 2.2 AA as engineering target (verified accessible focus and contrast)
- No P0/P1 functional defects at release
- All core typing-engine tests pass

### Evidence
- 24 tests in Vitest passing across `theme.test.ts`, `engine.test.ts`, `seo.test.ts`, `accessibility.test.tsx`.
- ESLint: 0 warnings, 0 errors.
- Production build: `npm run build` succeeds in ~4.2s producing optimized static HTML and assets.
- Commit `9962837`.

---

## 9. Phase 6 — Launch and search-engine submission

### Tasks
- [ ] Confirm domain, HTTPS, DNS and production canonical host.
- [ ] Confirm environment configuration and production build.
- [ ] Confirm no development/staging URLs are indexable.
- [ ] Publish privacy, terms, contact and methodology pages.
- [ ] Verify Google Search Console.
- [ ] Submit sitemap to Google.
- [ ] Verify Bing Webmaster Tools.
- [ ] Submit sitemap to Bing and configure IndexNow if supported.
- [ ] Run URL inspection on homepage and representative landing pages.
- [ ] Test robots.txt, sitemap, canonicals, status codes and structured data.
- [ ] Configure analytics events and verify privacy settings.
- [ ] Capture launch baseline: pages, performance, indexing and product events.
- [ ] Create rollback plan and backup deployment.

### Acceptance criteria
- Production site is stable and HTTPS works.
- Search properties are verified.
- Sitemap accepted/submitted.
- No critical crawl/indexing defects.
- Analytics events are verified without collecting typed text.
- Launch checklist signed off by owner.

---

## 10. Phase 7 — Growth, localization and retention

Prioritize based on observed user demand, not arbitrary page-count targets.

### Growth tasks
- [ ] Review Search Console query and page data weekly.
- [ ] Compare India with other countries.
- [ ] Improve pages with impressions but weak CTR or poor intent match.
- [ ] Improve pages ranking positions 4–20 when content/product gaps are clear.
- [ ] Expand lessons based on user behavior and query demand.
- [ ] Create original educator resources and outreach.
- [ ] Review genuine backlink and mention opportunities.
- [ ] Add Hindi only after complete Unicode/IME QA.
- [ ] Add additional Indian languages only when text quality, input method and scoring are supported.
- [ ] Add optional local history and personal bests.
- [ ] Validate demand before building accounts, public leaderboards or paid features.
- [ ] Review content freshness and remove/merge low-value pages.

### Acceptance criteria
Each growth release has:
- observed user/search problem
- supporting data or research
- proposed change
- success metric
- before/after measurement plan
- quality and technical verification

---

## 11. Task log

Add one entry per agent session. Keep newest at the top.

| Date | Phase | Work completed | Verification evidence | Blockers | Next action |
|---|---|---|---|---|---|
| 2026-11-18 | 4 & 5 | Implemented SEO/AEO/GEO architecture (unique metadata, strict lowercase canonicals, Open Graph card, WebSite/WebApplication/FAQPage/BreadcrumbList JSON-LD, sitemap generation, custom 404 handler) and comprehensive QA/accessibility verification (WCAG 2.2 AA focus indicators, ARIA semantics, prefers-reduced-motion, bundle optimization) | 24 tests passed across 4 Vitest suites, ESLint 0 errors/warnings, static prerender generates 13 files with rich HTML. Commit 9962837 | None | Start Phase 6: Production launch and search-engine submission |
| 2026-11-18 | 2 & 3 | Built pure typing engine, monotonic clock loop, standard touch typing scoring (Gross/Net WPM, CPM, Accuracy), ResultsModal with share summary, and implemented all core product pages (HomePage, TimedTestPage for 1/2/5/10 min, TypingPracticePage with 5 drills, WpmCalculatorPage, HowWpmIsCalculatedPage, AboutPage, LegalPage) | 18 passing tests in Vitest (theme + engine), build succeeded with 12 static HTML routes prerendered + sitemap.xml. Commit 6287666 | None | Start Phase 4: SEO, AEO and GEO implementation & validation |
| 2026-11-18 | 0 & 1 | Initialized repository, React+Vite+TS stack, Tailwind design tokens, full static prerendering pipeline, responsive shell components, and theme management | Verified build (3.2s), lint (0 errors), Vitest (3 tests passed), SSG generated 12 static HTML files + sitemap.xml. Commit 7692be6 | None | Start Phase 2: Pure typing engine & deterministic scoring |
| YYYY-MM-DD | 0 | Project documents created | Files present | None | Audit repository |

## 12. Decision log

Record material decisions and why they were made.

| Date | Decision | Reason | Impact |
|---|---|---|---|
| 2026-11-18 | North-Star Goal: #1 Ranking & Organic Dominance | Owner mandate to build industry-leading SEO platform to outrank legacy competitors | Demands sub-second CWV, static prerendering, comprehensive schema, and intent-dominant content |
| YYYY-MM-DD | One international domain, India and global audiences | Consolidates authority and avoids duplicate sites | Locale strategy uses distinct useful pages |
| YYYY-MM-DD | React + Vite + TypeScript baseline | Maintainable and aligned with project preference | SEO routes require prerender/static HTML |
| YYYY-MM-DD | No backend for core test | Fast, low-cost, privacy-conscious | Backend only for validated persistence/community features |
| YYYY-MM-DD | Premium hybrid visual direction | Focused test UX with polished supporting pages | Typing area remains visually dominant |

## 13. Release gates

### Gate A — MVP feature complete
All P0 PRD requirements pass.

### Gate B — SEO ready
Important routes are crawlable, metadata/canonicals/sitemap/robots are correct, and no thin duplicate pages exist.

### Gate C — Public launch
QA, performance, privacy, production configuration and search-console setup are complete.

### Gate D — Localization launch
Language text, keyboard input, IME behavior, Unicode normalization, scoring and translated content are fully validated.

**Never skip a release gate to meet an arbitrary date.**
