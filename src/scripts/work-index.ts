import { MOTION_OK, duration, ease, gsap, registerMotion } from "@/lib/motion";
import { setCollapsed } from "./collapse";

/**
 * The work index.
 *
 * A browsable list of applications paired with a single media stage. Pointer,
 * keyboard and touch all drive the same state: hovering or focusing a row
 * selects it; tapping selects it. Nothing essential lives in the stage — each
 * row carries its own description — so the artwork can stay decorative and the
 * list remains completely usable with images, hover or motion unavailable.
 */
export class HmWorkIndex extends HTMLElement {
  #cleanup: (() => void) | null = null;

  connectedCallback(): void {
    registerMotion();

    const rows = [...this.querySelectorAll<HTMLButtonElement>("[data-project]")];
    const layers = [...this.querySelectorAll<HTMLElement>("[data-stage-layer]")];
    const ticks = [...this.querySelectorAll<HTMLElement>("[data-stage-tick]")];
    const parallax = this.querySelector<HTMLElement>("[data-stage-parallax]");
    const meta = this.querySelector<HTMLElement>("[data-stage-meta]");
    const metaIndex = this.querySelector<HTMLElement>("[data-stage-index]");
    const metaDisciplines = this.querySelector<HTMLElement>("[data-stage-disciplines]");

    if (rows.length === 0) return;

    let active = 0;
    let moveX: ((value: number) => void) | null = null;
    let moveY: ((value: number) => void) | null = null;

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setActive = (next: number) => {
      if (next === active) return;
      const previous = active;
      active = next;

      /* Rows */
      rows.forEach((row, i) => {
        const isActive = i === next;
        if (isActive) row.setAttribute("aria-current", "true");
        else row.removeAttribute("aria-current");

        const panel = row.querySelector<HTMLElement>("[data-project-detail]");
        if (panel) setCollapsed(panel, isActive);
      });

      /* Ticks */
      ticks.forEach((tick, i) => {
        tick.dataset.active = String(i === next);
      });

      /* Stage meta */
      const row = rows[next];
      if (metaIndex) metaIndex.textContent = row.dataset.index ?? "";
      if (metaDisciplines) {
        metaDisciplines.textContent = row.dataset.disciplines ?? "";
      }
      if (meta && !reduced()) {
        gsap.fromTo(
          meta,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: duration.fast, ease: ease.out },
        );
      }

      /* Stage: a directional wipe rather than a crossfade. The incoming
         artwork is uncovered from the side the selection travelled, so the
         movement of the list and the movement of the image agree. */
      const incoming = layers[next];
      const outgoing = layers[previous];
      if (!incoming) return;

      if (reduced()) {
        gsap.set(layers, { autoAlpha: 0, zIndex: 0 });
        gsap.set(incoming, {
          autoAlpha: 1,
          zIndex: 2,
          clipPath: "none",
          scale: 1,
        });
        return;
      }

      const forwards = next > previous;

      gsap.set(incoming, {
        zIndex: 2,
        autoAlpha: 1,
        scale: 1.06,
        clipPath: forwards ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      });
      gsap.set(outgoing, { zIndex: 1 });

      gsap
        .timeline()
        .to(incoming, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: duration.stage,
          ease: ease.inOut,
        })
        .to(
          outgoing,
          {
            scale: 1.05,
            autoAlpha: 0,
            duration: duration.stage * 0.7,
            ease: ease.out,
          },
          0,
        );
    };

    rows.forEach((row, i) => {
      row.addEventListener("mouseenter", () => setActive(i));
      row.addEventListener("focus", () => setActive(i));
      row.addEventListener("click", () => setActive(i));
    });

    /* Pointer parallax, damped. quickTo keeps a single tween alive and
       retargets it, which is what makes the stage feel weighted rather than
       twitchy. */
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      if (!parallax) return;

      moveX = gsap.quickTo(parallax, "x", { duration: 0.9, ease: "power3" });
      moveY = gsap.quickTo(parallax, "y", { duration: 0.9, ease: "power3" });

      // A slow drift while the stage is pinned, so it is never quite static.
      const drift = gsap.to(parallax, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: this,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      return () => {
        moveX = null;
        moveY = null;
        drift.kill();
      };
    });

    const onPointerMove = (event: MouseEvent) => {
      if (!moveX || !moveY) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const rect = this.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      moveX(-x * 22);
      moveY(-y * 16);
    };

    const onPointerLeave = () => {
      moveX?.(0);
      moveY?.(0);
    };

    this.addEventListener("mousemove", onPointerMove);
    this.addEventListener("mouseleave", onPointerLeave);

    this.#cleanup = () => {
      this.removeEventListener("mousemove", onPointerMove);
      this.removeEventListener("mouseleave", onPointerLeave);
      mm.revert();
    };
  }

  disconnectedCallback(): void {
    this.#cleanup?.();
    this.#cleanup = null;
  }
}

customElements.define("hm-work-index", HmWorkIndex);
