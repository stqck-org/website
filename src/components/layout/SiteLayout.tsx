import { useEffect } from "react"
import { Outlet, useLocation } from "react-router"
import { useLocale } from "../../i18n/Locale"
import { Anchor } from "../ui"
import { SiteFooter } from "./SiteFooter"
import { SiteHeader } from "./SiteHeader"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return null
}

export function SiteLayout() {
  const { tx } = useLocale()

  return (
    <>
      <ScrollToTop />
      <Anchor className="skip-link" href="#main">
        {tx("Skip to content", "Aller au contenu")}
      </Anchor>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
