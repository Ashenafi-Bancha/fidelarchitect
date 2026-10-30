import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Button";

export async function FeaturedWork({ index = "03" }: { index?: string }) {
  const featured = (await getProjects()).filter((p) => p.featured);
  if (featured.length === 0) return null;
  const [lead, ...rest] = featured;

  return (
    <section className="grain relative bg-obsidian py-24 text-bone sm:py-36" aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index={index} className="text-bone/60">Selected Work</SectionLabel>
            <RevealLines id="work-title" as="h2" className="display-lg mt-8" lines={["Ideas,", <span key="2" className="text-bone/40">given form.</span>]} />
          </div>
          <Reveal>
            <Link href="/projects" className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-bone/80 hover:text-bone">
              <span className="link-line">View the portfolio</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <ProjectCard project={lead} index={0} aspect="aspect-[4/3] lg:aspect-[16/10]" size="lg" />
          </Reveal>
          <div className="flex flex-col justify-between gap-12 lg:col-span-4">
            <Reveal delay={0.1}>
              <p className="eyebrow text-champagne-soft">Featured · {lead.typology}</p>
              <p className="mt-5 text-lg leading-relaxed text-bone/75">{lead.summary}</p>
              {!lead.verified && lead.pendingNote && (
                <p className="mt-5 border-l border-dashed border-bone/30 pl-4 text-xs leading-relaxed text-bone/50">{lead.pendingNote}</p>
              )}
            </Reveal>
            {rest.slice(0, 1).map((p, i) => (
              <Reveal key={p.slug} delay={0.15}>
                <ProjectCard project={p} index={i + 1} aspect="aspect-[4/5]" />
              </Reveal>
            ))}
            {rest.length === 0 && (
              <Reveal delay={0.15}>
                <div className="border border-dashed border-bone/15 p-8">
                  <p className="font-display text-xl font-semibold uppercase tracking-tight">More work is being prepared</p>
                  <p className="mt-3 text-sm leading-relaxed text-bone/55">
                    Further architecture, interior and print projects will be published here once photography and client approvals
                    are in place.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
