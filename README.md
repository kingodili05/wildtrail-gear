# WildTrail Gear

Luxury Tactical Expedition Outfitter — a Next.js 15 / React 19 e-commerce surface for hyper-premium outdoor engineering, off-grid power, broadcast-grade field streaming, and precision tools. Built for the WANNYMEMORY Vault ecosystem.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** strict mode
- **Tailwind CSS 3.4** — dark-first, custom tactical palette
- **Zustand 5** — cart state, persisted to localStorage; live-stream state ephemeral
- **react-three-fiber + drei + three** — 3D hero topographic mesh
- **framer-motion** — scroll-reveal + stagger
- **lucide-react** — interface iconography
- **Rajdhani** (display) + **Geist** (sans/mono) fonts

## 3D design choices

Per `DESIGN.md` "3D used like spice, not sauce." Three 3D moments:

1. **Hero** — `components/TerrainScene.tsx`. Animated wireframe topographic mesh + safety-orange dust particle field + slow camera drift. Disabled when `prefers-reduced-motion: reduce`. Loaded via `next/dynamic` with `ssr: false` so the R3F bundle stays out of the SSR critical path.
2. **TiltCard** — `components/TiltCard.tsx`. CSS-perspective 3D tilt on pointer move with radial glare. Used on category tiles and product cards. Skips touch input.
3. **Radar** — `components/Radar.tsx`. SVG-based animated radar sweep with intensity-tracked ping markers, sits in the live-stream sidebar. Reads as operator console.

`Reveal` and `Stagger` (`components/Reveal.tsx`) drive framer-motion scroll-reveals across the site.

## Palette

| Token | Hex | Role |
|---|---|---|
| `ink-950` | `#0A0A0A` | Primary surface — premium matte black |
| `ink-900` | `#111111` | Elevated panels |
| `ink-800` | `#1A1A1A` | Deep charcoal |
| `forest-700` | `#3A403A` | Tactical forest gray |
| `safety-500` | `#FF5722` | Razor-sharp interactive accent |
| `bone-50` | `#F5F2EC` | Tinted neutral on dark |

## File map

```
wildtrail-gear/
├── app/
│   ├── layout.tsx          # Root layout, fonts, nav/footer/cart drawer
│   ├── page.tsx            # Basecamp Hub — hero, categories, live, flagship grid, operator promise
│   ├── globals.css         # Tailwind base + component classes
│   ├── products/
│   │   └── page.tsx        # The Vault Inventory — filters + sort
│   └── live/
│       └── page.tsx        # Live stream page + telemetry
├── components/
│   ├── Nav.tsx             # Sticky nav, cart badge, LIVE pill, search trigger, mobile sheet
│   ├── Hero.tsx            # Fullscreen landscape, coordinates, animated stats
│   ├── CategoryGrid.tsx    # Three loadout tiles linking to filtered Vault
│   ├── LiveStreamModule.tsx# Interactive feed surface w/ telemetry sidebar
│   ├── ProductCard.tsx     # Zoom interaction, SKU, secure-cart entry
│   ├── ProductGrid.tsx     # Category + status filters, sort presets
│   ├── CartDrawer.tsx      # Slide-out drawer, totals, tax, shipping, protection
│   ├── SearchOverlay.tsx   # Cmd-K-style search overlay
│   ├── Footer.tsx          # Trust strip + 3-col link nav
│   └── Ticker.tsx          # Marquee safety strip
└── lib/
    ├── products.ts         # 7 hardcoded SKUs, full specs, stock posture
    ├── store.ts            # Zustand cart + live stores, totals math
    └── format.ts           # Currency, compact number, cn helper
```

## Run locally

```bash
cd wildtrail-gear
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build      # production build
npm run start      # production server
npm run typecheck  # TypeScript strict-mode check
npm run lint       # Next.js lint
```

## Cart math

- Tax: 8.5% flat (configurable in `lib/store.ts → TAX_RATE`)
- Shipping: $49 base, free when subtotal ≥ $5,000
- High-Ticket Protection: $79 flat, mandatory whenever any line item ≥ $2,000
- Totals computed in `computeTotals(items)` — pure function, no side effects

## Inventory

Seven SKUs, ranging from $1,250 to $8,500. Hardcoded in `lib/products.ts`. Each carries highlights, spec table, stock posture, and serialized SKU.

## Live stream

`useLive` store holds `{ isLive, viewers, startedAt }`. The on-screen module computes elapsed time live, with telemetry overlays. The `LIVE` pill in the nav reflects this state across the site.

## Notes

- All product imagery uses Unsplash with `auto=format&fit=crop&w=1600&q=80`. Swap to internal CDN for production.
- High-Ticket Protection price/threshold sits in `lib/store.ts` constants near the top of the function.
- Zustand state persists under `wildtrail-cart-v1` — bump the version when shipping a schema change.
- Accessibility: all interactive surfaces carry visible `focus-ring`, modal traps are wired with Escape close, drawer respects body scroll lock.
