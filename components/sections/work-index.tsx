"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import type { work as workContent } from "@/lib/content";
import { Artwork } from "@/components/media/artwork";
import { Reveal } from "@/components/motion/reveal";
import { Collapse } from "@/components/ui/collapse";
import { SectionHead } from "@/components/ui/section-head";
import { Tag } from "@/components/ui/tag";
import { MOTION_OK, duration, ease, gsap, registerMotion } from "@/lib/motion";

registerMotion();

/**
 * The work index.
 *
 * A browsable list of applications paired with a single media stage. Pointer,
 * keyboard and touch all drive the same state: hovering or focusing a row
 * selects it; tapping selects it. Nothing essential lives in the stage — each
 * row carries its own description — so the artwork can stay decorative and the
 * list remains completely usable with images, hover or motion unavailable.
 */
export function WorkIndex({ content }: { content: typeof workContent }) {
  const projects = content.projects;
  const [active, setActive] = useState(0);

  const section = useRef<HTMLElement>(null);
  const parallax = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const meta = useRef<HTMLDivElement>(null);
  const previous = useRef(0);

  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);

  const current = projects[active];

  /* Stage: a directional wipe rather than a crossfade. The incoming artwork
     is uncovered from the side the selection travelled, so the movement of
     the list and the movement of the image agree. */
  useGSAP(
    () => {
      const from = previous.current;
      previous.current = active;
      if (from === active) return;

      const incoming = layers.current[active];
      const outgoing = layers.current[from];
      if (!incoming) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(layers.current.filter(Boolean), { autoAlpha: 0, zIndex: 0 });
        gsap.set(incoming, { autoAlpha: 1, zIndex: 2, clipPath: "none", scale: 1 });
        return;
      }

      const forwards = active > from;

      gsap.set(incoming, {
        zIndex: 2,
        autoAlpha: 1,
        scale: 1.06,
        clipPath: forwards ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      });
      gsap.set(outgoing, { zIndex: 1 });

      const tl = gsap.timeline();
      tl.to(incoming, {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: duration.stage,
        ease: ease.inOut,
      }).to(
        outgoing,
        {
          scale: 1.05,
          autoAlpha: 0,
          duration: duration.stage * 0.7,
          ease: ease.out,
        },
        0,
      );
    },
    { dependencies: [active] },
  );

  /* Stage meta cross-fade, keyed to the same change. */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        meta.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: duration.fast, ease: ease.out },
      );
    },
    { dependencies: [active] },
  );

  /* Pointer parallax, damped. quickTo keeps a single tween alive and retargets
     it, which is what makes the stage feel weighted rather than twitchy. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        moveX.current = gsap.quickTo(parallax.current, "x", {
          duration: 0.9,
          ease: "power3",
        });
        moveY.current = gsap.quickTo(parallax.current, "y", {
          duration: 0.9,
          ease: "power3",
        });

        // A slow drift while the stage is pinned, so it is never quite static.
        const drift = gsap.to(parallax.current, {
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        return () => {
          moveX.current = null;
          moveY.current = null;
          drift.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  const onPointerMove = useCallback((event: React.MouseEvent) => {
    const el = section.current;
    if (!el || !moveX.current || !moveY.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    moveX.current(-x * 22);
    moveY.current(-y * 16);
  }, []);

  const onPointerLeave = useCallback(() => {
    moveX.current?.(0);
    moveY.current?.(0);
  }, []);

  return (
    <section
      id="work"
      ref={section}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      className="scroll-mt-28 border-t border-line py-24 md:py-36"
    >
      <div className="shell">
        <div className="pb-14 md:pb-20">
          <SectionHead
            index={content.index}
            label={content.label}
            statement={content.statement}
            intro={content.intro}
            statementClassName="max-w-[18ch]"
          />
        </div>

        <div className="grid-editorial gap-y-10">
          {/* Stage — decorative; every fact also lives in the list */}
          <div className="col-span-12 hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 w-full overflow-hidden border border-line bg-cream">
                <div ref={parallax} className="absolute inset-[-16px]">
                  {projects.map((project, i) => (
                    <div
                      key={project.id}
                      ref={(node) => {
                        layers.current[i] = node;
                      }}
                      aria-hidden="true"
                      className={`absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
                    >
                      <Artwork id={project.artwork} tone={project.tone} />
                    </div>
                  ))}
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 border border-white/10"
                />
              </div>

              {/* Stage meta */}
              <div
                ref={meta}
                aria-hidden="true"
                className="mt-4 flex items-baseline justify-between border-t border-line pt-4"
              >
                <p className="type-label text-ink">
                  <span className="text-signal">{current.index}</span>
                  <span className="text-faint"> / 0{projects.length}</span>
                </p>
                <p className="type-label max-w-[22ch] text-right text-faint">
                  {current.disciplines.join(" · ")}
                </p>
              </div>

              <div aria-hidden="true" className="mt-4 flex gap-1">
                {projects.map((project, i) => (
                  <span
                    key={project.id}
                    className={`h-px flex-1 origin-left transition-colors duration-500 ${
                      i === active ? "bg-signal" : "bg-line-strong"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* The index */}
          <ol className="col-span-12 border-t border-line lg:col-span-6 lg:col-start-7">
            {projects.map((project, i) => {
              const isActive = i === active;
              return (
                <Reveal as="li" key={project.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group block w-full cursor-pointer py-7 text-left md:py-9"
                  >
                    <span className="flex items-baseline gap-5 md:gap-7">
                      <span
                        className={`type-label shrink-0 transition-colors duration-500 ${
                          isActive ? "text-signal" : "text-faint"
                        }`}
                      >
                        {project.index}
                      </span>
                      <span
                        className={`type-heading block flex-1 transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "translate-x-0 opacity-100 lg:translate-x-2"
                            : "translate-x-0 opacity-100 lg:opacity-45"
                        }`}
                      >
                        {project.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`type-label shrink-0 transition-all duration-500 ${
                          isActive
                            ? "translate-x-0 text-signal opacity-100"
                            : "-translate-x-2 opacity-0"
                        }`}
                      >
                        →
                      </span>
                    </span>

                    {/* Premise is always visible: the list reads on its own */}
                    <span className="type-body mt-3 block max-w-[46ch] pl-10 text-[0.9375rem] md:pl-[3.25rem]">
                      {project.premise}
                    </span>

                    <Collapse as="span" open={isActive}>
                      <span className="block pt-5 pl-10 md:pl-[3.25rem]">
                        {/* Inline artwork for touch and narrow screens */}
                        <span className="mb-5 block aspect-16/10 w-full overflow-hidden border border-line lg:hidden">
                          <Artwork id={project.artwork} tone={project.tone} />
                        </span>
                        <span className="type-body block max-w-[52ch]">
                          {project.summary}
                        </span>
                        <span className="mt-5 flex flex-wrap gap-2">
                          {project.disciplines.map((discipline) => (
                            <Tag key={discipline}>{discipline}</Tag>
                          ))}
                        </span>
                      </span>
                    </Collapse>
                  </button>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-10">
          <p className="type-label max-w-[60ch] text-faint">{content.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
