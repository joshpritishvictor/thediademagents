import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { applyForm } from './content/apply'
import { site } from './content/site'

export { routeModules } from './routes'
export const siteUrl = site.url

/** Identity details the AI assistant's knowledge file starts with (plugins/assistant-knowledge.ts) */
export const assistantSite = {
  name: site.name,
  shortName: site.shortName,
  url: site.url,
  location: site.location,
  contact: { phone: site.contact.phone, email: site.contact.email },
  application: {
    interests: applyForm.interests,
    consent: applyForm.consent,
    success: applyForm.success.body,
  },
}

/** Every URL to pre-render at build time */
export const urls = [
  '/',
  '/about-us/',
  '/about/',
  '/process/',
  '/services/',
  '/who-thrives/',
  '/apply/',
]

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
