"use client";

import { useEffect, useState } from "react";

const nav = [
  { href: "#studio", label: "Studio" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`shell flex items-center justify-between transition-[padding] duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Wordmark — a floating element in its own right, so it stays legible
            over white, cream and the inverted sections alike. */}
        <a
          href="#top"
          className={`group relative z-10 flex items-baseline gap-2 rounded-full px-4 py-2.5 no-underline transition-all duration-500 ${
            open
              ? "text-white"
              : `text-ink ${scrolled ? "border border-line bg-white/85 backdrop-blur-md" : "border border-transparent"}`
          }`}
          aria-label="Hello Machine, back to top"
        >
          <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em]">
            Hello&nbsp;Machine
          </span>
          <span
            aria-hidden="true"
            className="hm-pulse mb-[0.15em] block size-[6px] rounded-full bg-signal"
          />
        </a>

        {/* Desktop nav — a single floating element, as compact as it can be */}
        <nav
          aria-label="Primary"
          className={`hidden items-center gap-1 rounded-full border border-line bg-white/80 p-1 backdrop-blur-md transition-shadow duration-500 lg:flex ${
            scrolled ? "shadow-[0_8px_30px_-12px_rgba(14,15,17,0.18)]" : ""
          }`}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="type-label rounded-full px-4 py-2.5 text-body transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Hidden outright while the panel is open, so it cannot be reached
              behind the overlay by keyboard. */}
          <a
            href="#contact"
            hidden={open}
            className="type-label rounded-full bg-signal px-5 py-3 whitespace-nowrap text-white transition-colors duration-300 max-sm:hidden hover:bg-ink"
          >
            Start a conversation
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={`type-label relative z-10 rounded-full border px-4 py-3 transition-colors lg:hidden ${
              open
                ? "border-white/30 text-white"
                : "border-line bg-white/80 text-ink backdrop-blur-md"
            }`}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 bg-ink text-white lg:hidden"
      >
        <div className="shell flex h-full flex-col justify-between pt-28 pb-10">
          <nav aria-label="Primary, mobile" className="flex flex-col">
            {[...nav, { href: "#contact", label: "Contact" }].map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="type-statement border-b border-line-invert py-5 text-white"
              >
                <span className="type-label mr-4 align-super text-faint-invert">
                  0{i + 1}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:hello@hellomachine.studio"
            className="type-label text-faint-invert"
          >
            hello@hellomachine.studio
          </a>
        </div>
      </div>
    </header>
  );
}
