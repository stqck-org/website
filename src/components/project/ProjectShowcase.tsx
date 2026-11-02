import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react"
import type { Project } from "../../data/projects"
import { useTranslation } from "../../i18n/useTranslation"
import { Button, Title } from "../ui"
import { ProjectCaseStudy } from "./ProjectCaseStudy"
import { ProjectVisual } from "./ProjectVisual"

type ProjectShowcaseProps = {
  toolbar?: ReactNode
  items: Project[]
  activeSlug: string | null
  onSelect: (slug: string) => void
  openSlug: string | null
  onToggle: (slug: string) => void
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function ProjectShowcase({
  toolbar,
  items,
  activeSlug,
  onSelect,
  openSlug,
  onToggle,
}: ProjectShowcaseProps) {
  const { localize, tx } = useTranslation()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const toggleRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const scrollIntent = useRef<"open" | "close" | null>(null)

  const activeIndex = items.findIndex((project) => project.slug === activeSlug)
  const active = activeIndex >= 0 ? items[activeIndex] : null

  useEffect(() => {
    const intent = scrollIntent.current
    if (!intent || !active) return

    scrollIntent.current = null
    const target =
      intent === "open"
        ? panelRefs.current[active.slug]
        : toggleRefs.current[active.slug]

    target?.scrollIntoView({
      block: intent === "open" ? "start" : "center",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }, [openSlug, activeSlug])

  if (!active) {
    return (
      <>
        <div className="work-toolbar" data-reveal>
          {toolbar}
        </div>
        <div className="project-empty">
          <p>
            {tx(
              "No case studies match this filter.",
              "Aucune étude de cas ne correspond à ce filtre.",
            )}
          </p>
        </div>
      </>
    )
  }

  const position = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    items.length,
  ).padStart(2, "0")}`

  const select = (slug: string) => {
    if (slug === active.slug) return
    onSelect(slug)
    requestAnimationFrame(() => {
      tabRefs.current[slug]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      })
    })
  }

  const goTo = (index: number) => {
    const target = items[index]
    if (target) select(target.slug)
  }

  const handleToggle = (slug: string) => {
    scrollIntent.current = openSlug === slug ? "close" : "open"
    onToggle(slug)
  }

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index

    switch (event.key) {
      case "ArrowLeft":
        nextIndex = (index - 1 + items.length) % items.length
        break
      case "ArrowRight":
        nextIndex = (index + 1) % items.length
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = items.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    const nextProject = items[nextIndex]
    select(nextProject.slug)
    tabRefs.current[nextProject.slug]?.focus()
  }

  return (
    <>
      <div className="work-toolbar" data-reveal>
        {toolbar}
        <div className="work-position">
          <span aria-hidden="true">{position}</span>
          <div className="project-nav">
            <Button
              type="button"
              className="project-nav-button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex <= 0}
              aria-label={tx("Previous case study", "Étude de cas précédente")}
            >
              ←
            </Button>
            <Button
              type="button"
              className="project-nav-button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex >= items.length - 1}
              aria-label={tx("Next case study", "Étude de cas suivante")}
            >
              →
            </Button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {tx(
          `Case study ${activeIndex + 1} of ${items.length}: ${active.title}`,
          `Étude de cas ${activeIndex + 1} sur ${items.length} : ${active.title}`,
        )}
      </p>
      <div
        className="project-tablist"
        role="tablist"
        aria-label={tx("Case studies", "Études de cas")}
      >
        {items.map((project, index) => {
          const isActive = project.slug === active.slug

          return (
            <Button
              key={project.slug}
              ref={(node) => {
                tabRefs.current[project.slug] = node
              }}
              type="button"
              role="tab"
              id={`project-tab-${project.slug}`}
              aria-selected={isActive}
              aria-controls={`project-${project.slug}`}
              tabIndex={isActive ? 0 : -1}
              className="project-tab"
              onClick={() => select(project.slug)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className="project-tab__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-tab__title">{project.title}</span>
            </Button>
          )
        })}
      </div>
      {items.map((project) => {
        const isActive = project.slug === active.slug
        const isOpen = project.slug === openSlug
        const panelId = `project-case-${project.slug}`

        return (
          <article
            key={project.slug}
            id={`project-${project.slug}`}
            className="project-slide"
            role="tabpanel"
            aria-labelledby={`project-tab-${project.slug}`}
            hidden={!isActive}
            tabIndex={0}
          >
            <div className="project-stage">
              <div className="project-stage__visual">
                <ProjectVisual project={project} />
              </div>
              <div className="project-stage__content">
                <div>
                  <div className="project-stage__meta">
                    <span className="concept-label">
                      {tx("SELF-INITIATED CONCEPT", "CONCEPT INITIÉ PAR STQCK")}
                    </span>
                    <span className="project-stage__category">
                      {localize(project.category)}
                    </span>
                  </div>
                  <Title as="h3">{project.title}</Title>
                  <p>{localize(project.summary)}</p>
                </div>
                <Button
                  ref={(node) => {
                    toggleRefs.current[project.slug] = node
                  }}
                  type="button"
                  className={`project-toggle ${isOpen ? "is-open" : ""}`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(project.slug)}
                >
                  {isOpen
                    ? tx("Close case study", "Fermer l’étude de cas")
                    : tx("Read the case study", "Lire l’étude de cas")}
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </Button>
              </div>
            </div>
            <div
              ref={(node) => {
                panelRefs.current[project.slug] = node
              }}
              className="project-case"
              id={panelId}
              hidden={!isOpen}
            >
              {isOpen ? (
                <ProjectCaseStudy
                  project={project}
                  onClose={() => handleToggle(project.slug)}
                />
              ) : null}
            </div>
          </article>
        )
      })}
    </>
  )
}
