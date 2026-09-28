import { duration, ease, gsap, registerMotion } from "@/lib/motion";

/**
 * Site header.
 *
 * Owns two things: the condensed state on scroll, and the mobile panel.
 *
 * The active nav item is decided on the server via `aria-current="page"`, so
 * wayfinding survives without JavaScript. This only slides the pill to
 * whichever link already carries it.
 *
 * Visual state is published as `data-scrolled` / `data-open` on the host and
 * styled from the markup, so this file never assembles class strings.
 */
export class HmHeader extends HTMLElement {
  #onScroll: (() => void) | null = null;
  #onKey: ((event: KeyboardEvent) => void) | null = null;
  #onResize: (() => void) | null = null;

  connectedCallback(): void {
    registerMotion();

    const indicator = this.querySelector<HTMLElement>("[data-nav-indicator]");
    const toggle = this.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const panel = this.querySelector<HTMLElement>("[data-menu-panel]");
    const cta = this.querySelector<HTMLElement>("[data-header-cta]");

    /* Condensed state. Deliberately forced off while the mobile panel is
       open, so the scrolled and open styles are mutually exclusive and never
       have to out-specify each other in CSS. */
    const syncScrolled = () => {
      const open = this.dataset.open === "true";
      this.dataset.scrolled = String(!open && window.scrollY > 24);
    };
    this.#onScroll = syncScrolled;
    syncScrolled();
    window.addEventListener("scroll", this.#onScroll, { passive: true });

    /* Mobile panel */
    const setOpen = (open: boolean) => {
      this.dataset.open = String(open);
      syncScrolled();
      document.body.style.overflow = open ? "hidden" : "";
      toggle?.setAttribute("aria-expanded", String(open));
      if (toggle) toggle.textContent = open ? "Close" : "Menu";
      if (panel) panel.hidden = !open;
      // Hidden outright rather than just covered, so it cannot be reached
      // behind the overlay by keyboard.
      if (cta) cta.hidden = open;
    };

    toggle?.addEventListener("click", () => {
      setOpen(this.dataset.open !== "true");
    });

    panel?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    this.#onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && this.dataset.open === "true") setOpen(false);
    };
    window.addEventListener("keydown", this.#onKey);

    /* Slide the pill to whichever link the server marked current. */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const placeIndicator = (animate: boolean) => {
      if (!indicator) return;
      const current = this.querySelector<HTMLAnchorElement>(
        '[data-nav-link][aria-current="page"]',
      );

      if (!current || current.offsetParent === null) {
        gsap.set(indicator, { autoAlpha: 0 });
        return;
      }

      gsap.to(indicator, {
        x: current.offsetLeft,
        width: current.offsetWidth,
        autoAlpha: 1,
        duration: animate && !reduced ? duration.base : 0,
        ease: ease.out,
      });
    };

    placeIndicator(false);

    // The pill is positioned in pixels, so it has to be replaced on resize.
    this.#onResize = () => placeIndicator(false);
    window.addEventListener("resize", this.#onResize, { passive: true });

    // Web fonts land after first paint and change the link widths under it.
    document.fonts?.ready.then(() => placeIndicator(false));
  }

  disconnectedCallback(): void {
    if (this.#onScroll) window.removeEventListener("scroll", this.#onScroll);
    if (this.#onKey) window.removeEventListener("keydown", this.#onKey);
    if (this.#onResize) window.removeEventListener("resize", this.#onResize);
    document.body.style.overflow = "";
  }
}

customElements.define("hm-header", HmHeader);
