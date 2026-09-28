/** Conceptual applications. Carried over unchanged, including the
 *  honesty note that keeps them clearly distinct from client case studies. */

import type { ArtworkId, Emphasised, Tone } from "./types";

type Project = {
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

export const work = {
  index: "03",
  label: "Work",
  statement: {
    text: "Six shapes of problem we are built to take on.",
  } satisfies Emphasised,
  intro:
    "These are applications rather than case studies. Client work is shared privately and under permission, so instead of inventing logos and numbers, here is the honest version: the situations we are usually called into, and what we build in response.",
  note: "Conceptual applications — illustrative of the studio’s practice. No client names, results or testimonials are shown on this site without permission.",
  projects: [
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
  ] satisfies Project[],
};
