import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getMessagesFromAPI } from "@/infrastructure/services/fetchMessagesFromAPI";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "es")) {
    locale = routing.defaultLocale;
  }

  const messages = await getMessagesFromAPI(locale);

  return {
    locale,
    messages,
  };
});
