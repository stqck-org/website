import { useParams } from "react-router"
import { ClosingCta } from "../components/ClosingCta"
import { PageIntro } from "../components/PageIntro"
import { PageMeta } from "../components/PageMeta"
import { Title } from "../components/ui"
import { services } from "../data/services"
import { useTranslation } from "../i18n/useTranslation"
import { NotFoundPage } from "./NotFoundPage"

type DetailColumnProps = {
  title: string
  items: string[]
}

function DetailColumn({ title, items }: DetailColumnProps) {
  return (
    <div className="detail-column">
      <Title as="h2">{title}</Title>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function ServiceDetailPage() {
  const { service: slug } = useParams()
  const { localize, tx } = useTranslation()
  const service = services.find((item) => item.slug === slug)

  if (!service) return <NotFoundPage />

  return (
    <>
      <PageMeta
        title={localize(service.title)}
        description={localize(service.short)}
      />
      <PageIntro
        index={service.index}
        eyebrow={tx("SERVICE", "SERVICE")}
        title={localize(service.title)}
        copy={localize(service.intro)}
      />
      <section className="service-detail-grid">
        <DetailColumn
          title={tx(
            "Problems we can address",
            "Problèmes que nous pouvons traiter",
          )}
          items={service.problems.map(localize)}
        />
        <DetailColumn
          title={tx(
            "What the work can include",
            "Ce que le projet peut inclure",
          )}
          items={service.deliverables.map(localize)}
        />
      </section>
      <section className="engagement">
        <span className="eyebrow">PROCESS / 04</span>
        <Title>
          {tx("A grounded way to build.", "Une façon concrète de construire.")}
        </Title>
        <div className="engagement__steps">
          {[
            tx("Discover", "Découvrir"),
            tx("Define", "Définir"),
            tx("Deliver", "Livrer"),
            tx("Transfer", "Transmettre"),
          ].map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              <b>{item}</b>
            </div>
          ))}
        </div>
      </section>
      <section className="faq-section">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <Title>{tx("Straight answers.", "Des réponses directes.")}</Title>
        </div>
        <div className="faq-list">
          {service.faq.map((item) => (
            <details key={localize(item.question)}>
              <summary>
                {localize(item.question)} <span>+</span>
              </summary>
              <p>{localize(item.answer)}</p>
            </details>
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  )
}
