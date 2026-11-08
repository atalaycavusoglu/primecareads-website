import { LegalPage, pageMetadata } from "@/views";

export const metadata = pageMetadata("en", "privacy");

export default function Page() {
  return <LegalPage lang="en" doc="privacy" />;
}
