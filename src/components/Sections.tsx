"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, MapPin, Plus, Quote, Send, CheckCircle2, LoaderCircle, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site, trackingEnabled } from "@/config";
import { servicesFor } from "@/content/services";
import { openConsent, trackLead } from "@/lib/analytics";
import { CHECKUP_KEY, sendForm } from "@/lib/forms";
import type { Lang } from "@/i18n";
import { Counter, Eyebrow, MagneticLink, Reveal, ease } from "./ui";
import { useT } from "./LangProvider";

/* ---------- Sistem: 5 steps with a scroll-driven progress line, beside the decision log ---------- */

export function System() {
  const s = useT().system;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="sistem" aria-labelledby="sistem-h" className="bg-mist py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 id="sistem-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {s.title}
            </h2>
            <p className="mt-4 max-w-md text-lg text-fg/70">{s.sub}</p>
          </Reveal>
          <ol ref={ref} className="relative mt-12 space-y-10 pl-14">
            <span aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px bg-brand/20" />
            <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-glow to-cyan" />
            {s.steps.map(([title, d], i) => (
              <motion.li
                key={title}
                className="relative"
                initial={{ opacity: 0.3, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                transition={{ duration: 0.5, ease }}
              >
                <span className="absolute -left-14 grid size-10 place-items-center rounded-full border border-brand/20 bg-surface font-mono text-sm text-brand shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-1 text-fg/70">{d}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="lg:pt-24">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div role="img" aria-label={s.logAria} className="overflow-hidden rounded-3xl border border-white/10 bg-ink p-2 text-white shadow-[0_40px_100px_-40px_rgba(11,18,34,0.8)]">
                <div aria-hidden className="flex items-center justify-between px-4 py-3 text-sm">
                  <b className="font-medium">{s.logTitle}</b>
                  <span className="text-white/55">{s.logBrand}</span>
                </div>
                <ul aria-hidden className="space-y-2">
                  {s.log.map(([when, data, decision], i) => (
                    <motion.li
                      key={when}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 * i, duration: 0.6, ease }}
                      className="rounded-2xl bg-white/[0.05] p-4 transition-colors hover:bg-white/[0.08]"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-wider text-sky">{when}</p>
                      <p className="mt-1.5 text-white/85">{data}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-2.5 py-1 text-xs text-mint">
                        <ArrowRight className="size-3" /> {decision}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rakamlar ---------- */

export function Stats() {
  const s = useT().stats;
  const numbers = [
    <Counter key="y" to={10} suffix="+" />,
    <Counter key="p" to={100} suffix="+" />,
    <Counter key="s" to={3} />,
    <Counter key="m" to={4} />,
  ];
  return (
    <section id="rakamlar" aria-labelledby="rakamlar-h" className="relative overflow-hidden bg-ink py-28 text-white sm:py-36">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -right-40 top-0 h-[500px] w-[500px] animate-aurora rounded-full bg-glow/25 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <h2 id="rakamlar-h" className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {s.title} <span className="text-white/55">{s.titleMuted}</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {s.items.map((label, i) => (
            <Reveal key={label} delay={i * 0.08} className="h-full">
              <div className="h-full bg-ink p-6 sm:p-8">
                <p className="text-5xl font-semibold tracking-tight sm:text-6xl">{numbers[i]}</p>
                <p className="mt-3 text-sm text-white/65">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <figure className="glass mt-8 rounded-3xl p-8 sm:p-10">
            <Quote className="size-8 text-cyan" />
            <blockquote className="mt-4 max-w-3xl text-xl leading-relaxed text-white/90 sm:text-2xl">“{s.quote}”</blockquote>
            <figcaption className="mt-5 text-sm text-white/60">{s.quoteBy}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Hizmetler ---------- */

export function Services() {
  const t = useT();
  const s = t.services;
  const items = servicesFor(t.lang as Lang);
  return (
    <section id="hizmetler" aria-labelledby="hizmetler-h" className="bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 id="hizmetler-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {s.title} <span className="text-brand/60">{s.titleMuted}</span>
            </h2>
          </Reveal>
        </div>
        <ul className="mt-14 border-t border-line">
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.04}>
              <li className="group relative border-b border-line">
                <a href={`${t.routes.services}${item.slug}/`} className="relative grid gap-2 py-8 sm:grid-cols-[80px_1fr_1.2fr_40px] sm:gap-6">
                  <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-mist transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative font-mono text-sm text-fg/60 sm:pt-2">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="relative text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2">{item.title}</h3>
                  <div className="relative">
                    <p className="text-fg/75">{item.text}</p>
                    <ul className="mt-4 space-y-2">
                      {item.points.map((pt, k) => (
                        <motion.li
                          key={pt}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + k * 0.08, duration: 0.4, ease }}
                          className="flex items-start gap-2 text-sm text-fg/70"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {pt}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight className="relative hidden size-6 text-brand opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100 sm:block" />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- SSS ---------- */

export function Faq() {
  const t = useT();
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="sss" aria-labelledby="sss-h" className="bg-mist py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <h2 id="sss-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{f.title}</h2>
          <p className="mt-4 text-lg text-fg/70">{f.sub}</p>
          <a href={t.routes.contact} className="mt-6 inline-flex items-center gap-2 font-medium text-brand hover:underline">
            {f.link} <ArrowRight className="size-4" />
          </a>
        </Reveal>
        <div className="space-y-3">
          {f.items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} delay={i * 0.05}>
                <div className={`rounded-2xl border bg-surface transition-colors ${isOpen ? "border-brand/30" : "border-line"}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
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
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-fg/75">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Görüşme formu ---------- */

/* Mail-app fallback used until a Web3Forms key is configured. */
const CONTACT_EMAIL = site.company.email || "merhaba@primecareads.example";

type Errors = Partial<Record<"name" | "email" | "phone" | "kvkk", string>>;

export function Contact({ asPage = false }: { asPage?: boolean }) {
  const t = useT();
  const c = t.contact;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "delivered" | "mailto" | "error">("idle");
  const [checkupResult, setCheckupResult] = useState("");

  /* A check-up result handed over from the test page (session only, never in the URL). */
  useEffect(() => {
    try {
      setCheckupResult(sessionStorage.getItem(CHECKUP_KEY) ?? "");
    } catch {}
  }, []);
  const dropCheckup = () => {
    setCheckupResult("");
    try {
      sessionStorage.removeItem(CHECKUP_KEY);
    } catch {}
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    if (get("botcheck")) return;
    const next: Errors = {};
    if (get("name").length < 3) next.name = c.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) next.email = c.errors.email;
    if (get("phone").replace(/\D/g, "").length < 10) next.phone = c.errors.phone;
    if (!f.get("kvkk")) next.kvkk = c.kvkkError;
    setErrors(next);
    if (Object.keys(next).length) return;
    const l = c.mailLabels;
    const fields: Record<string, string> = {
      [l.name]: get("name"),
      [l.email]: get("email"),
      [l.phone]: get("phone"),
      [l.company]: get("company"),
      [l.goal]: get("goal"),
      message: get("message"),
      KVKK: c.kvkk.link,
      marketing: f.get("marketing") ? "yes" : "no",
    };
    if (checkupResult) fields.checkup = checkupResult;

    if (site.web3formsKey) {
      setStatus("sending");
      const ok = await sendForm(c.mailSubject, { ...fields, email: get("email") });
      if (!ok) return setStatus("error");
      trackLead("meeting");
      dropCheckup();
      return setStatus("delivered");
    }
    const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };
  const sent = status === "delivered" || status === "mailto";

  const Heading = asPage ? "h1" : "h2";
  const field =
    "mt-2 w-full rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-sky focus:bg-white/[0.08] focus:ring-4 focus:ring-glow/20";

  return (
    <section id="gorusme" aria-labelledby="gorusme-h" className={`relative overflow-hidden bg-ink pb-28 text-white sm:pb-36 ${asPage ? "pt-40 sm:pt-48" : "pt-28 sm:pt-36"}`}>
      <div aria-hidden className="absolute -left-40 bottom-0 h-[520px] w-[520px] animate-aurora rounded-full bg-navy blur-[130px]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <Eyebrow dark>{c.eyebrow}</Eyebrow>
          <Heading id="gorusme-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
            {c.title} <span className="text-gradient">{c.titleHighlight}</span>
          </Heading>
          <p className="mt-5 max-w-md text-lg text-white/70">{c.sub}</p>
          <address className="mt-10 not-italic">
            <p className="flex items-start gap-3 text-white/80">
              <MapPin className="mt-0.5 size-5 text-cyan" />
              <span>{c.address[0]}<br />{c.address[1]}</span>
            </p>
            <a
              href="https://www.openstreetmap.org/search?query=%C4%B0%C4%9Frip%20Sokak%20Fenerbah%C3%A7e%20Kad%C4%B1k%C3%B6y%20%C4%B0stanbul"
              className="ml-8 mt-2 inline-flex items-center gap-1 text-sm text-sky hover:underline"
              rel="noopener"
            >
              {c.directions} <ArrowUpRight className="size-3.5" />
            </a>
          </address>
          <ul className="mt-8 flex gap-3">
            {[
              ["instagram", "Instagram", "https://www.instagram.com/primecareads/"],
              ["linkedin", "LinkedIn", "https://tr.linkedin.com/company/prime-care-ads"],
            ].map(([id, name, href]) => (
              <li key={id}>
                <a href={href} rel="noopener" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition hover:bg-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/brands/${id}.svg`} alt="" width={18} height={18} className="size-[18px] brightness-0 invert" />
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} role="status" className="grid min-h-[420px] place-items-center text-center">
                  <div>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-ink">
                      <CheckCircle2 className="size-8" />
                    </motion.span>
                    <p className="mt-6 text-2xl font-semibold">{c.thanks}</p>
                    <p className="mt-2 max-w-xs text-white/70">{status === "delivered" ? c.deliveredBody : c.sentBody}</p>
                    <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-sky hover:underline">{c.reopen}</button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label={c.fields.name} error={errors.name} className={field} autoComplete="name" />
                  <Field id="email" label={c.fields.email} type="email" error={errors.email} className={field} autoComplete="email" />
                  <Field id="phone" label={c.fields.phone} type="tel" error={errors.phone} className={field} autoComplete="tel" />
                  <Field id="company" label={c.fields.company} className={field} autoComplete="organization" />
                  <fieldset className="sm:col-span-2">
                    <legend className="text-sm text-white/75">{c.fields.goal}</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.goals.map((g, i) => (
                        <label key={g} className="cursor-pointer">
                          <input type="radio" name="goal" value={g} defaultChecked={i === 0} className="peer sr-only" />
                          <span className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition peer-checked:border-sky peer-checked:bg-sky peer-checked:text-ink peer-focus-visible:ring-4 peer-focus-visible:ring-glow/40">
                            {g}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="sm:col-span-2">
                    <label htmlFor="f-message" className="text-sm text-white/75">{c.fields.message}</label>
                    <textarea id="f-message" name="message" rows={3} className={field} />
                    <AnimatePresence>
                      {checkupResult && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 flex items-center gap-2 rounded-xl border border-cyan/30 bg-cyan/10 px-3 py-2 text-sm text-white/85"
                        >
                          <Sparkles className="size-4 shrink-0 text-cyan" />
                          <span className="flex-1">{c.checkupAttached}</span>
                          <button type="button" onClick={dropCheckup} className="inline-flex items-center gap-1 text-xs text-sky hover:text-white">
                            <X className="size-3.5" /> {c.removeCheckup}
                          </button>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Honeypot: hidden from people, filled by bots. */}
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  <div className="space-y-3 sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-white/80">
                      <input
                        type="checkbox"
                        name="kvkk"
                        aria-invalid={!!errors.kvkk}
                        aria-describedby={errors.kvkk ? "f-kvkk-err" : undefined}
                        className="mt-0.5 size-4 shrink-0 accent-sky"
                      />
                      <span>
                        {c.kvkk.before}
                        <a href={t.routes.privacy} target="_blank" rel="noopener" className="text-sky underline underline-offset-2 hover:text-white">{c.kvkk.link}</a>
                        {c.kvkk.after}
                      </span>
                    </label>
                    {errors.kvkk && <p id="f-kvkk-err" className="text-sm text-rose-300">{errors.kvkk}</p>}
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-white/70">
                      <input type="checkbox" name="marketing" className="mt-0.5 size-4 shrink-0 accent-sky" />
                      <span>{c.marketing}</span>
                    </label>
                  </div>
                  {status === "error" && <p role="alert" className="text-sm text-rose-300 sm:col-span-2">{c.sendError}</p>}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink transition hover:bg-sky disabled:opacity-70 sm:col-span-2"
                  >
                    {status === "sending" ? c.sending : t.mainAction}
                    {status === "sending" ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id, label, type = "text", error, className, autoComplete,
}: { id: string; label: string; type?: string; error?: string; className: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="text-sm text-white/75">{label}</label>
      <input
        id={`f-${id}`}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `f-${id}-err` : undefined}
        className={`${className} ${error ? "border-rose-400/70" : ""}`}
      />
      <AnimatePresence>
        {error && (
          <motion.p id={`f-${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-sm text-rose-300">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Footer ---------- */

export function Footer({ cta = true }: { cta?: boolean }) {
  const t = useT();
  const f = t.footer;
  return (
    <footer className="relative overflow-hidden bg-night pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-16 md:flex-row md:items-end">
          <Reveal>
            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{f.title}</h2>
            <p className="mt-3 text-white/65">{f.sub}</p>
          </Reveal>
          {cta && (
            <MagneticLink href={t.routes.contact} className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ink">
              {t.mainAction}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticLink>
          )}
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="PrimeCareAds" width={100} height={64} className="h-16 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-[220px] text-sm text-white/60">{f.blurb}</p>
          </div>
          {f.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-white/55">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([l, href]) => (
                  <li key={l}>
                    <a href={href} className="text-white/75 transition hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <motion.p
        aria-hidden
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="outline-text select-none text-center text-[19vw] font-bold leading-[0.8] tracking-[-0.06em]"
      >
        PrimeCareAds
      </motion.p>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 text-xs text-white/55 sm:px-6">
        <span>© 2026 PrimeCareAds</span>
        {trackingEnabled && (
          <button type="button" onClick={openConsent} className="underline-offset-2 hover:text-white hover:underline">
            {t.consent.reopen}
          </button>
        )}
        <span>{f.trademarks}</span>
      </div>
    </footer>
  );
}
