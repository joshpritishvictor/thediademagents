import { Link } from 'react-router-dom'
import bundledLogo from '../assets/images/logo-diadem.svg'
import bundledLogoDark from '../assets/images/logo-diadem-dark.svg'
import { site } from '../content/site'

/** The wordmark, optionally with its small tag beside it; `light` is the version for dark backgrounds */
export default function Logo({
  light = false,
  withTag = true,
}: {
  light?: boolean
  withTag?: boolean
}) {
  const custom = light ? site.logo.onDark : site.logo.onLight
  const src = custom || (light ? bundledLogoDark : bundledLogo)
  const tag = withTag ? site.logo.tag.trim() : ''

  return (
    <Link
      to="/"
      className="flex items-center gap-3"
      aria-label={`${site.shortName} for Insurance Advisors, home`}
    >
      <img
        src={src}
        alt={site.shortName}
        // Intrinsic size of the bundled logo keeps the layout stable while it loads
        {...(!custom && { width: 212, height: 64 })}
        className="h-11 w-auto sm:h-12"
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
