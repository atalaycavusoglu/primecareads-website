"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight, ArrowUpRight, BarChart3, Car, Check, GraduationCap, LayoutDashboard, Mail, Megaphone, Palmtree, Plus, Search, Sparkles,
  Target, TriangleAlert, type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Eyebrow, Reveal, SpotlightCard, ease } from "./ui";
import { useT } from "./LangProvider";
import type { Service } from "@/content/services";
import type { Sector } from "@/content/sectors";

export const serviceIcons: Record<Service["key"], LucideIcon> = {
  ads: Megaphone,
  seo: Search,
  social: Sparkles,
  email: Mail,
  data: LayoutDashboard,
  training: GraduationCap,
};

export const sectorIcons: Record<Sector["key"], LucideIcon> = {
  cosmetics: Sparkles,
  automotive: Car,
  tourism: Palmtree,
};

/* ---------- Shared blocks ---------- */

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Kpis({ title, kpis }: { title: string; kpis: string[] }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-9">
        <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-glow/30 blur-3xl" />
        <div className="relative">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-sky">
            <BarChart3 className="size-4" /> {title}
          </p>
          <ul className="mt-6 space-y-4">
            {kpis.map((k, i) => (
              <motion.li
                key={k}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease }}
                className="flex items-center gap-4"
              >
                <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white/10">
                  <motion.span
                    className="absolute inset-0 rounded-full border border-cyan/60"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                  />
                  <Target className="size-4 text-cyan" />
                </span>
                <span className="text-lg font-medium">{k}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function Faqs({ title, faqs }: { title: string; faqs: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-8 space-y-3">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className={`rounded-2xl border bg-surface transition-colors ${isOpen ? "border-brand/30" : "border-line"}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`dfaq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-medium"
                >
                  {q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={`grid size-8 shrink-0 place-items-center rounded-full ${isOpen ? "bg-navy text-white" : "bg-mist text-brand"}`}>
                    <Plus className="size-4" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`dfaq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-fg/75">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LinkCards<T extends { slug: string; title?: string; name?: string; text?: string; intro?: string }>({
  title, items, base, icon,
}: { title: string; items: T[]; base: string; icon: (item: T) => LucideIcon }) {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const I = icon(it);
            return (
              <Reveal key={it.slug} delay={i * 0.06}>
                <a href={`${base}${it.slug}/`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-3xl border border-line bg-surface p-6 transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <span className="grid size-11 place-items-center rounded-2xl bg-navy text-white"><I className="size-5" /></span>
                      <ArrowUpRight className="size-5 text-brand opacity-40 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">{it.title ?? it.name}</h3>
                    <p className="mt-2 line-clamp-3 text-fg/70">{it.text ?? it.intro}</p>
                  </SpotlightCard>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  const t = useT();
  return (
    <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-[#1a2c55] p-8 text-white sm:p-12">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute -bottom-20 -right-10 size-72 rounded-full bg-cyan/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.footer.title}</h2>
          <p className="mt-2 max-w-lg text-white/75">{t.footer.sub}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={t.routes.contact} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-ink transition hover:bg-sky">
            {t.mainAction} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href={t.routes.checkup} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-medium text-white transition hover:bg-white/10">
            <Sparkles className="size-4 text-cyan" /> Check-up
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- Service detail ---------- */

export function ServiceDetail({ service, others }: { service: Service; others: Service[] }) {
  const t = useT();
  const u = t.ui;
  return (
    <>
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <SectionHead eyebrow={u.details} title={u.included} />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.deliverables.map((d, i) => (
                <Reveal key={d.t} delay={i * 0.08}>
                  <li className="h-full list-none">
                    <SpotlightCard className="h-full rounded-3xl border border-line bg-mist p-6">
                      <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 text-lg font-semibold">{d.t}</h3>
                      <p className="mt-2 text-fg/70">{d.d}</p>
                    </SpotlightCard>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:pt-24">
            <div className="lg:sticky lg:top-28">
              <Kpis title={u.measured} kpis={service.kpis} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Faqs title={u.faq} faqs={service.faqs} />
        </div>
        <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <CtaBand />
        </div>
      </section>

      <LinkCards title={u.otherServices} items={others} base={t.routes.services} icon={(s) => serviceIcons[s.key]} />
    </>
  );
}

/* ---------- Sectors ---------- */

export function SectorGrid({ sectors }: { sectors: Sector[] }) {
  const t = useT();
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
        {sectors.map((s, i) => {
          const I = sectorIcons[s.key];
          return (
            <Reveal key={s.slug} delay={i * 0.1}>
              <a href={`${t.routes.sectors}${s.slug}/`} className="group block h-full">
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-mist">
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-navy via-[#1d3a7a] to-glow/60">
                    <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
                    <motion.div
                      aria-hidden
                      className="absolute -right-6 -top-6 size-40 rounded-full border border-white/15"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    >
                      <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_16px_rgba(111,227,255,0.9)]" />
                    </motion.div>
                    <span className="absolute bottom-5 left-5 grid size-14 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                      <I className="size-7" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent">{s.goal}</span>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight">{s.name}</h2>
                    <p className="mt-2 flex-1 text-fg/70">{s.title}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-medium text-brand">
                      {t.ui.details} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function SectorDetail({ sector, others }: { sector: Sector; others: Sector[] }) {
  const t = useT();
  const u = t.ui;
  return (
    <>
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={u.sectorGoal} title={u.sectorChallenges} />
            <p className="mt-4 inline-flex rounded-full bg-brand/8 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent">{sector.goal}</p>
            <ul className="mt-8 space-y-3">
              {sector.challenges.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-mist p-4"
                >
                  <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-300" />
                  <span className="text-fg/80">{c}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow={u.sectorShelves} title={sector.name} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {sector.shelves.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08}>
                  <SpotlightCard className="h-full rounded-2xl border border-line bg-surface p-5 shadow-[0_20px_50px_-40px_rgba(46,65,107,0.6)]">
                    <div className="flex items-center gap-2">
                      <motion.span className="size-2 rounded-full bg-glow" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.3 }} />
                      <h3 className="font-semibold">{s.t}</h3>
                    </div>
                    <p className="mt-2 text-sm text-fg/70">{s.d}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <SectionHead eyebrow={u.sectorApproach} title={u.included} />
            <ol className="relative mt-10 space-y-6 pl-12">
              <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-glow to-cyan" />
              {sector.approach.map((a, i) => (
                <Reveal key={a.t} delay={i * 0.08}>
                  <li className="relative list-none">
                    <span className="absolute -left-12 grid size-8 place-items-center rounded-full bg-navy text-white">
                      <Check className="size-4" />
                    </span>
                    <h3 className="text-lg font-semibold">{a.t}</h3>
                    <p className="mt-1 text-fg/70">{a.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:pt-24">
            <Kpis title={u.measured} kpis={sector.kpis} />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Faqs title={u.faq} faqs={sector.faqs} />
        </div>
        <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <CtaBand />
        </div>
      </section>

      <LinkCards title={u.otherSectors} items={others} base={t.routes.sectors} icon={(s) => sectorIcons[s.key]} />
    </>
  );
}
