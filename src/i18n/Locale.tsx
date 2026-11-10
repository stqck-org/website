import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type Locale = "en" | "fr"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  tx: (en: string, fr: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const saved = window.localStorage.getItem("stqck-locale")
  if (saved === "fr" || saved === "en") return saved

  const languages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language]

  for (const lang of languages) {
    if (!lang) continue
    const lower = lang.toLowerCase()
    if (lower.startsWith("fr")) return "fr"
  }
  return "en"
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // The prerendered HTML is always English, so the first client render has to
  // be English too or hydration mismatches. The stored/detected locale is
  // applied right after mount.
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const detected = detectLocale()
    setLocaleState((current) => (current === detected ? current : detected))
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem("stqck-locale", next)
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      tx: (en: string, fr: string) => (locale === "en" ? en : fr),
    }),
    [locale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used inside LocaleProvider")
  return value
}
