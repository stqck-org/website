import { ClosingCta } from "../components/ClosingCta"
import { PageIntro } from "../components/PageIntro"
import { PageMeta } from "../components/PageMeta"
import { PixelMark, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function AboutPage() {
  const { tx } = useTranslation()

  return (
    <>
      <PageMeta
        title={tx("About", "À propos")}
        description={tx(
          "The thinking and working style behind stqck.",
          "La philosophie et la méthode de travail de stqck.",
        )}
      />
      <PageIntro
        index="03"
        eyebrow={tx("ABOUT", "À PROPOS")}
        title={tx(
          "A practical team for real problems.",
          "Une équipe pragmatique pour des problèmes réels.",
        )}
        copy={tx(
          "stqck builds digital solutions for people and businesses ready to grow. Good technology should solve real problems, make work easier, and leave people better equipped than before.",
          "stqck crée des solutions numériques pour les personnes et les entreprises prêtes à grandir. Une bonne technologie doit résoudre de vrais problèmes, faciliter le travail et rendre les équipes plus autonomes.",
        )}
      />
      <section className="name-story">
        <div className="name-story__mark">
          <PixelMark />
          <span>/stack/</span>
        </div>
        <div>
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
        <Title>
          {tx(
            "Local context is not a footnote.",
            "Le contexte local n’est pas une note de bas de page.",
          )}
        </Title>
        <p>
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
            <p key={item}>
              <span>0{index + 1}</span>
              {item}
            </p>
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  )
}
