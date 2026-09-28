/**
 * Recognisable client situations.
 *
 * Written so a visitor can point at one and say "that is us". Each describes
 * what the situation feels like from the inside before it says anything about
 * what Hello Machine would do — recognition first, pitch second.
 */

export type Situation = {
  id: string;
  index: string;
  title: string;
  /** What it looks like from the inside, in the client's own terms. */
  symptom: string;
  /** Why it is expensive to leave alone. */
  cost: string;
  /** What we actually do about it. */
  response: string;
  /** The engagement that usually fits first. */
  mode: "intervention" | "ownership" | "continuous";
  capabilities: string[];
};

export const situations: Situation[] = [
  {
    id: "front-door",
    index: "01",
    title: "The website no longer reflects the business",
    symptom:
      "The company has moved on and the site has not. It describes work you no longer do, undersells the work you do now, and makes a straightforward business sound complicated. You find yourself explaining the company in a call because the site did not.",
    cost: "Every good lead arrives already confused, and the people you most want to hear from quietly decide you are not for them.",
    response:
      "We rebuild the argument before the interface: what the business actually sells, the two or three decisions a visitor is trying to make, and the order they need things in. Then we design and build it.",
    mode: "ownership",
    capabilities: ["Digital strategy", "Website strategy and design", "Web development"],
  },
  {
    id: "coordination",
    index: "02",
    title: "Manual coordination is eating the week",
    symptom:
      "Work moves forward because people chase it. The same data gets copied between the same four tools, someone re-types what a form already captured, and a good week is one where nothing was missed.",
    cost: "You are paying senior people to be the integration layer, and the cost is invisible because it never appears as a line item.",
    response:
      "We map what actually happens — not the documented version — then hand the repetitive middle to software and keep judgement where it belongs. Exceptions get raised to a person instead of buried.",
    mode: "intervention",
    capabilities: ["Business automation", "Custom internal tools", "Digital strategy"],
  },
  {
    id: "knowledge",
    index: "03",
    title: "What the company knows is scattered",
    symptom:
      "It is written down somewhere. In a doc, a thread, a recording, or in one person's head. Nobody can find it twice, so it gets rewritten, and now there are three versions and no way to tell which is current.",
    cost: "Onboarding takes months, the same questions get answered weekly, and decisions get made without the context that already existed.",
    response:
      "We shape scattered material into something a team can actually question in plain language — with sources attached, boundaries defined, and an honest answer when it does not know.",
    mode: "ownership",
    capabilities: ["Knowledge systems", "AI strategy and implementation", "Custom internal tools"],
  },
  {
    id: "single-point",
    index: "04",
    title: "A critical operation rests on one person",
    symptom:
      "There is a spreadsheet, a script, or a routine that only one person fully understands. It works. It has always worked. Everyone is slightly nervous about the day that person is unavailable.",
    cost: "You cannot grow the operation, you cannot hand it over, and a holiday is a risk event.",
    response:
      "We make the implicit explicit — the states work moves through, the rules being applied, the decisions being made — and turn it into something the team owns rather than tolerates.",
    mode: "intervention",
    capabilities: ["Custom internal tools", "Business automation", "Product and service design"],
  },
  {
    id: "new-offer",
    index: "05",
    title: "A new offer has no workable shape yet",
    symptom:
      "There is a real idea and real demand, but no agreed answer to what it is, who it serves, how it is priced, or what has to be true operationally for it to work. It has been discussed more often than it has been drawn.",
    cost: "The idea stays a conversation, and the window it depended on closes while the business waits for certainty that was never coming.",
    response:
      "We give it a shape you can test: the offer defined end to end, the delivery model it implies, and a version small enough to put in front of real people.",
    mode: "intervention",
    capabilities: ["Product and service design", "Digital strategy", "Experimentation"],
  },
  {
    id: "ai-start",
    index: "06",
    title: "AI looks relevant, but the starting point is not obvious",
    symptom:
      "There is pressure to be doing something, plenty of demos, and no clear read on which part of your business it would genuinely improve. The honest answer internally is that nobody wants to be the one who bet wrong.",
    cost: "You either spend on something that changes nothing, or you wait while the work that would have benefited stays manual.",
    response:
      "We map the work first, then apply language models only where they beat the current process — measured against it, with limits and failure modes written down. Where they do not help, we say so.",
    mode: "intervention",
    capabilities: ["AI strategy and implementation", "Digital strategy", "Experimentation"],
  },
];

export const situationsPage = {
  index: "01",
  label: "Situations",
  statement: {
    text: "Six situations we are usually called into.",
  },
  intro:
    "Most work starts with one of these. If you recognise your company in more than one, that is normal — they tend to share a root cause, and finding it is usually the first useful thing we do.",
  outro: {
    text: "If none of these is quite it, the conversation is still worth having.",
    emphasis: "still",
  },
} as const;
