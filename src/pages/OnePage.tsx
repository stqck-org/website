import { useRef } from "react"
import { PageMeta } from "../components/PageMeta"
import { useActiveSection } from "../hooks/useActiveSection"
import { useHashScroll } from "../hooks/useHashScroll"
import { useRevealOnScroll } from "../hooks/useRevealOnScroll"
import { useSectionNav } from "../hooks/useSectionNav"
import { useTranslation } from "../i18n/useTranslation"
import { AboutSection } from "../sections/AboutSection"
import { ContactSection } from "../sections/ContactSection"
import { HomeSection } from "../sections/HomeSection"
import { PrinciplesSection } from "../sections/PrinciplesSection"
import { ProcessSection } from "../sections/ProcessSection"
import { ServicesSection } from "../sections/ServicesSection"
import { WorkSection } from "../sections/WorkSection"

export function OnePage() {
  const { tx } = useTranslation()
  const { setActive } = useSectionNav()
  const pageRef = useRef<HTMLDivElement>(null)

  useActiveSection(setActive)
  useHashScroll()
  useRevealOnScroll(pageRef)

  return (
    <div ref={pageRef}>
      <PageMeta
        title={tx(
          "Digital studio based in Madagascar",
          "Studio numérique basé à Madagascar",
        )}
        description={tx(
          "Websites, business systems, and e-commerce solutions built around the way you work.",
          "Des sites web, outils de gestion et solutions e-commerce adaptés à votre façon de travailler.",
        )}
      />

      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <PrinciplesSection />
      <ContactSection />
    </div>
  )
}
