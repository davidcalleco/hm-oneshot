/**
 * The content barrel.
 *
 * Pages import from here; sections take content as props and import nothing.
 * Keeping the seam at one module means the writing can move to a CMS later
 * without any section component changing.
 */

export type { Emphasised, ArtworkId, Tone } from "./types";

export { site, footer } from "./site";
export { hero, studio, fit, homeSections } from "./home";
export { capabilities, capabilityNames, disciplines, whatWeMake, makingPage } from "./making";
export { situations, situationsPage } from "./situations";
export { offers, offersPage } from "./offers";
export type { Offer } from "./offers";
export type { Situation } from "./situations";
export { approach, pointOfView, approachPage } from "./approach";
export { work } from "./work";
export { contact, qualification, contactPage } from "./contact";
