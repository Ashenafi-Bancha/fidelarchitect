"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Eased wheel scrolling. The page still scrolls natively (no scroll-jacking,
 * no fake scroll containers), so keyboard, scrollbar, find-in-page and
 * scroll-linked animations keep working. Disabled for reduced motion and
 * on touch devices, which keep their native momentum.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const l = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -72 } });
    lenis.current = l;
    let id = 0;
    const raf = (time: number) => {
      l.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    // Pause while a modal (mobile menu) locks the page.
    const mo = new MutationObserver(() => {
      if (document.documentElement.style.overflow === "hidden") l.stop();
      else l.start();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => {
      cancelAnimationFrame(id);
      mo.disconnect();
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // New page: start at the top immediately.
  useEffect(() => {
    if (!window.location.hash) lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
