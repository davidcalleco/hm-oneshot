/**
 * Identity, in one place.
 *
 * The site previously asserted two different identities: contact lived at
 * hellomachine.studio while canonical URLs, og:url, the sitemap and JSON-LD
 * all declared hm-2026.vercel.app as the brand's home. The domain is
 * registered and its Google Workspace mail records are live, so the address
 * is real — the site simply is not hosted there yet.
 *
 * Everything identity-shaped now derives from `domain` below, so navigation,
 * footer, contact, metadata, canonical URLs and social cards cannot drift
 * apart again. Pointing the production domain at a deployment stays a
 * deliberate act, not a side effect of this file.
 */

export const site = {
  name: "Hello Machine",
  domain: "hellomachine.studio",
  email: "hello@hellomachine.studio",
  studio: "Remote-first · Working across Europe and North America",

  tagline: "Design-led technology studio",
  description:
    "Hello Machine is a design-led technology studio. We design and build the systems ambitious companies actually run on — websites, internal tools, automation and AI, made to be used rather than demoed.",

  nav: [
    { href: "/situations", label: "Situations" },
    { href: "/ways-to-work", label: "Ways to work" },
    { href: "/capabilities", label: "What we make" },
    { href: "/approach", label: "Approach" },
  ],

  cta: { href: "/contact", label: "Start a conversation" },
} as const;

export const footer = {
  columns: [
    {
      heading: "The work",
      links: [
        { href: "/situations", label: "Situations we solve" },
        { href: "/ways-to-work", label: "Ways to work" },
        { href: "/capabilities", label: "What we make" },
      ],
    },
    {
      heading: "The studio",
      links: [
        { href: "/approach", label: "How we work" },
        { href: "/approach#principles", label: "What we believe" },
        { href: "/contact", label: "Start a conversation" },
      ],
    },
  ],
  note: "We take on a small number of projects at a time so the people you meet are the people who do the work.",
  colophon: "Design-led technology studio · Built with intent",
} as const;
