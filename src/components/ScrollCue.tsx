import { useTranslation } from "../i18n/useTranslation"
import { TextLink } from "./ui"

export function ScrollCue({ to }: { to: string }) {
  const { tx } = useTranslation()

  return (
    <TextLink to={to} className="scroll-cue">
      {tx("Scroll to explore", "Faites défiler")}{" "}
      <span aria-hidden="true">↓</span>
    </TextLink>
  )
}
