"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/Button";
import { Schematic } from "@/components/visuals/Schematic";
import { Photo } from "@/components/visuals/Photo";
import { images } from "@/content/imagery";
import { cn } from "@/lib/cn";

const stages = [
  {
    word: "Thought",
    title: "Every project begins as an idea.",
    body: "A family imagining a home. An investor picturing a hotel. A business ready to be seen. We start by understanding what you want to achieve and why it matters.",
    visual: <Photo image={images.archDrafting} sizes="(min-width:1024px) 40vw, 100vw" className="h-full w-full" />,
  },
  {
    word: "Drawing",
    title: "Ideas become drawings.",
    body: "Sketches, plans, layouts and proofs give the idea a shape everyone can discuss, test and refine — before time and money are committed.",
    visual: <Schematic variant="plan" tone="light" accent="var(--color-arch)" className="h-full w-full" label="Plan · schematic" />,
  },
  {
    word: "Structure",
    title: "Drawings become something real.",
    body: "Engineering, materials, joinery and production turn the design into a building, an interior, a piece of furniture or a printed material that is built to last.",
    visual: <Schematic variant="section" tone="dark" accent="var(--color-arch)" className="h-full w-full" label="Section · schematic" />,
  },
  {
    word: "Empire",
    title: "Real things build lasting value.",
    body: "Well-made places and products grow reputations, businesses and communities. That is what we mean by From Thought to Empire.",
    visual: <Photo image={images.archHouseDusk} sizes="(min-width:1024px) 40vw, 100vw" className="h-full w-full" />,
  },
];

/** Sticky storytelling sequence. Uses normal page scroll — no scroll hijacking. */
export function Philosophy({ index = "04" }: { index?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStage(Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length)))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-bone" aria-labelledby="philosophy-title">
      <h2 id="philosophy-title" className="sr-only">From Thought to Empire</h2>

      {/* Desktop: sticky sequence */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${stages.length * 90}vh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
          <div className="container-x grid-12 items-center">
            <div className="col-span-6">
              <SectionLabel index={index}>Brand Philosophy</SectionLabel>
              <div className="relative mt-10 h-[10vw] max-h-[9.5rem] overflow-hidden" aria-hidden="true">
                {stages.map((s, i) => (
                  <motion.p
                    key={s.word}
                    className="display-xl absolute inset-x-0 top-0 !text-[clamp(3rem,8vw,8.5rem)]"
                    initial={false}
                    animate={{ y: reduce ? 0 : `${(i - stage) * 140}%`, opacity: i === stage ? 1 : 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {s.word}
                    {i === stages.length - 1 && <span className="text-champagne">.</span>}
                  </motion.p>
                ))}
              </div>
              <div className="relative mt-10 min-h-[9rem] max-w-md" aria-live="polite">
                {stages.map((s, i) => (
                  <motion.div
                    key={s.word}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === stage ? 1 : 0, y: i === stage ? 0 : 16 }}
                    transition={{ duration: 0.6 }}
                    aria-hidden={i !== stage}
                  >
                    <p className="font-display text-2xl font-semibold tracking-tight">{s.title}</p>
                    <p className="mt-3 leading-relaxed text-obsidian/65">{s.body}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-5">
                {stages.map((s, i) => (
                  <span key={s.word} className={cn("eyebrow transition-opacity duration-500", i === stage ? "opacity-100" : "opacity-30")}>
                    {String(i + 1).padStart(2, "0")} {s.word}
                  </span>
                ))}
              </div>
              <div className="mt-4 h-px w-full max-w-xl bg-obsidian/10">
                <motion.div className="h-px bg-obsidian" style={{ width: bar }} />
              </div>
            </div>

            {/* Visual stack: each stage wipes up over the last */}
            <div className="relative col-span-5 col-start-8 aspect-[4/5] max-h-[72vh] w-full">
              {stages.map((s, i) => (
                <motion.div
                  key={s.word}
                  className="absolute inset-0 overflow-hidden shadow-[0_40px_80px_-40px_rgba(11,11,12,0.5)]"
                  initial={false}
                  animate={{
                    clipPath: i <= stage ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                    scale: i < stage ? 0.94 : 1,
                    opacity: i < stage - 1 ? 0 : 1,
                  }}
                  transition={{ duration: reduce ? 0 : 1.1, ease: [0.65, 0, 0.35, 1] }}
                  style={{ zIndex: i }}
                  aria-hidden={i !== stage}
                >
                  {s.visual}
                </motion.div>
              ))}
              <span className="absolute -left-10 top-0 font-display text-sm tabular-nums text-obsidian/40" aria-hidden="true">
                0{stage + 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet: stacked */}
      <div className="container-x py-24 lg:hidden">
        <SectionLabel index={index}>Brand Philosophy</SectionLabel>
        <p className="display-lg mt-8">
          From thought <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-stone">to</span> empire.
        </p>
        <ol className="mt-12 space-y-14">
          {stages.map((s, i) => (
            <li key={s.word} className="border-t border-obsidian/15 pt-6">
              <p className="eyebrow text-obsidian/50">{String(i + 1).padStart(2, "0")} — {s.word}</p>
              <p className="mt-3 font-display text-xl font-semibold tracking-tight">{s.title}</p>
              <p className="mt-3 leading-relaxed text-obsidian/65">{s.body}</p>
              <div className="relative mt-5 aspect-[16/10] overflow-hidden">{s.visual}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
