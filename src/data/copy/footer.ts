import footerEn from "../en/footer.json";
import footerFr from "../fr/footer.json";

import type { FooterColumnId, FooterLinkId } from "../site";

/** Copy contract for the Footer; labels are keyed by the ids in `site.ts`. */
export interface FooterCopy {
  columns: Record<FooterColumnId, string>;
  links: Record<FooterLinkId, string>;
  taglineLine1: string;
  taglineLine2: string;
  newsletter: {
    label: string;
    placeholder: string;
    aria: string;
  };
  bottom: {
    copyright: string;
    note: string;
    backToTop: string;
  };
}

const en: FooterCopy = footerEn;
const fr: FooterCopy = footerFr;

export const footerCopy = { en, fr };
