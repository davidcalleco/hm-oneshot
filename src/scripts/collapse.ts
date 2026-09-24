import { duration, ease, gsap } from "@/lib/motion";

/**
 * Animate a disclosure region open or closed.
 *
 * Height is tweened rather than CSS-transitioned so a toggle mid-flight is
 * picked up from wherever the panel currently is instead of snapping. The
 * server renders the panel at its correct height already, so the first paint
 * is right without this running at all.
 */
export function setCollapsed(panel: HTMLElement, open: boolean): void {
  const to = { height: open ? "auto" : 0, opacity: open ? 1 : 0 };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(panel, to);
    return;
  }

  gsap.to(panel, {
    ...to,
    duration: duration.base,
    ease: ease.inOut,
    overwrite: true,
  });
}
