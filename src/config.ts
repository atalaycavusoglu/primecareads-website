/**
 * Site-wide settings. Values the client still has to supply are empty strings;
 * every feature that needs one stays off (or shows a visible placeholder) until it is filled.
 * Tracking IDs and the form key come from environment variables, see .env.example.
 */
export const site = {
  url: "https://www.primecareads.com",
  name: "PrimeCareAds",

  company: {
    /** Registered company name (ticaret unvanı) for the KVKK notice. */
    legalName: "",
    /** Address used in the KVKK notice; the street line is already public. */
    address: "İğrip Sokak, Fenerbahçe, Kadıköy, İstanbul",
    /** Inbox for KVKK requests and the form fallback. */
    email: "",
    mersis: "",
  },

  /** Set to true once the client (or their lawyer) has approved the KVKK and cookie texts. */
  legalApproved: false,

  social: {
    instagram: "https://www.instagram.com/primecareads/",
    linkedin: "https://www.linkedin.com/company/prime-care-ads",
  },

  /** https://web3forms.com access key. Without it the form falls back to opening the visitor's mail app. */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",

  tracking: {
    ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
    /** Conversion label for a lead, e.g. "AbCdEf123" (the part after the slash in send_to). */
    googleAdsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "",
    metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
};

export const trackingEnabled = Boolean(site.tracking.ga4 || site.tracking.googleAds || site.tracking.metaPixel);
