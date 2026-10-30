# stqck studio site

Single-page React 19 + Vite 8 marketing site. Client-side only: no backend, no API layer, no tests, no linter.

## Commands

- `pnpm run dev` — dev server on `$PORT` (default `8443`), `strictPort: true`.
- `pnpm run build` — production build to `dist/`.
- `pnpm run preview` — serve the built `dist/` on the same port scheme.
- `pnpm run typecheck` — `tsc --noEmit` across `src` and `vite.config.ts`.
- `pnpm run format` — oxfmt. Its defaults are double quotes and no semicolons. Pass explicit paths for the files you touched; never run it repo-wide because it also walks `node_modules`.

Deployment is CI, not local: a push to `main` triggers `.github/workflows/deploy.yml`, which builds `dist/` and deploys it to a VPS with an atomic symlink switch and rollback.

## Architecture

`src/main.tsx` mounts `src/App.tsx` into `#root` inside `React.StrictMode`. `App` wraps the router in `LocaleProvider`; `src/routes.tsx` owns the route table.

- `src/pages/` — one file per route: home, services, service detail, work, project, about, contact, not found.
- `src/components/layout/` — `SiteLayout` (skip link, scroll reset, outlet), `SiteHeader`, `SiteFooter`, `LanguageSwitcher`.
- `src/components/` — shared page pieces: `PageMeta`, `PageIntro`, `ClosingCta`, `ServiceList`.
- `src/components/project/` — `ProjectGrid` and `ProjectVisual`.
- `src/components/contact/` — `ContactForm`, the only stateful form in the app.
- `src/components/ui/` — small primitives (`Title`, links, `Button`, form controls, brand marks), re-exported from `index.ts`.
- `src/data/` — `types.ts`, `services.ts`, `projects.ts`: the single source of truth for copy and structure.
- `src/i18n/` — `Locale.tsx` (context, persistence, `<html lang>`) and `useTranslation.ts` (adds `localize` for `Localized` values).
- `src/lib/` — `contact.ts` (delivery stub) and `validateContactForm.ts` (pure validation).

Exports are named except `App`, which is the default export used by `main.tsx`. Imports are relative.

## Content and i18n

All user-visible text lives either in `src/data/*.ts` (as `{ en, fr }` values) or inline via `tx("English", "Français")`. Components read translations through `useTranslation()`:

```ts
const { tx, localize } = useTranslation()
tx("Services", "Services") // current locale
localize(service.title) // Localized value in current locale
```

`LocaleProvider` stores the choice in `localStorage` under `stqck-locale` and keeps `<html lang>` in sync. `PageMeta` sets `document.title` and the meta description per page; `index.html` holds the English defaults for the initial document.

To add a language, extend the `Locale` union, the initial-locale check, the switcher, and the `Localized` shape. Every copy value must gain the new key, so `tsc` points at whatever was missed.

## Styling

The app uses hand-written semantic CSS in `src/index.css`; there are no utility classes in JSX. Tailwind v4 is installed and imported, but only its reset layer is relied upon. Add or change styles as rules in `index.css`; do not add a Tailwind or PostCSS config.

- The Google Fonts `@import` must stay above the Tailwind import; both stay at the top of the file.
- Design tokens are CSS custom properties on `:root` (`--ink`, `--paper`, `--acid`, `--charcoal`, `--muted`, `--line`, `--page-pad`, `--section-pad`) plus the font stacks. Extend those instead of hardcoding values.
- Breakpoints are `1024px`, `760px`, and `360px`; a `prefers-reduced-motion` block sits at the end. Preserve them when adding motion or components.
- `index.html` is a static shell: edit the title, description, and icon link directly.

## Contact form

`ContactForm` validates client-side through `validateContactForm`, then calls `sendContact`. No delivery provider is configured, so `sendContact` intentionally resolves with `{ ok: false, reason: "not_configured" }` and the form shows a clearly worded status while keeping the user's entries. Wiring a real provider is a new feature, not a missing config.

## Validating a change

There is no test suite. Use these in order:

1. `pnpm run typecheck`
2. `pnpm run build`
3. Compare rendered routes in a browser (desktop and mobile) when markup or styles change.

The routes are `/`, `/services`, `/services/:service`, `/work`, `/work/:slug`, `/about`, `/contact`, plus the catch-all 404.
