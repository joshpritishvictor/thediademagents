import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { disclosure } from '../content/advisors'
import {
  applyLink,
  legalLinks,
  mainSiteLinks,
  navLinks,
  site,
} from '../content/site'
import Logo from './Logo'

const linkClass =
  'link-line font-sans text-sm text-on-dark/65 transition-colors hover:text-on-dark'

export default function Footer() {
  return (
    <footer className="relative border-t border-gold-500/25 bg-brand-950 text-on-dark">
      <div className="container-page grid gap-12 py-14 sm:grid-cols-2 md:py-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-xs font-display text-xl text-on-dark/80 italic">
            {site.tagline}
          </p>
          <Link to={applyLink.to} className="btn-gold mt-8">
            <span>{applyLink.label}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <FooterColumn title="For Advisors" className="lg:col-span-2">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to={applyLink.to} className={linkClass}>
              Apply
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title={site.name} className="lg:col-span-3">
          {mainSiteLinks.map(({ href, label, internal }) => (
            <li key={href}>
              {internal ? (
                <Link to={href} className={linkClass}>
                  {label}
                </Link>
              ) : (
                <a href={href} className={linkClass}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact" className="lg:col-span-3">
          <li>
            <a
              href={site.contact.phoneHref}
              className={`inline-flex items-center gap-2.5 ${linkClass}`}
            >
              <Phone size={15} aria-hidden="true" /> {site.contact.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.contact.email}`}
              className={`inline-flex items-center gap-2.5 ${linkClass}`}
            >
              <Mail size={15} aria-hidden="true" /> {site.contact.email}
            </a>
          </li>
          <li className="inline-flex items-center gap-2.5 font-sans text-sm text-on-dark/65">
            <MapPin size={15} aria-hidden="true" /> {site.location}
          </li>
        </FooterColumn>
      </div>

      {/* Regulatory disclosure */}
      <div className="border-t border-on-dark/10">
        <div className="container-page space-y-3 py-8 font-sans text-[0.72rem] leading-relaxed text-on-dark/40">
          {disclosure.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="border-t border-on-dark/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5 font-sans text-[0.68rem] tracking-[0.08em] text-on-dark/45 uppercase">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. Operating as{' '}
            {site.name}. {site.location}.
          </p>
          <div className="flex gap-6">
            {legalLinks.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-gold-400">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  className = '',
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <p className="eyebrow text-gold-500">{title}</p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}
