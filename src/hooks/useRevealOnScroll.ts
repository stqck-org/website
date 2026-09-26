import { useEffect } from "react";

/**
 * Adds `is-visible` to every `.reveal` element once it scrolls into view, which
 * drives the reveal animation in index.css.
 *
 * This is deliberately a hook called once from App rather than a <Reveal>
 * wrapper component: `.reveal` sits on elements that are direct children of CSS
 * grid layouts (.about-grid > .about-manifesto, .project-grid, .team-content,
 * .contact-form, ...), so wrapping them in extra elements would change how those
 * grids lay out. A component boundary adds no DOM; a wrapper would.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
