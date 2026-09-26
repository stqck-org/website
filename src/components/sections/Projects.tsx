import { useState } from "react";

import {
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "../../data/projects";
import { Arrow } from "../ui/Arrow";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card ${project.size}`} key={project.title}>
      <Link href="#contact" ariaLabel={`View ${project.title} case study`}>
        <div className="project-media">
          <img src={project.image} alt="" />
          <span className="project-arrow">
            <Arrow />
          </span>
        </div>
        <div className="project-info">
          <div>
            <span className="project-index">
              / {String(index + 1).padStart(2, "0")}
            </span>
            <Heading as="h3">{project.title}</Heading>
          </div>
          <div>
            <span className="project-client">{project.client}</span>
            <p>{project.tagline}</p>
            <span className="project-type">{project.type}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const visibleProjects = projects.filter(
    (project) => filter === "All" || project.type === filter,
  );

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
          <div className="filters" role="group" aria-label="Project filters">
            {projectFilters.map((item) => (
              <Button
                className={`filter-tab ${filter === item ? "active" : ""}`}
                key={item}
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="project-grid reveal">
          {visibleProjects.map((project, index) => (
            <ProjectCard index={index} key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
