# Diadem for Insurance Advisors

The advisor-facing site for Diadem & Co: a landing page explaining the advisor
programme (D.I.S.C. intake, the six-step process, Flex and Premium services) and
an application form that saves to GoHighLevel.

Same stack as the client-facing site (`thediadem`) but its own visual identity:
Vite, React 19, TypeScript, Tailwind CSS 4, `motion` for interface animation and
`@lottiefiles/dotlottie-react` for the Lottie scenes. Pages are pre-rendered to
static HTML at build time and deployed to Cloudflare Pages.

## Design system

An editorial, executive-brief look, deliberately distinct from thediadem.ca:

- **Type**: Playfair Display (variable, with italics) for display and headings,
  Manrope for everything else. Fluid sizes via the `display-xl`, `display-lg`
  and `display-md` utilities; `eyebrow` for small tracked labels; `accent` for
  the italic gold phrase inside a heading.
- **Shapes**: hairlines (`rule`, `rule-gold`), ghosted serif numerals
  (`ghost-number`), softly rounded panels with a gold top edge (`panel`,
  `panel-dark`), and gentle lighting on dark sections (`glow-soft`) with a gold
  halo behind floating illustrations (`halo`).
- **Buttons**: rectangular and uppercase with a sliding fill (`btn-gold`,
  `btn-outline`, `btn-navy`); text links get a growing underline (`link-line`).
- **Forms**: underline fields (`field`) and a square consent box.
- **Components**: numbered sections, interactive D.I.S.C. tabs that advance on
  their own, a scroll-driven process layout with a sticky step index, an
  objections accordion, a service comparison table, and a professions ticker.

All of it is defined in `src/index.css` as Tailwind utilities on top of the
colour tokens, so a visual change is a change in one file.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck, bundle, pre-render to dist/
npm run preview    # serve dist/
npm run lint
npm run format
```

The application form posts to `/api/apply`, a Cloudflare Pages Function in
`functions/api/apply.ts`. In development it is served by the Vite plugin in
`plugins/api-dev.ts`, reading variables from `.env.local` (see `.env.example`).
Without `GHL_API_TOKEN` and `GHL_LOCATION_ID` the form shows an error message.

## Brand, logo, domain and contact details

All identity values are read from `VITE_*` environment variables at build time,
with the Diadem values as defaults (see `.env.example` for the full list):

| Variable                                                    | Used for                                             |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| `VITE_BRAND`                                                | The one-word brand in every sentence of copy         |
| `VITE_SITE_NAME`, `VITE_LEGAL_NAME`                         | Titles, footer, disclosure                           |
| `VITE_SITE_URL`                                             | Canonical links, Open Graph, sitemap                 |
| `VITE_MAIN_SITE_URL`                                        | Footer links to the client-facing site               |
| `VITE_LOGO_LIGHT`, `VITE_LOGO_DARK`, `VITE_LOGO_MARK`       | Logo files, as URLs under `public/` (e.g. `/brand/`) |
| `VITE_LOGO_TAG`                                             | The small tag beside the logo                        |
| `VITE_CONTACT_PHONE`, `VITE_CONTACT_EMAIL`, `VITE_LOCATION` | Contact details                                      |

Put them in `.env.local` for development and in the Cloudflare Pages project
variables for deploys; a change needs a rebuild. Favicons are the files in
`public/`.

## Colours

The palette lives in one place, `src/theme/palette.ts` (navy brand scale, gold
accent, light surfaces, text colours). At build time `plugins/theme.ts` writes it
into `index.html` as `:root` custom properties and the browser theme colour;
`src/index.css` maps Tailwind utilities such as `bg-brand-900`, `text-on-dark`
and `bg-card` onto those properties; and `scripts/make-animations.ts` draws the
Lottie files from the same values (it runs before every build). Any entry can be
overridden with `VITE_THEME_<KEY>` (see `.env.example`), so a new palette is a
change of environment variables. Text on dark sections uses `on-dark`, a soft
grey-blue, and light surfaces are warm parchment tones: nothing on the site is
pure white.

## Where things live

| Path                             | What                                                              |
| -------------------------------- | ----------------------------------------------------------------- |
| `src/content/advisors.ts`        | Every word on the home page, section by section                   |
| `src/content/apply.ts`           | Application page copy and form options                            |
| `src/content/site.ts`            | Site name, contact details, navigation and CTA labels             |
| `src/components/sections/`       | One component per home page section                               |
| `src/components/ApplyForm.tsx`   | The application form and its success dialog                       |
| `src/components/LottieScene.tsx` | Places a Lottie file with a poster and reduced-motion still       |
| `src/theme/palette.ts`           | The colour palette, source of every colour on the site            |
| `plugins/theme.ts`               | Injects the palette (with `VITE_THEME_*` overrides) into the page |
| `scripts/make-animations.ts`     | Generates the Lottie files in `public/animations/`                |
| `functions/api/apply.ts`         | Saves applications to GoHighLevel                                 |
| `scripts/prerender.ts`           | Writes each route to `dist/<route>/index.html` after build        |

## Lottie animations

The four animations (`one-table`, `disc-flow`, `objection-check`, `growth`) are
generated, not downloaded, so they use the exact brand colours and carry no
licence. Edit `scripts/make-animations.ts` and run:

```sh
npm run animations
```

To swap one for a file from LottieFiles, drop the `.lottie` or `.json` file in
`public/animations/` and point the matching `<LottieScene src=…>` at it.

## Deploy

Cloudflare Pages: build command `npm run build`, output directory `dist`.
Add `GHL_API_TOKEN` and `GHL_LOCATION_ID` as encrypted variables for Production
and Preview, plus any `VITE_*` overrides from the table above (at least
`VITE_SITE_URL` once the domain is known).
