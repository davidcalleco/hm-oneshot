import type { pointOfView as pointOfViewContent } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { Statement } from "@/components/ui/statement";

export function PointOfView({
  content,
}: {
  content: typeof pointOfViewContent;
}) {
  return (
    <section className="bg-ink py-24 text-white md:py-36">
      <div className="shell">
        <SectionHead
          index={content.index}
          label={content.label}
          statement={content.statement}
          intro={content.intro}
          invert
        />

        <div className="mt-20 grid gap-px border-t border-line-invert md:mt-28 md:grid-cols-2">
          {content.beliefs.map((belief, i) => (
            <Reveal
              key={belief.claim}
              delay={i % 2 === 1 ? 0.08 : 0}
              className="border-b border-line-invert py-10 md:odd:border-r md:odd:pr-12 md:even:pl-12"
            >
              <p className="type-label text-signal-invert">0{i + 1}</p>
              <h3 className="type-heading mt-5 max-w-[22ch] text-white">
                {belief.claim}
              </h3>
              <p className="type-body mt-4 max-w-[46ch] text-body-invert">
                {belief.instead}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 md:mt-28">
          <blockquote className="grid-editorial">
            <Statement
              as="p"
              value={content.quote}
              accentClassName="text-signal-invert"
              className="col-span-12 max-w-[24ch] text-white md:col-span-9 md:col-start-4"
            />
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
