import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter } from "react-router"
import App from "./App"
import { routes } from "./routes"
// Self-hosted fonts: no third-party stylesheet on the critical path. Only the
// latin subsets and the weights the site actually uses are imported.
import "@fontsource/archivo-black/latin-400.css"
import "@fontsource/dm-sans/latin-400.css"
import "@fontsource/dm-sans/latin-600.css"
import "@fontsource/space-mono/latin-400.css"
import "@fontsource/space-mono/latin-700.css"
import "./index.css"

const router = createBrowserRouter(routes)
const container = document.getElementById("root")!

const tree = (
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
)

// The build prerenders "/" into #root, so hydrate that markup instead of
// throwing it away. Without prerendered markup (dev, tests) fall back to a
// client render.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, tree)
} else {
  ReactDOM.createRoot(container).render(tree)
}
