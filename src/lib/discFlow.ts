/**
 * Timeline of the D.I.S.C. flow animation (public/animations/disc-flow.json),
 * shared by the generator that draws it and the component that plays it.
 * The animation is four back-to-back segments, one per stage. A stage's
 * circle lights up at the very start of its segment, as the pulse lands on
 * it, and the pulse then spends the whole segment travelling on to the next
 * circle, so it is never parked: it arrives at the next stage exactly as that
 * stage's segment begins. In the last segment the pulse dissolves into the
 * final circle. The player plays only the active stage's segment, so the
 * circles move in step with the stage tabs instead of on their own clock,
 * and the tabs advance on the segment's length.
 */
export const DISC_FLOW = {
  /** Frames per second */
  fps: 60,
  /** Frames per stage segment: the whole journey to the next stage */
  stageFrames: 300,
  /** Frames before the pulse reaches the first stage (it has no journey, just appears) */
  firstArrivalFrames: 12,
  stages: 4,
} as const

/** How long each stage is shown, in milliseconds: one segment */
export const DISC_CYCLE_MS = (DISC_FLOW.stageFrames / DISC_FLOW.fps) * 1000

/** First and last frame (inclusive) of a stage's segment */
export function discFlowSegment(stage: number): [number, number] {
  const start = stage * DISC_FLOW.stageFrames
  return [start, start + DISC_FLOW.stageFrames - 1]
}

/** Frame, within the whole timeline, at which the pulse reaches a stage's circle */
export function discFlowArrivalFrame(stage: number): number {
  const { stageFrames, firstArrivalFrames } = DISC_FLOW
  return stage * stageFrames + (stage === 0 ? firstArrivalFrames : 0)
}

/** Milliseconds after a stage's segment starts until the pulse reaches its circle */
export function discFlowArrivalMs(stage: number): number {
  return (
    ((discFlowArrivalFrame(stage) - discFlowSegment(stage)[0]) /
      DISC_FLOW.fps) *
    1000
  )
}
