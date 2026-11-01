"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDownRight, Rotate3d } from "lucide-react";
import { RevealLines } from "@/components/motion/Reveal";
import { FidelityMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

/** 3D runs on any device with WebGL. Reduced motion only turns off the automatic movement. */
function hasWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static mark shown before the 3D is ready, or when WebGL is unavailable. */
function StaticMark({ hidden, className }: { hidden: boolean; className: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0 blueprint text-bone/60"
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 1.2 }}
      aria-hidden="true"
    >
      <motion.div
        className={className}
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      >
        <FidelityMark className="h-auto w-full" />
      </motion.div>
    </motion.div>
  );
}

function DragHint({ show, className }: { show: boolean; className?: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          className={`pointer-events-none flex items-center gap-2 rounded-full border border-bone/15 bg-obsidian/60 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-bone/70 backdrop-blur-sm ${className ?? ""}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <Rotate3d className="h-3.5 w-3.5" aria-hidden="true" /> Drag to rotate
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [webgl, setWebgl] = useState(false);
  const [compact, setCompact] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    const mq = window.matchMedia("(max-width: 1023px)");
    setCompact(mq.matches);
    const on = () => {
      setCompact(mq.matches);
      setSceneReady(false);
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);

  const scene = (
    <HeroScene key={compact ? "compact" : "wide"} compact={compact} reduce={reduce} onReady={() => setSceneReady(true)} />
  );

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-obsidian text-bone"
      aria-labelledby="hero-title"
      onPointerDown={() => setTouched(true)}
    >
      {/* ---------- Desktop: model to the right, behind the text column ---------- */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0 hidden lg:block">
        <StaticMark hidden={sceneReady && !compact} className="absolute right-[4%] top-[14%] w-[46%] text-bone/[0.08]" />
        {webgl && !compact && (
          <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: sceneReady ? 1 : 0 }} transition={{ duration: 1.4, ease }}>
            {scene}
          </motion.div>
        )}
        {/* readability gradient for the text column only */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-obsidian to-transparent" />
        <DragHint show={webgl && !compact && sceneReady && !touched} className="absolute bottom-24 right-[18%]" />
      </motion.div>

      {/* ---------- Phone & tablet: model in its own stage above the text ---------- */}
      <div className="relative mt-[var(--header-h)] h-[46svh] min-h-[300px] max-h-[520px] lg:hidden">
        <StaticMark hidden={sceneReady && compact} className="absolute left-1/2 top-[10%] w-[62%] max-w-[340px] -translate-x-1/2 text-bone/[0.1]" />
        {webgl && compact && (
          <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: sceneReady ? 1 : 0 }} transition={{ duration: 1.2, ease }}>
            {scene}
          </motion.div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
          <DragHint show={webgl && compact && sceneReady && !touched} />
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="container-x pointer-events-none relative z-10 flex flex-1 flex-col justify-end pb-14 pt-4 sm:pb-20 lg:pt-[calc(var(--header-h)+2.5rem)]"
      >
        <div className="pointer-events-auto w-fit max-w-full">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3 text-champagne-soft lg:mb-8"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
          >
            <span className="h-px w-10 bg-champagne" aria-hidden="true" />
            From Thought to Empire
          </motion.p>

          <RevealLines
            as="h1"
            id="hero-title"
            animateOnMount
            delay={0.25}
            className="display-xl max-w-[14ch]"
            lines={[
              "We turn",
              <>
                vision <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-champagne-soft">into</span>
              </>,
              "landmarks.",
            ]}
          />

          <div className="mt-8 flex max-w-xl flex-col gap-7 lg:mt-10 lg:gap-8">
            <motion.p
              className="lede max-w-md text-bone/70"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.75 }}
            >
              Architecture, engineering, interiors, furniture, and creative solutions shaped by precision, craftsmanship, and
              purpose.
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.9 }}
            >
              <Button href="/contact" variant="light" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Start a Project
              </Button>
              <Button href="/projects" variant="outline-light" size="lg" icon={<ArrowDownRight className="h-4 w-4" />}>
                Explore Our Work
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom rail */}
      <div className="container-x relative z-10 flex items-center justify-between border-t border-bone/10 py-5 text-bone/50">
        <p className="eyebrow">Addis Ababa · Wolaita Sodo</p>
        <Link href="#group" className="eyebrow flex items-center gap-3 hover:text-bone" aria-label="Scroll to introduction">
          <span className="hidden sm:inline">Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-bone/15" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-champagne [animation:scroll-cue_2.4s_var(--ease-arch)_infinite]" />
          </span>
        </Link>
        <p className="eyebrow hidden md:block">Architecture · Interiors · Branding</p>
      </div>
    </section>
  );
}
