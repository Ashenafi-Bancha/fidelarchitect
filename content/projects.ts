/**
 * Portfolio projects.
 *
 * Add a project by appending an object to `projects`. Every field that is not
 * verified with Fidelity stays `null` — the project page hides empty fields
 * instead of inventing them. Set `verified: true` only once the scope of work,
 * status and permission to publish are confirmed; unverified projects show a
 * clear notice and are excluded from search engines.
 *
 * Images: put approved files in /public/projects/<slug>/ and list them under
 * `images`. Until then the page shows a labelled schematic illustration.
 */

import type { DivisionSlug, Visual } from "./divisions";

export type ProjectCategory = "Architecture" | "Engineering" | "Interior Design" | "Furniture" | "Printing & Advertising";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  kind: "photo" | "render" | "drawing";
}

export interface Project {
  slug: string;
  title: string;
  division: DivisionSlug;
  categories: ProjectCategory[];
  location: string;
  typology: string;
  /** e.g. "Completed 2024", "Design stage" — null until verified */
  status: string | null;
  client: string | null;
  summary: string;
  overview: string | null;
  scope: string[] | null;
  challenge: string | null;
  approach: string | null;
  facts: { label: string; value: string }[];
  images: ProjectImage[];
  visual: Visual;
  featured: boolean;
  verified: boolean;
  /** Notes shown on unverified projects so the gaps are visible. */
  pendingNote?: string;
}

export const projects: Project[] = [
  {
    slug: "alex-hotel",
    title: "Alex Hotel",
    division: "architecture",
    categories: ["Architecture"],
    location: "Wolaita Sodo, Ethiopia",
    typology: "Hotel · B+G+7",
    status: null,
    client: null,
    summary:
      "A basement, ground and seven-storey hotel building in Wolaita Sodo, referenced by Fidelity Architects & Consulting Engineers as a design project.",
    overview: null,
    scope: null,
    challenge: null,
    approach: null,
    facts: [
      { label: "Building type", value: "Hotel" },
      { label: "Height configuration", value: "Basement + Ground + 7 floors" },
      { label: "City", value: "Wolaita Sodo" },
    ],
    images: [],
    visual: "elevation",
    featured: true,
    verified: false,
    pendingNote:
      "Awaiting confirmation of Fidelity's exact scope of work, the project status and permission from the owner to publish drawings or photographs.",
  },
];

export const allCategories: ProjectCategory[] = [
  "Architecture",
  "Engineering",
  "Interior Design",
  "Furniture",
  "Printing & Advertising",
];

export async function getProjects() {
  return projects;
}

export async function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

/** Only categories that have at least one project. */
export function activeCategories(list: Project[]) {
  return allCategories.filter((c) => list.some((p) => p.categories.includes(c)));
}
