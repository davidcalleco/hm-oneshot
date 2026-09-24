import {
  MOTION_OK,
  duration,
  ease,
  gsap,
  registerMotion,
  revealShift,
  revealStart,
} from "@/lib/motion";

/**
 * Scroll reveal.
 *
 * Content renders visible. The hidden state is applied only after JS runs and
 * only when the visitor has not asked for reduced motion, so the page is
 * complete without scripts and stable for anyone who does not want movement.
 *
 * Elements already on screen (or behind us) at init are left alone — nothing
 * is hidden after the fact. Anything the viewport later skips past is released
 * by ScrollTrigger on refresh rather than left invisible, and anything that
 * receives focus is released immediately.
 */

/** Anything still waiting to be revealed, so a focus landing inside one can
 *  release it — a keyboard user must never be moved to a transparent element. */
const pending = new Map<HTMLElement, () => void>();
let focusBound = false;

function onFocusIn(event: FocusEvent): void {
  let node = event.target as HTMLElement | null;
  while (node) {
    pending.get(node)?.();
    node = node.parentElement;
  }
}

export function initReveal(): void {
  registerMotion();

  const mm = gsap.matchMedia();

  mm.add(MOTION_OK, () => {
    const elements =
      document.querySelectorAll<HTMLElement>("[data-reveal]");

    for (const el of elements) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;

      const delay = Number(el.dataset.revealDelay ?? 0);

      gsap.set(el, { opacity: 0, y: revealShift });

      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        delay,
        duration: duration.reveal,
        ease: ease.out,
        scrollTrigger: { trigger: el, start: revealStart, once: true },
      });

      pending.set(el, () => {
        pending.delete(el);
        tween.scrollTrigger?.kill();
        gsap.set(el, { opacity: 1, y: 0 });
      });

      tween.eventCallback("onComplete", () => pending.delete(el));
    }

    if (!focusBound && pending.size > 0) {
      focusBound = true;
      document.addEventListener("focusin", onFocusIn, true);
    }

    // If the visitor turns reduced motion on, matchMedia reverts the styles
    // above; the registry has to be dropped with them.
    return () => pending.clear();
  });
}
