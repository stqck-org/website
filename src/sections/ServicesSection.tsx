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
              "Useful things, built with care.",
              "Des outils utiles, conçus avec soin.",
            )}
          </Title>
          <p className="section-lead">
            {tx(
              "We work across three areas where software can make a real difference. The right solution depends on the problem we're solving.",
              "Nous intervenons dans trois domaines où le numérique peut faire une vraie différence. La bonne solution dépend avant tout du problème à résoudre.",
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
            "Technology should have a purpose.",
            "La technologie doit servir à quelque chose.",
          )}
        </p>
        <PixelMark compact />
        <p>
          {tx(
            "Useful today. Ready for what comes next.",
            "Utile dès aujourd’hui. Prêt pour la suite.",
          )}
        </p>
      </section>

      <section className="service-approach">
        <span className="eyebrow">{tx("OUR FILTER", "NOTRE CRITÈRE")}</span>
        <Title>{tx("Let's make it useful.", "Donnons-lui une vraie utilité.")}</Title>
        <p>
          {tx(
            "Before we start building, we take the time to understand what you're trying to achieve, who it's for, and how it will fit into the way people work and your needs. That helps us build something practical, useful, and made to last.",
            "Avant de commencer à construire, nous prenons le temps de comprendre ce que vous souhaitez accomplir, à qui s'adresse la solution et comment elle s'intégrera dans le quotidien de ceux qui l'utiliseront et relatif à vos besoins. Cela nous aide à créer quelque chose de vraiment utile, pratique et fait pour durer.",
          )}
        </p>
      </section>
    </Section>
  )
}
