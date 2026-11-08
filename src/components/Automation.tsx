"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Sparkles, Users, Mail, Check, Lightbulb, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Eyebrow, Reveal, ease } from "./ui";
import { useT } from "./LangProvider";
import type { Dict } from "@/i18n";

type EventKey = keyof Dict["automation"]["events"];
type Channel = { id: EventKey; name?: string; icon?: LucideIcon; wordmark?: boolean };

/* Inner ring: ad, analytics and CRM channels. Outer ring: AI answers, marketplaces, e-mail. */
const inner: Channel[] = [
  { id: "google-ads", name: "Google Ads" },
  { id: "meta", name: "Meta" },
  { id: "youtube", name: "YouTube" },
  { id: "instagram", name: "Instagram" },
  { id: "google-analytics", name: "Analytics" },
  { id: "crm", icon: Users },
];
const outer: Channel[] = [
  { id: "openai", name: "ChatGPT" },
  { id: "trendyol", wordmark: true },
  { id: "gemini", name: "Gemini" },
  { id: "hepsiburada", wordmark: true },
  { id: "amazon", name: "Amazon" },
  { id: "email", icon: Mail },
  { id: "etsy", name: "Etsy" },
];
const all = [...inner, ...outer];
/* The order events fire in: alternate rings so the pulse jumps around the orbit. */
const sequence = all.map((_, i) => (i % 2 === 0 ? inner[(i / 2) % inner.length] : outer[((i - 1) / 2) % outer.length])).map((c) => c.id);
const INK = new Set(["openai", "instagram", "trendyol", "amazon"]);

const place = (i: number, n: number, r: number) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
};

const clock = (tick: number) => {
  const m = 9 * 60 + tick * 7;
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export default function Automation() {
  const a = useT().automation;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setTick((x) => x + 1), 1900);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const activeId = sequence[tick % sequence.length];
  const feed = Array.from({ length: Math.min(tick + 1, 4) }, (_, k) => tick - k)
    .concat(reduce ? [1, 2, 3] : [])
    .slice(0, 4)
    .map((n) => ({ n, id: sequence[n % sequence.length] }));
  const nameOf = (c: Channel) => c.name ?? (c.id === "crm" || c.id === "email" ? a.channels[c.id] : c.id === "trendyol" ? "Trendyol" : "Hepsiburada");

  return (
    <section ref={ref} id="otomasyon" aria-labelledby="otomasyon-h" className="relative overflow-hidden bg-ink py-28 text-white sm:py-36">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute left-1/4 top-1/3 h-[520px] w-[520px] animate-aurora rounded-full bg-glow/25 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <Eyebrow dark>{a.eyebrow}</Eyebrow>
          <h2 id="otomasyon-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {a.title} <span className="text-gradient">{a.titleMuted}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{a.sub}</p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Orbit */}
          <Reveal>
            <div role="img" aria-label={a.aria} className="relative mx-auto aspect-square w-full max-w-[580px]">
              <div aria-hidden className="absolute inset-0">
                <Ring channels={outer} radius={45} activeId={activeId} tick={tick} spin="animate-orbit" counter="animate-orbit-reverse" nameOf={nameOf} />
                <Ring channels={inner} radius={27} activeId={activeId} tick={tick} spin="animate-orbit-reverse" counter="animate-orbit" nameOf={nameOf} />

                {/* Core */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-cyan/70"
                    animate={reduce ? {} : { scale: [1, 1.7], opacity: [0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 1.9, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full border border-glow/60"
                    animate={reduce ? {} : { scale: [1, 2.2], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.9, delay: 0.5, ease: "easeOut" }}
                  />
                  <div className="relative grid size-24 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-navy to-[#162447] text-center shadow-[0_0_60px_-6px_rgba(91,140,255,0.7)] sm:size-32">
                    <div>
                      <Sparkles className="mx-auto size-6 text-cyan sm:size-7" />
                      <p className="mt-1 text-xs font-semibold sm:text-sm">{a.core}</p>
                      <p className="hidden font-mono text-[10px] text-white/60 sm:block">{a.coreSub}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Feed */}
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-mint" />
                  </span>
                  {a.feedTitle}
                </span>
                <span className="text-xs text-white/55">{a.feedNote}</span>
              </div>
              <ul aria-hidden className="mt-5 min-h-[372px] space-y-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {feed.map(({ n, id }, k) => {
                    const c = all.find((x) => x.id === id)!;
                    const fresh = k === 0 && !reduce;
                    return (
                      <motion.li
                        key={n}
                        layout
                        initial={{ opacity: 0, y: -18, scale: 0.97 }}
                        animate={{ opacity: 1 - k * 0.14, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease }}
                        className={`rounded-2xl border p-3.5 ${fresh ? "border-cyan/40 bg-white/[0.08]" : "border-white/8 bg-white/[0.04]"}`}
                      >
                        <div className="flex items-center gap-2.5 text-xs">
                          <ChannelMark c={c} className={c.wordmark ? "h-3.5" : "size-4"} />
                          {!c.wordmark && <span className="font-medium text-white/90">{nameOf(c)}</span>}
                          <time className="ml-auto font-mono text-white/50">{clock(n)}</time>
                        </div>
                        <p className="mt-2 text-sm leading-snug text-white/85">{a.events[id]}</p>
                        <span
                          className={`mt-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            fresh ? "bg-cyan/15 text-cyan" : "bg-mint/15 text-mint"
                          }`}
                        >
                          {fresh ? <Lightbulb className="size-3" /> : <Check className="size-3" />}
                          {fresh ? a.suggested : a.approved}
                        </span>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-white/60">
                <span>
                  <b className="font-mono text-sm text-white">{all.length}</b> {a.watched}
                </span>
                <span className="font-mono">{a.loop}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Ring({
  channels, radius, activeId, tick, spin, counter, nameOf,
}: {
  channels: Channel[];
  radius: number;
  activeId: EventKey;
  tick: number;
  spin: string;
  counter: string;
  nameOf: (c: Channel) => string;
}) {
  const pts = channels.map((_, i) => place(i, channels.length, radius));
  const ai = channels.findIndex((c) => c.id === activeId);
  return (
    <div className={`absolute inset-0 ${spin}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.25" strokeDasharray="0.8 1.2" />
        {pts.map((p, i) => (
          <line
            key={i}
            x1="50" y1="50" x2={p.x} y2={p.y}
            stroke={i === ai ? "#6fe3ff" : "white"}
            strokeOpacity={i === ai ? 0.7 : 0.08}
            strokeWidth={i === ai ? 0.45 : 0.25}
            style={{ transition: "stroke-opacity 0.5s, stroke 0.5s" }}
          />
        ))}
        {ai >= 0 && (
          <motion.circle
            key={tick}
            r="1.1"
            fill="#6fe3ff"
            initial={{ cx: 50, cy: 50, opacity: 1 }}
            animate={{ cx: pts[ai].x, cy: pts[ai].y, opacity: [1, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
      </svg>
      {channels.map((c, i) => {
        const on = i === ai;
        return (
          <div key={c.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}>
            <div className={counter}>
              <motion.div
                animate={on ? { scale: [1, 1.18, 1.08] } : { scale: 1 }}
                transition={{ duration: 0.6, delay: on ? 0.75 : 0 }}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-2 text-xs font-medium backdrop-blur-md transition-colors duration-500 sm:px-3 ${
                  on ? "border-cyan/70 bg-[#13254a] text-white shadow-[0_0_28px_-4px_rgba(111,227,255,0.8)]" : "border-white/12 bg-[#0f1a33]/90 text-white/80"
                }`}
              >
                <ChannelMark c={c} className={c.wordmark ? "h-3 sm:h-3.5" : "size-4 sm:size-[18px]"} />
                {!c.wordmark && <span className="hidden sm:inline">{nameOf(c)}</span>}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChannelMark({ c, className }: { c: Channel; className: string }) {
  if (c.icon) {
    const I = c.icon;
    return <I className={`${className} text-sky`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/brands/${c.id}.svg`} alt="" className={`${className} ${c.wordmark ? "w-auto" : "object-contain"} ${INK.has(c.id) ? "invert hue-rotate-180" : ""}`} />
  );
}
