"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ease } from "./ui";
import { useAlt, useT } from "./LangProvider";

export default function Header() {
  const t = useT();
  const h = t.header;
  const pathname = usePathname();
  /* Section links (with #) are never "current"; page links match their path prefix. */
  const isCurrent = (href: string) => !href.includes("#") && (pathname.endsWith("/") ? pathname : `${pathname}/`).startsWith(href);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    setHidden(v > prev && v > 400 && !open);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -96 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
    >
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-ink"
      >
        {h.skip}
      </a>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-2 transition-all duration-500 ${
          scrolled ? "border border-white/10 bg-ink/70 shadow-2xl shadow-black/20 backdrop-blur-xl" : "border border-transparent"
        }`}
      >
        <a href={t.routes.home} aria-label={h.home} className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="PrimeCareAds" width={94} height={60} className="h-12 w-auto brightness-0 invert sm:h-[60px]" />
        </a>

        <nav aria-label={h.nav} className="hidden items-center gap-0.5 lg:flex">
          {h.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className={`relative rounded-full px-3 py-2 text-sm transition-colors hover:bg-white/10 hover:text-white ${isCurrent(l.href) ? "text-white" : "text-white/75"}`}
            >
              {l.label}
              {isCurrent(l.href) && (
                <motion.span layoutId="nav-dot" className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-glow to-cyan" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LangSwitch />
          <a
            href={t.routes.contact}
            className="group ml-1 hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-sky sm:inline-flex"
          >
            {t.mainAction}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? h.close : h.open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label={h.mobileNav}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-ink/95 p-2 backdrop-blur-xl lg:hidden"
          >
            {h.links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 text-base hover:bg-white/10 ${isCurrent(l.href) ? "bg-white/10 text-white" : "text-white/85"}`}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** TR | EN pill; the other language is a link to its own page. */
function LangSwitch() {
  const s = useT().header.switchLang;
  const alt = useAlt();
  return (
    <div className="flex items-center rounded-full border border-white/15 p-0.5 font-mono text-xs">
      <span aria-current="page" className="rounded-full bg-white/15 px-2.5 py-1.5 font-semibold text-white">
        {s.current}
      </span>
      <a
        href={alt}
        hrefLang={s.label.toLowerCase()}
        lang={s.label.toLowerCase()}
        aria-label={s.aria}
        className="rounded-full px-2.5 py-1.5 text-white/65 transition-colors hover:text-white"
      >
        {s.label}
      </a>
    </div>
  );
}
