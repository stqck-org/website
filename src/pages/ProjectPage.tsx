import { useParams } from "react-router"
import { ClosingCta } from "../components/ClosingCta"
import { PageMeta } from "../components/PageMeta"
import { ProjectVisual } from "../components/project/ProjectVisual"
import { Title } from "../components/ui"
import { projects } from "../data/projects"
import { useTranslation } from "../i18n/useTranslation"
import { NotFoundPage } from "./NotFoundPage"

export function ProjectPage() {
  const { slug } = useParams()
  const { localize, tx } = useTranslation()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <NotFoundPage />

  return (
    <>
      <PageMeta title={project.title} description={localize(project.summary)} />
      <section className="case-hero">
        <div>
          <span className="concept-label">
            {tx(
              "SELF-INITIATED CONCEPT — NOT CLIENT WORK",
              "CONCEPT AUTO-INITIÉ — PAS UN PROJET CLIENT",
            )}
          </span>
          <Title as="h1">{project.title}</Title>
          <p>{localize(project.summary)}</p>
        </div>
        <ProjectVisual project={project} />
      </section>
      <section className="case-details">
        <div>
          <span className="eyebrow">{tx("THE QUESTION", "LA QUESTION")}</span>
          <Title as="h2">{localize(project.problem)}</Title>
        </div>
        <div>
          <span className="eyebrow">{tx("THE DIRECTION", "LA DIRECTION")}</span>
          <p>{localize(project.solution)}</p>
        </div>
      </section>
      <section className="case-scope">
        <span className="eyebrow">
          {tx("CONCEPT SCOPE", "PÉRIMÈTRE DU CONCEPT")}
        </span>
        <div>
          {project.deliverables.map((item, index) => (
            <p key={localize(item)}>
              <span>0{index + 1}</span>
              {localize(item)}
            </p>
          ))}
        </div>
      </section>
      <section className="case-note">
        <Title>{tx("Honest by design.", "Honnête, par conception.")}</Title>
        <p>
          {tx(
            "This study demonstrates an approach and visual direction. It does not represent a commissioned product, real customer data, or measured business results.",
            "Cette étude présente une approche et une direction visuelle. Elle ne représente ni un produit commandé, ni des données clients réelles, ni des résultats commerciaux mesurés.",
          )}
        </p>
      </section>
      <ClosingCta />
    </>
  )
}
