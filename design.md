# Design Specification: VALERIE — Luxury Bridal & Editorial Portfolio

## 1. Overview
A premium, visually cinematic one-page portfolio website for luxury bridal and editorial makeup artist **VALERIE**. The design takes direct inspiration from the `krishav-mehendi` project structure — featuring a full Loading Screen entry, a Custom Cursor, Lenis smooth scroll, a fixed 3D WebGL blob as the hero background, and a structured section-by-section flow. Every visual element speaks of high-fashion editorial luxury.

---

## 2. Technical Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript |
| 3D Render | React Three Fiber, `@react-three/drei` |
| Scroll Animations | GSAP + ScrollTrigger, Framer Motion `useScroll` |
| Micro-animations | Framer Motion |
| Smooth Scroll | `@studio-freight/lenis` |
| Fonts | Cormorant Garamond (serif display), Inter (sans UI) |
| Deployment | Vercel |

---

## 3. Color Palette
| Token | Hex | Usage |
|---|---|---|
| `#080612` | Deep Midnight | Page background |
| `#0e0a1a` | Surface Dark | Cards, panels |
| `#d4af37` | Champagne Gold | Primary accent, borders |
| `#e0b393` | Rose Gold | Gradient mid |
| `#c8956c` | Warm Copper | Gradient end |
| `#f5f0e8` | Parchment White | Body text |

**Gradient:** `135deg, #d4af37 → #e0b393 → #c8956c` — applied to the brand logo, headings, CTAs, and SVG strokes.

---

## 4. Typography
- **Headings / Display:** Cormorant Garamond — Italic, Thin/Light weight. Large tracking (e.g., `tracking-[0.3em]`).
- **UI / Labels / Buttons:** Inter — Regular / SemiBold. ALL CAPS with very wide tracking (`tracking-widest`).

---

## 5. Page Architecture (Section Flow)
```
LoadingScreen (rose-gold SVG petal ring + brand name reveal)
  ↓
[Page mounts]
CustomCursor (rose-gold dot + trailing ring)
SmoothScroll (Lenis)
Fixed 3D Canvas (Liquid Gold Blob — background layer, z-[-10])
Navigation (glass-morphic pill, scroll-aware)
  ↓
[Main Content]
1. Hero           — Full-screen; large italic VALERIE heading; editorial SVG crown; stats; CTA
2. About          — GSAP scroll-pinned portrait reveal + artist bio text
3. Gallery        — Masonry grid with category filters; Framer Motion lightbox (layoutId)
4. Story          — Scroll-driven SVG botanical path drawing (sticky text overlay)
5. Services       — Interactive service selector (left) + detail panel (right); ₹XXXX pricing
6. Reviews        — Central rating card + 3 floating animated testimonial cards
7. Location       — Address/hours info + dark-filtered Google Maps embed
Footer            — Brand, nav links, social links, copyright
[Floating WhatsApp CTA]
BookingModal (slide-in panel, hybrid pre-fill → WhatsApp link)
```

---

## 6. 3D WebGL Hero (Approach A — Custom GLSL Shaders)
- **Component:** `Hero3D/LiquidBlob.tsx` inside `Hero3D/CanvasContainer.tsx`
- **Technique:** Custom vertex shader — procedural Simplex noise displaces sphere geometry in real-time.
- **Fragment shader:** Fresnel edge glow in champagne-gold; high-gloss specular for liquid-gold effect.
- **Interactivity:** `useMousePosition` hook provides normalized mouse coordinates to shader uniforms for real-time blob deformation.
- **SSR Safety:** Canvas loaded via `dynamic(() => ..., { ssr: false })`.

---

## 7. Key Component Notes
- **LoadingScreen:** 4-second entry. Stages: dot → SVG ring drawing → brand name reveal → fade out.
- **CustomCursor:** Rose-gold dot + trailing outer ring (lerped). Scales up with text label on interactive elements.
- **Navigation:** Transparent on load → glass pill (blur + border) after 50px scroll. Full-screen drawer on mobile.
- **StorySection:** `min-h-[140vh]` with sticky text; Framer Motion `pathLength` animates SVG botanicals on scroll.
- **BookingModal:** Right-side slide-in panel; collects Name, Date, Service dropdown, Custom Notes → WhatsApp URL.

---

## 8. Fake Demo Data (Placeholders)
- Phone: `+91 XXXXX XXXXX`
- WhatsApp: `https://wa.me/91XXXXXXXX`
- Address: `[Your Studio Address], Near [Landmark], Mumbai`
- Prices: `₹XXXX`
- Instagram: `@valerie_couture`
