import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { matchPath } from 'react-router-dom'

type PageModule = { default: ComponentType }
type Page = {
  /** File name in src/pages/ */
  page: string
  Component: LazyExoticComponent<ComponentType>
  preload: () => Promise<PageModule>
}

// Each page in src/pages/ becomes its own lazily loaded chunk
const pageModules = import.meta.glob<PageModule>('./pages/*.tsx')
const pageCache = new Map<string, Page>()

function page(name: string): Page {
  let entry = pageCache.get(name)
  if (!entry) {
    const preload = pageModules[`./pages/${name}.tsx`]
    entry = { page: name, Component: lazy(preload), preload }
    pageCache.set(name, entry)
  }
  return entry
}

/** Route table. Trailing slashes match the main thediadem.ca site. Order matters: first match wins. */
export const routes = [
  { path: '/', ...page('Home') },
  { path: '/about/', ...page('About') },
  { path: '/process/', ...page('Process') },
  { path: '/services/', ...page('Services') },
  { path: '/who-thrives/', ...page('WhoThrives') },
  { path: '/apply/', ...page('Apply') },
  { path: '*', ...page('NotFound') },
]

export const matchRoute = (pathname: string) =>
  routes.find(({ path }) => matchPath(path, pathname))

/** Start downloading a page's code before it's needed (e.g. on link hover) */
export function preloadRoute(pathname: string) {
  return matchRoute(pathname)?.preload()
}

/** Source modules a URL needs, used at build time to add <link rel="modulepreload"> */
export function routeModules(pathname: string) {
  const route = matchRoute(pathname)
  return route ? [`src/pages/${route.page}.tsx`] : []
}
