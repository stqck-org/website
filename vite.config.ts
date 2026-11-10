import { fileURLToPath } from "node:url"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { vitePrerenderPlugin } from "vite-prerender-plugin"

// vite-prerender-plugin adds the prerender entry to the client build so it can
// import and run it, which also emits that entry (and react-dom/server) into
// dist/assets. Drop it before Rollup writes the output; the HTML never
// references it, and it is only needed during the build.
function dropPrerenderEntry(): Plugin {
  return {
    name: "stqck-drop-prerender-entry",
    apply: "build",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        for (const [fileName, output] of Object.entries(bundle)) {
          if (
            output.type === "chunk" &&
            output.exports?.includes("prerender")
          ) {
            delete bundle[fileName]
            delete bundle[`${fileName}.map`]
          }
        }
      },
    },
  }
}

// Vite config — https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    // Renders "/" with react-dom/server at build time and injects the markup
    // into #root, so dist/index.html ships real content and hydration has
    // something to attach to.
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: fileURLToPath(
        new URL("./src/prerender.tsx", import.meta.url),
      ),
    }),
    dropPrerenderEntry(),
  ],
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT || 8443),
    strictPort: true,
  },
  preview: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT || 8443),
  },
})
