# 03 — Competitive Feature Matrix & Strategic Opportunity Analysis

**Date**: November 2026  
**Auditor**: Principal Product Architect & Competitor Intelligence Researcher  
**Scope**: 5 Major Competitors vs. CheckTypingSpeeds (Current & Target Architecture)

---

## 1. Feature Comparison Matrix

Classifications:
- **Available** (Full native capability)
- **Partially available** (Incomplete, paywalled, or clunky)
- **Not found** (Feature does not exist)
- **Not applicable** (Out of product scope)
- **Not verified** (Publicly unconfirmable)

| Feature / Capability | Typing.com | TypingTest.com | LiveChat | TypingMaster | Monkeytype | CheckTypingSpeeds (Target) |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Free Typing Test** | Available | Available | Available | Partially available | Available | **Available (100% Free, Zero Ads)** |
| **2. Multiple Test Durations** (15s, 30s, 1m, 2m, 5m, 10m, 15m) | Partially available (1, 3, 5m) | Available (30s, 1, 2, 3, 5, 10m) | Not found (Only 60s) | Partially available (2, 5, 10m) | Available (15, 30, 60, 120s) | **Available (15s, 30s, 1m, 2m, 5m, 10m, 15m)** |
| **3. ANSI WPM Calculation (5 char/word)** | Available | Available | Available | Available | Available | **Available (ANSI standard formula)** |
| **4. Accuracy Calculation** | Available | Available | Available | Available | Available | **Available (Keystroke & Word level)** |
| **5. Raw WPM vs. Net WPM** | Partially available | Available | Not found | Available | Available | **Available (Clear gross/net breakdown)** |
| **6. Real-Time Feedback** | Available | Available | Available | Available | Available | **Available (Zero-lag monotonic timer)** |
| **7. Error Highlighting** | Available | Available | Available | Available | Available | **Available (Subtle inline character states)** |
| **8. Punctuation Mode** | Available | Available | Not found | Available | Available | **Available (One-click toggle)** |
| **9. Numbers Mode** | Available | Available | Not found | Available | Available | **Available (One-click toggle)** |
| **10. Curated Quote Mode** | Not found | Partially available | Not found | Not found | Available | **Available (Short, medium, long literature)** |
| **11. Custom Text / Exam Passage Mode** | Partially available | Available | Not found | Partially available | Available | **Available (Paste or select exam passages)** |
| **12. Multi-Language / Script Support** | Partially available | Partially available | Not found | Partially available | Available | **Available (English + Hindi/Exam translit)** |
| **13. Structured Typing Lessons** | Available | Partially available | Not found | Available | Not found | **Available (Home row to advanced drills)** |
| **14. Beginner Practice** | Available | Available | Not found | Available | Not found | **Available (Tactile anchor & finger guides)** |
| **15. Advanced Practice** | Available | Available | Not found | Available | Available | **Available (Code, numbers, difficult bigrams)** |
| **16. Typing Games** | Available | Available | Not found | Available | Not found | **Available (Word Cascade arcade defense)** |
| **17. Keyboard Visualization** | Available | Partially available | Not found | Available | Partially available | **Available (Interactive hand & finger guide)** |
| **18. Progress Tracking** | Available | Available | Not found | Available | Available | **Available (100% LocalStorage private trends)**|
| **19. User Accounts (Mandatory)** | Available | Available | Not found | Available | Available | **Not found (100% Privacy by Design, No login)**|
| **20. Test History & Trends** | Available (Cloud) | Available (Cloud) | Not found | Available (Local) | Available (Local/Cloud)| **Available (Local-first privacy persistence)** |
| **21. Certificates of Achievement** | Available | Available | Not found | Available | Not found | **Available (Downloadable / Printable SVG/PDF)** |
| **22. Indian Exam Modes (SSC CGL/CHSL)**| Not found | Not found | Not found | Partially available | Not found | **Available (Official 15-min / 2000 keystroke)** |
| **23. KDPH & Error Penalty Scoring** | Not found | Not found | Not found | Partially available | Not found | **Available (Full / Half mistake calculation)** |
| **24. Mobile & Touch Screen Usability** | Partially available | Partially available | Available | Not found | Partially available | **Available (Virtual keyboard overlay + iOS)** |
| **25. Accessibility (WCAG 2.1 AA)** | Partially available | Not found | Available | Not found | Partially available | **Available (ARIA labels, high contrast)** |
| **26. SEO & Pre-rendered Depth** | Available | Available | Partially available | Partially available | Not found | **Available (16+ SSG Pre-rendered pages)** |

---

## 2. Strategic Differentiation Insights

### 1. Features Common Across Competitors
- Basic 60-second typing test with real-time WPM calculation.
- Basic character/word error highlighting during typing.
- Accuracy percentage displayed at the end of the test session.

### 2. Features That Differentiate Leading Competitors
- **Monkeytype**: Minimalist, distraction-free aesthetic; smooth hardware-accelerated caret glide; deep statistical tracking (consistency, raw WPM, error breakdown); rich mode variety (time, words, quote, zen).
- **Typing.com**: Step-by-step touch-typing lesson curriculum with animated hands showing exact finger reach.
- **TypingTest.com**: Standardized 5-minute certificate test with downloadable diplomas recognized by traditional HR recruiters.
- **LiveChat**: Clean, fast-loading, single-page SEO powerhouse with zero ads and an authoritative FAQ accordion.

### 3. Features Missing Across the Competitive Landscape
- **Ad-Free Touch-Typing Education**: High-quality lessons are virtually all gated behind paywalls or buried under aggressive banner ads (Typing.com, TypingTest.com). Monkeytype has zero ads, but has zero lessons.
- **Modern, Free Indian Government Exam Preparation**: The Indian government recruitment market (SSC CGL, SSC CHSL, High Court, RRB NTPC) requires specific 10-minute and 15-minute formats, KDPH metrics, and strict Full/Half mistake penalties. The existing solutions are dated Windows desktop software trials or ad-cluttered regional blogs.
- **Zero-Login Privacy-Preserving Certificates**: Almost all platforms require users to register an account and surrender personal emails to receive a typing certificate.

### 4. Features That Provide Massive Competitive Advantage for CheckTypingSpeeds
1. **The Ultimate Hybrid Platform**: Combining Monkeytype's sleek, distraction-free engine + Typing.com's structured educational curriculum + TypingMaster's Indian exam rigor + TypingTest.com's certificates.
2. **Dedicated Indian Exam Simulator**: Real 15-minute SSC CGL DEST test with 2,000 keystroke passage, KDPH live counter, and official Full Mistake (1.0) / Half Mistake (0.5) evaluation against the 7% (UR) / 10% (Reserved) qualification limit.
3. **Interactive Touch-Typing Academy**: Free, ad-free, 10-lesson interactive touch-typing trainer guiding students through home row, top row, bottom row, and number row with finger placement visual feedback.
4. **Instant Client-Side Certificate**: Beautiful, shareable certificate card generated entirely in browser memory (zero server telemetry).

### 5. Features to Avoid (Unnecessary Complexity)
- **Mandatory User Accounts / Cloud Authentication**: Introduces privacy liabilities, cookie consent banners, and backend infrastructure overhead. 100% of user history, personal bests, and test configurations can be stored reliably in `localStorage`.
- **Intrusive Third-Party Ad Networks**: Degrades Core Web Vitals, increases LCP/CLS, causes input lag, and erodes trust.
