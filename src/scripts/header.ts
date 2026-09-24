import { ScrollTrigger, duration, ease, gsap, registerMotion } from "@/lib/motion";

/**
 * Site header.
 *
 * Owns three things: the condensed state on scroll, the mobile panel, and the
 * pill that tracks which section the reader is in. The pill is wayfinding, not
 * decoration — the active link also carries `aria-current` for anyone who is
 * not watching it move.
 *
 * Visual state is published as `data-scrolled` / `data-open` on the host and
 * styled from the markup, so this file never assembles class strings.
 */
export class HmHeader extends HTMLElement {
  #triggers: ScrollTrigger[] = [];
  #onScroll: (() => void) | null = null;
  #onKey: ((event: KeyboardEvent) => void) | null = null;

  connectedCallback(): void {
    registerMotion();

    const nav = this.querySelector<HTMLElement>("[data-nav]");
    const indicator = this.querySelector<HTMLElement>("[data-nav-indicator]");
    const links = [...this.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")];
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

    /* Section tracking */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setActive = (index: number) => {
      links.forEach((link, i) => {
        if (i === index) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });

      if (!indicator || !nav) return;
      const link = links[index];

      if (!link) {
        gsap.to(indicator, {
          autoAlpha: 0,
          duration: reduced ? 0 : duration.fast,
          ease: ease.out,
        });
        return;
      }

      gsap.to(indicator, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        autoAlpha: 1,
        duration: reduced ? 0 : duration.base,
        ease: ease.out,
      });
    };

    this.#triggers = links.map((link, i) =>
      ScrollTrigger.create({
        trigger: link.getAttribute("href") ?? undefined,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      }),
    );

    this.#triggers.push(
      ScrollTrigger.create({
        trigger: "#top",
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(-1);
        },
      }),
    );
  }

  disconnectedCallback(): void {
    if (this.#onScroll) window.removeEventListener("scroll", this.#onScroll);
    if (this.#onKey) window.removeEventListener("keydown", this.#onKey);
    this.#triggers.forEach((trigger) => trigger.kill());
    this.#triggers = [];
    document.body.style.overflow = "";
  }
}

customElements.define("hm-header", HmHeader);
