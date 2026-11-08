"use client";

import { AnimatePresence, LayoutGroup, motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, Bot, CalendarDays, ChartLine, Check, Clock, Filter, Lightbulb, Link2, Rss } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/config";
import Newsletter from "./Newsletter";
import { Eyebrow, Reveal, ease } from "./ui";
import { useT } from "./LangProvider";
import type { Block, Post } from "@/content/posts";

/** Stable anchor id for a heading, ASCII only so it survives in URLs. */
export const headingId = (text: string) =>
  text
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDate = (iso: string, locale: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/* ---------- Cover art: one animated motif per article ---------- */

const motifs: Record<string, { icon: typeof Bot; path: string; tint: string }> = {
  roas: { icon: ChartLine, path: "M0 70 C 40 66, 60 50, 100 54 S 160 30, 200 34 S 260 12, 300 8", tint: "from-navy via-[#1d3a7a] to-glow/70" },
  ai: { icon: Bot, path: "M0 40 C 50 10, 100 70, 150 40 S 250 10, 300 40", tint: "from-navy via-[#173a6a] to-cyan/60" },
  lead: { icon: Filter, path: "M0 10 L 120 30 L 180 50 L 300 56", tint: "from-navy via-[#22356b] to-mint/50" },
};

function Cover({ post, large = false }: { post: Post; large?: boolean }) {
  const m = motifs[post.key] ?? motifs.roas;
  const I = m.icon;
  return (
    <div aria-hidden className={`relative overflow-hidden bg-gradient-to-br ${m.tint} ${large ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
      <div className="grid-bg absolute inset-0 opacity-60" />
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-6 h-1/2 w-full">
        <motion.path
          d={m.path}
          fill="none"
          stroke="white"
          strokeOpacity="0.85"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
        <motion.path
          d={m.path}
          fill="none"
          stroke="#6fe3ff"
          strokeWidth="2"
          strokeDasharray="4 14"
          className="animate-flow"
          strokeOpacity="0.9"
        />
      </svg>
      <motion.div
        className="absolute left-5 top-5 grid size-11 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md"
        whileHover={{ rotate: -8, scale: 1.08 }}
      >
        <I className="size-5" />
      </motion.div>
      <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
    </div>
  );
}

function Meta({ post, light = false }: { post: Post; light?: boolean }) {
  const b = useT().pages.blog;
  return (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${light ? "text-white/65" : "text-fg/65"}`}>
      <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5" />{formatDate(post.date, b.dateLocale)}</span>
      <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" />{post.minutes} {b.minRead}</span>
    </p>
  );
}

function PostCard({ post, i }: { post: Post; i: number }) {
  const t = useT();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_-50px_rgba(46,65,107,0.5)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-40px_rgba(46,65,107,0.55)]"
    >
      <Cover post={post} />
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-brand/8 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">{post.category}</span>
        <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">
          <a href={`${t.routes.blog}${post.slug}/`} className="after:absolute after:inset-0">
            {post.title}
          </a>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-fg/70">{post.description}</p>
        <div className="mt-6 flex items-center justify-between gap-3">
          <Meta post={post} />
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/8 text-brand transition-all duration-300 group-hover:bg-navy group-hover:text-white">
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Blog index ---------- */

export function BlogIndex({ posts }: { posts: Post[] }) {
  const t = useT();
  const b = t.pages.blog;
  const categories = [b.all, ...Array.from(new Set(posts.map((p) => p.category)))];
  const [cat, setCat] = useState(b.all);
  const shown = cat === b.all ? posts : posts.filter((p) => p.category === cat);
  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <LayoutGroup>
          <div role="group" aria-label={b.eyebrow} className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${cat === c ? "text-white" : "text-fg/70 hover:text-fg"}`}
              >
                {cat === c && <motion.span layoutId="blog-cat" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <PostCard key={p.slug} post={p} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        <div className="mt-16">
          <Newsletter />
        </div>
        <a href={`${t.routes.blog}rss.xml`} className="mt-8 inline-flex items-center gap-2 text-sm text-fg/65 hover:text-fg">
          <Rss className="size-4" /> {t.ui.rss}
        </a>
      </div>
    </section>
  );
}

/* ---------- Home teaser ---------- */

export function BlogTeaser({ posts }: { posts: Post[] }) {
  const t = useT();
  const b = t.pages.blog;
  return (
    <section aria-labelledby="blog-h" className="bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>{b.teaserEyebrow}</Eyebrow>
            <h2 id="blog-h" className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{b.teaserTitle}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={t.routes.blog} className="group inline-flex items-center gap-2 font-medium text-brand">
              {b.teaserLink}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <PostCard key={p.slug} post={p} i={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Article ---------- */

export function Article({ post, related }: { post: Post; related: Post[] }) {
  const t = useT();
  const b = t.pages.blog;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <>
      <motion.div aria-hidden style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-glow via-cyan to-mint" />

      <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white sm:pt-44">
        <div aria-hidden className="absolute -left-40 -top-40 h-[520px] w-[520px] animate-aurora rounded-full bg-navy opacity-70 blur-[120px]" />
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <motion.a
            href={t.routes.blog}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="group inline-flex items-center gap-2 text-sm text-sky hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> {b.back}
          </motion.a>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }} className="mt-8">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-cyan">{post.category}</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15, duration: 0.9, ease }}
            className="mt-5 text-[clamp(2.2rem,5.5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.035em]"
          >
            {post.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7, ease }} className="mt-5 text-lg leading-relaxed text-white/70">
            {post.description}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-white/85">{b.by}</span>
            <Meta post={post} light />
          </motion.div>
        </div>
      </section>

      <article className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="-mt-28 overflow-hidden rounded-3xl border border-line shadow-[0_40px_100px_-50px_rgba(11,18,34,0.7)] sm:-mt-36">
            <Cover post={post} large />
          </Reveal>
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 xl:grid-cols-[1fr_minmax(0,48rem)_1fr]">
          <div aria-hidden className="hidden xl:block" />
          <div className="mt-14 min-w-0">
            {post.body.map((block, i) => (
              <BlockView key={i} block={block} summary={b.summary} />
            ))}
            <Share post={post} />
          </div>
          <Toc post={post} />
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="relative mt-16 overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-10">
            <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-glow/30 blur-3xl" />
            <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">{b.ctaTitle}</h2>
            <p className="relative mt-3 max-w-xl text-white/70">{b.ctaText}</p>
            <a href={t.routes.contact} className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-ink transition hover:bg-sky">
              {t.mainAction}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </article>

      <section className="bg-surface pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-h" className="bg-mist py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="related-h" className="text-3xl font-semibold tracking-[-0.03em]">{b.related}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function BlockView({ block, summary }: { block: Block; summary: string }) {
  switch (block.t) {
    case "h2":
      return (
        <Reveal y={16}>
          <h2 id={headingId(block.x)} className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{block.x}</h2>
        </Reveal>
      );
    case "p":
      return <p className="mt-5 text-[1.075rem] leading-[1.8] text-fg/80">{block.x}</p>;
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((x, i) => (
            <motion.li
              key={x}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.45, ease }}
              className="flex gap-3 text-[1.05rem] leading-relaxed text-fg/80"
            >
              <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-gradient-to-br from-glow to-cyan" />
              {x}
            </motion.li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((x, i) => (
            <motion.li
              key={x.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="flex gap-4 rounded-2xl border border-line bg-mist p-5"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy font-mono text-sm text-white">{i + 1}</span>
              <span>
                <b className="block font-semibold">{x.t}</b>
                <span className="mt-1 block leading-relaxed text-fg/75">{x.d}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      );
    case "note":
      return (
        <Reveal className="mt-10">
          <aside className="flex gap-4 rounded-2xl border border-glow/30 bg-gradient-to-br from-glow/10 to-cyan/5 p-6">
            <Lightbulb aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
            <p>
              <b className="block font-semibold">{summary}</b>
              <span className="mt-1 block leading-relaxed text-fg/80">{block.x}</span>
            </p>
          </aside>
        </Reveal>
      );
  }
}

/* ---------- Table of contents and sharing ---------- */

function Toc({ post }: { post: Post }) {
  const ui = useT().ui;
  const heads = useMemo(
    () => post.body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2").map((b) => ({ id: headingId(b.x), x: b.x })),
    [post],
  );
  const [active, setActive] = useState(heads[0]?.id);

  useEffect(() => {
    const els = heads.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [heads]);

  if (!heads.length) return null;
  return (
    <aside className="hidden xl:block">
      <nav aria-label={ui.toc} className="sticky top-28 mt-14">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg/60">{ui.toc}</p>
        <ol className="mt-4 space-y-1 border-l border-line">
          {heads.map((h) => (
            <li key={h.id} className="relative">
              {active === h.id && <motion.span layoutId="toc-bar" className="absolute -left-px top-0 h-full w-0.5 bg-gradient-to-b from-glow to-cyan" />}
              <a
                href={`#${h.id}`}
                aria-current={active === h.id ? "location" : undefined}
                className={`block py-1.5 pl-4 text-sm leading-snug transition-colors ${active === h.id ? "font-medium text-fg" : "text-fg/60 hover:text-fg"}`}
              >
                {h.x}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

const shareIcon = (d: string) => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
    <path d={d} />
  </svg>
);

function Share({ post }: { post: Post }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${t.routes.blog}${post.slug}/`;
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(post.title);
  const links = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: shareIcon("M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z") },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${text}`, icon: shareIcon("M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z") },
    { name: "WhatsApp", href: `https://wa.me/?text=${text}%20${u}`, icon: shareIcon("M.06 24l1.69-6.16A11.87 11.87 0 0 1 .16 11.9C.16 5.34 5.5 0 12.06 0a11.82 11.82 0 0 1 8.41 3.49 11.82 11.82 0 0 1 3.48 8.41c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.69-1.45L.06 24zm6.6-3.8c1.68 1 3.27 1.59 5.39 1.59 5.45 0 9.89-4.43 9.89-9.88a9.88 9.88 0 0 0-9.88-9.89c-5.45 0-9.89 4.43-9.89 9.88 0 2.22.65 3.89 1.75 5.63l-1 3.65 3.74-.98zm11.39-5.46c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41z") },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-6">
      <span className="text-sm font-medium text-fg/70">{t.ui.share}</span>
      {links.map((l) => (
        <motion.a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.name}
          whileHover={{ y: -3 }}
          className="grid size-10 place-items-center rounded-full border border-line bg-mist text-fg/75 transition-colors hover:border-brand/40 hover:text-brand"
        >
          {l.icon}
        </motion.a>
      ))}
      <motion.button
        type="button"
        onClick={copy}
        whileHover={{ y: -3 }}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-mist px-4 text-sm text-fg/75 transition-colors hover:border-brand/40 hover:text-brand"
      >
        {copied ? <Check className="size-4 text-emerald-600 dark:text-mint" /> : <Link2 className="size-4" />}
        <span aria-live="polite">{copied ? t.ui.copied : t.ui.copyLink}</span>
      </motion.button>
    </div>
  );
}
