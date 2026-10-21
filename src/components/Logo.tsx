import { Link } from 'react-router-dom'
import bundledLogo from '../assets/images/logo-diadem.svg'
import bundledLogoDark from '../assets/images/logo-diadem-dark.svg'
import { site } from '../content/site'

/** Intrinsic size of the bundled files (crown above the name), so the layout holds while they load */
const size = { width: 1194, height: 552 }

/** The logo, optionally with its small tag beside it; `light` is the version for dark backgrounds */
export default function Logo({
  light = false,
  withTag = true,
  className = 'h-14 w-auto md:h-[3.75rem]',
}: {
  light?: boolean
  withTag?: boolean
  className?: string
}) {
  const custom = light ? site.logo.onDark : site.logo.onLight
  const src = custom || (light ? bundledLogoDark : bundledLogo)
  const tag = withTag ? site.logo.tag.trim() : ''

  return (
    <Link
      to="/"
      className="flex items-center gap-3"
      aria-label={`${site.name} for Insurance Advisors, home`}
    >
      <img
        src={src}
        alt={site.name}
        {...(!custom && size)}
        className={className}
      />
      {tag && (
        <span
          className={`hidden border-l pl-3 font-sans text-[0.62rem] font-bold tracking-[0.3em] uppercase xl:inline-block ${
            light
              ? 'border-gold-500/50 text-gold-400'
              : 'border-brand-900/30 text-brand-900'
          }`}
        >
          {tag}
        </span>
      )}
    </Link>
  )
}
