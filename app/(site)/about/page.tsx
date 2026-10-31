import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Philosophy } from "@/components/sections/Philosophy";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Reveal, RevealLines, MaskReveal, Parallax } from "@/components/motion/Reveal";
import { Schematic } from "@/components/visuals/Schematic";
import { SectionLabel, buttonClass } from "@/components/ui/Button";
import { divisions } from "@/content/divisions";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/visuals/Photo";
import { images } from "@/content/imagery";
import { site } from "@/content/site";

export const metadata = pageMetadata({
  title: "About Fidelity Business Group",
  description:
    "Fidelity Business Group is an Ethiopian holding company founded by architect Fidel Gebremedhin, bringing architecture, furniture and interior design, and branding and advertising together.",
  path: "/about",
});

const principles = [
  { title: "Precision", body: "Measured drawings, careful engineering and exact production. Details are where quality is decided." },
  { title: "Craftsmanship", body: "Whether it is a structure, a cabinet or a printed page, we care about how things are made." },
  { title: "Purpose", body: "Every design decision should serve the people who will use the building, the room or the material." },
  { title: "Reliability", body: "Clear scopes, honest communication and work delivered as agreed." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Group"
        title="About Fidelity Business Group"
        lines={["From the first idea", <span key="2" className="text-bone/40">to the final detail.</span>]}
        intro="Fidelity Business Group brings specialised disciplines together to transform ambitious visions into meaningful spaces, products and experiences."
      />

      <section className="bg-bone py-24 sm:py-36" aria-labelledby="intro">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="01">Who we are</SectionLabel>
            <h2 id="intro" className="display-md mt-8">A multidisciplinary group, rooted in Ethiopia.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-obsidian/75 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p>
                Fidelity Business Group is an Ethiopian holding company with offices in Addis Ababa and Wolaita Sodo. It brings together three specialised divisions —
                architecture and consulting engineering, furniture and interior design, and branding and advertising — under one
                corporate identity.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                The idea is simple: many projects need more than one discipline. A building needs an interior; an interior needs
                furniture; a new business needs to be seen. Working as one group means fewer hand-offs, a consistent standard and one
                partner who understands the whole picture.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-12">
            <MaskReveal>
              <Parallax className="aspect-[21/9]" amount={50} tag="Reference image">
                <Photo image={images.archTowers} sizes="100vw" className="h-full w-full" tagPosition="none" />
              </Parallax>
            </MaskReveal>
          </div>
        </div>
      </section>

      <Philosophy index="02" />

      <section className="bg-linen py-24 sm:py-32" aria-labelledby="principles">
        <div className="container-x">
          <SectionLabel index="03">How we approach every project</SectionLabel>
          <RevealLines id="principles" as="h2" className="display-lg mt-8 mb-16" lines={["Four principles,", "every discipline."]} />
          <div className="grid gap-px bg-obsidian/10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="bg-linen p-8">
                <p className="font-serif text-5xl italic text-champagne">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-10 font-display text-2xl font-semibold uppercase tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-obsidian/65">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain bg-obsidian py-24 text-bone sm:py-32" aria-labelledby="leadership">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="text-bone/60">Leadership</SectionLabel>
            <RevealLines id="leadership" className="display-lg mt-8" lines={["Founded by", <span key="2" className="font-serif font-normal normal-case italic text-champagne-soft">an architect.</span>]} />
            <Reveal>
              <p className="mt-8 max-w-md leading-relaxed text-bone/65">
                Every Fidelity division grew from the same place: an architect&apos;s way of thinking — understand the brief, draw it
                properly, then build it well. Its founder&apos;s motto: <em className="font-serif text-bone">Design matters.</em>
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <article className="border border-bone/10 bg-charcoal/60 p-8 sm:p-10">
              <div className="flex items-start gap-6">
                <span className="grid h-20 w-20 shrink-0 place-items-center bg-bone font-display text-2xl font-semibold text-obsidian" aria-hidden="true">
                  FG
                </span>
                <div>
                  <h3 className="font-display text-3xl font-semibold uppercase tracking-tight">{site.founder.name}</h3>
                  <p className="mt-1 text-champagne-soft">Architect · {site.founder.title}</p>
                </div>
              </div>
              <dl className="mt-10 divide-y divide-bone/10 border-y border-bone/10 text-sm">
                {[
                  ["Fidelity Business Group", "Chief Executive Officer"],
                  ["Fidelity Architects & Consulting Engineers", "Founder & CEO"],
                  ["Fidelity Furniture & Interior Design", "Creative Director & Designer"],
                  ["Fidelity Branding & Advertising", "General Manager"],
                  ["Wolaita Sodo University", "Lecturer"],
                  ["Education", "EiABC — Ethiopian Institute of Architecture, Building Construction & City Development"],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-2 sm:gap-6">
                    <dt className="text-bone/50">{k}</dt>
                    <dd className="text-bone/90">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-5 text-xs font-semibold uppercase tracking-[0.14em]">
                <a href={site.founder.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bone/70 hover:text-bone">
                  Facebook <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a href={site.founder.tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bone/70 hover:text-bone">
                  TikTok · Fidel The Architect <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone py-24 sm:py-32" aria-labelledby="divs">
        <div className="container-x">
          <SectionLabel index="04">Our divisions</SectionLabel>
          <h2 id="divs" className="display-md mt-8 mb-12">Three specialists, one standard.</h2>
          <ul className="border-t border-obsidian/15">
            {divisions.map((d) => (
              <li key={d.slug} className="border-b border-obsidian/15">
                <Link href={`/divisions/${d.slug}`} className="group grid items-center gap-4 py-8 sm:grid-cols-12">
                  <span className="font-display text-sm font-semibold sm:col-span-1" style={{ color: d.color }}>{d.index}</span>
                  <span className="font-display text-2xl font-semibold uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:col-span-6 sm:text-3xl">
                    {d.name}
                  </span>
                  <span className="text-sm text-obsidian/55 sm:col-span-4"><em className="font-serif text-base not-italic text-obsidian">{d.slogan}</em><br />{d.discipline}</span>
                  <ArrowUpRight className="hidden h-6 w-6 justify-self-end transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 sm:col-span-1 sm:block" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeaturedWork index="05" />

      <section className="bg-bone py-24" aria-labelledby="partner">
        <div className="container-x flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-obsidian/50">Clients, developers and partners</p>
            <h2 id="partner" className="display-md mt-6 max-w-2xl">Have a project or a partnership to discuss?</h2>
          </div>
          <Link href="/contact" className={buttonClass("dark", "lg")}>
            Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
