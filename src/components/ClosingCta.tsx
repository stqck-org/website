import { useTranslation } from "../i18n/useTranslation"
import { ActionLink, Arrow, Title } from "./ui"

export function ClosingCta() {
  const { tx } = useTranslation()

  return (
    <section className="closing-cta">
      <span className="eyebrow">06 / {tx("NEXT STEP", "ET MAINTENANT ?")}</span>
      <Title>
        {tx("Something you'd like to build?", "Un projet en tête ?")}
      </Title>
      <div>
        <p>
          {tx(
            "Tell us what you're trying to solve or build. We'll help you figure out a sensible next step.",
            "Dites-nous ce que vous cherchez à résoudre ou à créer. Nous verrons avec vous quelle pourrait être la prochaine étape.",
          )}
        </p>
        <ActionLink to="/#contact-form" variant="dark">
          {tx("Tell us about your project", "Parlons de votre projet")}{" "}
          <Arrow />
        </ActionLink>
      </div>
    </section>
  )
}
