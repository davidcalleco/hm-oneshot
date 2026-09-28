/**
 * The three ways to work together — the commercial spine of the site.
 *
 * Deliberately not pricing tiers. Each answers the same six questions in the
 * same order, so they can be compared honestly: who it is for, when it comes
 * up, what we do, what you end up holding, how it starts, and what happens
 * when it ends.
 */

export type Offer = {
  id: "intervention" | "ownership" | "continuous";
  index: string;
  name: string;
  /** One line, on the promise rather than the activity. */
  promise: string;
  /** The longer framing used at the top of the offer's own page. */
  summary: string;
  bestFit: string;
  typicalSituations: string[];
  whatWeDo: string[];
  whatYouGet: string[];
  howItBegins: string;
  afterwards: string;
  /** Said plainly, because saying it builds more trust than omitting it. */
  notThisIf: string;
};

export const offers: Offer[] = [
  {
    id: "intervention",
    index: "01",
    name: "Intervention",
    promise: "Understand one important problem and find the first move worth making.",
    summary:
      "A focused engagement for when the problem is real but the response is not obvious yet. We work out what is actually going on, where the leverage is, and what the smallest useful next step would be — so the next decision is made on evidence rather than appetite.",
    bestFit:
      "Companies who can feel the problem but cannot yet name the project. Also the right starting point when the internal debate has stalled between two plausible directions.",
    typicalSituations: [
      "Manual coordination is eating the week",
      "A critical operation rests on one person",
      "AI looks relevant, but the starting point is not obvious",
      "A new offer has no workable shape yet",
    ],
    whatWeDo: [
      "Talk to the people doing the work, not only the people commissioning it",
      "Map what actually happens against what is supposed to happen",
      "Look at the systems already in place before proposing new ones",
      "Prototype the uncertain part where a drawing would not settle it",
      "Write a clear read on the problem and what we would do about it",
    ],
    whatYouGet: [
      "A diagnosis you can disagree with — specific enough to argue about",
      "A map of the workflow or system as it really runs",
      "A prioritised set of opportunities, with the reasoning attached",
      "A prototype or proof of concept where one is warranted",
      "A recommended next phase, scoped and costed",
    ],
    howItBegins:
      "A conversation, then a short written proposal naming the question we are answering and what you will have at the end. Fixed scope, fixed price, fixed end date.",
    afterwards:
      "You own the output whatever you decide next. Some clients take it in-house, some pause, some move to Ownership. None of those outcomes is a failure and we do not price it as though it were.",
    notThisIf:
      "You already know exactly what you want built. That is Ownership, and paying us to rediscover your own brief would be wasteful.",
  },
  {
    id: "ownership",
    index: "02",
    name: "Ownership",
    promise: "One senior team, accountable from ambiguous brief to working system.",
    summary:
      "A complete build where we take responsibility for turning something loosely defined into something people use. The promise is not that we can build websites and tools — plenty of studios can. It is that strategy, design, implementation and launch stay with one team that does not hand the problem sideways when it gets difficult.",
    bestFit:
      "Companies who need the thing to exist and work, and who would rather hold one team accountable than coordinate three.",
    typicalSituations: [
      "The website no longer reflects the business",
      "What the company knows is scattered",
      "A critical operation rests on one person",
      "An idea has been validated and now needs building properly",
    ],
    whatWeDo: [
      "Settle the argument and the structure before designing the surface",
      "Design the thing and the mechanism behind it at the same time",
      "Build it, in usable pieces, in front of the people who will live with it",
      "Treat accessibility, speed and clarity as requirements rather than polish",
      "Hand over something your team can maintain without calling us",
    ],
    whatYouGet: [
      "A working system in production, not a prototype and a deck",
      "The design system and content model it runs on",
      "Documentation written for whoever inherits it",
      "A named person accountable throughout, not a rotating account team",
    ],
    howItBegins:
      "Usually from an Intervention, or from a brief that is already clear. Either way we write down what we are building and what done means before anyone starts.",
    afterwards:
      "You own everything — code, design, content, accounts. Some clients continue into Continuous, most do not need to immediately, and we will tell you which we think you are.",
    notThisIf:
      "The problem is still genuinely undefined. Building confidently in the wrong direction is the most expensive thing we could do for you.",
  },
  {
    id: "continuous",
    index: "03",
    name: "Continuous",
    promise: "Keep improving the systems that are already live.",
    summary:
      "An ongoing working relationship for companies whose systems are in production and need to keep getting better. Standing capacity for the improvements that never quite become projects — and a standing point of view on what is worth doing next.",
    bestFit:
      "Companies with something live and valuable, and no in-house team whose job it is to keep making it better.",
    typicalSituations: [
      "A site or product is live but has stopped moving",
      "AI is in use and nobody is checking whether it still behaves",
      "Improvements keep being deferred because nothing is on fire",
      "Decisions keep getting made without anyone to think them through",
    ],
    whatWeDo: [
      "Watch what people actually do, not only what analytics counts",
      "Run small, bounded experiments with a clear rule for adoption",
      "Refine workflows as the business changes shape around them",
      "Evaluate AI output on a schedule instead of on trust",
      "Keep accessibility, performance and dependencies from quietly rotting",
      "Stay close enough to be useful when a decision comes up",
    ],
    whatYouGet: [
      "A regular cadence of shipped improvements",
      "A standing list of experiments, each with a decision attached",
      "Someone senior who already has the context when you need an answer",
      "An honest account of what worked and what we retired",
    ],
    howItBegins:
      "After something is live — ours or not. We start by reading the existing system properly, which is chargeable work and worth doing before agreeing to anything ongoing.",
    afterwards:
      "Month to month with a notice period, not an annual lock-in. If there is not enough worth doing, we will say so and stop.",
    notThisIf:
      "You need a helpdesk or guaranteed response times. That is a support contract and someone else does it better than we would.",
  },
];

export const offersPage = {
  index: "02",
  label: "Ways to work",
  statement: {
    text: "Three ways to work together, depending on how defined the problem already is.",
    emphasis: "how defined",
  },
  intro:
    "Most studios sell one shape of engagement and bend every problem to fit it. These three exist because the right first move genuinely differs depending on whether you are trying to understand something, build something, or keep something good.",
  note: "Not sure which applies? That is a common and reasonable place to start — say so and we will work it out in the first conversation.",
} as const;
