"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { telUrl } from "@/content/site";

/**
 * Phone-only floating action bar: Call + Start a Project, within thumb reach.
 * Appears after the hero, hides while scrolling down fast reading, and is
 * not shown on the contact page (which already has both).
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const tel = telUrl();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const pastHero = y > window.innerHeight * 0.6;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 280;
      // show when scrolling up or idle past the hero; tuck away near the footer CTA
      setShow(pastHero && !nearBottom && (y < last || y - last < 40));
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Quick contact"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-2 rounded-full border border-bone/10 bg-obsidian/90 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md lg:hidden"
        >
          {tel && (
            <a
              href={tel}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors active:bg-bone/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Call
            </a>
          )}
          <Link
            href="/contact"
            className="flex h-12 flex-[1.6] items-center justify-center gap-2 rounded-full bg-bone text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-obsidian transition-transform active:scale-[0.98]"
          >
            Start a Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
