"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MARK_LEFT, MARK_RIGHT } from "@/components/brand/Logo";

const KEY = "fbg-intro-seen";

/**
 * A short (~1.6s) brand reveal shown once per browser session: the two halves
 * of the Fidelity mark slide together, the slogan appears, then the curtain
 * lifts. Content is already rendered underneath; clicking or pressing any key
 * skips it, and it never runs for reduced-motion users.
 */
export function BrandIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1700);
    const skip = () => setShow(false);
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center bg-obsidian text-bone"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setShow(false)}
          aria-hidden="true"
        >
          <svg viewBox="0 0 48 48" className="h-20 w-20 overflow-visible sm:h-24 sm:w-24">
            <motion.path d={MARK_LEFT} fill="currentColor" initial={{ x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
            <motion.path d={MARK_RIGHT} fill="currentColor" initial={{ x: 14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
          </svg>
          <div className="mt-8 overflow-hidden">
            <motion.p
              className="font-display text-sm font-semibold uppercase tracking-[0.42em]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Fidelity Business Group
            </motion.p>
          </div>
          <div className="mt-3 overflow-hidden">
            <motion.p
              className="font-serif text-lg italic text-champagne-soft"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              From Thought to Empire
            </motion.p>
          </div>
          <motion.span
            className="absolute bottom-10 h-px w-40 origin-left bg-bone/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
