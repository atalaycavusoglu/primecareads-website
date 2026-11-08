import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import Questions, { Marquee } from "@/components/Questions";
import Goals, { Statement } from "@/components/Goals";
import Automation from "@/components/Automation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Legal from "@/components/Legal";
import Checkup, { CheckupTeaser } from "@/components/Checkup";
import { Article, BlogIndex, BlogTeaser } from "@/components/Blog";
import { Office, Principles, Story } from "@/components/About";
import { SectorDetail, SectorGrid, ServiceDetail } from "@/components/Detail";
import { Contact, Faq, Services, Stats, System } from "@/components/Sections";
import { findPost, postsFor, translationOf } from "@/content/posts";
import { findService, serviceTranslation, servicesFor } from "@/content/services";
import { findSector, sectorTranslation, sectorsFor } from "@/content/sectors";
import { checkup } from "@/content/checkup";
import { legal } from "@/content/legal";
import { buildMetadata } from "@/app/document";
import { article, breadcrumbs, faqPage, service as serviceSchema } from "@/lib/schema";
import { dicts, type Lang } from "@/i18n";

/* Every page exists in both languages; route files under src/app only pick the language. */

type PageKey = "home" | "services" | "about" | "blog" | "contact" | "sectors" | "checkup" | "privacy" | "cookies";
const other = (lang: Lang): Lang => (lang === "tr" ? "en" : "tr");
const altOf = (lang: Lang, key: PageKey) => dicts[other(lang)].routes[key];

/** Breadcrumb trail: visible links plus matching structured data. */
function Trail({ lang, items }: { lang: Lang; items: { name: string; path: string }[] }) {
  const all = [{ name: dicts[lang].ui.breadcrumbHome, path: dicts[lang].routes.home }, ...items];
  return (
    <>
      <Breadcrumbs items={all.map((it, i) => ({ name: it.name, path: i < all.length - 1 ? it.path : undefined }))} />
      <JsonLd data={breadcrumbs(all)} />
    </>
  );
}

export function pageMetadata(lang: Lang, key: PageKey) {
  const d = dicts[lang];
  const path = d.routes[key];
  const alt = altOf(lang, key);
  if (key === "home") return buildMetadata(lang, { path, alt });
  if (key === "checkup") return buildMetadata(lang, { ...checkup[lang].meta, path, alt });
  if (key === "privacy" || key === "cookies") {
    const doc = legal[lang][key];
    return buildMetadata(lang, { title: `${doc.title} | PrimeCareAds`, description: doc.metaDescription, path, alt });
  }
  const p = d.pages[key];
  return buildMetadata(lang, { title: p.metaTitle, description: p.metaDescription, path, alt });
}

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <Shell lang={lang} alt={altOf(lang, "home")}>
      <Hero />
      <Marquee />
      <Goals />
      <Automation />
      <Questions />
      <Statement />
      <CheckupTeaser />
      <Stats />
      <BlogTeaser posts={postsFor(lang)} />
    </Shell>
  );
}

export function ServicesPage({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  const p = d.pages.services;
  return (
    <Shell lang={lang} alt={altOf(lang, "services")}>
      <PageHero eyebrow={p.eyebrow} title={p.title} highlight={p.titleHighlight} sub={p.sub} top={<Trail lang={lang} items={[{ name: p.eyebrow, path: d.routes.services }]} />} />
      <Services />
      <System />
      <Faq />
      <JsonLd data={faqPage(d.faq.items)} />
    </Shell>
  );
}

export function AboutPage({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  const p = d.pages.about;
  return (
    <Shell lang={lang} alt={altOf(lang, "about")}>
      <PageHero eyebrow={p.eyebrow} title={p.title} highlight={p.titleHighlight} sub={p.sub} top={<Trail lang={lang} items={[{ name: p.eyebrow, path: d.routes.about }]} />} />
      <Story />
      <Principles />
      <Stats />
      <Office />
    </Shell>
  );
}

export function BlogPage({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  const p = d.pages.blog;
  return (
    <Shell lang={lang} alt={altOf(lang, "blog")}>
      <PageHero eyebrow={p.eyebrow} title={p.title} highlight={p.titleHighlight} sub={p.sub} top={<Trail lang={lang} items={[{ name: p.eyebrow, path: d.routes.blog }]} />} />
      <BlogIndex posts={postsFor(lang)} />
    </Shell>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  return (
    <Shell lang={lang} alt={altOf(lang, "contact")} footerCta={false}>
      <Contact asPage />
      <Faq />
      <JsonLd data={faqPage(dicts[lang].faq.items)} />
    </Shell>
  );
}

export function CheckupPage({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  const c = checkup[lang];
  return (
    <Shell lang={lang} alt={altOf(lang, "checkup")}>
      <PageHero eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} sub={c.sub} top={<Trail lang={lang} items={[{ name: c.eyebrow, path: d.routes.checkup }]} />} />
      <Checkup />
    </Shell>
  );
}

export function LegalPage({ lang, doc: key }: { lang: Lang; doc: "privacy" | "cookies" }) {
  const d = dicts[lang];
  const doc = legal[lang][key];
  const otherKey = key === "privacy" ? "cookies" : "privacy";
  return (
    <Shell lang={lang} alt={altOf(lang, key)}>
      <PageHero eyebrow={doc.title} title={doc.title} top={<Trail lang={lang} items={[{ name: doc.title, path: d.routes[key] }]} />} />
      <Legal doc={doc} related={{ label: legal[lang][otherKey].title, href: d.routes[otherKey] }} />
    </Shell>
  );
}

/* ---------- Sectors ---------- */

export function SectorsPage({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  const p = d.pages.sectors;
  return (
    <Shell lang={lang} alt={altOf(lang, "sectors")}>
      <PageHero eyebrow={p.eyebrow} title={p.title} highlight={p.titleHighlight} sub={p.sub} top={<Trail lang={lang} items={[{ name: p.eyebrow, path: d.routes.sectors }]} />} />
      <SectorGrid sectors={sectorsFor(lang)} />
    </Shell>
  );
}

export const sectorParams = (lang: Lang) => sectorsFor(lang).map((s) => ({ slug: s.slug }));

const sectorAlt = (lang: Lang, slug: string) => {
  const s = findSector(lang, slug);
  const tr = s && sectorTranslation(s);
  return tr ? `${dicts[tr.lang].routes.sectors}${tr.slug}/` : altOf(lang, "sectors");
};

export function sectorMetadata(lang: Lang, slug: string) {
  const s = findSector(lang, slug);
  if (!s) return {};
  return buildMetadata(lang, { title: `${s.title} | PrimeCareAds`, description: s.metaDescription, path: `${dicts[lang].routes.sectors}${s.slug}/`, alt: sectorAlt(lang, slug) });
}

export function SectorPage({ lang, slug }: { lang: Lang; slug: string }) {
  const d = dicts[lang];
  const s = findSector(lang, slug);
  if (!s) notFound();
  const path = `${d.routes.sectors}${s.slug}/`;
  return (
    <Shell lang={lang} alt={sectorAlt(lang, slug)}>
      <PageHero
        eyebrow={s.name}
        title={s.title}
        sub={s.intro}
        top={<Trail lang={lang} items={[{ name: d.pages.sectors.eyebrow, path: d.routes.sectors }, { name: s.name, path }]} />}
      />
      <SectorDetail sector={s} others={sectorsFor(lang).filter((x) => x.slug !== slug)} />
      <JsonLd data={faqPage(s.faqs)} />
    </Shell>
  );
}

/* ---------- Service detail ---------- */

export const serviceParams = (lang: Lang) => servicesFor(lang).map((s) => ({ slug: s.slug }));

const serviceAlt = (lang: Lang, slug: string) => {
  const s = findService(lang, slug);
  const tr = s && serviceTranslation(s);
  return tr ? `${dicts[tr.lang].routes.services}${tr.slug}/` : altOf(lang, "services");
};

export function serviceMetadata(lang: Lang, slug: string) {
  const s = findService(lang, slug);
  if (!s) return {};
  return buildMetadata(lang, { title: `${s.title} | PrimeCareAds`, description: s.metaDescription, path: `${dicts[lang].routes.services}${s.slug}/`, alt: serviceAlt(lang, slug) });
}

export function ServicePage({ lang, slug }: { lang: Lang; slug: string }) {
  const d = dicts[lang];
  const s = findService(lang, slug);
  if (!s) notFound();
  const path = `${d.routes.services}${s.slug}/`;
  return (
    <Shell lang={lang} alt={serviceAlt(lang, slug)}>
      <PageHero
        eyebrow={d.pages.services.eyebrow}
        title={s.title}
        sub={s.intro}
        top={<Trail lang={lang} items={[{ name: d.pages.services.eyebrow, path: d.routes.services }, { name: s.title, path }]} />}
      />
      <ServiceDetail service={s} others={servicesFor(lang).filter((x) => x.slug !== slug)} />
      <JsonLd data={serviceSchema({ name: s.title, description: s.metaDescription, path })} />
      <JsonLd data={faqPage(s.faqs)} />
    </Shell>
  );
}

/* ---------- Blog posts ---------- */

export const postParams = (lang: Lang) => postsFor(lang).map((p) => ({ slug: p.slug }));

const postAlt = (lang: Lang, slug: string) => {
  const post = findPost(lang, slug);
  const tr = post && translationOf(post);
  return tr ? `${dicts[tr.lang].routes.blog}${tr.slug}/` : dicts[other(lang)].routes.blog;
};

export function postMetadata(lang: Lang, slug: string) {
  const post = findPost(lang, slug);
  if (!post) return {};
  return buildMetadata(lang, {
    title: `${post.title} | PrimeCareAds`,
    description: post.description,
    path: `${dicts[lang].routes.blog}${post.slug}/`,
    alt: postAlt(lang, slug),
    type: "article",
    image: `/og/post-${post.slug}.png`,
  });
}

export function PostPage({ lang, slug }: { lang: Lang; slug: string }) {
  const d = dicts[lang];
  const post = findPost(lang, slug);
  if (!post) notFound();
  const path = `${d.routes.blog}${post.slug}/`;
  const related = postsFor(lang).filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <Shell lang={lang} alt={postAlt(lang, slug)}>
      <Article post={post} related={related} />
      <JsonLd data={article({ title: post.title, description: post.description, date: post.date, path, lang, image: `/og/post-${post.slug}.png` })} />
      <JsonLd data={breadcrumbs([{ name: d.ui.breadcrumbHome, path: d.routes.home }, { name: d.pages.blog.eyebrow, path: d.routes.blog }, { name: post.title, path }])} />
    </Shell>
  );
}
