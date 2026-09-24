import { MOTION_OK, ScrollTrigger, ease, gsap, registerMotion } from "@/lib/motion";

/**
 * The capability ticker.
 *
 * Runs on GSAP's ticker rather than a CSS animation so it can respond to
 * scrolling: it speeds up with scroll velocity and follows scroll direction.
 * Pauses on hover and focus. The full list is also rendered for screen
 * readers, and under reduced motion it simply sits still.
 */
export class HmMarquee extends HTMLElement {
  #cleanup: (() => void) | null = null;

  connectedCallback(): void {
    registerMotion();

    const track = this.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 44,
        ease: "none",
        repeat: -1,
      });

      const clamp = gsap.utils.clamp(1, 4);
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = clamp(1 + Math.abs(self.getVelocity()) / 1800);
          loop.timeScale(self.direction * boost);
          gsap.to(loop, {
            timeScale: self.direction,
            duration: 0.9,
            ease: ease.soft,
            overwrite: true,
          });
        },
      });

      const pause = () => loop.pause();
      const play = () => loop.play();
      this.addEventListener("pointerenter", pause);
      this.addEventListener("pointerleave", play);
      this.addEventListener("focusin", pause);
      this.addEventListener("focusout", play);

      return () => {
        this.removeEventListener("pointerenter", pause);
        this.removeEventListener("pointerleave", play);
        this.removeEventListener("focusin", pause);
        this.removeEventListener("focusout", play);
        trigger.kill();
        loop.kill();
      };
    });

    this.#cleanup = () => mm.revert();
  }

  disconnectedCallback(): void {
    this.#cleanup?.();
    this.#cleanup = null;
  }
}

customElements.define("hm-marquee", HmMarquee);
