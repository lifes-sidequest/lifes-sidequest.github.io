import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const kaspiCase = new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root);
const projectContent = new URL("content/projects.ts", root);
const carPartsCase = new URL("app/projects/car-parts/car-parts-case.tsx", root);
const courierCase = new URL("app/projects/kaspi-courier/kaspi-courier-case.tsx", root);
const caseEnding = new URL("app/projects/_components/case-ending.tsx", root);

const originalKaspiVideos = [
  "home-page.mp4",
  "home-page-dark.mp4",
  "main-white.mp4",
  "main-dark.mp4",
  "searchbar-light-2.webm",
  "searchbar-dark.webm",
  "carousel-light-square.webm",
  "carousel-dark-square.webm",
  "magnum-light-3.webm",
  "magnum-dark-1.webm",
  "all-page-light.webm",
  "all-page-dark.webm",
  "system-light-2.webm",
  "system-dark.webm",
];

test("Kaspi case and project cards use the original videos with their intended backgrounds", async () => {
  const [caseSource, projectSource] = await Promise.all([
    readFile(kaspiCase, "utf8"),
    readFile(projectContent, "utf8"),
  ]);
  const activeSource = `${caseSource}\n${projectSource}`;

  for (const file of originalKaspiVideos) {
    assert.match(activeSource, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced`);
    const asset = new URL(`public/images/projects/kaspi-home/${file}`, root);
    assert.ok((await stat(asset)).size > 0, `${file} should exist`);
  }

  assert.doesNotMatch(activeSource, /kaspi-home\/[^"']+-web\.mp4/);
});

test("Car Parts ecosystem demo uses the original videos", async () => {
  const source = await readFile(carPartsCase, "utf8");
  const originalVideos = ["demo-car-parts-light2.mp4", "demo-car-parts-dark.mp4"];

  for (const file of originalVideos) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced`);
    const asset = new URL(`public/images/projects/car-parts/${file}`, root);
    assert.ok((await stat(asset)).size > 0, `${file} should exist`);
  }

  assert.match(source, /className="case-placeholder case-media-panorama case-practice-video car-parts-practice-video scroll-reveal"\s+fit="contain"/);
  assert.doesNotMatch(source, /demo-car-parts-(?:light|dark)-web\.mp4/);
});

test("Kaspi courier cover is used across project cards, the case hero, and project navigation", async () => {
  const [projectSource, caseSource, endingSource] = await Promise.all([
    readFile(projectContent, "utf8"),
    readFile(courierCase, "utf8"),
    readFile(caseEnding, "utf8"),
  ]);

  const files = [
    "kaspi-courier-light.mp4",
    "kaspi-courier-dark.mp4",
    "kaspi-courier-poster-light.jpg",
    "kaspi-courier-poster-dark.jpg",
  ];

  for (const file of files) {
    const reference = new RegExp(file.replaceAll(".", "\\."));
    assert.match(projectSource, reference, `${file} should be referenced by project cards`);
    assert.match(caseSource, reference, `${file} should be referenced by the case hero`);
    assert.match(endingSource, reference, `${file} should be referenced by project navigation`);

    const asset = new URL(`public/images/projects/kaspi-courier/${file}`, root);
    assert.ok((await stat(asset)).size > 0, `${file} should exist`);
  }
});

test("Kaspi courier overview matches the reference scale and top crop", async () => {
  const [caseSource, styles] = await Promise.all([
    readFile(courierCase, "utf8"),
    readFile(new URL("styles/site.css", root), "utf8"),
  ]);

  for (const file of ["overview-light.jpg", "overview-dark.jpg"]) {
    assert.match(caseSource, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the case overview`);
    const asset = new URL(`public/images/projects/kaspi-courier/${file}`, root);
    assert.ok((await stat(asset)).size > 0, `${file} should exist`);
  }

  assert.match(caseSource, /kaspi-courier-overview/);
  assert.match(styles, /\.case-overview-media\s*\{[^}]*position:\s*relative[^}]*overflow:\s*hidden/s);
  assert.match(styles, /\.kaspi-courier-overview\s*\{[^}]*position:\s*absolute[^}]*top:\s*5%[^}]*left:\s*50%[^}]*width:\s*90%[^}]*height:\s*auto[^}]*translateX\(-50%\)/s);
});

test("Kaspi courier uses the shared case-section titles in English and German", async () => {
  const source = await readFile(courierCase, "utf8");

  for (const title of [
    "In practice",
    "Across the ecosystem",
    "Variations",
    "In der Praxis",
    "Im gesamten Ökosystem",
    "Varianten",
  ]) {
    assert.match(source, new RegExp(`(?:practice|ecosystem|variations): "${title}"`), `${title} should match the other case studies`);
  }

  for (const legacyTitle of ["The courier journey", "One connected delivery ecosystem", "Delivery scenarios", "Die Kurierreise", "Ein verbundenes Lieferökosystem", "Lieferszenarien"]) {
    assert.doesNotMatch(source, new RegExp(legacyTitle));
  }
});

test("Kaspi courier shows the ecosystem identity artwork in both themes", async () => {
  const source = await readFile(courierCase, "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");
  const files = ["ecosystem-identity.webp", "ecosystem-identity-dark.webp"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the ecosystem artwork`);
    await access(new URL(`public/images/projects/kaspi-courier/${file}`, root));
  }

  assert.match(source, /src=\{theme === "dark"[\s\S]*?ecosystem-identity-dark\.webp[\s\S]*?ecosystem-identity\.webp/);
  assert.match(source, /className="kaspi-courier-ecosystem-artwork"/);
  assert.doesNotMatch(source, /label="Kaspi courier ecosystem placeholder"/);
  assert.match(styles, /\.kaspi-courier-ecosystem-media\s*\{[^}]*position:\s*relative[^}]*overflow:\s*hidden/s);
  assert.match(styles, /\.kaspi-courier-ecosystem-artwork\s*\{[^}]*object-fit:\s*contain[^}]*object-position:\s*center/s);
});

test("Kaspi courier shows the themed authentication video without cropping", async () => {
  const source = await readFile(courierCase, "utf8");
  const files = ["auth-light.webm", "auth-dark.webm", "auth-light.mp4", "auth-dark.mp4"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the first practice card`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.match(source, /fit="contain"/);
  assert.match(source, /className="case-placeholder case-practice-video kaspi-courier-auth-video"/);
  assert.match(await readFile(new URL("styles/site.css", root), "utf8"), /\.kaspi-courier-auth-video \.viewport-video-media\s*\{[^}]*transform:\s*scale\(1\.2\)/s);
  assert.doesNotMatch(source, /Kaspi courier practice placeholder 1/);
});

test("Kaspi courier shows the themed search video with the same practice-card treatment", async () => {
  const source = await readFile(courierCase, "utf8");
  const files = ["search-light.webm", "search-dark.webm", "search-light.mp4", "search-dark.mp4"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the second practice card`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.match(source, /className="case-placeholder case-practice-video kaspi-courier-auth-video"\s+aria-label="Kaspi courier delivery search flow"/);
  assert.doesNotMatch(source, /Kaspi courier practice placeholder 2/);
});

test("Kaspi courier shows the themed results video with the same practice-card treatment", async () => {
  const source = await readFile(courierCase, "utf8");
  const files = ["result-light.webm", "result-dark.webm", "result-light.mp4", "result-dark.mp4"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the third practice card`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.match(source, /className="case-placeholder case-practice-video kaspi-courier-auth-video"\s+aria-label="Kaspi courier delivery result flow"/);
  assert.doesNotMatch(source, /Kaspi courier practice placeholder 3/);
});

test("Kaspi courier shows the themed money video with the same practice-card treatment", async () => {
  const source = await readFile(courierCase, "utf8");
  const files = ["money-light.webm", "money-dark.webm", "money-light.mp4", "money-dark.mp4"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the fourth practice card`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.equal(source.match(/className="case-placeholder case-practice-video kaspi-courier-auth-video"/g)?.length, 4);
  assert.doesNotMatch(source, /Kaspi courier practice placeholder 4/);
});

test("Kaspi courier shows the themed client variation centered and filling the first card", async () => {
  const [source, styles] = await Promise.all([
    readFile(courierCase, "utf8"),
    readFile(new URL("styles/site.css", root), "utf8"),
  ]);
  const files = ["variation-client-light.webp", "variation-client-dark.webp"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the first variation card`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.match(source, /className="case-placeholder kaspi-courier-variation-media"/);
  assert.match(source, /className="kaspi-courier-variation-image"/);
  assert.doesNotMatch(source, /Kaspi courier variation placeholder 1/);
  assert.match(styles, /\.kaspi-courier-variation-media\s*\{[^}]*position:\s*relative[^}]*overflow:\s*hidden/s);
  assert.match(styles, /\.kaspi-courier-variation-image\s*\{[^}]*object-fit:\s*cover[^}]*object-position:\s*center/s);
});

test("Kaspi courier shows the themed code variation with the same treatment in the second card", async () => {
  const source = await readFile(courierCase, "utf8");
  const files = ["variation-code-light.webp", "variation-code-dark.webp"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the second variation card`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.ok((source.match(/className="case-placeholder kaspi-courier-variation-media"/g)?.length ?? 0) >= 2);
  assert.ok((source.match(/className="kaspi-courier-variation-image"/g)?.length ?? 0) >= 2);
  assert.doesNotMatch(source, /Kaspi courier variation placeholder 2/);
});

test("Kaspi courier shows the themed signature variation with the same treatment in the third card", async () => {
  const source = await readFile(courierCase, "utf8");
  const files = ["variation-sign-light.webp", "variation-sign-dark.webp"];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced by the third variation card`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.equal(source.match(/className="case-placeholder kaspi-courier-variation-media"/g)?.length, 3);
  assert.equal(source.match(/className="kaspi-courier-variation-image"/g)?.length, 3);
  assert.doesNotMatch(source, /Kaspi courier variation placeholder 3/);
});

test("Kaspi courier uses the shared fan carousel in the wide variation slot", async () => {
  const source = await readFile(courierCase, "utf8");

  assert.match(source, /import CardFanCarousel from "@\/components\/ui\/card-fan-carousel"/);
  assert.match(source, /<CardFanCarousel[\s\S]*?cards=\{carouselCards\}[\s\S]*?className="case-placeholder case-media-wide case-variation-wide scroll-reveal"/);
  assert.doesNotMatch(source, /Kaspi courier wide variation placeholder/);
});

test("Kaspi courier uses eleven ordered project cards in both carousel themes", async () => {
  const source = await readFile(courierCase, "utf8");
  const files = [
    "01-profile.webp",
    "02-theme.webp",
    "03-update.webp",
    "04-permissions.webp",
    "05-login.webp",
    "06-demand.webp",
    "07-splash.webp",
    "08-offline.webp",
    "09-delivery.webp",
    "10-pause.webp",
    "11-location.webp",
  ];

  for (const file of files) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should keep its numeric order`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/carousel/${file}`, root))).size > 0, `${file} should exist`);
  }

  const darkFiles = files.map((file) => file.replace(".webp", "-dark.webp"));

  for (const file of darkFiles) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should keep its numeric order`);
    assert.ok((await stat(new URL(`public/images/projects/kaspi-courier/carousel/${file}`, root))).size > 0, `${file} should exist`);
  }

  assert.match(source, /const darkCarouselCards = \[[\s\S]*?01-profile-dark\.webp[\s\S]*?11-location-dark\.webp/);
  assert.match(source, /theme === "dark" \? darkCarouselCards : lightCarouselCards/);
  assert.doesNotMatch(source, /tes-carusel-dark/);
});

test("Kaspi courier gives the fan carousel its native card ratio without changing the Car Parts default", async () => {
  const [courierSource, carouselSource] = await Promise.all([
    readFile(courierCase, "utf8"),
    readFile(new URL("components/ui/card-fan-carousel.tsx", root), "utf8"),
  ]);

  assert.match(courierSource, /<CardFanCarousel[\s\S]*?cardRatio=\{1114 \/ 2278\}/);
  assert.match(carouselSource, /cardRatio\?: number/);
  assert.match(carouselSource, /CardFanCarousel\(\{ cards, className = "", cardRatio = 1113 \/ 2420 \}/);
  assert.match(carouselSource, /const cardWidth = cardHeight \* cardRatio/);
});
