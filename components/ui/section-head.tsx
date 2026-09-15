import type { ReactNode } from "react";
import type { Emphasised } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";

/**
 * The opening of a section: mono label in the left columns, statement and
 * supporting text in the right. Every section uses this so the entry rhythm
 * stays identical down the page.
 */
export function SectionHead({
  index,
  label,
  statement,
  intro,
  size = "statement",
  invert = false,
  statementClassName = "max-w-[19ch]",
  children,
}: {
  index: string;
  label: string;
  statement: Emphasised;
  intro?: string;
  size?: "statement" | "display";
  invert?: boolean;
  statementClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className="grid-editorial gap-y-8">
      <div className="col-span-12 md:col-span-4">
        <Reveal>
          <SectionLabel index={index} label={label} invert={invert} />
        </Reveal>
      </div>

      <div className="col-span-12 md:col-span-8">
        <Reveal>
          <Statement
            value={statement}
            size={size}
            accentClassName={invert ? "text-signal-invert" : "text-signal"}
            className={`${statementClassName} ${invert ? "text-white" : ""}`}
          />
        </Reveal>

        {intro ? (
          <Reveal delay={0.08}>
            <p
              className={`type-body mt-6 max-w-[56ch] ${invert ? "text-body-invert" : ""}`}
            >
              {intro}
            </p>
          </Reveal>
        ) : null}

        {children}
      </div>
    </div>
  );
}
