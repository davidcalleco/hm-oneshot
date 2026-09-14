"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Artwork } from "@/components/artwork";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";

/**
 * The work index.
 *
 * A browsable list of applications paired with a single media stage. Pointer,
 * keyboard and touch all drive the same state: hovering or focusing a row
 * selects it; tapping selects it. Nothing essential lives in the stage — each
 * row carries its own description — so the artwork can stay decorative and the
 * list remains completely usable with images, hover or motion unavailable.
 */
export function WorkIndex() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Subtle stage parallax. Bounded to a few pixels — this reacts to the visitor
  // rather than performing for them.
  const onPointerMove = useCallback((event: React.MouseEvent) => {
    const el = sectionRef.current;
    const target = parallaxRef.current;
    if (!el || !target || reducedRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.transform = `translate3d(${(-x * 18).toFixed(2)}px, ${(-y * 14).toFixed(2)}px, 0)`;
  }, []);

  const onPointerLeave = useCallback(() => {
    if (parallaxRef.current) parallaxRef.current.style.transform = "";
  }, []);

  const current = projects[active];

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      className="scroll-mt-28 border-t border-line py-24 md:py-36"
    >
      <div className="shell">
        {/* Section head */}
        <div className="grid-editorial gap-y-8 pb-14 md:pb-20">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="type-label text-faint">
                <span className="text-signal">03</span> &nbsp;/&nbsp; Work
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Reveal as="h2" className="type-statement max-w-[18ch]">
              Six shapes of problem we are built to take on.
            </Reveal>
            <Reveal delay={80}>
              <p className="type-body mt-6 max-w-[56ch]">
                These are applications rather than case studies. Client work is
                shared privately and under permission, so instead of inventing
                logos and numbers, here is the honest version: the situations we
                are usually called into, and what we build in response.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid-editorial gap-y-10">
          {/* Stage — decorative; every fact also lives in the list */}
          <div className="col-span-12 hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div
                ref={stageRef}
                className="relative aspect-4/5 w-full overflow-hidden border border-line bg-cream"
              >
                <div ref={parallaxRef} className="absolute inset-[-14px] transition-transform duration-700 ease-out">
                  {projects.map((project, i) => (
                    <div
                      key={project.id}
                      aria-hidden="true"
                      className={`absolute inset-0 transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        i === active
                          ? "z-10 scale-100 opacity-100 blur-0"
                          : "z-0 scale-[1.04] opacity-0 blur-[2px]"
                      }`}
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
                aria-hidden="true"
                className="mt-4 flex items-baseline justify-between border-t border-line pt-4"
              >
                <p className="type-label text-ink">
                  <span className="text-signal">{current.index}</span>
                  <span className="text-faint"> / 06</span>
                </p>
                <p className="type-label max-w-[22ch] text-right text-faint">
                  {current.disciplines.join(" · ")}
                </p>
              </div>
              <div aria-hidden="true" className="mt-4 flex gap-1">
                {projects.map((project, i) => (
                  <span
                    key={project.id}
                    className={`h-px flex-1 transition-colors duration-500 ${
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
                <Reveal
                  as="li"
                  key={project.id}
                  delay={Math.min(i * 50, 250)}
                  className="border-b border-line"
                >
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
                        className={`type-heading block flex-1 transition-[transform,color,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "translate-x-0 text-ink opacity-100 lg:translate-x-2"
                            : "translate-x-0 text-ink opacity-100 lg:opacity-45"
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

                    {/* Detail opens for the selected item */}
                    <span
                      className={`grid transition-[grid-template-rows] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <span className="overflow-hidden">
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
                              <span
                                key={discipline}
                                className="type-label rounded-full border border-line-strong px-3 py-1.5 text-body"
                              >
                                {discipline}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-10">
          <p className="type-label max-w-[60ch] text-faint">
            Conceptual applications — illustrative of the studio&rsquo;s practice.
            No client names, results or testimonials are shown on this site
            without permission.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
