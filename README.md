# CheckTypingSpeeds (checktypingspeeds.com)

A high-performance, accessible, and privacy-first typing test and touch-typing platform designed for maximum organic search dominance and high traffic on **checktypingspeeds.com**.

## Key Features & Architecture
- **Canonical Domain**: `https://checktypingspeeds.com`
- **Speed & Precision**: Monotonic hardware timestamps (`performance.now()`); sub-millisecond precision with zero interval drift and zero network keystroke latency.
- **Organic Search (SEO/AEO/GEO)**: Full static HTML prerendering (SSG) for 16 canonical routes, rich JSON-LD structured data (`WebSite`, `Organization`, `WebApplication`, `FAQPage`, `BreadcrumbList`), OpenGraph / Twitter Cards, XML sitemap, and robots.txt.
- **Topical Intent Coverage**: 1-minute, 2-minute, 5-minute, and 10-minute speed checks, touch-typing finger guide, WPM calculators, and kinetic typing arcade defense (Word Cascade).
- **UX & Accessibility**: WCAG 2.2 AA compliant contrast, custom Logo Spruce & Mountain Sunset color palette, light/dark modes, full-screen distraction-free mode.
- **Privacy by Design**: No mandatory account registration, zero keystroke logging, 100% client-side scoring in browser memory.

## Project Documentation
- [Product Requirements Document (PRD)](./docs/PRD.md)
- [SEO, AEO & GEO Strategy](./docs/SEO.md)
- [Development Phases & Progress Tracker](./docs/PHASES.md)

## Development Workflow

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### Commands
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run unit tests
npm test

# Check linting
npm run lint

# Format code
npm run format

# Production build (Client + SSR + SSG Prerender for checktypingspeeds.com)
npm run build
```
