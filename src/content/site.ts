/**
 * Site identity. Every value can be overridden with a VITE_* variable (see
 * .env.example) so the brand, logo, domain and contact details can change
 * without touching code. Values are baked in at build time.
 */
const env = import.meta.env

const read = (key: keyof ImportMetaEnv, fallback: string) => {
  const value = env[key]
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

/** "1-587-316-1691" → "tel:+15873161691" (10-digit numbers get the +1 country code) */
function telHref(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`
}

const trimSlash = (url: string) => url.replace(/\/+$/, '')

const phone = read('VITE_CONTACT_PHONE', '1-587-316-1691')
const mainSiteUrl = trimSlash(
  read('VITE_MAIN_SITE_URL', 'https://www.thediadem.ca'),
)
const shortName = read('VITE_BRAND', 'Diadem')

export const site = {
  /** Trading name, e.g. "The Diadem Family" */
  name: read('VITE_SITE_NAME', `The ${shortName} Family`),
  /** The one-word brand used throughout the copy */
  shortName,
  legalName: read('VITE_LEGAL_NAME', 'Diadem Strategies Inc.'),
  tagline: read('VITE_TAGLINE', 'Your Financial Ecosystem, Unified'),
  description: read(
    'VITE_SITE_DESCRIPTION',
    `We handle what happens before the meeting so you can focus on what happens in it. Targeted acquisition, structured qualification, and an independent CPA at the table — so the objection that kills most files never comes up.`,
  ),
  /** Canonical origin of this site, used for canonical links, Open Graph and the sitemap */
  url: trimSlash(read('VITE_SITE_URL', 'https://advisors.thediadem.ca')),
  /** The client-facing site */
  mainSiteUrl,
  location: read('VITE_LOCATION', 'Calgary, Alberta, Canada'),
  contact: {
    phone,
    phoneHref: telHref(phone),
    email: read('VITE_CONTACT_EMAIL', 'contact@thediademfamily.com'),
  },
  logo: {
    /** Public URLs (e.g. "/brand/logo.svg"); empty means the bundled Diadem logos */
    onLight: read('VITE_LOGO_LIGHT', ''),
    onDark: read('VITE_LOGO_DARK', ''),
    /** Square-ish icon used at the centre of the hero orbit; empty means the bundled mark */
    mark: read('VITE_LOGO_MARK', ''),
    /** Small tag shown beside the logo */
    tag: typeof env.VITE_LOGO_TAG === 'string' ? env.VITE_LOGO_TAG : 'Advisors',
  },
}

/** Main navigation: the home page sections in order, then the other pages */
/** Pages that open on a light background, where the header must be solid from the top */
export const solidHeaderPaths = [
  '/process/',
  '/services/',
  '/about/',
  '/who-thrives/',
]

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/process/', label: 'Our Process' },
  { to: '/services/', label: 'Services' },
  { to: '/who-thrives/', label: 'Who Thrives' },
  { to: '/about/', label: 'About Us' },
]

export const applyLink = { to: '/apply/', label: 'Apply as an Advisor' }

/** Labels used for every call-to-action on the site */
export const cta = {
  apply: 'Apply as an Advisor',
  applyPremium: `Apply as a ${shortName} Premium Advisor`,
  exploreFlex: `Explore ${shortName} Flex`,
  introCall: 'Schedule a 20-Minute Introduction Call',
}

/** Links to the client-facing site */
export const mainSiteLinks = [
  { href: `${mainSiteUrl}/`, label: 'Home' },
  { href: `${mainSiteUrl}/about-us/`, label: 'About' },
  { href: `${mainSiteUrl}/our-services/`, label: 'For Business Owners' },
  { href: '/', label: 'For Insurance Advisors', internal: true },
  { href: `${mainSiteUrl}/contact-us/`, label: 'Contact' },
]

export const legalLinks = [
  { href: `${mainSiteUrl}/privacy-policy/`, label: 'Privacy Policy' },
  { href: `${mainSiteUrl}/terms-conditions/`, label: 'Terms & Conditions' },
]
