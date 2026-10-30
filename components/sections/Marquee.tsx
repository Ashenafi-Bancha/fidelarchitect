import { divisions } from "@/content/divisions";

const words = divisions.flatMap((d) => d.services.slice(0, 4).map((s) => ({ t: s.title, c: d.color })));

/** Slow CSS-only band of disciplines. Paused for reduced motion via global rule. */
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-obsidian/10 bg-bone py-6" aria-hidden="true">
      <div className="flex w-max gap-12 [animation:marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-medium uppercase tracking-[-0.02em] text-obsidian/70 sm:text-3xl">
            {w.t}
            <span className="h-2 w-2 rotate-45" style={{ background: w.c }} />
          </span>
        ))}
      </div>
    </div>
  );
}
