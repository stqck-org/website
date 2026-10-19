import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { resolveCopy } from "../data/copy";
import { resolveInitialLanguage, type Language } from "./language";

const STORAGE_KEY = "stqck.lang";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Stored choice, guarded against SSR and storage-blocked browsers. */
function readStoredLanguage(): string | null {
  if (typeof globalThis.localStorage === "undefined") return null;
  try {
    return globalThis.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    resolveInitialLanguage(
      readStoredLanguage(),
      typeof navigator === "undefined" ? undefined : navigator.language,
    ),
  );

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      globalThis.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Storage can be unavailable (private mode); the session still works.
    }
    const { title, description } = resolveCopy("document", language);
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return context;
}
