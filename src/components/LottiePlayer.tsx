import {
  DotLottieReact,
  setWasmUrl,
  type DotLottie,
} from '@lottiefiles/dotlottie-react'
import wasmUrl from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url'
import { useEffect, useRef, useState } from 'react'

// Serve the player's WASM from our own build instead of a third-party CDN
setWasmUrl(wasmUrl)

type LottiePlayerProps = {
  /** Path to a .lottie or .json file, e.g. "/animations/one-table.json" */
  src: string
  className?: string
  loop?: boolean
  /** Hold this fraction of the animation as a still instead of playing (reduced motion) */
  stillAt?: number
  /**
   * Play only this frame range [first, last] once and hold its last frame.
   * Whenever it changes the range plays from its start, so the page can
   * drive the animation (e.g. in step with a set of tabs). Loop is ignored.
   */
  segment?: [number, number]
  /** Hold the current frame (segments only); playing resumes when cleared */
  paused?: boolean
  onReady?: () => void
}

/**
 * Canvas Lottie player. Loaded with React.lazy by <LottieScene> so the
 * runtime is only downloaded where an animation is on the page. The player
 * itself freezes rendering while the canvas is off screen.
 */
export default function LottiePlayer({
  src,
  className,
  loop = true,
  stillAt,
  segment,
  paused = false,
  onReady,
}: LottiePlayerProps) {
  const [player, setPlayer] = useState<DotLottie | null>(null)
  const still = stillAt !== undefined
  const [segStart, segEnd] = segment ?? []
  const segmented = segStart !== undefined && segEnd !== undefined
  // Read by the segment effect without re-running it when the pause state changes
  const pausedRef = useRef(paused)
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  /** Run `fn` once the animation is loaded (now if it already is) */
  const whenLoaded = (p: DotLottie, fn: () => void) => {
    if (p.isLoaded) {
      fn()
      return
    }
    p.addEventListener('load', fn)
    return () => p.removeEventListener('load', fn)
  }

  useEffect(() => {
    if (!player) return
    return whenLoaded(player, () => {
      if (still && !segmented)
        player.setFrame(Math.round(player.totalFrames * stillAt))
      onReady?.()
    })
  }, [player, still, stillAt, segmented, onReady])

  // Play the requested segment each time it changes; with reduced motion, show its settled end frame
  useEffect(() => {
    if (!player || !segmented) return
    return whenLoaded(player, () => {
      player.setSegment(segStart, segEnd)
      if (still) {
        player.setFrame(segEnd)
      } else {
        player.setFrame(segStart)
        if (pausedRef.current) player.pause()
        else player.play()
      }
    })
  }, [player, segmented, segStart, segEnd, still])

  // Freeze mid-segment while the page is paused (e.g. the tabs are hovered), then carry on
  useEffect(() => {
    if (!player || !segmented || still) return
    return whenLoaded(player, () => {
      if (paused) player.pause()
      else if (!player.isPlaying) player.play()
    })
  }, [player, segmented, still, paused])

  return (
    <DotLottieReact
      src={src}
      className={className}
      loop={segmented ? false : loop}
      autoplay={!still && !segmented}
      useFrameInterpolation
      renderConfig={{
        autoResize: true,
        freezeOnOffscreen: true,
        // Two device pixels per CSS pixel is plenty for these flat shapes; caps canvas memory on 3x phones
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      }}
      dotLottieRefCallback={setPlayer}
    />
  )
}
