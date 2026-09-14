import { tickerItems } from "@/lib/content";

const meta = [
  { index: "01", label: "What we are", value: "A design-led technology studio" },
  { index: "02", label: "What we make", value: "Websites, tools, automation, AI systems" },
  { index: "03", label: "How we work", value: "Small team, senior hands, strategic from the first call" },
];

export function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40">
      {/* Column guides — a drafting-table detail borrowed from the way we work,
          not decoration: they mark the grid the rest of the page is built on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 bottom-16 hidden lg:block"
      >
        <div className="shell h-full">
          <div className="flex h-full">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-full flex-1 ${i < 3 ? "border-r border-line/60" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="shell relative">
        {/* Kicker */}
        <div className="hm-rise flex items-center gap-4 pb-10 md:pb-14">
          <span aria-hidden="true" className="h-px w-10 bg-ink md:w-20" />
          <p className="type-label text-body">
            Hello Machine — design, technology &amp; the systems in between
          </p>
        </div>

        {/* The statement */}
        <h1 className="type-display max-w-[19ch]">
          <span className="hm-rise block" style={{ animationDelay: "60ms" }}>
            We design and build
          </span>
          <span className="hm-rise block" style={{ animationDelay: "140ms" }}>
            the systems ambitious
          </span>
          <span className="hm-rise block" style={{ animationDelay: "220ms" }}>
            companies{" "}
            <span className="type-serif pr-[0.06em] text-signal">actually</span>{" "}
            run on.
          </span>
        </h1>

        {/* Offset supporting column — asymmetric against the headline */}
        <div className="grid-editorial mt-12 md:mt-20">
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="type-lede hm-rise" style={{ animationDelay: "320ms" }}>
              Strategy, digital design, websites, automation and AI, made by one
              team. We take the part of your business that is ambiguous and
              expensive to run, and turn it into something clear enough to use on
              an ordinary Tuesday.
            </p>
            <div
              className="hm-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "400ms" }}
            >
              <a
                href="#contact"
                className="type-label rounded-full bg-signal px-6 py-4 text-white transition-colors duration-300 hover:bg-ink"
              >
                Start a conversation
              </a>
              <a
                href="#approach"
                className="type-label rounded-full border border-line-strong px-6 py-4 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                See how we work
              </a>
            </div>
          </div>
        </div>

        {/* Orientation strip */}
        <dl className="grid-editorial mt-20 gap-y-8 border-t border-line pt-6 md:mt-28">
          {meta.map((item) => (
            <div key={item.index} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <dt className="type-label flex items-baseline gap-3 text-faint">
                <span className="text-signal">{item.index}</span>
                {item.label}
              </dt>
              <dd className="type-body mt-3 max-w-[28ch] text-ink">{item.value}</dd>
            </div>
          ))}
          <p className="type-label col-span-12 self-end text-faint lg:col-span-3 lg:text-right">
            Scroll
            <span aria-hidden="true" className="ml-2">↓</span>
          </p>
        </dl>
      </div>

      {/* Capability ticker — the studio's range, stated plainly and in motion */}
      <div className="hm-marquee mt-16 overflow-hidden border-y border-line bg-cream py-4 md:mt-24">
        <div className="hm-marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {tickerItems.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="type-label px-7 whitespace-nowrap text-ink">
                    {item}
                  </span>
                  <span className="size-[5px] rounded-full bg-signal" />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p className="sr-only">
          Capabilities: {tickerItems.join(", ")}.
        </p>
      </div>
    </section>
  );
}
