import type { studio as studioContent } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section-head";

export function Studio({ content }: { content: typeof studioContent }) {
  return (
    <section id="studio" className="scroll-mt-28 py-24 md:py-36">
      <div className="shell">
        <SectionHead
          index={content.index}
          label={content.label}
          statement={content.statement}
          statementClassName="max-w-[17ch]"
        >
          <div className="grid-editorial mt-12 gap-y-6 md:mt-16">
            {content.columns.map((column, i) => (
              <Reveal
                key={i}
                delay={0.08 * (i + 1)}
                className={
                  i === 0
                    ? "col-span-12 lg:col-span-5"
                    : "col-span-12 lg:col-span-5 lg:col-start-7"
                }
              >
                <p className="type-body">{column}</p>
              </Reveal>
            ))}
          </div>
        </SectionHead>

        {/* Where the studio sits — a spectrum, not a grid of cards */}
        <Reveal className="mt-20 md:mt-28">
          <div className="relative border-t border-line pt-10">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-px w-full bg-signal"
              style={{ clipPath: "inset(0 25% 0 25%)" }}
            />
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {content.fields.map((field, i) => (
                <div key={field.label} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -top-10 left-0 h-4 w-px ${
                      i === 1 || i === 2 ? "bg-signal" : "bg-line-strong"
                    }`}
                  />
                  <h3 className="type-label text-ink">{field.label}</h3>
                  <p className="type-body mt-3 max-w-[30ch] text-[0.9375rem]">
                    {field.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="type-label mt-10 text-faint">{content.footnote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
