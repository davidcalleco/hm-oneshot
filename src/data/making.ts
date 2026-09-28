/**
 * What we make, the four disciplines behind it, and the nine capabilities.
 *
 * The capability list and the discipline copy are carried over unchanged from
 * the approved site — this module only adds the outputs layer above them.
 */

import type { Emphasised } from "./types";

/** Short labels for the capability ticker — deliberately not the long
 *  capability names, which are too long to read while moving. */
export const capabilityNames = [
  "Digital strategy",
  "Websites",
  "AI systems",
  "Automation",
  "Custom tools",
  "Product design",
  "Service design",
  "Knowledge systems",
  "Experimentation",
];

type Capability = {
  index: string;
  name: string;
  blurb: string;
  detail: string;
};

export const capabilities = {
  index: "02",
  label: "Capabilities",
  heading: "Nine things we do, combined differently every time.",
  blurb:
    "Almost no project is only one of these. The mix is decided after we understand the problem, not before.",
  hint: "Select a capability to read more",
  items: [
    {
      index: "01",
      name: "Digital strategy",
      blurb: "Deciding what is worth building before anyone builds it.",
      detail:
        "We start where the ambiguity is: what the business is trying to change, what the current system actually does, and which of the ten possible projects earns the first move. The output is a decision you can defend, not a deck.",
    },
    {
      index: "02",
      name: "Website strategy & design",
      blurb: "Structure, language and art direction that hold up under pressure.",
      detail:
        "Sitemap, narrative and visual system designed together. We treat the website as the argument the business makes in public — so the hierarchy, the words and the pacing are designed before a single component is styled.",
    },
    {
      index: "03",
      name: "Web development",
      blurb:
        "Fast, accessible, maintainable front ends and the systems behind them.",
      detail:
        "Modern React and Next.js, a real design system, sensible content modelling, and performance treated as a design constraint. Built so the team that inherits it can keep moving without calling us.",
    },
    {
      index: "04",
      name: "AI strategy & implementation",
      blurb: "Where the technology genuinely helps — and where it does not.",
      detail:
        "We map the work first, then apply language models where they outperform the current process: retrieval, drafting, classification, extraction, triage. Evaluated against the old way, with limits and failure modes written down.",
    },
    {
      index: "05",
      name: "Business automation",
      blurb: "Removing the repetitive middle of a process.",
      detail:
        "Intake, routing, reconciliation, reporting and hand-offs wired together across the tools you already pay for. Humans stay where judgement is needed and stop being the integration layer.",
    },
    {
      index: "06",
      name: "Custom internal tools",
      blurb: "Software shaped around how your team actually works.",
      detail:
        "When the off-the-shelf option forces the business to bend, we build the narrow tool instead — the one screen, the one queue, the one calculator — designed with the same care as anything customer-facing.",
    },
    {
      index: "07",
      name: "Product & service design",
      blurb: "New offers built around what technology now makes possible.",
      detail:
        "Shaping a product, a service tier or a new delivery model end to end: what it is, who it serves, how it is priced, how it runs, and what has to be true operationally for it to work.",
    },
    {
      index: "08",
      name: "Workflow & knowledge systems",
      blurb: "Making what the organisation knows usable by everyone in it.",
      detail:
        "Documentation, process and institutional memory turned into something queryable and maintained — so onboarding, hand-offs and answers stop depending on who happens to be online.",
    },
    {
      index: "09",
      name: "Ongoing experimentation",
      blurb: "A standing practice rather than a one-off project.",
      detail:
        "A regular cadence of small, bounded experiments against real problems in your business, with a clear rule for what gets adopted, what gets improved, and what gets killed.",
    },
  ] satisfies Capability[],
};

export const disciplines = {
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
};

/**
 * What we make.
 *
 * The layer above capabilities: the things a client ends up with, described
 * as outcomes rather than technologies. Deliberately concrete — a capability
 * list tells you what we are good at, this tells you what you get.
 */
export const whatWeMake = [
  {
    index: "01",
    name: "Websites that argue well",
    body: "The public case for the business, structured around the decisions a visitor is actually trying to make. Fast, accessible, and maintainable by the team that inherits it.",
  },
  {
    index: "02",
    name: "Client and member portals",
    body: "The place a relationship lives after the sale — onboarding, access, updates and renewal — so the system carries it instead of someone remembering to.",
  },
  {
    index: "03",
    name: "Internal tools",
    body: "The narrow thing the off-the-shelf option will not do: one screen, one queue, one calculator, designed with the same care as anything customer-facing.",
  },
  {
    index: "04",
    name: "Automation systems",
    body: "Intake, routing, reconciliation and follow-up running on their own across the tools you already pay for, with exceptions raised rather than buried.",
  },
  {
    index: "05",
    name: "Knowledge and retrieval systems",
    body: "What the organisation knows, made answerable in plain language — with sources attached and an honest answer when it does not know.",
  },
  {
    index: "06",
    name: "AI-enabled workflows",
    body: "Language models applied to a specific step that measurably improves, evaluated against the old way, with limits and failure modes written down.",
  },
  {
    index: "07",
    name: "New digital products and services",
    body: "An offer shaped end to end — what it is, who it serves, how it is priced, and what has to be true operationally for it to work.",
  },
] as const;

export const makingPage = {
  index: "03",
  label: "What we make",
  statement: {
    text: "Seven things we build, and the nine capabilities behind them.",
    emphasis: "nine capabilities",
  } satisfies Emphasised,
  intro:
    "Capabilities are ingredients, not products. This is what they get combined into — and almost no project uses only one.",
} as const;
