import { servicesUrls } from "../constants/servicesUrls";

// const BASE_URL = "https://portfolio-api-two-theta.vercel.app";
const BASE_URL = servicesUrls.api;

/**
 * Fetches localized messages from the API for the given locale.
 * This function retrieves translations or messages for the application based on the provided locale.
 *
 * @async
 * @function
 * @param {string} locale - The locale for which messages should be fetched (e.g., "en", "es").
 * @returns {Promise<Object>} A promise that resolves to the JSON response containing the messages.
 * @throws {Error} Throws an error if the API request fails.
 *
 * @example
 * ```typescript
 * const messages = await getMessagesFromAPI("en");
 * console.log(messages);
 * ```
 */
export const getMessagesFromAPI = async (locale: string) => {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API is not configured");
  }

  const normalizedLocale = locale.trim().toLowerCase();
  const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
  const res = await fetch(`${normalizedBaseUrl}/${normalizedLocale}`, {
    next: { revalidate: 3600 }, // optional: cache for 1 hour
  });
  if (!res.ok) throw new Error("Failed to fetch translations");
  return res.json();
};
