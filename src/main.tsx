import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter } from "react-router"
import App from "./App"
import { routes } from "./routes"
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
