import { contact, tickerItems } from "@/lib/content";

const sections = [
  { href: "#studio", label: "Studio" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="shell py-14 md:py-20">
        {/* Oversized wordmark — the last thing on the page, held quietly */}
        <p
          aria-hidden="true"
          className="font-display w-full text-[clamp(3.25rem,15.5vw,14rem)] leading-[0.82] font-medium tracking-[-0.045em] text-ink"
          style={{ fontStretch: "92%" }}
        >
          Hello Machine
          <span className="ml-[0.15em] inline-block size-[0.09em] translate-y-[-0.55em] rounded-full bg-signal align-baseline" />
        </p>

        <div className="mt-14 grid gap-x-8 gap-y-10 border-t border-line pt-10 md:grid-cols-4">
          <div>
            <h2 className="type-label text-faint">Sections</h2>
            <ul className="mt-4 space-y-2">
              {sections.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="type-body link-underline text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-label text-faint">Capabilities</h2>
            <ul className="type-body mt-4 space-y-1 text-[0.9375rem]">
              {tickerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="type-label text-faint">Start a conversation</h2>
            <a
              href={`mailto:${contact.email}`}
              className="link-underline font-display mt-4 inline-block text-[clamp(1.125rem,2.2vw,1.65rem)] leading-tight font-medium tracking-[-0.025em] text-ink"
            >
              {contact.email}
            </a>
            <p className="type-body mt-4 max-w-[34ch] text-[0.9375rem]">
              {contact.studio}. We take on a small number of projects at a time
              so the people you meet are the people who do the work.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label text-faint">
            © {new Date().getFullYear()} Hello Machine
          </p>
          <p className="type-label text-faint">
            Design-led technology studio · Built with intent
          </p>
        </div>
      </div>
    </footer>
  );
}
