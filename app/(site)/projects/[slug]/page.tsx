import { notFound } from "next/navigation";
import Image from "next/image";
import { blurProps } from "@/content/blur";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, RevealLines, MaskReveal, Parallax } from "@/components/motion/Reveal";
import { Schematic } from "@/components/visuals/Schematic";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionLabel, buttonClass } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDivision } from "@/content/divisions";
import { getProject, getProjects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

const kindLabel = { photo: "", render: "3D render", drawing: "Drawing", graphic: "Design" } as const;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title} — ${p.typology}`,
    description: p.summary,
    path: `/projects/${p.slug}`,
    noindex: !p.verified,
  });
}

function TextBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-obsidian/15 py-10 md:grid-cols-12">
      <h2 className="eyebrow text-obsidian/50 md:col-span-4">{label}</h2>
      <div className="leading-relaxed text-obsidian/75 md:col-span-8 lg:text-lg">{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProject((await params).slug);
  if (!p) notFound();
  const division = getDivision(p.division)!;
  const all = await getProjects();
  const related = all.filter((x) => x.slug !== p.slug).sort((a, b) => Number(b.division === p.division) - Number(a.division === p.division)).slice(0, 2);
  const [cover, ...gallery] = p.images;

  const facts = [
    { label: p.alsoBy?.length ? "Divisions" : "Division", value: [division, ...(p.alsoBy ?? []).map((s) => getDivision(s)!)].map((x) => x.shortName).join(" + ") },
    { label: "Category", value: p.categories.join(", ") },
    { label: "Location", value: p.location },
    ...(p.status ? [{ label: "Status", value: p.status }] : []),
    ...(p.client ? [{ label: "Client", value: p.client }] : []),
    ...p.facts.filter((f) => !["City"].includes(f.label)),
  ];

  return (
    <article>
      {p.verified && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.title,
            description: p.summary,
            creator: { "@type": "Organization", name: site.name },
            locationCreated: { "@type": "Place", name: p.location },
            url: `${site.url}/projects/${p.slug}`,
          }}
        />
      )}

      {/* Cover */}
      <header className="grain relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-obsidian text-bone">
        <MaskReveal onMount className="absolute inset-0">
          <Parallax className="h-full" amount={80}>
            {cover ? (
              <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover" {...blurProps(cover.src)} />
            ) : (
              <Schematic variant={p.visual} accent={division.color} tone="dark" className="h-full w-full" title={`${p.title} — schematic illustration, not a project drawing`} label={false} />
            )}
          </Parallax>
        </MaskReveal>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />
        <div className="container-x relative pb-14 pt-[calc(var(--header-h)+3rem)]">
          <Link href="/projects" className="eyebrow mb-10 inline-flex items-center gap-2 text-bone/60 hover:text-bone">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All projects
          </Link>
          <p className="eyebrow flex items-center gap-3 text-bone/70">
            <span className="h-2.5 w-2.5" style={{ background: division.color }} aria-hidden="true" />
            {p.typology} · {p.location}
          </p>
          <RevealLines as="h1" animateOnMount delay={0.2} className="display-xl mt-6" lines={[p.title]} />
          {cover && cover.kind !== "photo" && (
            <p className="eyebrow mt-8 text-bone/45">{kindLabel[cover.kind]} · Fidelity Business Group</p>
          )}
          {!cover && (
            <p className="eyebrow mt-8 text-bone/45">Schematic illustration · approved drawings and photography pending</p>
          )}
        </div>
      </header>

      {/* Facts + overview */}
      <section className="bg-bone py-14 sm:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4" aria-label="Project facts">
            <dl className="border-t border-obsidian/15 text-sm lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 border-b border-obsidian/10 py-4">
                  <dt className="text-obsidian/50">{f.label}</dt>
                  <dd className="text-right font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{p.summary}</p>
            </Reveal>
            {!p.verified && p.pendingNote && (
              <Reveal className="mt-10 border border-dashed border-obsidian/25 p-6">
                <p className="eyebrow text-obsidian/60">Details pending confirmation</p>
                <p className="mt-3 text-sm leading-relaxed text-obsidian/65">{p.pendingNote}</p>
              </Reveal>
            )}
            <div className="mt-14">
              {p.overview && <TextBlock label="Overview">{p.overview}</TextBlock>}
              {p.scope && (
                <TextBlock label="Fidelity's scope of work">
                  <ul className="space-y-2">
                    {p.scope.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0" style={{ background: division.color }} aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </TextBlock>
              )}
              {p.challenge && <TextBlock label="The challenge">{p.challenge}</TextBlock>}
              {p.approach && <TextBlock label="Design approach">{p.approach}</TextBlock>}
              {p.sources && p.sources.length > 0 && (
                <TextBlock label="As published by Fidelity">
                  <ul className="space-y-2 text-base">
                    {p.sources.map((s) => (
                      <li key={s.href + s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-obsidian/30 underline-offset-4 hover:decoration-obsidian">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </TextBlock>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="bg-bone pb-24" aria-label="Project images">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {gallery.map((img, i) => {
              const ratio = img.width / img.height;
              // Wide images may span both columns; tall ones are letterboxed so they never dominate the page.
              const wide = ratio >= 1.3 && i % 3 === 0;
              const shown = Math.min(Math.max(ratio, 0.8), 2.2);
              const label = [kindLabel[img.kind], img.caption].filter(Boolean).join(" — ");
              return (
                <MaskReveal key={img.src} className={wide ? "md:col-span-2" : ""}>
                  <figure>
                    <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: String(shown) }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        {...blurProps(img.src)}
                        fill
                        sizes={wide ? "100vw" : "(min-width:768px) 50vw, 100vw"}
                        className={shown !== ratio ? "object-contain" : "object-cover"}
                      />
                    </div>
                    {label && <figcaption className="mt-3 text-xs text-obsidian/55">{label}</figcaption>}
                  </figure>
                </MaskReveal>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="grain bg-obsidian py-24 text-bone">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel className="text-bone/50">Planning something similar?</SectionLabel>
            <p className="display-lg mt-8">Let&apos;s talk about your project.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link href="/contact" className={buttonClass("light", "lg")}>
              Start a Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={`/divisions/${division.slug}`} className={buttonClass("outline-light", "lg")}>
              {division.cta}
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-bone py-24" aria-labelledby="related">
          <div className="container-x">
            <h2 id="related" className="display-md mb-12">Related projects</h2>
            <div className="grid gap-12 md:grid-cols-2">
              {related.map((r, i) => (
                <ProjectCard key={r.slug} project={r} index={i} aspect="aspect-[16/10]" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
