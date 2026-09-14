import { Reveal } from "@/components/reveal";
import { beliefs } from "@/lib/content";

export function PointOfView() {
  return (
    <section className="bg-ink py-24 text-white md:py-36">
      <div className="shell">
        <div className="grid-editorial gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="type-label text-faint-invert">
                <span className="text-[#7e93ff]">05</span> &nbsp;/&nbsp; Point of view
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Reveal as="h2" className="type-statement max-w-[19ch] text-white">
              A tool is only worth building if it changes what someone{" "}
              <span className="type-serif text-[#7e93ff]">does</span> next.
            </Reveal>
            <Reveal delay={80}>
              <p className="type-body mt-8 max-w-[54ch] text-[#b4b6bb]">
                Plenty of technology gets bought, launched and quietly ignored. The
                systems that last are the ones that make something concrete easier:
                understanding a situation, making a decision, explaining it to
                someone else, or getting through the day with less friction. That
                is the test we hold our own work to.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-px border-t border-line-invert md:mt-28 md:grid-cols-2">
          {beliefs.map((belief, i) => (
            <Reveal
              key={belief.claim}
              delay={Math.min(i * 70, 280)}
              className="border-b border-line-invert py-10 md:odd:border-r md:odd:pr-12 md:even:pl-12"
            >
              <p className="type-label text-[#7e93ff]">0{i + 1}</p>
              <h3 className="type-heading mt-5 max-w-[22ch] text-white">
                {belief.claim}
              </h3>
              <p className="type-body mt-4 max-w-[46ch] text-[#b4b6bb]">
                {belief.instead}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 md:mt-28">
          <blockquote className="grid-editorial">
            <p className="type-statement col-span-12 max-w-[24ch] text-white md:col-span-9 md:col-start-4">
              <span className="type-serif text-[#7e93ff]">The difference</span> is
              that we are accountable for whether the thing works — not only for
              whether it shipped.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
