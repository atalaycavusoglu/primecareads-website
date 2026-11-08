"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Eyebrow, ease } from "./ui";

/** Dark top band for inner pages; the fixed header sits on it. */
export default function PageHero({ eyebrow, title, highlight, sub, top, children }: { eyebrow: string; title: string; highlight?: string; sub?: string; top?: ReactNode; children?: ReactNode }) {
  const words = title.split(" ");
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-white sm:pb-28 sm:pt-48">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] animate-aurora rounded-full bg-navy opacity-70 blur-[120px]" />
        <div className="absolute -right-32 top-0 h-[440px] w-[440px] animate-aurora rounded-full bg-glow opacity-25 blur-[130px] [animation-delay:-6s]" />
      </div>
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {top}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </motion.div>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
          {words.map((w, i) => (
            <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease }}>
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
          {highlight && (
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.15 + words.length * 0.06, ease }}
            >
              {highlight}
            </motion.span>
          )}
        </h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {sub}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
