import type { Language } from "../../i18n/language";

import { aboutCopy } from "./about";
import { contactCopy } from "./contact";
import { documentCopy } from "./document";
import { footerCopy } from "./footer";
import { heroCopy } from "./hero";
import { projectsCopy } from "./projects";
import { teamCopy } from "./team";

/** Every section bundle, keyed by section id. */
export const copyBySection = {
  hero: heroCopy,
  about: aboutCopy,
  projects: projectsCopy,
  team: teamCopy,
  contact: contactCopy,
  footer: footerCopy,
  document: documentCopy,
};

export type SectionId = keyof typeof copyBySection;

/** Shape of every section copy in the source language (English). */
export type Sections = { [K in SectionId]: (typeof copyBySection)[K]["en"] };

/**
 * Copy for one section: the requested language when that section has a
 * translation, English otherwise (section-level fallback — see the plan:
 * sections without a `fr` file keep using the English copy).
 */
export function resolveCopy<K extends SectionId>(
  section: K,
  language: Language,
): Sections[K] {
  // Safe cast: each bundle exposes its own section copy under `en` and `fr`.
  const bundle = copyBySection[section] as unknown as {
    en: Sections[K];
    fr?: Sections[K];
  };
  return language === "fr" && bundle.fr ? bundle.fr : bundle.en;
}
