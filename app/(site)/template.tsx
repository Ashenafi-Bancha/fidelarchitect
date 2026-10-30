"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

let hasNavigated = false;

/**
 * Page transition: on client-side navigation a dark panel lifts off the new
 * page like a drawing sheet being pulled away. Skipped on the first load
 * (the brand intro covers that) and for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = useRef(hasNavigated && !reduce);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animate.current && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] bg-obsidian"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <motion.div
        initial={animate.current ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
