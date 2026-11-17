# Product Requirements Document (PRD)
## Global + India Typing Test Platform

**Document status:** Development baseline v1.0  
**Project:** Global typing speed test and practice platform  
**Primary markets:** India and worldwide  
**Primary product objective:** Engineer an industry-leading, highly SEO-optimized typing test platform built to outrank legacy competitors and compete for the #1 ranking position across global and Indian search queries, powered by sub-second performance, full static prerendering, topical authority, and frictionless user intent satisfaction.

---

## 1. Product vision

Build a fast, beautiful, browser-based typing platform that helps people measure typing speed, improve accuracy, practice consistently and understand their progress. It must serve both international users and users in India from launch, with a clear path to additional Indian and international languages.

The product must be valuable even if a visitor never creates an account. A user should be able to land on the homepage, start a test immediately, finish it, understand the result and start another test without friction.

### Product principles
1. **Utility first:** the typing test works reliably before decorative features are added.
2. **Fast by default:** keystroke processing happens locally in the browser; no network request per key.
3. **Accessible:** keyboard-first operation, readable contrast, screen-reader labels and responsive layouts.
4. **Honest measurement:** explain WPM, accuracy, errors and the scoring formula.
5. **Useful localization:** India and global audiences are served with genuinely relevant content, not duplicated doorway pages.
6. **Privacy by design:** no account required for basic tests; collect only data needed for explicit features.
7. **Search-engine understandable:** important page content is rendered as crawlable HTML and has stable URLs.

## 2. Target audiences and jobs to be done

| Audience                        | Need                                                       | Product response                                                             |
| ------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Students in India               | Improve speed for school, college and computer-based exams | Beginner practice, timed tests, accuracy guidance, English and Hindi roadmap |
| Job seekers and exam candidates | Measure readiness and practice under time pressure         | 1/2/5/10-minute tests, results and repeatable drills                         |
| Global learners                 | Test and improve everyday typing                           | International English tests, quotes, words and custom modes                  |
| Professionals                   | Improve productivity and track progress                    | Consistent metrics, history and focused practice                             |
| Teachers/trainers               | Give learners a simple practice tool                       | Shareable test links and printable/clear result summaries                    |
| Competitive typists             | Compare personal performance                               | Optional leaderboard and challenge modes, with anti-abuse controls           |

## 3. Scope

### MVP — must ship
- Responsive homepage with immediate test entry.
- Typing engine with 15, 30, 60, 120, 300 and 600-second presets.
- Word-based and quote/sentence modes.
- Live WPM, raw WPM, accuracy, correct characters, incorrect characters and remaining time.
- Clear test states: ready, running, paused (if supported), completed.
- Restart and new-test actions.
- Results view with score explanation and shareable result summary.
- Difficulty selection: easy, medium and hard.
- Punctuation and numbers toggles where appropriate.
- Light/dark theme with system preference default.
- SEO landing pages for the main test intents, each with unique useful content.
- About, contact, privacy, terms and methodology pages.
- Sitemap, robots.txt, canonical URLs, metadata, Open Graph and structured data where valid.
- Analytics and Search Console/Bing verification hooks (IDs supplied through environment/config, never hardcoded secrets).
- Automated tests for scoring and core user flows.

### Phase 2 — retention and learning
- Local progress history without requiring an account.
- Daily challenge with a stable URL and date handling.
- Practice lessons: home row, accuracy, common bigrams, punctuation and numbers.
- Custom text test (paste or select text).
- Shareable result card generated client-side.
- Personal bests and trend chart.
- India-focused content and exam-practice guidance based on verified research.
- Language architecture and first additional language after proper keyboard/input-method testing.

### Phase 3 — accounts and community (only after demand validates it)
- Optional account and cloud-synced history.
- Public leaderboard with privacy controls and abuse prevention.
- Friends/classroom challenges.
- Verified public profile pages only if they offer real value and are index-worthy.
- Admin-managed content and challenge bank.

### Explicitly out of scope for MVP
- Paid subscriptions, ads, payment gateway.
- AI chatbot or generative content features.
- Mandatory sign-up.
- Public user-generated pages at scale.
- Automatically generated thousands of near-identical SEO pages.
- Claims that a score certifies professional ability or guarantees exam success.

## 4. UX and visual direction

### Chosen direction: premium hybrid
Use a calm, premium interface: a minimal and distraction-free typing surface surrounded by a polished, modern product experience. The typing area should be the visual focus; dashboards and educational pages can use richer cards and illustrations.

### Visual system
- Default theme: dark-neutral interface with a carefully designed light theme; remember the user's explicit preference.
- Accent: one restrained, accessible accent color. Avoid excessive gradients, glowing borders and visual noise.
- Typography: highly legible sans-serif for UI; monospace for the typing passage and metrics.
- Layout: generous whitespace, clear hierarchy, consistent spacing and a readable maximum content width.
- Motion: subtle transitions only; respect `prefers-reduced-motion`.
- Responsive: optimize for desktop keyboard use but make mobile touch interaction and on-screen keyboard behavior understandable.
- Avoid intrusive popups, autoplay, forced registration and layout shifts.

### Homepage information hierarchy
1. Header: logo, Test, Practice, Lessons, Languages, About; compact theme control.
2. Hero: clear value proposition and primary “Start typing test” action.
3. Typing test module visible without excessive scrolling.
4. Mode controls: duration, difficulty, punctuation/numbers, language.
5. Results preview or concise explanation of what is measured.
6. Practice/lesson entry points.
7. Helpful content: how WPM is calculated, accuracy tips, FAQ.
8. Footer: important navigation, policies, contact and language links.

### Test interaction requirements
- User can start by focusing the input area and typing; provide a clear start affordance.
- Use a robust hidden/accessible input strategy; preserve mobile input behavior.
- Highlight correct, incorrect, current and upcoming characters distinctly. Do not rely on color alone.
- Keep the caret/current-character position visible.
- Handle backspace, paste policy, IME composition, dead keys, mobile keyboards and Unicode correctly.
- Do not start the timer on navigation or accidental focus; start on first accepted character or explicit start, and communicate the rule.
- Prevent text selection from disrupting the test, without blocking normal accessibility.
- On completion, freeze the result and offer restart/new text.
- Provide a no-JavaScript or graceful fallback explanation; the interactive test itself requires JavaScript.

## 5. Typing metrics and calculation specification

Use a single documented scoring module with deterministic unit tests.

Recommended standard:
- `elapsedMinutes = elapsedMilliseconds / 60000`
- `grossWPM = (totalCharactersTyped / 5) / elapsedMinutes`
- `netWPM = max(0, grossWPM - (incorrectCharacters / 5) / elapsedMinutes)` if adopting the common penalty model.
- `accuracy = correctCharacters / max(1, totalCharactersTyped) * 100`
- `CPM = totalCharactersTyped / elapsedMinutes`

Important: typing sites use different WPM definitions. Clearly label the chosen formula, distinguish gross and net WPM, and do not silently compare scores from incompatible systems. For word-based tests, document whether spaces count as characters. Use a monotonic clock (`performance.now`) for elapsed time. Clamp edge cases and avoid division by zero.

Required result fields:
- duration and actual elapsed time
- gross WPM and net WPM
- accuracy percentage
- correct/incorrect characters
- total characters
- CPM
- selected mode, language and difficulty
- timestamp (only when stored)
- test/session ID (non-identifying random ID)

## 6. Content and language strategy

### Launch languages
- English global: neutral/international English text bank.
- English India: India-relevant examples and spelling where it genuinely matters; don't fork the entire English experience without a user benefit.
- Hindi: plan as a separate language capability, not a cosmetic translation. Test Devanagari input, Unicode normalization, conjuncts, matras, IME composition and character counting before release.

### Language expansion
Build language packs with:
- locale code (BCP 47)
- display name and native name
- text bank and content provenance/licence
- keyboard/input-method notes
- tokenization and character-count rules
- language-specific scoring caveats
- translated interface strings
- QA fixtures for common input methods

Do not assume every language can be scored using English's five-character word convention. Make scoring rules transparent and configurable.

## 7. Functional requirements

| ID    | Requirement          | Priority | Acceptance criteria                                                   |
| ----- | -------------------- | -------- | --------------------------------------------------------------------- |
| FR-01 | Start test           | P0       | User can start from homepage in one clear action                      |
| FR-02 | Timer                | P0       | Accurate countdown using monotonic time; no drift from interval count |
| FR-03 | Character validation | P0       | Correct/incorrect/current states update on every input                |
| FR-04 | Metrics              | P0       | Results match documented formula and unit tests                       |
| FR-05 | Restart              | P0       | Clean new session; no stale text or metrics                           |
| FR-06 | Responsive UI        | P0       | Works at 360px mobile width through desktop                           |
| FR-07 | Accessibility        | P0       | Keyboard navigation, labels, contrast and reduced motion              |
| FR-08 | SEO metadata         | P0       | Unique title/description/canonical per indexable route                |
| FR-09 | Crawlable content    | P0       | Main copy present in initial HTML/prerendered output                  |
| FR-10 | Theme                | P1       | Light/dark/system preference works                                    |
| FR-11 | Local history        | P1       | User can view/delete locally stored results                           |
| FR-12 | Daily challenge      | P2       | Stable, canonical challenge URL and deterministic text                |
| FR-13 | Accounts             | P3       | Only built after validated retention demand                           |

## 8. Non-functional requirements

- Performance: target good Core Web Vitals at the 75th percentile, separately for mobile and desktop. Internal targets: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Reliability: typing engine must not lose input during normal use; timer and result calculations are deterministic.
- Security: validate all server inputs, rate-limit write endpoints, protect admin routes, use secure cookies if authentication is introduced, and keep secrets server-side.
- Privacy: publish accurate privacy policy; obtain consent where legally required; minimize analytics and personal data.
- Compatibility: current Chrome, Edge, Firefox and Safari; Android Chrome and iOS Safari.
- Maintainability: TypeScript, linting, formatting, typed domain models and documented modules.
- Resilience: core test runs offline after initial page load where technically feasible.
- Accessibility: target WCAG 2.2 AA as an engineering goal.

## 9. Recommended architecture

### Frontend
- React + Vite + TypeScript.
- Tailwind CSS with design tokens.
- Lightweight animation library only where useful.
- Use static generation/prerendering for public SEO routes so meaningful page text and metadata are present in the delivered HTML. Do not ship a blank SPA shell for important landing pages.
- Keep the typing engine independent of UI components and network services.

### Backend
MVP should not require a backend for taking tests. Add Node.js API and MongoDB only for validated needs such as accounts, cloud history, leaderboards or admin content. Do not send keystrokes to the server.

### Hosting
- Static frontend on Cloudflare Pages or an equivalent CDN-backed host.
- API on a suitable serverless/edge or managed Node hosting platform if/when needed.
- MongoDB Atlas only when persistence is required.
- Use environment variables for site URL, analytics IDs, verification tokens and API configuration.

### Suggested repository structure
```text
typing-test-site/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── typing-engine/
│   │   ├── results/
│   │   ├── practice/
│   │   └── localization/
│   ├── content/
│   ├── data/
│   ├── pages/
│   ├── seo/
│   ├── styles/
│   ├── utils/
│   └── tests/
├── scripts/
│   ├── prerender/
│   ├── sitemap/
│   └── content-validation/
├── docs/
│   ├── PRD.md
│   ├── SEO.md
│   └── PHASES.md
├── .env.example
├── README.md
└── package.json
```

## 10. Analytics and product events

Track only events needed to improve the product:
- `test_started`
- `test_completed`
- `test_restarted`
- `mode_changed`
- `language_changed`
- `practice_lesson_started`
- `practice_lesson_completed`
- `result_shared`

Do not send typed passage contents or raw keystrokes to analytics. Use aggregate metrics and privacy-conscious settings. Define event names and properties in one schema.

## 11. Definition of done

A feature is done only when:
- It meets acceptance criteria.
- It works on mobile and desktop.
- Loading, empty, error and completion states are implemented.
- Accessibility and keyboard behavior are checked.
- Automated tests pass.
- No console errors or broken links remain.
- SEO metadata and crawlability are verified for public routes.
- Documentation and phase tracker are updated.
- A human has tested the feature in a real browser.

## 12. Product success metrics

Measure:
- organic clicks, impressions, CTR and average position by query/page/country
- Bing impressions and clicks
- test starts per landing-page session
- test completion rate
- repeat usage and practice completion
- Core Web Vitals
- indexed vs submitted URLs
- quality referring domains and earned mentions

Do not optimize for page count or raw traffic alone. Prioritize qualified organic visitors who actually use the typing tool and return.
