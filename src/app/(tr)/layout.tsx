import { buildMetadata, Document } from "../document";

export const metadata = buildMetadata("tr");
export { viewport } from "../document";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Document lang="tr">{children}</Document>;
}
