import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { GroupIntro } from "@/components/sections/GroupIntro";
import { DivisionShowcase } from "@/components/sections/DivisionShowcase";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Philosophy } from "@/components/sections/Philosophy";
import { Marquee } from "@/components/sections/Marquee";
import { MaterialsCraft } from "@/components/sections/MaterialsCraft";
import { BrandApplications } from "@/components/sections/BrandApplications";
import { FullBleed } from "@/components/sections/FullBleed";
import { RevealLines } from "@/components/motion/Reveal";
import { images } from "@/content/imagery";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Architecture, Interiors & Branding in Ethiopia` },
  description:
    "Fidelity Business Group, Addis Ababa and Wolaita Sodo: architectural design, supervision and construction; furniture and interior design; branding, printing and signage. From Thought to Empire.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GroupIntro />
      <Marquee />
      <DivisionShowcase />
      <FullBleed image={images.archFacadeWhite} caption="Architecture">
        <p className="eyebrow text-bone/70">Architecture · Engineering</p>
        <RevealLines
          as="p"
          className="display-lg mt-6 max-w-5xl"
          lines={["Structure,", <span key="2">light <span className="font-serif font-normal normal-case italic text-bone/80">&</span> proportion.</span>]}
        />
      </FullBleed>
      <MaterialsCraft index="03" />
      <FeaturedWork index="04" />
      <BrandApplications index="05" />
      <Philosophy index="06" />
    </>
  );
}
