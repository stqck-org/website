import { useState } from "react";

import { heroImage, menuLinks } from "../../data/site";
import { languages } from "../../i18n/language";
import { useLanguage } from "../../i18n/LanguageContext";
import { useCopy } from "../../i18n/useCopy";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const copy = useCopy("hero");

  return (
    <section className="hero" id="home">
      <img
        className="hero-media"
        src={heroImage}
        alt={copy.alt.heroImage}
      />
      <div className="hero-shade" />
      <nav className="nav shell" aria-label={copy.aria.mainNav}>
        <Link className="logo logo-light" href="#home">
          stqck<span className="logo-dot">.</span>
        </Link>
        <div className="nav-actions">
          <div
            className="language-switcher"
            role="group"
            aria-label={copy.aria.language}
          >
            {languages.map((code) => (
              <Button
                ariaPressed={code === language}
                className={`language-option ${code === language ? "active" : ""}`}
                key={code}
                onClick={() => setLanguage(code)}
              >
                {code.toUpperCase()}
              </Button>
            ))}
          </div>
          <Button
            ariaLabel={copy.aria.toggleMenu}
            className={`menu-trigger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </Button>
        </div>
      </nav>
      <div className={`menu-panel ${menuOpen ? "open" : ""}`}>
        {menuLinks.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className="menu-link"
          >
            {copy.menu[item.id]}
          </Link>
        ))}
      </div>
      <div className="hero-copy shell">
        <Heading as="h1">stqck</Heading>
        <div className="hero-kicker">{copy.kicker}</div>
        <Link className="scroll-cue" href="#about">
          <span>{copy.scrollCue}</span>
          <span className="chevron" />
        </Link>
      </div>
      <div className="hero-index">01 — 06</div>
    </section>
  );
}
