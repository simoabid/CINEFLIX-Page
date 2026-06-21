# Project: CINEFLIX Landing Page Polish

## Creative North Star: "The Cinematic Sanctuary"
A premium dark-themed theatrical experience highlighting CINEFLIX catalog with striking solid crimson accents, clean geometric typography pairings, and smooth, precise physics-based motion.

## Architecture
- **Vite SPA**: React application utilizing Tailwind CSS and a global `styles.css`.
- **Modules**:
  - `src/App.tsx`: Landing page main shell, section controller.
  - `src/components/MovieSearch.tsx`: Movie search simulator.
  - `src/components/MockupSwitcher.tsx`: Interactive mockup preview switcher.
  - `src/components/Accordion.tsx`: FAQ Accordion interface.
  - `src/components/Pricing.tsx`: Subscription pricing cards toggle.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Suite | Create E2E test harness covering features & edge cases | None | IN_PROGRESS |
| 2 | Design System Setup & Visuals | Fix gradient-text, font-pairing, color palette, card radii | M1 | PLANNED |
| 3 | Motion & Transition Refactoring | Remove bounce curves and layout transitions; implement exponential easing | M2 | PLANNED |
| 4 | Clean-up & Verification | Remove unused code, ensure build succeeds and vitest + E2E tests pass | M3 | PLANNED |
| 5 | Adversarial Hardening | Challenger-led whitebox coverage hardening | M4 | PLANNED |

## Interface Contracts
- Components are modular React components residing in `src/components/`.
- Styling: Tailwind CSS classes paired with specific overrides in `styles.css`.
- Interactive states: Mockup context, pricing billing term toggle, movie filter term query.

## Code Layout
- `src/App.tsx`: Root component
- `src/components/`: Modular child UI components
- `src/__tests__/`: Unit tests for components and sanity mocks
- `styles.css`: Custom global styling rules
- `tailwind.config.js`: Tailwind design token configurations
- `PRODUCT.md` / `DESIGN.md`: Design system documentation files
