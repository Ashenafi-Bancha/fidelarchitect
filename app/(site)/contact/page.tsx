import { Mail, MapPin, MessageCircle, Phone, Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SectionLabel } from "@/components/ui/Button";
import { site, mapsDirectionsUrl, telUrl, whatsappUrl, locationLabel } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Project Inquiry",
  description:
    "Start a project with Fidelity Business Group in Wolaita Sodo, Ethiopia — architecture, engineering, interiors, furniture, printing and advertising.",
  path: "/contact",
});

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-5 border-b border-bone/10 py-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center border border-bone/15 text-champagne" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="eyebrow text-bone/40">{label}</p>
        <div className="mt-2 text-bone/90">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const tel = telUrl();
  const wa = whatsappUrl("Hello Fidelity Business Group, I found you through your website and would like to discuss a project.");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a project with Fidelity"
        lines={["Start", <span key="2">a project<span className="text-champagne">.</span></span>]}
        intro="Tell us what you are planning. A short description is enough to begin — we will follow up to understand the details."
      />

      <section className="bg-bone" aria-label="Inquiry form and contact details">
        <div className="grid lg:grid-cols-12">
          <div className="container-x py-20 sm:py-28 lg:col-span-7 lg:mx-0 lg:max-w-none lg:pr-16">
            <SectionLabel>Project inquiry</SectionLabel>
            <h2 className="display-md mt-8 mb-14">A consultation request, not a questionnaire.</h2>
            <InquiryForm />
          </div>

          <aside className="grain bg-obsidian text-bone lg:col-span-5">
            <div className="px-[var(--gutter)] py-20 sm:py-28 lg:sticky lg:top-[var(--header-h)] lg:px-14">
              <SectionLabel className="text-bone/50">Reach us directly</SectionLabel>
              <ul className="mt-8 border-t border-bone/10">
                {tel && (
                  <ContactRow icon={<Phone className="h-4 w-4" />} label="Telephone">
                    <a href={tel} className="link-line text-lg">{site.contact.phone}</a>
                  </ContactRow>
                )}
                {wa && (
                  <ContactRow icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp">
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="link-line text-lg">
                      Message us on WhatsApp
                    </a>
                  </ContactRow>
                )}
                {site.contact.email && (
                  <ContactRow icon={<Mail className="h-4 w-4" />} label="Email">
                    <a href={`mailto:${site.contact.email}`} className="link-line break-all text-lg">{site.contact.email}</a>
                  </ContactRow>
                )}
                <ContactRow icon={<MapPin className="h-4 w-4" />} label="Office">
                  <p className="text-lg">
                    {site.location.address && <>{site.location.address}<br /></>}
                    {locationLabel}
                  </p>
                  <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-bone/60 hover:text-bone">
                    Directions in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </ContactRow>
                {site.contact.hours && (
                  <ContactRow icon={<Clock className="h-4 w-4" />} label="Business hours">
                    <p className="text-lg">{site.contact.hours}</p>
                  </ContactRow>
                )}
              </ul>
              {!tel && !wa && !site.contact.email && (
                <p className="mt-8 text-sm leading-relaxed text-bone/50">
                  Direct phone, WhatsApp and email details will be listed here once confirmed. The inquiry form is the fastest way to
                  reach the team in the meantime.
                </p>
              )}
              {site.social.length > 0 && (
                <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.14em] text-bone/60">
                  {site.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line hover:text-bone">{s.label}</a>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-16 font-serif text-3xl italic text-champagne-soft">From Thought to Empire.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
