"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { DivisionMark, FidelityMark } from "@/components/brand/Logo";
import { RevealLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function useDrift(progress: MotionValue<number>, amount: number) {
  const reduce = useReducedMotion();
  return useTransform(progress, [0, 1], reduce ? [0, 0] : [amount, -amount]);
}

function BusinessCardFront({ className }: { className?: string }) {
  return (
    <div className={cn("flex aspect-[85/55] flex-col items-center justify-center bg-obsidian text-bone shadow-[0_40px_60px_-30px_rgba(0,0,0,0.8)]", className)}>
      <FidelityMark className="h-[28%] w-[28%] text-[#d9d9d6]" />
      <p className="mt-[5%] whitespace-nowrap font-display text-[clamp(0.45rem,0.85vw,0.72rem)] font-semibold uppercase tracking-[0.18em]">Fidelity Business Group</p>
      <p className="mt-1 font-serif text-[clamp(0.45rem,0.9vw,0.75rem)] italic text-champagne-soft">From thought to Empire!</p>
    </div>
  );
}

function BusinessCardBack({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex aspect-[85/55] flex-col justify-between bg-bone p-[7%] text-obsidian shadow-[0_40px_60px_-30px_rgba(0,0,0,0.7)]", className)}>
      <div className="flex items-center gap-2">
        <FidelityMark className="h-4 w-4" />
        <span className="font-display text-[0.5rem] font-semibold uppercase tracking-[0.2em]">Fidelity</span>
      </div>
      <div className="space-y-1">
        <span className="block h-[3px] w-1/2 bg-obsidian/80" />
        <span className="block h-[2px] w-1/3 bg-obsidian/30" />
        <span className="block h-[2px] w-2/5 bg-obsidian/30" />
      </div>
      <div className="flex gap-1.5">
        {(["architecture", "printing", "interiors"] as const).map((d) => (
          <DivisionMark key={d} division={d} className="h-4 w-4 text-obsidian" />
        ))}
      </div>
    </div>
  );
}

function Letterhead({ className }: { className?: string }) {
  return (
    <div className={cn("flex aspect-[210/297] flex-col bg-[#faf8f4] p-[9%] text-obsidian shadow-[0_50px_80px_-40px_rgba(0,0,0,0.75)]", className)}>
      <div className="flex items-start justify-between">
        <FidelityMark className="h-7 w-7" />
        <div className="text-right">
          <p className="font-display text-[0.5rem] font-semibold uppercase tracking-[0.22em]">Fidelity Business Group</p>
          <p className="font-serif text-[0.5rem] italic text-obsidian/60">From thought to Empire!</p>
        </div>
      </div>
      <div className="mt-[18%] space-y-[6px]">
        <span className="block h-[3px] w-1/3 bg-obsidian/70" />
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="block h-[2px] bg-obsidian/15" style={{ width: `${[92, 88, 95, 70, 0, 90, 85, 93, 55][i]}%` }} />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-obsidian/15 pt-2">
        <div className="flex gap-1.5">
          {(["architecture", "printing", "interiors"] as const).map((d) => (
            <DivisionMark key={d} division={d} className="h-3.5 w-3.5 text-obsidian" />
          ))}
        </div>
        <span className="text-[0.4rem] uppercase tracking-[0.2em] text-obsidian/50">Wolaita Sodo · Ethiopia</span>
      </div>
    </div>
  );
}

function Hoarding({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[16/7] overflow-hidden bg-[#f3f1ec] shadow-[0_50px_80px_-40px_rgba(0,0,0,0.8)]", className)}>
      <div className="absolute inset-y-0 left-0 w-[34%] bg-arch" />
      <div className="absolute inset-y-0 left-0 flex w-[34%] items-center justify-center">
        <DivisionMark division="architecture" mono="#f5f2ec" className="h-[52%] w-[52%] text-bone" />
      </div>
      <div className="absolute inset-y-0 left-[34%] right-0 flex flex-col justify-center px-[6%]">
        <p className="text-[clamp(0.4rem,0.8vw,0.65rem)] uppercase tracking-[0.24em] text-obsidian/50">Architectural design & structural engineering</p>
        <p className="mt-2 font-display text-[clamp(0.8rem,2vw,1.6rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-obsidian">
          Fidelity Architects
          <br />& Consulting Engineers
        </p>
        <p className="mt-3 font-serif text-[clamp(0.5rem,1vw,0.85rem)] italic text-obsidian/60">From thought to Empire!</p>
      </div>
      {/* hoarding panel joints */}
      {[25, 50, 75].map((x) => (
        <span key={x} className="absolute inset-y-0 w-px bg-obsidian/10" style={{ left: `${x}%` }} />
      ))}
    </div>
  );
}

function RollUp({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex aspect-[85/200] w-full flex-col justify-between bg-print p-[10%] text-obsidian shadow-[0_50px_80px_-40px_rgba(0,0,0,0.8)]">
        <DivisionMark division="printing" mono="#0b0b0c" className="h-10 w-10 text-obsidian" />
        <p className="font-display text-[clamp(0.75rem,1.6vw,1.35rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
          Print
          <br />
          that
          <br />
          gets
          <br />
          seen.
        </p>
        <p className="text-[0.45rem] uppercase tracking-[0.2em]">Fidelity Printing & Advertising</p>
      </div>
      <div className="h-2 w-[110%] bg-[#2a2a2d]" />
    </div>
  );
}

function Envelope({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[220/110] bg-[#e9e4da] shadow-[0_40px_60px_-30px_rgba(0,0,0,0.7)]", className)}>
      <svg viewBox="0 0 220 110" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 0L110 62L220 0" fill="none" stroke="#0b0b0c" strokeOpacity="0.12" />
      </svg>
      <FidelityMark className="absolute bottom-[12%] left-[6%] h-[22%] w-[22%] text-obsidian" />
    </div>
  );
}

/** Branding showcase: the Fidelity identity applied across print and site signage. */
export function BrandApplications({ index }: { index?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useDrift(scrollYProgress, 40);
  const b = useDrift(scrollYProgress, 90);
  const c = useDrift(scrollYProgress, 140);
  const d = useDrift(scrollYProgress, 60);

  return (
    <section className="grain relative overflow-hidden bg-charcoal py-24 text-bone sm:py-36" aria-labelledby="identity-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index={index} className="text-bone/60">Identity in Use</SectionLabel>
            <RevealLines
              id="identity-title"
              className="display-lg mt-8"
              lines={["A brand is", <span key="2">built <span className="font-serif font-normal normal-case italic text-print">piece</span></span>, "by piece."]}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-bone/65">
              Cards, letterheads, envelopes, banners and site hoardings — the same identity carried consistently across every surface.
              This is the work of our printing and advertising division, shown here on Fidelity&apos;s own brand.
            </p>
            <Link href="/divisions/printing" className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
              <span className="link-line">Explore Printing</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Collage */}
        <div ref={ref} className="relative mt-20 grid grid-cols-12 gap-4 sm:gap-6" aria-label="Brand application mockups" role="img">
          <motion.div style={{ y: a }} className="col-span-12 md:col-span-8">
            <Hoarding />
          </motion.div>
          <motion.div style={{ y: c }} className="col-span-5 md:col-span-3 md:col-start-10 md:row-span-2 md:mt-16">
            <RollUp />
          </motion.div>
          <motion.div style={{ y: b }} className="col-span-7 md:col-span-4 md:-mt-6">
            <Letterhead className="w-full rotate-[-2deg]" />
          </motion.div>
          <div className="col-span-12 grid grid-cols-2 gap-4 sm:gap-6 md:col-span-4 md:mt-10">
            <motion.div style={{ y: d }}>
              <BusinessCardFront className="w-full rotate-[3deg]" />
            </motion.div>
            <motion.div style={{ y: a }}>
              <BusinessCardBack className="mt-8 w-full -rotate-[4deg]" />
            </motion.div>
            <motion.div style={{ y: b }} className="col-span-2">
              <Envelope className="mt-4 w-full rotate-[1.5deg]" />
            </motion.div>
          </div>
        </div>
        <p className="eyebrow mt-16 text-bone/35">Concept mockups of the Fidelity identity · not client work</p>
      </div>
    </section>
  );
}
