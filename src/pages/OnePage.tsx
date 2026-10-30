import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router"
import { ClosingCta } from "../components/ClosingCta"
import { PageMeta } from "../components/PageMeta"
import { ScrollCue } from "../components/ScrollCue"
import { Section } from "../components/Section"
import { ServiceList } from "../components/ServiceList"
import { ContactForm } from "../components/contact/ContactForm"
import { ProjectGrid } from "../components/project/ProjectGrid"
import {
  ActionLink,
  Arrow,
  Button,
  PixelMark,
  TextLink,
  Title,
} from "../components/ui"
import { projects } from "../data/projects"
import { useActiveSection } from "../hooks/useActiveSection"
import { useHashScroll } from "../hooks/useHashScroll"
import { useRevealOnScroll } from "../hooks/useRevealOnScroll"
import { useSectionNav } from "../hooks/useSectionNav"
import { useTranslation } from "../i18n/useTranslation"

export function OnePage() {
  const { tx } = useTranslation()
  const { setActive } = useSectionNav()
  const pageRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const [filter, setFilter] = useState("all")
  const [openService, setOpenService] = useState<string | null>(null)
  const [openProject, setOpenProject] = useState<string | null>(null)

  useActiveSection(setActive)
  useHashScroll()
  useRevealOnScroll(pageRef)

  // Legacy detail URLs arrive as /?service=<slug> or /?project=<slug>.
  useEffect(() => {
    const service = searchParams.get("service")
    const project = searchParams.get("project")
    if (service) {
      setOpenService(service)
      setOpenProject(null)
    }
    if (project) {
      setOpenProject(project)
      setOpenService(null)
    }
  }, [searchParams])

  const visibleProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === "commerce") return project.slug === "market-day"
    return project.slug === "ledger-00"
  })

  return (
    <div ref={pageRef}>
      <PageMeta
        title={tx(
          "Digital studio in Madagascar",
          "Studio numérique à Madagascar",
        )}
        description={tx(
          "Tailor-made websites, business systems, and e-commerce solutions from Madagascar.",
          "Sites web, systèmes de gestion et solutions e-commerce sur mesure depuis Madagascar.",
        )}
      />

      <Section id="home" className="hero page-section--hero">
        <div className="hero__copy" data-reveal>
          <span className="eyebrow">DIGITAL STUDIO · MADAGASCAR</span>
          <Title as="h1">
            {tx("We make", "On crée")}
            <br />
            <em>{tx("stuff.", "du solide.")}</em>
          </Title>
          <p>
            {tx(
              "We build solid, tailor-made digital solutions for businesses ready to grow — from websites and online stores to business systems that work better.",
              "Nous créons des solutions numériques solides et sur mesure pour les entreprises prêtes à grandir — des sites et boutiques en ligne aux systèmes de gestion plus efficaces.",
            )}
          </p>
          <div className="hero__actions">
            <ActionLink to="/#work" variant="acid">
              {tx("Explore our work", "Voir nos projets")} <Arrow />
            </ActionLink>
            <TextLink to="/#services">
              {tx("See what we do", "Découvrir nos services")} →
            </TextLink>
          </div>
          <ScrollCue to="/#about" />
        </div>
        <div className="hero__mark" data-reveal data-reveal-delay="1">
          <span className="hero__edition">STQ — 001</span>
          <PixelMark />
          <span className="hero__pronounce">/stack/</span>
        </div>
        <div className="hero__ticker" aria-hidden="true">
          <span>WEB</span>
          <span>·</span>
          <span>SYSTEMS</span>
          <span>·</span>
          <span>COMMERCE</span>
          <span>·</span>
          <span>MADAGASCAR</span>
        </div>
      </Section>

      <Section id="about">
        <section className="positioning">
          <span className="section-number" data-reveal>
            01
          </span>
          <Title data-reveal>
            {tx(
              "Good software should make work easier.",
              "Un bon logiciel doit simplifier le travail.",
            )}
          </Title>
          <p data-reveal>
            {tx(
              "stqck builds digital solutions for people and businesses ready to grow. We help them improve existing systems and turn useful ideas into working products — good technology should solve real problems, make work easier, and leave people better equipped than before.",
              "stqck crée des solutions numériques pour les personnes et les entreprises prêtes à grandir. Nous les aidons à améliorer leurs systèmes et à transformer des idées utiles en produits fonctionnels — une bonne technologie doit résoudre de vrais problèmes, faciliter le travail et rendre les équipes plus autonomes.",
            )}
          </p>
        </section>

        <section className="name-story">
          <div className="name-story__mark" data-reveal>
            <PixelMark />
            <span>/stack/</span>
          </div>
          <div data-reveal>
            <span className="eyebrow">
              {tx("WHAT’S IN A NAME", "DERRIÈRE LE NOM")}
            </span>
            <Title>
              {tx(
                "Stacked layers. A deliberate q.",
                "Des couches solides. Un q singulier.",
              )}
            </Title>
            <p>
              {tx(
                "The name comes from “stack”: the layers that make digital products work. The pixel-inspired q is a provisional identity idea—a small break in the expected structure.",
                "Le nom vient de « stack » : les différentes couches qui font fonctionner un produit numérique. Le q inspiré du pixel est une piste d’identité provisoire — une petite rupture dans la structure attendue.",
              )}
            </p>
          </div>
        </section>

        <section className="roots-section">
          <span className="eyebrow">MADAGASCAR / AFRICA</span>
          <Title data-reveal>
            {tx(
              "Local context is not a footnote.",
              "Le contexte local n’est pas une note de bas de page.",
            )}
          </Title>
          <p data-reveal>
            {tx(
              "Our Malagasy roots shape how we think about practical constraints, fair value, and systems that fit the realities around them. That grounded perspective can travel across the wider African market.",
              "Nos racines malgaches influencent notre approche des contraintes concrètes, du juste prix et des systèmes adaptés aux réalités locales. Cette perspective ancrée peut rayonner à travers le marché africain.",
            )}
          </p>
        </section>

        <section className="expect-section">
          <span className="eyebrow">
            {tx("WHAT TO EXPECT", "À QUOI S’ATTENDRE")}
          </span>
          <div>
            {[
              tx("Direct conversation", "Des échanges directs"),
              tx("Visible decisions", "Des décisions visibles"),
              tx("Early warnings", "Des alertes rapides"),
              tx("Useful handover", "Une transmission utile"),
            ].map((item, index) => (
              <p key={item} data-reveal data-reveal-delay={index % 3}>
                <span>0{index + 1}</span>
                {item}
              </p>
            ))}
          </div>
        </section>
      </Section>

      <Section id="services">
        <section className="section section--services">
          <div className="section-head" data-reveal>
            <span className="eyebrow">
              02 / {tx("WHAT WE BUILD", "CE QUE NOUS CRÉONS")}
            </span>
            <Title>
              {tx(
                "Useful things, built properly.",
                "Des outils utiles, bien construits.",
              )}
            </Title>
            <p className="section-lead">
              {tx(
                "We focus on three areas where thoughtful software can make a practical difference. The shape of the solution follows the problem.",
                "Nous nous concentrons sur trois domaines où un logiciel bien pensé peut faire une différence concrète. La solution s’adapte au problème.",
              )}
            </p>
          </div>
          <ServiceList
            openSlug={openService}
            onToggle={(slug) =>
              setOpenService((current) => (current === slug ? null : slug))
            }
          />
        </section>

        <section className="services-manifesto">
          <p>
            {tx(
              "Not tech for tech’s sake.",
              "Pas de technologie pour la technologie.",
            )}
          </p>
          <PixelMark compact />
          <p>
            {tx(
              "Built to be useful. Built to last.",
              "Conçu pour être utile. Conçu pour durer.",
            )}
          </p>
        </section>

        <section className="service-approach">
          <span className="eyebrow">{tx("OUR FILTER", "NOTRE FILTRE")}</span>
          <Title>{tx("Should it exist?", "Est-ce vraiment utile ?")}</Title>
          <p>
            {tx(
              "Before recommending a build, we ask whether it solves the right problem, fits the way people work, and can be maintained sensibly.",
              "Avant de recommander un développement, nous vérifions qu’il résout le bon problème, correspond aux usages et peut être maintenu raisonnablement.",
            )}
          </p>
        </section>
      </Section>

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

      <Section id="process" className="process-section">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            04 / {tx("HOW WE WORK", "NOTRE MÉTHODE")}
          </span>
          <Title>
            {tx(
              "No black boxes. Just good work.",
              "Pas de boîte noire. Juste du bon travail.",
            )}
          </Title>
        </div>
        <div className="process-grid">
          {[
            [
              tx("Understand", "Comprendre"),
              tx(
                "The real problem, context, constraints, and goals.",
                "Le vrai problème, le contexte, les contraintes et les objectifs.",
              ),
            ],
            [
              tx("Plan", "Planifier"),
              tx(
                "Scope, priorities, deliverables, and expectations.",
                "Le périmètre, les priorités, les livrables et les attentes.",
              ),
            ],
            [
              tx("Build", "Construire"),
              tx(
                "Develop, test, and refine with clear communication.",
                "Développer, tester et affiner avec une communication claire.",
              ),
            ],
            [
              tx("Hand over", "Transmettre"),
              tx(
                "Explain the system and build your capability.",
                "Expliquer le système et renforcer votre autonomie.",
              ),
            ],
          ].map(([title, copy], index) => (
            <article key={title} data-reveal data-reveal-delay={index % 3}>
              <span>0{index + 1}</span>
              <Title as="h3">{title}</Title>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="principles" className="principles">
        <div className="principles__title" data-reveal>
          <span className="eyebrow">
            05 / {tx("WHY STQCK", "POURQUOI STQCK")}
          </span>
          <Title>
            {tx("Solid work.", "Du travail solide.")}
            <br />
            <em>{tx("Honestly done.", "En toute transparence.")}</em>
          </Title>
        </div>
        <div className="principles__list">
          <p data-reveal>
            <span>01</span>
            {tx(
              "Practical solutions, not unnecessary complexity.",
              "Des solutions pratiques, sans complexité inutile.",
            )}
          </p>
          <p data-reveal>
            <span>02</span>
            {tx(
              "Fair value, not a race to the lowest price.",
              "Un prix juste, pas une course au moins cher.",
            )}
          </p>
          <p data-reveal>
            <span>03</span>
            {tx(
              "Clear communication—even when something is blocked.",
              "Une communication claire — même quand ça bloque.",
            )}
          </p>
          <p data-reveal>
            <span>04</span>
            {tx(
              "Systems you can understand and build on.",
              "Des systèmes que vous pouvez comprendre et faire évoluer.",
            )}
          </p>
        </div>
      </Section>

      <Section id="contact">
        <ClosingCta />
        <div className="contact-layout" id="contact-form" tabIndex={-1}>
          <div className="contact-aside" data-reveal>
            <p className="contact-aside__lead">
              {tx(
                "You don't need a complete specification to get started. Tell us what you need, what isn't working, or what you'd like to build.",
                "Vous n’avez pas besoin d’un cahier des charges complet. Dites-nous ce dont vous avez besoin, ce qui ne fonctionne pas ou ce que vous souhaitez créer.",
              )}
            </p>
            <span className="eyebrow">
              {tx("A GOOD START", "POUR BIEN COMMENCER")}
            </span>
            <p>
              {tx(
                "The problem in plain language.",
                "Le problème, avec des mots simples.",
              )}
            </p>
            <p>
              {tx("Who the solution is for.", "À qui s’adresse la solution.")}
            </p>
            <p>
              {tx("Any important constraints.", "Les contraintes importantes.")}
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </div>
  )
}
