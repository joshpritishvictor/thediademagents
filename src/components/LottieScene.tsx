import { useInView, useReducedMotion } from 'motion/react'
import { lazy, Suspense, useRef, useState, type ReactNode } from 'react'

const LottiePlayer = lazy(() => import('./LottiePlayer'))

type LottieSceneProps = {
  /** Path under public/, e.g. "/animations/one-table.json" */
  src: string
  /** Describes the picture for screen readers; empty for purely decorative scenes */
  label?: string
  className?: string
  /** Static stand-in shown before the player loads (and in the pre-rendered HTML) */
  poster?: ReactNode
  loop?: boolean
  /** Play only this frame range and hold it; see <LottiePlayer> */
  segment?: [number, number]
  /** Hold the current frame of a segment; playing resumes when cleared */
  paused?: boolean
}

/**
 * Places a Lottie animation. The player (and its WASM runtime) is only
 * downloaded once the scene comes within a screen of the viewport, so pages
 * that never scroll to one never pay for it. Until it has loaded the poster
 * shows; with "reduce motion" on, the scene holds a still frame instead.
 */
export default function LottieScene({
  src,
  label,
  className = '',
  poster,
  loop = true,
  segment,
  paused,
}: LottieSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // false while pre-rendering, so the canvas player never runs on the server
  const near = useInView(ref, { once: true, margin: '100% 0px' })
  const [ready, setReady] = useState(false)

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {poster && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        >
          {poster}
        </div>
      )}
      {near && (
        <Suspense fallback={null}>
          <LottiePlayer
            src={src}
            loop={loop}
            segment={segment}
            paused={paused}
            stillAt={reduceMotion ? 0.6 : undefined}
            onReady={() => setReady(true)}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
          />
        </Suspense>
      )}
    </div>
  )
}
