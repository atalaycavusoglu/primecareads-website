import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { dicts } from "@/i18n";
import "./globals.css";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: `404 | PrimeCareAds`,
  robots: { index: false },
  icons: { icon: [{ url: "/favicon-32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
};

/* One static 404 for both languages, so it shows Turkish first and English below. */
export default function GlobalNotFound() {
  const tr = dicts.tr.notFound;
  const en = dicts.en.notFound;
  return (
    <html lang="tr" className={geist.variable}>
      <body className="bg-ink text-white">
        <main className="relative grid min-h-screen place-items-center overflow-hidden px-4">
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
          <div aria-hidden className="absolute -left-40 -top-40 h-[520px] w-[520px] animate-aurora rounded-full bg-navy opacity-70 blur-[120px]" />
          <div aria-hidden className="absolute -right-32 bottom-0 h-[440px] w-[440px] animate-aurora rounded-full bg-glow opacity-25 blur-[130px] [animation-delay:-6s]" />
          <div className="relative text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="PrimeCareAds" width={100} height={64} className="mx-auto h-16 w-auto brightness-0 invert" />
            <p className="text-gradient mt-10 text-[clamp(6rem,22vw,12rem)] font-semibold leading-none tracking-[-0.06em]">404</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">{tr.title}</h1>
            <p className="mt-2 text-white/70">{tr.text}</p>
            <p lang="en" className="mt-1 text-sm text-white/50">{en.title}. {en.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {/* Plain links: TR and EN have separate root layouts, so this is a full page load either way. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className="rounded-full bg-white px-6 py-3 font-medium text-ink transition hover:bg-sky">{tr.home}</a>
              <a href="/en/" lang="en" className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10">{en.home}</a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
