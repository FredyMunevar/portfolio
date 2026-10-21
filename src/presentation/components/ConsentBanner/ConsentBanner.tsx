"use client";
import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { readConsent, saveConsent } from "@/infrastructure/analytics/consent";
import { useTheme } from "@/context/ThemeContext";

const copy = {
  en: {
    text: "I use Google Analytics to understand which parts of this portfolio are useful. Is that OK?",
    accept: "Accept",
    reject: "No, thanks",
  },
  es: {
    text: "Uso Google Analytics para entender qué partes de este portafolio son útiles. ¿Estás de acuerdo?",
    accept: "Aceptar",
    reject: "No, gracias",
  },
} as const;

/**
 * Small cookie consent banner for Google Analytics (Consent Mode v2).
 * Shown until the visitor accepts or rejects; the choice is stored in localStorage.
 */
const ConsentBanner = () => {
  const locale = useLocale() === "es" ? "es" : "en";
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  const answer = (choice: "granted" | "denied") => {
    saveConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={locale === "es" ? "Consentimiento de analítica" : "Analytics consent"}
      className={`fixed z-40 bottom-m left-m right-[5.5rem] p-m flex flex-col gap-m border border-primary shadow-lg lg:right-auto lg:max-w-sm ${
        isDarkTheme ? "bg-secondary text-tertiary" : "bg-tertiary text-secondary"
      }`}
    >
      <p className="text-desc leading-relaxed">{copy[locale].text}</p>
      <div className="flex gap-m">
        <button
          type="button"
          className={`bg-primary border border-primary px-m py-s text-desc ${isDarkTheme ? "text-secondary" : "text-tertiary"}`}
          onClick={() => answer("granted")}
        >
          {copy[locale].accept}
        </button>
        <button
          type="button"
          className="border border-primary px-m py-s text-desc text-primary"
          onClick={() => answer("denied")}
        >
          {copy[locale].reject}
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
