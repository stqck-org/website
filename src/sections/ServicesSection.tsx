import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { Section } from "../components/Section"
import { ServiceList } from "../components/ServiceList"
import { PixelMark, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function ServicesSection() {
  const { tx } = useTranslation()
  const [searchParams] = useSearchParams()
  const [openService, setOpenService] = useState<string | null>(null)

  // Legacy detail URLs arrive as /?service=<slug>#service-<slug>.
  useEffect(() => {
    const service = searchParams.get("service")
    if (service) setOpenService(service)
  }, [searchParams])

  return (
    <Section id="services">
      <section className="section section--services">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            02 / {tx("WHAT WE BUILD", "CE QUE NOUS CRÉONS")}
          </span>
          <Title>
            {tx(
              "Useful things, built properly.",
              "Des outils utiles, bien construits.",
            )}
          </Title>
          <p className="section-lead">
            {tx(
              "We focus on three areas where thoughtful software can make a practical difference. The shape of the solution follows the problem.",
              "Nous nous concentrons sur trois domaines où un logiciel bien pensé peut faire une différence concrète. La solution s’adapte au problème.",
            )}
          </p>
        </div>
        <ServiceList
          openSlug={openService}
          onToggle={(slug) =>
            setOpenService((current) => (current === slug ? null : slug))
          }
        />
      </section>

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

      <section className="service-approach">
        <span className="eyebrow">{tx("OUR FILTER", "NOTRE FILTRE")}</span>
        <Title>{tx("Should it exist?", "Est-ce vraiment utile ?")}</Title>
        <p>
          {tx(
            "Before recommending a build, we ask whether it solves the right problem, fits the way people work, and can be maintained sensibly.",
            "Avant de recommander un développement, nous vérifions qu’il résout le bon problème, correspond aux usages et peut être maintenu raisonnablement.",
          )}
        </p>
      </section>
    </Section>
  )
}
