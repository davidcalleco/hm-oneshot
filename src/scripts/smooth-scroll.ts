import Lenis from "lenis";
import { ScrollTrigger, registerMotion } from "@/lib/motion";

/**
 * Smooth scrolling.
 *
 * Lenis runs on its own requestAnimationFrame loop rather than GSAP's ticker.
 * Astro bundles each component's <script> separately, so a ticker registered
 * from one bundle is not guaranteed to be the same instance the rest of the
 * page uses — and when it is not, Lenis simply never advances. Its own loop
 * has no such coupling. ScrollTrigger stays in step through the scroll event
 * below, which fires on every frame Lenis moves.
 *
 * Lenis rather than GSAP's own ScrollSmoother: ScrollSmoother transforms a
 * wrapper element, which breaks `position: sticky` — and the work index stage
 * depends on sticky. Lenis leaves native scroll intact.
 *
 * Disabled outright under reduced motion, where the browser's own instant
 * scrolling is the correct behaviour.
 */
export function initSmoothScroll(): void {
  registerMotion();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lenis = new Lenis({
    duration: 1.05,
    // Exponential ease-out: quick to respond, long and quiet to settle.
    easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // In-page links are handled here rather than by Lenis's own `anchors`
  // option, so that the URL still updates. The distance kept from the fixed
  // header comes from each section's own `scroll-mt-*`, which Lenis honours
  // and which is also what the browser uses when JS is unavailable — so there
  // is no second offset to keep in sync here.
  document.addEventListener("click", (event: MouseEvent) => {
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
  });

  // Fonts and images settle after first paint and move every trigger.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh);
}
