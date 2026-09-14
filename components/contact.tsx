import { Reveal } from "@/components/reveal";
import { contact } from "@/lib/content";

const next = [
  {
    index: "01",
    label: "A reply from a person",
    body: "Usually within a working day, from whoever would actually run the project.",
  },
  {
    index: "02",
    label: "A 40-minute conversation",
    body: "About the business and the problem. No deck, no discovery fee, no obligation.",
  },
  {
    index: "03",
    label: "A written read on it",
    body: "What we would do first, roughly what it costs, and whether we are the right studio for it.",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-line py-24 md:py-36"
    >
      <div className="shell">
        <div className="grid-editorial gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="type-label text-faint">
                <span className="text-signal">06</span> &nbsp;/&nbsp; Contact
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-8">
            <Reveal as="h2" className="type-display max-w-[13ch]">
              Tell us what is not working{" "}
              <span className="type-serif text-signal">yet</span>.
            </Reveal>
            <Reveal delay={80}>
              <p className="type-lede mt-8 max-w-[46ch]">
                The best first message is the messy one — the process nobody wants
                to own, the site that undersells you, the idea you have not been
                able to scope. Bring that.
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-10">
              <a
                href={`mailto:${contact.email}`}
                className="link-underline font-display inline-block text-[clamp(1.35rem,3.6vw,2.6rem)] leading-none font-medium tracking-[-0.03em] text-signal"
              >
                {contact.email}
              </a>
            </Reveal>

            <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contact.email}?subject=Starting%20a%20conversation%20with%20Hello%20Machine`}
                className="type-label rounded-full bg-ink px-6 py-4 text-white transition-colors duration-300 hover:bg-signal"
              >
                Start a conversation
              </a>
              <span className="type-label text-faint">{contact.studio}</span>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-20 border-t border-line pt-10 md:mt-28">
          <p className="type-label pb-8 text-faint">What happens next</p>
          <ol className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {next.map((item) => (
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
