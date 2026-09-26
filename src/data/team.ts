/**
 * Team members rendered by the Team section. `theme` selects the
 * `.portrait-theme-*` backdrop in index.css, so it is a closed union.
 */
export type PortraitTheme = "blue" | "lime" | "coral" | "violet";

export interface TeamMember {
  name: string;
  role: string;
  note: string;
  image: string;
  theme: PortraitTheme;
}

export const team: TeamMember[] = [
  {
    name: "Maya Ives",
    role: "Founding engineer",
    note: "Turns ambitious product ideas into beautifully simple systems.",
    image:
      "https://images.unsplash.com/photo-1604261605115-4b34b646a05c?auto=format&fit=crop&w=1200&q=88",
    theme: "blue",
  },
  {
    name: "Theo Martin",
    role: "Product designer",
    note: "Shapes interfaces with clarity, character, and just enough surprise.",
    image:
      "https://images.unsplash.com/photo-1581466046946-06ea1cdcda9a?auto=format&fit=crop&w=1200&q=88",
    theme: "lime",
  },
  {
    name: "Ines Silva",
    role: "Creative director",
    note: "Builds visual worlds that make digital products impossible to ignore.",
    image:
      "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=1200&q=88",
    theme: "coral",
  },
  {
    name: "Sam Okafor",
    role: "Strategy lead",
    note: "Finds the sharpest route from an open question to a launch plan.",
    image:
      "https://images.unsplash.com/photo-1622278802706-8429429cb3ab?auto=format&fit=crop&w=1200&q=88",
    theme: "violet",
  },
];
