# The Diadem Family for Insurance Advisors

The advisor-facing site for The Diadem Family: a landing page explaining the advisor
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

Each submission creates or updates the contact, tags it, adds a note and fills one
custom field per form answer. Create those fields once per sub-account with
`npm run ghl:fields` (the token needs the custom-field scopes for that run only).

## AI assistant

A chat button on every page opens an assistant that answers advisors' questions
about the programme, services, pricing and applying. It runs on Claude through
`functions/api/assistant.ts` (served in development by `plugins/api-dev.ts`, like
the form) and streams each answer as it is written.

Its knowledge is the site itself, so there is nothing to keep in sync by hand.
At build time `scripts/prerender.ts` takes the text of every pre-rendered page
(`plugins/assistant-knowledge.ts` turns the HTML into plain text) and writes
`dist/assistant-knowledge.txt`; the function reads that file and answers only
from it. Change any copy, in `src/content/` or in a page, and the assistant
knows it after the next deploy. In development the file is rebuilt on every
request, so edits apply at once. Look at
`http://localhost:5173/assistant-knowledge.txt` to see exactly what it knows.

- Set `ANTHROPIC_API_KEY` (server only) to switch it on; `ASSISTANT_MODEL` and
  `ASSISTANT_EFFORT` are optional (see `.env.example`).
- The chat window's wording and the suggested questions for each page are in
  `src/content/assistant.ts`. `VITE_ASSISTANT_ENABLED=false` hides it.
- The model's instructions (stay on topic, never invent prices, link to pages,
  no personal financial advice) are at the top of `functions/api/assistant.ts`.
- Visitors can also **apply in the chat**. The assistant asks follow-up questions for
  the same details as the form, shows a summary, and once the visitor confirms, saves
  it to GoHighLevel with the form's own code (`saveApplication` in
  `functions/api/apply.ts`). Those contacts get the extra tag `ai-assistant`, the
  source "Advisor website application (AI assistant)" and a note saying the chat took
  it. The answer choices live in `src/content/applyOptions.ts`, shared by both.

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

The bundled logo files in `src/assets/images/` are SVG tracings of The Diadem
Family crown logo (vectorized with vtracer from the original artwork, white
background removed, then refilled with one gold gradient and flat brown):
`logo-diadem.svg` and `logo-diadem-dark.svg` (crown above the name, used in
the header and footer) and `logo-mark.svg` (the crown alone, at the centre of
the hero orbit). The `-dark` files use brighter gold stops for navy backgrounds.

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
| `functions/api/assistant.ts`     | The AI assistant: answers questions from the site's text          |
| `src/content/assistant.ts`       | The assistant's chat-window copy and suggested questions          |
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
Add `GHL_API_TOKEN`, `GHL_LOCATION_ID` and `ANTHROPIC_API_KEY` as encrypted
variables for Production and Preview, plus any `VITE_*` overrides from the table above (at least
`VITE_SITE_URL` once the domain is known).
