import { LegalPage, pageMetadata } from "@/views";

export const metadata = pageMetadata("en", "cookies");

export default function Page() {
  return <LegalPage lang="en" doc="cookies" />;
}
