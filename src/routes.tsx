import { createBrowserRouter, Navigate, useParams } from "react-router"
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
  const known = projects.some((item) => item.slug === slug)
  return (
    <Navigate
      to={known ? `/?project=${slug}#project-${slug}` : "/#work"}
      replace
    />
  )
}

export const router = createBrowserRouter([
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
])
