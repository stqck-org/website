# stqck studio site

Single-page React 19 + Vite 8 marketing site. Client-side only: no backend, no API layer, no tests, no linter. One scroll-snapped page carries every section; old multi-page URLs redirect into it.

## Commands

- `pnpm run dev` — dev server on `$PORT` (default `8443`), `strictPort: true`.
- `pnpm run build` — production build to `dist/`.
- `pnpm run preview` — serve the built `dist/` on the same port scheme.
- `pnpm run typecheck` — `tsc --noEmit` across `src` and `vite.config.ts`.
- `pnpm run format` — oxfmt. Its defaults are double quotes and no semicolons. Pass explicit paths for the files you touched; never run it repo-wide because it also walks `node_modules`.

Deployment is CI, not local: a push to `main` triggers `.github/workflows/deploy.yml`, which builds `dist/` and deploys it to a VPS with an atomic symlink switch and rollback. Because every route is served from `index.html`, the server must fall back to it for unknown paths.

## Architecture

`src/main.tsx` mounts `src/App.tsx` into `#root` inside `React.StrictMode`. `App` wraps the router in `LocaleProvider`; `src/routes.tsx` owns the route table. `SiteLayout` wraps the outlet in `SectionNavProvider`, so the header and the page share the active-section state.

- `src/pages/OnePage.tsx` — composes all seven sections in document order and runs the page-level hooks (`useActiveSection`, `useHashScroll`, `useRevealOnScroll`) plus `PageMeta`.
- `src/sections/` — one component per page section: `HomeSection`, `AboutSection`, `ServicesSection`, `WorkSection`, `ProcessSection`, `PrinciplesSection`, `ContactSection`. Section-local state lives with the section: `ServicesSection` owns `openService`, `WorkSection` owns the work filter and `openProject`.
- `src/pages/NotFoundPage.tsx` — the only other page; the catch-all route.
- `src/hooks/` — `useSectionNav` (context for the active section), `useActiveSection` (IntersectionObserver, no scroll listener), `useHashScroll` (hash navigation, focus, manual scroll restoration), `useRevealOnScroll` (entrance animations).
- `src/components/Section.tsx` — one `<section>` per page section; sets `id`, `data-section`, and `tabIndex={-1}`.
- `src/components/ScrollCue.tsx` — the hero's "scroll to explore" link.
- `src/components/layout/` — `SiteLayout` (skip link, provider, outlet), `SiteHeader` (hash nav, active item, mobile menu), `SiteFooter`, `LanguageSwitcher`.
- `src/components/` — shared pieces: `PageMeta`, `ClosingCta`, `ServiceList`, `ScrollCue`, `Section`.
- `src/components/project/` — `ProjectGrid` and `ProjectVisual`.
- `src/components/contact/` — `ContactForm`, the only stateful form in the app.
- `src/components/ui/` — small primitives (`Title`, links, `Button`, form controls, brand marks), re-exported from `index.ts`.
- `src/data/` — `types.ts`, `services.ts`, `projects.ts`: the single source of truth for copy and structure.
- `src/i18n/` — `Locale.tsx` (context, persistence, `<html lang>`) and `useTranslation.ts` (adds `localize` for `Localized` values).
- `src/lib/` — `contact.ts` (delivery stub) and `validateContactForm.ts` (pure validation).

Exports are named except `App`, which is the default export used by `main.tsx`. Imports are relative.

### Sections and navigation

The section ids, top to bottom, are `home`, `about`, `services`, `work`, `process`, `principles`, `contact`. The header nav only links to `about`, `services`, and `work`, in that order; links are `/#id` so they work from any route, and the active item is set from `useActiveSection`.

- `useHashScroll` runs on every hash change: smooth scroll normally, instant on first load, and `history.scrollRestoration = "manual"` so back/forward land on the section rather than a stale pixel offset. It also moves focus to sections that are focusable.
- The URL only changes when the user activates a link. Scrolling updates the active nav item without touching history.
- Service and project details are inline accordions (`ServiceList`, `ProjectGrid`): real buttons with `aria-expanded`/`aria-controls`, panels toggled with `hidden`.
- Legacy URLs redirect in `routes.tsx`: `/services`, `/work`, `/about`, `/contact` go to their section; `/services/:service` and `/work/:slug` redirect to `/?service=…#service-…` or `/?project=…#project-…`. `ServicesSection` and `WorkSection` read their own query param, open the matching panel, and the hash scroll lands on it.
- Never put `data-reveal` inside a collapsed panel: the reveal observer only runs on mount, so the panel would open blank.

## Content and i18n

All user-visible text lives either in `src/data/*.ts` (as `{ en, fr }` values) or inline via `tx("English", "Français")`. Components read translations through `useTranslation()`:

```ts
const { tx, localize } = useTranslation()
tx("Services", "Services") // current locale
localize(service.title) // Localized value in current locale
```

`LocaleProvider` stores the choice in `localStorage` under `stqck-locale` and keeps `<html lang>` in sync. `PageMeta` sets `document.title` and the meta description once, from `OnePage`; `index.html` holds the English defaults for the initial document.

To add a language, extend the `Locale` union, the initial-locale check, the switcher, and the `Localized` shape. Every copy value must gain the new key, so `tsc` points at whatever was missed.

## Styling

The app uses hand-written semantic CSS in `src/index.css`; there are no utility classes in JSX. Tailwind v4 is installed and imported, but only its reset layer is relied upon. Add or change styles as rules in `index.css`; do not add a Tailwind or PostCSS config.

- The Google Fonts `@import` must stay above the Tailwind import; both stay at the top of the file.
- Design tokens are CSS custom properties on `:root` (`--ink`, `--paper`, `--acid`, `--charcoal`, `--muted`, `--line`, `--page-pad`, `--section-pad`) plus the font stacks. Extend those instead of hardcoding values.
- Breakpoints are `1024px`, `760px`, and `360px`. The scroll behaviour lives in a block at the end of the file: `html { scroll-padding-top }`, `scroll-snap-type: y proximity` above `760px` only, and `scroll-snap-align: start` on `.page-section` (plus `#contact-form`, so the CTA's jump lands flush under the header). Never make snapping `mandatory`, and never enable it on mobile or under `prefers-reduced-motion`; long sections and forms must stay freely scrollable.
- Entrance animations use `[data-reveal]` plus the `reveal-active` class that `useRevealOnScroll` adds only when JS and IntersectionObserver are available. Keep the pre-hidden styles behind `.reveal-active` and inside `prefers-reduced-motion: no-preference` so content can never stay invisible.
- `index.html` is a static shell: edit the title, description, and icon link directly.

## Contact form

`ContactForm` validates client-side through `validateContactForm`, then calls `sendContact`. No delivery provider is configured, so `sendContact` intentionally resolves with `{ ok: false, reason: "not_configured" }` and the form shows a clearly worded status while keeping the user's entries. Wiring a real provider is a new feature, not a missing config. The form is the `#contact-form` target; `ClosingCta` opens the `#contact` section.

## Validating a change

There is no test suite. Use these in order:

1. `pnpm run typecheck`
2. `pnpm run build`
3. Check the page in a browser at desktop and mobile widths when markup or styles change.

Routes are `/` plus the catch-all 404; the real navigation is hash-based: `/#home`, `/#about`, `/#services`, `/#work`, `/#process`, `/#principles`, `/#contact`, and `/#contact-form`. Click every header, footer, and hero link; check active-nav tracking while scrolling, back/forward, a cold deep link, and both accordions.
