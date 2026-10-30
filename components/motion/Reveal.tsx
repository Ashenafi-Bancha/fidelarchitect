"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fade + rise when scrolled into view. Content is visible without JS. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span" | "p";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Line-by-line masked headline reveal. Pass lines as an array. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
  animateOnMount = false,
  id,
}: {
  id?: string;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: ElementType;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = animateOnMount ? { animate: { y: "0%" } } : { whileInView: { y: "0%" } };
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", lineClassName)}>
          <motion.span
            className="block will-change-transform"
            initial={reduce ? false : { y: "105%" }}
            {...trigger}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Clip-path wipe used for imagery. */
export function MaskReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  onMount = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const hidden = direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";
  const shown = "inset(0% 0% 0% 0%)";
  const trigger = onMount ? { animate: { clipPath: shown } } : { whileInView: { clipPath: shown } };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: hidden }}
      {...trigger}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Gentle vertical parallax for imagery. Disabled for reduced motion. */
export function Parallax({
  children,
  className,
  amount = 60,
  tag,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  /** Static label pinned to the frame (e.g. "Reference image"), unaffected by the drift. */
  tag?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-amount, amount]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="h-[calc(100%+var(--p))] -mt-[calc(var(--p)/2)]"
        style={{ y, ["--p" as string]: `${amount * 2}px` }}
      >
        {children}
      </motion.div>
      {tag && (
        <span className="eyebrow absolute bottom-3 left-3 z-10 bg-obsidian/65 px-2 py-1 !text-[0.56rem] !tracking-[0.18em] text-bone/80">
          {tag}
        </span>
      )}
    </div>
  );
}
