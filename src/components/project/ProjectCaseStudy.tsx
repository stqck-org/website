import type { Project } from "../../data/projects"
import { useTranslation } from "../../i18n/useTranslation"
import { Button, Title } from "../ui"

type ProjectCaseStudyProps = {
  project: Project
  onClose: () => void
}

export function ProjectCaseStudy({ project, onClose }: ProjectCaseStudyProps) {
  const { localize, tx } = useTranslation()

  return (
    <div className="project-case__grid">
      <div className="project-case__block project-case__question">
        <span className="eyebrow">
          {tx("THE QUESTION", "LE POINT DE DÉPART")}
        </span>
        <Title as="h4">{localize(project.problem)}</Title>
      </div>
      <div className="project-case__block">
        <span className="eyebrow">{tx("THE DIRECTION", "L’APPROCHE")}</span>
        <p>{localize(project.solution)}</p>
        <div className="project-case__scope-block">
          <span className="eyebrow">
            {tx("CONCEPT SCOPE", "PÉRIMÈTRE DU CONCEPT")}
          </span>
          <ol className="project-case__scope">
            {project.deliverables.map((item, index) => (
              <li key={index}>
                <span>0{index + 1}</span>
                {localize(item)}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="project-case__note">
        <div>
          <Title as="h4">
            {tx("Honest by design.", "La transparence dès le départ.")}
          </Title>
          <p>
            {tx(
              "This study shows an approach and a visual direction. It isn't a commissioned product, doesn't use real customer data, and doesn't claim measured business results.",
              "Cette étude présente une approche et une direction visuelle. Il ne s’agit pas d’un produit réalisé sur commande, elle n’utilise pas de données clients réelles et ne revendique aucun résultat commercial mesuré.",
            )}
          </p>
        </div>
        <Button className="project-case__close" onClick={onClose}>
          {tx("Close case study", "Fermer l’étude de cas")}
          <span aria-hidden="true">−</span>
        </Button>
      </div>
    </div>
  )
}
