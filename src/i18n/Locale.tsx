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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = window.localStorage.getItem("stqck-locale")
    return saved === "fr" ? "fr" : "en"
  })

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
