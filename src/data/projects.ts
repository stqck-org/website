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
    slug: "ERP-next",
    title: "ERP/Next",
    category: { en: "E-commerce concept", fr: "Concept e-commerce" },
    summary: {
      en: "A modular business system for stock, production, sales, and HR, built to stay simple enough for small teams to use every day.",
      fr: "Un système de gestion d'entreprise modulaire couvrant les stocks, la production, les ventes et les ressources humaines, conçu pour rester simple et accessible aux petites équipes au quotidien.",
    },
    problem: {
      en: "Explore how a full business system can stay simple enough for a small team to use every day.",
      fr: "Explorer comment un système de gestion complet peut rester suffisamment simple pour être utilisé quotidiennement par une petite équipe.",
    },
    solution: {
      en: "A modular ERP built on ERPNext, with clear modules, short paths from task to result, and the real state of the business (stock levels, production, pending orders) visible at a glance.",
      fr: "Un ERP modulaire basé sur ERPNext, organisé autour de modules clairement définis, de parcours courts entre les tâches et leurs résultats, et d'une vision instantanée de l'activité de l'entreprise (niveaux de stock, production et commandes en attente).",
    },
    deliverables: [
      { en: "Module architecture", fr: "Architecture des modules" },
      { en: "Daily operations flows", fr: "Parcours des opérations quotidiennes" },
      { en: "Dashboard and reporting concept", fr: "Concept de tableau de bord et de reporting" },
    ],
    visual: "lime",
  },
  {
    slug: "E-commerce Platform",
    title: "E/commernce",
    category: {
      en: "Business systems concept",
      fr: "Concept de système de gestion",
    },
    summary: {
      en: "A mobile-first online store with clear categories and short checkout paths, built to be fast and easy to buy from on small screens.",
      fr: "Une boutique en ligne pensée en priorité pour les mobiles, avec des catégories claires et un processus de commande simplifié, offrant une expérience d'achat rapide et fluide sur les petits écrans.",
    },
    problem: {
      en: "Explore how an online shop can stay fast, clear, and easy to buy from on small screens, where most customers browse.",
      fr: "Explorer comment une boutique en ligne peut rester rapide, intuitive et facile à utiliser sur les petits écrans, où la majorité des clients naviguent.",
    },
    solution: {
      en: "A mobile-first store with strong product categories, short checkout paths, and order and stock status made visible to the shop owner.",
      fr: "Une boutique conçue pour le mobile, avec des catégories de produits bien structurées, un parcours d'achat raccourci et une visibilité sur l'état des commandes et des stocks pour le gestionnaire.",
    },
    deliverables: [
      { en: "Shopping experience direction", fr: "Orientation de l'expérience d'achat" },
      { en: "Mobile purchase flows", fr: "Parcours d'achat sur mobile" },
      { en: "Storefront and back-office concept", fr: "Concept de boutique en ligne et d'interface d'administration" },
    ],
    visual: "dark",
  },
]
