import {
  DotLottieReact,
  setWasmUrl,
  type DotLottie,
} from '@lottiefiles/dotlottie-react'
import wasmUrl from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url'
import { useEffect, useState } from 'react'

// Serve the player's WASM from our own build instead of a third-party CDN
setWasmUrl(wasmUrl)

type LottiePlayerProps = {
  /** Path to a .lottie or .json file, e.g. "/animations/one-table.json" */
  src: string
  className?: string
  loop?: boolean
  /** Hold this fraction of the animation as a still instead of playing (reduced motion) */
  stillAt?: number
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
  onReady,
}: LottiePlayerProps) {
  const [player, setPlayer] = useState<DotLottie | null>(null)
  const still = stillAt !== undefined

  useEffect(() => {
    if (!player) return
    const onLoad = () => {
      if (still) player.setFrame(Math.round(player.totalFrames * stillAt))
      onReady?.()
    }
    player.addEventListener('load', onLoad)
    if (player.isLoaded) onLoad()
    return () => player.removeEventListener('load', onLoad)
  }, [player, still, stillAt, onReady])

  return (
    <DotLottieReact
      src={src}
      className={className}
      loop={loop}
      autoplay={!still}
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
