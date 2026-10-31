import { Mail, MapPin, MessageCircle, Phone, Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SectionLabel } from "@/components/ui/Button";
import { site, mapsDirectionsUrl, telUrl, whatsappUrl } from "@/content/site";
import { divisions } from "@/content/divisions";
import { DivisionMark } from "@/components/brand/Logo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Project Inquiry",
  description:
    "Start a project with Fidelity Business Group — call 0911 97 18 00. Architecture, construction, interiors, furniture, branding, printing and signage in Addis Ababa and Wolaita Sodo.",
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
                <ContactRow icon={<MapPin className="h-4 w-4" />} label="Offices">
                  {site.location.address && <p className="text-lg">{site.location.address}</p>}
                  <ul className="space-y-2">
                    {site.location.offices.map((o) => (
                      <li key={o} className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <span className="text-lg">{o}</span>
                        <a href={mapsDirectionsUrl(o)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-bone/60 hover:text-bone">
                          Map <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
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
              <div className="mt-12">
                <p className="eyebrow text-bone/40">Follow our work</p>
                <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10 text-sm">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-3 hover:text-bone">
                        <span>
                          <span className="text-bone/90">{s.label}</span>
                          {s.detail && <span className="ml-2 text-bone/45">{s.detail}</span>}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-bone/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                  {divisions.flatMap((d) =>
                    d.social.filter((s) => !site.social.some((g) => g.href === s.href)).map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-3 hover:text-bone">
                          <span className="flex items-center gap-3">
                            <DivisionMark division={d.slug} className="h-5 w-5 text-bone" />
                            <span className="text-bone/90">{s.label}</span>
                            <span className="text-bone/45">{d.shortName}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-bone/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                      </li>
                    )),
                  )}
                </ul>
              </div>
              <p className="mt-16 font-serif text-3xl italic text-champagne-soft">From Thought to Empire.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
