/**
 * Site-wide business information.
 *
 * Only verified facts live here. Contact details are read from environment
 * variables so they can be set when Fidelity confirms them — anything left
 * empty is hidden from the UI and from structured data. Never fill these with
 * guesses.
 */

const env = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : null);

export const site = {
  name: "Fidelity Business Group",
  shortName: "Fidelity",
  slogan: "From Thought to Empire",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Fidelity Business Group is a multidisciplinary group in Wolaita Sodo, Ethiopia — architecture and consulting engineering, furniture and interior design, and printing and advertising under one roof.",
  location: {
    city: "Wolaita Sodo",
    region: "South Ethiopia Region",
    country: "Ethiopia",
    countryCode: "ET",
    /** Street-level address — pending confirmation. */
    address: env(process.env.NEXT_PUBLIC_OFFICE_ADDRESS),
  },
  contact: {
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    /** Digits only, international format (e.g. 2519…). */
    whatsapp: env(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP)?.replace(/\D/g, "") ?? null,
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    hours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  },
  social: [
    { label: "Facebook", href: env(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
    { label: "Instagram", href: env(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
    { label: "LinkedIn", href: env(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
    { label: "Telegram", href: env(process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM) },
    { label: "TikTok", href: env(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK) },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href)),
} as const;

export const locationLabel = `${site.location.city}, ${site.location.country}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  [site.location.address, site.location.city, site.location.country].filter(Boolean).join(", "),
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
