# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Next.js dev server (http://localhost:3000)
npm run build      # Production build — run this to catch route/type errors
npm run start      # Serve the production build
npm run lint       # next lint (ESLint)
npm run typecheck  # tsc --noEmit — strict TypeScript check, no test suite exists
```

There is no test framework. Verification is `npm run typecheck` + `npm run build`. Git remote: `origin` → https://github.com/varghesefeba/msgbridge.git (branch `main`).

## What this is

Marketing/product website for **MsgBridge** (an Indian SMS / WhatsApp / RCS / Voice messaging platform), built on **Next.js 14 App Router** (server components by default), **TypeScript (strict)**, and **Tailwind CSS 3**. Deployed to `https://msgbridge.in`. There is no backend, database, or API — all content is static data compiled into the bundle.

## Architecture

### Content is data, pages are thin, templates do the rendering

The core pattern for the large families of pages (products, solutions, industries, services) is a three-layer split. Understand this before adding or editing any such page:

1. **`lib/content/*.ts`** — the content itself, as typed arrays of objects. `products-a.ts` + `products-b.ts` (`ProductPage[]`), `solutions.ts`, `industries.ts` (+ `longTailSectors`), `services.ts`. Every object is keyed by a `slug` that matches its URL (e.g. `/sms/otp`). `lib/content/index.ts` re-exports everything, merges the two product files into `products`, and exposes `getProduct/getSolution/getIndustry/getService(slug)` lookups plus `resolveLabel(slug)` (turns any slug into a display name, with `specialLabels` overrides).

2. **`lib/types.ts`** — the shape of every content object (`ProductPage`, `SolutionPage`, `IndustryPage`, `ServicePage`, and shared `FAQ`, `CodeExample`, `LiveExample`). Editing content means conforming to these interfaces; `npm run typecheck` enforces it.

3. **`components/templates/*Template.tsx`** — one template per content type (`ProductTemplate`, `SolutionTemplate`, `IndustryTemplate`, `ServiceTemplate`, plus `DevApiTemplate`, `ProseTemplate`). Templates receive a data object and render the full page.

Each `app/**/page.tsx` in these families is boilerplate: define `const SLUG`, look the data up, `notFound()` if missing, render the template, and `generateMetadata()` from the same data (setting `alternates.canonical` to the slug). Follow `app/sms/otp/page.tsx` exactly when creating one.

**To add a product/solution/industry/service page:** add the object to the relevant `lib/content` file, then create the thin `app/.../page.tsx`. Standalone pages (home, about, pricing, legal, blog, developers) are hand-built and don't use this pattern.

### `draft?: boolean`

Many content objects and nav links carry `draft: true`, meaning the offering isn't fully confirmed. Templates render a `Callout` disclaimer for draft pages; the nav (`lib/nav.ts`) flags draft links. Preserve `draft` flags — don't silently promote a page to non-draft.

### SEO metadata system (blueprint-driven)

Per-page SEO copy lives centrally, not scattered across pages:

- **`lib/page-seo.ts`** — auto-generated map `PAGE_SEO[slug] = { title, description, intro }` derived from the SEO content blueprint. `title` is used absolutely (already ends with "| MsgBridge"), `description` is the meta description, `intro` is the opening paragraph rendered near the top of the page.
- **`lib/seo.ts`** — `getPageSeo(slug)` and `buildMetadata(slug, fallback?)`. Every content page's `generateMetadata` and every standalone page's `metadata` calls `buildMetadata(SLUG)`, which sets an absolute title, description, self-referencing canonical, and Open Graph/Twitter fields.
- Templates render `getPageSeo(data.slug)?.intro` as the crawlable opening paragraph and emit `BreadcrumbList` (all four) and `FaqJsonLd` (products, services) structured data via **`components/seo/JsonLd.tsx`**.
- To change a page's title/meta/opening, edit `lib/page-seo.ts`. To add a new page, add its slug there too.

### No pricing

Pricing has been removed entirely: no `/pricing*` routes, no pricing nav menu, no per-product `price` or per-service `cost` fields/sections, no rate cards or estimators. `/pricing` and `/pricing/:path*` 301-redirect to `/contact` (`next.config.mjs`). Do not reintroduce pricing pages, `price`/`cost` type fields, or "see pricing / rate card" copy.

### Navigation and SEO are kept in sync by hand

- **`lib/nav.ts`** is the single source of truth for header/footer menus (`primaryMenus`, `footerLegal`), consumed by `components/nav/{Header,Footer,MobileDrawer}.tsx`.
- **`app/sitemap.ts`** and **`app/robots.ts`** generate SEO output. `sitemap.ts` combines a hand-maintained `STATIC_ROUTES` list with dynamic slugs pulled from the content arrays. When you add a page, add its route to `STATIC_ROUTES` (content-array pages are already covered by the dynamic spread) and, if user-facing, to `lib/nav.ts`.
- Redirects for legacy URLs live in `next.config.mjs`.
- Global metadata, favicon, fonts, and JSON-LD Organization/WebSite schema are set in `app/layout.tsx`.

### Motion system (server-component-friendly reveals)

Scroll animations are driven by **CSS + one client observer**, so server components animate without shipping their own JS:

- A single `RevealEngine` (`components/motion/RevealEngine.tsx`, mounted once in `layout.tsx`) runs an `IntersectionObserver` over every `[data-reveal]` / `[data-draw]` element, setting `data-in="true"` when visible. It re-scans on route change and via `MutationObserver`.
- Server components opt in by rendering the `<Reveal>` component (`components/ui/Reveal.tsx`) — a plain wrapper that emits `data-reveal` attributes and `--reveal-delay` / stagger CSS vars. **No component should hand-roll its own IntersectionObserver.**
- The actual animation (variants `rise/fall/left/right/scale/blur/clip`, stagger, SVG path draw, `prefers-reduced-motion` fallbacks) is defined in `app/globals.css` under "Scroll reveal". A `<noscript>` block in `layout.tsx` forces everything visible without JS.
- Other client motion helpers (`CountUp`, `Magnetic`, `Marquee`, `Spotlight`, `PageTransition`, `Backdrop`) live in `components/motion/`.

### Styling

- Design tokens live in **two** places that must stay consistent: Tailwind theme (`tailwind.config.ts` — brand `lime` palette, `ink`/`paper` surfaces, channel colors, custom radii/shadows/durations/easings) and CSS custom properties in `app/globals.css` (`:root` font-size scale, `--nav-h`, easing vars). `--nav-h` (nav height) is used across layout offsets — change it in one place.
- Fonts are `next/font/google` (Montserrat display, Inter body, JetBrains Mono), wired as CSS variables in `layout.tsx` and referenced by the `font-display/body/mono` Tailwind families.
- Prefer existing primitives in `components/ui/` (`Button`, `Eyebrow`, `Reveal`, `Accordion`, `CodeCard`, `DeviceMessage`, `Stepper`, `CTABand`, `Callout`, etc.) over new markup.

### Code snippet highlighting

`lib/highlight.ts` is a small regex tokenizer (shell/js/python/json) used by `CodeCard` to render API examples from the `CodeExample` objects in content. It's dependency-free — no Prism/Shiki.

## Path alias

`@/*` maps to the repo root (`tsconfig.json`), e.g. `@/lib/content`, `@/components/ui/Button`.
