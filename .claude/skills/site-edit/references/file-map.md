# Attoset site — file map

Everything below is relative to `attoset-web/`.

## Pages → sections (render order)

| Page | Route | Sections, in order |
|---|---|---|
| Home | `src/app/page.tsx` | `Hero` · `FeatureCards` · `PlatformHub` · `ProductShowcase` · `AutoForge` · `ViewsSection` · `HowItWorks` · `UseCases` · `SecuritySection` · `FAQ` · `CTA` (`FeatureGrid` imported but commented out) |
| Features | `src/app/features/page.tsx` | `PageHeader` · `AttoSection` · `AutoForge` · `ViewsSection` · `FeatureGrid` · `SecuritySection` · `CTA` |
| Pricing | `src/app/pricing/page.tsx` | `PageHeader` · `PricingSection` · `FAQ` · `CTA` — **hidden from the navbar** |
| About | `src/app/about/page.tsx` | `PageHeader` · inline mission/values/careers blocks · `Stats` · `CTA` |
| Contact | `src/app/contact/page.tsx` | fully inline (no section components) + `ContactForm` |

Anchor ids (used by nav links): `#features` · `#atto` · `#autoforge` · `#agents` · `#collaboration` · `#security`.
All carry `scroll-mt-*` so the sticky navbar doesn't cover the heading.

Unused-on-any-page right now: `feature-grid` (Features only), `agents-section`, `collaboration`,
`linked-records`, `logo-cloud`, `testimonials`, `value-props`. They exist and are wired — drop one
into a page's JSX to bring it back.

## Sections → their code-built visuals

| Section | Mockup component(s) in `src/components/mockups/` |
|---|---|
| `hero` | `hero-stage` (real `app-table.webp` screenshot + floating cards, cursors) |
| `feature-cards` | `atto-avatar`, plus `building-blocks` |
| `platform-hub` | `logo-hub` (mark + orbiting capabilities) |
| `product-showcase` | `table-collab`, `workflow-flow`, `dashboard-customize` |
| `views-section` | `table-view`, `kanban-view`, `calendar-view`, `gantt-view` |
| `atto-section` | `atto-panel` |
| `agents-section` | `agents` |
| `collaboration` | `collaboration-chat` |
| `linked-records` | `record-graph` |
| `cta` | `cta-float` |
| shared chrome | `app-window`, `screenshot-frame` |

## Content store — `src/lib/content.ts`

Exports: `site` · `ctaHref` · `nav` · `features` · `views` · `useCases` · `howItWorks` ·
`security` · `testimonials` · `customers` · `stats` · `integrations` · `pricing` · `faqs` · `valueProps`.

`ctaHref` is the **waitlist form URL** — every "Start building" / "Get started" button points there,
not at a signup route. Change it in one place.

## Product terms

- **Atto** — the built-in AI assistant.
- **AI Agents** — autonomous agents that execute work.
- **AttoForge** — the repeatable-work-at-scale engine: build one *template* → clone into managed
  *instances* → roll up into one *portfolio dashboard*. The code identifiers and file are still
  `AutoForge` / `auto-forge.tsx`; only the user-visible name is AttoForge. Never mention Smartsheet.
- **Building blocks / "Lego for work"** — Tables (orange) · Forms (purple) · Automations (blue) ·
  Dashboards (green), each with its own color + icon, snapping into a solution (`building-blocks.tsx`).

## Assets

- `public/images/` — `app-table.webp` (hero LCP image), `avatars/p1–p5.jpg`.
- Visuals are **built in code**, not generated. Don't add generated/stock imagery.
- `src/app/icon.png`, `opengraph-image.tsx`, `twitter-image.tsx` — favicon and social cards.

## Scripts

- `scripts/shot.mjs` — the screenshot/overflow tool this skill uses.
- `scripts/responsive-check.mjs` — older overflow sweep, expects a production server on `:3100`.
- The `scripts/verify*.mjs`, `cards*.mjs`, `v1x.mjs` files are one-off leftovers from past sessions.
  Don't extend them — use `shot.mjs`.
