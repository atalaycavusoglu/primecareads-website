"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, TrendingUp, Search, ShoppingBag, Bot, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Counter, MagneticLink, ease } from "./ui";
import { useT } from "./LangProvider";

export default function Hero() {
  const t = useT();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-ink pb-24 pt-36 text-white sm:pt-44">
      {/* aurora */}
      <motion.div style={{ y: glowY }} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[560px] w-[560px] animate-aurora rounded-full bg-navy opacity-70 blur-[120px]" />
        <div className="absolute -right-32 top-10 h-[480px] w-[480px] animate-aurora rounded-full bg-glow opacity-30 blur-[130px] [animation-delay:-6s]" />
        <div className="absolute left-1/3 top-[45%] h-[420px] w-[420px] animate-aurora rounded-full bg-cyan opacity-[0.12] blur-[120px] [animation-delay:-12s]" />
      </motion.div>
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.a
            href="#otomasyon"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="glass group inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm text-white/80"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-cyan">
              <Sparkles className="size-3" /> {h.badge}
            </span>
            {h.tagline}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <h1 className="mt-8 text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {h.headline.map((w, i) => (
              <span key={`${w}-${i}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.16em] align-bottom">
                <motion.span
                  className={`inline-block ${h.highlight.includes(i) ? "text-gradient" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
                >
                  {w}
                  {i < h.headline.length - 1 && " "}
                </motion.span>
              </span>
            ))}
          </h1>

          <Typed text={h.typed} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            {h.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticLink
              href={t.routes.contact}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 font-medium text-ink shadow-[0_0_40px_-8px_rgba(111,227,255,0.6)]"
            >
              <span className="relative z-10">{t.mainAction}</span>
              <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </MagneticLink>
            <a
              href="#hedefler"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-medium text-white/85 transition hover:border-white/40 hover:bg-white/5"
            >
              {h.secondary}
            </a>
          </motion.div>
        </div>

        <Dashboard />
      </div>
    </section>
  );
}

/** Types the second line once the headline has landed. */
function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    setN(0);
    let i: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      i = setInterval(() => setN((x) => Math.min(x + 1, text.length)), 38);
    }, 1100);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, [text]);
  return (
    <p className="mt-5 min-h-[1.5em] text-[clamp(1.15rem,2.6vw,1.6rem)] font-medium tracking-[-0.01em] text-sky">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, n)}
        <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-blink bg-cyan" />
      </span>
    </p>
  );
}

const kpiConfig = [
  { icon: Search, to: 18, pct: true, delta: "▲3" },
  { icon: TrendingUp, to: 42, pct: true, delta: "▲5" },
  { icon: ShoppingBag, to: 6, pct: false, delta: "▲2" },
  { icon: Bot, to: 4, pct: false, delta: "▲1" },
];

function Dashboard() {
  const t = useT();
  const h = t.hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <div ref={ref} className="relative mx-auto mt-20 max-w-5xl [perspective:1400px]">
      <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 rounded-[40px] bg-glow/20 blur-3xl" />
      <motion.div
        style={{ rotateX, scale, transformOrigin: "center top" }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease }}
        role="img"
        aria-label={h.dashAria}
        className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0e1730]/90 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        <div aria-hidden className="flex items-center gap-3 border-b border-white/10 px-5 py-3 text-xs text-white/50">
          <span className="flex gap-1.5">
            <i className="size-2.5 rounded-full bg-white/15" />
            <i className="size-2.5 rounded-full bg-white/15" />
            <i className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="text-white/80">
            <b className="font-medium">{h.dashTitle}</b> · {h.dashBrand}
          </span>
          <span className="ml-auto hidden items-center gap-1.5 sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            {h.live}
          </span>
        </div>

        <div aria-hidden className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/40">{h.week}</p>
            <div className="grid grid-cols-2 gap-3">
              {kpiConfig.map((k, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.6, ease }}
                  className="rounded-2xl border border-white/8 bg-white/[0.04] p-3.5"
                >
                  <div className="flex items-center justify-between text-white/50">
                    <k.icon className="size-4" />
                    <span className="text-[11px] font-medium text-mint">{k.delta}</span>
                  </div>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    <Counter to={k.to} prefix={k.pct ? t.pct.prefix : ""} suffix={k.pct ? t.pct.suffix : ""} />
                    {h.kpis[i].unit && <span className="ml-1 text-base font-medium text-white/70">{h.kpis[i].unit}</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-white/75">{h.kpis[i].label}</p>
                  <p className="text-[11px] text-white/50">{h.kpis[i].sub}</p>
                </motion.div>
              ))}
            </div>
            <MiniChart />
          </div>
          <Chat />
        </div>
      </motion.div>
    </div>
  );
}

function MiniChart() {
  const h = useT().hero;
  const d = "M0 70 C 30 66, 50 58, 80 60 S 130 44, 160 46 S 210 30, 240 34 S 290 16, 320 12";
  return (
    <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/75">{h.chartTitle}</span>
        <span className="flex items-center gap-3 text-white/55">
          <span className="flex items-center gap-1"><i className="h-0.5 w-3 rounded bg-cyan" />{h.you}</span>
          <span className="flex items-center gap-1"><i className="h-0.5 w-3 rounded bg-white/30" />{h.rival}</span>
        </span>
      </div>
      <svg viewBox="0 0 320 80" className="mt-2 h-20 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#6fe3ff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#6fe3ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 50 C 40 48, 70 52, 100 46 S 160 50, 200 44 S 260 42, 320 40"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1.6, ease }}
        />
        <motion.path
          d={`${d} L320 80 L0 80 Z`}
          fill="url(#hero-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.6 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="#6fe3ff"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5, ease }}
        />
      </svg>
    </div>
  );
}

/** Loops: question → thinking → streamed answer → approve. */
function Chat() {
  const h = useT().hero;
  const answer = h.answer;
  const [phase, setPhase] = useState(0); // 0 question, 1 reading, 2 streaming, 3 done, 4 approved
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase(4);
      setChars(answer.length);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    let i: ReturnType<typeof setInterval>;
    const run = () => {
      setPhase(0);
      setChars(0);
      t = setTimeout(() => {
        setPhase(1);
        t = setTimeout(() => {
          setPhase(2);
          let n = 0;
          i = setInterval(() => {
            n += 2;
            setChars(Math.min(n, answer.length));
            if (n >= answer.length) {
              clearInterval(i);
              setPhase(3);
              t = setTimeout(() => {
                setPhase(4);
                t = setTimeout(run, 4200);
              }, 1600);
            }
          }, 28);
        }, 1800);
      }, 1400);
    };
    t = setTimeout(run, 1600);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, [answer]);

  return (
    <div className="flex min-h-[340px] flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-xs text-white/50">
        <Sparkles className="size-3.5 text-cyan" /> {h.daily}
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-3 text-sm">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-navy px-3.5 py-2.5 text-white">
          {h.question}
        </div>

        <AnimatePresence mode="popLayout">
          {phase >= 1 && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-white/50"
            >
              {phase === 1 ? (
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
              ) : (
                <Check className="size-3.5 text-mint" />
              )}
              {h.reading}
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-3.5 py-3 leading-relaxed text-white/90"
          >
            {answer.slice(0, chars)}
            {phase === 2 && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-cyan" />}
            {phase >= 3 && <small className="mt-2 block text-[11px] text-white/55">{h.draft}</small>}
          </motion.div>
        )}

        <div className="mt-auto flex gap-2">
          <motion.span
            animate={phase === 4 ? { scale: [1, 0.94, 1] } : {}}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 ${
              phase === 4 ? "bg-mint text-ink" : phase === 3 ? "bg-white text-ink" : "bg-white/10 text-white/40"
            }`}
          >
            {phase === 4 && <Check className="size-3.5" />}
            {phase === 4 ? h.approved : h.approve}
          </motion.span>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60">{h.edit}</span>
        </div>
      </div>
    </div>
  );
}
