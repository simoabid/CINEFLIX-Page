# CINEFLIX Landing Page: E2E Test Infrastructure Specification

This document details the test design strategy, framework, and specifications for the CINEFLIX landing page end-to-end (E2E) test suite. 

The test harness uses **Vitest**, **React Testing Library (RTL)**, and **JSDOM** to perform DOM-level opaque-box E2E testing of the interactive landing page.

---

## 1. Test Design Methodologies

Our test suite design is guided by formal test engineering methodologies to ensure robust, complete, and high-coverage validation of user interactions.

### A. Category-Partition Method
We partition the inputs and configurations of each interactive component into distinct categories to cover all possible functional paths:
- **Search Query Input**:
  - Empty search query
  - Standard alphanumeric query (exact match)
  - Standard alphanumeric query (partial match)
  - Case-insensitive variations (e.g., `iNcEpTiOn`)
  - Queries with leading/trailing spaces
  - Special characters and regex syntax (e.g., `.*`)
- **Genre Selection**:
  - Unselected/Default (`All`)
  - Active Genre (e.g., `Sci-Fi`, `Action`)
  - Interaction transition between genres
- **Active Section (Mockup Switcher)**:
  - Default (`hero` section active)
  - Scrolling / Transitioning to sections: `features`, `how-it-works`, `screenshots`, `tech`
- **FAQ Accordion Panels**:
  - All collapsed (default state)
  - Single expanded panel
  - Toggled state (expanding then collapsing)
  - Multiple transitions (collapsing current when another expands)
- **Billing Frequency (Pricing)**:
  - Monthly billing (default)
  - Annual billing (discounted price and annual billing subtexts)

### B. Boundary Value Analysis (BVA)
We test boundary conditions to identify edge-case failures:
- **Empty & Non-matching States**: Typing queries that yield zero matching movies to verify the custom empty state layout and messaging.
- **Accordion rapid sequences**: Simulating quick successive clicks on accordion buttons to verify the state resolves to the latest user intent without visual artifacts.
- **Zero Price vs Non-Zero**: Validating billing details for standard/family pricing compared to the free tier which has $0 pricing in both term modes.
- **Motion Reduction Constraints**: Verifying layout behavior under `prefers-reduced-motion: reduce` boundaries.

### C. Pairwise Testing (Combinations)
We verify that independent features do not corrupt or reset each other's state:
- Combining **search term queries** with **genre chip selection** concurrently.
- Verifying **Pricing toggles** do not reset or alter the **Movie Search Simulator** query or results.
- Verifying **FAQ expansions** do not reset the **Mockup Switcher** active screen.
- Verifying **Mockup Switcher scroll transitions** do not collapse currently expanded **FAQ items**.

### D. Workload & Scenario Testing
We define complete user journeys that mirror real-world browser usage:
- **Conversion funnel review**: User landing, exploring pricing options, checking annual savings, expanding standard FAQ answers, and proceeding to sign up.
- **Self-help exploration**: User searching for a specific movie, verifying its presence, and checking device support in the FAQs.
- **Accessibility Walkthrough**: Ensuring proper keyboard navigation using Tab keys, focusing elements in structural order, and verifying ARIA roles.

---

## 2. Test Suite Architecture

- **Test Runner**: Vitest
- **Testing Library**: `@testing-library/react` and `@testing-library/jest-dom`
- **DOM Environment**: JSDOM
- **Target File**: `src/__tests__/e2e/cineflix.test.tsx`
- **Mock Interfaces**:
  - Custom local implementation of `IntersectionObserver` to spy on scroll-registries and simulate scroll intersections.
  - Mocked `window.matchMedia` to test prefers-reduced-motion behavior.
  - Mocked `window.scrollTo` to support smooth scroll trigger animations.

---

## 3. Feature Inventory & DOM Targets

- **Movie Search Simulator**:
  - Input: `[placeholder="Search movies by title..."]`
  - Clear button: `[aria-label="Clear search"]`
  - Genre chips: `button` element containing genre names (All, Action, Sci-Fi, etc.)
  - Movie cards: elements with class/text containing titles.
  - Empty state: text `"No movies match your criteria"` and `"Try searching for a different title or clearing your filters."`
- **Mockup Switcher**:
  - Mockup wrapper: element with class/test ID related to `phone-mockup`
  - Mockup images: images with alt text (`CINEFLIX Home Screen`, `CINEFLIX Collections Screen`, `CINEFLIX Search Screen`, `CINEFLIX My List Screen`, `CINEFLIX Account Screen`)
- **FAQ Accordion**:
  - Accordion buttons: buttons with `aria-controls` pointing to panels.
  - Accordion panels: elements with class `grid` and `grid-rows-[0fr]` (collapsed) / `grid-rows-[1fr]` (expanded) and `aria-hidden` attributes.
- **Pricing Cards**:
  - Toggle buttons: `"Monthly"`, `"Annual"`, and `"Toggle annual pricing"` switch button.
  - Plan names: `"Free"`, `"Standard"`, `"Family"`
  - Price text: standard monthly prices (`$0.00`, `$9.99`, `$15.99`) and annual prices (`$0.00`, `$6.99`, `$11.19`)
  - Subtexts: `"Cancel anytime"`, `"No credit card needed"`, `"Billed annually ($83.88)"`, `"Billed annually ($134.28)"`

---

## 4. Test Cases Taxonomy

The test suite is structured into four distinct Tiers of coverage:

- **Tier 1: Happy Path Feature Coverage (20 tests)**
  - Movie Search Simulator: Basic rendering, search, genre filter, search + genre combination, clear action. (5 tests)
  - Mockup Switcher: Wrapper render, default hero screen active, provider context update, scroll trigger mockups. (5 tests)
  - FAQ Accordion: Render all questions, default collapsed states, expand item on click, collapse on double click. (5 tests)
  - Pricing Cards: Render all plans, default monthly prices, Monthly/Annual text, annual price toggle. (5 tests)

- **Tier 2: Boundary & Corner Cases (20 tests)**
  - Movie Search Simulator: Empty results message, case insensitivity, leading/trailing space handling, special characters, all-movies default check. (5 tests)
  - Mockup Switcher: Multi-stage scroll transitions, context active section mappings for `features`, `how-it-works`, `screenshots`, `tech`, clean observer unmounting. (5 tests)
  - FAQ Accordion: Close active accordion on new click, ARIA controls & labelling bindings, external link target validation, collapsed grid-rows class checking, expanded grid-rows class checking, rapid double-clicks. (5 tests)
  - Pricing Cards: Discount badge percentage validation, monthly price subtexts, billed annually calculation labels, toggle via switch, Standard card popularity badge exclusive render, plan feature listings verification. (5 tests)

- **Tier 3: Feature Interactions (4 tests)**
  - Pricing toggle does not affect Movie search queries.
  - FAQ expansion does not affect the Mockup Switcher active state.
  - Mockup Switcher transitions do not reset open FAQ cards.
  - Concurrent Pricing toggle, Movie Search, and FAQ interactions.

- **Tier 4: Real-World Scenarios (5 tests)**
  - User scrolling exploration and trial download flow.
  - Search discovery combined with FAQ iOS capability checks.
  - Full conversion funnel optimization walkthrough.
  - Keyboard-only tab navigation accessibility walkthrough.
  - Animation constraints verification under prefers-reduced-motion.

---

## 5. Coverage & Quality Thresholds

- **Functional Coverage**: 100% of the 49 defined E2E test cases across Tiers 1-4 must compile, run, and assert expected states.
- **Code Coverage Target**: >= 90% statement/branch coverage of the primary interactive components:
  - `src/components/MovieSearch.tsx`
  - `src/components/MockupSwitcher.tsx`
  - `src/components/Accordion.tsx`
  - `src/components/Pricing.tsx`
- **Accessibility Verification**: Correct ARIA attributes (`aria-expanded`, `aria-hidden`, `aria-controls`, `aria-labelledby`, roles) must be dynamically verified on toggle/clicks.
- **Motion Reduction Standard**: Component styles or transition configurations must respect `(prefers-reduced-motion: reduce)`.
