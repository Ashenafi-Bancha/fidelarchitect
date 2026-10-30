/**
 * Business divisions and their services.
 *
 * Service lists come from the company brief. They are marked
 * `servicesConfirmed: false` until Fidelity confirms each list — see
 * CONTENT_CHECKLIST.md. Copy describes how the work is approached; it makes
 * no claims about results, awards or credentials.
 */

export type DivisionSlug = "architecture" | "interiors" | "printing";
export type Visual = "elevation" | "plan" | "section" | "interior" | "joinery" | "print" | "signage";

export interface Division {
  slug: DivisionSlug;
  name: string;
  shortName: string;
  discipline: string;
  index: string;
  color: string; // CSS variable
  cta: string;
  tagline: string;
  intro: string;
  audience: string[];
  problems: { title: string; body: string }[];
  services: { title: string; body: string }[];
  projectTypes: string[];
  visuals: Visual[];
  faqs: { q: string; a: string }[];
  servicesConfirmed: boolean;
  seo: { title: string; description: string };
}

export const engagementProcess = [
  {
    step: "01",
    title: "Conversation",
    body: "Tell us about the site, the space or the brief. We listen first and ask the questions that shape a good project: purpose, budget range, timeline and constraints.",
  },
  {
    step: "02",
    title: "Proposal",
    body: "We define the scope of work, the deliverables and how we will work together, so you know exactly what you are commissioning before anything begins.",
  },
  {
    step: "03",
    title: "Design & development",
    body: "Concepts become drawings, models, samples or proofs. You review at clear milestones, and each round of feedback moves the work forward.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "Final documents, finished pieces or printed materials are handed over, and we stay available for questions as your project moves into use.",
  },
];

export const divisions: Division[] = [
  {
    slug: "architecture",
    name: "Fidelity Architects & Consulting Engineers",
    shortName: "Architects & Engineers",
    discipline: "Architecture · Structural Engineering · Consultancy",
    index: "A",
    color: "var(--color-arch)",
    cta: "Explore Architecture",
    tagline: "Buildings conceived with clarity and engineered to stand.",
    intro:
      "From a family home to a multi-storey hotel, our architects and engineers carry a project from first sketch to construction-ready documents — designing spaces that work, structures that are sound, and buildings that give their streets something to be proud of.",
    audience: [
      "Families planning a new home or an extension",
      "Developers of apartment, commercial and mixed-use buildings",
      "Hotel and hospitality investors",
      "Institutions, schools and religious communities",
      "Businesses that need independent engineering advice",
    ],
    problems: [
      {
        title: "Turning an idea into a buildable plan",
        body: "We translate a brief, a plot and a budget into a coherent design with drawings a contractor can price and build from.",
      },
      {
        title: "Making structure and architecture agree",
        body: "Architectural and structural design are developed together, so the building you approve is the building that can be engineered.",
      },
      {
        title: "Seeing the building before it exists",
        body: "3D visualisation lets you, your partners and your financiers understand the design and make decisions with confidence.",
      },
    ],
    services: [
      { title: "Architectural design", body: "Concept, design development and documentation for new buildings." },
      { title: "Residential houses", body: "Homes planned around the way a family actually lives." },
      { title: "Commercial buildings", body: "Shops, offices and commercial frontages designed for use and visibility." },
      { title: "Hotels & hospitality", body: "Guest-focused planning, circulation and facade design for hospitality." },
      { title: "Apartments & mixed-use", body: "Efficient multi-unit layouts that balance density and liveability." },
      { title: "Structural engineering", body: "Structural design and analysis coordinated with the architecture." },
      { title: "Engineering consultation", body: "Independent technical advice on design and construction questions." },
      { title: "Institutional & religious buildings", body: "Dignified spaces for learning, gathering and worship." },
      { title: "3D architectural visualisation", body: "Renders and models that communicate design intent." },
      { title: "Interior & exterior spatial planning", body: "Layouts that connect inside and outside spaces." },
    ],
    projectTypes: ["Private residences", "Hotels", "Apartment blocks", "Mixed-use buildings", "Commercial buildings", "Institutional buildings"],
    visuals: ["elevation", "plan", "section"],
    faqs: [
      {
        q: "What do I need to start a design project?",
        a: "Information about your plot (location, size and any documents you have), what you want to build, and an approximate budget. If you do not have everything yet, we can start with a conversation and identify what is needed.",
      },
      {
        q: "Do you provide both architectural and structural design?",
        a: "Yes — the division brings architects and consulting engineers together, so architectural and structural work can be coordinated within one team. The exact scope is agreed in your proposal.",
      },
      {
        q: "How long does a design take?",
        a: "It depends on the size and complexity of the building and on how quickly decisions are made. We give you a schedule with the proposal after the first consultation.",
      },
      {
        q: "Can you work on projects outside Wolaita Sodo?",
        a: "Get in touch with the project location and we will confirm how we can support it.",
      },
    ],
    servicesConfirmed: false,
    seo: {
      title: "Architecture & Structural Engineering in Wolaita Sodo",
      description:
        "Architectural design, structural engineering and engineering consultation for homes, hotels, apartments, commercial and institutional buildings in Wolaita Sodo, Ethiopia.",
    },
  },
  {
    slug: "interiors",
    name: "Fidelity Furniture & Interior Design",
    shortName: "Furniture & Interiors",
    discipline: "Interior Design · Custom Furniture · Joinery",
    index: "B",
    color: "var(--color-interior)",
    cta: "Explore Interiors",
    tagline: "Interiors and furniture made for the people who use them.",
    intro:
      "We design interiors and make the furniture that completes them — from a single custom piece to a fully planned home, office or hotel. Every layout begins with how a space is used; every piece is shaped by material, proportion and craftsmanship.",
    audience: [
      "Homeowners furnishing or renovating",
      "Offices planning productive workspaces",
      "Hotels, restaurants and hospitality operators",
      "Developers fitting out new buildings",
    ],
    problems: [
      {
        title: "Furniture that fits the space exactly",
        body: "Custom pieces are designed to the room, not the catalogue — making the most of awkward corners, small rooms and specific needs.",
      },
      {
        title: "A layout that works before money is spent",
        body: "Space planning and furniture layouts settle circulation, storage and function before fabrication begins.",
      },
      {
        title: "One team from design to finished room",
        body: "Design, manufacture and finishing are coordinated together, so the result matches the concept.",
      },
    ],
    services: [
      { title: "Custom furniture", body: "Design and manufacture of made-to-measure pieces." },
      { title: "Residential interiors", body: "Living rooms, bedrooms and full-home interior design." },
      { title: "Commercial interiors", body: "Shops, showrooms and client-facing spaces." },
      { title: "Office & workspace", body: "Office furniture and workplace layouts." },
      { title: "Hotel & hospitality interiors", body: "Guest rooms, lobbies and dining spaces." },
      { title: "Space planning", body: "Furniture layouts and circulation studies." },
      { title: "Interior finishing", body: "Decorative finishes and detailing." },
      { title: "Cabinetry & storage", body: "Built-in cabinetry, wardrobes and storage solutions." },
    ],
    projectTypes: ["Homes", "Offices", "Hotel rooms & lobbies", "Restaurants & cafés", "Retail spaces"],
    visuals: ["interior", "joinery", "plan"],
    faqs: [
      {
        q: "Can you make a single piece of furniture?",
        a: "Yes. Tell us what you need, the dimensions of the space and any reference images, and we will discuss design options with you.",
      },
      {
        q: "Can I see materials before production?",
        a: "Material choices are discussed during design so you understand the options before fabrication. Ask us about samples for your project.",
      },
      {
        q: "Do you work on full hotel or office fit-outs?",
        a: "Interior design for hospitality and workspaces is part of the division's scope. Share your project details and we will confirm how we can help.",
      },
    ],
    servicesConfirmed: false,
    seo: {
      title: "Interior Design & Custom Furniture in Wolaita Sodo",
      description:
        "Residential, office and hospitality interior design with custom furniture, cabinetry and space planning by Fidelity Furniture & Interior Design, Wolaita Sodo, Ethiopia.",
    },
  },
  {
    slug: "printing",
    name: "Fidelity Printing & Advertising",
    shortName: "Printing & Advertising",
    discipline: "Print · Branding Materials · Large Format",
    index: "C",
    color: "var(--color-print)",
    cta: "Explore Printing",
    tagline: "Printed communication with presence.",
    intro:
      "Business cards that feel considered, brochures that read clearly, banners that are seen from across the street. We help businesses and institutions present themselves through well-designed, well-produced print and advertising materials.",
    audience: [
      "Businesses building or refreshing their brand",
      "Institutions and NGOs producing reports and materials",
      "Event organisers and campaigns",
      "Shops and offices that need signage",
    ],
    problems: [
      {
        title: "A consistent brand across every material",
        body: "Stationery, brochures and promotional pieces that look like they belong to the same organisation.",
      },
      {
        title: "Materials ready when you need them",
        body: "Clear proofs and agreed timelines so launches, events and campaigns are supported on time.",
      },
      {
        title: "Visibility at scale",
        body: "Large-format prints and signage designed to be read at distance.",
      },
    ],
    services: [
      { title: "Commercial printing", body: "Everyday and specialised print production." },
      { title: "Branding & advertising materials", body: "Materials that carry your identity consistently." },
      { title: "Business cards & stationery", body: "Cards, letterheads, envelopes and forms." },
      { title: "Brochures & company profiles", body: "Layout and print for brochures and profiles." },
      { title: "Posters, banners & promotion", body: "Campaign and event materials." },
      { title: "Large-format printing", body: "Big prints for outdoor and indoor display." },
      { title: "Signage & visual communication", body: "Signs and wayfinding for premises." },
    ],
    projectTypes: ["Brand stationery", "Company profiles", "Event materials", "Outdoor advertising", "Shop signage"],
    visuals: ["print", "signage", "print"],
    faqs: [
      {
        q: "Can you help with design as well as printing?",
        a: "Tell us whether you have print-ready files or need design support, and we will advise on the right approach for your materials.",
      },
      {
        q: "What file formats should I send?",
        a: "High-resolution PDF files are usually best. If you are unsure, send what you have and we will check it before production.",
      },
      {
        q: "How quickly can you print?",
        a: "Turnaround depends on quantity, material and finishing. Share your deadline when you contact us and we will confirm what is possible.",
      },
    ],
    servicesConfirmed: false,
    seo: {
      title: "Printing & Advertising Services in Wolaita Sodo",
      description:
        "Commercial printing, business cards, brochures, banners, large-format printing and signage by Fidelity Printing & Advertising in Wolaita Sodo, Ethiopia.",
    },
  },
];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);
