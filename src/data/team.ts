/**
 * Structural data for the members rendered by the Team section. Roles and
 * notes live in `src/data/{en,fr}/team.json`, indexed by `id`; `theme` selects
 * the `.portrait-theme-*` backdrop in index.css, so it stays a closed union.
 */
export type PortraitTheme = "blue" | "lime" | "coral" | "violet";

export type TeamMemberId =
  | "maya-ives"
  | "theo-martin"
  | "ines-silva"
  | "sam-okafor";

export interface TeamMember {
  id: TeamMemberId;
  name: string;
  image: string;
  theme: PortraitTheme;
}

export const team: TeamMember[] = [
  {
    id: "maya-ives",
    name: "Maya Ives",
    image:
      "https://images.unsplash.com/photo-1604261605115-4b34b646a05c?auto=format&fit=crop&w=1200&q=88",
    theme: "blue",
  },
  {
    id: "theo-martin",
    name: "Theo Martin",
    image:
      "https://images.unsplash.com/photo-1581466046946-06ea1cdcda9a?auto=format&fit=crop&w=1200&q=88",
    theme: "lime",
  },
  {
    id: "ines-silva",
    name: "Ines Silva",
    image:
      "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=1200&q=88",
    theme: "coral",
  },
  {
    id: "sam-okafor",
    name: "Sam Okafor",
    image:
      "https://images.unsplash.com/photo-1622278802706-8429429cb3ab?auto=format&fit=crop&w=1200&q=88",
    theme: "violet",
  },
];
