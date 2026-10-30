import { useTranslation } from "../i18n/useTranslation"
import { ActionLink, Arrow, Title } from "./ui"

export function ClosingCta() {
  const { tx } = useTranslation()

  return (
    <section className="closing-cta">
      <span className="eyebrow">06 / {tx("NEXT STEP", "PROCHAINE ÉTAPE")}</span>
      <Title>
        {tx("Got something to build?", "Quelque chose à construire ?")}
      </Title>
      <div>
        <p>
          {tx(
            "Tell us what you're trying to solve. We'll help you work out the next step.",
            "Expliquez-nous ce que vous cherchez à résoudre. Nous vous aiderons à définir la prochaine étape.",
          )}
        </p>
        <ActionLink to="/contact" variant="dark">
          {tx("Tell us about your project", "Parlez-nous de votre projet")}{" "}
          <Arrow />
        </ActionLink>
      </div>
    </section>
  )
}
