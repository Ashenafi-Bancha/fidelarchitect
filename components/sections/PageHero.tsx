import type { ReactNode } from "react";
import { RevealLines, Reveal, MaskReveal } from "@/components/motion/Reveal";
import { FidelityMark, DivisionMark } from "@/components/brand/Logo";
import type { DivisionSlug } from "@/content/divisions";
import type { SiteImage } from "@/content/imagery";
import { Photo } from "@/components/visuals/Photo";
import { Schematic } from "@/components/visuals/Schematic";
import type { Visual } from "@/content/divisions";

export function PageHero({
  eyebrow,
  lines,
  title,
  intro,
  accent,
  visual,
  division,
  image,
  children,
}: {
  image?: SiteImage;
  division?: DivisionSlug;
  eyebrow: string;
  lines: ReactNode[];
  /** Plain-text title for screen readers when lines contain markup */
  title: string;
  intro?: ReactNode;
  accent?: string;
  visual?: Visual;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-obsidian text-bone" aria-labelledby="page-title">
      <div className="pointer-events-none absolute inset-0 blueprint text-bone/50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      {!visual && (
        <FidelityMark
          className="pointer-events-none absolute -bottom-24 -right-16 h-[28rem] w-[28rem] text-bone/[0.04] sm:h-[38rem] sm:w-[38rem]"
        />
      )}
      <div className="container-x relative grid gap-12 pb-16 pt-[calc(var(--header-h)+4rem)] sm:pb-24 sm:pt-[calc(var(--header-h)+6rem)] lg:grid-cols-12">
        <div className={visual || image ? "lg:col-span-7" : "lg:col-span-10"}>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-bone/60">
              {division ? (
                <DivisionMark division={division} className="h-10 w-10 text-bone" />
              ) : (
                <span className="h-2.5 w-2.5" style={{ background: accent ?? "var(--color-champagne)" }} aria-hidden="true" />
              )}
              {eyebrow}
            </p>
          </Reveal>
          <RevealLines id="page-title" as="h1" animateOnMount delay={0.1} className="display-lg mt-8" lines={lines} />
          {intro && (
            <Reveal delay={0.3}>
              <div className="lede mt-10 max-w-2xl text-bone/70">{intro}</div>
            </Reveal>
          )}
          {children && <Reveal delay={0.4} className="mt-10">{children}</Reveal>}
        </div>
        {(visual || image) && (
          <div className="relative lg:col-span-5">
            <MaskReveal onMount delay={0.3}>
              {image ? (
                <Photo image={image} priority sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5] w-full" tagPosition="top-right" />
              ) : (
                <Schematic variant={visual!} accent={accent} tone="dark" className="aspect-[4/5] w-full border border-bone/10" />
              )}
            </MaskReveal>
            {image && visual && (
              <MaskReveal onMount delay={0.8} direction="left" className="absolute -bottom-8 -left-8 hidden w-44 border border-bone/15 shadow-2xl sm:block xl:-left-16 xl:w-56">
                <Schematic variant={visual} accent={accent} tone="dark" className="aspect-square w-full" label={false} />
              </MaskReveal>
            )}
          </div>
        )}
      </div>
      {accent && <div className="h-[3px] w-full" style={{ background: accent }} aria-hidden="true" />}
    </section>
  );
}
