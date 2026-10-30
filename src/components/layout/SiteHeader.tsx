import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router"
import { useSectionNav } from "../../hooks/useSectionNav"
import { useLocale } from "../../i18n/Locale"
import { ActionLink, BrandLogo, Button, TextLink } from "../ui"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { active } = useSectionNav()
  const { tx } = useLocale()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [location.key])

  // Escape closes the mobile menu and returns focus to its button.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      toggleRef.current?.focus()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const navItems = [
    { id: "about", label: tx("About", "À propos") },
    { id: "services", label: tx("Services", "Services") },
    { id: "work", label: tx("Work", "Projets") },
  ]

  return (
    <header className="site-header">
      <TextLink
        to="/#home"
        className="logo-link"
        aria-label={tx("stqck home", "Accueil stqck")}
        onClick={() => setOpen(false)}
      >
        <BrandLogo />
      </TextLink>
      <nav
        className="desktop-nav"
        aria-label={tx("Main navigation", "Navigation principale")}
      >
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={`/#${item.id}`}
            className={active === item.id ? "is-active" : ""}
            aria-current={active === item.id ? "location" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <ActionLink to="/#contact" variant="acid" className="desktop-cta">
          {tx("Start a project", "Parlons projet")}{" "}
          <span aria-hidden="true">↗</span>
        </ActionLink>
        <Button
          ref={toggleRef}
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span className="menu-toggle__icon" aria-hidden="true" />
          {open ? tx("Close", "Fermer") : tx("Menu", "Menu")}
        </Button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={tx("Mobile navigation", "Navigation mobile")}
        >
          {navItems.map((item, index) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              className={active === item.id ? "is-active" : ""}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              0{index + 1} / {item.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className={active === "contact" ? "is-active" : ""}
            aria-current={active === "contact" ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            04 / {tx("Start a project", "Parlons projet")}
          </Link>
        </nav>
      )}
    </header>
  )
}
