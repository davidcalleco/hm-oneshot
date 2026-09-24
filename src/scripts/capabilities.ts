import { duration, ease, gsap, registerMotion } from "@/lib/motion";
import { setCollapsed } from "./collapse";

/**
 * The capability index.
 *
 * Rows expand on click. The meta column follows the pointer while browsing and
 * falls back to the open row at rest, so it never shows something unrelated to
 * the list — and because it is decorative (`aria-hidden`), every row still
 * carries its own detail.
 */
export class HmCapabilities extends HTMLElement {
  #cleanup: (() => void) | null = null;

  connectedCallback(): void {
    registerMotion();

    const rows = [...this.querySelectorAll<HTMLButtonElement>("[data-capability]")];
    const list = this.querySelector<HTMLElement>("[data-capability-list]");
    const previewIndex = this.querySelector<HTMLElement>("[data-preview-index]");
    const previewBlurb = this.querySelector<HTMLElement>("[data-preview-blurb]");

    let open: string | null = this.dataset.defaultOpen ?? null;
    let hovered: string | null = null;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const renderPreview = () => {
      const key = hovered ?? open;
      const row = rows.find((r) => r.dataset.capability === key);
      if (!row || !previewIndex || !previewBlurb) return;

      const nextIndex = row.dataset.capability ?? "";
      const nextBlurb = row.dataset.blurb ?? "";
      if (previewBlurb.textContent === nextBlurb) return;

      previewIndex.textContent = nextIndex;
      previewBlurb.textContent = nextBlurb;

      if (reduced.matches) return;

      gsap.fromTo(
        previewBlurb,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: duration.fast, ease: ease.out },
      );
    };

    const setOpen = (key: string | null) => {
      open = key;
      for (const row of rows) {
        const isOpen = row.dataset.capability === key;
        const panel = document.getElementById(
          row.getAttribute("aria-controls") ?? "",
        );
        row.setAttribute("aria-expanded", String(isOpen));
        if (panel) setCollapsed(panel, isOpen);
      }
      renderPreview();
    };

    for (const row of rows) {
      row.addEventListener("click", () => {
        setOpen(row.getAttribute("aria-expanded") === "true" ? null : row.dataset.capability!);
      });
      row.addEventListener("mouseenter", () => {
        hovered = row.dataset.capability ?? null;
        renderPreview();
      });
      row.addEventListener("focus", () => {
        hovered = row.dataset.capability ?? null;
        renderPreview();
      });
      row.addEventListener("blur", () => {
        hovered = null;
        renderPreview();
      });
    }

    const clearHover = () => {
      hovered = null;
      renderPreview();
    };
    list?.addEventListener("mouseleave", clearHover);

    this.#cleanup = () => {
      list?.removeEventListener("mouseleave", clearHover);
    };
  }

  disconnectedCallback(): void {
    this.#cleanup?.();
    this.#cleanup = null;
  }
}

customElements.define("hm-capabilities", HmCapabilities);
