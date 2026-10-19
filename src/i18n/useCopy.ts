import { resolveCopy, type SectionId, type Sections } from "../data/copy";
import { useLanguage } from "./LanguageContext";

/**
 * Copy of one section in the current language, with a per-section English
 * fallback. Components read display text only through this hook — never by
 * importing a JSON file directly.
 */
export function useCopy<K extends SectionId>(section: K): Sections[K] {
  const { language } = useLanguage();
  return resolveCopy(section, language);
}
