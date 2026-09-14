import { Reveal } from "@/components/reveal";

const fields = [
  {
    label: "Business strategy",
    body: "What the company is trying to change, and which move is worth making first.",
  },
  {
    label: "Digital design",
    body: "Structure, language and art direction — the part people meet and judge.",
  },
  {
    label: "Engineering",
    body: "Websites, tools and integrations built to be maintained, not admired.",
  },
  {
    label: "AI & automation",
    body: "Applied where it genuinely beats the current process, and nowhere else.",
  },
];

export function Studio() {
  return (
    <section id="studio" className="scroll-mt-28 py-24 md:py-36">
      <div className="shell">
        <div className="grid-editorial gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="type-label text-faint">
                <span className="text-signal">01</span> &nbsp;/&nbsp; The studio
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-9">
            <Reveal as="h2" className="type-statement max-w-[17ch]">
              Most companies do not need more technology. They need someone who can
              hold the <span className="type-serif text-signal">whole</span> problem.
            </Reveal>

            <div className="grid-editorial mt-12 gap-y-6 md:mt-16">
              <Reveal delay={80} className="col-span-12 lg:col-span-5">
                <p className="type-body">
                  The usual arrangement splits the work: a strategist writes the
                  document, an agency designs the surface, a developer builds what
                  was specified, and a separate vendor sells the AI. Everyone does
                  their part competently and the result still fails to change how
                  the business runs.
                </p>
              </Reveal>
              <Reveal delay={160} className="col-span-12 lg:col-span-5 lg:col-start-7">
                <p className="type-body">
                  Hello Machine is one team across all four. We sit close enough to
                  the business to question the brief, close enough to the design to
                  give it a point of view, and close enough to the code to know what
                  it will cost. That is the whole proposition.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Where the studio sits — stated as a spectrum rather than a grid of cards */}
        <Reveal className="mt-20 md:mt-28">
          <div className="relative border-t border-line pt-10">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-px w-full bg-signal"
              style={{ clipPath: "inset(0 25% 0 25%)" }}
            />
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {fields.map((field, i) => (
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
            <p className="type-label mt-10 text-faint">
              Hello Machine works across all four — the overlap is the point
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
