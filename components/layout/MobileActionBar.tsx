"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site, telUrl } from "@/content/site";

/**
 * Phone-only floating Call button, bottom-right within thumb reach.
 * Appears after the hero and tucks away near the footer (which has its own
 * contact details). Not shown on the contact page.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const tel = telUrl();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const pastHero = y > window.innerHeight * 0.6;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 280;
      setShow(pastHero && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!tel || pathname.startsWith("/contact")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={tel}
          aria-label={`Call Fidelity Business Group on ${site.contact.phone}`}
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center gap-2.5 rounded-full bg-bone pl-4 pr-5 text-obsidian shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65)] ring-1 ring-obsidian/10 active:scale-95 lg:hidden"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-obsidian text-bone">
            <span className="absolute inset-0 animate-ping rounded-full bg-obsidian/40 [animation-duration:2.4s]" aria-hidden="true" />
            <Phone className="relative h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]">Call</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
