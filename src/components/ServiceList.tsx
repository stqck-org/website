import { services } from "../data/services"
import { useTranslation } from "../i18n/useTranslation"
import { Arrow, TextLink, Title } from "./ui"

export function ServiceList({ compact = false }: { compact?: boolean }) {
  const { localize, tx } = useTranslation()

  return (
    <div className={`service-list ${compact ? "service-list--compact" : ""}`}>
      {services.map((service) => (
        <article className="service-row" key={service.slug}>
          <span className="service-index">{service.index}</span>
          <div>
            <Title as="h3">{localize(service.title)}</Title>
            <p>{localize(service.short)}</p>
          </div>
          <TextLink
            to={`/services/${service.slug}`}
            aria-label={`${tx("View", "Voir")} ${localize(service.title)}`}
          >
            <Arrow />
          </TextLink>
        </article>
      ))}
    </div>
  )
}
