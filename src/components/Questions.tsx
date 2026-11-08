"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Bell, Check, Minus, BarChart3, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Counter, Eyebrow, Reveal, SpotlightCard, ease } from "./ui";
import { useT } from "./LangProvider";

/* id → file in /public/brands. Wordmarks already contain the name, so no text is shown beside them. */
const platforms: { id: string; name: string; wordmark?: boolean; ink?: boolean }[] = [
  { id: "google-ads", name: "Google Ads" },
  { id: "meta", name: "Meta" },
  { id: "trendyol", name: "Trendyol", wordmark: true, ink: true },
  { id: "instagram", name: "Instagram", ink: true },
  { id: "youtube", name: "YouTube" },
  { id: "hepsiburada", name: "Hepsiburada", wordmark: true },
  { id: "google-analytics", name: "Google Analytics" },
  { id: "openai", name: "ChatGPT", ink: true },
  { id: "amazon", name: "Amazon", ink: true },
  { id: "gemini", name: "Gemini" },
  { id: "etsy", name: "Etsy" },
];

export function Marquee() {
  const m = useT().marquee;
  return (
    <section aria-label={m.aria} className="border-b border-line bg-surface py-10">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-fg/65">{m.title}</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
          {[...platforms, ...platforms].map((p, i) => (
            <li key={i} aria-hidden={i >= platforms.length} className="flex h-8 items-center gap-3 text-lg font-medium text-fg/75">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/brands/${p.id}.svg`}
                alt={p.wordmark ? p.name : ""}
                height={28}
                className={`${p.wordmark ? "h-6 w-auto" : "size-7 object-contain"} ${p.ink ? "logo-ink" : ""}`}
              />
              {!p.wordmark && p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Questions() {
  const q = useT().questions;
  const widgets = [<RoasWidget key="r" />, <ShareWidget key="s" />, <AiWidget key="a" />, <NotifyWidget key="n" />];
  const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-3", "md:col-span-3"];
  return (
    <section id="sorular" aria-labelledby="sorular-h" className="relative bg-mist py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{q.eyebrow}</Eyebrow>
          <h2 id="sorular-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {q.title} <span className="text-brand/60">{q.titleMuted}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {q.cards.map((c, i) => (
            <Card key={c.q} className={spans[i]} q={c.q} title={c.title} body={c.body}>
              {widgets[i]}
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-fg/70">{q.disclaimer}</p>
      </div>
    </section>
  );
}

function Card({
  q, title, body, children, className = "",
}: { q: string; title: string; body: string; children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <SpotlightCard className="h-full rounded-3xl border border-line bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(46,65,107,0.35)] sm:p-8">
        <div className="flex h-full flex-col">
          <p className="font-mono text-sm text-accent">“{q}”</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 max-w-md text-fg/70">{body}</p>
          <div className="mt-8 flex-1">{children}</div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function RoasWidget() {
  const r = useT().questions.roas;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pts = [2.6, 2.8, 2.7, 3.0, 2.9, 3.1, 3.0, 3.2, 3.1, 3.3, 3.2, 3.3, 3.4, 3.5];
  const prev = [2.4, 2.6, 2.5, 2.7, 2.6, 2.8, 2.7, 2.9, 2.8, 2.9, 2.8, 3.0, 2.9, 3.0];
  const toPath = (a: number[]) =>
    a.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (a.length - 1)) * 400} ${120 - ((v - 2.2) / 1.5) * 110}`).join(" ");
  const d = toPath(pts);
  return (
    <div ref={ref} className="rounded-2xl border border-line bg-mist/60 p-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs text-fg/65">{r.label}</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-brand">
            <Counter from={2.4} to={3.4} decimals={1} suffix="x" />
          </p>
        </div>
        <span className="rounded-full bg-mint/20 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-mint">{r.badge}</span>
      </div>
      <svg viewBox="0 0 400 124" className="mt-4 h-32 w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="roas" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5b8cff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#5b8cff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 60, 90].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} className="stroke-brand" strokeOpacity="0.1" />
        ))}
        <motion.path d={toPath(prev)} fill="none" className="stroke-brand" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.6, ease }} />
        <motion.path d={`${d} L400 124 L0 124 Z`} fill="url(#roas)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 0.8 }} />
        <motion.path d={d} fill="none" stroke="#5b8cff" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.8, ease, delay: 0.2 }} />
        <motion.circle cx="400" cy={120 - ((3.5 - 2.2) / 1.5) * 110} r="5" fill="#5b8cff"
          initial={{ scale: 0 }} animate={inView ? { scale: [0, 1.4, 1] } : {}} transition={{ delay: 2, duration: 0.5 }} />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-fg/60">
        {r.dates.map((x) => <span key={x}>{x}</span>)}
      </div>
    </div>
  );
}

const shareSets = [
  [42, 38, 21],
  [44, 36, 20],
  [41, 39, 22],
];

function ShareWidget() {
  const t = useT();
  const s = t.questions.share;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotion();
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setK((x) => (x + 1) % shareSets.length), 2600);
    return () => clearInterval(id);
  }, [inView, reduce]);
  const rows = s.rows.map((name, i) => ({ name, v: inView ? shareSets[k][i] : 0 }));
  return (
    <div ref={ref} className="rounded-2xl border border-line bg-mist/60 p-5">
      <p className="flex items-center gap-2 text-xs text-fg/65"><BarChart3 className="size-3.5" /> {s.title}</p>
      <ul className="mt-4 space-y-4">
        {rows.map((r, i) => (
          <li key={r.name}>
            <div className="flex justify-between text-sm">
              <span className={i === 0 ? "font-semibold text-brand" : "text-fg/70"}>{r.name}</span>
              <motion.span key={r.v} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="font-mono tabular-nums">
                {t.pct.prefix}{r.v}{t.pct.suffix}
              </motion.span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-brand/10">
              <motion.div
                className={`h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-navy to-glow" : "bg-brand/30"}`}
                animate={{ width: `${r.v * 2}%` }}
                transition={{ duration: 1, ease }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AiWidget() {
  const a = useT().questions.ai;
  const queries = a.queries;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(queries.length);
      return;
    }
    setN(0);
    let step = 0;
    const id = setInterval(() => {
      step++;
      if (step <= queries.length) setN(step);
      else if (step > queries.length + 4) {
        step = 0;
        setN(0);
      }
    }, 700);
    return () => clearInterval(id);
  }, [inView, reduce, queries.length]);
  const found = queries.slice(0, n).filter((x) => x.ok).length;
  return (
    <div ref={ref} className="rounded-2xl border border-line bg-mist/60 p-5">
      <div className="flex items-center justify-between text-xs text-fg/65">
        <span>{a.title}</span>
        <span className="font-mono text-sm font-semibold text-brand">{found} / {queries.length}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand/10">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-glow to-cyan" animate={{ width: `${(found / queries.length) * 100}%` }} transition={{ duration: 0.5 }} />
      </div>
      <ul className="mt-4 space-y-2">
        {queries.map((x, i) => {
          const done = i < n;
          return (
            <li key={x.q} className="flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5 text-sm">
              <span className={`grid size-5 shrink-0 place-items-center rounded-md transition-colors duration-300 ${
                done ? (x.ok ? "bg-mint text-ink" : "bg-brand/10 text-fg/60") : "border border-brand/20"}`}>
                <AnimatePresence>
                  {done && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      {x.ok ? <Check className="size-3.5" strokeWidth={3} /> : <Minus className="size-3.5" />}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className={done ? "text-fg" : "text-fg/60"}>{x.q}</span>
              {done && x.ok && <span className="ml-auto hidden text-[11px] text-emerald-700 dark:text-mint sm:inline">{a.engines}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const noteStyle = [
  { icon: Bell, tone: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300" },
  { icon: CheckCircle2, tone: "bg-mint/25 text-emerald-700 dark:bg-mint/15 dark:text-mint" },
  { icon: BarChart3, tone: "bg-glow/15 text-brand" },
];

function NotifyWidget() {
  const notes = useT().questions.notes;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(notes.length);
      return;
    }
    let step = 0;
    const id = setInterval(() => {
      step = (step + 1) % (notes.length + 3);
      setN(Math.min(step, notes.length));
    }, 1100);
    return () => clearInterval(id);
  }, [inView, reduce, notes.length]);
  return (
    <div ref={ref} className="min-h-[248px] rounded-2xl border border-line bg-mist/60 p-5">
      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {notes.slice(0, n).map((x, i) => {
            const S = noteStyle[i];
            return (
              <motion.li
                key={x.t}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease }}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 shadow-sm"
              >
                <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${S.tone}`}><S.icon className="size-4" /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between gap-2 text-sm font-medium">{x.t}<time className="font-mono text-xs font-normal text-fg/60">{x.time}</time></span>
                  <span className="block truncate text-sm text-fg/70">{x.body}</span>
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
