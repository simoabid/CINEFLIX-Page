# CINEFLIX — Landing Page

Premium marketing site for the **CINEFLIX web app** — an open-source streaming & discovery platform at [cineflix.dev](https://cineflix.dev).

Built with React 18, Vite, TypeScript, and Tailwind CSS.

## What this page markets

| In scope | Out of scope |
|----------|----------------|
| Full-stack **web** product (React + Express + MongoDB) | Mobile / React Native / Expo apps |
| Smart Player, collections, watch parties, My List | Paid subscription tiers (none exist) |
| Honest open-source positioning | Fake store ratings or download metrics |

## Features of this landing site

- Glassmorphic deep-cinema design (`DESIGN.md`)
- Desktop **browser mockups** driven by scroll sections
- Feature grid + product deep-dives covering the real web app
- Live `cineflix.dev` embed (`AppPreview`)
- Security / stack / FAQ / developer sections
- Accessible accordion, skip link, reduced-motion-aware cursor & particles
- Vitest unit + smoke tests

## Stack

- React 18 + TypeScript
- Vite 4
- Tailwind CSS 3
- lucide-react icons
- Vitest + Testing Library

## Getting started

```bash
cd CINEFLIX-Page
npm install
npm run dev        # http://localhost:5173
npm run test
npm run build
```

## Project structure

```
src/
  config/site.ts       # URLs, copy, features, FAQ (single source of truth)
  components/          # Header, Footer, BrowserMockup, Accordion, …
  sections/            # Page sections composed by App.tsx
  contexts/            # Scroll-linked mockup section state
  App.tsx              # Composition only
public/assets/
  screenshots/web/     # Desktop product screenshots
  logo.png
  og-image.png
```

## Primary CTAs

- **Launch App** → https://cineflix.dev  
- **View Source** → https://github.com/simoabid/cineflix-app  

## License

MIT — see project root / author notes.
