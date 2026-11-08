import { BlogPage, pageMetadata } from "@/views";

export const metadata = pageMetadata("tr", "blog");

export default function Page() {
  return <BlogPage lang="tr" />;
}
