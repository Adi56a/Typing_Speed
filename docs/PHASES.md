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
| 0 | Repository audit and foundation | [ ] | Clean runnable baseline and architecture decisions |
| 1 | UX system and responsive shell | [ ] | Approved design system and page shell |
| 2 | Typing engine and scoring | [ ] | Tested, accurate end-to-end typing test |
| 3 | Core product pages and content | [ ] | MVP routes and unique useful content |
| 4 | SEO, AEO and GEO implementation | [ ] | Crawlable, validated launch-ready SEO |
| 5 | QA, accessibility and performance | [ ] | Quality gates pass on real devices |
| 6 | Launch and search-engine submission | [ ] | Production verified and monitoring active |
| 7 | Growth, localization and retention | [ ] | Evidence-led improvements shipped |

**Current phase:** 0  
**Overall status:** Not started  
**Last updated:** YYYY-MM-DD  
**Current release:** 0.1.0

---

## 3. Phase 0 — Repository audit and foundation

### Tasks
- [ ] Inspect repository, package manager, current routes, scripts and deployment config.
- [ ] Identify existing reusable components/assets; do not delete assets without proving they are unused.
- [ ] Confirm project stack: React + Vite + TypeScript unless an existing approved stack requires otherwise.
- [ ] Confirm static rendering/prerender strategy for SEO routes.
- [ ] Define route map and content ownership.
- [ ] Set up linting, formatting, TypeScript strictness and test runner.
- [ ] Add `.env.example` and ensure secrets are ignored.
- [ ] Add docs folder and link the three project documents from README.
- [ ] Establish Git baseline and a repeatable local development command.

### Acceptance criteria
- Application starts and builds successfully.
- No unexplained destructive changes.
- TypeScript/lint/test scripts exist.
- Rendering strategy for public SEO pages is documented and demonstrated on one route.
- Environment variables are documented without values.

### Evidence to record
Build command/output, lint output, test output, sample rendered HTML inspection, commit hash.

---

## 4. Phase 1 — UX system and responsive shell

### Tasks
- [ ] Define design tokens: color, typography, spacing, radius, shadows and breakpoints.
- [ ] Implement accessible light, dark and system themes.
- [ ] Build header, navigation, footer and mobile navigation.
- [ ] Build reusable buttons, cards, tabs, selectors, dialogs and metric components.
- [ ] Implement homepage information hierarchy from PRD.
- [ ] Design the typing workspace before adding advanced features.
- [ ] Add loading, empty, error and completion states.
- [ ] Respect `prefers-reduced-motion`.
- [ ] Test at 360px, 390px, tablet, laptop and wide desktop widths.

### Acceptance criteria
- Visual system is consistent.
- No horizontal overflow at supported widths.
- Keyboard navigation works through the shell.
- Focus states and contrast are usable.
- Theme preference behaves correctly.
- Typing area is visually dominant and distraction-free.

### Evidence
Screenshots at mobile and desktop widths, accessibility spot-check, browser test notes.

---

## 5. Phase 2 — Typing engine and scoring

### Tasks
- [ ] Implement pure typing-engine module independent of React UI.
- [ ] Implement deterministic text selection by language, mode and difficulty.
- [ ] Implement timer using monotonic time, not interval tick count as the source of truth.
- [ ] Implement accepted input, validation, backspace and completion rules.
- [ ] Handle composition/IME events, Unicode and mobile keyboard behavior.
- [ ] Implement correct, incorrect, current and upcoming character states.
- [ ] Implement WPM, gross/net WPM, CPM, accuracy and error metrics.
- [ ] Add duration presets: 15, 30, 60, 120, 300 and 600 seconds.
- [ ] Add word and quote/sentence modes.
- [ ] Add punctuation/numbers options.
- [ ] Implement results screen, restart and next-test flows.
- [ ] Document the scoring formula visibly.
- [ ] Add unit tests for scoring edge cases and input behavior.

### Required test cases
- [ ] Zero elapsed time does not produce Infinity/NaN.
- [ ] Empty test has safe metrics.
- [ ] All-correct input produces expected accuracy.
- [ ] Incorrect input produces expected accuracy and net score.
- [ ] Backspace updates counts consistently.
- [ ] Timer ends at configured duration within acceptable tolerance.
- [ ] Early completion behavior is deterministic.
- [ ] Repeated restart creates a clean session.
- [ ] IME composition does not count partial composition as multiple keystrokes.
- [ ] Unicode test cases are documented; Hindi is not released until its counting rules are validated.

### Acceptance criteria
- Scoring unit tests pass.
- Manual end-to-end test works on desktop and mobile.
- No network request is made per keystroke.
- Result values match the documented formula.

---

## 6. Phase 3 — Core product pages and content

### Tasks
- [ ] Build homepage.
- [ ] Build `/typing-speed-test/`.
- [ ] Build timed pages for 1, 2, 5 and 10 minutes.
- [ ] Build `/typing-practice/`.
- [ ] Build beginner and accuracy lesson pages.
- [ ] Build `/wpm-calculator/` with tested calculation.
- [ ] Build `/how-wpm-is-calculated/`.
- [ ] Build `/about/`, `/methodology/`, `/contact/`, `/privacy/` and `/terms/`.
- [ ] Write original page copy aligned to intent; no spun or copied competitor content.
- [ ] Add contextual internal links between related tests, lessons and guides.
- [ ] Add editorial owner/reviewer and review dates where appropriate.
- [ ] Add English global experience and India-relevant content without duplicate pages.

### Acceptance criteria
- Every planned route loads directly and on refresh.
- Every page has a distinct purpose and useful content.
- Test pages actually open the correct test configuration.
- No placeholder copy, broken links or empty sections.
- Legal and contact information is accurate and approved by the owner.

---

## 7. Phase 4 — SEO, AEO and GEO implementation

### Tasks
- [ ] Implement unique title and meta description per indexable route.
- [ ] Implement canonical URLs and consistent trailing slash policy.
- [ ] Ensure H1/H2 hierarchy and descriptive internal anchor text.
- [ ] Ensure meaningful page content is in prerendered/static HTML.
- [ ] Generate XML sitemap from canonical indexable routes.
- [ ] Implement robots.txt and verify production behavior.
- [ ] Add Open Graph and social metadata.
- [ ] Add valid JSON-LD only where visible content supports it.
- [ ] Add breadcrumbs where useful and visible.
- [ ] Add `hreflang` only when localized equivalents are real and reciprocal.
- [ ] Add a 404 page and verify redirects.
- [ ] Validate structured data and sitemap.
- [ ] Review robots, canonicals, noindex and status codes in production preview.
- [ ] Add concise direct answers and well-structured explanations to question-led content.
- [ ] Document sources and review dates for factual/exam-related claims.
- [ ] Do not add fake ratings, reviews, FAQ rich-result promises, or invented author credentials.
- [ ] Do not add `llms.txt` or special AI markup as a substitute for crawlable, useful content. Only add optional files if a real use case is documented and verified.

### Acceptance criteria
- All important public pages have unique metadata.
- Canonicals point to correct production URLs.
- Sitemap contains only valid canonical indexable URLs.
- Important content is present in initial HTML.
- Structured data validates and matches visible page content.
- No accidental noindex or blocked resources.
- Search intent and page differentiation documented in SEO plan.

---

## 8. Phase 5 — QA, accessibility and performance

### Tasks
- [ ] Test current Chrome, Edge, Firefox and Safari where available.
- [ ] Test Android Chrome and iOS Safari.
- [ ] Test keyboard-only navigation and visible focus.
- [ ] Test screen-reader labels and meaningful status announcements.
- [ ] Check color contrast and reduced motion.
- [ ] Run unit, integration and end-to-end tests.
- [ ] Run Lighthouse on representative routes.
- [ ] Measure Core Web Vitals and fix largest issues.
- [ ] Test on mid-range mobile hardware and slower network.
- [ ] Audit bundle size, fonts, images and third-party scripts.
- [ ] Check console errors, broken links and failed requests.
- [ ] Test analytics privacy: no typed content or raw keystrokes.

### Release targets
- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1
- WCAG 2.2 AA as engineering target
- No P0/P1 functional defects at release
- All core typing-engine tests pass

### Acceptance criteria
Record actual test results; do not claim a target passed without measurement. Any known exceptions must be listed with owner and resolution plan.

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
