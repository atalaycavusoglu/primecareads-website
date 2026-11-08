import { site } from "@/config";
import type { Dict } from "@/i18n";

const abs = (path: string) => `${site.url}${path}`;

export function organization(d: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: abs(d.routes.home),
    logo: abs("/icon-512.png"),
    image: abs("/icon-512.png"),
    description: d.meta.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "İğrip Sokak, Fenerbahçe",
      addressLocality: "Kadıköy",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    areaServed: "TR",
    knowsLanguage: ["tr", "en"],
    sameAs: [site.social.instagram, site.social.linkedin],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqPage(faqs: readonly (readonly string[])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function article(p: { title: string; description: string; date: string; path: string; lang: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    inLanguage: p.lang,
    mainEntityOfPage: abs(p.path),
    image: abs(p.image),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function service(p: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.name,
    description: p.description,
    url: abs(p.path),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "TR",
  };
}
