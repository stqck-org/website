import projectsEn from "../en/projects.json";
import projectsFr from "../fr/projects.json";

import type { ProjectId, ProjectType } from "../projects";

export interface ProjectItemCopy {
  tagline: string;
  description: string;
}

/** Copy contract for the Projects section; items are keyed by project id. */
export interface ProjectsCopy {
  sectionLabel: string;
  heading: string;
  viewCaseStudy: string;
  types: Record<ProjectType, string>;
  items: Record<ProjectId, ProjectItemCopy>;
  aria: {
    startProject: string;
    selectProject: string;
  };
}

const en: ProjectsCopy = projectsEn;
const fr: ProjectsCopy = projectsFr;

export const projectsCopy = { en, fr };
