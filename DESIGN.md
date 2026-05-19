# WildTrail Gear — Design System

## Aesthetic lane
**Luxury tactical / engineered minimalism.** Sub-lanes: Aesop restraint × Linear precision × Sitka palette × Apple-grade 3D product moments.

NOT: editorial-magazine, dark glass / Web3, neon cyberpunk, warm-coastal, generic SaaS-creator.

## Color strategy — Drenched dark with razor accent

```
ink-950  #0A0A0A   primary surface, almost ~70% of all pixels
ink-900  #111111   elevated panels and dividers
ink-800  #1A1A1A   secondary surface (deep charcoal)
ink-700  #222222   hairline contrast for borders
forest-700 #3A403A tactical forest gray — used for moss accents only
forest-600 #4A524A subtle dust tint on photography
safety-500 #FF5722 razor accent (≤10% of any view)
safety-600 #D9461A primary CTA fill
bone-50  #F5F2EC  tinted neutral for body text on dark
bone-300 #9C9580  muted text on dark
```

No `#000`. No `#fff`. Every neutral is OKLCH-equivalent (tinted toward the forest hue).

## Typography
- **Display:** **Rajdhani** 500/600/700 — geometric, condensed, military-precision feel. Cap height tight to baseline.
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
Three planned 3D moments. Each must justify its weight (target <80kb gzipped for R3F bundle).

1. **Hero canvas — Topographic terrain mesh.** R3F scene. Animated wireframe contour grid with slow camera drift and dust particle field. Sets the "operator at altitude" tone. Renders behind hero copy with reduced opacity. Disabled when `prefers-reduced-motion: reduce`.

2. **Card tilt on pointer move.** Category tiles and flagship product cards get a max-±8° tilt with 1.04 scale on pointer enter. Pure CSS perspective + transform3d driven by JS pointer events. No library overhead.

3. **Live radar sweep.** SVG-based animated radar arc with ping markers, fixed in the live module. Reads as "operator console," not as ornament.

4. **Bonus — scroll-driven parallax.** Hero image translates Y at 0.25× scroll. Stops at viewport boundary. CSS-only via `transform: translateY(...)` with rAF-throttled scroll listener.

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
