"use client";

import { useState } from "react";
import { capabilities } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function CapabilitiesList() {
  const [open, setOpen] = useState<string | null>(capabilities[0].index);
  const [hovered, setHovered] = useState<string | null>(null);

  // The meta column follows the pointer while browsing and falls back to the
  // open row at rest, so it never shows something unrelated to the list.
  const preview =
    capabilities.find((c) => c.index === (hovered ?? open)) ?? capabilities[0];

  return (
    <section
      id="capabilities"
      className="scroll-mt-28 border-t border-line bg-white py-24 md:py-36"
    >
      <div className="shell grid-editorial gap-y-12">
        {/* Meta column — mirrors the hovered row without being the only source */}
        <div className="col-span-12 md:col-span-4">
          <div className="md:sticky md:top-32">
            <Reveal>
              <p className="type-label text-faint">
                <span className="text-signal">02</span> &nbsp;/&nbsp; Capabilities
              </p>
              <h2 className="type-heading mt-6 max-w-[16ch]">
                Nine things we do, combined differently every time.
              </h2>
              <p className="type-body mt-5 max-w-[34ch]">
                Almost no project is only one of these. The mix is decided after we
                understand the problem, not before.
              </p>
            </Reveal>

            <div
              aria-hidden="true"
              className="mt-12 hidden border-t border-line pt-6 md:block"
            >
              <p className="type-label text-signal">{preview.index}</p>
              <p
                key={preview.index}
                className="type-body hm-rise mt-3 max-w-[30ch] text-ink"
              >
                {preview.blurb}
              </p>
            </div>
          </div>
        </div>

        {/* The list */}
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <ul
            className="border-t border-line"
            onMouseLeave={() => setHovered(null)}
          >
            {capabilities.map((capability, i) => {
              const isOpen = open === capability.index;
              return (
                <Reveal
                  as="li"
                  key={capability.index}
                  delay={Math.min(i * 40, 240)}
                  className="border-b border-line"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`capability-${capability.index}`}
                      onClick={() =>
                        setOpen(isOpen ? null : capability.index)
                      }
                      onMouseEnter={() => setHovered(capability.index)}
                      onFocus={() => setHovered(capability.index)}
                      onBlur={() => setHovered(null)}
                      className="group flex w-full items-baseline gap-5 py-6 text-left transition-colors duration-300 hover:text-signal md:gap-8"
                    >
                      <span className="type-label shrink-0 text-faint transition-colors duration-300 group-hover:text-signal">
                        {capability.index}
                      </span>
                      <span className="type-heading flex-1">
                        {capability.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`type-label shrink-0 text-faint transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`capability-${capability.index}`}
                    className={`grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="type-body max-w-[52ch] pb-8 pl-[3.25rem] md:pl-[4rem]">
                        {capability.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <p className="type-label mt-6 text-faint">
            Select a capability to read more
          </p>
        </div>
      </div>
    </section>
  );
}
