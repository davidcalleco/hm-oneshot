export type ArtworkId =
  | "front-door"
  | "knowledge"
  | "automation"
  | "instrument"
  | "membership"
  | "foresight";

export type Tone = "paper" | "cream" | "ink" | "signal";

export type Project = {
  id: string;
  index: string;
  title: string;
  /** The business question the work answers. */
  premise: string;
  summary: string;
  disciplines: string[];
  artwork: ArtworkId;
  tone: Tone;
};

/**
 * Conceptual applications, not client case studies. Hello Machine does not
 * publish invented clients, metrics or testimonials — each entry describes a
 * shape of problem the studio takes on and how it is usually solved.
 */
export const projects: Project[] = [
  {
    id: "front-door",
    index: "01",
    title: "A clearer front door",
    premise: "The business is good. The website makes it sound complicated.",
    summary:
      "A site rebuilt around the two or three decisions a visitor is actually trying to make — structure, language and pace first, interface second. Complexity stays available, but it stops being the first thing anyone meets.",
    disciplines: ["Positioning", "Website design", "Web development"],
    artwork: "front-door",
    tone: "cream",
  },
  {
    id: "knowledge",
    index: "02",
    title: "A workflow that answers itself",
    premise: "Everything is written down somewhere. Nobody can find it twice.",
    summary:
      "Scattered documents, threads and tribal knowledge shaped into a retrieval system a team can question in plain language — with sources attached, boundaries defined, and an honest answer when it does not know.",
    disciplines: ["AI systems", "Knowledge design", "Retrieval"],
    artwork: "knowledge",
    tone: "ink",
  },
  {
    id: "automation",
    index: "03",
    title: "The quiet operator",
    premise: "Four people spend their mornings moving the same data sideways.",
    summary:
      "The repetitive middle of a process mapped, then handed to software: intake, routing, reconciliation and follow-up running on their own, with exceptions raised to a human instead of buried.",
    disciplines: ["Process mapping", "Automation", "Integration"],
    artwork: "automation",
    tone: "paper",
  },
  {
    id: "instrument",
    index: "04",
    title: "An instrument, not a spreadsheet",
    premise: "The company runs on a file only one person fully understands.",
    summary:
      "A custom internal tool designed like a product: the team's real vocabulary, the states work actually moves through, and a view that makes the next action obvious to whoever opens it.",
    disciplines: ["Product design", "Custom tools", "Web development"],
    artwork: "instrument",
    tone: "signal",
  },
  {
    id: "membership",
    index: "05",
    title: "A relationship that remembers",
    premise: "Clients feel served during the project and forgotten after it.",
    summary:
      "The client or member experience designed end to end — onboarding, updates, access and renewal — so the system carries the relationship instead of relying on someone remembering to send an email.",
    disciplines: ["Service design", "Portals", "Lifecycle systems"],
    artwork: "membership",
    tone: "paper",
  },
  {
    id: "foresight",
    index: "06",
    title: "A room for hard decisions",
    premise: "The choice is expensive and the evidence lives in six places.",
    summary:
      "Scenario and decision support built for a specific recurring choice — assumptions made explicit, ranges instead of false precision, and a record of what was decided and why.",
    disciplines: ["Digital strategy", "Decision systems", "AI strategy"],
    artwork: "foresight",
    tone: "cream",
  },
];

export type Capability = {
  index: string;
  name: string;
  blurb: string;
  detail: string;
};

export const capabilities: Capability[] = [
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
    blurb: "Fast, accessible, maintainable front ends and the systems behind them.",
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
];

export type ProcessStep = {
  index: string;
  title: string;
  lead: string;
  body: string;
  markers: string[];
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Find the signal",
    lead: "Before anything is designed, we work out what is actually going on.",
    body: "Conversations with the people doing the work, a look at the systems already in place, and a short written read on where the friction and the opportunity really sit. Most projects change shape here — usually for the better.",
    markers: ["Interviews", "Systems audit", "Written point of view"],
  },
  {
    index: "02",
    title: "Shape the system",
    lead: "We design the thing and the mechanism behind it at the same time.",
    body: "Narrative, structure, interface and data model developed together, so the design is not a surface stretched over an architecture that cannot support it. You see and sign off the direction before we build.",
    markers: ["Structure", "Art direction", "Architecture"],
  },
  {
    index: "03",
    title: "Make it useful",
    lead: "Built to be used on an ordinary Tuesday, not demoed once.",
    body: "We ship in usable pieces, put them in front of the people who will live with them, and treat accessibility, speed and clarity as requirements rather than a final polish pass.",
    markers: ["Build", "Test with real users", "Launch"],
  },
  {
    index: "04",
    title: "Keep it honest",
    lead: "Systems drift. We stay long enough to see how this one behaves.",
    body: "After launch we watch what people actually do, fix what gets in the way, and keep a standing list of small experiments — adopting what works and retiring what does not.",
    markers: ["Measure", "Refine", "Experiment"],
  },
];

export const beliefs: { claim: string; instead: string }[] = [
  {
    claim: "Technology is only useful when it changes a decision.",
    instead:
      "If a system does not help someone understand faster, decide better, communicate more clearly or operate with less friction, it is overhead with a nice interface.",
  },
  {
    claim: "AI is a material, not a theme.",
    instead:
      "We use language models where they beat the current process and say so plainly where they do not. The work should be defensible to the person who has to run it.",
  },
  {
    claim: "Design is how the thinking becomes usable.",
    instead:
      "Strategy that never reaches an interface stays a document. We take positions in public — in structure, in language, in the way a screen behaves.",
  },
  {
    claim: "We would rather be a partner than a supplier.",
    instead:
      "We ask about the business model, push back on the brief when it is wrong, and stay accountable for whether the thing works — not only for whether it shipped.",
  },
];

export const tickerItems = [
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

export const contact = {
  email: "hello@hellomachine.studio",
  studio: "Remote-first · Working across Europe and North America",
};
