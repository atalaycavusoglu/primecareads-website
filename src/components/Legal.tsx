"use client";

import { TriangleAlert } from "lucide-react";
import { Fragment } from "react";
import { site } from "@/config";
import type { LegalDoc } from "@/content/legal";
import { Reveal } from "./ui";
import { useT } from "./LangProvider";

type Token = "legalName" | "address" | "email" | "mersis";

/** Replaces {{token}}s with values from config; missing ones show as a highlighted placeholder. */
function Text({ s }: { s: string }) {
  const u = useT().ui;
  const values: Record<Token, string> = {
    legalName: site.company.legalName,
    address: site.company.address,
    email: site.company.email,
    mersis: site.company.mersis,
  };
  return (
    <>
      {s.split(/(\{\{\w+\}\})/).map((part, i) => {
        const m = part.match(/^\{\{(\w+)\}\}$/);
        if (!m) return <Fragment key={i}>{part}</Fragment>;
        const key = m[1] as Token;
        const v = values[key];
        if (v) return <Fragment key={i}>{key === "email" ? <a href={`mailto:${v}`} className="text-brand underline underline-offset-2">{v}</a> : v}</Fragment>;
        return (
          <mark key={i} className="rounded bg-amber-200/70 px-1 text-amber-950 dark:bg-amber-400/25 dark:text-amber-200">
            [{u.placeholders[key]}, {u.placeholder}]
          </mark>
        );
      })}
    </>
  );
}

export default function Legal({ doc, related }: { doc: LegalDoc; related: { label: string; href: string } }) {
  const u = useT().ui;
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {!site.legalApproved && (
          <p role="note" className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-400/50 bg-amber-100/60 p-4 text-sm text-amber-950 dark:bg-amber-400/10 dark:text-amber-200">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" />
            {u.draftNotice}
          </p>
        )}
        <p className="text-sm text-fg/60">{doc.updated}</p>
        <p className="mt-6 text-lg leading-relaxed text-fg/80"><Text s={doc.intro} /></p>
        {doc.sections.map((sec) => (
          <Reveal key={sec.h} y={14}>
            <h2 className="mt-12 text-2xl font-semibold tracking-tight">{sec.h}</h2>
            {sec.p?.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-fg/80"><Text s={p} /></p>
            ))}
            {sec.ul && (
              <ul className="mt-4 space-y-2.5">
                {sec.ul.map((li, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-fg/80">
                    <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span><Text s={li} /></span>
                  </li>
                ))}
              </ul>
            )}
            {sec.table && (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-mist text-fg">
                    <tr>{sec.table.head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {sec.table.rows.map((r) => (
                      <tr key={r[0]} className="border-t border-line">
                        {r.map((c, i) => <td key={i} className={`px-4 py-3 align-top ${i === 0 ? "font-mono text-xs text-fg" : "text-fg/75"}`}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Reveal>
        ))}
        <p className="mt-14 border-t border-line pt-6">
          <a href={related.href} className="font-medium text-brand hover:underline">{related.label} →</a>
        </p>
      </div>
    </section>
  );
}
