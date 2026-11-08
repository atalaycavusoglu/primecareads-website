"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, BarChart3, Eye, MapPin, MessagesSquare, Repeat, UserCheck } from "lucide-react";
import { useRef } from "react";
import { Eyebrow, Reveal, SpotlightCard, ease } from "./ui";
import { useT } from "./LangProvider";

export function Story() {
  const s = useT().pages.about.story;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  return (
    <section ref={ref} aria-labelledby="story-h" className="relative overflow-hidden bg-surface py-28 sm:py-36">
      <div aria-hidden className="grid-bg-light pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 id="story-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{s.title}</h2>
          </Reveal>
          {s.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="mt-6 text-lg leading-relaxed text-fg/75">{p}</p>
            </Reveal>
          ))}
        </div>

        {/* Inward vs outward: our campaign alone vs our share among competitors */}
        <Reveal delay={0.15}>
          <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[420px]">
            <motion.div style={{ rotate }} className="absolute inset-0">
              <svg viewBox="0 0 200 200" className="size-full">
                <circle cx="100" cy="100" r="80" fill="none" className="stroke-brand" strokeOpacity="0.12" strokeWidth="22" />
                {[
                  { len: 0.34, off: 0, c: "url(#about-grad)" },
                  { len: 0.27, off: 0.36, c: "var(--color-brand)" },
                  { len: 0.2, off: 0.65, c: "var(--color-sky)" },
                ].map((seg, i) => (
                  <motion.circle
                    key={i}
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    strokeWidth="22"
                    strokeLinecap="round"
                    style={{ stroke: seg.c, rotate: seg.off * 360 - 90, transformOrigin: "100px 100px" }}
                    strokeOpacity={i === 0 ? 1 : 0.35}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: seg.len }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.25, ease }}
                  />
                ))}
                <defs>
                  <linearGradient id="about-grad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#5b8cff" />
                    <stop offset="1" stopColor="#6fe3ff" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid size-36 place-items-center rounded-full border border-line bg-surface text-center shadow-[0_20px_60px_-30px_rgba(46,65,107,0.6)]">
                <Eye className="size-7 text-accent" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const principleIcons = [BarChart3, Repeat, MessagesSquare, UserCheck, Eye];

export function Principles() {
  const p = useT().pages.about.principles;
  return (
    <section aria-labelledby="principles-h" className="bg-mist py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="principles-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{p.title}</h2>
        </Reveal>
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {p.items.map((item, i) => {
            const I = principleIcons[i];
            return (
              <Reveal key={item.t} delay={i * 0.07} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <li className="h-full list-none">
                  <SpotlightCard className="h-full rounded-3xl border border-line bg-surface p-7">
                    <div className="flex items-start justify-between">
                      <motion.span
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        className="grid size-12 place-items-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/25"
                      >
                        <I className="size-5" />
                      </motion.span>
                      <span className="font-mono text-sm text-fg/50">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{item.t}</h3>
                    <p className="mt-2 leading-relaxed text-fg/70">{item.d}</p>
                  </SpotlightCard>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Office() {
  const t = useT();
  const o = t.pages.about.office;
  const c = t.contact;
  return (
    <section aria-labelledby="office-h" className="bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-[2rem] border border-line bg-mist md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <Eyebrow>{o.eyebrow}</Eyebrow>
              <h2 id="office-h" className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{o.title}</h2>
              <p className="mt-4 text-lg text-fg/70">{o.text}</p>
              <p className="mt-8 flex items-start gap-3 text-fg/80">
                <MapPin className="mt-0.5 size-5 text-accent" />
                <span>{c.address[0]}<br />{c.address[1]}</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={t.routes.contact} className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-medium text-white transition hover:bg-navy-600">
                  {t.mainAction}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="https://www.openstreetmap.org/search?query=%C4%B0%C4%9Frip%20Sokak%20Fenerbah%C3%A7e%20Kad%C4%B1k%C3%B6y%20%C4%B0stanbul"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 px-6 py-3 font-medium text-brand transition hover:bg-brand/5"
                >
                  {c.directions} <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
            {/* Stylised map: streets as lines, a pulsing pin at the office */}
            <div aria-hidden className="relative min-h-[300px] overflow-hidden bg-ink">
              <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
                {["M-20 80 L420 40", "M-20 200 L420 150", "M60 -20 L120 320", "M240 -20 L300 320", "M-20 260 C120 230, 260 280, 420 240", "M330 -20 L360 320"].map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="white"
                    strokeOpacity={i === 4 ? 0.22 : 0.1}
                    strokeWidth={i === 4 ? 10 : 6}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.1, ease }}
                  />
                ))}
                <path d="M300 300 C 330 250, 400 240, 420 230 L420 320 Z" fill="#5b8cff" fillOpacity="0.15" />
              </svg>
              <div className="absolute left-[58%] top-[52%] -translate-x-1/2 -translate-y-1/2">
                <motion.span className="absolute inset-0 rounded-full bg-cyan/40" animate={{ scale: [1, 2.6], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} />
                <span className="relative grid size-12 place-items-center rounded-full bg-white text-navy shadow-[0_0_40px_rgba(111,227,255,0.7)]">
                  <MapPin className="size-6" />
                </span>
              </div>
              <p className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-xs text-white/80 backdrop-blur">
                Fenerbahçe · Kadıköy
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
