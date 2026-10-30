import type { Localized } from "./types"

export type Project = {
  slug: string
  title: string
  category: Localized
  summary: Localized
  problem: Localized
  solution: Localized
  deliverables: Localized[]
  visual: "lime" | "dark"
}

export const projects: Project[] = [
  {
    slug: "market-day",
    title: "Market/Day",
    category: { en: "E-commerce concept", fr: "Concept e-commerce" },
    summary: {
      en: "A self-initiated study for a clear, mobile-first local goods catalogue.",
      fr: "Une étude auto-initiée pour un catalogue de produits locaux clair et mobile-first.",
    },
    problem: {
      en: "Explore how a broad catalogue can stay direct and easy to navigate on small screens.",
      fr: "Explorer comment un large catalogue peut rester direct et facile à parcourir sur petit écran.",
    },
    solution: {
      en: "A modular product system with strong categories, short decision paths, and operational status made visible.",
      fr: "Un système produit modulaire avec des catégories fortes, des choix rapides et un état opérationnel visible.",
    },
    deliverables: [
      { en: "Experience direction", fr: "Direction d’expérience" },
      { en: "Mobile product flows", fr: "Parcours produit mobile" },
      { en: "Interface concept", fr: "Concept d’interface" },
    ],
    visual: "lime",
  },
  {
    slug: "ledger-00",
    title: "Ledger/00",
    category: {
      en: "Business systems concept",
      fr: "Concept système de gestion",
    },
    summary: {
      en: "A self-initiated dashboard study for calmer operational decision-making.",
      fr: "Une étude auto-initiée de tableau de bord pour des décisions opérationnelles plus sereines.",
    },
    problem: {
      en: "Test how dense operational information can remain readable without hiding the underlying structure.",
      fr: "Tester comment des données opérationnelles denses peuvent rester lisibles sans cacher leur structure.",
    },
    solution: {
      en: "A high-contrast overview built around exceptions, recent activity, and clear next actions.",
      fr: "Une vue d’ensemble contrastée, organisée autour des exceptions, de l’activité récente et des prochaines actions.",
    },
    deliverables: [
      { en: "Information architecture", fr: "Architecture de l’information" },
      { en: "Dashboard concept", fr: "Concept de tableau de bord" },
      { en: "Interaction study", fr: "Étude d’interaction" },
    ],
    visual: "dark",
  },
]
