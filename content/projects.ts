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

export type ProjectCategory = "Architecture" | "Engineering" | "Interior Design" | "Furniture" | "Branding & Advertising";

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
  /** Other Fidelity divisions that worked on the project */
  alsoBy?: DivisionSlug[];
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
  /** Where the published facts come from (Fidelity's own posts). */
  sources?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    slug: "dicha-boys-sneakers",
    title: "Dicha Boys Sneakers",
    division: "branding",
    alsoBy: ["architecture"],
    categories: ["Branding & Advertising", "Interior Design"],
    location: "Wolaita Sodo, Ethiopia",
    typology: "Retail · Brand identity & shop interior",
    status: "Designed · September 2026",
    client: "Adonai Birhane (Mada)",
    summary:
      "Visual branding, logo design and shop-interior design for Dicha Boys Sneakers, a sneaker store in Wolaita Sodo — one client served by two Fidelity divisions.",
    overview:
      "Fidelity Branding & Advertising created the visual identity and logo for Dicha Boys Sneakers, a sneaker business in Wolaita Sodo. Fidelity Architects & Consulting Engineers designed the interior of its shop, located opposite Ligaba School.",
    scope: [
      "Visual branding and logo design — Fidelity Branding & Advertising",
      "Shop interior design — Fidelity Architects & Consulting Engineers",
    ],
    challenge:
      "The logo had to say several things at once: what the business sells, the meaning of its name, where it comes from, that it can grow, and the mindset of the people who run it — a brand “for the hustlers”.",
    approach:
      "The identity was built around five messages: business type, nomenclature, origin, scalability and the owners’ mentality. The shop interior was then designed as the physical home of that brand.",
    facts: [
      { label: "Client", value: "Adonai Birhane (Mada)" },
      { label: "Address", value: "Opposite Ligaba School, Wolaita Sodo" },
      { label: "Brand line", value: "For the hustlers!" },
    ],
    images: [],
    visual: "signage",
    featured: true,
    verified: true,
    sources: [
      { label: "Branding post — Fidelity Branding & Advertising", href: "https://www.facebook.com/profile.php?id=100083378468847" },
      { label: "Interior post — Fidelity Architects & Consulting Engineers", href: "https://www.facebook.com/FidelityArchitects" },
    ],
  },
  {
    slug: "neon-light-signage-wolaita-sodo",
    title: "Neon Light Signage",
    division: "branding",
    categories: ["Branding & Advertising"],
    location: "Wolaita Sodo, Ethiopia",
    typology: "Signage · Neon light works",
    status: "Published · October 2026",
    client: null,
    summary: "Neon light signage works produced by Fidelity Branding & Advertising in Wolaita Sodo.",
    overview:
      "Neon light works by Fidelity Branding & Advertising in Wolaita Sodo, shared by the company in October 2026. Neon signage keeps a shopfront visible after dark.",
    scope: ["Design and production of neon light signage — Fidelity Branding & Advertising"],
    challenge: null,
    approach: null,
    facts: [{ label: "Service", value: "Neon light signage" }],
    images: [],
    visual: "signage",
    featured: false,
    verified: true,
    sources: [{ label: "Neon works post — Fidel Gebremedhin with Fidelity Branding & Advertising", href: "https://www.facebook.com/Timberfresh" }],
  },
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
  "Branding & Advertising",
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
