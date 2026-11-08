import { ServicePage, serviceMetadata, serviceParams } from "@/views";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => serviceParams("en");

export async function generateMetadata({ params }: Props) {
  return serviceMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ServicePage lang="en" slug={(await params).slug} />;
}
