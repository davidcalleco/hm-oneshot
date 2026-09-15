import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { Studio } from "@/components/sections/studio";
import { Capabilities } from "@/components/sections/capabilities";
import { WorkIndex } from "@/components/sections/work-index";
import { Approach } from "@/components/sections/approach";
import { PointOfView } from "@/components/sections/point-of-view";
import { Contact } from "@/components/sections/contact";
import * as content from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: content.site.name,
  description:
    "A design-led technology studio building websites, internal tools, automation and AI systems for ambitious businesses.",
  email: content.site.email,
  url: "https://hellomachine.studio",
  areaServed: "Worldwide",
  knowsAbout: content.capabilities.items.map((capability) => capability.name),
};

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteHeader site={content.site} />
      <main id="main">
        <Hero content={content.hero} />
        <Studio content={content.studio} />
        <Capabilities content={content.capabilities} />
        <WorkIndex content={content.work} />
        <Approach content={content.approach} />
        <PointOfView content={content.pointOfView} />
        <Contact content={content.contact} site={content.site} />
      </main>
      <SiteFooter content={content.footer} site={content.site} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
