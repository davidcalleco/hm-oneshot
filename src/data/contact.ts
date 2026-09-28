/** Contact copy. The existing section is carried over unchanged; the
 *  qualification prompts below are new. */

import type { Emphasised } from "./types";

export const contact = {
  index: "06",
  label: "Contact",
  statement: {
    text: "Tell us what is not working yet.",
    emphasis: "yet",
  } satisfies Emphasised,
  lede: "The best first message is the messy one — the process nobody wants to own, the site that undersells you, the idea you have not been able to scope. Bring that.",
  nextHeading: "What happens next",
  next: [
    {
      index: "01",
      label: "A reply from a person",
      body: "Usually within a working day, from whoever would actually run the project.",
    },
    {
      index: "02",
      label: "A 40-minute conversation",
      body: "About the business and the problem. No deck, no discovery fee, no obligation.",
    },
    {
      index: "03",
      label: "A written read on it",
      body: "What we would do first, roughly what it costs, and whether we are the right studio for it.",
    },
  ],
};

/**
 * Qualification prompts.
 *
 * A structured first message rather than a form that only captures a name and
 * an email. The point is that the first conversation starts somewhere useful —
 * every field is optional and the whole thing degrades to a plain mailto.
 */
export const qualification = {
  heading: "Tell us enough to make the first conversation useful",
  note: "Every field is optional. Answer what you can — a couple of sentences beats a blank form.",
  intent: {
    label: "What would help most right now",
    name: "intent",
    options: [
      { value: "clarity", label: "Clarity and direction", hint: "The problem is real but the response is not obvious yet" },
      { value: "system", label: "A defined working system", hint: "We know roughly what needs to exist and need it built properly" },
      { value: "ongoing", label: "Ongoing improvement", hint: "Something is live and needs to keep getting better" },
      { value: "unsure", label: "Help deciding what we need", hint: "Genuinely not sure — that is a fine place to start" },
    ],
  },
  fields: [
    {
      name: "problem",
      label: "What is not working",
      hint: "The messy version is more useful than the tidy one.",
      rows: 4,
    },
    {
      name: "goal",
      label: "What you are trying to make, change or decide",
      hint: "Even if it is still a rough shape.",
      rows: 3,
    },
    {
      name: "affected",
      label: "Who it affects",
      hint: "Customers, a team, one person, the whole operation.",
      rows: 2,
    },
    {
      name: "tried",
      label: "What you have already tried",
      hint: "Including anything that did not work — that is genuinely useful.",
      rows: 3,
    },
    {
      name: "useful",
      label: "What would make the next step useful to you",
      hint: "A read on the problem, a scoped plan, a second opinion, a build.",
      rows: 2,
    },
  ],
  submit: "Open this in your email",
  fallback:
    "This composes an email in your own mail app — nothing is sent from this page and nothing is stored here.",
} as const;

export const contactPage = {
  index: "05",
  label: "Contact",
  statement: {
    text: "Tell us what is not working yet.",
    emphasis: "yet",
  } satisfies Emphasised,
  intro:
    "The best first message is the messy one — the process nobody wants to own, the site that undersells you, the idea you have not been able to scope. Bring that.",
} as const;
