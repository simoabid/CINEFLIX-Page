# Design System: CINEFLIX Landing Page

## 1. Overview

**Creative North Star: "The Cinematic Sanctuary"**

A premium, immersive movie catalog experience that evokes the thrill of the theater. The aesthetic leverages a rich dark-mode backdrop, crisp white typography for high readability, and strategic, deep crimson highlights.

**Key Characteristics:**
- Dramatic high-contrast theatrical elements
- Strict max 16px corner radii to maintain sleek geometry
- Smooth exponential transition motion mimicking analog cinematic projectors

## 2. Colors

A cohesive, brand-committed palette that uses deep dark surfaces and a vibrant crimson-red primary accent.

### Primary
- **Crimson Brand Red** (#E50914): Main primary call-to-actions, brand identity, and highlight elements.
- **Vibrant Red** (#FF1A25): Interactive hover states for primary controls.
- **Dark Red** (#B20710): Active or selected states.

### Neutral
- **Deep Void Background** (#0A0A1F): Global app background, simulating the theater dark room.
- **Theatrical Surface** (#0E0E24): Background for cards, selectors, and sections.
- **Theater White** (#FFFFFF): High-contrast primary copy text.
- **Cinema Slate** (#94A3B8): Secondary and placeholder copy text.

### Named Rules
**The Rarity Rule.** Crimson brand red is used strictly on <=10% of any given viewport surface to maximize its impact.
**No-Gradient-Text Rule.** Text elements must never use gradient fills. High typographic contrast is achieved through font-weight and size variation.

## 3. Typography

**Display Font:** Righteous (with cursive fallback)
**Body Font:** Poppins (with sans-serif fallback)

### Hierarchy
- **Display** (Righteous, 400, clamp(2rem, 5vw, 4.5rem), 1.1): Hero headlines.
- **Headline** (Righteous, 400, 2rem, 1.2): Section headings.
- **Title** (Poppins, 600, 1.25rem, 1.4): Card titles, subheadings.
- **Body** (Poppins, 400, 1rem, 1.5): Standard copy. Cap body line length at 65-75ch.
- **Label** (Poppins, 500, 0.875rem, normal): Small annotations, tags, buttons.

### Named Rules
**The Line Length Rule.** Body copy columns must be constrained to 65–75ch width to reduce cognitive fatigue.
**The Letter Spacing Rule.** Display headlines must maintain letter-spacing of >= -0.04em to avoid letter touching.

## 4. Elevation

The interface rests on a flat, layered dark environment. Depth is established through subtle background shading and light borders instead of high-elevation shadows.

### Named Rules
**The Flat Layering Rule.** Depth is created by placing lighter surfaces (#0E0E24) against the dark background (#0A0A1F). Soft glow effects (#E50914 at 0.15 opacity) are reserved exclusively for the Hero component and card hover state actions.

## 5. Components

### Buttons
- **Shape:** Rounded (8px, `rounded-md`)
- **Primary:** Background Crimson (#E50914) with padding 12px 24px
- **Hover/Focus:** Expands slightly, shifts to Vibrant Red (#FF1A25) using `transition-transform` and `transition-colors` with ease-out curve.

### Cards / Containers
- **Corner Style:** Rounded (12px or 16px, `rounded-xl` / `rounded-2xl`). Maximum radius is 16px.
- **Background:** Theatrical Surface (#0E0E24)
- **Border:** Subtle border border-glass (rgba(255, 255, 255, 0.08))

## 6. Do's and Don'ts

### Do:
- **Do** use Righteous font for displays and headers.
- **Do** restrict all corner radii to a maximum of 16px.
- **Do** support `@media (prefers-reduced-motion: reduce)` by disabling scaling/translation transforms on motion elements.

### Don't:
- **Don't** use text gradients (`bg-clip-text` or `background-clip: text` with gradients) anywhere.
- **Don't** use bouncy animations (`cubic-bezier(0.34, 1.56, 0.64, 1)` or `animate-bounce`).
- **Don't** animate width, height, margin, or padding. Use transform/opacity transitions or grid height.
- **Don't** use colored side-stripe borders as accent decorators.
