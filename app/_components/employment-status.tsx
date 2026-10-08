"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { RevealCharacters } from "./reveal-characters";
import { startSecondClock } from "./second-clock";

const employmentStart = Date.UTC(2024, 2, 1, 9, 0, 0);
const berlinDateTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hourCycle: "h23",
});

function getEmploymentDuration(now: Date, language: "en" | "de") {
  const parts = Object.fromEntries(
    berlinDateTime.formatToParts(now)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, Number(value)]),
  );
  const current = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  const cursor = new Date(employmentStart);

  let years = parts.year - 2024;
  cursor.setUTCFullYear(cursor.getUTCFullYear() + years);
  if (cursor.getTime() > current) {
    years -= 1;
    cursor.setUTCFullYear(cursor.getUTCFullYear() - 1);
  }

  let months = (parts.year - cursor.getUTCFullYear()) * 12 + parts.month - 1 - cursor.getUTCMonth();
  cursor.setUTCMonth(cursor.getUTCMonth() + months);
  if (cursor.getTime() > current) {
    months -= 1;
    cursor.setUTCMonth(cursor.getUTCMonth() - 1);
  }

  let remainder = Math.max(0, current - cursor.getTime());
  const days = Math.floor(remainder / 86_400_000);
  remainder %= 86_400_000;
  const hours = Math.floor(remainder / 3_600_000);
  remainder %= 3_600_000;
  const minutes = Math.floor(remainder / 60_000);
  const seconds = Math.floor((remainder % 60_000) / 1_000);

  return language === "de"
    ? `${years} J., ${months} Mon., ${days} Tage, ${hours} Std., ${minutes} Min., ${seconds} Sek.`
    : `${years} yrs, ${months} mos, ${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs.`;
}

type EmploymentStatusProps = {
  initialNow: Date | null;
  language: "en" | "de";
  prefix: string;
  fallback: string;
  open: string;
};

export function EmploymentStatus({ initialNow, language, prefix, fallback, open }: EmploymentStatusProps) {
  const [now, setNow] = useState<Date | null>(initialNow);

  useEffect(() => startSecondClock({
    onTick: setNow,
    now: () => new Date(),
    isVisible: () => document.visibilityState === "visible",
    subscribeVisibility: (listener) => {
      document.addEventListener("visibilitychange", listener);
      return () => document.removeEventListener("visibilitychange", listener);
    },
    setTimeout: (callback, delay) => window.setTimeout(callback, delay),
    clearTimeout: (id) => window.clearTimeout(id),
    setInterval: (callback, delay) => window.setInterval(callback, delay),
    clearInterval: (id) => window.clearInterval(id),
  }), []);

  const duration = now ? getEmploymentDuration(now, language) : "";
  const suffix = language === "de" ? " bei Kaspi.kz. " : " ";
  const text = duration ? `${prefix}${duration}${suffix}` : fallback;

  return (
    <p aria-label={`${text}${open}`}>
      {duration ? (
        <>
          <RevealCharacters>{prefix}</RevealCharacters>
          <span className="hero-counter">
            <RevealCharacters offset={prefix.length}>{duration}</RevealCharacters>
          </span>
          <RevealCharacters offset={prefix.length + duration.length}>{suffix}</RevealCharacters>
        </>
      ) : (
        <RevealCharacters>{text}</RevealCharacters>
      )}
      {duration && (
        <span
          className="availability-badge project-status-online"
          style={{ "--badge-reveal-delay": `${text.length * 10 + 150}ms` } as CSSProperties}
        >
          <i className="project-status-dot" aria-hidden="true" />
          <span>{open}</span>
        </span>
      )}
    </p>
  );
}
