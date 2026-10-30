import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { useLocale } from "../../i18n/Locale"
import { ActionLink, BrandLogo, Button, TextLink } from "../ui"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { tx } = useLocale()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <TextLink
        to="/"
        className="logo-link"
        aria-label={tx("stqck home", "Accueil stqck")}
      >
        <BrandLogo />
      </TextLink>
      <nav
        className="desktop-nav"
        aria-label={tx("Main navigation", "Navigation principale")}
      >
        <NavLink to="/services">{tx("Services", "Services")}</NavLink>
        <NavLink to="/work">{tx("Work", "Projets")}</NavLink>
        <NavLink to="/about">{tx("About", "À propos")}</NavLink>
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <ActionLink to="/contact" variant="acid" className="desktop-cta">
          {tx("Start a project", "Parlons projet")}{" "}
          <span aria-hidden="true">↗</span>
        </ActionLink>
        <Button
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? tx("Close", "Fermer") : tx("Menu", "Menu")}
        </Button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={tx("Mobile navigation", "Navigation mobile")}
        >
          <NavLink to="/services">01 / {tx("Services", "Services")}</NavLink>
          <NavLink to="/work">02 / {tx("Work", "Projets")}</NavLink>
          <NavLink to="/about">03 / {tx("About", "À propos")}</NavLink>
          <NavLink to="/contact">
            04 / {tx("Start a project", "Parlons projet")}
          </NavLink>
        </nav>
      )}
    </header>
  )
}
