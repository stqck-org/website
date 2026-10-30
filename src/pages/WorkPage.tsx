import { useState } from "react"
import { ClosingCta } from "../components/ClosingCta"
import { PageIntro } from "../components/PageIntro"
import { PageMeta } from "../components/PageMeta"
import { ProjectGrid } from "../components/project/ProjectGrid"
import { Button } from "../components/ui"
import { projects } from "../data/projects"
import { useTranslation } from "../i18n/useTranslation"

export function WorkPage() {
  const { tx } = useTranslation()
  const [filter, setFilter] = useState("all")
  const visibleProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === "commerce") return project.slug === "market-day"
    return project.slug === "ledger-00"
  })

  return (
    <>
      <PageMeta
        title={tx("Work", "Projets")}
        description={tx(
          "Selected self-initiated digital product studies.",
          "Sélection d’études auto-initiées de produits numériques.",
        )}
      />
      <PageIntro
        index="02"
        eyebrow={tx("WORK", "PROJETS")}
        title={tx(
          "Proof, without the theatre.",
          "Des preuves, sans mise en scène.",
        )}
        copy={tx(
          "No invented clients. No imaginary growth metrics. These are self-initiated concept studies while verified case studies are prepared.",
          "Pas de clients inventés. Pas de chiffres imaginaires. Voici des études conceptuelles auto-initiées, en attendant des cas clients vérifiés.",
        )}
      />
      <section className="work-content">
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
        <ProjectGrid items={visibleProjects} />
      </section>
      <ClosingCta />
    </>
  )
}
