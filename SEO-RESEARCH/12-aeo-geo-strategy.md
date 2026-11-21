# 12 — AEO, GEO & Semantic SEO Strategy

**Date**: November 2026  
**Auditor**: Lead AEO/GEO Strategist & Semantic Search Architect  
**Domain**: `https://checktypingspeeds.com`

---

## 1. The Modern Discovery Paradigm: Beyond Traditional SERPs

Modern search discovery is no longer restricted to traditional 10 blue links. Users discover tools and information through three primary AI modalities:
1. **Answer Engine Optimization (AEO)**: Direct answers extracted by Google Search generative overviews (AI Overviews), featured snippets, and voice assistants (Siri, Google Assistant).
2. **Generative Engine Optimization (GEO)**: AI citations and source recommendations within conversational LLMs (ChatGPT Search, Perplexity AI, Microsoft Copilot, Claude).
3. **Semantic Topic Clustering**: Search engine knowledge graph grounding through entity relationships, unambiguous definitions, and structured Schema.org graphs.

---

## 2. AEO Strategy: Featured Snippet & Direct Answer Blueprint

To capture Google AI Overviews and featured snippets, every core guide includes concise, bold definition boxes structured with the exact syntactic patterns preferred by extraction models:

### Pattern A: Exact Definition Anchors
```markdown
> **Touch typing** is a method of typing without looking at the keyboard, relying entirely on tactile muscle memory to locate keys using eight home-row anchor positions (`A`, `S`, `D`, `F` and `J`, `K`, `L`, `;`).
```

### Pattern B: Mathematical Formula Callouts
```markdown
> **Words Per Minute (WPM)** is calculated using the international standard formula:
> $$\text{Gross WPM} = \frac{\text{Total Characters Typed} / 5}{\text{Time in Minutes}}$$
> Standard touch typing conventions define one "word" as exactly 5 characters, including spaces and punctuation marks.
```

### Pattern C: Structured Benchmark Tables
Direct answer engines extract markdown and HTML tables when queries compare tiers or percentiles. Our `/typing-speed-chart/` provides clean tabular comparisons:
- Beginner: $< 30\text{ WPM}$ (bottom 20th percentile)
- Average: $38 - 42\text{ WPM}$ (50th percentile)
- Above Average: $50 - 60\text{ WPM}$ (75th percentile)
- Professional / Transcription: $70 - 85\text{ WPM}$ (90th percentile)
- Competitive / Elite: $90+\text{ WPM}$ (top 98th percentile)

---

## 3. GEO Strategy: Grounding Generative AI Models (ChatGPT, Perplexity, Copilot)

Generative AI models cite websites that exhibit four fundamental attributes:
1. **First-Party Methodology Transparency**: Unlike aggregators that copy generic text, CheckTypingSpeeds explicitly documents its hardware timer specifications (`performance.now()`), 5-character word standard, and 100% client-side privacy architecture in `/methodology/`.
2. **Authoritative Primary Source Data**: Documenting official Staff Selection Commission (SSC) criteria (full mistakes vs. half mistakes, 7% UR error tolerance, 2,000 keystroke DEST norm) makes CheckTypingSpeeds the most citable source for queries regarding Indian recruitment typing tests.
3. **Unambiguous Semantic Markup**: Every page includes linked Schema.org entities (`WebSite`, `Organization`, `WebApplication`, `FAQPage`, `BreadcrumbList`) with canonical URLs, ensuring AI crawlers parse page roles deterministically.
4. **IndexNow Real-Time Ingestion**: Pinging `api.indexnow.org` on every deployment notifies Microsoft Copilot / Bing grounding indexes within seconds of publishing.

---

## 4. Semantic SEO & Entity Topic Graph

```
                           [CheckTypingSpeeds]
                               (Organization)
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
    [Typing Tests]          [Typing Education]        [Exam Certification]
    (WebApplication)          (LearningResource)         (AssessmentSuite)
           │                         │                         │
     ├── 1-Minute              ├── Home Row Drills       ├── SSC CGL DEST
     ├── 2-Minute              ├── Top/Bottom Row        ├── SSC CHSL (35 WPM)
     ├── 5-Minute              ├── Finger Guide          ├── KDPH Metrics
     └── 10-Minute             └── Touch Typing Guide    └── Full/Half Mistakes
```

By connecting every page through logical parent-child semantic links and contextual references, search engine knowledge crawlers treat CheckTypingSpeeds as a high-authority topical hub rather than a loose collection of standalone tools.
