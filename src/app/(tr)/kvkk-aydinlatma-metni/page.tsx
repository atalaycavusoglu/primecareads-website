import { LegalPage, pageMetadata } from "@/views";

export const metadata = pageMetadata("tr", "privacy");

export default function Page() {
  return <LegalPage lang="tr" doc="privacy" />;
}
