import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Organization structured data — verified fields only. */
export function organizationJsonLd() {
  const sameAs = site.social.map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    slogan: site.slogan,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      ...(site.location.address ? { streetAddress: site.location.address } : {}),
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    areaServed: { "@type": "Country", name: "Ethiopia" },
    founder: { "@type": "Person", name: site.founder.name, jobTitle: "Architect, Founder & CEO" },
    department: [
      { "@type": "Organization", name: "Fidelity Architects & Consulting Engineers", slogan: "Building a legacy!", url: "https://www.facebook.com/FidelityArchitects" },
      { "@type": "Organization", name: "Fidelity Furniture & Interior Design", slogan: "For elegant spaces!" },
      { "@type": "Organization", name: "Fidelity Branding & Advertising", slogan: "Stand out!" },
    ],
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
