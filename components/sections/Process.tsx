import { engagementProcess } from "@/content/divisions";
import { Reveal } from "@/components/motion/Reveal";

export function Process({ accent = "var(--color-champagne)" }: { accent?: string }) {
  return (
    <ol className="grid gap-px bg-obsidian/10 sm:grid-cols-2 lg:grid-cols-4">
      {engagementProcess.map((s, i) => (
        <Reveal as="li" key={s.step} delay={i * 0.08} className="group relative bg-bone p-8">
          <span
            className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
            style={{ background: accent }}
            aria-hidden="true"
          />
          <p className="font-display text-5xl font-semibold tracking-tight text-obsidian/15">{s.step}</p>
          <h3 className="mt-8 font-display text-xl font-semibold uppercase tracking-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-obsidian/65">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
