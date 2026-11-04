"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MARK_LEFT, MARK_RIGHT } from "@/components/brand/Logo";

const EASE = [0.76, 0, 0.24, 1] as const;
const COVER_MS = 520; // panel slides up over the current page
const REVEAL_MS = 650; // panel lifts away from the new page

/**
 * Two-phase page transition for internal links:
 *   1. a dark panel carrying the Fidelity mark slides up over the current page,
 *   2. the next route renders underneath,
 *   3. the panel lifts away to reveal it.
 * Navigation is driven by timers (not animation callbacks), so it always
 * completes — even in a background tab where animations are paused.
 * Applies to every same-site link automatically. Skipped for reduced motion,
 * modified clicks, new tabs, downloads, external links and same-page anchors.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const targetPath = useRef<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Intercept internal link clicks
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) return;
      if (url.pathname === window.location.pathname) return; // same page / #anchor: native scroll
      e.preventDefault();
      clearTimers();
      const href = url.pathname + url.search + url.hash;
      targetPath.current = url.pathname;
      router.prefetch(href);
      setPhase("cover");
      later(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        router.push(href);
      }, COVER_MS);
      // safety net: never leave the panel up
      later(() => setPhase("idle"), 6000);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // The new route has rendered: lift the panel
  useEffect(() => {
    if (phase === "cover" && targetPath.current === pathname) {
      setPhase("reveal");
      later(() => {
        targetPath.current = null;
        setPhase("idle");
      }, REVEAL_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, phase]);

  useEffect(() => clearTimers, []);

  // Plain CSS transitions: the panel's end state applies even if animation
  // frames are paused (background tab), and it never blocks clicks when idle.
  const clip =
    phase === "cover" ? "inset(0% 0 0 0)" : phase === "reveal" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)";
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-obsidian text-bone"
      style={{
        clipPath: clip,
        visibility: phase === "idle" ? "hidden" : "visible",
        pointerEvents: phase === "cover" ? "auto" : "none",
        transition:
          phase === "idle"
            ? "none"
            : `clip-path ${(phase === "cover" ? COVER_MS : REVEAL_MS)}ms cubic-bezier(${EASE.join(",")})`,
      }}
    >
      <div
        className="flex flex-col items-center transition-[opacity,transform] duration-300"
        style={{
          opacity: phase === "cover" ? 1 : 0,
          transform: phase === "cover" ? "translateY(0)" : "translateY(10px)",
          transitionDelay: phase === "cover" ? "200ms" : "0ms",
        }}
      >
        <svg viewBox="0 0 48 48" className="h-12 w-12">
          <path d={MARK_LEFT} fill="currentColor" />
          <path d={MARK_RIGHT} fill="currentColor" />
        </svg>
        <span className="mt-5 block h-px w-24 overflow-hidden bg-bone/15">
          <span className="block h-full w-full bg-champagne [animation:pt-load_1.1s_ease-in-out_infinite]" />
        </span>
      </div>
    </div>
  );
}
