"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Makes the SVG drawing inside it "draw itself" like a pen plotter the first
 * time it scrolls into view. Lines are drawn in sequence; filled shapes fade
 * in after. Without JS or with reduced motion the drawing is shown complete.
 */
export function DrawOnView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const shapes = el.querySelectorAll<SVGGeometryElement>("path,line,rect,circle,ellipse,polyline,polygon");
    let n = 0;
    shapes.forEach((s) => {
      const cs = getComputedStyle(s);
      const stroked = cs.stroke !== "none" && !s.getAttribute("stroke-dasharray") && cs.strokeDasharray === "none";
      const filled = cs.fill !== "none" && cs.fill !== "rgba(0, 0, 0, 0)";
      const delay = `${Math.min(n * 0.025, 1.6).toFixed(3)}s`;
      if (stroked && !filled) {
        s.setAttribute("pathLength", "1");
        s.setAttribute("data-draw", "");
        s.style.setProperty("--d", delay);
        n++;
      } else {
        s.setAttribute("data-fill", "");
        s.style.setProperty("--d", delay);
      }
    });
    el.classList.add("draw-ready");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-drawn");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    // Let the "ready" state paint before observing so the transition runs.
    requestAnimationFrame(() => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
