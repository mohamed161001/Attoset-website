# AttoSet Web — Engineering Guide

Marketing site for AttoSet (AI-powered Work OS). Project context: [`../CLAUDE.md`](../CLAUDE.md). Brand + design system: [`.claude/skills/attoset-brand/SKILL.md`](.claude/skills/attoset-brand/SKILL.md).

> ⚠️ This is **Next.js 16** — APIs and conventions differ from older versions. When unsure, read the bundled docs in `node_modules/next/dist/docs/` before writing code.

## Stack

- **Next.js 16** (App Router, `src/` dir, TypeScript, `@/*` alias)
- **Tailwind CSS v4** — config lives in `src/app/globals.css` via `@theme` (no `tailwind.config.js`)
- **Framer Motion** (`framer-motion`) for animation — animated components need `"use client"`
- **lucide-react** for icons
- **clsx** + **tailwind-merge** via `cn()` in `src/lib/utils.ts`

## Commands

```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # eslint
```

## Project structure

```
src/
  app/
    layout.tsx            # root layout: fonts, metadata, Navbar + Footer
    page.tsx              # Home
    globals.css           # Tailwind v4 theme + design tokens
    features/page.tsx
    pricing/page.tsx
    about/page.tsx
    contact/page.tsx
  components/
    ui/                   # primitives: Button, Badge, Container, SectionHeading, Reveal...
    layout/               # Logo, Navbar, Footer
    sections/             # composed page sections (Hero, FeatureGrid, AttoSection, CTA...)
    mockups/              # code-built product UI (table, kanban, dashboard, Atto panel)
  lib/
    utils.ts              # cn() helper
    content.ts            # site copy + data (nav, features, pricing, testimonials...)
public/images/            # generated atmospheric accents
```

## Conventions

- **Light mode only.** White / warm off-white backgrounds. No dark-mode media-query defaults.
- Server Components by default. Add `"use client"` only for interactivity/animation.
- All copy + structured data lives in `src/lib/content.ts` so it's editable in one place.
- Use design tokens (CSS vars / Tailwind theme) — never hardcode hex outside `globals.css`.
- Icons: `lucide-react`, stroke width ~1.5–1.75, consistent sizing.
- Animation: prefer a `Reveal` wrapper for scroll-in; respect `prefers-reduced-motion`.
