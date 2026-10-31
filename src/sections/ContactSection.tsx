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
              "You don't need a complete specification to get started. Tell us what you need, what isn't working, or what you'd like to build.",
              "Vous n’avez pas besoin d’un cahier des charges complet. Dites-nous ce dont vous avez besoin, ce qui ne fonctionne pas ou ce que vous souhaitez créer.",
            )}
          </p>
          <span className="eyebrow">
            {tx("A GOOD START", "POUR BIEN COMMENCER")}
          </span>
          <p>
            {tx(
              "The problem in plain language.",
              "Le problème, avec des mots simples.",
            )}
          </p>
          <p>
            {tx("Who the solution is for.", "À qui s’adresse la solution.")}
          </p>
          <p>
            {tx("Any important constraints.", "Les contraintes importantes.")}
          </p>
        </div>
        <ContactForm />
      </div>
    </Section>
  )
}
