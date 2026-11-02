import { ClosingCta } from "../components/ClosingCta"
import { Section } from "../components/Section"
import { ContactForm } from "../components/contact/ContactForm"
import { useTranslation } from "../i18n/useTranslation"

export function ContactSection() {
  const { tx } = useTranslation()

  return (
    <Section id="contact">
      <ClosingCta />
      <div className="contact-layout" id="contact-form" tabIndex={-1}>
        <div className="contact-aside" data-reveal>
          <p className="contact-aside__lead">
            {tx(
              "You don't need a finished specification to talk to us. Tell us what you're trying to do, what's getting in the way, or what you'd like to build.",
              "Pas besoin d’avoir déjà rédigé un cahier des charges pour nous contacter. Expliquez-nous ce que vous cherchez à faire, ce qui vous bloque ou ce que vous aimeriez créer.",
            )}
          </p>
          <span className="eyebrow">
            {tx("A GOOD START", "POUR BIEN COMMENCER")}
          </span>
          <p>
            {tx(
              "What you're trying to solve.",
              "Ce que vous cherchez à résoudre.",
            )}
          </p>
          <p>
            {tx("Who it needs to work for.", "Les personnes qui utiliseront la solution.")}
          </p>
          <p>
            {tx("The constraints we should know about.", "Les contraintes à prendre en compte.")}
          </p>
        </div>
        <ContactForm />
      </div>
    </Section>
  )
}
