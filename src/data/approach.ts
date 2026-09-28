/** How we work, and what we believe. Both carried over unchanged. */

import type { Emphasised } from "./types";

type ProcessStep = {
  index: string;
  title: string;
  lead: string;
  body: string;
  markers: string[];
};

export const approach = {
  index: "04",
  label: "Approach",
  statement: {
    text: "Four moves. The first one is the reason the rest hold.",
    emphasis: "hold",
  } satisfies Emphasised,
  steps: [
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
  ] satisfies ProcessStep[],
};

export const pointOfView = {
  index: "05",
  label: "Point of view",
  statement: {
    text: "A tool is only worth building if it changes what someone does next.",
    emphasis: "does",
  } satisfies Emphasised,
  intro:
    "Plenty of technology gets bought, launched and quietly ignored. The systems that last are the ones that make something concrete easier: understanding a situation, making a decision, explaining it to someone else, or getting through the day with less friction. That is the test we hold our own work to.",
  beliefs: [
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
  ],
  quote: {
    text: "The difference is that we are accountable for whether the thing works — not only for whether it shipped.",
    emphasis: "The difference",
  } satisfies Emphasised,
};

export const approachPage = {
  index: "04",
  label: "Approach",
  statement: {
    text: "How we work, and what we believe while doing it.",
    emphasis: "what we believe",
  } satisfies Emphasised,
  intro:
    "Two things worth knowing before you hire anyone: the shape of the work, and the judgement being applied to it. Neither is much use without the other.",
} as const;
