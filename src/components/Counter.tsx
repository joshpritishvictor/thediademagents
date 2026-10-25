import { animate, useInView } from 'motion/react'
import { useEffect, useLayoutEffect, useRef } from 'react'

type CounterProps = {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  /** Seconds to wait after coming into view before counting */
  delay?: number
  /** Seconds the count takes */
  duration?: number
}

// useLayoutEffect warns during server rendering; the reset only matters in the browser
const useBrowserLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Counts up from 0 when scrolled into view. The pre-rendered HTML holds the
 * final value (so it reads correctly without JS); in the browser it drops to
 * 0 before the first paint, so the whole climb is seen.
 */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  className,
  delay = 0,
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useBrowserLayoutEffect(() => {
    if (ref.current) ref.current.textContent = `${prefix}0${suffix}`
  }, [prefix, suffix])

  useEffect(() => {
    const node = ref.current
    if (!inView || !node) return
    // Writes straight to the DOM so counting doesn't re-render React
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, prefix, suffix, delay, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
