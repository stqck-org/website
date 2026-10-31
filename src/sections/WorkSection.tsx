import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { Section } from "../components/Section"
import { ProjectGrid } from "../components/project/ProjectGrid"
import { Button, Title } from "../components/ui"
import { projects } from "../data/projects"
import { useTranslation } from "../i18n/useTranslation"

export function WorkSection() {
  const { tx } = useTranslation()
  const [searchParams] = useSearchParams()
  const [filter, setFilter] = useState("all")
  const [openProject, setOpenProject] = useState<string | null>(null)

  // Legacy detail URLs arrive as /?project=<slug>#project-<slug>.
  useEffect(() => {
    const project = searchParams.get("project")
    if (project) setOpenProject(project)
  }, [searchParams])

  const visibleProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === "commerce") return project.slug === "market-day"
    return project.slug === "ledger-00"
  })

  return (
    <Section id="work" className="section--work">
      <section className="section section--work">
        <div className="section-head section-head--split" data-reveal>
          <div>
            <span className="eyebrow">
              03 / {tx("SELECTED WORK", "SÉLECTION DE PROJETS")}
            </span>
            <Title>
              {tx(
                "Work that speaks for itself.",
                "Un travail qui parle de lui-même.",
              )}
            </Title>
          </div>
          <p>
            {tx(
              "Real client work is being prepared. Until then, these clearly labeled concept studies show how we think—never who we've worked for. No invented clients, no imaginary growth metrics.",
              "Nos projets clients sont en cours de préparation. En attendant, ces études conceptuelles clairement identifiées montrent notre façon de penser — jamais de faux clients. Pas de clients inventés, pas de chiffres imaginaires.",
            )}
          </p>
        </div>
        <div
          className="filters"
          aria-label={tx("Project filters", "Filtres de projets")}
        >
          {[
            ["all", tx("All", "Tous")],
            ["commerce", "E-commerce"],
            ["systems", tx("Systems", "Systèmes")],
          ].map(([value, label]) => (
            <Button
              key={value}
              onClick={() => setFilter(value)}
              className={filter === value ? "is-active" : ""}
            >
              {label}
            </Button>
          ))}
        </div>
        <ProjectGrid
          items={visibleProjects}
          openSlug={openProject}
          onToggle={(slug) =>
            setOpenProject((current) => (current === slug ? null : slug))
          }
        />
      </section>
    </Section>
  )
}
