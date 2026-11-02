import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel, buttonClass } from "@/components/ui/Button";
import { divisions } from "@/content/divisions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Architectural design, supervision and construction, interior design, custom furniture, upholstery, metalwork, logo design, printing, signs and neon signage from Fidelity Business Group.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Services across three divisions"
        lines={["Everything a", "project needs."]}
        intro="Browse services by division. Each division page explains who the service is for, the problems it solves and how to get started."
      >
        <nav aria-label="Jump to division" className="flex flex-wrap gap-3">
          {divisions.map((d) => (
            <a key={d.slug} href={`#${d.slug}`} className={buttonClass("outline-light")}>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2" style={{ background: d.color }} aria-hidden="true" />
                {d.shortName}
              </span>
            </a>
          ))}
        </nav>
      </PageHero>

      {divisions.map((d) => (
        <section key={d.slug} id={d.slug} className="scroll-mt-[var(--header-h)] border-b border-obsidian/10 bg-bone py-14 sm:py-28" aria-labelledby={`s-${d.slug}`}>
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <span className="block h-[3px] w-16" style={{ background: d.color }} aria-hidden="true" />
                <p className="eyebrow mt-6 text-obsidian/50">Division {d.index}</p>
                <h2 id={`s-${d.slug}`} className="display-md mt-4 uppercase">{d.shortName}</h2>
                <p className="mt-4 text-obsidian/65">{d.tagline}</p>
                <Link href={`/divisions/${d.slug}`} className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
                  <span className="link-line">{d.cta}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {d.services.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 2) * 0.05} className="border-t border-obsidian/15 py-6">
                  <h3 className="flex items-baseline gap-3 font-display text-lg font-semibold tracking-tight">
                    <span className="text-xs tabular-nums text-obsidian/35">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h3>
                  <p className="mt-2 pl-7 text-sm leading-relaxed text-obsidian/65">{s.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="bg-linen py-16 sm:py-32" aria-labelledby="how">
        <div className="container-x">
          <SectionLabel>How an engagement works</SectionLabel>
          <RevealLines id="how" as="h2" className="display-lg mt-8 mb-14" lines={["Four clear steps."]} />
          <Process />
          <div className="mt-14">
            <Link href="/contact" className={buttonClass("dark", "lg")}>
              Start a Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
