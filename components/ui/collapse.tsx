"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { useGSAP } from "@gsap/react";
import { duration, ease, gsap, registerMotion } from "@/lib/motion";

registerMotion();

/**
 * An animated disclosure region.
 *
 * Height is tweened rather than CSS-transitioned so a toggle mid-flight is
 * picked up from wherever the panel currently is instead of snapping. Renders
 * at its correct height on the server, and jumps rather than animates when
 * motion is reduced.
 *
 * `as="span"` is available because one caller lives inside a <button>, where
 * a <div> would be invalid markup.
 */
export function Collapse({
  open,
  id,
  as: Tag = "div",
  className = "",
  children,
}: {
  open: boolean;
  /** Target for the controlling button's aria-controls. */
  id?: string;
  as?: "div" | "span";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const to = { height: open ? "auto" : 0, opacity: open ? 1 : 0 };

      if (reduced) {
        gsap.set(el, to);
        return;
      }

      gsap.to(el, {
        ...to,
        duration: duration.base,
        ease: ease.inOut,
        overwrite: true,
      });
    },
    { dependencies: [open] },
  );

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement & HTMLSpanElement>}
      id={id}
      className={`block overflow-hidden ${className}`}
      style={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
    >
      {children}
    </Tag>
  );
}
