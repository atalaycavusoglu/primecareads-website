# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

All four groups below, confirmed by the client (2026-11-08):

- **E-commerce brands** selling on their own site and on marketplaces (Trendyol, Hepsiburada, Amazon, Etsy). Marketing managers or owners who need sales, not just traffic.
- **Lead-driven companies** (automotive, tourism, services) that win customers through forms, calls and messages and need qualified meetings, not raw form counts.
- **Brands seeking awareness** that want share of voice and share of search to grow.
- **Mid-to-large companies** with a marketing director or CMO who has to show the board whether the brand is gaining on competitors.

Their situation: they already spend on ads, get channel-by-channel reports (ROAS, clicks) from agencies, and cannot answer "are we growing against competitors?" The site is bilingual: Turkish at `/`, English at `/en/` (strings in `src/i18n/`).

## Product Purpose

PrimeCareAds is an AI-assisted advertising and media agency in Kadıköy, Istanbul. It manages and grows a brand's **digital market share** across four "shelves": search, social/video, marketplace shelf, and AI answers (ChatGPT, Gemini, Google AI overviews). Success for a client is a working decision system, not one good campaign month.

## Positioning

Most agencies report inward (their own campaign's ROAS). PrimeCareAds reports outward: the client's share against competitors on each shelf, and builds a continuous system that measures, analyses and decides with data. Core line: "Başarı bir kampanya değil, bir sistem." Hero lines (client, 2026-11-08): "Dijitalde pazar payınızı artırıyoruz." and "Yapay zeka ile reklam desteğinizi artırıyoruz." ROAS is tracked, but shown beside market share, never alone.

## Operating Context

- Goals are handled as three separate systems: e-commerce (sales, catalogue/stock/margin data), lead (lead scoring in CRM, optimised for qualified meetings), awareness (reach measured through brand-search and AI-answer share).
- Decision loop: set up measurement (Analytics, conversion tags, CRM, marketplace data) → measure share vs competitors → AI model flags deviations and opportunities daily → the team validates with data and A/B tests → report.
- Reporting cadence: daily alerts, weekly decisions, monthly market-share report with competitors.
- AI proposes; the team approves every decision.
- The main action is a meeting request ("Görüşme talep edin"). There is **no free analysis** offer.

## Capabilities and Constraints

- Platforms: Google Ads, Meta (Facebook, Instagram), YouTube, Google Analytics; marketplaces Amazon, Hepsiburada, Trendyol, Etsy; AI-answer visibility on ChatGPT, Gemini and Google AI overviews (measured, confirmed by client).
- Services: performance ads, SEO (technical, local, mobile) and AI-search visibility, social media and content production, content strategy, e-mail marketing, data visualisation/dashboards, digital check-up, training.
- Stack: Next.js 15 (App Router, static export) + Tailwind v4 + motion (animations) + lucide-react, in this repo. Components in `src/components/`, brand logos in `public/brands/`.
- Dark theme only (client request, 2026-11-08: white sections were too bright). Content sections use the tokens `surface`, `mist`, `line`, `fg`, `brand`, `accent`; hero and feature bands use `ink`/`night`. There is no light mode or theme toggle.
- Pages (TR / EN): `/` and `/en/` home, `/hizmetler/` and `/en/services/`, `/hakkimizda/` and `/en/about/`, `/blog/` and `/en/blog/` with posts at `/blog/<slug>/`, `/iletisim/` and `/en/contact/`. Shared page views live in `src/views/`; route files in `src/app/(tr)` and `src/app/(en)` only pick the language.
- Blog posts live in `src/content/posts.ts`; the TR and EN versions of an article share a `key`, so the language switch links them. Three starter posts (2026-11-08) were written by Claude for the client to review; they contain no client results or invented figures.
- More pages (2026-11-08): service detail pages (`src/content/services.ts`), sector pages for cosmetics, automotive and tourism (`src/content/sectors.ts`), an 8-question self check-up (`src/content/checkup.ts`; the visitor scores themselves, so it is not a "free analysis"), KVKK notice and cookie policy (`src/content/legal.ts`).
- Settings the client must supply live in `src/config.ts` and `.env.example`: company legal name, MERSIS, KVKK inbox, `legalApproved`, Web3Forms key (form + newsletter), GA4 / Google Ads / Meta Pixel IDs. Until filled, the form falls back to mailto, the newsletter is hidden, no tracking or cookie banner runs, and legal pages show highlighted placeholders and a draft notice.
- Tracking is consent-gated (KVKK): nothing loads before "Accept"; Accept and Reject carry equal weight.
- SEO: sitemap.xml, robots.txt, RSS per language, JSON-LD (ProfessionalService, Service, FAQPage, BlogPosting, BreadcrumbList), share images at `/og/*.png`, bilingual 404 via `global-not-found`.
- Open: KVKK and cookie texts are Claude-written drafts that need legal review.

## Brand Commitments

- Name: PrimeCareAds. Logo: `public/logo.png` ("ADS / PRIME CARE", navy on transparent).
- Colours: the logo's navy **#2E416B** and **white** are binding (client request).
- Nothing from the old WordPress site's design may be referenced (client request); only its facts are reused.
- Language: Turkish first; plain, data-led voice; "biz" for the work, "siz" for what the client gets.

## Evidence on Hand

- 10+ years of experience and 100+ completed projects (confirmed by the client, 2026-11-08). From the old site: sectors cosmetics/automotive/tourism, marketplace work on Amazon/Hepsiburada/Trendyol/Etsy, three anonymous testimonials (Tourism CEO, Automotive Marketing Director, Cosmetics Brand Manager).
- Address: İğrip Sokak, Fenerbahçe, Kadıköy/İstanbul (street and district only on the page). Accounts: instagram.com/primecareads, linkedin.com/company/prime-care-ads.
- **Absent, never fabricate:** named clients or logos, real campaign results, awards, team names/photos, prices. Numbers inside UI mockups are illustrative and must read as examples, never as client results.

## Product Principles

1. Market share over vanity metrics: every claim is framed against competitors.
2. A system, not a campaign: show the loop (measure → analyse → decide → report), not one-off wins.
3. Answer the buyer's real questions with data ("Bütçem nereye gidiyor?", "Rakiplerim beni geçiyor mu?", "Yapay zeka markamı öneriyor mu?").
4. AI assists, people decide.
5. Show the work as it really runs: dashboards, alerts, decision logs.

## Accessibility & Inclusion

Heavy motion is requested by the client; every animation must still respect `prefers-reduced-motion` and keep text at WCAG AA contrast (body text 7:1 target from the taste-skill floor).
