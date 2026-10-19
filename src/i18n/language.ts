export const languages = ["en", "fr"] as const;

export type Language = (typeof languages)[number];

export function isLanguage(value: string | null): value is Language {
  return value !== null && (languages as readonly string[]).includes(value);
}

/**
 * Stored choice first, then the browser preference, then English. Both inputs
 * are passed in so the function stays pure and safe outside a browser.
 */
export function resolveInitialLanguage(
  stored: string | null,
  navigatorLanguage: string | undefined,
): Language {
  if (isLanguage(stored)) return stored;
  if (navigatorLanguage?.toLowerCase().startsWith("fr")) return "fr";
  return "en";
}
