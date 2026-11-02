import { ScrollCue } from "../components/ScrollCue"
import { Section } from "../components/Section"
import { ActionLink, Arrow, PixelMark, TextLink, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function HomeSection() {
  const { tx } = useTranslation()

  return (
    <Section id="home" className="hero page-section--hero">
      <div className="hero__copy" data-reveal>
        <span className="eyebrow">DIGITAL STUDIO · MADAGASCAR</span>
        <Title as="h1">
          {tx("We make", "On crée")}
          <br />
          <em>{tx("stuff.", "des trucs.")}</em>
        </Title>
        <p>
          {tx(
            "We build digital solutions that fit the way your business works — from websites and online stores to systems that make everyday work easier.",
            "Nous créons des solutions numériques adaptées à votre façon de travailler — des sites web et boutiques en ligne aux outils qui simplifient la gestion au quotidien.",
          )}
        </p>
        <div className="hero__actions">
          <ActionLink to="/#work" variant="acid">
            {tx("Explore our work", "Voir nos réalisations")} <Arrow />
          </ActionLink>
          <TextLink to="/#services">
            {tx("See what we do", "Découvrir nos services")} →
          </TextLink>
        </div>
        <ScrollCue to="/#about" />
      </div>
      <div className="hero__mark" data-reveal data-reveal-delay="1">
        <span className="hero__edition">STQ — 001</span>
        <PixelMark />
        <span className="hero__pronounce">/stack/</span>
      </div>
      <div className="hero__ticker" aria-hidden="true">
        <span>WEB</span>
        <span>·</span>
        <span>SYSTEMS</span>
        <span>·</span>
        <span>COMMERCE</span>
      </div>
    </Section>
  )
}
