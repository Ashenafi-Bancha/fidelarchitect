import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { Reveal } from "@/components/motion/Reveal";
import { divisions } from "@/content/divisions";
import { activeCategories, getProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { buttonClass } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected architecture, engineering, interior, furniture and print projects by Fidelity Business Group in Wolaita Sodo, Ethiopia.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categories = activeCategories(projects);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects — ideas, given form"
        lines={["Ideas,", <span key="2" className="text-bone/40">given form.</span>]}
        intro="A curated record of the buildings, interiors and printed work shaped by Fidelity's divisions. Each project is published once its details and permissions are confirmed."
      />

      <section className="bg-bone py-20 sm:py-28" aria-label="Project list">
        <div className="container-x">
          <ProjectsBrowser projects={projects} categories={categories} />
        </div>
      </section>

      <section className="border-t border-obsidian/10 bg-linen py-20 sm:py-24" aria-labelledby="growing">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-obsidian/50">A growing portfolio</p>
            <h2 id="growing" className="display-md mt-6">
              More work from all three divisions is being prepared for publication.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-obsidian/65">
              In the meantime, each division page explains what we do and how we work.
            </p>
          </Reveal>
          <Reveal className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" delay={0.1}>
            {divisions.map((d) => (
              <Link key={d.slug} href={`/divisions/${d.slug}`} className={buttonClass("outline-dark")}>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2" style={{ background: d.color }} aria-hidden="true" />
                  {d.shortName}
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
