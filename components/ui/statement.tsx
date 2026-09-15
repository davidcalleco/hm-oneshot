import type { ElementType, ReactNode } from "react";
import type { Emphasised } from "@/lib/content";

/**
 * Wraps the emphasised word of a statement in the serif italic accent.
 * One word, never a whole clause — that is the rule the design system sets.
 */
export function emphasise(
  text: string,
  emphasis: string | undefined,
  accentClassName: string,
): ReactNode {
  if (!emphasis) return text;
  const at = text.indexOf(emphasis);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className={`type-serif ${accentClassName}`}>{emphasis}</span>
      {text.slice(at + emphasis.length)}
    </>
  );
}

export function Statement({
  as: Tag = "h2",
  value,
  size = "statement",
  accentClassName = "text-signal",
  className = "",
}: {
  as?: ElementType;
  value: Emphasised;
  size?: "statement" | "display" | "heading";
  accentClassName?: string;
  className?: string;
}) {
  return (
    <Tag className={`type-${size} ${className}`} data-hm-statement="">
      {emphasise(value.text, value.emphasis, accentClassName)}
    </Tag>
  );
}
