import { Outlet } from "react-router"
import { SectionNavProvider } from "../../hooks/useSectionNav"
import { useLocale } from "../../i18n/Locale"
import { Anchor } from "../ui"
import { SiteFooter } from "./SiteFooter"
import { SiteHeader } from "./SiteHeader"

export function SiteLayout() {
  const { tx } = useLocale()

  return (
    <SectionNavProvider>
      <Anchor className="skip-link" href="#main">
        {tx("Skip to content", "Aller au contenu")}
      </Anchor>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </SectionNavProvider>
  )
}
