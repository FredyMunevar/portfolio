import { servicesUrls } from "../constants/servicesUrls";

// const BASE_URL = ["https://portfolio-api-two-theta.vercel.app"];
const BASE_URL = [servicesUrls.messages];

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
  const res = await fetch(`${BASE_URL}/${locale}`, {
    next: { revalidate: 3600 }, // optional: cache for 1 hour
  });
  if (!res.ok) throw new Error("Failed to fetch translations");
  return res.json();
};
