import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Fidelity Business Group collects, uses and protects the information you share through this website.",
  path: "/privacy",
});

// NOTE: Draft policy describing how this website actually handles data.
// Have it reviewed against applicable Ethiopian law before launch.
const LAST_UPDATED = "29 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lines={["Privacy", "policy."]} intro={`Last updated ${LAST_UPDATED}.`} />
      <section className="bg-bone py-14 sm:py-28">
        <div className="container-x">
          <div className="max-w-3xl space-y-12 leading-relaxed text-obsidian/75 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-obsidian [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2">
            <div>
              <h2>Who we are</h2>
              <p>
                This website is operated by {site.name}, {site.location.city}, {site.location.country}. This policy explains what
                information we collect through the website and how we use it.
              </p>
            </div>
            <div>
              <h2>Information you give us</h2>
              <p>When you submit a project inquiry, we collect the details you choose to provide:</p>
              <ul>
                <li>your name, phone number and, optionally, your email address and organisation;</li>
                <li>your preferred contact method;</li>
                <li>information about your project, including location, description, budget range and timeline;</li>
                <li>any files you attach, such as plans, sketches or reference images.</li>
              </ul>
            </div>
            <div>
              <h2>How we use it</h2>
              <p>
                We use this information only to respond to your inquiry, to discuss and prepare a proposal for your project, and to
                keep a record of our communication with you. We do not sell your information or share it with third parties for
                marketing.
              </p>
            </div>
            <div>
              <h2>How we protect it</h2>
              <p>
                Inquiries are stored on our server and can be viewed only by authorised Fidelity staff through a password-protected
                administration area. Attached files are checked for type and size and are not publicly accessible.
              </p>
            </div>
            <div>
              <h2>How long we keep it</h2>
              <p>
                We keep inquiry records for as long as needed to respond to you and manage any resulting project, and then delete or
                archive them in line with our record-keeping obligations.
              </p>
            </div>
            <div>
              <h2>Cookies and analytics</h2>
              <p>
                The public website does not use advertising cookies. A single essential cookie is used only to keep authorised staff
                signed in to the administration area. If we enable website analytics, we will use a privacy-friendly service that
                does not track you across other websites, and we will update this policy.
              </p>
            </div>
            <div>
              <h2>Your choices</h2>
              <p>
                You can ask us to see, correct or delete the information you have sent us.{" "}
                {site.contact.email ? (
                  <>Email <a className="underline underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or </>
                ) : null}
                Send a request through our <Link className="underline underline-offset-4" href="/contact">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
