import { site } from "@/config";

/** Sends a form through Web3Forms. Returns false when no key is configured or the request fails. */
export async function sendForm(subject: string, fields: Record<string, string>) {
  if (!site.web3formsKey) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: site.web3formsKey, subject, from_name: "PrimeCareAds web sitesi", ...fields }),
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(res.ok && json.success);
  } catch {
    return false;
  }
}

export const CHECKUP_KEY = "pca-checkup";
