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

export const metadata = pageMetadata({
  title: "About Fidelity Business Group",
  description:
    "Fidelity Business Group is a multidisciplinary group headquartered in Wolaita Sodo, Ethiopia, bringing architecture and engineering, interiors and furniture, and printing and advertising together.",
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
            <h2 id="intro" className="display-md mt-8">A multidisciplinary group, rooted in Wolaita Sodo.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-obsidian/75 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p>
                Fidelity Business Group is headquartered in Wolaita Sodo, Ethiopia. It brings together three specialised divisions —
                architecture and consulting engineering, furniture and interior design, and printing and advertising — under one
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
                  <span className="text-sm text-obsidian/55 sm:col-span-4">{d.discipline}</span>
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
