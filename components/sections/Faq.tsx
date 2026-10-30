import { Plus } from "lucide-react";

/** Native <details> accordion — keyboard and screen-reader friendly without JS. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-obsidian/15">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-obsidian/15">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 transition-transform duration-500 group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="max-w-2xl pb-8 leading-relaxed text-obsidian/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
