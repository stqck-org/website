import { closePrerenderChannel } from "./lib/prerenderChannel"
import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { createMemoryRouter } from "react-router"
import App from "./App"
import { routes } from "./routes"

type PrerenderArgs = {
  url: string
}

// Called by vite-prerender-plugin at build time. Only "/" is rendered: the
// rest of the site is hash navigation inside that document.
export async function prerender({ url }: PrerenderArgs) {
  const router = createMemoryRouter(routes, { initialEntries: [url] })

  try {
    const html = renderToString(
      <StrictMode>
        <App router={router} />
      </StrictMode>,
    )

    return { html }
  } finally {
    // The channel has to be imported above react-dom/server so the ports exist
    // before React constructs them. See ./lib/prerenderChannel.ts.
    closePrerenderChannel()
  }
}
