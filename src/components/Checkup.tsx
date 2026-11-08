"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Clock, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { checkup, type Area } from "@/content/checkup";
import { CHECKUP_KEY } from "@/lib/forms";
import { Counter, ease } from "./ui";
import { useT } from "./LangProvider";
import type { Lang } from "@/i18n";

const AREAS: Area[] = ["measure", "search", "shelf", "ai", "decide"];

/* Each answer scores 0–3; the result is a percentage overall and per area. */
function score(answers: number[], lang: Lang) {
  const qs = checkup[lang].questions;
  const total = Math.round((answers.reduce((a, b) => a + b, 0) / (qs.length * 3)) * 100);
  const byArea = AREAS.map((area) => {
    const idx = qs.map((q, i) => (q.area === area ? i : -1)).filter((i) => i >= 0);
    const sum = idx.reduce((a, i) => a + (answers[i] ?? 0), 0);
    return { area, pct: Math.round((sum / (idx.length * 3)) * 100) };
  });
  return { total, byArea };
}

export default function Checkup() {
  const t = useT();
  const lang = t.lang as Lang;
  const c = checkup[lang];
  const reduce = useReducedMotion();
  const [step, setStep] = useState(-1); // -1 intro, 0..n-1 questions, n analysing, n+1 result
  const [answers, setAnswers] = useState<number[]>([]);
  const [dir, setDir] = useState(1);
  const n = c.questions.length;

  const answer = (v: number) => {
    const next = [...answers];
    next[step] = v;
    setAnswers(next);
    setDir(1);
    setTimeout(() => setStep((s) => s + 1), reduce ? 0 : 260);
  };

  useEffect(() => {
    if (step < 0 || step >= n) return;
    const onKey = (e: KeyboardEvent) => {
      const v = Number(e.key) - 1;
      if (v >= 0 && v < c.questions[step].options.length) answer(v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (step !== n) return;
    const id = setTimeout(() => setStep(n + 1), reduce ? 300 : 2600);
    return () => clearTimeout(id);
  }, [step, n, reduce]);

  const restart = () => {
    setAnswers([]);
    setDir(-1);
    setStep(-1);
  };

  return (
    <section className="relative bg-mist py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_40px_100px_-50px_rgba(46,65,107,0.6)]">
          {step >= 0 && step < n && (
            <div className="h-1.5 bg-brand/10">
              <motion.div className="h-full bg-gradient-to-r from-glow to-cyan" animate={{ width: `${(step / n) * 100}%` }} transition={{ duration: 0.4, ease }} />
            </div>
          )}
          <div className="min-h-[460px] p-6 sm:p-10">
            <AnimatePresence mode="wait" custom={dir}>
              {step === -1 && (
                <Slide key="intro" dir={dir}>
                  <span className="grid size-14 place-items-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/30">
                    <Sparkles className="size-7 text-cyan" />
                  </span>
                  <h2 className="mt-6 text-3xl font-semibold tracking-tight">{c.title} {c.highlight}</h2>
                  <p className="mt-3 text-lg text-fg/70">{c.sub}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {AREAS.map((a, i) => (
                      <motion.li
                        key={a}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.07 }}
                        className="rounded-full border border-line bg-mist px-3 py-1.5 text-sm text-fg/75"
                      >
                        {c.areas[a]}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setDir(1);
                        setStep(0);
                      }}
                      className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-medium text-white transition hover:bg-navy-600"
                    >
                      {c.start} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="inline-flex items-center gap-1.5 text-sm text-fg/65"><Clock className="size-4" /> {c.duration}</span>
                  </div>
                  <p className="mt-8 flex items-start gap-2 text-sm text-fg/60"><ShieldCheck className="mt-0.5 size-4 shrink-0" /> {c.disclaimer}</p>
                </Slide>
              )}

              {step >= 0 && step < n && (
                <Slide key={`q${step}`} dir={dir}>
                  <p className="font-mono text-sm text-accent">
                    {c.question} {step + 1} {c.of} {n} · {c.areas[c.questions[step].area]}
                  </p>
                  <h2 id="q-h" className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{c.questions[step].q}</h2>
                  <div role="radiogroup" aria-labelledby="q-h" className="mt-8 grid gap-3">
                    {c.questions[step].options.map((o, v) => {
                      const chosen = answers[step] === v;
                      return (
                        <motion.button
                          key={o}
                          type="button"
                          role="radio"
                          aria-checked={chosen}
                          onClick={() => answer(v)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + v * 0.06 }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                            chosen ? "border-glow bg-glow/10" : "border-line bg-mist hover:border-brand/30"
                          }`}
                        >
                          <span className={`grid size-8 shrink-0 place-items-center rounded-lg font-mono text-sm transition-colors ${chosen ? "bg-navy text-white" : "bg-surface text-brand group-hover:bg-navy group-hover:text-white"}`}>
                            {chosen ? <Check className="size-4" /> : v + 1}
                          </span>
                          <span className="text-fg/85">{o}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setDir(-1);
                        setStep(step - 1);
                      }}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg/65 hover:text-fg"
                    >
                      <ArrowLeft className="size-4" /> {c.back}
                    </button>
                  )}
                </Slide>
              )}

              {step === n && (
                <Slide key="analysing" dir={1}>
                  <div className="grid min-h-[380px] place-items-center text-center">
                    <div>
                      <div className="relative mx-auto size-24">
                        <motion.span className="absolute inset-0 rounded-full border-2 border-cyan/70" animate={{ scale: [1, 1.6], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                        <motion.span className="absolute inset-0 rounded-full border-2 border-glow/60" animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} />
                        <span className="relative grid size-24 place-items-center rounded-full bg-navy text-white shadow-[0_0_50px_-6px_rgba(91,140,255,0.8)]">
                          <Sparkles className="size-9 text-cyan" />
                        </span>
                      </div>
                      <p className="mt-8 text-xl font-semibold">{c.analysing}</p>
                      <ul className="mt-5 space-y-2 text-left">
                        {c.analysingSteps.map((s, i) => (
                          <motion.li
                            key={s}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.5 }}
                            className="flex items-center gap-2 text-sm text-fg/70"
                          >
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.5, type: "spring" }}>
                              <Check className="size-4 text-emerald-600 dark:text-mint" />
                            </motion.span>
                            {s}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Slide>
              )}

              {step === n + 1 && (
                <Slide key="result" dir={1}>
                  <Result answers={answers} lang={lang} onRestart={restart} />
                </Slide>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ children, dir }: { children: React.ReactNode; dir: number }) {
  return (
    <motion.div
      custom={dir}
      initial={{ opacity: 0, x: dir * 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dir * -40 }}
      transition={{ duration: 0.35, ease }}
    >
      {children}
    </motion.div>
  );
}

function Result({ answers, lang, onRestart }: { answers: number[]; lang: Lang; onRestart: () => void }) {
  const t = useT();
  const c = checkup[lang];
  const { total, byArea } = score(answers, lang);
  const level = [...c.levels].reverse().find((l) => total >= l.min)!;
  const weakest = [...byArea].sort((a, b) => a.pct - b.pct).slice(0, 2);
  const R = 52;
  const C = 2 * Math.PI * R;

  const toContact = () => {
    const summary = `${c.summaryLabel}: ${total}/100 (${level.label}). ${byArea.map((b) => `${c.areas[b.area]} ${b.pct}`).join(", ")}`;
    try {
      sessionStorage.setItem(CHECKUP_KEY, summary);
    } catch {}
    window.location.href = t.routes.contact;
  };

  return (
    <div>
      <p className="font-mono text-sm uppercase tracking-[0.14em] text-accent">{c.resultTitle}</p>
      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
        <div className="relative size-40 shrink-0">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" className="stroke-brand" strokeOpacity="0.12" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="url(#ck-grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * (1 - total / 100) }}
              transition={{ duration: 1.6, ease }}
            />
            <defs>
              <linearGradient id="ck-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#5b8cff" />
                <stop offset="1" stopColor="#6fe3ff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-4xl font-semibold tracking-tight"><Counter to={total} duration={1.6} /></p>
              <p className="text-xs text-fg/60">/ 100</p>
            </div>
          </div>
        </div>
        <div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="inline-flex rounded-full bg-navy px-3 py-1 text-sm font-medium text-white">
            {level.label}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-3 text-lg leading-relaxed text-fg/80">
            {level.text}
          </motion.p>
        </div>
      </div>

      <h3 className="mt-10 font-semibold">{c.areasTitle}</h3>
      <ul className="mt-4 space-y-3">
        {byArea.map((b, i) => (
          <li key={b.area}>
            <div className="flex justify-between text-sm">
              <span className="text-fg/80">{c.areas[b.area]}</span>
              <span className="font-mono tabular-nums text-fg/70">{b.pct}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-brand/10">
              <motion.div
                className={`h-full rounded-full ${weakest.some((w) => w.area === b.area) ? "bg-gradient-to-r from-amber-500 to-amber-300" : "bg-gradient-to-r from-navy to-glow"}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(b.pct, 3)}%` }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.9, ease }}
              />
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 font-semibold">{c.nextTitle}</h3>
      <div className="mt-4 grid gap-3">
        {weakest.map((w, i) => (
          <motion.div
            key={w.area}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.15 }}
            className="rounded-2xl border border-line bg-mist p-5"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{c.areas[w.area]}</p>
            <p className="mt-2 text-fg/80">{c.advice[w.area]}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button type="button" onClick={toContact} className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-medium text-white transition hover:bg-navy-600">
          {c.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button type="button" onClick={onRestart} className="inline-flex items-center gap-1.5 text-sm text-fg/65 hover:text-fg">
          <RotateCcw className="size-4" /> {c.restart}
        </button>
      </div>
      <p className="mt-3 text-sm text-fg/60">{c.ctaNote}</p>
    </div>
  );
}

/* ---------- Home teaser ---------- */

export function CheckupTeaser() {
  const t = useT();
  const c = checkup[t.lang as Lang];
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <section aria-labelledby="ck-teaser-h" className="relative overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -left-32 top-0 h-[460px] w-[460px] animate-aurora rounded-full bg-glow/25 blur-[130px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-sky">
            <Sparkles className="size-3.5 text-cyan" /> {c.eyebrow}
          </span>
          <h2 id="ck-teaser-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {c.title} <span className="text-gradient">{c.highlight}</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">{c.sub}</p>
          <a href={t.routes.checkup} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink transition hover:bg-sky">
            {c.start} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/60"><Clock className="size-4" /> {c.duration}</p>
        </div>
        <div aria-hidden className="relative mx-auto size-64">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="9" />
            <motion.circle
              cx="60" cy="60" r={R} fill="none" stroke="url(#ckt-grad)" strokeWidth="9" strokeLinecap="round" strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: C * 0.32 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease }}
            />
            <defs>
              <linearGradient id="ckt-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#5b8cff" />
                <stop offset="1" stopColor="#6fe3ff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-5xl font-semibold tracking-tight">?</p>
              <p className="mt-1 text-sm text-white/60">/ 100</p>
            </div>
          </div>
          {c.analysingSteps.map((s, i) => (
            <motion.span
              key={s}
              className="absolute whitespace-nowrap rounded-full border border-white/15 bg-[#0f1a33]/90 px-3 py-1.5 text-xs text-white/80 backdrop-blur"
              style={{ left: ["-20%", "70%", "-14%", "64%"][i], top: ["8%", "18%", "72%", "82%"][i] }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.25, type: "spring" }}
            >
              <Check className="mr-1 inline size-3 text-mint" />{s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
