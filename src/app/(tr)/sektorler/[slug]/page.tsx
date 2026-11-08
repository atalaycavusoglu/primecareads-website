import { SectorPage, sectorMetadata, sectorParams } from "@/views";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => sectorParams("tr");

export async function generateMetadata({ params }: Props) {
  return sectorMetadata("tr", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <SectorPage lang="tr" slug={(await params).slug} />;
}
