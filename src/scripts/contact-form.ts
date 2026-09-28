/**
 * The qualification form.
 *
 * Composes a structured email in the visitor's own mail client. Nothing is
 * sent from the page and nothing is stored here, which is both the honest
 * arrangement for a static site and the one that needs no privacy notice.
 *
 * The form is progressive: the email address is a plain link above it, so a
 * visitor without JavaScript still has a working path.
 */
export class HmContactForm extends HTMLElement {
  #onSubmit: ((event: SubmitEvent) => void) | null = null;

  connectedCallback(): void {
    const form = this.querySelector("form");
    const email = this.dataset.email;
    if (!form || !email) return;

    // Only enable the composed path once we know the script is running.
    form.hidden = false;
    const fallback = this.querySelector<HTMLElement>("[data-form-fallback]");
    if (fallback) fallback.hidden = true;

    this.#onSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const data = new FormData(form);

      const intentField = form.querySelector<HTMLInputElement>(
        'input[name="intent"]:checked',
      );
      const intent = intentField?.dataset.label ?? "";

      const lines: string[] = [];
      if (intent) lines.push(`What would help most: ${intent}`, "");

      for (const field of form.querySelectorAll<HTMLTextAreaElement>("textarea")) {
        const value = String(data.get(field.name) ?? "").trim();
        if (!value) continue;
        const label = field.dataset.label ?? field.name;
        lines.push(`${label}`, value, "");
      }

      if (lines.length === 0) {
        lines.push("(No details filled in — happy to start from scratch.)");
      }

      const subject = intent
        ? `Hello Machine — ${intent}`
        : "Hello Machine — starting a conversation";

      const href =
        `mailto:${email}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(lines.join("\n"))}`;

      // Opened through a real link rather than by assigning location, so the
      // browser treats it as a user-initiated mail action and modifier-clicks
      // behave normally. The href is left in place afterwards, which also
      // makes the composed message inspectable.
      let link = this.querySelector<HTMLAnchorElement>("[data-mailto]");
      if (!link) {
        link = document.createElement("a");
        link.setAttribute("data-mailto", "");
        link.hidden = true;
        this.appendChild(link);
      }
      link.href = href;
      link.click();
    };

    form.addEventListener("submit", this.#onSubmit);
  }

  disconnectedCallback(): void {
    if (this.#onSubmit) {
      this.querySelector("form")?.removeEventListener("submit", this.#onSubmit);
    }
    this.#onSubmit = null;
  }
}

customElements.define("hm-contact-form", HmContactForm);
