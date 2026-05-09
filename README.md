# PRESTIGÉ — WEAR THE MINDSET

Pre-launch site for Prestigé, a unisex streetwear label out of Sydney. Drop No. 001 — coming 2026.

## STACK

- Next.js 14 — App Router, TypeScript strict
- Tailwind CSS — extended theme, no defaults
- GSAP + ScrollTrigger — scroll choreography, hero load sequence, lookbook pin
- Framer Motion — component-level interactions, route fades
- Lenis — smooth-scroll inertia (lerp 0.085)
- Embla — reserved for future carousels
- Raw WebGL — single fragment shader for hero grain

## RUN

```bash
pnpm install
pnpm dev
```

Node 20+. Open `http://localhost:3000`.

## STRUCTURE

```
app/                    Routes — App Router
  page.tsx              Landing / coming-soon
  lookbook/             Editorial mosaic
  drop/[slug]/          Product / drop detail
  manifesto/            Long-form
  cart/                 Cart page
  api/newsletter/       Stubbed POST handler
  opengraph-image.tsx   1200×630 OG
  icon.tsx              Halo-disc favicon
  not-found.tsx         404 — Off the grid

components/
  chrome/               Nav, Footer, Marquee, Lockup, HaloDot, GrainCanvas,
                        SmoothScroll, CustomCursor, BackgroundLerp, Icons
  type/                 Wordmark, Eyebrow
  motion/               Reveal, WordReveal, TypeIn, MagneticLink, SectionIndicator,
                        SydneyTime
  product/              ProductCard, ProductGrid, SizeRunner, ImageStack,
                        CartDrawer, LookbookStrip, ProductImage
  sections/             Hero, Promise, Newsletter

lib/
  products.ts           Mock product data — drop in real Shopify here
  shopify.ts            Shopify Storefront API integration stubs
  cn.ts, motion.ts      Helpers

public/
  brand/                Brand assets — drop wordmark / lockup PNGs here
  lookbook/             Studio photography — 01.jpg → 09.jpg, 4:5
```

## MOTION PRINCIPLES

- Easings are explicit: `--ease-out-expo` / `--ease-in-out-quart` / `--ease-out-back-soft`. No defaults.
- Hero load timeline runs once over ~2.4s. Letter-by-letter mask reveal with 45ms stagger.
- All in-view reveals: opacity 0→1, translateY 24px→0, 800ms.
- Section transitions lerp the page background between `--ink` and `--bone`.
- Custom cursor on `pointer: fine` only. Reduced-motion strips it entirely.
- Lookbook strip is GSAP ScrollTrigger pin + horizontal translate, scrub 0.6.

## BRAND TOKENS

```
--ink       #0A0A0A    primary background
--bone      #F4F1EC    inverted sections
--paper     #FFFFFF    product cutouts only
--ash       #1A1A1A    elevated surfaces
--smoke     #6B6B6B    secondary type
--concrete  #2A2A2A    1px hairlines
--halo-1    #FF1F8F    magenta — gradient stop
--halo-2    #FF6A00    orange  — gradient stop
--halo-3    #FFC400    amber   — gradient stop
```

The halo gradient appears only as: a thin 1.5px ring on the lockup disc, the focus ring,
the É accent in the hero wordmark, and the marquee bullet dot. Never as a button fill.

## TYPE

- Display: Anton (Google) — `var(--font-anton)`
- Wordmark: Bebas Neue (Google) — `var(--font-bebas)`
- Body / UI: Inter (Google) — `var(--font-inter)`

When licensed, swap Anton → Druk Wide Heavy, Inter → Neue Haas Grotesk in `app/layout.tsx`.

## SHOPIFY INTEGRATION

This site is wired as a **headless Shopify storefront**. Today, it reads from
`lib/products.ts` — a hand-curated mock layer that mirrors the eventual Shopify
shape. To go live:

1. Provision the Shopify store (Basic plan + Storefront API).
2. Set `.env.local`:
   ```
   SHOPIFY_STORE_DOMAIN=prestige.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=...
   ```
3. Implement the four functions in `lib/shopify.ts` against the Storefront GraphQL API.
4. In `lib/products.ts`, replace the static `PRODUCTS` array and `getProduct`
   helper with calls to `getAllProducts()` / `getProductByHandle()`.
5. Wire the Add-to-Cart button in `app/drop/[slug]/ProductActions.tsx` to
   `createCart` / `addCartLine`, and redirect to Shopify's hosted checkout URL.

Brand pages (Manifesto, Lookbook hero copy) stay in this repo — they're the
editorial layer, not the catalog.

## ALTERNATIVE: SHOPIFY-HOSTED PAGE EMBED

If the brief is instead to ship this as a custom Shopify page (Liquid theme),
extract the static markup of `app/page.tsx` into a `templates/page.coming-soon.liquid`
and inline the critical CSS. Fonts, Lenis, and the GSAP timeline run client-side
either way. Note: the View Transitions, Next/Image AVIF, and edge-rendered OG
require the headless setup; a Liquid embed gives them up.

## SCRIPTS

```
pnpm dev          start the dev server
pnpm build        production build
pnpm start        run the build
pnpm lint         eslint
pnpm typecheck    tsc --noEmit
```

## ASSETS TO POPULATE

- `public/lookbook/01.jpg` … `09.jpg` (and `-b`/`-c`/`-d` variants for product galleries)
- `public/brand/prestige-wordmark.svg` — master wordmark SVG, optional

The site renders skeleton states until images land — no broken slots.

## ACCESSIBILITY

- Keyboard nav with visible focus rings (gradient at 2px offset).
- `prefers-reduced-motion` honored — Lenis off, custom cursor off, reveals → 200ms fades.
- `prefers-color-scheme` is informational only — the site is dark by intent.

—

© 2026 Prestigé — All rights reserved — Sydney
