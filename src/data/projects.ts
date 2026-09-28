/**
 * Case studies rendered by the Projects section.
 *
 * `type` is the category shown on the picker rows, so it is a closed union.
 * `tagline` is the short lede shown above the long-form `description` in the
 * selected-project copy column.
 */
export type ProjectType = "Web" | "Mobile" | "Branding";

export interface Project {
  title: string;
  client: string;
  type: ProjectType;
  tagline: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: "Lumen",
    client: "Lumen Finance",
    type: "Web",
    tagline: "A calmer way to understand your money.",
    description:
      "Lumen turns dense financial data into a calm, readable surface. We shaped the product language and end-to-end experience around clarity, helping people see where their money is and where it is going without the noise.",
    image:
      "https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Origo",
    client: "Origo Mobility",
    type: "Mobile",
    tagline: "Moving through the city, without the noise.",
    description:
      "Origo is a mobility product built for people who want to move through the city without the noise. We designed the core flows and design system around a single idea: getting from A to B should feel as calm as it is efficient.",
    image:
      "https://images.unsplash.com/photo-1498262257252-c282316270bc?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "New Matter",
    client: "New Matter",
    type: "Branding",
    tagline: "A living identity for an AI research lab.",
    description:
      "New Matter is an AI research lab whose work moves faster than a static brand can. We built a living identity — a flexible system of type, color, and motion that grows alongside the research without losing its point of view.",
    image:
      "https://images.unsplash.com/photo-1671869203882-4831eea60268?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Woven",
    client: "Woven Health",
    type: "Web",
    tagline: "Care that feels connected from day one.",
    description:
      "Woven treats the health journey as one continuous thread rather than a series of disconnected visits. We designed the platform around trust, making care feel personal from the very first touchpoint.",
    image:
      "https://images.unsplash.com/photo-1483959651481-dc75b89291f1?auto=format&fit=crop&w=1400&q=88",
  },
];