/** Homepage copy. Hero and studio positioning carried over unchanged. */

import type { Emphasised } from "./types";
import { capabilityNames } from "./making";

export const hero = {
  kicker: "Hello Machine — design, technology & the systems in between",
  lines: [
    "We design and build",
    "the systems ambitious",
    "companies actually run on.",
  ],
  emphasis: "actually",
  lede: "Strategy, digital design, websites, automation and AI, made by one team. We take the part of your business that is ambiguous and expensive to run, and turn it into something clear enough to use on an ordinary Tuesday.",
  actions: {
    primary: { href: "#contact", label: "Start a conversation" },
    secondary: { href: "#approach", label: "See how we work" },
  },
  meta: [
    { index: "01", label: "What we are", value: "A design-led technology studio" },
    {
      index: "02",
      label: "What we make",
      value: "Websites, tools, automation, AI systems",
    },
    {
      index: "03",
      label: "How we work",
      value: "Small team, senior hands, strategic from the first call",
    },
  ],
  ticker: capabilityNames,
};

export const studio = {
  index: "01",
  label: "The studio",
  statement: {
    text: "Most companies do not need more technology. They need someone who can hold the whole problem.",
    emphasis: "whole",
  } satisfies Emphasised,
  columns: [
    "The usual arrangement splits the work: a strategist writes the document, an agency designs the surface, a developer builds what was specified, and a separate vendor sells the AI. Everyone does their part competently and the result still fails to change how the business runs.",
    "Hello Machine is one team across all four. We sit close enough to the business to question the brief, close enough to the design to give it a point of view, and close enough to the code to know what it will cost. That is the whole proposition.",
  ],
  fields: [
    {
      label: "Business strategy",
      body: "What the company is trying to change, and which move is worth making first.",
    },
    {
      label: "Digital design",
      body: "Structure, language and art direction — the part people meet and judge.",
    },
    {
      label: "Engineering",
      body: "Websites, tools and integrations built to be maintained, not admired.",
    },
    {
      label: "AI & automation",
      body: "Applied where it genuinely beats the current process, and nowhere else.",
    },
  ],
  footnote: "Hello Machine works across all four — the overlap is the point",
};

/**
 * Fit guidance.
 *
 * Saying who we are not for is the fastest way to be believed by the people
 * we are for — and it saves both sides a call.
 */
export const fit = {
  index: "06",
  label: "Fit",
  statement: {
    text: "We are a good fit for some companies and a poor one for others.",
    emphasis: "poor one",
  } satisfies Emphasised,
  good: {
    heading: "This usually works",
    items: [
      "You have a business problem, not a technology shopping list",
      "You would rather hold one team accountable than coordinate three",
      "We can talk to the people who actually do the work",
      "You would rather hear “this will not help” than be sold to",
      "The decision to proceed sits with someone in the room",
    ],
  },
  poor: {
    heading: "This usually does not",
    items: [
      "You need a large delivery team, or bodies to augment your own",
      "You need a fixed build from a fixed spec with no room to question it",
      "AI adoption is the goal rather than the means",
      "You need guaranteed response times or round-the-clock support",
    ],
  },
  note: "If you are unsure which column you are in, that is worth a conversation rather than a guess.",
} as const;

/** Section furniture for the homepage's new previews. */
export const homeSections = {
  situations: {
    index: "01",
    label: "Situations",
    statement: {
      text: "Most work starts with one of these.",
    } satisfies Emphasised,
    intro:
      "Six situations we are usually called into. They are worth reading even if only one is yours — they tend to share a root cause.",
    cta: { href: "/situations", label: "Read the six situations" },
  },
  offers: {
    index: "02",
    label: "Ways to work",
    statement: {
      text: "Three ways to work together, depending on how defined the problem already is.",
      emphasis: "how defined",
    } satisfies Emphasised,
    intro:
      "The right first move differs depending on whether you are trying to understand something, build something, or keep something good.",
    cta: { href: "/ways-to-work", label: "Compare the three" },
  },
  making: {
    index: "03",
    label: "What we make",
    statement: {
      text: "Capabilities are ingredients. This is what they get combined into.",
      emphasis: "ingredients",
    } satisfies Emphasised,
    cta: { href: "/capabilities", label: "See what we make" },
  },
} as const;
