import { HomePage, pageMetadata } from "@/views";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <HomePage lang="en" />;
}
