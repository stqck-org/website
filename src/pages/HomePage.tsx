import { ClosingCta } from "../components/ClosingCta"
import { PageMeta } from "../components/PageMeta"
import { ServiceList } from "../components/ServiceList"
import { ProjectGrid } from "../components/project/ProjectGrid"
import { ActionLink, Arrow, PixelMark, TextLink, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function HomePage() {
  const { tx } = useTranslation()

  return (
    <>
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
      <section className="hero">
        <div className="hero__copy">
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
            <ActionLink to="/work" variant="acid">
              {tx("Explore our work", "Voir nos projets")} <Arrow />
            </ActionLink>
            <TextLink to="/services">
              {tx("See what we do", "Découvrir nos services")} →
            </TextLink>
          </div>
        </div>
        <div className="hero__mark">
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
      </section>

      <section className="positioning">
        <span className="section-number">01</span>
        <Title>
          {tx(
            "Good software should make work easier.",
            "Un bon logiciel doit simplifier le travail.",
          )}
        </Title>
        <p>
          {tx(
            "We help businesses build better digital tools, improve existing systems, and turn useful ideas into working products.",
            "Nous aidons les entreprises à créer de meilleurs outils numériques, à améliorer leurs systèmes et à transformer des idées utiles en produits fonctionnels.",
          )}
        </p>
      </section>

      <section className="section section--services">
        <div className="section-head">
          <span className="eyebrow">
            02 / {tx("WHAT WE BUILD", "CE QUE NOUS CRÉONS")}
          </span>
          <Title>
            {tx(
              "Useful things, built properly.",
              "Des outils utiles, bien construits.",
            )}
          </Title>
        </div>
        <ServiceList />
      </section>

      <section className="section section--work">
        <div className="section-head section-head--split">
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
              "Real client work is being prepared. Until then, these clearly labeled concept studies show how we think—never who we've worked for.",
              "Nos projets clients sont en cours de préparation. En attendant, ces études conceptuelles clairement identifiées montrent notre façon de penser — jamais de faux clients.",
            )}
          </p>
        </div>
        <ProjectGrid />
      </section>

      <section className="process-section">
        <div className="section-head">
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
            <article key={title}>
              <span>0{index + 1}</span>
              <Title as="h3">{title}</Title>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="principles">
        <div className="principles__title">
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
          <p>
            <span>01</span>
            {tx(
              "Practical solutions, not unnecessary complexity.",
              "Des solutions pratiques, sans complexité inutile.",
            )}
          </p>
          <p>
            <span>02</span>
            {tx(
              "Fair value, not a race to the lowest price.",
              "Un prix juste, pas une course au moins cher.",
            )}
          </p>
          <p>
            <span>03</span>
            {tx(
              "Clear communication—even when something is blocked.",
              "Une communication claire — même quand ça bloque.",
            )}
          </p>
          <p>
            <span>04</span>
            {tx(
              "Systems you can understand and build on.",
              "Des systèmes que vous pouvez comprendre et faire évoluer.",
            )}
          </p>
        </div>
      </section>
      <ClosingCta />
    </>
  )
}
