# Design System: Valerie Laurent (Bridal & Editorial Portfolio)

## 1. Overview
The Valerie Laurent project employs a **High-Fashion Editorial & Luxury Cinematic** design language. The aesthetic mimics a premium, heavy-weight print magazine like Vogue. It uses massive, delicate typography, cinematic cross-fades, and a striking black-and-white to full-color visual journey to evoke emotion and luxury.

---

## 2. Technical Stack
| Layer | Technology |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS (Strict Config) |
| Scroll Animations | Framer Motion `useScroll`, conditional rendering |
| Smooth Scroll | `@studio-freight/lenis` |
| Fonts | Cormorant Garamond (Serif), Inter (Sans) |

---

## 3. Color Palette
The color system relies on a soft, artistic dark mode rather than harsh black.

| Token | Hex | Usage |
|---|---|---|
| `bg-charcoal` | `#060606` | A very deep, soft charcoal for the main background. Easier on the eyes than pure black. |
| `bg-surface` | `#0f0f0f` | Slightly lighter charcoal for image backgrounds and cards. |
| `text-white` | `#FFFFFF` | Used with high opacity (90-100%) for massive headings, and low opacity (30-60%) for body text. |
| `accent-red` | `#E52E2D` | Editorial Crimson. Used sparingly for hover states, active markers, and the custom cursor spotlight. |

**Borders:** Use `border-white/5` for delicate, almost invisible structural lines (like the offset image borders in the About section).

---

## 4. Typography
- **Headings / Display:** **Cormorant Garamond**. A high-contrast, elegant serif. Use it in extremely large sizes (e.g., `text-[10vw]`), usually `uppercase`, to dominate the viewport.
- **Body / Metadata:** **Inter**. A highly legible sans-serif. Use it for small, technical metadata labels (e.g., `text-[9px] uppercase tracking-widest`).

---

## 5. UI Mechanics & Components
- **Cinematic Crossfades:** Use Framer Motion to tie element opacity to the scroll position (e.g., fading a black-and-white raw image smoothly into a full-color glam image).
- **Interactive Cursor Glow:** Bind a soft crimson radial gradient (`mix-blend-screen`) to the mouse coordinates to create a "spotlight" effect over images.
- **Editorial Graphics:** Overlay thin, technical crop-marks (`w-px h-8 bg-white/20`) and crosshairs over images to mimic a camera viewfinder or magazine layout grid.
- **Masonry Galleries:** Stagger image spans (e.g., `tall`, `wide`, `square`) in a CSS Grid to avoid boring, uniform squares.

---

## 6. How to use this file for new projects:
When starting a new project that requires a "Luxury", "Bridal", or "Fashion" vibe:
1. **Copy the colors:** Add the charcoal and crimson hex codes to your new `tailwind.config.ts`.
2. **Import the fonts:** Load Cormorant Garamond and Inter.
3. **Follow the rules:** Refer to Section 5. Remember that luxury design requires *restraint*—use massive text, tons of negative space, and very thin, subtle lines. Do not clutter the screen with heavy boxes or bright background colors.
