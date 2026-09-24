import {
  MOTION_OK,
  duration,
  ease,
  gsap,
  registerMotion,
  stagger,
} from "@/lib/motion";

/**
 * The hero entrance.
 *
 * Each headline line rises out of its own overflow-hidden mask. The entrance
 * state ships as inline styles in the server-rendered HTML so the final frame
 * is never painted first; a `<noscript>` rule and a reduced-motion rule each
 * clear that state, so the hero can never be left hidden.
 */
export function initHero(): void {
  registerMotion();

  const mm = gsap.matchMedia();

  mm.add(MOTION_OK, () => {
    const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line] > span");
    const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
    const rule = document.querySelector<HTMLElement>("[data-hero-rule]");

    if (lines.length === 0) return;

    // These match the inline styles already in the server-rendered HTML, so
    // taking them over costs no repaint. `y: 0` is not redundant: GSAP parses
    // the rendered `translateY(110%)` into its own `y` cache as a pixel value,
    // and without clearing it that offset survives the tween.
    gsap.set(lines, { y: 0, yPercent: 110 });
    gsap.set(fades, { opacity: 0, y: 18 });
    gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({ defaults: { ease: ease.out } });

    tl.to(rule, { scaleX: 1, duration: duration.slow })
      .to(lines, { yPercent: 0, duration: 1.15, stagger: stagger.base }, "-=0.7")
      .to(
        fades,
        { opacity: 1, y: 0, duration: duration.reveal, stagger: stagger.tight },
        "-=0.85",
      );

    return () => tl.kill();
  });
}

initHero();
