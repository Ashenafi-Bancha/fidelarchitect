import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FidelityMark } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/Button";
import { divisions } from "@/content/divisions";

export function NotFoundContent() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian text-bone">
      <div className="pointer-events-none absolute inset-0 blueprint text-bone/50" aria-hidden="true" />
      <FidelityMark className="pointer-events-none absolute -right-20 bottom-0 h-[30rem] w-[30rem] text-bone/[0.04] sm:h-[42rem] sm:w-[42rem]" />
      <div className="container-x relative py-32">
        <p className="eyebrow text-champagne-soft">Error 404</p>
        <h1 className="display-xl mt-8">
          Not yet
          <br />
          <span className="font-serif font-normal normal-case italic text-bone/60">built.</span>
        </h1>
        <p className="lede mt-10 max-w-lg text-bone/65">
          The page you are looking for does not exist or has moved. Every empire starts with a thought — here are some good places to
          start.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass("light", "lg")}>
            Back to home <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/projects" className={buttonClass("outline-light", "lg")}>Our projects</Link>
          <Link href="/contact" className={buttonClass("outline-light", "lg")}>Contact</Link>
        </div>
        <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm text-bone/60">
          {divisions.map((d) => (
            <li key={d.slug}>
              <Link href={`/divisions/${d.slug}`} className="link-line flex items-center gap-2 hover:text-bone">
                <span className="h-2 w-2" style={{ background: d.color }} aria-hidden="true" />
                {d.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
