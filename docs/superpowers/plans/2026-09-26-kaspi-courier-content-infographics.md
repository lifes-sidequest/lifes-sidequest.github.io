# Kaspi Courier Content and Infographics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the shared footer promo and Kaspi Courier case with a full-width cover video, inverted mobile overlay, bilingual delivery-business narrative, target metrics, and responsive Before/After ecosystem infographics.

**Architecture:** Keep the existing Next.js components and shared CSS architecture. Add one focused courier infographic component, keep localized case copy beside the page that consumes it, and reuse `ViewportVideo` rather than introducing another media layer. Optimize the supplied brand images into the existing Kaspi Courier asset folder.

**Tech Stack:** Next.js 16, React 19, TypeScript, shared CSS, Node test runner, Sharp/available image tooling, FFmpeg/ffprobe for media inspection.

**Spec:** `docs/superpowers/specs/2026-09-26-kaspi-courier-content-infographics-design.md`

## Global Constraints

- Keep the existing footer promo colors, English/German text, `COMING SOON` badge, non-interactive behavior, and placement.
- Do not add shadcn, Radix, CVA, Lucide, Tailwind utilities, or new runtime dependencies.
- Preserve the Kaspi Courier cover container dimensions and playback; use cover fit with only symmetric top/bottom cropping.
- Use a dark translucent mobile backdrop in light theme and a light translucent backdrop in dark theme, without blur.
- Do not mention version 1.0, version 2.0, “first release,” or “evolved version” in the Kaspi Courier page.
- Present 1.8 orders/hour, +200% productivity, and -60% CPO to 2,263 KZT/order explicitly as expected outcomes.
- Keep source images in Downloads unchanged.
- Do not commit, push, or publish before user visual approval.

## Review Focus

- A 3:2 courier video inside the existing 16:9 shell fills the shell without side gutters and continues playing in both themes and on iOS fallback paths.
- The inverse menu overlay remains behind the menu/header and above page content in both themes.
- Target metrics never read as already achieved in either language.
- Partner and integrated diagrams retain all nodes and readable labels at mobile width without horizontal overflow.
- Reduced-motion users receive static, complete diagram lines rather than missing connections.

---

### Task 1: Protect the new visual and content contracts

**Files:**
- Modify: `tests/portfolio-polish.test.mjs`
- Modify: `tests/viewport-video.test.mjs`

**Interfaces:**
- Consumes: current `ViewportVideo`, Kaspi Courier page, header CSS, and shared promo markup.
- Produces: failing regression coverage that subsequent tasks make green.

- [ ] **Step 1: Add failing regression tests**

Add focused tests asserting that the Courier hero requests cover fit, the menu backdrop uses inverse theme surfaces, the promo exposes its structural layers without a CTA, the case copy exports target metrics, and the infographic contains the six named company nodes.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --test tests/portfolio-polish.test.mjs tests/viewport-video.test.mjs`

Expected: FAIL only on the newly specified behavior.

---

### Task 2: Fix the Courier cover and inverse mobile backdrop

**Files:**
- Modify: `app/projects/kaspi-courier/kaspi-courier-case.tsx`
- Modify: `styles/site.css`
- Test: `tests/viewport-video.test.mjs`
- Test: `tests/portfolio-polish.test.mjs`

**Interfaces:**
- Consumes: `ViewportVideo({ fit: "cover" })` and the existing `.mobile-menu-backdrop` element.
- Produces: a full-bleed Courier cover and correctly layered inverse menu backdrop.

- [ ] **Step 1: Change only the Courier hero fit to `cover`**

Keep the existing sources, posters, shell classes, container aspect ratio, playback settings, and iOS fallback behavior.

- [ ] **Step 2: Invert the mobile overlay surfaces**

Set the light theme overlay to a dark translucent color and the dark theme overlay to a light translucent color. Retain `z-index: 19`, the `72px` header inset, and no `backdrop-filter`.

- [ ] **Step 3: Run focused tests and verify GREEN**

Run: `node --test tests/portfolio-polish.test.mjs tests/viewport-video.test.mjs`

Expected: PASS.

---

### Task 3: Rebuild the shared Currency Converter promo structure

**Files:**
- Modify: `app/_components/currency-converter-promo.tsx`
- Modify: `styles/site.css`
- Test: `tests/portfolio-polish.test.mjs`

**Interfaces:**
- Consumes: `CurrencyConverterPromo({ language: "en" | "de" })` and the existing localized copy.
- Produces: the same public component API with `currency-promo-grid`, a radial accent layer, badge, heading, and description.

- [ ] **Step 1: Add the explicit radial-accent presentation layer**

Keep the component a semantic, non-interactive `<section>`. Do not render anchors, buttons, CTA labels, or chevrons.

- [ ] **Step 2: Adapt the reference layout in existing CSS**

Use the current dark palette and text. Refine grid mask, vertical composition, lower radial accent, responsive type, and mobile height without introducing new dependencies or animations that run continuously.

- [ ] **Step 3: Run the focused promo test**

Run: `node --test tests/portfolio-polish.test.mjs`

Expected: PASS.

---

### Task 4: Rewrite the Kaspi Courier case in English and German

**Files:**
- Modify: `app/projects/kaspi-courier/kaspi-courier-case.tsx`
- Test: `tests/portfolio-polish.test.mjs`

**Interfaces:**
- Consumes: the approved narrative and expected metrics in the spec.
- Produces: localized `copy.en` and `copy.de` values used by the existing page sections.

- [ ] **Step 1: Replace the Problem and Solution narratives**

Problem names the prior reliance on Glovo, Wolt, Yandex, and VanOnGo plus subsidized customer delivery. Solution describes the owned courier application, direct courier ecosystem, faster exchange with the main app, broader time window, new jobs, and simplified courier-bank transactions.

- [ ] **Step 2: Align all supporting copy**

Rewrite subtitle, intro, goals, role, gallery headings, impact, and deeper-contact copy. Remove every release/version comparison in both languages.

- [ ] **Step 3: Mark all metrics as targets**

Use explicit localized labels equivalent to “Expected outcomes” and “Projected impact”; preserve the approved numeric values exactly.

- [ ] **Step 4: Run the focused content test**

Run: `node --test tests/portfolio-polish.test.mjs`

Expected: PASS with no forbidden version phrases in the rendered source data.

---

### Task 5: Build the Before/After delivery ecosystem infographics

**Files:**
- Create: `app/projects/kaspi-courier/_components/courier-ecosystem-diagrams.tsx`
- Modify: `app/projects/kaspi-courier/kaspi-courier-case.tsx`
- Modify: `styles/site.css`
- Create: `public/images/projects/kaspi-courier/partners/kaspi.webp`
- Create: `public/images/projects/kaspi-courier/partners/kaspi-delivery.webp`
- Create: `public/images/projects/kaspi-courier/partners/glovo.webp`
- Create: `public/images/projects/kaspi-courier/partners/wolt.webp`
- Create: `public/images/projects/kaspi-courier/partners/yandex.webp`
- Create: `public/images/projects/kaspi-courier/partners/vanongo.webp`
- Test: `tests/portfolio-polish.test.mjs`

**Interfaces:**
- Produces: `CourierEcosystemDiagrams({ language }: { language: "en" | "de" }): JSX.Element`.
- Consumes: the six optimized local logo paths listed above.

- [ ] **Step 1: Optimize supplied logos into local WebP assets**

Preserve transparency, brand colors, and square composition. Do not modify or delete the Downloads originals.

- [ ] **Step 2: Implement the Before diagram**

Render Kaspi.kz as the source node with accessible SVG branches to Glovo, Wolt, Yandex, and VanOnGo. Include visible localized context labels and accessible node names.

- [ ] **Step 3: Implement the After diagram**

Render a direct Kaspi.kz to Kaspi Delivery connection with the same node system and localized context labels.

- [ ] **Step 4: Replace the empty Solution cards**

Mount `CourierEcosystemDiagrams` inside the existing two-card region so page spacing and outer card geometry remain consistent.

- [ ] **Step 5: Add responsive and reduced-motion styles**

Use theme-aware surfaces, one-time reveal transitions, static complete lines under `prefers-reduced-motion`, and a vertical mobile node layout with no overflow.

- [ ] **Step 6: Run the focused infographic test**

Run: `node --test tests/portfolio-polish.test.mjs`

Expected: PASS with all six nodes and both diagrams present.

---

### Task 6: Full verification and local visual review

**Files:**
- Verify only; fix failures in the task that owns them.

**Interfaces:**
- Consumes: all previous tasks.
- Produces: a local production build ready for user review, with no Git publication.

- [ ] **Step 1: Run the complete automated suite**

Run: `pnpm test && pnpm lint && pnpm build`

Expected: all tests pass, ESLint exits cleanly, and every static route builds.

- [ ] **Step 2: Inspect media metadata and generated asset sizes**

Run `ffprobe` against both Courier theme videos and list the six optimized logo sizes. Confirm the videos remain playable and no source asset was overwritten.

- [ ] **Step 3: Start only the lightweight production preview**

Run: `python3 -m http.server 3000 --directory out`

Do not run `next dev`.

- [ ] **Step 4: Visually verify desktop and mobile**

Check light/dark Courier cover playback and crop, inverse menu backdrop, shared promo on representative pages, Before/After diagrams, mobile stacking, and reduced-motion completeness.

- [ ] **Step 5: Stop the preview and report local results**

Leave all changes uncommitted and unpushed until the user explicitly approves publication.

