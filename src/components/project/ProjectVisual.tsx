import type { Project } from "../../data/projects"
import { useTranslation } from "../../i18n/useTranslation"

export function ProjectVisual({ project }: { project: Project }) {
  const { localize, tx } = useTranslation()

  return (
    <div
      className={`project-visual project-visual--${project.visual}`}
      aria-hidden="true"
    >
      <span>{localize(project.category)}</span>
      <b>{project.mark}</b>
      <i />
      <small>{tx("SELF-INITIATED", "AUTO-INITIÉ")}</small>
    </div>
  )
}
