import { useState } from "react";

import { heroImage, menuLinks } from "../../data/site";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="hero" id="home">
      <img
        className="hero-media"
        src={heroImage}
        alt="Creative studio team collaborating around a desk"
      />
      <div className="hero-shade" />
      <nav className="nav shell" aria-label="Main navigation">
        <Link className="logo logo-light" href="#home">
          stqck<span className="logo-dot">.</span>
        </Link>
        <div className="nav-actions">
          <span className="language">EN</span>
          <Button
            ariaLabel="Toggle navigation"
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
            href={`#${item.toLowerCase()}`}
            key={item}
            className="menu-link"
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="hero-copy shell">
        <Heading as="h1">
         stqck
        </Heading>
        <div className="hero-kicker">We make stuff</div>
        <Link className="scroll-cue" href="#about">
          <span>DISCOVER OUR WORK</span>
          <span className="chevron" />
        </Link>
      </div>
      <div className="hero-index">01 — 06</div>
    </section>
  );
}
