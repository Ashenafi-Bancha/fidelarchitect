/**
 * Site-wide business information.
 *
 * Sources (checked 31 Oct 2026, from Fidelity's own public accounts):
 *  - Fidelity Business Group Facebook page (address, phone, intro)
 *  - Fidelity Architects & Consulting Engineers Facebook page + TikTok (phone, email, offices)
 *  - Division Facebook pages and the founder's profile (taglines, services)
 *
 * Environment variables still override every value, so details can be
 * changed at deploy time without editing code.
 */

const env = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : null);

/**
 * Preview mode: until the owner approves the site, it is hidden from search
 * engines. Set NEXT_PUBLIC_SITE_LIVE=true at deploy time to go public.
 */
export const isLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export const site = {
  name: "Fidelity Business Group",
  shortName: "Fidelity",
  slogan: "From Thought to Empire",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Fidelity Business Group is an Ethiopian holding company with offices in Addis Ababa and Wolaita Sodo — architecture and consulting engineering, furniture and interior design, and branding and advertising under one roof.",
  location: {
    /** Offices named on the Architects page: "Addis Ababa | Wolaita Sodo". */
    offices: ["Addis Ababa", "Wolaita Sodo"],
    /** Address listed on the group's Facebook page. */
    city: "Addis Ababa",
    country: "Ethiopia",
    countryCode: "ET",
    /** Street-level address — not published yet. */
    address: env(process.env.NEXT_PUBLIC_OFFICE_ADDRESS),
  },
  contact: {
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? "+251 911 971 800",
    /** Not published as a WhatsApp number yet — set NEXT_PUBLIC_CONTACT_WHATSAPP once confirmed. */
    whatsapp: env(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP)?.replace(/\D/g, "") ?? null,
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "fidelityarchitects@gmail.com",
    hours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  },
  /** Official business accounts. */
  social: [
    { label: "Facebook", detail: "Fidelity Business Group", href: env(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) ?? "https://www.facebook.com/profile.php?id=61594389374146" },
    { label: "TikTok", detail: "@fidelity_architects", href: env(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK) ?? "https://www.tiktok.com/@fidelity_architects" },
    { label: "Instagram", detail: "", href: env(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
    { label: "LinkedIn", detail: "", href: env(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
    { label: "Telegram", detail: "t.me/FidelityEmpire", href: env(process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM) ?? "https://t.me/FidelityEmpire" },
  ].filter((s): s is { label: string; detail: string; href: string } => Boolean(s.href)),
  /** Footer credit for the website's designer/developer (set NEXT_PUBLIC_CREDIT_NAME="" to hide). */
  credit: process.env.NEXT_PUBLIC_CREDIT_NAME ?? "Ashenafi Bancha",
  founder: {
    name: "Fidel Gebremedhin",
    title: "Founder & CEO",
    facebook: "https://www.facebook.com/Timberfresh",
    tiktok: "https://www.tiktok.com/@fidelgebremedhin",
  },
} as const;

export const locationLabel = `${site.location.offices.join(" · ")}, ${site.location.country}`;

export const mapsDirectionsUrl = (office: string = site.location.city) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [office === site.location.city ? site.location.address : null, office, site.location.country].filter(Boolean).join(", "),
  )}`;

export function whatsappUrl(message = "Hello Fidelity Business Group, I would like to discuss a project.") {
  if (!site.contact.whatsapp) return null;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telUrl() {
  return site.contact.phone ? `tel:${site.contact.phone.replace(/[^\d+]/g, "")}` : null;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Divisions", href: "/divisions", children: true },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;
