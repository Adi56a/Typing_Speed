# SEO Architecture Notes & Project Inspection

Audit & Inspection Date: 2026-11-26

## 1. Project Mechanics & Architecture Answers

| Question | Answer | Details / File Locations |
| :--- | :--- | :--- |
| **How are pages prerendered to static HTML?** | Custom Node.js SSG script using Vite SSR bundle and `ReactDOMServer.renderToString`. | `package.json` runs `build` -> `tsc -b && vite build && npm run prerender`.<br/>`npm run prerender` executes `npm run build:ssr && node scripts/prerender/prerender.js`.<br/>`vite build --ssr src/entry-server.tsx --outDir dist/server` bundles `entry-server.js`.<br/>`scripts/prerender/prerender.js` dynamically imports `render` and `getRoutes` from `dist/server/entry-server.js`, generates static HTML for each canonical route, and writes `dist/<route>/index.html`. |
| **Where is the list of prerendered routes?** | `src/seo/routes.ts` (`ROUTE_LIST` / `routes`) | Exported to `src/entry-server.tsx` in `getRoutes()`, which is called by `scripts/prerender/prerender.js`. Client routing handles matching paths in `src/app/App.tsx`. |
| **How are `<title>`, meta, canonical, and JSON-LD set per page?** | Server-side head injection inside `src/entry-server.tsx` + client-side sync in `src/app/App.tsx`. | In `src/entry-server.tsx` inside `render(url)`, head tags are constructed using metadata from `src/seo/routes.ts` and structured data from `src/seo/structuredData.ts`. The HTML output replaces `<!--app-head-->` in `index.html`. |
| **Where is `sitemap.xml` produced?** | Build script in `scripts/prerender/prerender.js`. | Generates dynamic XML containing canonical URLs and writes to both `dist/sitemap.xml` and `public/sitemap.xml`. |
| **Where is the site hosted?** | **Cloudflare Pages** | Configured via `public/_headers` (headers/caching) and `public/_routes.json` (routing rules) deployed from the `dist/` directory. |
| **Where are the fonts loaded?** | `index.html` lines 36–41 | Currently loaded via Google Fonts CDN (`fonts.googleapis.com` and `fonts.gstatic.com`) for Inter and JetBrains Mono. |

---

## 2. Key References for Ongoing Issues
- **The Prerender Route List**: `src/seo/routes.ts`
- **The Head Component & Server Renderer**: `src/entry-server.tsx`
- **The Prerender Engine**: `scripts/prerender/prerender.js`
- **The Hosting Configuration**: `public/_headers` and `public/_routes.json` (Cloudflare Pages)
- **The Client Router / Shell**: `src/app/App.tsx` and `src/main.tsx`
