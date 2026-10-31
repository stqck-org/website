import { useState } from "react"
import { projects, type Project } from "../../data/projects"
import { useTranslation } from "../../i18n/useTranslation"
import { Title } from "../ui"
import { ProjectVisual } from "./ProjectVisual"

type ProjectGridProps = {
  items?: Project[]
  openSlug?: string | null
  onToggle?: (slug: string) => void
}

export function ProjectGrid({
  items = projects,
  openSlug,
  onToggle,
}: ProjectGridProps) {
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
    <div className="project-grid">
      {items.map((project, index) => {
        const isOpen = open === project.slug
        const panelId = `project-case-${project.slug}`

        return (
          <article
            className={`project-card project-card--${index + 1}`}
            id={`project-${project.slug}`}
            key={project.slug}
          >
            <button
              type="button"
              className="project-image-link"
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={`${project.title} — ${tx(
                "case study",
                "étude de cas",
              )}`}
              onClick={() => toggle(project.slug)}
            >
              <ProjectVisual project={project} />
            </button>
            <div className="project-card__meta">
              <span className="concept-label">
                {tx("SELF-INITIATED CONCEPT", "CONCEPT AUTO-INITIÉ")}
              </span>
              <span>{localize(project.category)}</span>
            </div>
            <Title as="h3">{project.title}</Title>
            <p>{localize(project.summary)}</p>
            <button
              type="button"
              className="project-toggle"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(project.slug)}
            >
              {isOpen
                ? tx("Close case study", "Fermer l’étude de cas")
                : tx("Read the case study", "Lire l’étude de cas")}
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="project-case" id={panelId} hidden={!isOpen}>
              <div className="project-case__block">
                <span className="eyebrow">
                  {tx("THE QUESTION", "LA QUESTION")}
                </span>
                <Title as="h4">{localize(project.problem)}</Title>
              </div>
              <div className="project-case__block">
                <span className="eyebrow">
                  {tx("THE DIRECTION", "LA DIRECTION")}
                </span>
                <p>{localize(project.solution)}</p>
              </div>
              <div className="project-case__block">
                <span className="eyebrow">
                  {tx("CONCEPT SCOPE", "PÉRIMÈTRE DU CONCEPT")}
                </span>
                <ol className="project-case__scope">
                  {project.deliverables.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <span>0{itemIndex + 1}</span>
                      {localize(item)}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="project-case__note">
                <Title as="h4">
                  {tx("Honest by design.", "Honnête, par conception.")}
                </Title>
                <p>
                  {tx(
                    "This study demonstrates an approach and visual direction. It does not represent a commissioned product, real customer data, or measured business results.",
                    "Cette étude présente une approche et une direction visuelle. Elle ne représente ni un produit commandé, ni des données clients réelles, ni des résultats commerciaux mesurés.",
                  )}
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
