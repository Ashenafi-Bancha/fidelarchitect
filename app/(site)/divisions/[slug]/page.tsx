import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal, RevealLines, MaskReveal } from "@/components/motion/Reveal";
import { Schematic } from "@/components/visuals/Schematic";
import { SectionLabel, buttonClass } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { divisions, getDivision } from "@/content/divisions";
import { getProjects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { divisionImagery, images } from "@/content/imagery";
import { Photo } from "@/components/visuals/Photo";
import { FullBleed } from "@/components/sections/FullBleed";
import { MaterialsCraft } from "@/components/sections/MaterialsCraft";
import { BrandApplications } from "@/components/sections/BrandApplications";

export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDivision((await params).slug);
  if (!d) return {};
  return pageMetadata({ title: d.seo.title, description: d.seo.description, path: `/divisions/${d.slug}` });
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDivision((await params).slug);
  if (!d) notFound();
  const related = (await getProjects()).filter((p) => p.division === d.slug);
  const others = divisions.filter((x) => x.slug !== d.slug);
  const imagery = divisionImagery[d.slug];
  const bandLine = { architecture: "Designed to stand.", interiors: "Made to be lived in.", branding: "Stand out." }[d.slug];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.name,
    serviceType: d.discipline,
    description: d.intro,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: [{ "@type": "City", name: "Addis Ababa" }, { "@type": "City", name: "Wolaita Sodo" }],
    url: `${site.url}/divisions/${d.slug}`,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
      <PageHero
        eyebrow={`Division ${d.index} · ${d.discipline}`}
        title={d.name}
        lines={d.shortName.split(" & ").map((w, i, a) => (i < a.length - 1 ? `${w} &` : w))}
        intro={
          <>
            <span className="mb-5 block font-serif text-3xl italic text-bone sm:text-4xl" style={{ color: d.color === "var(--color-interior)" ? "#7fbf9b" : d.color }}>
              {d.slogan}
            </span>
            {d.intro}
          </>
        }
        accent={d.color}
        division={d.slug}
        image={imagery.hero}
        visual={d.visuals[0]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="#inquiry" className={buttonClass("light", "lg")}>
            Start a Project
          </Link>
          {related.length > 0 && (
            <Link href="#work" className={buttonClass("outline-light", "lg")}>
              See related work
            </Link>
          )}
          {d.social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-bone/70 hover:text-bone"
            >
              {s.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </PageHero>

      {/* 1. What does Fidelity offer? */}
      <section className="bg-bone py-24 sm:py-32" aria-labelledby="offer">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <SectionLabel index="01">What we offer</SectionLabel>
              <h2 id="offer" className="display-md mt-8">
                {d.tagline}
              </h2>
              <div className="mt-8">
                <p className="eyebrow text-obsidian/45">Core services</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {d.confirmed.map((c) => (
                    <li key={c} className="border px-3 py-1.5 text-xs font-medium" style={{ borderColor: d.color }}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              {!d.servicesConfirmed && (
                <p className="mt-6 border-l border-dashed border-obsidian/30 pl-4 text-xs leading-relaxed text-obsidian/50">
                  Core services are as published by the division. The detailed list alongside is to be confirmed.
                </p>
              )}
            </div>
          </div>
          <ul className="grid gap-px bg-obsidian/10 sm:grid-cols-2 lg:col-span-8">
            {d.services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 2) * 0.06} className="group bg-bone p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                  <span className="font-display text-xs tabular-nums text-obsidian/35">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-obsidian/65">{s.body}</p>
                <span className="mt-6 block h-px w-8 transition-all duration-500 group-hover:w-16" style={{ background: d.color }} aria-hidden="true" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 2 & 3. Who is it for? What problems does it solve? */}
      <section className="grain bg-obsidian py-24 text-bone sm:py-32" aria-labelledby="for">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="02" className="text-bone/60">
              Who it&apos;s for
            </SectionLabel>
            <h2 id="for" className="display-md mt-8">
              Built around the people who commission it.
            </h2>
            <ul className="mt-10 border-t border-bone/10">
              {d.audience.map((a) => (
                <li key={a} className="flex items-center gap-4 border-b border-bone/10 py-4 text-bone/80">
                  <span className="h-1.5 w-1.5 shrink-0" style={{ background: d.color }} aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12 text-bone/40">Typical project types</p>
            <p className="mt-4 text-bone/70">{d.projectTypes.join(" · ")}</p>
          </div>
          <div className="space-y-12 lg:col-span-6 lg:col-start-7">
            <MaskReveal>
              <Photo image={imagery.secondary} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[16/10] w-full" />
            </MaskReveal>
            <div>
              <p className="eyebrow text-bone/40">Problems we help solve</p>
              <div className="mt-6 grid gap-10">
                {d.problems.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.06}>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-bone/65">{p.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FullBleed image={imagery.detail} caption={d.shortName}>
        <p className="eyebrow text-bone/70">{d.discipline}</p>
        <RevealLines as="p" className="display-lg mt-6" lines={[bandLine]} />
      </FullBleed>

      {d.slug === "architecture" && (
        <section className="bg-bone py-24 sm:py-32" aria-labelledby="drawing-to-building">
          <div className="container-x">
            <SectionLabel>From drawing to building</SectionLabel>
            <RevealLines id="drawing-to-building" className="display-lg mb-14 mt-8" lines={["Every line", <span key="2" className="text-stone">has a purpose.</span>]} />
            <div className="grid gap-4 md:grid-cols-2">
              <MaskReveal>
                <Schematic variant="elevation" accent={d.color} tone="light" className="aspect-[4/3] w-full" label="Elevation · schematic" />
              </MaskReveal>
              <MaskReveal delay={0.12}>
                <Photo image={images.archHouseTimber} sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/3] w-full" />
              </MaskReveal>
            </div>
            <div className="mt-10 grid gap-8 border-t border-obsidian/15 pt-8 sm:grid-cols-3">
              {[
                ["Plan", "How spaces connect, how people move, where light enters."],
                ["Section", "Heights, levels and the structure that holds them."],
                ["Elevation", "The face the building presents to its street."],
              ].map(([t, b]) => (
                <Reveal key={t}>
                  <p className="font-display text-lg font-semibold uppercase tracking-tight">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-obsidian/65">{b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
      {d.slug === "interiors" && <MaterialsCraft showLink={false} />}
      {d.slug === "branding" && <BrandApplications />}

      {/* 4. How does the engagement work? */}
      <section className="bg-bone py-24 sm:py-32" aria-labelledby="process">
        <div className="container-x">
          <SectionLabel index="03">How we work</SectionLabel>
          <RevealLines id="process" as="h2" className="display-lg mb-14 mt-8" lines={["From first call", "to final detail."]} />
          <Process accent={d.color} />
        </div>
      </section>

      {related.length > 0 && (
        <section id="work" className="scroll-mt-[var(--header-h)] bg-linen py-24 sm:py-32" aria-labelledby="related">
          <div className="container-x">
            <SectionLabel index="04">Related work</SectionLabel>
            <h2 id="related" className="display-md mb-12 mt-8">
              Projects from this division
            </h2>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. How to get started */}
      <section id="inquiry" className="scroll-mt-[var(--header-h)] bg-bone py-24 sm:py-32" aria-labelledby="faq">
        <div className="container-x grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="05">Questions</SectionLabel>
            <h2 id="faq" className="display-md mb-10 mt-8">
              Frequently asked
            </h2>
            <Faq items={d.faqs} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel index="06">Get started</SectionLabel>
            <h2 className="display-md mb-4 mt-8">Start a {d.shortName.toLowerCase()} project</h2>
            <p className="mb-12 text-obsidian/65">Share the essentials and we will get back to you to arrange a first conversation.</p>
            <InquiryForm defaultDivision={d.slug} compact />
          </div>
        </div>
      </section>

      <nav aria-label="Other divisions" className="grid border-t border-obsidian/10 bg-bone md:grid-cols-2">
        {others.map((o) => (
          <Link
            key={o.slug}
            href={`/divisions/${o.slug}`}
            className="group relative overflow-hidden border-obsidian/10 p-10 transition-colors duration-500 hover:bg-obsidian hover:text-bone md:border-r md:p-14 md:last:border-r-0"
          >
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: o.color }} aria-hidden="true" />
            <p className="eyebrow opacity-50">Division {o.index}</p>
            <p className="mt-4 flex items-center justify-between gap-4 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
              {o.shortName}
              <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </p>
          </Link>
        ))}
      </nav>
    </>
  );
}
