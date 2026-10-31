import type { Project } from "../../data/projects"

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className={`project-visual project-visual--${project.visual}`}
      aria-hidden="true"
    >
      {project.visual === "lime" ? (
        <>
          <span>ERP / SYSTEM</span>
          <b>E/N</b>
          <i />
          <small>ERP / SYSTEM</small>
        </>
      ) : (
        <>
          <span>WEB / MOBILE</span>
          <b>Eco</b>
          <i />
          <small>WEB / MOBILE</small>
        </>
      )}
    </div>
  )
}
