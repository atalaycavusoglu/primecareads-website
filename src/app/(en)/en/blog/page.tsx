import { BlogPage, pageMetadata } from "@/views";

export const metadata = pageMetadata("en", "blog");

export default function Page() {
  return <BlogPage lang="en" />;
}
