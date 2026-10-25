import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { finalCta } from '../content/advisors'
import {
  applyLink,
  cta,
  legalLinks,
  mainSiteLinks,
  navLinks,
  site,
} from '../content/site'
import OrbitMark from './OrbitMark'

const linkClass =
  'link-line font-sans text-sm text-on-dark/65 transition-colors hover:text-on-dark'
const contactClass = 'inline-flex items-start gap-2.5'

export default function Footer() {
  return (
    <footer className="relative border-t border-gold-500/25 bg-brand-950 text-on-dark">
      <div className="container-page pt-12 pb-6 md:pt-14 md:pb-8">
        {/* Brand, then three equal link columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          {/* Centred on the height of the link columns beside it */}
          <div className="flex items-center justify-center sm:col-span-2 sm:justify-start lg:col-span-1">
            <Link
              to="/"
              aria-label={`${site.name} for Insurance Advisors, home`}
              className="block w-40 sm:w-44"
            >
              <OrbitMark className="w-full" formCrown />
            </Link>
          </div>

          <FooterColumn title="For Advisors">
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

          <FooterColumn title={site.name}>
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

          <FooterColumn title="Contact">
            <li>
              <a href={site.contact.phoneHref} className={`${contactClass} ${linkClass}`}>
                <Phone size={15} className="mt-[0.2em] shrink-0" aria-hidden="true" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className={`${contactClass} break-all ${linkClass}`}
              >
                <Mail size={15} className="mt-[0.2em] shrink-0" aria-hidden="true" />
                {site.contact.email}
              </a>
            </li>
            <li className={`${contactClass} font-sans text-sm text-on-dark/65`}>
              <MapPin size={15} className="mt-[0.2em] shrink-0" aria-hidden="true" />
              {site.location}
            </li>
          </FooterColumn>
        </div>

        {/* The closing ask, full width under the columns, with the button on the right under Contact */}
        <div className="mt-10 flex flex-col gap-6 border-t border-on-dark/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-display text-[1.6rem] leading-snug text-on-dark">
              {finalCta.heading[0]}{' '}
              <em className="accent">{finalCta.heading[1]}</em>
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-on-dark/65">
              {finalCta.body}
            </p>
          </div>
          <Link to={applyLink.to} className="group btn-gold shrink-0 self-start md:self-auto">
            {/* A glint crossing the button every few seconds */}
            <span
              className="pointer-events-none absolute! inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-gold-300/80 to-transparent"
              aria-hidden="true"
            />
            <span>{cta.apply}</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      <div>
        <div className="container-page flex flex-wrap items-center justify-between gap-4 pb-5 font-sans text-[0.68rem] tracking-[0.08em] text-on-dark/45 uppercase">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}
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
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}
