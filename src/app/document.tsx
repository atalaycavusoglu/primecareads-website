import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import Intro from "@/components/Intro";
import { dicts, type Lang } from "@/i18n";
import "./globals.css";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono", display: "swap" });


type PageMeta = { title?: string; description?: string; path: string; alt: string; type?: "website" | "article"; image?: string };

/** Metadata for one page; `path` and `alt` are its address in this language and the other. */
export function buildMetadata(lang: Lang, page?: PageMeta): Metadata {
  const d = dicts[lang].meta;
  const title = page?.title ?? d.title;
  const description = page?.description ?? d.description;
  const path = page?.path ?? (lang === "tr" ? "/" : "/en/");
  const alt = page?.alt ?? (lang === "tr" ? "/en/" : "/");
  const [trPath, enPath] = lang === "tr" ? [path, alt] : [alt, path];
  return {
    metadataBase: new URL("https://www.primecareads.com"),
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    alternates: { canonical: path, languages: { tr: trPath, en: enPath } },
    openGraph: {
      type: page?.type ?? "website",
      title,
      description,
      locale: d.locale,
      url: path,
      images: [{ url: page?.image ?? `/og/site-${lang}.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", images: [page?.image ?? `/og/site-${lang}.png`] },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1222",
};

export function Document({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <Intro />
        {children}
      </body>
    </html>
  );
}
