import { sendGAEvent } from "@next/third-parties/google";

/** Where on the site an interaction happened. */
export type AnalyticsLocation =
  | "home"
  | "header"
  | "main_menu"
  | "footer"
  | "contact"
  | "projects"
  | "project_carousel";

/** Contact or profile channel a visitor clicked. */
export type ContactMethod = "email" | "phone" | "linkedin" | "github" | "instagram" | "behance";

/**
 * Every analytics event the site sends, with stable, language-independent parameters.
 * Names follow GA4's snake_case convention. `cv_download` and `contact_click` are the
 * key events (conversions) configured in Google Analytics.
 */
export type AnalyticsEvent =
  | { name: "cv_download"; params: { language: string; location: AnalyticsLocation } }
  | { name: "contact_click"; params: { method: ContactMethod; location: AnalyticsLocation } }
  | { name: "select_project"; params: { project_id: string; location: AnalyticsLocation } }
  | { name: "outbound_click"; params: { link_url: string; location: AnalyticsLocation } }
  | { name: "navigation_click"; params: { section: string; location: AnalyticsLocation } }
  | { name: "toolbox_open"; params: { category: string } }
  | { name: "language_switch"; params: { language: string } }
  | { name: "theme_switch"; params: { theme: "dark" | "light" } };

/**
 * Sends an analytics event to Google Analytics. Safe to call during SSR (does nothing).
 *
 * @example
 * trackEvent({ name: "cv_download", params: { language: "en", location: "home" } });
 */
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window === "undefined") return;
  sendGAEvent("event", event.name, event.params);
};

/** Maps a contact icon name from the CMS (e.g. "icon-email") to its contact method. */
export const contactMethodFromIcon = (icon: string): ContactMethod | undefined => {
  const methods: ContactMethod[] = ["email", "phone", "linkedin", "github", "instagram", "behance"];
  return methods.find((method) => icon.includes(method));
};
