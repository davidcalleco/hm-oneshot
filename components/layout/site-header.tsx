"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import type { site as siteContent } from "@/lib/content";
import { Button } from "@/components/ui/button";
import {
  ScrollTrigger,
  duration,
  ease,
  gsap,
  registerMotion,
} from "@/lib/motion";

registerMotion();

export function SiteHeader({ site }: { site: typeof siteContent }) {
  const nav = site.nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const navRef = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

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

  /* Track which section the reader is in. This is wayfinding, not decoration:
     the active link also carries aria-current for anyone not watching it move. */
  useGSAP(() => {
    const triggers = nav.map((item, i) =>
      ScrollTrigger.create({
        trigger: item.href,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      }),
    );

    const top = ScrollTrigger.create({
      trigger: "#top",
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) setActive(-1);
      },
    });

    return () => {
      triggers.forEach((t) => t.kill());
      top.kill();
    };
  }, []);

  /* Slide the pill to the active link. */
  useGSAP(
    () => {
      const bar = indicator.current;
      const link = links.current[active];
      if (!bar) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!link) {
        gsap.to(bar, {
          autoAlpha: 0,
          duration: reduced ? 0 : duration.fast,
          ease: ease.out,
        });
        return;
      }

      const target = {
        x: link.offsetLeft,
        width: link.offsetWidth,
        autoAlpha: 1,
      };

      gsap.to(bar, {
        ...target,
        duration: reduced ? 0 : duration.base,
        ease: ease.out,
      });
    },
    { dependencies: [active], scope: navRef },
  );

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
          aria-label={`${site.name}, back to top`}
        >
          <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em]">
            {site.name}
          </span>
          <span
            aria-hidden="true"
            className="hm-pulse mb-[0.15em] block size-[6px] rounded-full bg-signal"
          />
        </a>

        {/* Desktop nav — a single floating element, as compact as it can be */}
        <nav
          ref={navRef}
          aria-label="Primary"
          className={`relative hidden items-center gap-1 rounded-full border border-line bg-white/80 p-1 backdrop-blur-md transition-shadow duration-500 lg:flex ${
            scrolled ? "shadow-[0_8px_30px_-12px_rgba(14,15,17,0.18)]" : ""
          }`}
        >
          <span
            ref={indicator}
            aria-hidden="true"
            className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-cream opacity-0"
          />
          {nav.map((item, i) => (
            <a
              key={item.href}
              ref={(node) => {
                links.current[i] = node;
              }}
              href={item.href}
              aria-current={active === i ? "true" : undefined}
              className={`type-label relative rounded-full px-4 py-2.5 transition-colors duration-300 hover:text-ink ${
                active === i ? "text-ink" : "text-body"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Hidden outright while the panel is open, so it cannot be reached
              behind the overlay by keyboard. */}
          <Button
            href={site.cta.href}
            variant="signal"
            size="md"
            hidden={open}
            className="max-sm:hidden"
          >
            {site.cta.label}
          </Button>
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
      <div id="mobile-nav" hidden={!open} className="fixed inset-0 bg-ink text-white lg:hidden">
        <div className="shell flex h-full flex-col justify-between pt-28 pb-10">
          <nav aria-label="Primary, mobile" className="flex flex-col">
            {[...nav, { href: site.cta.href, label: "Contact" }].map((item, i) => (
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
          <a href={`mailto:${site.email}`} className="type-label text-faint-invert">
            {site.email}
          </a>
        </div>
      </div>
    </header>
  );
}
