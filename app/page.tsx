import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Studio } from "@/components/studio";
import { CapabilitiesList } from "@/components/capabilities-list";
import { WorkIndex } from "@/components/work-index";
import { Approach } from "@/components/approach";
import { PointOfView } from "@/components/point-of-view";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { capabilities, contact } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hello Machine",
  description:
    "A design-led technology studio building websites, internal tools, automation and AI systems for ambitious businesses.",
  email: contact.email,
  url: "https://hellomachine.studio",
  areaServed: "Worldwide",
  knowsAbout: capabilities.map((capability) => capability.name),
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Studio />
        <CapabilitiesList />
        <WorkIndex />
        <Approach />
        <PointOfView />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
