import type { Project } from "../../data/projects"

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className={`project-visual project-visual--${project.visual}`}
      aria-hidden="true"
    >
      {project.visual === "lime" ? (
        <>
          <span>LOCAL / GOODS</span>
          <b>M/D</b>
          <i />
          <small>CATALOGUE STUDY — 001</small>
        </>
      ) : (
        <>
          <span>OPS OVERVIEW</span>
          <b>00</b>
          <i />
          <small>EXCEPTIONS / ACTIVITY / ACTION</small>
        </>
      )}
    </div>
  )
}
