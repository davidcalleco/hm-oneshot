import type { contact as contactContent, site as siteContent } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/section-head";

export function Contact({
  content,
  site,
}: {
  content: typeof contactContent;
  site: typeof siteContent;
}) {
  return (
    <section id="contact" className="scroll-mt-28 border-t border-line py-24 md:py-36">
      <div className="shell">
        <SectionHead
          index={content.index}
          label={content.label}
          statement={content.statement}
          size="display"
          statementClassName="max-w-[13ch]"
        >
          <Reveal delay={0.08}>
            <p className="type-lede mt-8 max-w-[46ch]">{content.lede}</p>
          </Reveal>

          <Reveal delay={0.14} className="mt-10">
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-display inline-block text-[clamp(1.35rem,3.6vw,2.6rem)] leading-none font-medium tracking-[-0.03em] text-signal"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              href={`mailto:${site.email}?subject=Starting%20a%20conversation%20with%20Hello%20Machine`}
              variant="ink"
            >
              {site.cta.label}
            </Button>
            <span className="type-label text-faint">{site.studio}</span>
          </Reveal>
        </SectionHead>

        <Reveal className="mt-20 border-t border-line pt-10 md:mt-28">
          <p className="type-label pb-8 text-faint">{content.nextHeading}</p>
          <ol className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {content.next.map((item) => (
              <li key={item.index}>
                <p className="type-label text-signal">{item.index}</p>
                <h3 className="type-heading mt-4 max-w-[16ch] text-[1.25rem] md:text-[1.4rem]">
                  {item.label}
                </h3>
                <p className="type-body mt-3 max-w-[34ch] text-[0.9375rem]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
