import { m, useReducedMotion, type PanInfo } from 'motion/react'
import { useEffect, useId, useState, type KeyboardEvent } from 'react'
import { problem } from '../../content/advisors'
import { easeOutExpo } from '../../lib/motion'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

const CYCLE_MS = 7000

export default function Problem() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-brand-950 py-14 text-on-dark lg:min-h-[calc(100svh-var(--snap-top))] lg:py-10">
      <div className="glow-soft" aria-hidden="true" />

      {/* Fills one screen below the header, content centred, so the whole block is in view when snapped to */}
      <div className="relative container-page lg:my-auto">
        <SectionHeading
          title={[problem.heading[0], problem.heading[1]]}
          align="center"
          light
        />

        <Reveal className="mt-6 lg:mt-8" delay={0.15}>
          <ObjectionCarousel />
        </Reveal>
      </div>
    </section>
  )
}

/**
 * The objections as slides: the client's words, what used to happen next, and
 * what happens at a coordinated table instead. Advances on its own until the
 * reader hovers, focuses or takes the controls.
 */
function ObjectionCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const id = useId()
  const slides = problem.objections
  const count = slides.length

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % count),
      CYCLE_MS,
    )
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion, active, count])

  const go = (i: number) => setActive((i + count) % count)

  // A swipe (or mouse drag) moves one slide in the direction of the gesture
  const onSwipe = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.x < -40 || velocity.x < -300) go(active + 1)
    else if (offset.x > 40 || velocity.x > 300) go(active - 1)
  }

  // Arrow keys work while anything inside the carousel (a slide dot) has focus
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') go(active + 1)
    else if (event.key === 'ArrowLeft') go(active - 1)
    else return
    event.preventDefault()
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Objections advisors hear"
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      {/*
       * The drag layer gives a little elastic pull under the finger and snaps
       * back; the track inside it does the actual move to the chosen slide.
       * Vertical panning is left to the page so the carousel never traps scrolling.
       */}
      <m.div
        className="cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        dragSnapToOrigin
        onDragStart={() => setPaused(true)}
        onDragEnd={onSwipe}
      >
        {/* All slides stay in the DOM (and the pre-rendered HTML); the track slides between them */}
        <m.div
          className="flex"
          animate={{ x: `${-active * 100}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: easeOutExpo }
          }
        >
          {slides.map(({ title, eyebrow, quote, tagline, answer }, i) => {
            const current = i === active
            return (
              <article
                key={title}
                id={`${id}-slide-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${title}`}
                aria-hidden={!current}
                inert={!current}
                className="w-full shrink-0 px-2 py-2 text-center sm:px-6 md:px-10"
              >
                <p className="eyebrow text-gold-400">{eyebrow}</p>
                <figure className="mt-5">
                  <blockquote className="mx-auto max-w-4xl font-display text-2xl leading-snug text-gold-300 italic md:text-[1.75rem]">
                    “{quote}”
                  </blockquote>
                  <figcaption className="mt-5 font-sans text-[0.66rem] font-bold tracking-[0.2em] text-on-dark/55 uppercase">
                    <span aria-hidden="true">— </span>
                    {tagline}
                  </figcaption>
                </figure>
                <div className="mx-auto mt-6 max-w-2xl">
                  <p className="eyebrow text-gold-400">{problem.answerLabel}</p>
                  <p className="mt-3 text-on-dark/75">{answer}</p>
                </div>
              </article>
            )
          })}
        </m.div>
      </m.div>

      <div className="mt-8 flex items-center justify-center px-4">
        <div className="flex items-center gap-2" aria-label="Choose a slide">
          {slides.map(({ title }, i) => {
            const current = i === active
            return (
              <button
                key={title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${title}`}
                aria-current={current ? 'true' : undefined}
                className="group p-1.5"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    current
                      ? 'w-8 bg-gold-500'
                      : 'w-3 bg-on-dark/30 group-hover:bg-on-dark/60'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
