"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import type { hero as heroContent } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { emphasise } from "@/components/ui/statement";
import { MOTION_OK, duration, ease, gsap, registerMotion, stagger } from "@/lib/motion";

registerMotion();

type Props = { content: typeof heroContent };

/** Entrance state, server-rendered so the final frame is never painted first.
 *  Cleared by globals.css under reduced motion, and by <noscript> without JS. */
const HIDDEN = { opacity: 0 } as const;

export function Hero({ content }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line] > span");
        const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
        const rule = root.current?.querySelector("[data-hero-rule]") ?? null;

        // These match the inline styles already in the server-rendered HTML,
        // so taking them over costs no repaint. `y: 0` is not redundant: GSAP
        // parses the rendered `translateY(110%)` into its own `y` cache as a
        // pixel value, and without clearing it that offset survives the tween.
        gsap.set(lines, { y: 0, yPercent: 110 });
        gsap.set(fades, { opacity: 0, y: 18 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({ defaults: { ease: ease.out } });

        tl.to(rule, { scaleX: 1, duration: duration.slow })
          .to(
            lines,
            { yPercent: 0, duration: 1.15, stagger: stagger.base },
            "-=0.7",
          )
          .to(
            fades,
            { opacity: 1, y: 0, duration: duration.reveal, stagger: stagger.tight },
            "-=0.85",
          );

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative pt-32 md:pt-40">
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
        <div className="flex items-center gap-4 pb-10 md:pb-14">
          <span
            data-hero-rule
            aria-hidden="true"
            className="h-px w-10 origin-left bg-ink md:w-20"
            style={{ transform: "scaleX(0)" }}
          />
          <p data-hero-fade style={HIDDEN} className="type-label text-body">
            {content.kicker}
          </p>
        </div>

        {/* Each line masks its own overflow so the type rises out of the page */}
        <h1 className="type-display max-w-[19ch]">
          {content.lines.map((line) => (
            <span
              key={line}
              data-hero-line
              className="block overflow-hidden pb-[0.08em]"
            >
              <span className="block" style={{ transform: "translateY(110%)" }}>
                {emphasise(line, content.emphasis, "text-signal")}
              </span>
            </span>
          ))}
        </h1>

        {/* Offset supporting column — asymmetric against the headline */}
        <div className="grid-editorial mt-12 md:mt-20">
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p data-hero-fade style={HIDDEN} className="type-lede">
              {content.lede}
            </p>
            <div data-hero-fade style={HIDDEN} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={content.actions.primary.href} variant="signal">
                {content.actions.primary.label}
              </Button>
              <Button href={content.actions.secondary.href} variant="outline">
                {content.actions.secondary.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Orientation strip */}
        <dl className="grid-editorial mt-20 gap-y-8 border-t border-line pt-6 md:mt-28">
          {content.meta.map((item) => (
            <div
              key={item.index}
              data-hero-fade
              style={HIDDEN}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <dt className="type-label flex items-baseline gap-3 text-faint">
                <span className="text-signal">{item.index}</span>
                {item.label}
              </dt>
              <dd className="type-body mt-3 max-w-[28ch] text-ink">{item.value}</dd>
            </div>
          ))}
          <p
            data-hero-fade
            style={HIDDEN}
            className="type-label col-span-12 self-end text-faint lg:col-span-3 lg:text-right"
          >
            Scroll
            <span aria-hidden="true" className="ml-2">
              ↓
            </span>
          </p>
        </dl>
      </div>

      <div className="mt-16 md:mt-24">
        <Marquee items={content.ticker} />
      </div>
    </section>
  );
}
