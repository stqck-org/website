import { useLocale } from "../../i18n/Locale"
import { Button } from "../ui"

export function LanguageSwitcher({ inverted = false }: { inverted?: boolean }) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      className={`language-switcher ${
        inverted ? "language-switcher--inverse" : ""
      }`}
      aria-label="Language / Langue"
    >
      <Button
        className={locale === "en" ? "is-active" : ""}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        EN
      </Button>
      <span>/</span>
      <Button
        className={locale === "fr" ? "is-active" : ""}
        onClick={() => setLocale("fr")}
        aria-pressed={locale === "fr"}
      >
        FR
      </Button>
    </div>
  )
}
