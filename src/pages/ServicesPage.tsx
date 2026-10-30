import { ClosingCta } from "../components/ClosingCta"
import { PageIntro } from "../components/PageIntro"
import { PageMeta } from "../components/PageMeta"
import { ServiceList } from "../components/ServiceList"
import { PixelMark, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function ServicesPage() {
  const { tx } = useTranslation()

  return (
    <>
      <PageMeta
        title={tx("Services", "Services")}
        description={tx(
          "Web, business systems, and e-commerce services.",
          "Services web, systèmes de gestion et e-commerce.",
        )}
      />
      <PageIntro
        index="01"
        eyebrow={tx("SERVICES", "SERVICES")}
        title={tx(
          "Digital tools for real business.",
          "Des outils numériques pour le vrai travail.",
        )}
        copy={tx(
          "We focus on three areas where thoughtful software can make a practical difference. The shape of the solution follows the problem.",
          "Nous nous concentrons sur trois domaines où un logiciel bien pensé peut faire une différence concrète. La solution s’adapte au problème.",
        )}
      />
      <section className="services-manifesto">
        <p>
          {tx(
            "Not tech for tech’s sake.",
            "Pas de technologie pour la technologie.",
          )}
        </p>
        <PixelMark compact />
        <p>
          {tx(
            "Built to be useful. Built to last.",
            "Conçu pour être utile. Conçu pour durer.",
          )}
        </p>
      </section>
      <section className="section">
        <ServiceList />
      </section>
      <section className="service-approach">
        <span className="eyebrow">04 / {tx("OUR FILTER", "NOTRE FILTRE")}</span>
        <Title>{tx("Should it exist?", "Est-ce vraiment utile ?")}</Title>
        <p>
          {tx(
            "Before recommending a build, we ask whether it solves the right problem, fits the way people work, and can be maintained sensibly.",
            "Avant de recommander un développement, nous vérifions qu’il résout le bon problème, correspond aux usages et peut être maintenu raisonnablement.",
          )}
        </p>
      </section>
      <ClosingCta />
    </>
  )
}
