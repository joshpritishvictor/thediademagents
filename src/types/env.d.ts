// Browser-side variables. All optional; defaults live in src/content/site.ts. See .env.example
interface ImportMetaEnv {
  /** One-word brand used throughout the copy, e.g. "Diadem" */
  readonly VITE_BRAND?: string
  /** Trading name, e.g. "The Diadem Family" */
  readonly VITE_SITE_NAME?: string
  readonly VITE_LEGAL_NAME?: string
  readonly VITE_TAGLINE?: string
  readonly VITE_SITE_DESCRIPTION?: string
  /** Canonical origin of this site, e.g. "https://advisors.example.com" */
  readonly VITE_SITE_URL?: string
  /** The client-facing site, linked from the footer */
  readonly VITE_MAIN_SITE_URL?: string
  readonly VITE_LOCATION?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_CONTACT_EMAIL?: string
  /** Logo for light backgrounds, as a public URL such as "/brand/logo.svg" */
  readonly VITE_LOGO_LIGHT?: string
  /** Logo for dark backgrounds */
  readonly VITE_LOGO_DARK?: string
  /** Icon-only mark shown at the centre of the hero orbit */
  readonly VITE_LOGO_MARK?: string
  /** Small tag beside the logo; empty string hides it */
  readonly VITE_LOGO_TAG?: string
  /** Form backend URL that accepts a JSON POST. Defaults to /api/apply (functions/api/apply.ts) */
  readonly VITE_APPLY_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
