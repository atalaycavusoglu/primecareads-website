import { site } from "@/config";

/*
 * Tracking loads only after the visitor accepts cookies (KVKK: no analytics or
 * marketing cookies without consent). Nothing loads while all IDs are empty.
 */

type Consent = "granted" | "denied";
const KEY = "consent";
const OPEN_EVENT = "pca:open-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void };
    _fbq?: unknown;
  }
}

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(v: Consent) {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  if (v === "granted") loadTracking();
}

export const openConsent = () => window.dispatchEvent(new Event(OPEN_EVENT));
export const onOpenConsent = (fn: () => void) => {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
};

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

let loaded = false;

export function loadTracking() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const { ga4, googleAds, metaPixel } = site.tracking;

  if (ga4 || googleAds) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", { ad_storage: "granted", analytics_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
    window.gtag("js", new Date());
    if (ga4) window.gtag("config", ga4);
    if (googleAds) window.gtag("config", googleAds);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${ga4 || googleAds}`);
  }

  if (metaPixel) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue!.push(args);
    } as NonNullable<Window["fbq"]>;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
    addScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", metaPixel);
    fbq("track", "PageView");
  }
}

/** Call after a meeting request or newsletter sign-up succeeds. */
export function trackLead(kind: "meeting" | "newsletter") {
  if (readConsent() !== "granted") return;
  const { googleAds, googleAdsLeadLabel } = site.tracking;
  window.gtag?.("event", kind === "meeting" ? "generate_lead" : "sign_up", { method: kind });
  if (kind === "meeting" && googleAds && googleAdsLeadLabel) {
    window.gtag?.("event", "conversion", { send_to: `${googleAds}/${googleAdsLeadLabel}` });
  }
  window.fbq?.("track", kind === "meeting" ? "Lead" : "CompleteRegistration");
}
