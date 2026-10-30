"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { SiteImage } from "@/content/imagery";
import { Photo } from "@/components/visuals/Photo";

/**
 * Cinematic full-width photograph: the frame opens from an inset rectangle to
 * the full viewport width as it scrolls in, while the image drifts slowly.
 */
export function FullBleed({ image, children, caption }: { image: SiteImage; children?: ReactNode; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0, 0.45], reduce ? ["0%", "0%"] : ["7%", "0%"]);
  const clip = useTransform(inset, (v) => `inset(${v} ${v} ${v} ${v})`);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [1.18, 1.04]);

  return (
    <section ref={ref} className="relative h-[85svh] min-h-[28rem] overflow-hidden bg-bone" aria-label={caption ?? image.alt}>
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <motion.div className="absolute inset-[-10%_0]" style={{ y, scale }}>
          <Photo image={image} sizes="100vw" className="h-full w-full" tagPosition="none" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/10 to-obsidian/20" />
        {children && <div className="container-x absolute inset-x-0 bottom-0 pb-14 text-bone sm:pb-20">{children}</div>}
        {image.reference && (
          <p className="eyebrow absolute right-4 top-4 bg-obsidian/60 px-2 py-1 !text-[0.56rem] text-bone/80 sm:right-8 sm:top-8">Reference image</p>
        )}
      </motion.div>
    </section>
  );
}
