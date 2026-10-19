/** Hero backdrop image (`.hero-media`). */
export const heroImage =
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2200&q=88";

/**
 * Overlay menu entries. `id` indexes the label in `hero.json`; `href` is the
 * fixed section anchor, so translating a label can never move a link.
 */
export const menuLinks = [
  { id: "work", href: "#work" },
  { id: "team", href: "#team" },
  { id: "contact", href: "#contact" },
] as const;

export type MenuLinkId = (typeof menuLinks)[number]["id"];

/**
 * Footer link columns. `id`s index labels in `footer.json`; hrefs stay here
 * for the same reason as the menu anchors above.
 */
export const footerColumns = [
  {
    id: "explore",
    links: [
      { id: "studio", href: "#about" },
      { id: "work", href: "#work" },
      { id: "team", href: "#team" },
      { id: "contact", href: "#contact" },
    ],
  },
  {
    id: "social",
    links: [
      { id: "instagram", href: "#instagram" },
      { id: "linkedin", href: "#linkedin" },
      { id: "dribbble", href: "#dribbble" },
    ],
  },
] as const;

export type FooterColumnId = (typeof footerColumns)[number]["id"];

export type FooterLinkId =
  (typeof footerColumns)[number]["links"][number]["id"];
