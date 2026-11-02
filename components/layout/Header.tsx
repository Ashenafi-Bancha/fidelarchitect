"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ChevronRight, ArrowRight, Phone, MessageCircle, Home, Info, Layers, LayoutGrid, Briefcase, Mail, type LucideIcon } from "lucide-react";
import { Logo, DivisionMark } from "@/components/brand/Logo";
import { divisions } from "@/content/divisions";
import { nav, telUrl, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function DivisionsMenu({ onLight, pathname }: { onLight: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLLIElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const active = isActive(pathname, "/divisions");
  return (
    <li
      ref={wrap}
      className="relative"
      onMouseEnter={() => { if (timer.current) clearTimeout(timer.current); setOpen(true); }}
      onMouseLeave={() => { timer.current = setTimeout(() => setOpen(false), 160); }}
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <div className="flex items-center">
        <Link href="/divisions" className={cn("navlink", active && "is-active")} aria-current={active ? "page" : undefined}>
          Divisions
        </Link>
        <button
          type="button"
          className="-ml-1 grid h-8 w-6 place-items-center opacity-70 hover:opacity-100"
          aria-expanded={open}
          aria-controls={id}
          aria-label="Show divisions"
          onClick={() => setOpen((o) => !o)}
        >
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className={cn(
              "absolute left-1/2 top-full z-50 mt-3 w-[30rem] -translate-x-1/2 border p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]",
              onLight ? "border-obsidian/10 bg-bone text-obsidian" : "border-bone/10 bg-charcoal text-bone",
            )}
          >
            <ul>
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/divisions/${d.slug}`}
                    className={cn(
                      "group flex items-start gap-4 p-4 transition-colors",
                      onLight ? "hover:bg-linen" : "hover:bg-graphite",
                    )}
                  >
                    <DivisionMark division={d.slug} className="mt-0.5 h-7 w-7 shrink-0" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{d.name}</span>
                      <span className="mt-1 block text-xs opacity-60">{d.discipline}</span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

const navIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/about": Info,
  "/divisions": Layers,
  "/projects": LayoutGrid,
  "/services": Briefcase,
  "/contact": Mail,
};

/** Phone menu: compact rows with icons; Divisions opens as a dropdown. */
function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(pathname.startsWith("/divisions"));
  const rowCls = (active: boolean) =>
    cn(
      "flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-[1.0625rem] font-medium transition-colors",
      active ? "bg-bone/[0.08] text-bone" : "text-bone/80 hover:bg-bone/[0.05] active:bg-bone/[0.08]",
    );
  const iconCls = (active: boolean) =>
    cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg border", active ? "border-champagne/50 text-champagne-soft" : "border-bone/10 text-bone/70");

  return (
    <nav aria-label="Mobile" className="container-x flex-1 py-5">
      <ul className="space-y-1">
        {nav.map((item, i) => {
          const Icon = navIcons[item.href] ?? Home;
          const active = isActive(pathname, item.href);
          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04, duration: 0.45, ease }}
            >
              {"children" in item ? (
                <>
                  <button
                    type="button"
                    className={rowCls(active)}
                    aria-expanded={open}
                    aria-controls="mobile-divisions"
                    onClick={() => setOpen((o) => !o)}
                  >
                    <span className={iconCls(active)}>
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown className={cn("h-5 w-5 text-bone/50 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.ul
                        id="mobile-divisions"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="ml-[1.6rem] overflow-hidden border-l border-bone/10 pl-4"
                      >
                        {divisions.map((d) => {
                          const sub = isActive(pathname, `/divisions/${d.slug}`);
                          return (
                            <li key={d.slug}>
                              <Link
                                href={`/divisions/${d.slug}`}
                                aria-current={sub ? "page" : undefined}
                                className={cn(
                                  "flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.95rem]",
                                  sub ? "bg-bone/[0.08] text-bone" : "text-bone/70 active:bg-bone/[0.06]",
                                )}
                              >
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-bone">
                                  <DivisionMark division={d.slug} className="h-6 w-6 text-obsidian" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate">{d.shortName}</span>
                                  <span className="block truncate text-xs text-bone/45">{d.slogan}</span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                        <li>
                          <Link href="/divisions" className="flex items-center gap-2 px-2 py-2.5 text-sm text-champagne-soft">
                            All divisions <ChevronRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={item.href} className={rowCls(active)} aria-current={active ? "page" : undefined}>
                  <span className={iconCls(active)}>
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-bone/30" aria-hidden="true" />
                </Link>
              )}
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const onLight = scrolled && !menu;
  const tel = telUrl();
  const wa = whatsappUrl();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-3 focus:text-obsidian">
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500",
          onLight ? "border-b border-obsidian/10 bg-bone/95 text-obsidian backdrop-blur-sm" : "border-b border-transparent text-bone",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo tone={onLight ? "dark" : "light"} />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-[0.8125rem] font-medium uppercase tracking-[0.12em]">
              {nav.map((item) =>
                "children" in item ? (
                  <DivisionsMenu key={item.href} onLight={onLight} pathname={pathname} />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn("navlink", isActive(pathname, item.href) && "is-active")}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Link href="/contact" className={buttonClass(onLight ? "dark" : "light", "md")}>
                Start a Project
              </Link>
            </div>
            <button
              type="button"
              className={cn(
                "group flex h-11 items-center gap-3 rounded-full border pl-4 pr-3 transition-colors duration-300 lg:hidden",
                onLight ? "border-obsidian/15 bg-obsidian/[0.03] hover:bg-obsidian/[0.07]" : "border-bone/20 bg-bone/[0.06] backdrop-blur-sm hover:bg-bone/[0.12]",
              )}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu((m) => !m)}
            >
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">{menu ? "Close" : "Menu"}</span>
              {/* Three-line icon that folds into an X */}
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                    menu && "translate-y-[6px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300",
                    menu ? "scale-x-0 opacity-0" : "w-3.5 group-hover:w-5",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                    menu && "-translate-y-[6px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-obsidian pt-[var(--header-h)] text-bone lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <MobileNav pathname={pathname} />
            <div className="container-x grid gap-3 border-t border-bone/10 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Link href="/contact" className={buttonClass("light", "md", "h-12")}>
                Start a Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {(tel || wa) && (
                <div className={cn("grid gap-3", tel && wa ? "grid-cols-2" : "grid-cols-1")}>
                  {tel && (
                    <a href={tel} className={buttonClass("outline-light", "md", "h-12")}>
                      Call <Phone className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass("outline-light", "md")}>
                      WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
              <p className="eyebrow pt-2 text-bone/40">From Thought to Empire</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
