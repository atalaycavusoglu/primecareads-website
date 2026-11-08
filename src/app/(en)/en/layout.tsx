import { buildMetadata, Document } from "../../document";

export const metadata = buildMetadata("en");
export { viewport } from "../../document";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Document lang="en">{children}</Document>;
}
