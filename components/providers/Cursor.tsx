"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Desktop-only cursor companion. The native cursor stays visible; a ring
 * follows it and expands over links, showing a label for elements marked
 * with data-cursor="View" etc. Off for touch and reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [dark, setDark] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 450, damping: 40, mass: 0.6 });

  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
    if (!ok) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHover(Boolean(t?.closest("a,button,summary,label,[role=button]")));
      const bg = t?.closest<HTMLElement>(".bg-obsidian,.bg-charcoal,[data-dark]");
      setDark(Boolean(bg));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 84 : hover ? 44 : 22;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(245,242,236,0.95)" : "rgba(0,0,0,0)",
          borderColor: dark ? "rgba(245,242,236,0.55)" : "rgba(11,11,12,0.45)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        style={{ borderWidth: 1, borderStyle: "solid" }}
      >
        {label && <span className="eyebrow !text-[0.6rem] text-obsidian">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
