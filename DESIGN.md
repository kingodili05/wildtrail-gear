# WildTrail Gear — Design System

## Aesthetic lane
**Premium retailer × pro-spec catalog.** Sub-lanes: B&O-grade product photography × Saks Fifth Avenue navy restraint × engineered specsheet precision × Adorama category-leadership cues.

NOT: tactical dark monolith (previous pass — too cosplay for this catalog), generic Shopify cream, fintech navy-and-gold, Web3 glassmorphism, candy-bright sale-flyer red.

## Color strategy — Light retailer body, navy authority surfaces, red as razor

The catalog mostly lives on a warm ivory body. Dark navy carries the brand-statement surfaces (hero, footer, key cells). Red appears as a flagged accent on sale prices, CTAs, and a single deliberate marker per fold — never decorative.

```
navy-950  #050A1F   deepest navy, hero contrast, footer
navy-900  #0A1733   primary brand surface
navy-800  #0F2147   elevated panels
navy-700  #173063   secondary panels, photography overlay
navy-600  #1F4083   interactive hover
navy-500  #2C5AA8   links and active states
navy-400  #4F7DCE   muted accent on dark
ivory-50   #FAFAF7  primary light surface (warm white)
ivory-100  #F2F1EB  alternating panel
ivory-200  #E2E0D6  hairline rule contrast on light
graphite-700 #2D2D27 body text on light
graphite-500 #67675E muted text on light
graphite-300 #B5B5AC tertiary text on light
red-700   #9B1A21   pressed CTA
red-600   #BF252D   sale chip
red-500   #DD2A2A   primary accent · CTA · razor
red-400   #E85059   hover state
```

No `#000`. No `#fff`. Ivory is warmed toward yellow; navy is cooled toward true blue — palette stays decisive, not muddy. Red sits at a single saturation point so it never reads as a different brand.

## Typography
- **Display:** **Rajdhani** 500/600/700 — geometric condensed sans with technical-spec authority. Replaces editorial serif reflex and the generic Inter/DM-Sans default.
- **Body:** **Geist Sans** 400/500/600 — neutral, sharp, legible at 14px.
- **Mono:** **Geist Mono** — telemetry, serial numbers, coordinates.

Rajdhani specifically chosen *against* the reflex-reject list (Inter, DM Sans, Space Grotesk, Plus Jakarta, Outfit, Instrument Sans, Plex). It is unmistakably tactical, not "AI creator brand."

Scale: `clamp()` everywhere. ≥1.3 step ratio. Light text on dark gets 1.65–1.75 line-height.

## Layout
- Max content: 1440px. Generous horizontal padding `clamp(24px, 5vw, 80px)`.
- Section spacing `clamp(96px, 12vw, 160px)`.
- Grids: hairline (1px) gap between cells, background-color reveals the line. Never thick borders.
- Cards used sparingly. Category tiles, product cards, footer trust strip ARE cards (right affordance).
- No nested cards. No `border-radius` above 4px on functional UI. Pills only get `rounded-none` here — sharp corners signal engineered.

## 3D treatment — used like spice
Two planned 3D moments. Each must justify its weight (target <80kb gzipped for R3F bundle).

1. **Hero canvas — Topographic terrain mesh.** R3F scene. Animated wireframe contour grid with slow camera drift and dust particle field. Sets the "operator at altitude" tone. Renders behind hero copy with reduced opacity. Disabled when `prefers-reduced-motion: reduce`.

2. **Card tilt on pointer move.** Category tiles and product cards get a max-±8° tilt with 1.04 scale on pointer enter. Pure CSS perspective + transform3d driven by JS pointer events. No library overhead.

3. **Bonus — scroll-driven parallax.** Hero image translates Y at 0.25× scroll. Stops at viewport boundary. CSS-only via `transform: translateY(...)` with rAF-throttled scroll listener.

## Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` everywhere. No bounce. No elastic.
- Page-in stagger uses `framer-motion` with 80ms per sibling.
- Hover: only transform, opacity, color, filter. Never layout.
- Reduced motion respected globally — every animation collapses to instant.

## Iconography
- **Lucide-React** only. 1.5px stroke. 16-24px default.
- No emoji anywhere. No competing icon sets.
- Logo: square chip `WT` in safety-600, wordmark in Rajdhani 700.

## Imagery
- Unsplash photography keyed for: alpine dusk, generator under shop light, drone above tree line, Damascus steel macro, satellite uplink case.
- Treatment: 8-12% desaturation, +4% contrast, very slight grain overlay for film texture. Applied via CSS `filter` so we don't reprocess source files.

## Components contract
- Every interactive surface carries visible `focus-ring` (safety-500 outline at 2px offset).
- Drawer + modal: escape closes, body-scroll-locked, backdrop click closes, focus trap on open.
- All buttons square corners (`radius: 0` or `radius-xs: 2px`).
- Pills are sharp rectangles. Never `rounded-full`.

## Bans (project-specific, on top of impeccable global)
- No `rounded-full` chips.
- No `border-left: 4px solid var(--accent)` stripe on cards.
- No `text-fill: gradient` / `bg-clip-text` on display type.
- No glassmorphism (`backdrop-blur` is allowed on nav scrim only).
- No emoji icons anywhere in production HTML.
- No 3D for 3D's sake. If a 3D element doesn't pass the "would removing this hurt the brand?" test, it goes.
