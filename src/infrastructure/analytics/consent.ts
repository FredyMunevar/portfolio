/** localStorage key holding the visitor's analytics consent: "granted" | "denied". */
export const CONSENT_STORAGE_KEY = "fm_analytics_consent";

/** localStorage key that marks the owner's own browser as internal traffic ("1"). */
export const INTERNAL_STORAGE_KEY = "fm_internal_traffic";

/**
 * Inline script run before Google Analytics loads (Consent Mode v2).
 * - Analytics storage is denied until the visitor accepts; ads storage is always denied.
 * - Visiting any page with `?internal=1` marks this browser as internal traffic
 *   (`traffic_type=internal`, filtered out in GA4); `?internal=0` clears it.
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var consent = null;
try { consent = localStorage.getItem("${CONSENT_STORAGE_KEY}"); } catch (e) {}
gtag("consent", "default", {
  analytics_storage: consent === "granted" ? "granted" : "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});
try {
  var internal = new URLSearchParams(location.search).get("internal");
  if (internal === "1") localStorage.setItem("${INTERNAL_STORAGE_KEY}", "1");
  if (internal === "0") localStorage.removeItem("${INTERNAL_STORAGE_KEY}");
  if (localStorage.getItem("${INTERNAL_STORAGE_KEY}") === "1") gtag("set", { traffic_type: "internal" });
} catch (e) {}
`;

/** Updates Consent Mode after the visitor answers the banner and remembers the choice. */
export const saveConsent = (choice: "granted" | "denied") => {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: choice });
};

/** Returns the stored consent choice, or null when the visitor has not answered yet. */
export const readConsent = (): string | null => {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
};
