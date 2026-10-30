import { ActionLink, Title } from "../components/ui"
import { useTranslation } from "../i18n/useTranslation"

export function NotFoundPage() {
  const { tx } = useTranslation()

  return (
    <section className="not-found">
      <span>404</span>
      <Title as="h1">{tx("Wrong layer.", "Mauvaise couche.")}</Title>
      <p>
        {tx(
          "This page does not exist or has moved.",
          "Cette page n’existe pas ou a été déplacée.",
        )}
      </p>
      <ActionLink to="/" variant="acid">
        {tx("Back home", "Retour à l’accueil")} →
      </ActionLink>
    </section>
  )
}
