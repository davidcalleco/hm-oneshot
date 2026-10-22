import { MOTION_OK, ScrollTrigger, ease, gsap, registerMotion } from "@/lib/motion";

/**
 * The capability ticker.
 *
 * A Web Animations loop, so the browser runs it on the compositor: an idle
 * page renders no main-thread frames for it. It still responds to
 * scrolling — it speeds up with scroll velocity and follows scroll
 * direction — through its playback rate, which GSAP eases back only while
 * that is happening. Pauses on hover and focus. The full list is also
 * rendered for screen readers, and under reduced motion it simply sits still.
 */
export class HmMarquee extends HTMLElement {
  #cleanup: (() => void) | null = null;

  connectedCallback(): void {
    registerMotion();

    const track = this.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const cycle = 44_000;
      const loop = track.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
        { duration: cycle, easing: "linear", iterations: Infinity },
      );
      // Start far into the loop, so that running it backwards never reaches
      // the start and finishes.
      loop.currentTime = cycle * 10_000;

      const rate = { value: 1 };
      const applyRate = () => {
        if (loop.playbackRate !== rate.value) loop.playbackRate = rate.value;
      };

      const clamp = gsap.utils.clamp(1, 4);
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = clamp(1 + Math.abs(self.getVelocity()) / 1800);
          rate.value = self.direction * boost;
          applyRate();
          gsap.to(rate, {
            value: self.direction,
            duration: 0.9,
            ease: ease.soft,
            overwrite: true,
            onUpdate: applyRate,
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
        gsap.killTweensOf(rate);
        loop.cancel();
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
