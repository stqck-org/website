import documentEn from "../en/document.json";
import documentFr from "../fr/document.json";

/**
 * `<title>` and meta description. Not a visible section, but translated and
 * kept in sync with the current language by the provider.
 */
export interface DocumentCopy {
  title: string;
  description: string;
}

const en: DocumentCopy = documentEn;
const fr: DocumentCopy = documentFr;

export const documentCopy = { en, fr };
