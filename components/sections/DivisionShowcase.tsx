"use client";

import Link from "next/link";
import { DivisionMark } from "@/components/brand/Logo";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { divisions } from "@/content/divisions";
import { Schematic } from "@/components/visuals/Schematic";
import { Photo } from "@/components/visuals/Photo";
import { divisionImagery } from "@/content/imagery";
import { RevealLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

export function DivisionShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = divisions[active];

  return (
    <section className="relative bg-linen py-24 sm:py-36" aria-labelledby="divisions-title">
      <div className="container-x">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <SectionLabel index="02">Our Divisions</SectionLabel>
            <RevealLines id="divisions-title" as="h2" className="display-lg mt-8" lines={["Our expertise,", "under one roof."]} />
          </div>
          <Reveal className="col-span-12 self-end lg:col-span-4">
            <p className="text-[0.95rem] leading-relaxed text-obsidian/65">
              Each division keeps its own colour, craft and character — and shares the same group standard of precision and care.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Index list */}
          <ul className="lg:col-span-6" role="list">
            {divisions.map((d, i) => (
              <li key={d.slug} className="border-t border-obsidian/15 last:border-b">
                <Link
                  href={`/divisions/${d.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-cursor="Explore"
                  className="group relative block py-8 outline-offset-[-2px] sm:py-10"
                  aria-describedby={`div-${d.slug}-desc`}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-[2px] origin-left transition-transform duration-700 ease-[var(--ease-out-expo)]",
                      active === i ? "scale-x-100" : "scale-x-0",
                    )}
                    style={{ background: d.color, width: "100%" }}
                    aria-hidden="true"
                  />
                  <div className="flex items-start gap-5 sm:gap-8">
                    <DivisionMark division={d.slug} className="mt-1 h-11 w-11 shrink-0 text-obsidian" />
                    <div className="min-w-0 flex-1">
                      <p className="eyebrow text-obsidian/50">{d.discipline}</p>
                      <h3
                        className={cn(
                          "mt-3 font-display text-[1.75rem] font-semibold uppercase leading-[0.98] tracking-[-0.03em] transition-colors duration-500 sm:text-[2.6rem]",
                          active === i ? "text-obsidian" : "text-obsidian/45 lg:text-obsidian/35",
                        )}
                      >
                        {d.shortName}
                      </h3>
                      <p id={`div-${d.slug}-desc`} className="mt-4 max-w-md text-sm leading-relaxed text-obsidian/65">
                        {d.tagline}
                      </p>
                      {/* mobile visual */}
                      <div className="mt-6 lg:hidden">
                        <Photo image={divisionImagery[d.slug].hero} sizes="100vw" className="aspect-[4/3] w-full" />
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                        {d.cta}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Sticky visual panel (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal [perspective:1200px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                    animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0.4 }}
                    transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={reduce ? false : { scale: 1.15 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Photo image={divisionImagery[current.slug].hero} sizes="(min-width:1024px) 45vw, 100vw" className="h-full w-full" tagPosition="none" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/50" />
                    <div className="absolute bottom-5 right-5 w-40 border border-bone/20 shadow-2xl xl:w-48">
                      <Schematic variant={current.visuals[0]} accent={current.color} tone="dark" className="aspect-square w-full" label={false} />
                    </div>
                    <p className="eyebrow absolute bottom-5 left-5 bg-obsidian/65 px-2 py-1 !text-[0.56rem] text-bone/80">Reference image</p>
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-6 text-bone">
                  <motion.p key={current.slug + "n"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
                    {current.name}
                  </motion.p>
                  <DivisionMark division={current.slug} className="h-16 w-16 text-bone" />
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.12em] text-obsidian/60" aria-label={`${current.shortName} services`}>
                {current.services.slice(0, 5).map((s) => (
                  <li key={s.title} className="flex items-center gap-2">
                    <span className="h-1 w-1" style={{ background: current.color }} aria-hidden="true" />
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
