import type { approach as approachContent } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section-head";

export function Approach({ content }: { content: typeof approachContent }) {
  return (
    <section
      id="approach"
      className="scroll-mt-28 border-t border-line bg-cream py-24 md:py-36"
    >
      <div className="shell">
        <div className="pb-16 md:pb-24">
          <SectionHead
            index={content.index}
            label={content.label}
            statement={content.statement}
            statementClassName="max-w-[20ch]"
          />
        </div>

        <ol>
          {content.steps.map((step) => (
            <Reveal
              as="li"
              key={step.index}
              className="grid-editorial gap-y-5 border-t border-line-strong py-10 md:py-14"
            >
              <div className="col-span-12 flex items-baseline gap-5 md:col-span-2 md:block">
                <span
                  aria-hidden="true"
                  className="font-display block text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.85] font-medium tracking-[-0.04em] text-numeral"
                >
                  {step.index}
                </span>
              </div>

              <div className="col-span-12 md:col-span-4">
                <h3 className="type-heading max-w-[12ch]">{step.title}</h3>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {step.markers.map((marker) => (
                    <li
                      key={marker}
                      className="type-label flex items-center gap-2 text-body"
                    >
                      <span
                        aria-hidden="true"
                        className="size-[5px] rounded-full bg-signal"
                      />
                      {marker}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-12 md:col-span-6">
                <p className="type-lede max-w-[38ch] text-ink">{step.lead}</p>
                <p className="type-body mt-4 max-w-[52ch]">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
