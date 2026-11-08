import { PostPage, postMetadata, postParams } from "@/views";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => postParams("en");

export async function generateMetadata({ params }: Props) {
  return postMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <PostPage lang="en" slug={(await params).slug} />;
}
