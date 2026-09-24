import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

/**
 * One motion system.
 *
 * Every easing curve, duration and stagger used anywhere on the site is
 * declared here. Sections never invent their own — if a value is missing,
 * add it here rather than inlining a number at the call site.
 */

let registered = false;

export function registerMotion() {
  if (registered || typeof window === "undefined") return;
  registered = true;

  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Named curves so the same feel is reachable from CSS and GSAP alike.
  CustomEase.create("hm-out", "0.16, 1, 0.3, 1");
  CustomEase.create("hm-in-out", "0.83, 0, 0.17, 1");
  CustomEase.create("hm-soft", "0.33, 1, 0.68, 1");

  gsap.defaults({ ease: "hm-out", duration: 0.6 });
}

export const ease = {
  out: "hm-out",
  inOut: "hm-in-out",
  soft: "hm-soft",
} as const;

export const duration = {
  fast: 0.32,
  base: 0.6,
  slow: 0.9,
  reveal: 1.05,
  stage: 1.15,
} as const;

export const stagger = {
  tight: 0.055,
  base: 0.085,
  loose: 0.12,
} as const;

/** Where a scroll-triggered reveal begins, in ScrollTrigger syntax. */
export const revealStart = "top 88%";

/** Distance travelled by a reveal, in pixels. Small on purpose. */
export const revealShift = 26;

/** True when the visitor has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger };
