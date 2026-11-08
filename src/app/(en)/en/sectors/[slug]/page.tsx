import { SectorPage, sectorMetadata, sectorParams } from "@/views";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => sectorParams("en");

export async function generateMetadata({ params }: Props) {
  return sectorMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <SectorPage lang="en" slug={(await params).slug} />;
}
