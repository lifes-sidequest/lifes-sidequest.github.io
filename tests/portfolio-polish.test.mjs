import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("mobile layout stacks variations, removes the bottom fade, and gives the menu a backdrop", async () => {
  const css = await readFile(new URL("styles/site.css", root), "utf8");
  const header = await readFile(new URL("app/_components/site-header.tsx", root), "utf8");
  assert.match(header, /mobile-menu-backdrop/);
  const finalMobileRule = css.lastIndexOf(".case-variation-grid{display:grid;width:100%;max-width:none;grid-template-columns:1fr");
  const legacyScroller = css.lastIndexOf(".case-variation-grid{display:flex;width:max-content");
  assert.ok(finalMobileRule > legacyScroller, "the final mobile rule must stack variation cards instead of restoring the old horizontal scroller");
  assert.match(css, /body::after\{display:none/);
  assert.match(css, /\.header-controls-mobile \.cv-control\{flex:1/);
  assert.match(css, /\.mobile-menu-backdrop\{[^}]*background:rgba\(0,0,0,/);
  assert.match(css, /\[data-theme="dark"\] \.mobile-menu-backdrop\{[^}]*background:rgba\(255,255,255,/);
  assert.doesNotMatch(css.match(/\.mobile-menu-backdrop\{[^}]*\}/)?.[0] ?? "", /backdrop-filter/);
});

test("desktop pages use a softer theme-aware bottom fade", async () => {
  const css = await readFile(new URL("styles/site.css", root), "utf8");
  assert.match(css, /body::after\{[^}]*height:clamp\(190px,26vh,280px\)[^}]*rgba\(255,255,255,\.06\) 25%[^}]*rgba\(255,255,255,\.9\) 94%/s);
  assert.match(css, /\[data-theme="dark"\] body::after\{[^}]*rgba\(23,23,23,\.06\) 25%[^}]*rgba\(23,23,23,\.9\) 94%/s);
});

test("agent mode normalizes trailing slashes and the cursor remains above the loader", async () => {
  const helper = await readFile(new URL("lib/agent-mode-return.mjs", root), "utf8");
  const switcher = await readFile(new URL("app/_components/agent-mode-switch.tsx", root), "utf8");
  const siteCss = await readFile(new URL("styles/site.css", root), "utf8");
  const loaderCss = await readFile(new URL("app/loader.css", root), "utf8");
  assert.match(helper, /normalizeAgentPath/);
  assert.match(switcher, /normalizeAgentPath\(pathname\)/);
  const cursorZ = Number(siteCss.match(/\.custom-cursor\{[^}]*z-index:(\d+)/)?.[1]);
  const loaderZ = Number(loaderCss.match(/\.site-loader\{[^}]*z-index:(\d+)/)?.[1]);
  assert.ok(cursorZ > loaderZ, `cursor ${cursorZ} should be above loader ${loaderZ}`);
});

test("the shared currency converter promo is localized and non-interactive", async () => {
  const promo = await readFile(new URL("app/_components/currency-converter-promo.tsx", root), "utf8");
  const css = await readFile(new URL("styles/site.css", root), "utf8");
  assert.match(promo, /COMING SOON ON iOS/);
  assert.match(promo, /Convert currencies without losing the moment/);
  assert.match(promo, /Währungen umrechnen, ohne den Moment zu verlieren/);
  assert.match(promo, /currency-promo-sphere/);
  assert.match(promo, /headingLines: \["Convert currencies without", "losing the moment"\]/);
  assert.match(css, /\.currency-promo-sphere\{[^}]*radial-gradient/);
  assert.match(css, /\.currency-promo\{[^}]*place-items:center/);
  assert.match(css, /\.currency-promo h2\{[^}]*line-height:1\.08/s);
  assert.match(css, /\.currency-promo h2\{[^}]*padding-bottom:\.12em/s);
  assert.match(css, /\.currency-promo\{[^}]*#343737[^}]*#aeb1b1/s);
  assert.match(css, /\.currency-promo-sphere\{[^}]*box-shadow:0 -16px 52px rgba\(255,255,255,\.72\)/s);
  assert.doesNotMatch(promo, /<Link|<a |<button/);

  const files = [
    "app/_components/portfolio.tsx",
    "app/about/about-page.tsx",
    "app/links/index-page.tsx",
    "app/projects/projects-catalog.tsx",
    "app/projects/kaspi-home/kaspi-home-case.tsx",
    "app/projects/car-parts/car-parts-case.tsx",
    "app/projects/kaspi-courier/kaspi-courier-case.tsx",
  ];
  for (const file of files) {
    const source = await readFile(new URL(file, root), "utf8");
    assert.match(source, /CurrencyConverterPromo/);
  }
});

test("Kaspi courier presents the owned delivery model and expected outcomes in both languages", async () => {
  const source = await readFile(new URL("app/projects/kaspi-courier/kaspi-courier-case.tsx", root), "utf8");
  assert.match(source, /1\.8/);
  assert.match(source, /\+200%/);
  assert.match(source, /2,263/);
  assert.match(source, /-60%/);
  assert.match(source, /Expected outcomes/);
  assert.match(source, /Erwartete Ergebnisse/);
  assert.match(source, /impact: "Impact"/);
  assert.match(source, /impact: "Wirkung"/);
  assert.match(source, /case-impact-metrics/);
  assert.match(source, /The case covers service design, courier operations, mobile UX, and banking integration\./);
  assert.match(source, /Der Case umfasst Service Design, Kurierprozesse, Mobile UX und Bankintegration\./);
  assert.match(source, /subsid/i);
  assert.match(source, /subvention/i);
  assert.doesNotMatch(source, /Version 1\.0|Version 2\.0|first release|ersten Version/i);
  assert.doesNotMatch(source, /currently being prepared|wird derzeit vorbereitet|Work in progress|In Arbeit/);
});

test("Kaspi courier infographics connect every delivery brand", async () => {
  const diagrams = await readFile(new URL("app/projects/kaspi-courier/_components/courier-ecosystem-diagrams.tsx", root), "utf8");
  const css = await readFile(new URL("styles/site.css", root), "utf8");
  for (const brand of ["Kaspi.kz", "Kaspi Delivery", "Glovo", "Wolt", "Yandex", "VanOnGo"]) {
    assert.match(diagrams, new RegExp(brand.replace(".", "\\.")));
  }
  assert.match(diagrams, /courier-map-line-flow/);
  assert.match(diagrams, /courier-map-item/);
  assert.match(diagrams, /preserveAspectRatio="none"/);
  assert.match(diagrams, /beforeCaption: "Delivery"/);
  assert.match(diagrams, /"M124 180 L252 180"/);
  assert.match(diagrams, /"M252 180 C315 180 350 54 450 54"/);
  assert.match(diagrams, /const afterDesktop = \["M124 180 L474 180"\]/);
  assert.match(diagrams, /"M180 128 C180 140 54 150 45 174"/);
  assert.match(diagrams, /const afterMobile = \["M180 128 C180 145 180 158 180 174"\]/);
  assert.match(css, /\.courier-map-line-flow\{[^}]*animation:[^}]*courier-map-flow/);
  assert.match(css, /\.courier-map-item\{[^}]*animation:[^}]*courier-map-item-in/);
  assert.match(css, /\.courier-map-source\{left:12%;top:50%/);
  assert.match(css, /\.courier-map-before \.courier-map-target\{left:84%/);
  assert.match(css, /\.kaspi-courier-case \.case-impact-metrics\{margin-top:64px/);
});

test("Kaspi courier cards use cover media on the home page and project catalog", async () => {
  const home = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  const catalog = await readFile(new URL("app/projects/projects-catalog.tsx", root), "utf8");
  assert.doesNotMatch(home, /project\.href === "\/projects\/kaspi-courier" \? "project-media-contain"/);
  assert.doesNotMatch(catalog, /project\.href === "\/projects\/kaspi-courier" \? "project-media-contain"/);
});
