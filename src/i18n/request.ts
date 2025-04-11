import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { cache } from "react";

const getMessages = cache(async (locale: string | { locale?: string }) => {
  const normalizedLocale = typeof locale === "string" ? locale : locale?.locale;

  if (!normalizedLocale) {
    throw new Error("❌ Locale is missing or invalid");
  }

  const url = `${servicesUrls.api}/${normalizedLocale}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`❌ Failed to fetch messages for locale: ${normalizedLocale}`);
  }

  const messages = await res.json();

  return {
    locale: normalizedLocale,
    messages,
  };
});

export default getMessages;
