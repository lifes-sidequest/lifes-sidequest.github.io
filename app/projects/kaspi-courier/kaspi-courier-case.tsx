"use client";

import CardFanCarousel from "@/components/ui/card-fan-carousel";
import Image from "next/image";
import { ProjectStatusBadge } from "../../_components/project-status-badge";
import { RevealCharacters } from "../../_components/reveal-characters";
import { SiteHeader } from "../../_components/site-header";
import { useSiteClock } from "../../_components/site-clock";
import { useSitePreferences } from "../../_components/site-preferences";
import { ViewportVideo } from "../../_components/viewport-video";
import { CaseEnding } from "../_components/case-ending";
import { CurrencyConverterPromo } from "../../_components/currency-converter-promo";
import { CourierEcosystemDiagrams } from "./_components/courier-ecosystem-diagrams";

const copy = {
  en: {
    eyebrow: "Kaspi.kz, Logistic app",
    title: "Kaspi courier",
    subtitle: "Building an owned express-delivery network inside the Kaspi ecosystem",
    intro: "Kaspi Delivery brings couriers, customers, orders, payments, and operational data into one connected product. The courier application guides the complete express-delivery cycle—from joining the platform and going online to collecting, routing, delivering, and confirming an order.",
    results: "Expected outcomes",
    resultItems: [
      { value: "1.8", label: "Target orders per hour" },
      { value: "+200%", label: "Expected courier productivity" },
      { value: "-60%", label: "Target CPO · 2,263 KZT/order" },
    ],
    problem: "Problem",
    problemText: "Kaspi did not have its own courier application or delivery workforce. Express orders were fulfilled through Glovo, Wolt, Yandex, and VanOnGo, while Kaspi subsidized delivery fees for customers. This partner model distributed courier relationships, delivery data, transaction flows, and operating hours across external services, limiting control over speed, cost, and the end-to-end customer experience.",
    goalsTitle: "Goals",
    goals: ["Create an owned express-delivery network that reduces reliance on external partners and subsidized delivery.", "Increase delivery speed, expand the express-delivery time window, and create new courier jobs inside the Kaspi ecosystem."],
    roleTitle: "My role as a product designer",
    roles: ["Mapped the end-to-end operating model across courier onboarding, order assignment, pickup, routing, delivery, returns, support, and payment.", "Designed the courier mobile experience, interaction states, safeguards, and integration points with the main Kaspi application and banking services."],
    solution: "Solution",
    solutionText: "Kaspi creates its own delivery application and brings couriers directly into the ecosystem. Integration with the main Kaspi application enables fast order and status exchange, while connected banking services simplify transactions between couriers and the bank. The owned network is designed to stop subsidizing partner delivery, accelerate fulfilment, extend express-delivery hours, create new jobs, and give Kaspi direct control over the complete delivery experience.",
    before: "Before",
    after: "After",
    practice: "In practice",
    ecosystem: "Across the ecosystem",
    variations: "Variations",
    impact: "Impact",
    impactTitle: "A faster, more sustainable delivery model",
    impactText: "The target operating model is expected to reach 1.8 orders per hour, increase courier productivity by 200%, and reduce CPO by 60% to 2,263 KZT per order. These figures are product and operational targets for the owned Kaspi Delivery network.",
    deeper: "Want to go deeper?",
    deeperText: "The case covers service design, courier operations, mobile UX, and banking integration. Get in touch to learn more.",
    next: "Back to projects",
    nextProject: "Selected work",
    nextClient: "Product design case studies",
    copyright: "© Designed and coded by Aziz Baratov ♥️",
    work: "What I do",
  },
  de: {
    eyebrow: "Kaspi.kz, Logistik-App",
    title: "Kaspi Kurier",
    subtitle: "Aufbau eines eigenen Express-Liefernetzwerks innerhalb des Kaspi-Ökosystems",
    intro: "Kaspi Delivery verbindet Kuriere, Kundinnen und Kunden, Bestellungen, Zahlungen und operative Daten in einem Produkt. Die Kurier-App führt durch den gesamten Express-Lieferzyklus – vom Beitritt zur Plattform und Arbeitsbeginn bis zu Abholung, Route, Zustellung und Bestätigung.",
    results: "Erwartete Ergebnisse",
    resultItems: [
      { value: "1.8", label: "Ziel: Aufträge pro Stunde" },
      { value: "+200%", label: "Erwartete Kurierproduktivität" },
      { value: "-60%", label: "Ziel-CPO · 2,263 KZT/Auftrag" },
    ],
    problem: "Problem",
    problemText: "Kaspi hatte weder eine eigene Kurier-App noch eine eigene Lieferflotte. Express-Bestellungen wurden über Glovo, Wolt, Yandex und VanOnGo abgewickelt, während Kaspi die Lieferkosten für Kundinnen und Kunden subventionierte. Dadurch waren Kurierbeziehungen, Lieferdaten, Transaktionsabläufe und Betriebszeiten auf externe Dienste verteilt, was die Kontrolle über Geschwindigkeit, Kosten und das End-to-End-Erlebnis einschränkte.",
    goalsTitle: "Ziele",
    goals: ["Ein eigenes Express-Liefernetzwerk schaffen und die Abhängigkeit von externen Partnern sowie subventionierten Lieferungen reduzieren.", "Lieferungen beschleunigen, das Zeitfenster für Express-Lieferungen erweitern und neue Kurierarbeitsplätze im Kaspi-Ökosystem schaffen."],
    roleTitle: "Meine Rolle als Product Designer",
    roles: ["Das End-to-End-Betriebsmodell für Onboarding, Auftragsvergabe, Abholung, Routing, Zustellung, Rückgaben, Support und Auszahlung strukturiert.", "Die mobile Kuriererfahrung, Interaktionszustände, Sicherheitsmechanismen und Integrationspunkte mit der Kaspi-Hauptanwendung und den Bankdiensten gestaltet."],
    solution: "Lösung",
    solutionText: "Kaspi entwickelt eine eigene Liefer-App und bindet Kuriere direkt in das Ökosystem ein. Die Integration mit der Kaspi-Hauptanwendung ermöglicht einen schnellen Austausch von Bestell- und Statusdaten; verbundene Bankdienste vereinfachen Transaktionen zwischen Kurieren und der Bank. Das eigene Netzwerk soll subventionierte Partnerlieferungen ersetzen, die Zustellung beschleunigen, Express-Zeiten erweitern, neue Arbeitsplätze schaffen und Kaspi direkte Kontrolle über das gesamte Liefererlebnis geben.",
    before: "Vorher",
    after: "Nachher",
    practice: "In der Praxis",
    ecosystem: "Im gesamten Ökosystem",
    variations: "Varianten",
    impact: "Wirkung",
    impactTitle: "Ein schnelleres und nachhaltigeres Liefermodell",
    impactText: "Das Zielmodell soll 1.8 Aufträge pro Stunde erreichen, die Kurierproduktivität um 200% steigern und den CPO um 60% auf 2,263 KZT pro Auftrag senken. Diese Werte sind Produkt- und Betriebsziele für das eigene Kaspi-Delivery-Netzwerk.",
    deeper: "Mehr erfahren?",
    deeperText: "Der Case umfasst Service Design, Kurierprozesse, Mobile UX und Bankintegration. Melden Sie sich, um mehr zu erfahren.",
    next: "Zurück zu den Projekten",
    nextProject: "Ausgewählte Arbeiten",
    nextClient: "Product-Design-Fallstudien",
    copyright: "© Entworfen und programmiert von Aziz Baratov ♥️",
    work: "Meine Arbeit",
  },
} as const;

const lightCarouselCards = [
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
].map((file) => ({ imgUrl: `/images/projects/kaspi-courier/carousel/${file}` }));

const darkCarouselCards = [
  "01-profile-dark.webp",
  "02-theme-dark.webp",
  "03-update-dark.webp",
  "04-permissions-dark.webp",
  "05-login-dark.webp",
  "06-demand-dark.webp",
  "07-splash-dark.webp",
  "08-offline-dark.webp",
  "09-delivery-dark.webp",
  "10-pause-dark.webp",
  "11-location-dark.webp",
].map((file) => ({ imgUrl: `/images/projects/kaspi-courier/carousel/${file}` }));

function Placeholder({ className = "", label }: { className?: string; label: string }) {
  return <div className={`case-placeholder scroll-reveal ${className}`.trim()} aria-label={label} />;
}

export function KaspiCourierCase() {
  const now = useSiteClock();
  const { language, theme, languageHasChanged } = useSitePreferences();
  const text = copy[language];
  const carouselCards = theme === "dark" ? darkCarouselCards : lightCarouselCards;
  const time = now
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin" }).format(now)
    : "";

  return (
    <main className="case-page kaspi-courier-case">
      <SiteHeader />

      <div className="case-layout">
        <aside className={`case-intro${languageHasChanged ? " hero-language-static" : ""}`}>
          <div className="case-eyebrow-row">
            <p className="case-eyebrow"><RevealCharacters>{text.eyebrow}</RevealCharacters></p>
            <ProjectStatusBadge status="in-production" language={language} className="case-eyebrow-badge" />
          </div>
          <h1><RevealCharacters>{text.title}</RevealCharacters></h1>
          <h2><RevealCharacters>{text.subtitle}</RevealCharacters></h2>
          <div className="case-intro-copy case-intro-reveal"><p>{text.intro}</p></div>
          <div className="case-results case-intro-reveal case-intro-results" aria-label={text.results}>
            {text.resultItems.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>
        </aside>

        <article className="case-content">
          <ViewportVideo
            key={`kaspi-courier-hero-${theme}`}
            src={theme === "dark"
              ? "/images/projects/kaspi-courier/kaspi-courier-dark.mp4"
              : "/images/projects/kaspi-courier/kaspi-courier-light.mp4"}
            poster={theme === "dark"
              ? "/images/projects/kaspi-courier/kaspi-courier-poster-dark.jpg"
              : "/images/projects/kaspi-courier/kaspi-courier-poster-light.jpg"}
            className="case-media-hero case-project-image"
            fit="cover"
            aria-label="Kaspi courier interface preview"
          />
          <div className="case-placeholder case-media-wide case-overview-media scroll-reveal">
            <Image
              src={theme === "dark"
                ? "/images/projects/kaspi-courier/overview-dark.jpg"
                : "/images/projects/kaspi-courier/overview-light.jpg"}
              alt="Kaspi courier navigation and delivery interface screens"
              width={2200}
              height={1867}
              sizes="(max-width: 760px) calc(100vw - 32px), 64vw"
              className="kaspi-courier-overview"
              priority
            />
          </div>

          <section className="case-text-section scroll-reveal">
            <h3>{text.problem}</h3>
            <div><p>{text.problemText}</p></div>
          </section>

          <Placeholder className="case-media-wide case-media-tall" label="Kaspi courier problem placeholder" />

          <section className="case-project-infographic case-media-wide" aria-label={`${text.goalsTitle} and ${text.roleTitle}`}>
            <article><h4>{text.goalsTitle}</h4><ul>{text.goals.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h4>{text.roleTitle}</h4><ul>{text.roles.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </section>

          <section className="case-text-section scroll-reveal">
            <h3>{text.solution}</h3>
            <div><p>{text.solutionText}</p></div>
          </section>

          <CourierEcosystemDiagrams language={language} />
        </article>
      </div>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.practice}</h3>
        <div className="case-gallery-grid">
          <ViewportVideo
            key={`kaspi-courier-auth-${theme}`}
            src={theme === "dark"
              ? "/images/projects/kaspi-courier/auth-dark.webm"
              : "/images/projects/kaspi-courier/auth-light.webm"}
            mobileSrc={theme === "dark"
              ? "/images/projects/kaspi-courier/auth-dark.mp4"
              : "/images/projects/kaspi-courier/auth-light.mp4"}
            fit="contain"
            className="case-placeholder case-practice-video kaspi-courier-auth-video"
            aria-label="Kaspi courier authentication flow"
          />
          <ViewportVideo
            key={`kaspi-courier-search-${theme}`}
            src={theme === "dark"
              ? "/images/projects/kaspi-courier/search-dark.webm"
              : "/images/projects/kaspi-courier/search-light.webm"}
            mobileSrc={theme === "dark"
              ? "/images/projects/kaspi-courier/search-dark.mp4"
              : "/images/projects/kaspi-courier/search-light.mp4"}
            fit="contain"
            className="case-placeholder case-practice-video kaspi-courier-auth-video"
            aria-label="Kaspi courier delivery search flow"
          />
          <ViewportVideo
            key={`kaspi-courier-result-${theme}`}
            src={theme === "dark"
              ? "/images/projects/kaspi-courier/result-dark.webm"
              : "/images/projects/kaspi-courier/result-light.webm"}
            mobileSrc={theme === "dark"
              ? "/images/projects/kaspi-courier/result-dark.mp4"
              : "/images/projects/kaspi-courier/result-light.mp4"}
            fit="contain"
            className="case-placeholder case-practice-video kaspi-courier-auth-video"
            aria-label="Kaspi courier delivery result flow"
          />
          <ViewportVideo
            key={`kaspi-courier-money-${theme}`}
            src={theme === "dark"
              ? "/images/projects/kaspi-courier/money-dark.webm"
              : "/images/projects/kaspi-courier/money-light.webm"}
            mobileSrc={theme === "dark"
              ? "/images/projects/kaspi-courier/money-dark.mp4"
              : "/images/projects/kaspi-courier/money-light.mp4"}
            fit="contain"
            className="case-placeholder case-practice-video kaspi-courier-auth-video"
            aria-label="Kaspi courier earnings flow"
          />
        </div>
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.ecosystem}</h3>
        <div className="case-placeholder case-media-panorama case-project-image kaspi-courier-ecosystem-media" aria-label="Kaspi Delivery identity and courier transport lineup">
          <Image
            src={theme === "dark"
              ? "/images/projects/kaspi-courier/ecosystem-identity-dark.webp"
              : "/images/projects/kaspi-courier/ecosystem-identity.webp"}
            alt="Kaspi Delivery identity with courier, car, bicycle, motorcycle, and scooter"
            fill
            sizes="(max-width: 900px) 100vw, 59vw"
            className="kaspi-courier-ecosystem-artwork"
          />
        </div>
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.variations}</h3>
        <div className="case-variation-grid">
          <div className="case-placeholder kaspi-courier-variation-media" aria-label="Kaspi Delivery customer tracking interface">
            <Image
              src={theme === "dark"
                ? "/images/projects/kaspi-courier/variation-client-dark.webp"
                : "/images/projects/kaspi-courier/variation-client-light.webp"}
              alt="Kaspi Delivery customer tracking interface"
              fill
              sizes="(max-width: 809px) 100vw, 20vw"
              className="kaspi-courier-variation-image"
            />
          </div>
          <div className="case-placeholder kaspi-courier-variation-media" aria-label="Kaspi Delivery pickup code interface">
            <Image
              src={theme === "dark"
                ? "/images/projects/kaspi-courier/variation-code-dark.webp"
                : "/images/projects/kaspi-courier/variation-code-light.webp"}
              alt="Kaspi Delivery pickup code interface"
              fill
              sizes="(max-width: 809px) 100vw, 20vw"
              className="kaspi-courier-variation-image"
            />
          </div>
          <div className="case-placeholder kaspi-courier-variation-media" aria-label="Kaspi Delivery customer signature interface">
            <Image
              src={theme === "dark"
                ? "/images/projects/kaspi-courier/variation-sign-dark.webp"
                : "/images/projects/kaspi-courier/variation-sign-light.webp"}
              alt="Kaspi Delivery customer signature interface"
              fill
              sizes="(max-width: 809px) 100vw, 20vw"
              className="kaspi-courier-variation-image"
            />
          </div>
        </div>
        <CardFanCarousel
          key={`kaspi-courier-carousel-${theme}`}
          cards={carouselCards}
          cardRatio={1114 / 2278}
          className="case-placeholder case-media-wide case-variation-wide scroll-reveal"
        />
      </section>

      <section className="case-text-section case-impact scroll-reveal">
        <h3>{text.impact}</h3>
        <div className="case-impact-content">
          <div className="case-impact-story"><section><h4>{text.impactTitle}</h4><p>{text.impactText}</p></section></div>
          <div className="case-impact-metrics">
            {text.resultItems.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseEnding current="kaspi-courier" language={language} theme={theme} title={text.deeper} description={text.deeperText} />

      <footer id="index" className="scroll-reveal"><p>{text.copyright}</p><p>{time}, Berlin, DE</p><CurrencyConverterPromo language={language} /></footer>
    </main>
  );
}
