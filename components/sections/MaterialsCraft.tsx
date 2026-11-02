import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaterialSwatch, materials } from "@/components/visuals/Material";
import { Photo } from "@/components/visuals/Photo";
import { Reveal, RevealLines, MaskReveal, Parallax } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Button";
import { images } from "@/content/imagery";

/** Interior-design sample board: materials, finishes and craft. */
export function MaterialsCraft({ index, showLink = true }: { index?: string; showLink?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-bone py-16 sm:py-36" aria-labelledby="materials-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionLabel index={index}>Materials & Craft</SectionLabel>
            <RevealLines
              id="materials-title"
              className="display-lg mt-8"
              lines={["Material is", "the first", <span key="3" className="font-serif font-normal normal-case italic tracking-[-0.02em] text-interior">language</span>, "of a space."]}
            />
            <Reveal>
              <p className="mt-8 max-w-md leading-relaxed text-obsidian/70">
                Timber, stone, textile and metal decide how a room feels long before anyone notices the layout. Our interior and
                furniture studio selects and details materials alongside the design — so the finished piece looks and wears the way it
                was drawn.
              </p>
            </Reveal>
            <MaskReveal className="mt-10 hidden lg:block">
              <Parallax className="aspect-[4/3]" amount={30} tag="Reference image">
                <Photo image={images.intChair} sizes="(min-width:1024px) 40vw, 100vw" className="h-full w-full" tagPosition="none" />
              </Parallax>
            </MaskReveal>
            {showLink && (
              <Link href="/divisions/interiors" className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
                <span className="link-line">Explore Interiors</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          {/* sample board */}
          <ul className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden" aria-label="Material palette">
            {materials.map((m, i) => (
              <Reveal as="li" key={m.key} delay={(i % 4) * 0.06} className={`w-[42%] shrink-0 snap-start md:w-auto ${i % 4 === 1 || i % 4 === 3 ? "md:translate-y-10" : ""}`}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden shadow-[0_24px_50px_-30px_rgba(11,11,12,0.6)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
                    <MaterialSwatch material={m.key} id="mc" className="absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
                    <span className="absolute left-2 top-2 font-display text-[0.65rem] font-semibold tabular-nums text-bone mix-blend-difference">
                      M{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-obsidian/55">{m.finish}</p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-obsidian/40">{m.use}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-5 gap-3 sm:mt-24 sm:gap-4">
            <MaskReveal className="col-span-3">
              <Parallax className="h-full min-h-[11rem] sm:min-h-[22rem]" amount={40} tag="Reference image">
                <Photo image={images.intDiningGreen} sizes="(min-width:1024px) 35vw, 100vw" className="h-full w-full" tagPosition="none" />
              </Parallax>
            </MaskReveal>
            <MaskReveal className="col-span-2" delay={0.12}>
              <Photo image={images.intCabinet} sizes="(min-width:1024px) 25vw, 100vw" className="aspect-[3/4] w-full" tagPosition="top-right" />
            </MaskReveal>
          </div>
          <Reveal>
            <dl className="mt-10 grid gap-6 border-t border-obsidian/15 pt-8 sm:grid-cols-3">
              {[
                ["Measure", "Every custom piece starts from site dimensions, not a catalogue size."],
                ["Detail", "Joints, edges and hardware are drawn before anything is cut."],
                ["Finish", "Surfaces are chosen for how they age with daily use."],
              ].map(([t, b]) => (
                <div key={t}>
                  <dt className="font-display text-lg font-semibold uppercase tracking-tight">{t}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-obsidian/65">{b}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
