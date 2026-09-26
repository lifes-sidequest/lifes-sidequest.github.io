type CurrencyConverterPromoProps = { language: "en" | "de" };

const copy = {
  en: {
    heading: "Convert currencies without losing the moment",
    headingLines: ["Convert currencies without", "losing the moment"],
    body: "A focused mobile experience for quick, clear currency conversion wherever you are.",
  },
  de: {
    heading: "Währungen umrechnen, ohne den Moment zu verlieren",
    headingLines: ["Währungen umrechnen, ohne", "den Moment zu verlieren"],
    body: "Eine fokussierte mobile Anwendung für schnelle und verständliche Währungsumrechnung – überall.",
  },
} as const;

export function CurrencyConverterPromo({ language }: CurrencyConverterPromoProps) {
  const text = copy[language];
  return (
    <section className="currency-promo" aria-label={text.heading}>
      <div className="currency-promo-grid" aria-hidden="true" />
      <div className="currency-promo-sphere" aria-hidden="true" />
      <div className="currency-promo-content">
        <span className="currency-promo-badge">COMING SOON ON iOS</span>
        <h2>{text.headingLines.map((line) => <span key={line}>{line}</span>)}</h2>
        <p>{text.body}</p>
      </div>
    </section>
  );
}
