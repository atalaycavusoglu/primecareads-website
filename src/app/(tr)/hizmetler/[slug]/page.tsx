import { ServicePage, serviceMetadata, serviceParams } from "@/views";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => serviceParams("tr");

export async function generateMetadata({ params }: Props) {
  return serviceMetadata("tr", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ServicePage lang="tr" slug={(await params).slug} />;
}
