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
          <em>{tx("Honestly done.", "En toute honnêteté.")}</em>
        </Title>
      </div>
      <div className="principles__list">
        <p data-reveal>
          <span>01</span>
          {tx(
            "Practical solutions that don't add complexity for its own sake.",
            "Des solutions pratiques, sans complexité qui ne sert à rien.",
          )}
        </p>
        <p data-reveal>
          <span>02</span>
          {tx(
            "A fair price for work done properly.",
            "Un prix juste pour un travail bien fait.",
          )}
        </p>
        <p data-reveal>
          <span>03</span>
          {tx(
            "Clear updates, including when something gets stuck.",
            "Des nouvelles claires, même quand un projet rencontre un blocage.",
          )}
        </p>
        <p data-reveal>
          <span>04</span>
          {tx(
            "Tools you can understand, use, and keep improving.",
            "Des outils que vous pouvez comprendre, utiliser et faire évoluer.",
          )}
        </p>
      </div>
    </Section>
  )
}
