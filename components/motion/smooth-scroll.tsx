"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, gsap, registerMotion } from "@/lib/motion";

/**
 * Smooth scrolling, driven by Lenis on GSAP's ticker so scroll position and
 * ScrollTrigger never drift apart.
 *
 * Lenis rather than GSAP's own ScrollSmoother: ScrollSmoother transforms a
 * wrapper element, which breaks `position: sticky` — and the work index stage
 * depends on sticky. Lenis leaves native scroll intact.
 *
 * Disabled outright under reduced motion, where the browser's own instant
 * scrolling is the correct behaviour.
 */
export function SmoothScroll() {
  useEffect(() => {
    registerMotion();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: quick to respond, long and quiet to settle.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // In-page links are handled here rather than by Lenis's own `anchors`
    // option, so that the URL still updates. The distance kept from the fixed
    // header comes from each section's own `scroll-mt-*`, which Lenis honours
    // and which is also what the browser uses when JS is unavailable — so
    // there is no second offset to keep in sync here.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement);
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fonts and images settle after first paint and move every trigger.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
