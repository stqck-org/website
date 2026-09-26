/**
 * Case studies rendered by the Projects section.
 *
 * `type` is the category the filter tabs match on, and `size` selects the
 * `.project-card.wide` / `.project-card.tall` layout variant in index.css, so
 * both are closed unions.
 */
export type ProjectType = "Web" | "Mobile" | "Branding";
export type ProjectSize = "wide" | "tall";

export interface Project {
  title: string;
  client: string;
  type: ProjectType;
  tagline: string;
  image: string;
  size: ProjectSize;
}

export const projects: Project[] = [
  {
    title: "Lumen",
    client: "Lumen Finance",
    type: "Web",
    tagline: "A calmer way to understand your money.",
    image:
      "https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?auto=format&fit=crop&w=1400&q=88",
    size: "wide",
  },
  {
    title: "Origo",
    client: "Origo Mobility",
    type: "Mobile",
    tagline: "Moving through the city, without the noise.",
    image:
      "https://images.unsplash.com/photo-1498262257252-c282316270bc?auto=format&fit=crop&w=1200&q=88",
    size: "tall",
  },
  {
    title: "New Matter",
    client: "New Matter",
    type: "Branding",
    tagline: "A living identity for an AI research lab.",
    image:
      "https://images.unsplash.com/photo-1671869203882-4831eea60268?auto=format&fit=crop&w=1200&q=88",
    size: "tall",
  },
  {
    title: "Woven",
    client: "Woven Health",
    type: "Web",
    tagline: "Care that feels connected from day one.",
    image:
      "https://images.unsplash.com/photo-1483959651481-dc75b89291f1?auto=format&fit=crop&w=1400&q=88",
    size: "wide",
  },
];

/** Filter tabs shown above the project grid. Order here is the render order. */
export const projectFilters = ["All", "Web", "Mobile", "Branding"] as const;

export type ProjectFilter = (typeof projectFilters)[number];
