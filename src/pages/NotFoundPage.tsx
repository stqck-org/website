import { PageMeta } from "../components/PageMeta"
import { ActionLink, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function NotFoundPage() {
  const { tx } = useTranslation()

  return (
    <>
      <PageMeta
        title={tx("Page not found", "Page introuvable")}
        description={tx(
          "This page doesn't exist or may have moved.",
          "Cette page n’existe pas ou a peut-être été déplacée.",
        )}
      />
      <section className="not-found">
        <span>404</span>
        <Title as="h1">{tx("Wrong layer.", "Pas la bonne couche.")}</Title>
        <p>
          {tx(
            "This page doesn't exist or may have moved.",
            "Cette page n’existe pas ou a peut-être été déplacée.",
          )}
        </p>
        <ActionLink to="/#home" variant="acid">
          {tx("Back home", "Retour à l’accueil")} →
        </ActionLink>
      </section>
    </>
  )
}
