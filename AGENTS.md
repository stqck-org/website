# stqck studio site

Single-page React 19 + Vite 8 marketing site. Client-side only: no backend, no API layer, no tests, no linter. One scroll-snapped page carries every section; old multi-page URLs redirect into it.

## Commands

- `pnpm run dev` — dev server on `$PORT` (default `8443`), `strictPort: true`.
- `pnpm run build` — production build to `dist/`.
- `pnpm run preview` — serve the built `dist/` on the same port scheme.
- `pnpm run typecheck` — `tsc --noEmit` across `src` and `vite.config.ts`.
- `pnpm run format` — oxfmt. Its defaults are double quotes and no semicolons. Pass explicit paths for the files you touched; never run it repo-wide because it also walks `node_modules`.

Deployment is CI, not local: a push to `main` triggers `.github/workflows/deploy.yml`, which builds `dist/` and deploys it to a VPS with an atomic symlink switch and rollback. Because every route is served from `index.html`, the server must fall back to it for unknown paths. The workflow passes `VITE_WEB3FORMS_ACCESS_KEY` from repository secrets into the Vite build.

## Architecture

`src/main.tsx` mounts `src/App.tsx` into `#root` inside `React.StrictMode`. `App` wraps the router in `LocaleProvider`; `src/routes.tsx` owns the route table. `SiteLayout` wraps the outlet in `SectionNavProvider`, so the header and the page share the active-section state.

- `src/pages/OnePage.tsx` — composes all seven sections in document order and runs the page-level hooks (`useActiveSection`, `useHashScroll`, `useRevealOnScroll`) plus `PageMeta`.
- `src/sections/` — one component per page section: `HomeSection`, `AboutSection`, `ServicesSection`, `WorkSection`, `ProcessSection`, `PrinciplesSection`, `ContactSection`. Section-local state lives with the section: `ServicesSection` owns `openService`, `WorkSection` owns the work filter, the selected case study, and the expanded case study.
- `src/pages/NotFoundPage.tsx` — the only other page; the catch-all route.
- `src/hooks/` — `useSectionNav` (context for the active section), `useActiveSection` (IntersectionObserver, no scroll listener), `useHashScroll` (hash navigation, focus, manual scroll restoration), `useRevealOnScroll` (entrance animations).
- `src/components/Section.tsx` — one `<section>` per page section; sets `id`, `data-section`, and `tabIndex={-1}`.
- `src/components/ScrollCue.tsx` — the hero's "scroll to explore" link.
- `src/components/layout/` — `SiteLayout` (skip link, provider, outlet), `SiteHeader` (hash nav, active item, mobile menu), `SiteFooter`, `LanguageSwitcher`.
- `src/components/` — shared pieces: `PageMeta`, `ClosingCta`, `ServiceList`, `ScrollCue`, `Section`.
- `src/components/project/` — `ProjectShowcase` (case-study tabs, stage, navigation), `ProjectCaseStudy` (expanded case content), and `ProjectVisual`.
- `src/components/contact/` — `ContactForm`, the only stateful form in the app.
- `src/components/ui/` — small primitives (`Title`, links, `Button`, form controls, brand marks), re-exported from `index.ts`.
- `src/data/` — `types.ts`, `services.ts`, `projects.ts`: the single source of truth for copy and structure. `projects.ts` also owns `projectSectors`; each project declares `sectors`, and the Work filter is derived from the sectors present.
- `src/i18n/` — `Locale.tsx` (context, persistence, `<html lang>`) and `useTranslation.ts` (adds `localize` for `Localized` values).
- `src/lib/` — `contact.ts` (delivery stub) and `validateContactForm.ts` (pure validation).

Exports are named except `App`, which is the default export used by `main.tsx`. Imports are relative.

### Sections and navigation

The section ids, top to bottom, are `home`, `about`, `services`, `work`, `process`, `principles`, `contact`. The header nav only links to `about`, `services`, and `work`, in that order; links are `/#id` so they work from any route, and the active item is set from `useActiveSection`.

- `useHashScroll` runs on every hash change: smooth scroll normally, instant on first load, and `history.scrollRestoration = "manual"` so back/forward land on the section rather than a stale pixel offset. It also moves focus to sections that are focusable.
- The URL only changes when the user activates a link. Scrolling updates the active nav item without touching history.
- Service details use the `ServiceList` accordion: real buttons with `aria-expanded`/`aria-controls`, panels toggled with `hidden`.
- Work uses `ProjectShowcase`: a tab rail selects one case study at a time, arrows move between them, and one case study opens inline. Tabs follow the ARIA tabs pattern (roving `tabIndex`, arrow/Home/End keys), and switching cases collapses the open panel.
- Legacy URLs redirect in `routes.tsx`: `/services`, `/work`, `/about`, `/contact` go to their section; `/services/:service` and `/work/:slug` redirect to `/?service=…#service-…` or `/?project=…#project-…`. `ServicesSection` and `WorkSection` read their own query param, open the matching panel, and the hash scroll lands on it. Project slugs are canonical kebab-case; `Project.aliases` keeps older slugs resolving to the same case study.
- Never put `data-reveal` inside a collapsed panel or swapped carousel content: the reveal observer only runs on mount, so the content would stay blank.

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
- Adaptive density is a desktop/tablet-only layer scoped to `@media (min-width: 761px) and (max-height: 900px)`. `--section-pad` and the `--density-*` / `--type-*` tokens are height-aware (`min(vw, svh)` with floors) and step down again at `max-height: 720px` and `580px`; above `900px` and on mobile the original values apply. New components opt in by using those tokens for block spacing and min-heights. Do not add a second viewport system, JS scaling, `zoom`, or global transforms, and do not shrink body copy or controls below usable sizes.
- Judge density by the whole section footprint, not by individual properties. `.page-section` keeps `min-height: 100svh`, so use density to help content fit or to reduce overflow in naturally long sections; never force a tall section to fit by compromising readability or structure.

## Contact form

`ContactForm` validates client-side through `validateContactForm`, requires a solved hCaptcha, then calls `sendContact`, which POSTs JSON to `https://api.web3forms.com/submit` with the `access_key`, a localized `subject`, `replyto`, and `h-captcha-response`. When `VITE_WEB3FORMS_ACCESS_KEY` is missing in development, `sendContact` returns `{ ok: false, reason: "not_configured" }` and the form shows an error state without clearing entries. Production uses Web3Forms; configure the key in CI secrets and `.env`.

hCaptcha is enabled on the form in the Web3Forms dashboard and rendered with `@hcaptcha/react-hcaptcha`; the sitekey is `HCAPTCHA_SITEKEY` in `src/lib/contact.ts` (Web3Forms' free-plan key, overridable with `VITE_HCAPTCHA_SITEKEY`). Tokens are single-use and expire, so `resetCaptcha()` runs after every attempt, success or failure, and a token is cleared when the locale changes because the widget re-renders with `languageOverride`. The hidden `botcheck` honeypot stays as a cheap first filter, and `contact-honeypot` keeps it off-screen rather than `display: none`.

The form is the `#contact-form` target; `ClosingCta` opens the `#contact` section. If the VPS ever sends a CSP, allow `js.hcaptcha.com` (script), `newassets.hcaptcha.com` (frame), and `api.hcaptcha.com` (connect).

## Validating a change

There is no test suite. Use these in order:

1. `pnpm run typecheck`
2. `pnpm run build`
3. Check the page in a browser at desktop and mobile widths when markup or styles change.

Routes are `/` plus the catch-all 404; the real navigation is hash-based: `/#home`, `/#about`, `/#services`, `/#work`, `/#process`, `/#principles`, `/#contact`, and `/#contact-form`. Click every header, footer, and hero link; check active-nav tracking while scrolling, back/forward, a cold deep link, the service accordion, and the work tabs/arrows/expand-collapse.


<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->
