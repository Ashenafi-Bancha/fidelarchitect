"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { getDivision } from "@/content/divisions";
import { Schematic } from "@/components/visuals/Schematic";
import { cn } from "@/lib/cn";

/** Editorial project card with a subtle pointer tilt on fine-pointer devices. */
export function ProjectCard({
  project,
  index,
  aspect = "aspect-[4/5]",
  size = "md",
  priority,
}: {
  project: Project;
  index: number;
  aspect?: string;
  size?: "md" | "lg";
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const division = getDivision(project.division);
  const cover = project.images[0];

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.01)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <Link href={`/projects/${project.slug}`} data-cursor="View" className="group block" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="[perspective:1400px]">
        <div ref={ref} className={cn("relative overflow-hidden bg-charcoal transition-transform duration-700 ease-[var(--ease-out-expo)] will-change-transform", aspect)}>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
            {cover ? (
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes={size === "lg" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                className="object-cover"
                priority={priority}
              />
            ) : (
              <Schematic variant={project.visual} accent={division?.color} tone="dark" className="h-full w-full" title={`${project.title} — schematic illustration`} />
            )}
          </div>
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5" style={{ background: division?.color }} aria-hidden="true" />
            <span className="eyebrow !text-[0.68rem] bg-obsidian/70 px-2 py-1 text-bone">{project.categories.join(" · ")}</span>
          </div>
          {!project.verified && (
            <span className="eyebrow !text-[0.68rem] absolute right-4 top-4 border border-dashed border-bone/40 bg-obsidian/60 px-2 py-1 text-bone/80">
              Details pending
            </span>
          )}
          <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center bg-bone text-obsidian opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100" aria-hidden="true">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6 border-t border-current/15 pt-4">
        <div>
          <h3 className={cn("font-display font-semibold uppercase tracking-[-0.02em]", size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl")}>
            {project.title}
          </h3>
          <p className="mt-1 text-sm opacity-60">
            {project.typology} — {project.location}
          </p>
        </div>
        <span className="font-display text-sm tabular-nums opacity-40">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </Link>
  );
}
