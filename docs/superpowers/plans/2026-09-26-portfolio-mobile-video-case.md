# Portfolio Mobile, Video, and Kaspi Courier Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix portfolio video rendering and mobile interactions, add the shared Currency Converter promo, and replace the Kaspi Courier placeholder copy with sourced bilingual case-study content.

**Architecture:** Extend the existing shared components instead of patching individual pages. Keep media containers unchanged, centralize theme/playback behavior in `ViewportVideo`, centralize the footer promo in one component, and keep page-specific narrative data in the Kaspi Courier case module.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node test runner, Playwright, HTML5 video.

**Spec:** `docs/superpowers/specs/2026-09-26-portfolio-mobile-video-case-design.md`

## Global Constraints

- Preserve existing outer media-container geometry and all current video playback.
- Media surfaces are exactly `#f2f2f2` in light theme and `#262626` in dark theme.
- Keep English and German copy equivalent.
- Do not push or publish until the user explicitly approves the locally inspected result.
- Keep original video files.

## Review Focus

- iOS autoplay restrictions: every decorative video remains muted, inline, looping, and playable without user interaction.
- Poster-to-video handoff: neither a black native surface nor a flash appears before playback.
- Static-export paths: route normalization and assets work with trailing slashes.
- Mobile menu stacking: backdrop blocks the page but stays below the menu and above page content.
- Reduced or delayed media loading: layout and theme background remain stable.

---

### Task 1: Shared video behavior and media audit

**Files:**
- Modify: `app/_components/viewport-video.tsx`
- Modify: `styles/site.css`
- Test: `tests/viewport-video.test.mjs`
- Test: `tests/media-assets.test.mjs`

**Interfaces:**
- Produces: `ViewportVideo` with an optional `fit: "cover" | "contain"` prop and stable theme-aware shell behavior.
- Consumes: existing `src`, `poster`, `className`, and video HTML attributes.

- [ ] Write failing tests for inline muted looping playback attributes, fit classes, poster handoff, exact light/dark surface colors, and all referenced video/poster asset paths.
- [ ] Run the focused tests and verify the new assertions fail for missing behavior.
- [ ] Implement the minimal shared component and CSS changes.
- [ ] Audit every `ViewportVideo` call and apply `fit="contain"` only where full composition is required.
- [ ] Run focused tests and the existing test suite.

### Task 2: Mobile layout and navigation surfaces

**Files:**
- Modify: `app/_components/site-header.tsx`
- Modify: `styles/site.css`
- Test: `tests/mobile-layout.test.mjs`

**Interfaces:**
- Produces: `.mobile-menu-backdrop`, stacked `.case-variation-grid`, flexible mobile `.cv-control`, and no mobile `body::after` fade.

- [ ] Write failing markup/style tests for backdrop semantics, three one-column variation cards, CV flex fill, theme-aware overlay, and disabled mobile bottom fade.
- [ ] Run tests and verify failure.
- [ ] Add the backdrop element, close behavior, body scroll protection, and scoped mobile styles.
- [ ] Run focused and full tests.

### Task 3: For Agents return path and loader cursor

**Files:**
- Modify: `app/_components/agent-mode-switch.tsx`
- Modify: `lib/agent-mode-return.mjs`
- Modify: `app/agent-mode-switch.css`
- Modify: `app/loader.css`
- Test: `tests/agent-mode-return.test.mjs`
- Test: `tests/loader-cursor.test.mjs`

**Interfaces:**
- Produces: normalized pathname helpers and cursor stacking above the loader.

- [ ] Write failing tests for `/for-agents`, `/for-agents/`, safe stored return paths, fallback `/`, and loader/cursor z-index ordering.
- [ ] Run tests and verify failure.
- [ ] Implement normalized route comparison, safe return navigation, and corrected stacking.
- [ ] Run focused and full tests.

### Task 4: Shared Currency Converter promo

**Files:**
- Create: `app/_components/currency-converter-promo.tsx`
- Modify: `styles/site.css`
- Modify: every page currently rendering the `What I do` footer link under `app/`
- Test: `tests/currency-converter-promo.test.mjs`

**Interfaces:**
- Produces: `CurrencyConverterPromo({ language }: { language: "en" | "de" })`.
- Consumes: the site preference language already available on each page.

- [ ] Write failing tests for the exact bilingual copy, `COMING SOON`, absence of a link/button/chevron, and use on every existing footer location.
- [ ] Run tests and verify failure.
- [ ] Implement the shared component, reference-style visual, and footer replacements.
- [ ] Run focused and full tests.

### Task 5: Kaspi Courier sourced bilingual narrative

**Files:**
- Modify: `app/projects/kaspi-courier/kaspi-courier-case.tsx`
- Test: `tests/kaspi-courier-copy.test.mjs`

**Interfaces:**
- Consumes: existing language selection and current case-section structure.
- Produces: complete English/German case copy with only sourced metrics.

- [ ] Write failing tests for version 1.0 and 2.0 topics, both verified metrics, bilingual parity, and removal of neutral placeholder prose.
- [ ] Run tests and verify failure.
- [ ] Replace placeholder copy while preserving the current headings, media placeholders, and layout structure.
- [ ] Run focused and full tests.

### Task 6: Production and bounded visual verification

**Files:**
- Modify only if verification exposes a documented root cause.
- Test: existing unit suite, production build, and Playwright/browser screenshots.

**Interfaces:**
- Consumes: completed Tasks 1–5.
- Produces: locally verified build ready for user review, not published.

- [ ] Run the complete test suite and production build.
- [ ] Start the production preview only for inspection and stop it afterward.
- [ ] Verify desktop/mobile and light/dark states for all video locations, menu, loader cursor, For Agents return, Variations, promo, and Kaspi Courier copy.
- [ ] If a defect appears, document its root cause, add a failing regression test, implement the smallest fix, and rerun verification.
- [ ] Present the local result for user review without pushing to Git.
