import { m, useReducedMotion, type Transition } from 'motion/react'
import { useId } from 'react'
import markSvg from '../assets/images/logo-mark.svg?raw'

// The crown is one compound path in the bundled mark; reuse it so the drawing matches the logo exactly
const crownPath = markSvg.match(/<path[^>]* d="([^"]+)"/)?.[1] ?? ''
const viewBox = markSvg.match(/viewBox="([^"]+)"/)?.[1] ?? '150 25 1037 585'

/** Seconds for one cycle: trace, fill, gleam, hold, then dissolve back to nothing */
const CYCLE = 7

/** One looping keyframe track; `times` are fractions of the cycle */
const loop = (times: number[]): Transition => ({
  duration: CYCLE,
  times,
  ease: 'easeInOut',
  repeat: Infinity,
})

/**
 * The crown forming, over and over while it's on screen: its gold outline
 * traces itself, the fill pours in from the base as the outline fades, a
 * gleam crosses it, it holds, then drains and un-traces to start again.
 * Sized from the outside, like an <img>.
 */
export default function CrownDraw({ className = '' }: { className?: string }) {
  const id = useId()
  const reduceMotion = useReducedMotion()
  const [x, y, w, h] = viewBox.split(' ').map(Number)
  const fill = `${id}-fill`
  const clip = `${id}-clip`
  const gleam = `${id}-gleam`

  // With "reduce motion" on, the finished crown holds still. Off screen the
  // loop stops, and it starts again from nothing when scrolled back to.
  const play = reduceMotion
    ? { initial: 'done' as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'cycle' as const,
        viewport: { margin: '-40px' },
      }

  return (
    <m.svg
      viewBox={viewBox}
      className={className}
      style={{ aspectRatio: `${w} / ${h}` }}
      aria-hidden="true"
      {...play}
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0c36a" />
          <stop offset=".55" stopColor="#d9a64e" />
          <stop offset="1" stopColor="#a87a30" />
        </linearGradient>
        <linearGradient id={gleam} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff6dc" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff6dc" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clip}>
          <path d={crownPath} fillRule="evenodd" />
        </clipPath>
      </defs>

      {/* Outline: traces, fades once filled, returns as the fill drains, then un-traces */}
      <m.path
        d={crownPath}
        fill="none"
        stroke="#e2b45c"
        strokeWidth={5}
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 1 },
          done: { pathLength: 1, opacity: 0 },
          cycle: {
            pathLength: [0, 1, 1, 0],
            opacity: [1, 1, 0, 0, 1, 1],
            transition: {
              pathLength: loop([0, 0.23, 0.9, 1]),
              opacity: loop([0, 0.3, 0.38, 0.8, 0.85, 1]),
            },
          },
        }}
      />

      <g clipPath={`url(#${clip})`}>
        {/* The gold fill pours in from the base up, and later drains back down */}
        <m.rect
          x={x}
          width={w}
          fill={`url(#${fill})`}
          variants={{
            hidden: { y: y + h, height: 0 },
            done: { y, height: h },
            cycle: {
              y: [y + h, y + h, y, y, y + h, y + h],
              height: [0, 0, h, h, 0, 0],
              transition: loop([0, 0.17, 0.3, 0.8, 0.9, 1]),
            },
          }}
        />
        {/* Shading on the right half, as on the logo */}
        <m.g
          variants={{
            hidden: { opacity: 0 },
            done: { opacity: 1 },
            cycle: {
              opacity: [0, 0, 1, 1, 0, 0],
              transition: loop([0, 0.25, 0.32, 0.8, 0.86, 1]),
            },
          }}
        >
          <rect x="674" y="0" width="700" height="620" fill="#7a4e12" opacity=".14" />
          <rect x="672" y="60" width="3.5" height="560" fill="#8a5a14" opacity=".6" />
          <rect x="675.5" y="60" width="2" height="560" fill="#fff" opacity=".22" />
        </m.g>
        {/* A gleam crossing once the crown is whole */}
        {!reduceMotion && (
          <m.rect
            y={y}
            width={w * 0.3}
            height={h}
            fill={`url(#${gleam})`}
            variants={{
              hidden: { x: x - w * 0.3 },
              cycle: {
                x: [x - w * 0.3, x - w * 0.3, x + w, x + w],
                transition: loop([0, 0.32, 0.48, 1]),
              },
            }}
          />
        )}
      </g>
    </m.svg>
  )
}
