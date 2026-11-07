import markSvg from '../assets/images/logo-mark.svg?raw'
import { site } from '../content/site'

// The crown from the bundled logo mark, so the assistant wears the brand's own crown
const crownPath = markSvg.match(/<path[^>]* d="([^"]+)"/)?.[1] ?? ''
const viewBox = markSvg.match(/viewBox="([^"]+)"/)?.[1] ?? '150 25 1037 585'

/** `launcher`: the crown sways now and then, with a glint across the gold (the floating button). Stops with "reduce motion" on. */
export type IconMood = 'still' | 'launcher'

/**
 * The assistant's emblem: the brand crown in a gold roundel. Size it from the
 * outside (e.g. "size-9"); the crown takes the text colour.
 */
export default function AssistantIcon({
  className = '',
  mood = 'still',
}: {
  className?: string
  mood?: IconMood
}) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-full ${className}`}
      aria-hidden="true"
    >
      <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 text-brand-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_0_0_1px_rgb(0_0_0/0.15)]">
        {/* Fine inner ring, like a seal */}
        <span className="pointer-events-none absolute inset-[3px] rounded-full border border-brand-950/25" />
        {mood === 'launcher' && (
          // A glint crossing the gold, then a pause before the next
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        )}
        <span
          className={`grid w-[60%] place-items-center ${mood === 'launcher' ? 'origin-bottom animate-crown-sway' : ''}`}
        >
          {site.logo.mark ? (
            <img src={site.logo.mark} alt="" className="w-full" />
          ) : (
            <svg
              viewBox={viewBox}
              className="w-full translate-y-[-4%]"
              fill="currentColor"
            >
              <path d={crownPath} fillRule="evenodd" />
            </svg>
          )}
        </span>
      </span>
    </span>
  )
}
