import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
export const locales = ["en", "es"] as const;
export const routing = defineRouting({
  // List of supported languages
  locales: locales,
  // Default language
  defaultLocale: "en",
});
// Custom navigation helpers to work with i18n paths
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
