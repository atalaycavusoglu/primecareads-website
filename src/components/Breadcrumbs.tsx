import { ChevronRight } from "lucide-react";

/** Visible trail for inner pages; sits on the dark page hero. */
export default function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-white/35" />}
            {it.path ? (
              <a href={it.path} className="transition-colors hover:text-white">{it.name}</a>
            ) : (
              <span aria-current="page" className="text-white/85">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
