# 07 — URL Architecture & Content Hierarchy

**Date**: November 2026  
**Auditor**: Principal Information Architect & Technical SEO Specialist  
**Domain**: `https://checktypingspeeds.com`

---

## 1. URL Taxonomy & Canonical Structure

All URLs on CheckTypingSpeeds strictly follow these canonical standards:
1. **Trailing Slash Enforcement**: All directory-style URLs end with a trailing slash (`/path/`).
2. **Lowercase Only**: Strictly lowercase ASCII characters.
3. **No Dynamic Query URL Cannibalization**: Search intent is routed to clean, pre-rendered static canonical paths rather than parameter URLs (e.g., `/typing-test/1-minute/` rather than `/test?time=60`).
4. **Clean Topical Directory Hierarchy**:
   - `/typing-test/<duration>/` for timed duration tests.
   - `/typing-lessons/` for structured lesson curriculum.
   - `/touch-typing/` for touch-typing pillar guide.
   - `/ssc-typing-test/` for Indian government exam simulator.
   - `/typing-speed-chart/` for benchmark percentiles.

---

## 2. Complete Canonical Site Map & Content Architecture

```
https://checktypingspeeds.com/
│
├── [Core Testing Tools]
│   ├── /typing-speed-test/           (Comprehensive speed test with detailed analytics)
│   ├── /typing-test/1-minute/        (60-second speed check)
│   ├── /typing-test/2-minute/        (120-second cadence test)
│   ├── /typing-test/5-minute/        (300-second job screening test)
│   └── /typing-test/10-minute/       (600-second endurance test)
│
├── [Indian Exam Simulation Module - Market B]
│   └── /ssc-typing-test/             (SSC CGL DEST & CHSL 15m/10m simulator with KDPH & Full/Half mistakes)
│
├── [Learning & Educational Curriculum - Market A & B]
│   ├── /typing-lessons/              (10-step interactive touch typing course: home, top, bottom, numbers)
│   ├── /touch-typing/                (Definitive guide: biomechanics, anchor keys, posture, ergonomics)
│   └── /typing-practice/             (Targeted drills, difficult bigrams, common word sets)
│
├── [Gamification & Utilities]
│   ├── /typing-games/                (Word Cascade kinetic defense game)
│   ├── /wpm-calculator/              (Interactive Gross/Net WPM & KDPH conversion calculator)
│   └── /typing-speed-chart/          (Percentile tables, average WPM by age, career benchmarks)
│
├── [Methodology & Transparency]
│   ├── /how-wpm-is-calculated/       (ANSI 5-character formula, Net WPM, error penalties)
│   └── /methodology/                 (Monotonic timer hardware specifications, privacy design)
│
└── [Company & Legal Trust Anchors]
    ├── /about/                       (Mission, team, privacy-first commitment)
    ├── /contact/                     (Feedback form, bug reports, exam passage requests)
    ├── /privacy/                     (Zero keystroke logging guarantee, GDPR/CCPA compliance)
    ├── /terms/                       (Educational terms of service)
    └── /404/                         (Custom error page, noindex)
```

---

## 3. Internal Linking Architecture (Topic Cluster Silos)

### Silo 1: Timed Tests & Speed Verification
- The Homepage (`/`) and Speed Test (`/typing-speed-test/`) provide contextual breadcrumbs and navigational links to the specific timed tests (`/typing-test/1-minute/` through `/10-minute/`).
- Each timed test page links back to `/typing-speed-test/` and down into `/wpm-calculator/` and `/how-wpm-is-calculated/`.

### Silo 2: Educational & Touch-Typing Academy
- `/typing-lessons/` acts as the curriculum hub.
- Deep links into the foundational guide at `/touch-typing/`.
- Links forward into practical reinforcement at `/typing-practice/` and testing at `/typing-speed-test/`.

### Silo 3: Indian Competitive Examinations
- `/ssc-typing-test/` serves as the primary exam prep hub.
- Cross-links to `/wpm-calculator/` for KDPH conversion and to `/typing-test/10-minute/` for endurance practice.
- Educational content references `/how-wpm-is-calculated/` for official mistake penalty explanations.

### Silo 4: Foundational Authority & Formulas
- `/typing-speed-chart/` provides the global benchmark context, linking to `/typing-speed-test/` for testing and `/how-wpm-is-calculated/` for scoring formulas.
