"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/cn";

// Asymmetric editorial rhythm: column spans + aspect ratios repeat every 5 items.
const layout = [
  { span: "lg:col-span-8", aspect: "aspect-[4/3] lg:aspect-[16/10]", size: "lg" as const },
  { span: "lg:col-span-4 lg:mt-40", aspect: "aspect-[4/5]", size: "md" as const },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", size: "md" as const },
  { span: "lg:col-span-6 lg:col-start-7 lg:mt-24", aspect: "aspect-[5/4]", size: "lg" as const },
  { span: "lg:col-span-7 lg:col-start-3", aspect: "aspect-[16/10]", size: "lg" as const },
];

export function ProjectsBrowser({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter, projects]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-obsidian/15 pb-6">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => {
            const count = c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 border px-4 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                  filter === c ? "border-obsidian bg-obsidian text-bone" : "border-obsidian/20 hover:border-obsidian/60",
                )}
              >
                {c}
                <sup className="text-[0.6rem] opacity-60">{count}</sup>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-obsidian/55" aria-live="polite">
          Showing {list.length} {list.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <motion.ul layout className="mt-14 grid gap-x-8 gap-y-20 lg:grid-cols-12" role="list">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => {
            const l = layout[i % layout.length];
            return (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={l.span}
              >
                <ProjectCard project={p} index={i} aspect={l.aspect} size={l.size} priority={i === 0} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 && (
        <div className="mt-14 border border-dashed border-obsidian/20 p-12 text-center">
          <p className="font-display text-2xl font-semibold uppercase tracking-tight">Nothing here yet</p>
          <p className="mt-3 text-obsidian/60">Projects in this category will appear once they are approved for publication.</p>
        </div>
      )}
    </div>
  );
}
