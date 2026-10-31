import { Section } from "../components/Section"
import { PixelMark, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function AboutSection() {
  const { tx } = useTranslation()

  return (
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
  )
}
