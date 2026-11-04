"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

let hasNavigated = false;

/**
 * Content entrance after navigation: the new page eases up as the transition
 * panel (components/providers/PageTransition.tsx) lifts away. Skipped on the
 * first load (the brand intro covers that) and for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = useRef(hasNavigated && !reduce);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate.current ? { opacity: 0, y: 28 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
