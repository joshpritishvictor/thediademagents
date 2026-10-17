import '@fontsource-variable/manrope'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/playfair-display/wght-italic.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { preloadRoute } from './routes.ts'

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
