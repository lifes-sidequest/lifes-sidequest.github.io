import type { SiteLanguage } from "./site-preferences";

export function ComingSoonBadge({ language }: { language: SiteLanguage }) {
  return (
    <span className="coming-soon-badge project-status">
      {language === "de" ? "DEMNÄCHST" : "COMING SOON"}
    </span>
  );
}
