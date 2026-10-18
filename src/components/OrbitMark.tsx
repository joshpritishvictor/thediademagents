import { m } from 'motion/react'
import bundledMark from '../assets/images/logo-mark.svg'
import { site } from '../content/site'
import { easeOutExpo } from '../lib/motion'
import LottieScene from './LottieScene'

type OrbitMarkProps = {
  className?: string
  /** Seconds before the brand mark lands in the centre */
  logoDelay?: number
}

/**
 * The brand mark at the centre of a table that pops in and pulses: the
 * "one table" animation with the real logo overlaid (the animation leaves
 * its centre clear). Square; size it from the outside.
 */
export default function OrbitMark({
  className = '',
  logoDelay = 1.3,
}: OrbitMarkProps) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <div className="halo" aria-hidden="true" />
      <LottieScene
        src="/animations/one-table.json"
        label={`One table with the ${site.shortName} mark at its centre`}
        className="h-full w-full"
        poster={<TablePoster />}
      />
      <m.img
        src={site.logo.mark || bundledMark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[46%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_6px_18px_rgb(0_0_0/0.45)]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: logoDelay, ease: easeOutExpo }}
      />
    </div>
  )
}

/** Still version of the "one table" animation, shown until the player loads. Colours come from the palette classes. */
function TablePoster() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <circle
        cx="200"
        cy="200"
        r="168"
        strokeWidth="3"
        className="fill-brand-800 stroke-gold-500"
      />
      <circle
        cx="200"
        cy="200"
        r="132"
        className="fill-none stroke-gold-500/35"
      />
    </svg>
  )
}
