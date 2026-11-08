import type { MetadataRoute } from "next";
import { site } from "@/config";
import { posts, translationOf } from "@/content/posts";
import { services, serviceTranslation } from "@/content/services";
import { sectors, sectorTranslation } from "@/content/sectors";
import { dicts, type Lang } from "@/i18n";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];
const abs = (p: string) => `${site.url}${p}`;

/** One entry per page and language, each listing both language versions. */
function pair(tr: string, en: string, priority: number, lastModified?: string): Entry[] {
  const languages = { tr: abs(tr), en: abs(en) };
  return [
    { url: abs(tr), lastModified, priority, alternates: { languages } },
    { url: abs(en), lastModified, priority, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const r = (lang: Lang) => dicts[lang].routes;
  const keys = ["home", "services", "sectors", "checkup", "about", "blog", "contact", "privacy", "cookies"] as const;
  const priorities: Record<(typeof keys)[number], number> = { home: 1, services: 0.9, sectors: 0.8, checkup: 0.8, about: 0.7, blog: 0.7, contact: 0.8, privacy: 0.2, cookies: 0.2 };
  return [
    ...keys.flatMap((k) => pair(r("tr")[k], r("en")[k], priorities[k])),
    ...services.filter((s) => s.lang === "tr").flatMap((s) => pair(`${r("tr").services}${s.slug}/`, `${r("en").services}${serviceTranslation(s)!.slug}/`, 0.8)),
    ...sectors.filter((s) => s.lang === "tr").flatMap((s) => pair(`${r("tr").sectors}${s.slug}/`, `${r("en").sectors}${sectorTranslation(s)!.slug}/`, 0.7)),
    ...posts.filter((p) => p.lang === "tr").flatMap((p) => pair(`${r("tr").blog}${p.slug}/`, `${r("en").blog}${translationOf(p)!.slug}/`, 0.6, p.date)),
  ];
}
