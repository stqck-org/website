import { projects, type Project } from "../../data/projects"
import { useTranslation } from "../../i18n/useTranslation"
import { TextLink, Title } from "../ui"
import { ProjectVisual } from "./ProjectVisual"

export function ProjectGrid({ items = projects }: { items?: Project[] }) {
  const { localize, tx } = useTranslation()

  return (
    <div className="project-grid">
      {items.map((project, index) => (
        <article
          className={`project-card project-card--${index + 1}`}
          key={project.slug}
        >
          <TextLink to={`/work/${project.slug}`} className="project-image-link">
            <ProjectVisual project={project} />
          </TextLink>
          <div className="project-card__meta">
            <span className="concept-label">
              {tx("SELF-INITIATED CONCEPT", "CONCEPT AUTO-INITIÉ")}
            </span>
            <span>{localize(project.category)}</span>
          </div>
          <Title as="h3">
            <TextLink to={`/work/${project.slug}`}>{project.title}</TextLink>
          </Title>
          <p>{localize(project.summary)}</p>
        </article>
      ))}
    </div>
  )
}
