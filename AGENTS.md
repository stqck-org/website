# stqck studio site

Single-page React 19 + Vite 8 marketing site. No backend, no API layer, no tests, no linter.

## Commands

`package.json` defines `dev`, `build`, `preview`, `format`. There is **no** test, lint, or typecheck script, and no deploy script — publishing moved to a GitHub Actions workflow (see **Deploying**).

- `pnpm run build` — the primary verification step (Vite fails on broken imports/JSX). Run before declaring work done.
- `pnpm exec tsc --noEmit` — the typecheck. `tsconfig.json` is `strict` + `noEmit` and includes both `src` and `vite.config.ts`.
- `pnpm run dev` — port `$PORT` (default 8443) with `strictPort: true`, so a second instance exits rather than picking a free port. Host is `0.0.0.0` unless `FIGMA_DEV_SERVER_HOST` is set.
- `pnpm run preview` — serves the built `dist/` on the same port scheme.
- Deployment is CI, not local: a push to `main` triggers `.github/workflows/deploy.yml`, which builds `dist/` and publishes it to GitHub Pages. See **Deploying**.

### Formatting is a trap

`pnpm run format` runs **oxfmt 0.2.0**, whose defaults are **double quotes and no semicolons** — not Prettier's semicolon style. Every file under `src/` is written *with* semicolons, so all of them are already "unformatted" by oxfmt's standard.

Consequences, all verified:

- `pnpm exec oxfmt --list-different` at the root flags every `src/` file, `vite.config.ts`, and **every source file under `node_modules/`** — over a thousand of them, and the count drifts as dependencies change, so don't quote a number. It also hard-errors on `.d.ts` files it cannot parse. Never run it repo-wide.
- `pnpm run format -- <path>` works and is the only safe invocation. Pass explicit paths for the files you touched.
- Formatting `vite.config.ts` or `src/main.tsx` converts their single quotes to double quotes — these two files are hand-written in single quotes while the rest of `src/` uses double quotes. That churn is a large unrelated diff; leave them alone unless you are already rewriting them.

### The dev server bundles Figma preview plugins

`vite.config.ts` carries three custom plugins — `figmaErrorOverlayReplay`, `figmaReactRefreshBoundaryFallback`, and `figmaMakeKitPlugin` — for the Figma Make preview workflow. All three are gated `apply: 'serve'`, so they run only under `pnpm run dev` and never affect `vite build` output.

- `figmaMakeKitPlugin` serves `/.figma/make/kit.html` and exposes `window.__FIGMA__.stories` built from any `src/**/*.stories.{ts,tsx,js,jsx}` file via `import.meta.glob`. **No such files exist today**; adding a `.stories.tsx` is what makes a component mountable in the Figma Make design surface.
- `figmaReactRefreshBoundaryFallback` sends a full reload whenever a module stops defining a React Refresh boundary — exactly what happens when you move a component into a new file and leave only a re-export behind. That reload is intentional, not a bug to "fix".
- `figmaErrorOverlayReplay` re-sends the most recent build error to any client that connects after it was broadcast, so a reloaded preview iframe still shows a broken build.

## Architecture

`src/App.tsx` is ~25 lines of pure composition: calls `useRevealOnScroll()` and renders `<Hero /> <About /> <Projects /> <Team /> <Contact /> <Footer />` inside `<main>`. Note `Projects` comes **before** `Team`.

- **Exports are not uniform.** `App` is the only default export. Every section and UI component is a **named** export: `export function About()` imported as `import { About } from "../sections/About"`. Match the file you are editing.
- `src/components/sections/` — one file per page section. Each owns its own state, so there is no state in `App` and no prop drilling: `menuOpen` in `Hero`, `memberIndex`/`thumbRow` in `Team`, `selectedIndex`/`fading` in `Projects`, `submitted` in `Contact`. Lift state deliberately if a new section needs to share it.
- `src/components/ui/` — `Button`, `Link`, `Heading`, `Field` (polymorphic, built with `createElement`) and `Arrow`.
- `src/data/` — `team.ts`, `projects.ts`, `site.ts` hold all content, typed with **literal unions** (`PortraitTheme`, `ProjectType`) that mirror CSS modifier class names, so a typo becomes a type error instead of silently unstyled markup.
- `src/main.tsx` mounts into `#root` inside `React.StrictMode` and imports `./index.css`. Import side effects go only here.
- `@/*` → `./src/*` is aliased in both `tsconfig.json` (`paths`) and `vite.config.ts`, but **no source file uses it** — imports are relative (`../../data/team`). Don't introduce `@/` imports.

## Styling: plain CSS, not Tailwind utilities

Tailwind v4 is installed and `src/index.css` does `@import "tailwindcss"`, but the app uses **zero** utility classes. All ~1150 lines of styling are hand-written semantic CSS referenced by `className` strings.

- Add or change styles as rules in `src/index.css`; do not introduce utility classes. No Tailwind or PostCSS config file exists or is needed.
- Design tokens are CSS custom properties on `:root` (`--ink`, `--paper`, `--accent`, `--shell`, `--font-body`, `--font-display`, …) — extend those rather than hardcoding colors.
- The Google Fonts `@import url(...)` must stay above `@import "tailwindcss"`; both must stay at the top of the file.
- Breakpoints are `max-width: 62rem` and `max-width: 46rem`; there is a `prefers-reduced-motion` block at the end. Preserve both when adding motion or components.
- **Snap-scroll architecture.** The page body never scrolls: `html, body { height: 100%; overflow: hidden }` and `<main>` is the scroll container (`height: 100svh; height: 100dvh; overflow-y: scroll; overscroll-behavior: none; scroll-snap-type: y mandatory; scroll-behavior: smooth`) — the `[n-parent]` recipe from `template/template.html`. Every section is a snap child (`height: 100svh; scroll-snap-align: start`). The invariant: **mandatory snap breaks if any section is taller than the viewport** — never give a section a height larger than the screen while snap is on. That is why the `max-height: 46rem` query is the *only* place snap is disabled (`main { scroll-snap-type: none }`, sections grow); phones snap too, so their layouts are compacted to one screen instead — at `max-width: 46rem` the Projects picker is a flex column (media absorbs leftover height, the project list becomes a horizontal chip strip, the summary is line-clamped) and the Team portrait shrinks with the content (min-height stays 0 from the 62rem block). Between 46–62rem the Team page stays exactly one screen because `.team-layout` becomes `grid-template-rows: minmax(0, 1fr) auto` so the decorative portrait absorbs leftover height.
- Images are hot-linked Unsplash URLs in `src/data/`. There is no `public/` directory and no local asset pipeline.

### Tailwind's scanner still runs over your prose

Tailwind v4 auto-detects source files by walking the repo, honouring `.gitignore`. Because this project uses no utility classes, every rule it emits is dead weight — but the walk still happens, and it reads **root-level markdown, including this file**.

Verified: an earlier version of this file named five Tailwind utilities as examples of the junk rules they produce. Vite emitted exactly those five as dead rules in the production CSS bundle. Rewording this section to describe them instead of naming them removed them again on the next build. `pnpm exec tsc` is unaffected; only the CSS bundle grows and its content hash moves.

**So: never name a Tailwind utility literally in this file.** Describe such rules in prose instead. When comparing CSS output between two builds, delete `dist/` first — a stale `dist/` is also scanned and can shift the hash.

## Deploying

Deployed to **GitHub Pages** as a project site: `https://stqck-org.github.io/website/`. The remote is `git@github.com:stqck-org/website.git` (an **org** repo, so changing Pages settings needs org admin).

Publishing is **CI, not a local push.** `.github/workflows/deploy.yml` builds `dist/` and publishes it to Pages on every push to `main`, and can be re-run manually via `workflow_dispatch`. There is no deploy script and no `gh-pages` branch; if a remote `gh-pages` branch still exists, it is stale and safe to delete.

- The workflow checks out `main`, installs with `pnpm install --frozen-lockfile` (Node 22, pnpm 12 via `pnpm/action-setup`), runs `pnpm run build` in production mode, uploads `dist/` as a Pages artifact, then `actions/deploy-pages` publishes it at the project-site root.
- Repo Settings → Pages → Build and deployment → Source must be set to **GitHub Actions**. That is a one-time manual UI step (org admin only); the deploy job hard-fails until it is. If it is ever reset to *Deploy from a branch*, pushes keep building but nothing publishes — re-check this setting first when deploys go quiet.
- `vite.config.ts` sets `base` to `/website/` **only when `mode === 'production'`**, and to `/` otherwise. So `pnpm run dev` serves at `/` with no redirect, while builds and `pnpm run preview` serve at `/website/` to match the deployed subpath. Both were verified; do not reduce it to a single value without re-checking both.
- `vite.config.ts` enables inline sourcemaps and skips minification when the build mode is `development`, so `pnpm run build --mode development` produces a readable, cached-preview-friendly bundle. Note this **disables the production `base`**, so that mode is not deployable.
- There is no client-side router, so no SPA `404.html` fallback is needed. There is no `CNAME`; adding a custom domain needs **both** a `CNAME` in `dist/` **and** `base` changed to `/`, or every asset 404s.

## Gotchas

- **Never turn `.reveal` into a wrapper component.** `useRevealOnScroll` (`src/hooks/useRevealOnScroll.ts`) does a one-time `document.querySelectorAll(".reveal")` on mount and adds `is-visible` to each. `.reveal` sits on elements that participate directly in layout — several are grid children (`.about-block` inside `.about-blocks`; `.contact-copy` and `.contact-form` inside `.contact-grid`; `.team-content` inside `.team-layout`; `.project-description`, `.project-list`, and `.project-media` inside `.project-picker`). Wrapping them in a `<Reveal>` element inserts DOM nodes and breaks those grids. A component *boundary* adds no DOM; a wrapper element does. `About.tsx`'s local `AboutBlock` is the worked example: it is a component boundary that puts `reveal` on the grid child itself, not a wrapper.
- The `key={member.name}` on the portrait `<div>` in `Team.tsx` is **inert** (a lone child is reconciled by position, not key) and load-bearing: lifting it onto the `<MemberPortrait>` call would make React remount the portrait and replay the `portrait-in` animation on every member change. There is an in-code comment saying so.
- `Button`, `Link`, and `Heading` default `className` to `""` and therefore always emit a `class` attribute; `Field` deliberately has **no** default and emits none. Don't "tidy" that asymmetry — it changes the DOM.
- `index.html` is a hand-written shell. There is no template engine: edit the `<title>`, `<meta name="description">`, and `<html lang>` directly. The lang value is `"en"` and the title/description were inlined by hand — keep all three in sync if the brand wording changes.
- `src/imports/Nordic_Loop___Studio_Showcase_Mockup.html` is an imported design reference that nothing imports. It predates the implementation and its palette (violet `#5B4CFF` / lime, Space Grotesk) does not match the shipped site (blue `#2457ff`, Archivo Black). Do not "restore" styles from it. It is also the only remaining place the old `.brand-grid` class name appears, which is a coincidence, not a live reference.
- The contact form and newsletter input are client-only: `submitForm` just flips local state, no request is made. Wiring a real submission is a new feature, not a missing config.

## Verifying a refactor

With no test suite, the reliable regression check is a rendered-DOM diff. Two harnesses that need no browser:

- **Markup:** load `src/App.tsx` through Vite's own module server and render it. Verified working pattern — `createServer({ server: { middlewareMode: true }, appType: 'custom' })`, then `ssrLoadModule('/src/App.tsx')` and `renderToStaticMarkup` from `react-dom/server`, hashing the output. Deterministic: no scroll timing, no `IntersectionObserver`, no StrictMode double-invoke. Run it as `.tmp-*.mjs` from the project root (so `react`/`react-dom` resolve), capture the `sha256` before and after, and delete the file when done.
- **Behaviour:** mount the real component in jsdom with a no-op `IntersectionObserver` stub and `Element.prototype.scrollBy`/`scrollTo` defined (both are unimplemented in jsdom and would throw), set `globalThis.IS_REACT_ACT_ENVIRONMENT = true`, dispatch real click/submit events, and diff the observable DOM after each interaction. jsdom is **not** in `node_modules` — install it into a scratch directory outside the repo and import it by absolute path so `package.json` stays untouched.
