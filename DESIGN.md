---
name: CINEFLIX
colors:
  background: "#0A0A1F"
  foreground: "#FFFFFF"
  brand: "#FF1E27"
  brandHover: "#E0121A"
  brandMuted: "rgba(255, 30, 39, 0.1)"
  cardBg: "rgba(255, 255, 255, 0.03)"
  cardBorder: "rgba(255, 255, 255, 0.08)"
  cardBorderHover: "rgba(255, 255, 255, 0.15)"
  badgeBg: "rgba(255, 255, 255, 0.02)"
  badgeBorder: "rgba(255, 255, 255, 0.06)"
  textSecondary: "#A1A1AA"
  glowColor: "rgba(255, 30, 39, 0.15)"
  dark:
    background: "#0A0A1F"
    foreground: "#FFFFFF"
    brand: "#FF1E27"
typography:
  fontFamily:
    sans: "Inter, system-ui, -apple-system, sans-serif"
    mono: "Geist Mono, JetBrains Mono, Fira Code, monospace"
  fontSize:
    hero: "3.75rem" # 60px
    subtitle: "1.25rem" # 20px
    heading1: "2.25rem" # 36px
    heading2: "1.5rem" # 24px
    body: "0.875rem" # 14px
    badge: "0.75rem" # 12px
  fontWeight:
    regular: "400"
    medium: "500"
    semibold: "600"
    bold: "700"
    extrabold: "800"
rounded:
  default: "8px"
  card: "12px"
  badge: "9999px"
---

# Design System: CINEFLIX Landing Page

## Overview
CineFlix is a premium, developer-focused, open-source companion for Movies & TV Shows. The website's aesthetic is characterized by a modern, high-contrast **"Glassmorphic Deep-Cinema"** vibe. It combines an ultra-dark navy background with premium glassmorphism, precise borders, and striking, vibrant red accents paired with subtle radial glows.

---

## Design Philosophy

- **Premium Dark Mode First:** The workspace is built entirely around dark themes to emulate a cinema room experience. High-contrast white typography ensures readability, while muted grays provide visual hierarchy.
- **High-Energy Accentuation:** A singular, saturated brand red (`#FF1E27`) acts as the focal point, indicating action, status, or identity without overwhelming the UI.
- **Glassmorphic Structure:** Semi-transparent cards and overlays with thin, light borders create depth, making the interface feel layered, modern, and light despite the dark palette.
- **Micro-Interactions and Depth:** Subtle scaling, glowing hover states, and smooth ease-in-out animations provide tactile feedback, making the environment feel premium and responsive.

---

## Colors

### Core Palette
- **Primary Background:** `#0A0A1F` — A deep navy blue that serves as the canvas, emulating a movie theatre ambiance.
- **Primary Foreground:** `#FFFFFF` — Pure white for title text, navigation labels, and primary buttons.
- **Secondary Foreground / Body Text:** `#A1A1AA` (equivalent to Zinc-400) — High-legibility gray for descriptions, body copy, and secondary elements.

### Brand Accents
- **Brand Red:** `#FF1E27` — A vibrant, pure red used for the signature brand logo, main accents, active badges, and key call-to-action buttons.
- **Brand Red Hover:** `#E0121A` — A slightly deeper red to create visual feedback when hovering over primary components.

### Surfaces & Borders
- **Card Background:** `rgba(255, 255, 255, 0.03)` — Highly translucent glassmorphic dark surface.
- **Card Border:** `rgba(255, 255, 255, 0.08)` — A thin border to separate card modules from the navy background.
- **Card Border Hover:** `rgba(255, 255, 255, 0.15)` — Brighter border to highlight active focus.
- **Badge Background:** `rgba(255, 255, 255, 0.02)` — Capsule background for metadata tags and quick links.

---

## Typography

### Hierarchy & Scaling
- **Hero Title (`h1`):** `3.75rem` (`60px`), bold/extrabold (`700`/`800`), tracking-tight. Designed to dominate the landing space.
- **Section Heading (`h2`):** `2.25rem` (`36px`), bold (`700`), used to introduce sub-ecosystems (e.g., "Explore the CineFlix ecosystem").
- **Card Title (`h3`):** `1.5rem` (`24px`), bold (`700`), for container headers.
- **Body Text:** `0.875rem` (`14px`), regular (`400`) or medium (`500`), leading-relaxed.
- **Badge / Metadata Text:** `0.75rem` (`12px`), semibold (`600`), tracking-wide.

### Typefaces
- **Sans-Serif (Primary/Display):** `Inter, system-ui, -apple-system, sans-serif`. A clean, geometric typeface that is highly readable at any scale.
- **Monospace (Secondary):** `Geist Mono, JetBrains Mono, monospace`. Used for repository tags (e.g., `core`, `ui`, `docs`), commands, and technical indicators.

---

## Components

### Buttons
1. **Primary Action Button (e.g., "Open Docs", "Quickstart")**
   - **Background:** Brand Red (`#FF1E27`)
   - **Text:** White (`#FFFFFF`), Semibold (`600`)
   - **Padding:** `0.75rem 1.5rem` (12px vertical, 24px horizontal)
   - **Rounding:** `8px` (`rounded-lg`)
   - **Hover State:** Deepens background color to `#E0121A` with a transition duration of `200ms`.

2. **Secondary Outline Button (e.g., "GitHub Org", "Core repo")**
   - **Background:** `rgba(255, 255, 255, 0.05)` (or transparent with a dark fill)
   - **Border:** `1px solid rgba(255, 255, 255, 0.1)`
   - **Text:** White (`#FFFFFF`), Semibold (`600`)
   - **Hover State:** Background shifts to `rgba(255, 255, 255, 0.1)` and border to `rgba(255, 255, 255, 0.2)`.

### Cards
- **Structure:** Translucent glassmorphic surface with thin white borders and distinct margin spacing.
- **Border Radius:** `12px` (`rounded-xl`)
- **Spacing:** `1.5rem` to `2rem` inner padding.
- **Hover State:**
  - Border transition: `rgba(255, 255, 255, 0.08)` -> `rgba(255, 255, 255, 0.15)`
  - Subtle upward translation (`translateY(-2px)`)
  - Accent header elements slightly light up.

### Capsules & Badges
- **Style:** Small pill shapes (`rounded-full`) containing concise metadata.
- **Background:** `rgba(255, 255, 255, 0.02)` with a thin border (`rgba(255, 255, 255, 0.06)`).
- **Typography:** `0.75rem` (`12px`) size, monospace or sans-serif, using brand colors for icons or accent text.

---

## Visual Effects

### Background Glows
- **Radial Ambient Lights:** Large, blurred circular gradients of red glow (`glowColor`) placed in the margins (e.g., top-left, bottom-right). This breaks the monotony of navy and guides the user's attention.
  - *Implementation:* `background: radial-gradient(circle, rgba(255, 30, 39, 0.15) 0%, transparent 70%);`

### Header Glassmorphism
- **Navigation Bar:** Floating capsule utilizing a semi-transparent dark background combined with `backdrop-filter: blur(12px)` and a subtle bottom border (`1px solid rgba(255, 255, 255, 0.08)`) to float seamlessly over page content.

### Browser Mockups (product UI)
- Prefer **desktop browser chrome frames** (traffic lights + URL bar, ~16:10 content) for hero, deep-dives, and screenshot galleries.
- Screenshots live under `public/assets/screenshots/web/` and should show the **web app** (not phone-only UI).
- Scroll-linked mockup switching uses `MockupContext` section intersection observers.

