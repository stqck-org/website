import type { Localized } from "../data/types"
import { useLocale } from "./Locale"

export function useTranslation() {
  const { locale, tx } = useLocale()
  const localize = (value: Localized) => value[locale]
  return { tx, localize }
}
