import { useState } from "react"
import { services } from "../data/services"
import { useTranslation } from "../i18n/useTranslation"
import { Title } from "./ui"

type ServiceListProps = {
  openSlug?: string | null
  onToggle?: (slug: string) => void
}

type DetailColumnProps = {
  title: string
  items: string[]
}

function DetailColumn({ title, items }: DetailColumnProps) {
  return (
    <div className="detail-column">
      <Title as="h3">{title}</Title>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function ServiceList({ openSlug, onToggle }: ServiceListProps) {
  const { localize, tx } = useTranslation()
  const [internalOpen, setInternalOpen] = useState<string | null>(null)
  const open = openSlug === undefined ? internalOpen : openSlug

  const toggle = (slug: string) => {
    if (onToggle) {
      onToggle(slug)
      return
    }
    setInternalOpen((current) => (current === slug ? null : slug))
  }

  return (
    <div className="service-list">
      {services.map((service) => {
        const isOpen = open === service.slug
        const panelId = `service-panel-${service.slug}`

        return (
          <article
            className={`service-row ${isOpen ? "is-open" : ""}`}
            id={`service-${service.slug}`}
            key={service.slug}
          >
            <h3 className="service-row__heading">
              <button
                type="button"
                className="service-row__toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(service.slug)}
              >
                <span className="service-index">{service.index}</span>
                <span className="service-row__body">
                  <span className="service-row__title">
                    {localize(service.title)}
                  </span>
                  <span className="service-row__short">
                    {localize(service.short)}
                  </span>
                </span>
                <span className="service-row__icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div className="service-panel" id={panelId} hidden={!isOpen}>
              <p className="service-panel__intro">{localize(service.intro)}</p>
              <div className="service-detail-grid">
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
              </div>
              <div className="service-panel__faq">
                <Title as="h4">
                  {tx("Straight answers.", "Des réponses directes.")}
                </Title>
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
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
