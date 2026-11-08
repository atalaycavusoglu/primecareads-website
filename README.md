# PrimeCareAds website

Bilingual (Turkish / English) marketing site for PrimeCareAds, an AI-assisted advertising agency in Kadıköy, Istanbul.

Built with Next.js 15 (App Router, static export), Tailwind CSS v4, motion and lucide-react.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Where things live

| What | Where |
| --- | --- |
| UI text (TR / EN) | `src/i18n/tr.ts`, `src/i18n/en.ts` |
| Blog posts | `src/content/posts.ts` |
| Service and sector pages | `src/content/services.ts`, `src/content/sectors.ts` |
| Check-up questions | `src/content/checkup.ts` |
| KVKK notice and cookie policy | `src/content/legal.ts` |
| Company details, feature switches | `src/config.ts` |
| Page composition | `src/views/index.tsx` |
| Routes | `src/app/(tr)` and `src/app/(en)/en` |

Product context and brand rules are in `PRODUCT.md`.

## Settings to fill before launch

Copy `.env.example` to `.env.local` (and add the same keys in Vercel):

- `NEXT_PUBLIC_WEB3FORMS_KEY`: delivers the meeting form and newsletter. Without it the form opens the visitor's mail app and the newsletter is hidden.
- `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`, `NEXT_PUBLIC_META_PIXEL_ID`: tracking. Nothing loads, and no cookie banner shows, until at least one is set; tracking then starts only after the visitor accepts cookies.

In `src/config.ts`, fill in the company's legal name, MERSIS number and KVKK inbox, and set `legalApproved: true` once the KVKK and cookie texts have been legally reviewed.
