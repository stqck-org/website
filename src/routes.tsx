import { createBrowserRouter } from "react-router"
import { SiteLayout } from "./components/layout/SiteLayout"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { ProjectPage } from "./pages/ProjectPage"
import { ServiceDetailPage } from "./pages/ServiceDetailPage"
import { ServicesPage } from "./pages/ServicesPage"
import { WorkPage } from "./pages/WorkPage"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "services/:service", Component: ServiceDetailPage },
      { path: "work", Component: WorkPage },
      { path: "work/:slug", Component: ProjectPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
