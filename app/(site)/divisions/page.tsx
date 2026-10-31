import Link from "next/link";
import { DivisionMark } from "@/components/brand/Logo";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal, MaskReveal } from "@/components/motion/Reveal";
import { Schematic } from "@/components/visuals/Schematic";
import { divisions } from "@/content/divisions";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/visuals/Photo";
import { divisionImagery } from "@/content/imagery";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Our Divisions",
  description:
    "Fidelity Business Group's three divisions: Architects & Consulting Engineers, Furniture & Interior Design, and Branding & Advertising — Addis Ababa and Wolaita Sodo, Ethiopia.",
  path: "/divisions",
});

export default function DivisionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Divisions"
        title="Three disciplines, one group"
        lines={["Three disciplines.", <span key="2" className="text-bone/40">One group.</span>]}
        intro="Each division is a specialist in its own right. Together they let a client take a project from building, to interior, to the materials that announce it — with one group accountable for the standard."
      />

      <div className="bg-bone">
        {divisions.map((d, i) => (
          <section key={d.slug} className="border-b border-obsidian/10 py-20 sm:py-28" aria-labelledby={`d-${d.slug}`}>
            <div className="container-x grid items-center gap-12 lg:grid-cols-12">
              <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2 lg:col-start-7")}>
                <div className="relative">
                  <MaskReveal direction={i % 2 ? "left" : "up"}>
                    <Photo image={divisionImagery[d.slug].hero} sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[5/4] w-full" />
                  </MaskReveal>
                  <MaskReveal delay={0.4} className={cn("absolute -bottom-8 hidden w-40 border border-obsidian/10 shadow-2xl sm:block lg:w-52", i % 2 ? "-left-6" : "-right-6")}>
                    <Schematic variant={d.visuals[0]} accent={d.color} tone="light" className="aspect-square w-full" label={false} />
                  </MaskReveal>
                </div>
              </div>
              <div className={cn("lg:col-span-5", i % 2 === 1 ? "lg:order-1" : "lg:col-start-8")}>
                <Reveal>
                  <div className="flex items-center gap-4">
                    <DivisionMark division={d.slug} className="h-12 w-12 text-obsidian" />
                    <p className="eyebrow text-obsidian/50">{d.discipline}</p>
                  </div>
                  <h2 id={`d-${d.slug}`} className="display-md mt-8 uppercase">{d.name}</h2>
                  <p className="mt-6 leading-relaxed text-obsidian/70">{d.intro}</p>
                  <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                    {d.services.slice(0, 6).map((s) => (
                      <li key={s.title} className="flex items-center gap-2 border-b border-obsidian/10 py-2">
                        <span className="h-1.5 w-1.5 shrink-0" style={{ background: d.color }} aria-hidden="true" />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/divisions/${d.slug}`} className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
                    <span className="link-line">{d.cta}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
