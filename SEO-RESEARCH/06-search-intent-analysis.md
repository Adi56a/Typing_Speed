# 06 — Search Intent Analysis & SERP Classification

**Date**: November 2026  
**Auditor**: Senior Technical SEO & Search Intent Strategist  
**Scope**: Search intent mapping across all primary user journeys and search engines (Google, Bing, Yahoo, DuckDuckGo)

---

## 1. Intent Taxonomy & User Journey Framework

Search intent in the typing domain is divided into four distinct operational stages:

```
+-------------------------------------------------------------------------+
|                          SEARCH INTENT FUNNEL                           |
|                                                                         |
|  1. INFORMATIONAL / EXPLORATORY                                         |
|     "what is touch typing", "what is a good typing speed",              |
|     "how is wpm calculated", "ssc cgl typing test rules"                |
|     --> Target: In-depth guides, tables, formulas, FAQ rich snippets    |
|                                                                         |
|  2. EDUCATIONAL / INSTRUCTIONAL                                         |
|     "learn touch typing", "home row typing lessons",                    |
|     "free typing lessons online", "finger placement on keyboard"        |
|     --> Target: Interactive structured curriculum with visual hints     |
|                                                                         |
|  3. TRANSACTIONAL / UTILITY                                             |
|     "typing test", "typing speed test", "1 minute typing test",         |
|     "ssc cgl typing practice", "wpm calculator"                         |
|     --> Target: Immediate interactive app workspace, zero friction      |
|                                                                         |
|  4. VERIFICATION / CREDENTIALING                                        |
|     "typing certificate online free", "typing test for job application" |
|     --> Target: High-credibility certificate card, net WPM proof        |
+-------------------------------------------------------------------------+
```

---

## 2. Intent-to-Page SERP Mapping Table

| Search Query | Query Intent | SERP Expectations & User Goal | Best Page Mapping | Required Features to Satisfy Intent |
|---|---|---|---|---|
| `typing test` | Direct Transactional | Wants an instant typing test to type immediately with zero clicks or popups. | `/` | Pre-focused typing area, clear timer, instant keystroke feedback. |
| `typing speed test` | Transactional / Evaluative | Wants to check words per minute and accuracy percentage with detailed results. | `/typing-speed-test/` | Gross WPM, Net WPM, accuracy, consistency %, error breakdown. |
| `1 minute typing test` | Specific Transactional | Wants exactly 60 seconds of typing to test daily speed. | `/typing-test/1-minute/` | Preset 60s timer, instant start on first keystroke, retake shortcut. |
| `5 minute typing test` | Specific Transactional / Professional | Wants formal 300-second stamina test simulating job screening tests. | `/typing-test/5-minute/` | Preset 300s timer, longer passage bank, stamina pace feedback. |
| `ssc typing test` / `ssc cgl typing test` | High-Stakes Exam Prep | Candidate preparing for SSC CGL Tier 2 DEST or CHSL typing exam. | `/ssc-typing-test/` | 15m/10m duration, 2000 keystroke passage, KDPH counter, Full/Half mistake scoring. |
| `typing lessons` / `learn touch typing` | Educational / Progressive | Beginner looking to learn touch typing from scratch without looking down. | `/typing-lessons/` | Progressive 10-lesson module (Home Row -> Top Row -> Bottom Row -> Numbers), visual finger guide. |
| `touch typing` | Authoritative Informational | Learner seeking comprehensive understanding of touch typing biomechanics. | `/touch-typing/` | Pillar content: anchor keys, ergonomics, muscle memory, practice recommendations. |
| `typing speed chart` | Informational / Comparative | User asking "Is my typing speed normal?" or "What WPM do I need for a job?". | `/typing-speed-chart/` | Percentile tables, career speed requirements, age-based averages, visual speed tiers. |
| `how is wpm is calculated` | Informational / Mathematical | Student, teacher, or engineer looking for the exact formula. | `/how-wpm-is-calculated/` | Mathematical equations, ANSI 5-character word standard, Net WPM deduction rules. |
| `wpm calculator` | Interactive Utility | User with keystroke counts and time who wants to compute WPM/CPM/KDPH. | `/wpm-calculator/` | Dual calculator for keystrokes/time and KDPH-to-WPM conversions. |

---

## 3. Search Engine Algorithm Nuances (Google vs. Bing)

### Google Search Intent Criteria
- **Immediate Interactive Utility (Core Web Vitals)**: Google heavily favors pages where the primary tool is immediately functional above the fold without layout shifting or heavy ad injection.
- **Helpful Content System (E-E-A-T)**: Requires genuine first-party expertise, original methodology descriptions, and clear operational details rather than generic AI rehashes.
- **Featured Snippets & Direct Answers**: Formatted table schemas and structured FAQ schemas trigger direct SERP answer cards for queries like *"What is a good typing speed?"* and *"How is WPM calculated?"*.

### Bing & Copilot (Grounding / GEO)
- **Document Precision & Semantic Density**: Bing places high value on well-ordered semantic HTML headings (`h1` -> `h2` -> `h3`), keyword proximity in subheadings, and complete schema markup.
- **IndexNow Integration**: Bingbot uses the IndexNow protocol to instantly index newly published or updated URLs within minutes of deployment.
- **Copilot Grounding**: Clear entity descriptions (`Organization`, `WebApplication`, author credentials, methodology) ensure AI summaries in Bing Chat / Microsoft Copilot accurately cite CheckTypingSpeeds.
