import { ChevronLeft, ChevronRight } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { problem } from '../../content/advisors'
import { easeOutExpo } from '../../lib/motion'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

const CYCLE_MS = 7000

export default function Problem() {
  return (
    <section className="relative overflow-hidden bg-brand-950 section-y text-on-dark">
      <div className="glow-soft" aria-hidden="true" />

      <div className="relative container-page">
        <SectionHeading
          title={[problem.heading[0], problem.heading[1]]}
          align="center"
          light
        />

        <Reveal className="mt-10 lg:mt-12" delay={0.15}>
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
    >
      <div className="overflow-hidden">
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
                className="w-full shrink-0 px-2 py-4 text-center sm:px-6 md:px-10"
              >
                <p className="eyebrow text-gold-400">{eyebrow}</p>
                <figure className="mt-5">
                  <blockquote className="mx-auto max-w-4xl font-display text-2xl leading-snug text-gold-300 italic md:text-[2rem]">
                    “{quote}”
                  </blockquote>
                  <figcaption className="mt-5 font-sans text-[0.66rem] font-bold tracking-[0.2em] text-on-dark/55 uppercase">
                    <span aria-hidden="true">— </span>
                    {tagline}
                  </figcaption>
                </figure>
                <div className="mx-auto mt-8 max-w-2xl">
                  <p className="eyebrow text-gold-400">{problem.answerLabel}</p>
                  <p className="mt-3 text-on-dark/75">{answer}</p>
                </div>
              </article>
            )
          })}
        </m.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4">
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

        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-on-dark/50 italic">
            {String(active + 1).padStart(2, '0')}
            <span className="mx-1.5 text-on-dark/30">/</span>
            {String(count).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous objection"
              className="grid size-9 place-items-center border border-on-dark/25 text-on-dark/70 transition-colors hover:border-gold-500 hover:text-gold-400"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next objection"
              className="grid size-9 place-items-center border border-on-dark/25 text-on-dark/70 transition-colors hover:border-gold-500 hover:text-gold-400"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
