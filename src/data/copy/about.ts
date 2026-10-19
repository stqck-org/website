import aboutEn from "../en/about.json";
import aboutFr from "../fr/about.json";

interface AboutBlockCopy {
  title: string;
  body: string;
}

/** Copy contract for the About section. */
export interface AboutCopy {
  sectionLabel: string;
  blocks: {
    lead: AboutBlockCopy;
    follow: AboutBlockCopy;
  };
}

const en: AboutCopy = aboutEn;
const fr: AboutCopy = aboutFr;

export const aboutCopy = { en, fr };
