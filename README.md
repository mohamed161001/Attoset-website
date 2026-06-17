# Attoset — Marketing Website

The marketing website for **Attoset**, an AI-powered Work Operating System that lets organizations build, manage, automate, and scale their operations in one unified platform.

The Next.js application lives in [`attoset-web/`](./attoset-web).

## Stack

- **Next.js 16** (App Router, TypeScript, `src/` dir)
- **Tailwind CSS v4** (theme configured in `src/app/globals.css`)
- **Framer Motion** (via `LazyMotion` / `m` for a lean client bundle)
- **lucide-react** icons

## Getting started

```bash
cd attoset-web
npm install
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
.
├── attoset-web/        # Next.js application (the website)
│   ├── src/app/        # routes, layout, metadata, sitemap/robots/manifest, OG image
│   ├── src/components/  # ui, layout, sections, mockups
│   └── src/lib/         # site content + helpers
├── Assets/             # source brand assets & design references
└── CLAUDE.md           # project overview & working agreement
```

## SEO & performance

- File-based SEO conventions: `sitemap.ts`, `robots.ts`, `manifest.ts`, generated Open Graph / Twitter images, per-page canonical URLs, and JSON-LD structured data (Organization, WebSite, SoftwareApplication, FAQPage).
- Performance-tuned: CSS-only scroll reveals, lazily-loaded animation features, WebP imagery, and an LCP-safe hero (Lighthouse mobile performance ~90+).

## Brand

- **Colors:** Black `#000000` · White `#FFFFFF` · Accent Orange `#FF512A`
- **Mode:** light mode only.

## Deployment

Optimized for [Vercel](https://vercel.com). Connect the repository and set the project root to `attoset-web/`.
