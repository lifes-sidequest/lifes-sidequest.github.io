import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteLanguage } from "../../../_components/site-preferences";

type DeliveryBrand = { name: string; image: string };

const partners: DeliveryBrand[] = [
  { name: "Glovo", image: "/images/projects/kaspi-courier/partners/glovo.webp" },
  { name: "Wolt", image: "/images/projects/kaspi-courier/partners/wolt.webp" },
  { name: "Yandex", image: "/images/projects/kaspi-courier/partners/yandex.webp" },
  { name: "VanOnGo", image: "/images/projects/kaspi-courier/partners/vanongo.webp" },
];

const kaspi = { name: "Kaspi.kz", image: "/images/projects/kaspi-courier/partners/kaspi.webp" };
const kaspiDelivery = { name: "Kaspi Delivery", image: "/images/projects/kaspi-courier/partners/kaspi-delivery.webp" };

const copy = {
  en: { before: "Before", beforeCaption: "Delivery", after: "After", afterCaption: "One integrated delivery ecosystem" },
  de: { before: "Vorher", beforeCaption: "Lieferung", after: "Nachher", afterCaption: "Ein integriertes Lieferökosystem" },
} as const;

const beforeDesktop = [
  "M124 180 L252 180",
  "M252 180 C315 180 350 54 450 54",
  "M252 180 C330 180 360 138 450 138",
  "M252 180 C330 180 360 222 450 222",
  "M252 180 C315 180 350 306 450 306",
];
const beforeMobile = [
  "M180 128 C180 140 54 150 45 174",
  "M180 128 C180 145 125 158 135 174",
  "M180 128 C180 145 235 158 225 174",
  "M180 128 C180 140 306 150 315 174",
];
const afterDesktop = ["M124 180 L474 180"];
const afterMobile = ["M180 128 C180 145 180 158 180 174"];

function AnimatedLines({ paths, className }: { paths: string[]; className: string }) {
  return (
    <svg className={`courier-map-lines ${className}`} viewBox={className.includes("mobile") ? "0 0 360 310" : "0 0 600 360"} preserveAspectRatio="none" aria-hidden="true">
      {paths.map((path, index) => (
        <g key={path} style={{ "--line-index": index } as CSSProperties}>
          <path className="courier-map-line-base" d={path} />
          <path className="courier-map-line-flow" d={path} pathLength="100" />
        </g>
      ))}
    </svg>
  );
}

function BrandNode({ brand, className, index }: { brand: DeliveryBrand; className: string; index: number }) {
  return (
    <div className={`courier-map-item ${className}`} style={{ "--item-index": index } as CSSProperties}>
      <Image src={brand.image} alt="" width={64} height={64} />
      <span>{brand.name}</span>
    </div>
  );
}

function Diagram({ kind }: { kind: "before" | "after" }) {
  const isBefore = kind === "before";
  const targets = isBefore ? partners : [kaspiDelivery];
  return (
    <div className={`courier-map courier-map-${kind}`}>
      <AnimatedLines paths={isBefore ? beforeDesktop : afterDesktop} className="courier-map-lines-desktop" />
      <AnimatedLines paths={isBefore ? beforeMobile : afterMobile} className="courier-map-lines-mobile" />
      <BrandNode brand={kaspi} className="courier-map-source" index={0} />
      <div className="courier-map-targets">
        {targets.map((brand, index) => (
          <BrandNode brand={brand} className={`courier-map-target courier-map-target-${index + 1}`} index={index + 1} key={brand.name} />
        ))}
      </div>
    </div>
  );
}

export function CourierEcosystemDiagrams({ language }: { language: SiteLanguage }) {
  const text = copy[language];
  return (
    <div className="case-media-pair courier-ecosystem-diagrams">
      <article className="case-solution-bento courier-diagram-card scroll-reveal" aria-label={`${text.before}: ${text.beforeCaption}`}>
        <header><h4>{text.before}</h4><p>{text.beforeCaption}</p></header>
        <Diagram kind="before" />
      </article>
      <article className="case-solution-bento courier-diagram-card scroll-reveal" aria-label={`${text.after}: ${text.afterCaption}`}>
        <header><h4>{text.after}</h4><p>{text.afterCaption}</p></header>
        <Diagram kind="after" />
      </article>
    </div>
  );
}
