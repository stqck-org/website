import type { Localized } from "./types"

export type Service = {
  slug: string
  index: string
  title: Localized
  short: Localized
  intro: Localized
  problems: Localized[]
  deliverables: Localized[]
  faq: {
    question: Localized
    answer: Localized
  }[]
}

export const services: Service[] = [
  {
    slug: "web-development",
    index: "01",
    title: {
      en: "Websites & web applications",
      fr: "Sites & applications web",
    },
    short: {
      en: "Digital experiences built around your business, your users, and what you need to achieve.",
      fr: "Des expériences numériques pensées autour de votre activité, de vos utilisateurs et de vos objectifs.",
    },
    intro: {
      en: "Useful, maintainable digital products shaped around a real job—not a template.",
      fr: "Des produits numériques utiles et maintenables, conçus pour un besoin réel — pas à partir d’un modèle.",
    },
    problems: [
      {
        en: "An outdated or unclear online presence",
        fr: "Une présence en ligne dépassée ou peu claire",
      },
      {
        en: "Manual work that belongs in a focused tool",
        fr: "Des tâches manuelles qui méritent un outil adapté",
      },
      {
        en: "A product idea that needs structure",
        fr: "Une idée de produit qui a besoin d’être structurée",
      },
    ],
    deliverables: [
      {
        en: "Business and editorial websites",
        fr: "Sites vitrines et éditoriaux",
      },
      { en: "Custom web applications", fr: "Applications web sur mesure" },
      {
        en: "Internal tools and dashboards",
        fr: "Outils internes et tableaux de bord",
      },
      {
        en: "Audits and considered improvements",
        fr: "Audits et améliorations ciblées",
      },
    ],
    faq: [
      {
        question: {
          en: "Do I need a complete specification?",
          fr: "Faut-il déjà avoir un cahier des charges complet ?",
        },
        answer: {
          en: "No. We can start with the problem, users, and constraints, then shape a sensible scope together.",
          fr: "Non. Nous pouvons partir du problème, des utilisateurs et des contraintes, puis définir ensemble un périmètre réaliste.",
        },
      },
      {
        question: {
          en: "Can you improve an existing product?",
          fr: "Pouvez-vous améliorer un produit existant ?",
        },
        answer: {
          en: "Yes. We first assess what is useful, what is getting in the way, and what should be preserved.",
          fr: "Oui. Nous commençons par identifier ce qui fonctionne, ce qui bloque et ce qui mérite d’être conservé.",
        },
      },
    ],
  },
  {
    slug: "erp-business-systems",
    index: "02",
    title: { en: "ERP & business systems", fr: "ERP & systèmes de gestion" },
    short: {
      en: "Better-connected systems for the way your business actually works.",
      fr: "Des systèmes mieux connectés, adaptés au fonctionnement réel de votre entreprise.",
    },
    intro: {
      en: "Make daily operations clearer by connecting information, workflows, and the people using them.",
      fr: "Clarifiez les opérations quotidiennes en reliant les informations, les processus et les personnes qui les utilisent.",
    },
    problems: [
      {
        en: "Important information scattered across tools",
        fr: "Des informations importantes dispersées entre plusieurs outils",
      },
      {
        en: "Repeated data entry and fragile handoffs",
        fr: "Des doubles saisies et des transmissions fragiles",
      },
      {
        en: "Workflows that no longer fit the business",
        fr: "Des processus qui ne correspondent plus à l’activité",
      },
    ],
    deliverables: [
      {
        en: "Workflow and requirements mapping",
        fr: "Cartographie des besoins et des processus",
      },
      {
        en: "Business process digitization",
        fr: "Numérisation des processus métier",
      },
      {
        en: "System integration planning",
        fr: "Planification de l’intégration des systèmes",
      },
      { en: "Focused operational tools", fr: "Outils opérationnels ciblés" },
    ],
    faq: [
      {
        question: {
          en: "Do you work with a specific ERP?",
          fr: "Travaillez-vous avec un ERP précis ?",
        },
        answer: {
          en: "The right platform depends on your existing systems and needs. We recommend a direction only after discovery.",
          fr: "La bonne plateforme dépend de vos systèmes et de vos besoins. Nous recommandons une direction après la phase de découverte.",
        },
      },
      {
        question: {
          en: "Can everything be automated?",
          fr: "Peut-on tout automatiser ?",
        },
        answer: {
          en: "Not usefully. We prioritize repetitive work where automation creates clear, maintainable value.",
          fr: "Pas toujours de manière utile. Nous ciblons les tâches répétitives où l’automatisation apporte une valeur claire et durable.",
        },
      },
    ],
  },
  {
    slug: "ecommerce",
    index: "03",
    title: { en: "E-commerce", fr: "E-commerce" },
    short: {
      en: "Online stores designed to make products easier to discover, manage, and buy.",
      fr: "Des boutiques en ligne qui facilitent la découverte, la gestion et l’achat des produits.",
    },
    intro: {
      en: "Commerce experiences that balance customer clarity with the realities of day-to-day operations.",
      fr: "Des expériences marchandes qui équilibrent clarté pour le client et réalités des opérations quotidiennes.",
    },
    problems: [
      {
        en: "A catalogue that is hard to browse or maintain",
        fr: "Un catalogue difficile à parcourir ou à maintenir",
      },
      {
        en: "Unclear checkout and order workflows",
        fr: "Des parcours de commande et de paiement peu clairs",
      },
      {
        en: "A store disconnected from operations",
        fr: "Une boutique déconnectée des opérations internes",
      },
    ],
    deliverables: [
      {
        en: "Storefront experience and product structure",
        fr: "Expérience boutique et structure du catalogue",
      },
      {
        en: "Checkout and order-flow design",
        fr: "Conception du paiement et du suivi de commande",
      },
      {
        en: "Store management foundations",
        fr: "Fondations pour la gestion de la boutique",
      },
      {
        en: "Integration planning where appropriate",
        fr: "Planification des intégrations pertinentes",
      },
    ],
    faq: [
      {
        question: {
          en: "Which commerce platform do you use?",
          fr: "Quelle plateforme e-commerce utilisez-vous ?",
        },
        answer: {
          en: "We select technology after understanding the catalogue, operations, budget, and required integrations.",
          fr: "Nous choisissons la technologie après avoir compris le catalogue, les opérations, le budget et les intégrations nécessaires.",
        },
      },
      {
        question: {
          en: "Can you connect local payments?",
          fr: "Pouvez-vous intégrer des paiements locaux ?",
        },
        answer: {
          en: "That depends on the chosen provider and its technical access. We verify feasibility before making a commitment.",
          fr: "Cela dépend du prestataire choisi et de ses accès techniques. Nous vérifions la faisabilité avant tout engagement.",
        },
      },
    ],
  },
]
