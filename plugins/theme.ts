import { loadEnv, type Plugin } from 'vite'
import { cssVariables, resolvePalette } from '../src/theme/palette.ts'

/**
 * Writes the colour palette (src/theme/palette.ts, with VITE_THEME_* overrides)
 * into index.html as :root custom properties and the browser theme colour.
 * src/index.css maps Tailwind's colour utilities onto those properties, so the
 * whole site re-themes from environment variables alone.
 */
export default function theme(): Plugin {
  let vars = ''
  let brand = ''
  return {
    name: 'diadem:theme',
    config(_config, { mode }) {
      const colors = resolvePalette({
        ...loadEnv(mode, process.cwd(), 'VITE_THEME_'),
        ...process.env,
      })
      vars = cssVariables(colors)
      brand = colors.brand900
    },
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: brand },
          injectTo: 'head-prepend',
        },
        {
          tag: 'style',
          attrs: { id: 'theme' },
          children: `:root{${vars}}`,
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}
