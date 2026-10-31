import { Section } from "../components/Section"
import { Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function ProcessSection() {
  const { tx } = useTranslation()

  return (
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
          <article key={index} data-reveal data-reveal-delay={index % 3}>
            <span>0{index + 1}</span>
            <Title as="h3">{title}</Title>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
