/**
 * The site's colour palette: the single source of truth for the CSS tokens
 * (injected into :root by plugins/theme.ts and consumed by src/index.css),
 * the Lottie animations (scripts/make-animations.ts) and the browser theme
 * colour. Every entry can be overridden with VITE_THEME_<KEY> (key in upper
 * snake case, e.g. VITE_THEME_BRAND_900=#0b1a33), so a rebrand is a change of
 * environment variables, not code.
 */
export const palette = {
  // Brand (navy) scale: 950 is the footer, 900 the dark sections, 800 raised surfaces on them
  brand950: '#0a1628',
  brand900: '#0f1e35',
  brand800: '#1a2f4e',
  brand700: '#27416a',
  // Accent (gold)
  gold300: '#e3cf8f',
  gold400: '#d4aa4a',
  gold500: '#c9a84c',
  gold600: '#a8892f',
  // Light surfaces: warm parchment tones, never white. The card tone sits between
  // the page and the alternate band so cards stand out on both.
  surface: '#f5f1e9',
  surfaceAlt: '#eae3d4',
  card: '#f0e9dc',
  // Raised card on a dark section
  cardDark: '#16294a',
  // Text on light surfaces
  ink: '#1b2433',
  inkMuted: '#4a5568',
  // Text on dark surfaces: a steel blue-grey that clearly reads as a colour, never white
  onDark: '#c3ccda',
  onDarkMuted: '#8d9ab0',
} as const

export type PaletteKey = keyof typeof palette
export type Palette = Record<PaletteKey, string>

/** "brand900" → "brand-900", "onDark" → "on-dark" */
export const tokenName = (key: string) =>
  key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase()

/** "brand900" → "VITE_THEME_BRAND_900" */
export const envName = (key: string) =>
  `VITE_THEME_${tokenName(key).replace(/-/g, '_').toUpperCase()}`

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

/** The palette with any VITE_THEME_* overrides from `env` applied */
export function resolvePalette(
  env: Record<string, string | undefined>,
): Palette {
  const out = { ...palette } as Palette
  for (const key of Object.keys(palette) as PaletteKey[]) {
    const value = env[envName(key)]?.trim()
    if (value && HEX.test(value)) out[key] = value.toLowerCase()
    else if (value)
      console.warn(`${envName(key)}: "${value}" is not a hex colour, ignored`)
  }
  return out
}

/** CSS custom property declarations for :root, e.g. "--brand-900: #0f1e35;" */
export const cssVariables = (colors: Palette) =>
  (Object.keys(colors) as PaletteKey[])
    .map((key) => `--${tokenName(key)}:${colors[key]}`)
    .join(';')
