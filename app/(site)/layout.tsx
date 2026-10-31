import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BrandIntro } from "@/components/providers/BrandIntro";
import { Cursor } from "@/components/providers/Cursor";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <SmoothScroll />
      <BrandIntro />
      <Cursor />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
