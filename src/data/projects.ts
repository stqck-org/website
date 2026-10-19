/**
 * Structural data for the case studies rendered by the Projects section.
 * Display text (taglines, descriptions, type labels) lives in
 * `src/data/{en,fr}/projects.json`, indexed by `id`; images and the closed
 * `type` union stay here because they are language-neutral.
 */
export type ProjectType = "Web" | "Mobile" | "Branding";

export type ProjectId = "lumen" | "origo" | "new-matter" | "woven";

export interface Project {
  id: ProjectId;
  title: string;
  client: string;
  type: ProjectType;
  image: string;
}

export const projects: Project[] = [
  {
    id: "lumen",
    title: "Lumen",
    client: "Lumen Finance",
    type: "Web",
    image:
      "https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?auto=format&fit=crop&w=1400&q=88",
  },
  {
    id: "origo",
    title: "Origo",
    client: "Origo Mobility",
    type: "Mobile",
    image:
      "https://images.unsplash.com/photo-1498262257252-c282316270bc?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: "new-matter",
    title: "New Matter",
    client: "New Matter",
    type: "Branding",
    image:
      "https://images.unsplash.com/photo-1671869203882-4831eea60268?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: "woven",
    title: "Woven",
    client: "Woven Health",
    type: "Web",
    image:
      "https://images.unsplash.com/photo-1483959651481-dc75b89291f1?auto=format&fit=crop&w=1400&q=88",
  },
];
