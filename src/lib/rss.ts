import { site } from "@/config";
import { postsFor } from "@/content/posts";
import { dicts, type Lang } from "@/i18n";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed for one language's blog. */
export function rssResponse(lang: Lang) {
  const d = dicts[lang];
  const base = `${site.url}${d.routes.blog}`;
  const items = postsFor(lang)
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${base}${p.slug}/</link>
      <guid isPermaLink="true">${base}${p.slug}/</guid>
      <description>${esc(p.description)}</description>
      <category>${esc(p.category)}</category>
      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(d.pages.blog.metaTitle)}</title>
    <link>${base}</link>
    <description>${esc(d.pages.blog.metaDescription)}</description>
    <language>${lang}</language>
    <atom:link href="${base}rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
