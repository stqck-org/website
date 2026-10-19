import heroEn from "../en/hero.json";
import heroFr from "../fr/hero.json";

import type { MenuLinkId } from "../site";

/**
 * Copy contract for the Hero section. Both JSON files are assigned to it, so a
 * missing or misspelled key is a `tsc` error.
 */
export interface HeroCopy {
  kicker: string;
  scrollCue: string;
  menu: Record<MenuLinkId, string>;
  aria: {
    mainNav: string;
    toggleMenu: string;
    language: string;
  };
  alt: {
    heroImage: string;
  };
}

const en: HeroCopy = heroEn;
const fr: HeroCopy = heroFr;

export const heroCopy = { en, fr };
