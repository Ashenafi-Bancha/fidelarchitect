/**
 * Business divisions and their services.
 *
 * Service lists come from the company brief. They are marked
 * `servicesConfirmed: false` until Fidelity confirms each list — see
 * CONTENT_CHECKLIST.md. Copy describes how the work is approached; it makes
 * no claims about results, awards or credentials.
 */

export type DivisionSlug = "architecture" | "interiors" | "branding";
export type Visual = "elevation" | "plan" | "section" | "interior" | "joinery" | "print" | "signage";

export interface Division {
  slug: DivisionSlug;
  name: string;
  shortName: string;
  discipline: string;
  index: string;
  color: string; // CSS variable
  cta: string;
  /** Official division slogan */
  slogan: string;
  tagline: string;
  intro: string;
  audience: string[];
  problems: { title: string; body: string }[];
  services: { title: string; body: string }[];
  projectTypes: string[];
  visuals: Visual[];
  faqs: { q: string; a: string }[];
  /** Services stated on the division's own public pages */
  confirmed: string[];
  social: { label: string; href: string }[];
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
    slogan: "Building a legacy!",
    tagline: "From design up to construction.",
    intro:
      "Architectural design, supervision and construction from one team. From a family home to a multi-storey hotel, our architects and engineers carry a project from the first sketch through to the finished building — with offices in Addis Ababa and Wolaita Sodo.",
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
      { title: "Construction supervision", body: "Site supervision so the building is built the way it was designed." },
      { title: "Construction", body: "Delivery from design up to construction, through one accountable team." },
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
    projectTypes: ["Private residences", "Hotels", "Apartment blocks", "Mixed-use buildings", "Commercial buildings", "Shop interiors"],
    visuals: ["elevation", "plan", "section"],
    confirmed: ["Architectural design", "Supervision", "Construction", "Interior design"],
    social: [
      { label: "Facebook", href: "https://www.facebook.com/FidelityArchitects" },
      { label: "TikTok", href: "https://www.tiktok.com/@fidelity_architects" },
    ],
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
      title: "Architecture, Supervision & Construction — Addis Ababa & Wolaita Sodo",
      description:
        "Architectural design, supervision and construction for homes, hotels, apartments and commercial buildings — Fidelity Architects & Consulting Engineers, Addis Ababa and Wolaita Sodo, Ethiopia.",
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
    slogan: "For elegant spaces!",
    tagline: "Furniture and interiors designed by architects — delivered on the agreed day.",
    intro:
      "We design the furniture and interiors you want — drawn by architects — and make them real. From a single custom piece to a fully planned home, office or shop, every layout starts with how a space is used. Delivering on the agreed date is what sets us apart.",
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
      { title: "Repair & upholstery", body: "Furniture repair and re-upholstery to give good pieces a second life." },
      { title: "Metalwork", body: "Clean, precise metal fabrication for furniture frames and fittings." },
    ],
    projectTypes: ["Homes", "Offices", "Hotel rooms & lobbies", "Restaurants & cafés", "Retail spaces"],
    visuals: ["interior", "joinery", "plan"],
    confirmed: ["Interior design", "Furniture", "Repair & upholstery", "Metalwork"],
    social: [{ label: "Facebook", href: "https://www.facebook.com/profile.php?id=100084991431065" }],
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
        "Architect-designed furniture and interiors, custom cabinetry, upholstery and metalwork, delivered on time — Fidelity Furniture & Interior Design, Ethiopia.",
    },
  },
  {
    slug: "branding",
    name: "Fidelity Branding & Advertising",
    shortName: "Branding & Advertising",
    discipline: "Branding · Graphic Design · Printing · Signage",
    index: "C",
    color: "var(--color-print)",
    cta: "Explore Branding",
    slogan: "Stand out!",
    tagline: "Helping businesses stand out from the crowd.",
    intro:
      "We help you stand out from the crowd and grow your business through branding, graphic design and printing. From a new logo to the neon sign above your door, we shape how your business is seen — and produce it.",
    audience: [
      "New businesses that need a name, logo and identity",
      "Shops and offices that need signage",
      "Businesses refreshing their brand",
      "Institutions, events and campaigns",
    ],
    problems: [
      {
        title: "A brand that says what you are",
        body: "Logos are designed around your business type, name, origin, room to grow and the mindset of the people behind it — not just how they look.",
      },
      {
        title: "Being noticed on the street",
        body: "Signs, banners and neon light signage that make a shopfront visible by day and by night.",
      },
      {
        title: "One identity, everywhere",
        body: "Cards, print, signage and social media that all look like the same business.",
      },
    ],
    services: [
      { title: "Brand identity & logo design", body: "Names, logos and visual identities built on strategy." },
      { title: "Graphic design", body: "Layouts for print, social media and advertising." },
      { title: "Printing", body: "Business cards, stationery, brochures and promotional print." },
      { title: "Signs & banners", body: "Shop signs, banners and large-format display." },
      { title: "Neon light signage", body: "Custom neon light work for shopfronts and interiors." },
      { title: "Advertising", body: "Campaign materials that help a business grow." },
    ],
    projectTypes: ["Logo & brand identity", "Shop signage", "Neon signs", "Brand stationery", "Banners", "Promotional print"],
    visuals: ["print", "signage", "print"],
    confirmed: ["Branding", "Graphic design", "Printing", "Signs & banners", "Neon signage"],
    social: [{ label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083378468847" }],
    faqs: [
      {
        q: "Can you design a logo for a new business?",
        a: "Yes. Logo and brand identity design is a core service. We start by understanding your business, its name and where it is going.",
      },
      {
        q: "Do you make signs and neon lights?",
        a: "Yes — shop signs, banners and neon light signage. Tell us the location and size and we will advise on options.",
      },
      {
        q: "Can you print what you design?",
        a: "Yes. Design and printing are handled by the same team, so artwork is prepared correctly for production.",
      },
    ],
    servicesConfirmed: true,
    seo: {
      title: "Branding, Logo Design, Printing & Signage — Addis Ababa & Wolaita Sodo",
      description:
        "Logo and brand identity design, graphic design, printing, signs, banners and neon light signage by Fidelity Branding & Advertising, Ethiopia.",
    },
  },
];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);
