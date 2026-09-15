"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import type { capabilities as capabilitiesContent } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { Collapse } from "@/components/ui/collapse";
import { SectionLabel } from "@/components/ui/section-label";
import { MOTION_OK, duration, ease, gsap, registerMotion } from "@/lib/motion";

registerMotion();

export function Capabilities({
  content,
}: {
  content: typeof capabilitiesContent;
}) {
  const items = content.items;
  const [open, setOpen] = useState<string | null>(items[0].index);
  const [hovered, setHovered] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const blurbRef = useRef<HTMLParagraphElement>(null);

  // The meta column follows the pointer while browsing and falls back to the
  // open row at rest, so it never shows something unrelated to the list.
  const preview = items.find((c) => c.index === (hovered ?? open)) ?? items[0];

  // Cross-fade the meta blurb whenever it changes.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          blurbRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: duration.fast, ease: ease.out },
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [preview.index] },
  );

  return (
    <section
      id="capabilities"
      ref={root}
      className="scroll-mt-28 border-t border-line bg-white py-24 md:py-36"
    >
      <div className="shell grid-editorial gap-y-12">
        {/* Meta column — mirrors the hovered row without being the only source */}
        <div className="col-span-12 md:col-span-4">
          <div className="md:sticky md:top-32">
            <Reveal>
              <SectionLabel index={content.index} label={content.label} />
              <h2 className="type-heading mt-6 max-w-[16ch]">{content.heading}</h2>
              <p className="type-body mt-5 max-w-[34ch]">{content.blurb}</p>
            </Reveal>

            <div
              aria-hidden="true"
              className="mt-12 hidden border-t border-line pt-6 md:block"
            >
              <p className="type-label text-signal">{preview.index}</p>
              <p ref={blurbRef} className="type-body mt-3 max-w-[30ch] text-ink">
                {preview.blurb}
              </p>
            </div>
          </div>
        </div>

        {/* The list */}
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <ul className="border-t border-line" onMouseLeave={() => setHovered(null)}>
            {items.map((capability) => (
              <Reveal as="li" key={capability.index} className="border-b border-line">
                <CapabilityRow
                  capability={capability}
                  isOpen={open === capability.index}
                  onToggle={() =>
                    setOpen(open === capability.index ? null : capability.index)
                  }
                  onPreview={setHovered}
                />
              </Reveal>
            ))}
          </ul>

          <p className="type-label mt-6 text-faint">{content.hint}</p>
        </div>
      </div>
    </section>
  );
}

function CapabilityRow({
  capability,
  isOpen,
  onToggle,
  onPreview,
}: {
  capability: (typeof capabilitiesContent)["items"][number];
  isOpen: boolean;
  onToggle: () => void;
  onPreview: (index: string | null) => void;
}) {
  return (
    <>
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`capability-${capability.index}`}
          onClick={onToggle}
          onMouseEnter={() => onPreview(capability.index)}
          onFocus={() => onPreview(capability.index)}
          onBlur={() => onPreview(null)}
          className="group flex w-full items-baseline gap-5 py-6 text-left transition-colors duration-300 hover:text-signal md:gap-8"
        >
          <span className="type-label shrink-0 text-faint transition-colors duration-300 group-hover:text-signal">
            {capability.index}
          </span>
          <span className="type-heading flex-1">{capability.name}</span>
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

      <Collapse open={isOpen} id={`capability-${capability.index}`}>
        <p className="type-body max-w-[52ch] pb-8 pl-[3.25rem] md:pl-[4rem]">
          {capability.detail}
        </p>
      </Collapse>
    </>
  );
}
