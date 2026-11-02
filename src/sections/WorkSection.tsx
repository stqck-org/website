import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { Section } from "../components/Section"
import { ProjectShowcase } from "../components/project/ProjectShowcase"
import { Button, Title } from "../components/ui"
import { projects, projectSectors, type ProjectSector } from "../data/projects"
import { useTranslation } from "../i18n/useTranslation"

type FilterValue = "all" | ProjectSector

function filterProjects(value: FilterValue) {
  if (value === "all") return projects
  return projects.filter((project) => project.sectors.includes(value))
}

export function WorkSection() {
  const { localize, tx } = useTranslation()
  const [searchParams] = useSearchParams()
  const [filter, setFilter] = useState<FilterValue>("all")
  const [activeSlug, setActiveSlug] = useState<string | null>(
    projects[0]?.slug ?? null,
  )
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  // Legacy detail URLs arrive as /?project=<slug>#project-<slug>.
  useEffect(() => {
    const requested = searchParams.get("project")
    if (!requested) return

    const match = projects.find(
      (project) =>
        project.slug === requested || project.aliases?.includes(requested),
    )
    if (!match) return

    setFilter("all")
    setActiveSlug(match.slug)
    setOpenSlug(match.slug)
  }, [searchParams])

  const visibleProjects = filterProjects(filter)
  const presentSectors = projectSectors.filter((sector) =>
    projects.some((project) => project.sectors.includes(sector.value)),
  )

  const filterOptions: {
    value: FilterValue
    label: string
    count: number
  }[] = [
    { value: "all", label: tx("All", "Tous"), count: projects.length },
    ...presentSectors.map((sector) => ({
      value: sector.value,
      label: localize(sector.label),
      count: filterProjects(sector.value).length,
    })),
  ]

  const chooseFilter = (value: FilterValue) => {
    setFilter(value)
    const nextItems = filterProjects(value)

    if (!nextItems.some((project) => project.slug === activeSlug)) {
      setActiveSlug(nextItems[0]?.slug ?? null)
      setOpenSlug(null)
    }
  }

  const selectProject = (slug: string) => {
    setActiveSlug(slug)
    setOpenSlug(null)
  }

  const toggleProject = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug))
  }

  return (
    <Section id="work" className="section section--work">
      <div className="section-head section-head--split" data-reveal>
        <div>
          <span className="eyebrow">
            03 / {tx("SELECTED WORK", "QUELQUES PROJETS")}
          </span>
          <Title>
            {tx(
              "A closer look at our work.",
              "Un aperçu concret de notre travail.",
            )}
          </Title>
        </div>
        <p>
          {tx(
            "We're preparing our client projects for this page. In the meantime, these clearly marked concept studies show how we approach a problem—not a list of clients we've worked with. No invented projects or made-up results.",
            "Nous préparons la présentation de nos projets clients. En attendant, ces études conceptuelles, clairement identifiées comme telles, montrent notre façon d’aborder un problème — pas des références clients. Aucun projet inventé, aucun résultat fictif.",
          )}
        </p>
      </div>
      <ProjectShowcase
        toolbar={
          <div
            className="filters"
            role="group"
            aria-label={tx("Project filters", "Filtres de projets")}
          >
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => chooseFilter(option.value)}
                className={filter === option.value ? "is-active" : ""}
                aria-pressed={filter === option.value}
              >
                {option.label}
                <span className="filter-count" aria-hidden="true">
                  {String(option.count).padStart(2, "0")}
                </span>
              </Button>
            ))}
          </div>
        }
        items={visibleProjects}
        activeSlug={activeSlug}
        onSelect={selectProject}
        openSlug={openSlug}
        onToggle={toggleProject}
      />
    </Section>
  )
}
