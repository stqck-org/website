import { Navigate, useParams, type RouteObject } from "react-router"

import { SiteLayout } from "./components/layout/SiteLayout"

import { NotFoundPage } from "./pages/NotFoundPage"

import { OnePage } from "./pages/OnePage"

import { projects } from "./data/projects"

import { services } from "./data/services"

// Old detail URLs still work: they land on the matching expanded panel.

function LegacyServiceRedirect() {
  const { service } = useParams()

  const known = services.some((item) => item.slug === service)

  return (
    <Navigate
      to={known ? `/?service=${service}#service-${service}` : "/#services"}
      replace
    />
  )
}

function LegacyProjectRedirect() {
  const { slug } = useParams()

  const project = projects.find(
    (item) =>
      item.slug === slug || (slug ? item.aliases?.includes(slug) : false),
  )

  return (
    <Navigate
      to={
        project ? `/?project=${project.slug}#project-${project.slug}` : "/#work"
      }
      replace
    />
  )
}

export const routes: RouteObject[] = [
  {
    path: "/",

    Component: SiteLayout,

    children: [
      { index: true, Component: OnePage },

      { path: "services", element: <Navigate to="/#services" replace /> },

      { path: "services/:service", Component: LegacyServiceRedirect },

      { path: "work", element: <Navigate to="/#work" replace /> },

      { path: "work/:slug", Component: LegacyProjectRedirect },

      { path: "about", element: <Navigate to="/#about" replace /> },

      { path: "contact", element: <Navigate to="/#contact" replace /> },

      { path: "*", Component: NotFoundPage },
    ],
  },
]
