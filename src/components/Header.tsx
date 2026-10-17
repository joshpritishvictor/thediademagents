import { Menu, Phone, X } from 'lucide-react'
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { applyLink, navLinks, site } from '../content/site'
import { easeOutExpo } from '../lib/motion'
import Logo from './Logo'

const sectionIds = navLinks.map(({ to }) => to.slice(to.indexOf('#') + 1))

/** Which home page section is currently on screen, for the nav highlight */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const ratios = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }
        let best: string | null = null
        let bestRatio = 0.15
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setActive(best)
      },
      { threshold: [0.15, 0.3, 0.5, 0.7], rootMargin: '-15% 0px -35% 0px' },
    )
    // The sections are in a lazily loaded page; look for them once it has rendered
    let attempts = 0
    const observe = () => {
      const found = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
      if (found.length === 0 && attempts++ < 20) {
        timer = window.setTimeout(observe, 150)
        return
      }
      found.forEach((el) => observer.observe(el))
    }
    let timer = window.setTimeout(observe, 0)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [enabled])

  return enabled ? active : null
}

export default function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const [menuPath, setMenuPath] = useState(pathname)
  const activeSection = useActiveSection(pathname === '/')

  // Close the mobile menu after navigating
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Every page opens on a dark hero: the bar starts as a hairline and becomes solid navy once scrolled
  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b text-on-dark transition-[background-color,border-color,box-shadow] duration-500 ease-out-expo ${
        solid
          ? 'border-gold-500/25 bg-brand-950/95 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md'
          : 'border-on-dark/10 bg-transparent'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-8">
        <Logo light />

        <nav
          aria-label="Main"
          className="hidden items-center gap-5 whitespace-nowrap lg:flex xl:gap-7"
        >
          {navLinks.map(({ to, label }) => {
            const id = to.slice(to.indexOf('#') + 1)
            const active = activeSection === id
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`relative py-2 font-sans text-[0.66rem] font-bold tracking-[0.2em] uppercase transition-colors ${
                  active
                    ? 'text-gold-400'
                    : 'text-on-dark/65 hover:text-on-dark'
                }`}
              >
                {label}
                {active && (
                  <m.span
                    layoutId="nav-line"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gold-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-6 whitespace-nowrap lg:flex">
          <a
            href={site.contact.phoneHref}
            className="hidden items-center gap-2 font-sans text-[0.72rem] font-semibold tracking-[0.12em] text-on-dark/70 transition-colors hover:text-gold-400 2xl:inline-flex"
          >
            <Phone size={14} aria-hidden="true" />
            {site.contact.phone}
          </a>
          <Link to={applyLink.to} className="btn-gold px-5 py-3">
            <span>{applyLink.label}</span>
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-on-dark lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Main"
            className="overflow-hidden border-t border-gold-500/20 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
          >
            <div className="container-page flex flex-col py-6">
              {navLinks.map(({ to, label }, i) => (
                <m.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between border-b border-on-dark/10 py-4 font-display text-2xl text-on-dark"
                  >
                    {label}
                    <span className="font-sans text-[0.65rem] tracking-[0.3em] text-gold-500">
                      0{i + 1}
                    </span>
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navLinks.length + 0.05 }}
                className="pt-6"
              >
                <Link
                  to={applyLink.to}
                  onClick={() => setMenuOpen(false)}
                  className="btn-gold w-full"
                >
                  <span>{applyLink.label}</span>
                </Link>
              </m.div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
