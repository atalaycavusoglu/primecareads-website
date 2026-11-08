import { ogImage } from "@/lib/og";
import { posts } from "@/content/posts";
import { dicts, type Lang } from "@/i18n";

/*
 * Share images as real .png files (a route handler keeps the extension in the static export):
 * /og/site-tr.png, /og/site-en.png and /og/post-<slug>.png for every article.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: "site-tr.png" }, { file: "site-en.png" }, ...posts.map((p) => ({ file: `post-${p.slug}.png` }))];
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const name = (await params).file.replace(/\.png$/, "");
  if (name.startsWith("post-")) {
    const post = posts.find((p) => `post-${p.slug}` === name)!;
    return ogImage({ eyebrow: `Blog · ${post.category}`, title: post.title, sub: post.description });
  }
  const h = dicts[name.slice(5) as Lang].hero;
  return ogImage({ eyebrow: h.tagline, title: h.headline.join(" "), sub: h.typed });
}
