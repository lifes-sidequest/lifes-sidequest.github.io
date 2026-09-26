"use client";

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
    practice: "The courier journey",
    ecosystem: "One connected delivery ecosystem",
    variations: "Delivery scenarios",
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
    practice: "Die Kurierreise",
    ecosystem: "Ein verbundenes Lieferökosystem",
    variations: "Lieferszenarien",
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

function Placeholder({ className = "", label }: { className?: string; label: string }) {
  return <div className={`case-placeholder scroll-reveal ${className}`.trim()} aria-label={label} />;
}

export function KaspiCourierCase() {
  const now = useSiteClock();
  const { language, theme, languageHasChanged } = useSitePreferences();
  const text = copy[language];
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
          <Placeholder className="case-media-wide" label="Kaspi courier project overview placeholder" />

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
        <div className="case-gallery-grid">{Array.from({ length: 4 }, (_, index) => <Placeholder key={index} label={`Kaspi courier practice placeholder ${index + 1}`} />)}</div>
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.ecosystem}</h3>
        <Placeholder className="case-media-panorama" label="Kaspi courier ecosystem placeholder" />
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.variations}</h3>
        <div className="case-variation-grid">{Array.from({ length: 3 }, (_, index) => <Placeholder key={index} label={`Kaspi courier variation placeholder ${index + 1}`} />)}</div>
        <Placeholder className="case-media-wide case-variation-wide" label="Kaspi courier wide variation placeholder" />
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
