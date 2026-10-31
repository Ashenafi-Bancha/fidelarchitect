import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { FidelityMark, DivisionMark } from "@/components/brand/Logo";
import { divisions } from "@/content/divisions";
import { projects } from "@/content/projects";
import { site, mapsDirectionsUrl, telUrl, whatsappUrl, locationLabel } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const tel = telUrl();
  const wa = whatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-obsidian text-bone" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>

      {/* CTA band */}
      <div className="container-x border-b border-bone/10 py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-6 text-champagne-soft">Have a project in mind?</p>
            <p className="display-lg">
              Let&apos;s build
              <br />
              <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-bone/70">what comes next.</span>
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:justify-self-end" delay={0.1}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-5 border-b border-bone/30 pb-3 font-display text-2xl font-semibold uppercase tracking-tight transition-colors hover:border-champagne hover:text-champagne-soft"
            >
              Start a Project
              <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Link grid */}
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <FidelityMark className="h-10 w-10" />
            <div className="leading-none">
              <p className="font-display text-lg font-semibold uppercase tracking-[0.18em]">Fidelity</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.32em] text-bone/50">Business Group</p>
            </div>
          </div>
          <p className="mt-6 font-serif text-2xl italic text-champagne-soft">From Thought to Empire.</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60">
            An Ethiopian holding company bringing architecture and construction, furniture and interiors, and branding
            and advertising together under one roof.
          </p>
        </div>

        <nav aria-label="Divisions" className="lg:col-span-3">
          <p className="eyebrow mb-5 text-bone/40">Divisions</p>
          <ul className="space-y-3 text-sm">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link href={`/divisions/${d.slug}`} className="link-line inline-flex items-center gap-3 text-bone/80 hover:text-bone">
                  <DivisionMark division={d.slug} className="h-5 w-5 shrink-0 text-bone" />
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explore" className="lg:col-span-2">
          <p className="eyebrow mb-5 text-bone/40">Explore</p>
          <ul className="space-y-3 text-sm text-bone/80">
            <li><Link className="link-line hover:text-bone" href="/about">About</Link></li>
            <li><Link className="link-line hover:text-bone" href="/projects">Projects</Link></li>
            {projects.filter((p) => p.featured).slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link className="link-line text-bone/55 hover:text-bone" href={`/projects/${p.slug}`}>— {p.title}</Link>
              </li>
            ))}
            <li><Link className="link-line hover:text-bone" href="/services">Services</Link></li>
            <li><Link className="link-line hover:text-bone" href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow mb-5 text-bone/40">Contact</p>
          <ul className="space-y-4 text-sm text-bone/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
              <span className="space-y-1">
                {site.location.address && <span className="block">{site.location.address}</span>}
                {site.location.offices.map((o) => (
                  <a key={o} href={mapsDirectionsUrl(o)} target="_blank" rel="noopener noreferrer" className="link-line block w-fit hover:text-bone">
                    {o}
                  </a>
                ))}
              </span>
            </li>
            {tel && (
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                <a href={tel} className="link-line hover:text-bone">{site.contact.phone}</a>
              </li>
            )}
            {wa && (
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                <a href={wa} target="_blank" rel="noopener noreferrer" className="link-line hover:text-bone">WhatsApp</a>
              </li>
            )}
            {site.contact.email && (
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className="link-line break-all hover:text-bone">{site.contact.email}</a>
              </li>
            )}
            {site.contact.hours && (
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                <span>{site.contact.hours}</span>
              </li>
            )}
            {!tel && !wa && !site.contact.email && (
              <li>
                <Link href="/contact" className="link-line text-bone/60 hover:text-bone">Send an inquiry online</Link>
              </li>
            )}
          </ul>
          {site.social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-bone/60">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line hover:text-bone">{s.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container-x select-none overflow-hidden" aria-hidden="true">
        <Reveal y={60}>
          <p className="font-display text-[22vw] font-semibold uppercase leading-[0.78] tracking-[-0.06em] text-bone/[0.05] lg:text-[18.5vw]">
            Fidelity
          </p>
        </Reveal>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-bone/10 py-6 text-xs text-bone/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {site.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="link-line hover:text-bone">Privacy Policy</Link>
          <span>{locationLabel}</span>
        </div>
      </div>
    </footer>
  );
}
