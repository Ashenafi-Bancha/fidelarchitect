import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealLines, MaskReveal, Parallax } from "@/components/motion/Reveal";
import { Schematic } from "@/components/visuals/Schematic";
import { SectionLabel } from "@/components/ui/Button";
import { FidelityMark } from "@/components/brand/Logo";
import { divisions } from "@/content/divisions";
import { Photo } from "@/components/visuals/Photo";
import { images } from "@/content/imagery";

export function GroupIntro() {
  return (
    <section id="group" className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-bone py-24 sm:py-36" aria-labelledby="group-title">
      {/* geometric motif from the mark */}
      <FidelityMark className="pointer-events-none absolute -left-32 top-10 hidden h-[30rem] w-[30rem] text-obsidian/[0.03] lg:block" />

      <div className="container-x grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel index="01">The Group</SectionLabel>
          <RevealLines id="group-title"
            className="display-lg mt-8"
            lines={["One vision.", "Multiple disciplines.", <span key="b" className="text-stone">Built around excellence.</span>]}
          />
        </div>

        <div className="col-span-12 grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:mt-24 lg:grid-cols-1">
          <Reveal>
            <p className="lede text-obsidian/80">
              From the first idea to the final detail, Fidelity Business Group brings specialised disciplines together to transform
              ambitious visions into meaningful spaces, products and experiences.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[0.95rem] leading-relaxed text-obsidian/65">
              A client planning a hotel can work with our architects and engineers on the building, with our interior and furniture
              studio on the rooms and lobby, and with our branding and advertising team on the signage and materials that open its
              doors. Three specialised divisions, one standard of care.
            </p>
            <Link href="/about" className="group mt-8 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em]">
              <span className="link-line">About Fidelity</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Image composition */}
        <div className="relative col-span-12 mt-6 lg:col-span-8">
          <MaskReveal>
            <Parallax className="aspect-[16/10]" amount={40} tag="Reference image">
              <Photo image={images.archDrafting} sizes="(min-width:1024px) 66vw, 100vw" className="h-full w-full" tagPosition="none" />
            </Parallax>
          </MaskReveal>
        </div>
        <div className="col-span-12 flex flex-col justify-end gap-8 lg:col-span-4">
          <MaskReveal delay={0.15} className="hidden lg:block">
            <Schematic variant="plan" tone="light" accent="var(--color-arch)" className="aspect-square w-full" label={false} />
          </MaskReveal>
          <Reveal>
            <dl className="divide-y divide-obsidian/10 border-y border-obsidian/10 text-sm">
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-obsidian/50">Offices</dt>
                <dd className="text-right font-medium">Addis Ababa · Wolaita Sodo</dd>
              </div>
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-obsidian/50">Call</dt>
                <dd className="text-right font-medium"><a href="tel:+251911971800" className="link-line">0911 97 18 00</a></dd>
              </div>
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-obsidian/50">Divisions</dt>
                <dd className="flex items-center gap-1.5" aria-label={divisions.map((d) => d.shortName).join(", ")}>
                  {divisions.map((d) => (
                    <span key={d.slug} className="h-3 w-3" style={{ background: d.color }} title={d.shortName} />
                  ))}
                  <span className="ml-2 font-medium">Three</span>
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-obsidian/50">Brand promise</dt>
                <dd className="text-right font-serif text-lg italic">From Thought to Empire</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
