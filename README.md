# Global + India Typing Test Platform

A high-performance, accessible, and privacy-first typing test and practice platform designed to achieve search and answer-engine dominance (#1 ranking target) across global and Indian typing queries.

## Key Features & Architecture
- **Speed & Latency**: Local keystroke calculation via monotonic time (`performance.now()`); zero network requests per key.
- **SEO & Discoverability**: Full static HTML prerendering for public routes, valid JSON-LD structured data, clean canonical URLs, and XML sitemaps.
- **Topical Intent Coverage**: Pre-configured timed test routes (1m, 2m, 5m, 10m), touch typing lessons, and WPM calculators.
- **UX & Accessibility**: WCAG 2.2 AA engineering target, light/dark themes, responsive down to 360px viewport, and keyboard-first accessibility.
- **Privacy by Design**: No account required for core testing; zero keystrokes or typed text logged or transmitted.

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

# Production build (Client + SSR + Prerender)
npm run build
```

