import { ContactForm } from "../components/contact/ContactForm"
import { PageIntro } from "../components/PageIntro"
import { PageMeta } from "../components/PageMeta"
import { useTranslation } from "../i18n/useTranslation"

export function ContactPage() {
  const { tx } = useTranslation()

  return (
    <>
      <PageMeta
        title={tx("Start a project", "Parlons projet")}
        description={tx(
          "Tell stqck what you want to solve or build.",
          "Expliquez à stqck ce que vous souhaitez résoudre ou construire.",
        )}
      />
      <PageIntro
        index="04"
        eyebrow={tx("CONTACT", "CONTACT")}
        title={tx(
          "Tell us what you're working on.",
          "Parlez-nous de votre projet.",
        )}
        copy={tx(
          "You don't need a complete specification to get started. Tell us what you need, what isn't working, or what you'd like to build.",
          "Vous n’avez pas besoin d’un cahier des charges complet. Dites-nous ce dont vous avez besoin, ce qui ne fonctionne pas ou ce que vous souhaitez créer.",
        )}
      />
      <section className="contact-layout">
        <div className="contact-aside">
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
      </section>
    </>
  )
}
