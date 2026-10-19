import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { site } from './content/site'

export { routeModules } from './routes'
export const siteUrl = site.url

/** Every URL to pre-render at build time */
export const urls = ['/', '/about/', '/process/', '/services/', '/apply/']

/** Renders a URL to HTML, waiting for lazy pages to load */
export async function render(url: string) {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return new Response(prelude).text()
}
