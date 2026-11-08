import type { ReactNode } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Sections";
import { MotionRoot } from "@/components/MotionRoot";
import { LangProvider } from "@/components/LangProvider";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";
import { organization } from "@/lib/schema";
import { dicts, type Lang } from "@/i18n";

/** Header, main and footer shared by every page. */
export default function Shell({ lang, alt, footerCta = true, children }: { lang: Lang; alt: string; footerCta?: boolean; children: ReactNode }) {
  return (
    <LangProvider lang={lang} alt={alt}>
      <MotionRoot>
        <Header />
        <main id="icerik">{children}</main>
        <Footer cta={footerCta} />
        <ConsentBanner />
        <JsonLd data={organization(dicts[lang])} />
      </MotionRoot>
    </LangProvider>
  );
}
