import { readFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import Beasties from "beasties"
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

// Inlines the CSS used by the prerendered page into <head> and turns the
// remaining stylesheet into a non-blocking preload. vite-prerender-plugin
// injects the markup during generateBundle, so this has to run in a post-order
// generateBundle hook instead of transformIndexHtml.
function criticalCss(): Plugin {
  let outDir = "dist"
  let base = "/"

  return {
    name: "stqck-critical-css",
    apply: "build",
    enforce: "post",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      base = config.base
    },
    generateBundle: {
      order: "post",
      async handler(_options, bundle) {
        const htmlAsset = bundle["index.html"]
        if (!htmlAsset || htmlAsset.type !== "asset") return

        const beasties = new Beasties({
          path: outDir,
          publicPath: base,
          preload: "swap",
          noscriptFallback: true,
          pruneSource: true,
          // @font-face stays in the async sheet: the design sets font families
          // through CSS variables, which the scanner cannot resolve. The two
          // hero fonts are preloaded below instead.
          preloadFonts: false,
          // `.reveal-active` is added by JS after the prerender, so the scan
          // cannot see it. Force those rules into the critical CSS to avoid a
          // flash of visible content before the async sheet arrives.
          allowRules: [/reveal-active/],
          logLevel: "warn",
        })

        // dist/ has not been written yet, so read stylesheets from the bundle.
        beasties.readFile = (filename) => {
          const name = relative(outDir, filename).replace(/\\/g, "/")
          const output = bundle[name]
          if (output) {
            return output.type === "asset"
              ? output.source.toString()
              : output.code
          }
          return readFileSync(filename, "utf-8")
        }

        // Keep the leftover (non-inlined) rules in the emitted stylesheet
        // instead of writing to disk mid-build.
        const writable = beasties as unknown as {
          writeFile: (filename: string, data: string) => Promise<void>
        }
        writable.writeFile = async () => {}

        const originalPrune = beasties.pruneSource.bind(beasties)
        beasties.pruneSource = (style, before, sheetInverse) => {
          const inlined = originalPrune(style, before, sheetInverse)
          const name = (style as unknown as {
            $$name?: string
          }).$$name?.replace(/^\//, "")
          const output = name ? bundle[name] : undefined
          if (output && output.type === "asset") {
            if (!sheetInverse.length) delete bundle[name!]
            else output.source = sheetInverse
          }
          return inlined
        }

        let html = await beasties.process(htmlAsset.source.toString())

        // Preload only the two fonts the hero needs; the rest are discovered
        // once the stylesheet loads.
        const preload = [
          /archivo-black-latin-400-normal-.*\.woff2$/,
          /dm-sans-latin-400-normal-.*\.woff2$/,
        ]
          .flatMap((pattern) =>
            Object.keys(bundle).filter((name) => pattern.test(name)),
          )
          .map(
            (name) =>
              `<link rel="preload" href="${base}${name}" as="font" type="font/woff2" crossorigin="anonymous" />`,
          )
          .join("\n")

        if (preload) {
          const charset = /<meta[^>]+charset[^>]*>/i
          html = charset.test(html)
            ? html.replace(charset, (meta) => `${meta}\n${preload}`)
            : html.replace(/<head[^>]*>/i, (head) => `${head}\n${preload}`)
        }

        htmlAsset.source = html
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
    criticalCss(),
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
