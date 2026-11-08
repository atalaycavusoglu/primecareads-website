"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  Package, Sparkles, Store, ShoppingCart, FileText, Phone, MessageCircle, CalendarCheck, ChartColumn, Check, CircleUser,
  Target, type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Eyebrow, Reveal, ease } from "./ui";
import { useT } from "./LangProvider";
import type { Dict } from "@/i18n";

/* ---------- Statement: scroll-linked word reveal ---------- */

export function Statement() {
  const s = useT().statement;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "center 0.6"] });
  const words = s.text.split(" ");
  return (
    <section ref={ref} aria-labelledby="ifade-h" className="relative overflow-hidden bg-ink py-32 text-white sm:py-44">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/60 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="ifade-h" className="sr-only">{s.text}</h2>
        <p aria-hidden className="text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} highlight={w.startsWith(s.highlight)}>
              {w}
            </Word>
          ))}
        </p>
        <Reveal delay={0.1} className="mt-10 max-w-xl text-lg leading-relaxed text-white/70">
          {s.sub}
        </Reveal>
      </div>
    </section>
  );
}

function Word({ children, progress, range, highlight }: { children: string; progress: MotionValue<number>; range: [number, number]; highlight: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [12, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.22em] inline-block ${highlight ? "text-gradient" : ""}`}>
      {children}
    </motion.span>
  );
}

/* ---------- Goals: tabs, flow diagram, and questions → answer → solution ---------- */

type GoalText = Dict["goals"]["items"][number];
type IconRef = LucideIcon | string;

/* Icons per goal, in the same order as the dictionary's items. */
const goalIcons: { input: IconRef; core: IconRef; lanes: IconRef[]; output: IconRef }[] = [
  { input: Package, core: Sparkles, lanes: ["google-ads", "meta", Store], output: ShoppingCart },
  { input: "google-ads", core: Sparkles, lanes: [FileText, Phone, MessageCircle], output: CalendarCheck },
  { input: "youtube", core: Sparkles, lanes: ["google-analytics", "instagram", "openai"], output: ChartColumn },
];

/* Brand marks drawn in black; they flip in dark mode. */
const INK_LOGOS = new Set(["openai", "instagram", "trendyol", "amazon"]);

export default function Goals() {
  const t = useT();
  const g = t.goals;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = g.items[active];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + g.items.length) % g.items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="hedefler" aria-labelledby="hedefler-h" className="relative overflow-hidden bg-surface py-28 sm:py-36">
      <div aria-hidden className="grid-bg-light pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{g.eyebrow}</Eyebrow>
          <h2 id="hedefler-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {g.title} <span className="text-brand/60">{g.titleMuted}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div role="tablist" aria-label={g.tablist} onKeyDown={onKey} className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-mist p-1 [scrollbar-width:none]">
            {g.items.map((x, i) => (
              <button
                key={i}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                type="button"
                id={`tab-${i}`}
                aria-selected={active === i}
                aria-controls={`panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2.5 text-[13px] font-medium sm:px-5 sm:text-sm transition-colors ${active === i ? "text-white" : "text-fg/70 hover:text-fg"}`}
              >
                {active === i && (
                  <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{x.tab}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease }}
              >
                <p className="font-mono text-sm uppercase tracking-widest text-accent">{item.name}</p>
                <p className="mt-4 text-xl leading-relaxed text-fg/80">{item.text}</p>
                <p className="sr-only">{item.alt}</p>
              </motion.div>
            </AnimatePresence>
            <Reveal delay={0.15}>
              <Flow goal={item} icons={goalIcons[active]} k={active} />
            </Reveal>
          </div>

          <Playbook key={active} goal={item} labels={g.labels} />
        </div>
      </div>
    </section>
  );
}

/** Three cards that play in sequence: the client's questions, our streamed answer, then the solution steps. */
function Playbook({ goal, labels }: { goal: GoalText; labels: Dict["goals"]["labels"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0 idle, 1 questions, 2 thinking, 3 streaming, 4 solution
  const [chars, setChars] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setPhase(4);
      setChars(goal.answer.length);
      setSteps(goal.solution.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i: ReturnType<typeof setInterval> | undefined;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    setPhase(1);
    at(goal.questions.length * 450 + 400, () => setPhase(2));
    at(goal.questions.length * 450 + 1500, () => {
      setPhase(3);
      let n = 0;
      i = setInterval(() => {
        n += 3;
        setChars(Math.min(n, goal.answer.length));
        if (n >= goal.answer.length) {
          clearInterval(i);
          setPhase(4);
          goal.solution.forEach((_, k) => at(350 + k * 520, () => setSteps(k + 1)));
        }
      }, 22);
    });
    return () => {
      timers.forEach(clearTimeout);
      if (i) clearInterval(i);
    };
  }, [inView, reduce, goal]);

  return (
    <div ref={ref} className="mt-14 grid gap-5 lg:grid-cols-3">
      {/* Questions */}
      <div className="rounded-3xl border border-line bg-mist p-6">
        <CardHead n="01" label={labels.questions} />
        <ul className="mt-5 space-y-3">
          {goal.questions.map((q, k) => (
            <motion.li
              key={q}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: k * 0.45, type: "spring", stiffness: 260, damping: 22 }}
              className="flex items-start gap-2.5"
            >
              <CircleUser aria-hidden className="mt-1.5 size-5 shrink-0 text-brand/60" />
              <span className="rounded-2xl rounded-tl-md border border-line bg-surface px-4 py-3 text-[15px] leading-snug text-fg shadow-sm">
                {q}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Answer: an AI-style card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink p-6 text-white shadow-[0_30px_80px_-40px_rgba(11,18,34,0.9)] dark:border-glow/35 dark:bg-[#0a1124]">
        <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-glow/30 blur-3xl" />
        <div className="relative">
          <CardHead n="02" label={labels.answer} dark />
          <div className="mt-5 min-h-[180px] text-[15px] leading-relaxed text-white/90">
            <p className="sr-only">{goal.answer}</p>
            <div aria-hidden>
              {phase === 2 && (
                <span className="flex items-center gap-2 text-sm text-white/60">
                  <Sparkles className="size-4 text-cyan" />
                  {labels.thinking}
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.i
                        key={d}
                        className="size-1.5 rounded-full bg-cyan"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: d * 0.15 }}
                      />
                    ))}
                  </span>
                </span>
              )}
              {phase >= 3 && (
                <p>
                  {goal.answer.slice(0, chars)}
                  {phase === 3 && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-cyan" />}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-[0_30px_80px_-50px_rgba(46,65,107,0.45)]">
        <CardHead n="03" label={labels.solution} />
        <ol className="mt-5 flex-1 space-y-3">
          {goal.solution.map((s, k) => {
            const done = k < steps;
            return (
              <li key={s} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[11px] transition-colors duration-500 ${
                    done ? "border-transparent bg-mint text-ink" : "border-brand/25 text-brand/70"
                  }`}
                >
                  {done ? (
                    <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                      <Check className="size-3.5" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    k + 1
                  )}
                </span>
                <span className={`text-[15px] leading-snug transition-colors duration-500 ${done ? "text-fg" : "text-fg/55"}`}>
                  <span className="sr-only">{labels.step} {k + 1}: </span>
                  {s}
                </span>
              </li>
            );
          })}
        </ol>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={steps >= goal.solution.length ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="mt-6 flex items-start gap-2 rounded-2xl bg-brand/8 px-4 py-3 text-sm text-fg"
        >
          <Target aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>
            <b className="block font-semibold">{labels.kpi}</b>
            {goal.kpi}
          </span>
        </motion.p>
      </div>
    </div>
  );
}

function CardHead({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] ${dark ? "text-sky" : "text-accent"}`}>
      <span className={`rounded-md px-1.5 py-0.5 ${dark ? "bg-white/10" : "bg-brand/8"}`}>{n}</span>
      {label}
    </p>
  );
}

function Icon({ icon, className = "size-5" }: { icon: IconRef; className?: string }) {
  if (typeof icon === "string") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/brands/${icon}.svg`} alt="" className={`${className} object-contain ${INK_LOGOS.has(icon) ? "logo-ink" : ""}`} />;
  }
  const I = icon;
  return <I className={className} />;
}

/* Coordinates are in a 600×340 box: input → core → three lanes → output. */
const P = { input: [60, 170], core: [222, 170], lanes: [[375, 60], [375, 170], [375, 280]], output: [530, 170] } as const;
const curve = (a: readonly number[], b: readonly number[]) => {
  const mx = (a[0] + b[0]) / 2;
  return `M${a[0]} ${a[1]} C${mx} ${a[1]}, ${mx} ${b[1]}, ${b[0]} ${b[1]}`;
};

type FlowNodeData = { label: string; meta?: string; icon: IconRef };

function Flow({ goal, icons, k }: { goal: GoalText; icons: (typeof goalIcons)[number]; k: number }) {
  const reduce = useReducedMotion();
  const paths = [
    curve(P.input, P.core),
    ...P.lanes.map((l) => curve(P.core, l)),
    ...P.lanes.map((l) => curve(l, P.output)),
  ];
  const pct = (p: readonly number[]) => ({ left: `${(p[0] / 600) * 100}%`, top: `${(p[1] / 340) * 100}%` });
  const input: FlowNodeData = { ...goal.input, icon: icons.input };
  const lanes: FlowNodeData[] = goal.lanes.map((l, i) => ({ ...l, icon: icons.lanes[i] }));
  return (
    <div aria-hidden className="relative rounded-3xl border border-line bg-gradient-to-br from-mist to-surface p-3 shadow-[0_30px_80px_-40px_rgba(46,65,107,0.4)] sm:p-6">
      <div className="relative aspect-[600/340] w-full">
        <svg viewBox="0 0 600 340" className="absolute inset-0 size-full">
          {paths.map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" className="stroke-brand" strokeOpacity="0.15" strokeWidth="2" />
              <path d={d} fill="none" stroke="url(#flow-grad)" strokeWidth="2" strokeDasharray="6 18" className="animate-flow" />
            </g>
          ))}
          {!reduce &&
            paths.map((d, i) => (
              <circle key={`dot-${k}-${i}`} r="4" fill="#5b8cff">
                <animateMotion dur={`${2.2 + (i % 3) * 0.4}s`} begin={`${(i % 4) * 0.35}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}
          <defs>
            <linearGradient id="flow-grad" x1="0" x2="1">
              <stop offset="0" style={{ stopColor: "var(--color-brand)" }} />
              <stop offset="1" stopColor="#6fe3ff" />
            </linearGradient>
          </defs>
        </svg>

        <AnimatePresence mode="popLayout">
          <motion.div key={k} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <FlowNode style={pct(P.input)} node={input} delay={0} />
            <FlowNode style={pct(P.core)} node={{ label: goal.core, icon: icons.core }} delay={0.08} core />
            {lanes.map((l, i) => (
              <FlowNode key={l.label} style={pct(P.lanes[i])} node={l} delay={0.16 + i * 0.06} />
            ))}
            <FlowNode style={pct(P.output)} node={{ label: goal.output, icon: icons.output }} delay={0.4} done />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FlowNode({ node, style, delay, core, done }: { node: FlowNodeData; style: React.CSSProperties; delay: number; core?: boolean; done?: boolean }) {
  return (
    <motion.div
      style={style}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 22 }}
    >
      <div
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-2 py-1.5 text-[10px] shadow-lg sm:gap-2 sm:rounded-2xl sm:px-3.5 sm:py-2.5 sm:text-sm ${
          core
            ? "border-navy bg-navy text-white shadow-navy/30"
            : done
              ? "border-mint/60 bg-surface text-fg shadow-mint/20"
              : "border-line bg-surface text-fg shadow-navy/5"
        }`}
      >
        {core && (
          <motion.span
            className="absolute inset-0 rounded-xl border-2 border-cyan sm:rounded-2xl"
            animate={{ opacity: [0.6, 0], scale: [1, 1.35] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        )}
        <Icon icon={node.icon} className={`size-3.5 sm:size-5 ${core ? "text-cyan" : done ? "text-emerald-600 dark:text-mint" : "text-brand"}`} />
        <span className="leading-tight">
          <b className="block font-semibold">{node.label}</b>
          {node.meta && <span className={`hidden sm:block ${core ? "text-white/65" : "text-fg/60"} text-xs`}>{node.meta}</span>}
        </span>
      </div>
    </motion.div>
  );
}
