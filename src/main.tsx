import '@fontsource-variable/manrope'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/playfair-display/wght-italic.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { preloadRoute } from './routes.ts'

/**
 * A refresh always opens at the top of the page. Browsers otherwise restore
 * the last scroll position (and honour a #section left in the address bar
 * by the scroll cue or the nav), which would drop a returning reader mid-page.
 * Links that arrive with a #section from elsewhere still land on that section.
 */
const nav = performance.getEntriesByType('navigation')[0] as
  PerformanceNavigationTiming | undefined
if (nav?.type === 'reload') {
  history.scrollRestoration = 'manual'
  if (location.hash)
    history.replaceState(null, '', location.pathname + location.search)
  window.scrollTo(0, 0)
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (root.firstElementChild) {
  // Pre-rendered page: load its code first so hydration happens in one pass
  Promise.resolve(preloadRoute(location.pathname)).finally(() =>
    hydrateRoot(root, app),
  )
} else {
  createRoot(root).render(app)
}
