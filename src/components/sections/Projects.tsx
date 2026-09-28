import { useState } from "react";

import { projects } from "../../data/projects";
import { Arrow } from "../ui/Arrow";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

export function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const project = projects[selectedIndex];

  function selectProject(index: number) {
    if (index === selectedIndex) return;
    setFading(true);
    // Fade the media out, swap the src, then fade back in on load — the same
    // two-phase handoff the ingredient slider uses. Kept on the inner frame so
    // the `.reveal`/`is-visible` classes on `.project-media` are never
    // overwritten by a React className update.
    window.setTimeout(() => setSelectedIndex(index), 240);
  }

  return (
    <section className="projects section-light" id="work">
      <div className="shell">
        <div className="project-header reveal">
          <div>
            <div className="section-label">
              <span>03</span>
              <span>Selected work</span>
            </div>
            <Heading as="h2">Built to move.</Heading>
          </div>
          <span className="project-counter">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="project-picker">
          <div className="project-description reveal">
            <span className="detail-label">
              {project.type} — {project.client}
            </span>
            <p className="project-lede">{project.tagline}</p>
            <p className="project-summary">{project.description}</p>
            <Link
              className="text-link"
              href="#contact"
              ariaLabel={`Start a project like ${project.title}`}
            >
              View case study <Arrow />
            </Link>
          </div>
          <ol className="project-list reveal">
            {projects.map((item, index) => (
              <li key={item.title}>
                <Button
                  ariaLabel={`Select ${item.title}`}
                  className={`project-row ${index === selectedIndex ? "selected" : ""}`}
                  onClick={() => selectProject(index)}
                >
                  <span className="project-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{item.title}</strong>
                  <span className="project-row-type">{item.type}</span>
                </Button>
              </li>
            ))}
          </ol>
          <div className="project-media reveal">
            <div
              className={`project-media-frame ${fading ? "is-fading" : ""}`}
            >
              <img
                src={project.image}
                alt=""
                onLoad={() => setFading(false)}
                onError={() => setFading(false)}
              />
              <div className="project-media-caption">
                <strong>{project.title}</strong>
                <span>{project.client}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}