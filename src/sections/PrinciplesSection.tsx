import { Section } from "../components/Section"
import { Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function PrinciplesSection() {
  const { tx } = useTranslation()

  return (
    <Section id="principles" className="principles">
      <div className="principles__title" data-reveal>
        <span className="eyebrow">
          05 / {tx("WHY STQCK", "POURQUOI STQCK")}
        </span>
        <Title>
          {tx("Solid work.", "Du travail solide.")}
          <br />
          <em>{tx("Honestly done.", "En toute transparence.")}</em>
        </Title>
      </div>
      <div className="principles__list">
        <p data-reveal>
          <span>01</span>
          {tx(
            "Practical solutions, not unnecessary complexity.",
            "Des solutions pratiques, sans complexité inutile.",
          )}
        </p>
        <p data-reveal>
          <span>02</span>
          {tx(
            "Fair value, not a race to the lowest price.",
            "Un prix juste, pas une course au moins cher.",
          )}
        </p>
        <p data-reveal>
          <span>03</span>
          {tx(
            "Clear communication—even when something is blocked.",
            "Une communication claire — même quand ça bloque.",
          )}
        </p>
        <p data-reveal>
          <span>04</span>
          {tx(
            "Systems you can understand and build on.",
            "Des systèmes que vous pouvez comprendre et faire évoluer.",
          )}
        </p>
      </div>
    </Section>
  )
}
