/**
 * Portfolio projects.
 *
 * Every project below was published by Fidelity on its own Facebook pages
 * (Fidelity Architects & Consulting Engineers, Fidelity Branding & Advertising)
 * or by its founder. Facts are limited to what those posts show; unknown
 * fields stay `null` and are hidden on the site. Images are Fidelity's own,
 * taken from those posts and stored in /public/projects/<slug>/.
 *
 * Add a project by appending an object. Set `verified: false` for anything not
 * yet confirmed — it is then labelled and excluded from search engines.
 */

import type { DivisionSlug, Visual } from "./divisions";

export type ProjectCategory = "Architecture" | "Engineering" | "Interior Design" | "Furniture" | "Branding & Advertising";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  kind: "photo" | "render" | "drawing" | "graphic";
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

const ARCH_FB = { label: "Fidelity Architects & Consulting Engineers — Facebook", href: "https://www.facebook.com/FidelityArchitects" };
const BRAND_FB = { label: "Fidelity Branding & Advertising — Facebook", href: "https://www.facebook.com/profile.php?id=100083378468847" };

const img = (slug: string, n: number, width: number, height: number, alt: string, kind: ProjectImage["kind"], caption?: string): ProjectImage => ({
  src: `/projects/${slug}/${String(n).padStart(2, "0")}.jpg`,
  width,
  height,
  alt,
  kind,
  caption,
});

export const projects: Project[] = [
  {
    slug: "alex-hotel",
    title: "Alex Hotel",
    division: "architecture",
    categories: ["Architecture"],
    location: "Wolaita Sodo, Ethiopia",
    typology: "Hotel · B+G+7",
    status: "Design · renders published December 2024",
    client: null,
    summary:
      "A multi-storey hotel in Wolaita Sodo — basement, ground and seven upper floors — designed by Fidelity Architects & Consulting Engineers.",
    overview:
      "Alex Hotel is a basement, ground and seven-storey (B+G+7) hotel building in Wolaita Sodo. The design presents a stacked, terraced street facade with a glazed ground-floor lobby and entrance stair, balconies on the upper floors, and a strong vertical feature on the corner that marks the building from down the street.",
    scope: ["Architectural design and 3D visualisation — Fidelity Architects & Consulting Engineers"],
    challenge: null,
    approach: null,
    facts: [
      { label: "Building type", value: "Hotel" },
      { label: "Height", value: "Basement + Ground + 7" },
    ],
    images: [
      img("alex-hotel", 1, 1920, 1080, "Alex Hotel front elevation render with the hotel sign over the glazed lobby", "render"),
      img("alex-hotel", 2, 1920, 1080, "Alex Hotel entrance with stairs, terraces and parked motorbikes", "render"),
      img("alex-hotel", 3, 1920, 1080, "Alex Hotel seen from the street corner, showing the full height", "render"),
      img("alex-hotel", 4, 1405, 790, "Alex Hotel corner view at street level", "render"),
      img("alex-hotel", 5, 1920, 1080, "Alex Hotel street view from the right", "render"),
      img("alex-hotel", 6, 1920, 1080, "Alex Hotel street view with neighbouring buildings", "render"),
      img("alex-hotel", 7, 1920, 1080, "Alex Hotel in afternoon sun", "render"),
      img("alex-hotel", 8, 1920, 1080, "Alex Hotel from across the road", "render"),
      img("alex-hotel", 9, 1385, 779, "Alex Hotel with street traffic in front", "render"),
      img("alex-hotel", 10, 1920, 1080, "Alex Hotel full facade", "render"),
    ],
    visual: "elevation",
    featured: true,
    verified: true,
    sources: [{ ...ARCH_FB, label: "Alex Hotel renders — Fidelity Architects & Consulting Engineers, Dec 2024" }],
  },
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
      "Fidelity Branding & Advertising created the visual identity and logo for Dicha Boys Sneakers, a sneaker business in Wolaita Sodo. Fidelity Architects & Consulting Engineers then designed the interior of its shop, opposite Ligaba School: dark timber-lined walls, illuminated display shelving, a coffered ceiling with warm cove lighting, and the illuminated logo as the focal point of the back wall.",
    scope: [
      "Visual branding and logo design — Fidelity Branding & Advertising",
      "Shop interior design — Fidelity Architects & Consulting Engineers",
    ],
    challenge:
      "The logo had to say several things at once: what the business sells, the meaning of its name, where it comes from, that it can grow, and the mindset of the people who run it — a brand “for the hustlers”.",
    approach:
      "The identity was built around five messages: business type, nomenclature, origin, scalability and the owners’ mentality. The shop interior was then designed as the physical home of that brand.",
    facts: [
      { label: "Address", value: "Opposite Ligaba School, Wolaita Sodo" },
      { label: "Brand line", value: "For the hustlers!" },
    ],
    images: [
      img("dicha-boys-sneakers", 2, 1775, 2000, "Dicha Boys shop back wall with the illuminated logo above sneaker shelves", "render"),
      img("dicha-boys-sneakers", 1, 2000, 2000, "Dicha Boys Sneakers logo — a sneaker breaking out of a red ring, with the line “For the hustlers!”", "graphic", "Logo"),
      img("dicha-boys-sneakers", 3, 1775, 2000, "Dicha Boys shop interior with lit timber display shelving and a central bench", "render"),
      img("dicha-boys-sneakers", 4, 1775, 2000, "Dicha Boys shop interior seen from the entrance", "render"),
      img("dicha-boys-sneakers", 5, 1775, 2000, "Dicha Boys shop interior with coffered ceiling and cove lighting", "render"),
      img("dicha-boys-sneakers", 6, 1775, 2000, "Close view of the illuminated Dicha Boys logo wall", "render"),
    ],
    visual: "signage",
    featured: true,
    verified: true,
    sources: [
      { ...BRAND_FB, label: "Branding post — Fidelity Branding & Advertising, Sep 2026" },
      { ...ARCH_FB, label: "Interior post — Fidelity Architects & Consulting Engineers, Sep 2026" },
    ],
  },
  {
    slug: "wolaita-sodo-city-brand",
    title: "Wolaita Sodo City Brand",
    division: "architecture",
    alsoBy: ["branding"],
    categories: ["Architecture", "Branding & Advertising"],
    location: "Wolaita Sodo, Ethiopia",
    typology: "City identity · Logo & landmark statue",
    status: "Statue built",
    client: null,
    summary:
      "A city brand mark for Wolaita Sodo, decorated with the royal Dunguza pattern, and the brand statue that carries it into the street.",
    overview:
      "Fidelity designed a brand logo for the city of Wolaita Sodo, adorned with the royal Wolaita textile pattern known as Dunguza. The mark was then developed into a free-standing city brand statue — listed by Fidelity Architects & Consulting Engineers among its works proposed and executed, and now standing in the city.",
    scope: ["City brand logo design", "Brand statue design — Fidelity Architects & Consulting Engineers"],
    challenge: null,
    approach:
      "The design draws on Wolaita identity: the Dunguza royal pattern runs along the mark, and a star of labelled points radiates from its centre.",
    facts: [{ label: "Pattern", value: "Dunguza (royal Wolaita textile pattern)" }],
    images: [
      img("wolaita-sodo-city-brand", 1, 960, 1280, "The built Wolaita Sodo city brand statue standing beside a road", "photo", "The statue in place"),
      img("wolaita-sodo-city-brand", 2, 683, 737, "Render of the city brand statue in a public plaza", "render"),
      img("wolaita-sodo-city-brand", 3, 2000, 2000, "Wolaita Sodo city brand logo with a red star and Dunguza pattern", "graphic", "Brand mark"),
      img("wolaita-sodo-city-brand", 4, 2000, 2000, "Wolaita Sodo city brand logo, yellow-star version", "graphic", "Brand mark — variant"),
    ],
    visual: "signage",
    featured: true,
    verified: true,
    sources: [{ ...ARCH_FB, label: "City brand logo and statue posts — Fidelity Architects & Consulting Engineers, 2024" }],
  },
  {
    slug: "wolaita-liga-school-gate",
    title: "Wolaita Liga School Entrance",
    division: "architecture",
    categories: ["Architecture"],
    location: "Wolaita Sodo, Ethiopia",
    typology: "Institutional · Entrance gate & gatehouses",
    status: "Design · renders published September 2024",
    client: null,
    summary: "A new entrance for Wolaita Liga School: a sculptural angled gate with lit columns, flanked by entrance and exit gatehouses.",
    overview:
      "The design gives the school a recognisable front door. Two angled, timber-clad columns lean into a cantilevered canopy carrying the school name, with lit edges for the evening. Low, white entrance and exit gatehouses sit either side, and a paved forecourt with a zebra crossing makes the arrival safe for pupils.",
    scope: ["Architectural design and 3D visualisation — Fidelity Architects & Consulting Engineers"],
    challenge: null,
    approach: null,
    facts: [{ label: "Elements", value: "Gate canopy, entrance & exit gatehouses, forecourt" }],
    images: [
      img("wolaita-liga-school-gate", 1, 1280, 720, "Wolaita Liga School gate seen head-on with the gatehouses either side", "render"),
      img("wolaita-liga-school-gate", 2, 1280, 720, "Exit gatehouse and angled gate canopy", "render"),
      img("wolaita-liga-school-gate", 3, 1280, 720, "Wide view of the school entrance with pupils arriving", "render"),
      img("wolaita-liga-school-gate", 4, 1280, 720, "School entrance from the street with a car passing", "render"),
      img("wolaita-liga-school-gate", 5, 1280, 720, "Gate and gatehouses from the exit side", "render"),
      img("wolaita-liga-school-gate", 6, 1280, 720, "Pupil walking toward the school gate", "render"),
    ],
    visual: "elevation",
    featured: false,
    verified: true,
    sources: [{ ...ARCH_FB, label: "School entrance renders — Fidelity Architects & Consulting Engineers, Sep 2024" }],
  },
  {
    slug: "wogeta-fm-anniversary-campaign",
    title: "Wogeta FM 96.6 — 6th Anniversary",
    division: "branding",
    categories: ["Branding & Advertising"],
    location: "Wolaita, Ethiopia",
    typology: "Advertising campaign · Banners & social graphics",
    status: null,
    client: "Wogeta FM 96.6 Community Radio",
    summary:
      "A celebration campaign for the sixth anniversary of Wogeta FM 96.6 community radio, designed as a family of banners and social graphics.",
    overview:
      "Fidelity Branding & Advertising produced a set of anniversary graphics for Wogeta FM 96.6, a community radio station in Wolaita. The campaign uses a bright cyan and coral palette, radio imagery and partner logos, adapted across square social posts, wide banners and a tall roll-up format — with messages in both Amharic and Wolaytta.",
    scope: ["Campaign design and artwork in multiple formats — Fidelity Branding & Advertising"],
    challenge: null,
    approach: null,
    facts: [
      { label: "Formats", value: "Square, wide banner, roll-up" },
      { label: "Languages", value: "Amharic & Wolaytta" },
    ],
    images: [
      img("wogeta-fm-anniversary-campaign", 1, 2000, 2000, "Wogeta FM 96.6 sixth anniversary square post with a microphone and smiling listener", "graphic"),
      img("wogeta-fm-anniversary-campaign", 2, 2000, 1200, "Wide anniversary banner for Wogeta FM 96.6", "graphic", "Wide banner"),
      img("wogeta-fm-anniversary-campaign", 3, 2000, 1500, "Anniversary banner with a listener wearing headphones", "graphic"),
      img("wogeta-fm-anniversary-campaign", 4, 2000, 2000, "Alternate square anniversary post", "graphic"),
      img("wogeta-fm-anniversary-campaign", 5, 750, 2000, "Tall roll-up banner version of the campaign", "graphic", "Roll-up banner"),
    ],
    visual: "print",
    featured: false,
    verified: true,
    sources: [{ ...BRAND_FB, label: "Campaign artwork — Fidelity Branding & Advertising" }],
  },
  {
    slug: "i-love-wolaita-landmark",
    title: "I Love Wolaita — The Land of 50+ Kings",
    division: "architecture",
    categories: ["Architecture"],
    location: "Wolaita, Ethiopia",
    typology: "Public landmark · Plaza & monument",
    status: null,
    client: null,
    summary:
      "A civic landmark celebrating Wolaita's royal heritage: raised “I ♥ Wolaita — The Land of 50+ Kings” lettering beneath an equestrian monument, set in a landscaped plaza.",
    overview:
      "Listed by Fidelity Architects & Consulting Engineers among its works proposed and executed. The design places a large equestrian statue on a stone plinth at the centre of a circular plaza, with sculpted lettering that turns the site into a place to gather and take photographs.",
    scope: ["Landmark and plaza design — Fidelity Architects & Consulting Engineers"],
    challenge: null,
    approach: null,
    facts: [],
    images: [img("i-love-wolaita-landmark", 1, 942, 507, "Render of the I Love Wolaita landmark with an equestrian statue above the lettering", "render")],
    visual: "plan",
    featured: false,
    verified: true,
    sources: [{ ...ARCH_FB, label: "“Works proposed & executed” — Fidelity Architects & Consulting Engineers" }],
  },
  {
    slug: "gifata-square",
    title: "Gifata Square",
    division: "architecture",
    categories: ["Architecture"],
    location: "Wolaita, Ethiopia",
    typology: "Public square · Amphitheatre & event space",
    status: "Ongoing project proposal",
    client: null,
    summary:
      "A proposal for Gifata Square — a stepped public amphitheatre with large screens, designed to host gatherings around Gifata, the Wolaita new-year celebration.",
    overview:
      "Wide stepped seating faces a stage area, framed by large LED screens and the square's name in raised lettering. The design gives the city a permanent venue for festivals, broadcasts and community events.",
    scope: ["Public square design proposal — Fidelity Architects & Consulting Engineers"],
    challenge: null,
    approach: null,
    facts: [],
    images: [img("gifata-square", 1, 942, 496, "Render of Gifata Square with stepped seating full of people and large screens", "render")],
    visual: "section",
    featured: false,
    verified: true,
    sources: [{ ...ARCH_FB, label: "“Works proposed & executed” — Fidelity Architects & Consulting Engineers" }],
  },
  {
    slug: "ligaba-park",
    title: "Ligaba Park",
    division: "architecture",
    categories: ["Architecture"],
    location: "Wolaita Sodo, Ethiopia",
    typology: "Public park · Landscape & pavilions",
    status: null,
    client: null,
    summary: "A small urban park with timber pergolas, garden beds, seating and kiosks, marked by large sculpted lettering at its entrance.",
    overview:
      "Listed by Fidelity Architects & Consulting Engineers among its works proposed and executed. Shaded timber pergolas line the paths, planting beds and benches create places to sit, and compact kiosks serve visitors.",
    scope: ["Park and pavilion design — Fidelity Architects & Consulting Engineers"],
    challenge: null,
    approach: null,
    facts: [],
    images: [
      img("ligaba-park", 1, 543, 415, "Ligaba Park entrance with large sculpted letters on a lawn", "render"),
      img("ligaba-park", 2, 524, 370, "Shaded seating under timber pergolas in Ligaba Park", "render"),
      img("ligaba-park", 3, 562, 530, "Garden path, palms and kiosk in Ligaba Park", "render"),
    ],
    visual: "plan",
    featured: false,
    verified: true,
    sources: [{ ...ARCH_FB, label: "“Works proposed & executed” — Fidelity Architects & Consulting Engineers" }],
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
    sources: [{ label: "Neon works video — Fidel Gebremedhin with Fidelity Branding & Advertising", href: "https://www.facebook.com/Timberfresh" }],
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
