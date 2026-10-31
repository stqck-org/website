import { useLocale } from "../../i18n/Locale"
import { ActionLink, BrandLogo, TextLink } from "../ui"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function SiteFooter() {
  const { tx } = useLocale()

  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <BrandLogo inverse />
        <p>
          {tx(
            "Solid work, honestly done.",
            "Du travail solide, en toute transparence.",
          )}
        </p>
      </div>
      <div className="footer-links">
        <div>
          <span className="eyebrow">{tx("Navigate", "Navigation")}</span>
          <TextLink to="/#about">{tx("About", "À propos")}</TextLink>
          <TextLink to="/#services">{tx("Services", "Services")}</TextLink>
          <TextLink to="/#work">{tx("Work", "Projets")}</TextLink>
        </div>
        <div>
          <span className="eyebrow">{tx("Services", "Services")}</span>
          <TextLink to="/?service=web-development#service-web-development">
            {tx("Web development", "Développement web")}
          </TextLink>
          <TextLink to="/?service=erp-business-systems#service-erp-business-systems">
            {tx("Business systems", "Systèmes de gestion")}
          </TextLink>
          <TextLink to="/?service=ecommerce#service-ecommerce">
            E-commerce
          </TextLink>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">
            {tx("Have a useful problem?", "Un problème utile à résoudre ?")}
          </span>
          <ActionLink to="/#contact" variant="acid">
            {tx("Tell us about it", "Parlez-nous-en")}{" "}
            <span aria-hidden="true">→</span>
          </ActionLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} stqck</span>
        <span>
          {tx(
            "Madagascar rooted / Africa ready",
            "Ancré à Madagascar / ouvert sur l’Afrique",
          )}
        </span>
        <LanguageSwitcher inverted />
      </div>
    </footer>
  )
}
