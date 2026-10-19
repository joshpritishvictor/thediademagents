import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { disc } from '../../content/advisors'
import {
  DISC_CYCLE_MS,
  discFlowArrivalMs,
  discFlowSegment,
} from '../../lib/discFlow'
import { easeOutExpo } from '../../lib/motion'
import LottieScene from '../LottieScene'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

/** Each stage shows for one segment of the flow animation, so the two stay in step */
const CYCLE_MS = DISC_CYCLE_MS

export default function Disc() {
  return (
    <section
      id="disc"
      className="flex flex-col bg-surface lg:min-h-[calc(100svh-var(--snap-top))]"
    >
      <ProfessionsTicker />
      <div className="container-page py-20 lg:my-auto lg:py-4">
        {/* Two columns in two rows: the heading shares its row with the circle row, so the circles sit level with it; the text and the stage panel share the second */}
        <div className="grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16">
          <SectionHeading
            eyebrow={disc.eyebrow}
            title={[disc.heading[0], disc.heading[1]]}
            size="md"
            className="lg:col-start-1 lg:row-start-1"
          />
          <div className="lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col">
            <Reveal className="mt-5 space-y-4 text-ink-muted" delay={0.1}>
              {disc.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 2 ? 'font-display text-xl text-brand-950 italic' : ''
                  }
                >
                  {p}
                </p>
              ))}
            </Reveal>
            {/* Pinned to the row's foot so the quote ends level with the stage panel opposite */}
            <Reveal delay={0.2} className="lg:mt-auto">
              <figure className="mt-6 border-l-2 border-gold-500 pl-6">
                <blockquote className="font-display text-lg leading-relaxed text-brand-950">
                  “{disc.quote.text}”
                </blockquote>
                <figcaption className="mt-3 text-ink-muted">
                  <span className="mr-3 eyebrow">Result</span>
                  {disc.result}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <StageTabs />
        </div>
      </div>
    </section>
  )
}

const professions = [
  'Insurance Advisor',
  'Chartered Professional Accountant',
  'Independent Lawyer',
  'Corporate Insurance Specialist',
]

/** The professions at the table, scrolling across the top of the section */
function ProfessionsTicker() {
  return (
    <div
      className="overflow-hidden border-y border-gold-500/25 bg-brand-950 pt-5 pb-4"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-12 font-display text-sm tracking-[0.2em] whitespace-nowrap text-gold-400/80 uppercase">
        {[...professions, ...professions, ...professions, ...professions].map(
          (p, i) => (
            <span key={i} className="flex items-center gap-12">
              {p}
              <span className="size-1.5 rotate-45 bg-gold-500/70" />
            </span>
          ),
        )}
      </div>
    </div>
  )
}

/**
 * The four stages as big serif letters; one is open at a time and they advance
 * on their own until hovered. The pipeline animation above follows the open
 * stage: each change plays that stage's segment, in which the pulse travels
 * the gold line to the stage's circle. The letter and its panel light up only
 * when the pulse arrives, so the two never disagree.
 * Renders two siblings (circles, then panel) so a parent grid can place them.
 */
function StageTabs() {
  const [active, setActive] = useState(0)
  // The stage shown as lit in the tabs and panel; trails `active` by the pulse's travel time
  const [lit, setLit] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const arrivalMs = reduceMotion ? 0 : discFlowArrivalMs(active)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % disc.stages.length),
      CYCLE_MS,
    )
    return () => window.clearInterval(timer)
  }, [paused, active])

  useEffect(() => {
    const timer = window.setTimeout(() => setLit(active), arrivalMs)
    return () => window.clearTimeout(timer)
  }, [active, arrivalMs])

  const stage = disc.stages[lit]

  return (
    <>
      <Reveal className="mt-12 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:self-end">
        <LottieScene
          src="/animations/disc-flow.json"
          label={`The four D.I.S.C. stages in a row; a pulse has lit up stage ${lit + 1}, ${stage.title}`}
          className="mx-auto aspect-[5/1] w-full"
          segment={discFlowSegment(active)}
          paused={paused}
        />
      </Reveal>
      <Reveal
        delay={0.1}
        className="lg:col-start-2 lg:row-start-2 lg:flex lg:flex-col"
      >
        {/* Grows to the row's height so the card ends level with the text opposite */}
        <div
          className="panel mt-4 flex flex-col overflow-hidden lg:flex-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            role="tablist"
            aria-label="D.I.S.C. stages"
            className="grid grid-cols-4"
          >
            {disc.stages.map(({ letter, title }, i) => {
              const selected = i === lit
              return (
                <button
                  key={letter}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`disc-panel-${i}`}
                  id={`disc-tab-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  className={`group relative flex flex-col items-center gap-2 border-r border-ink/15 px-2 py-4 transition-colors last:border-r-0 ${
                    selected ? 'bg-brand-950' : 'hover:bg-surface-alt'
                  }`}
                >
                  <span
                    className={`font-display text-4xl leading-none transition-colors md:text-5xl ${
                      selected
                        ? 'text-gold-400'
                        : 'text-brand-950/70 group-hover:text-brand-950'
                    }`}
                  >
                    {letter}
                  </span>
                  <span
                    className={`font-sans text-[0.6rem] font-bold tracking-[0.22em] uppercase ${
                      selected ? 'text-on-dark/70' : 'text-ink-muted'
                    }`}
                  >
                    {title}
                  </span>
                  {selected && !paused && (
                    <m.span
                      key={lit}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: (CYCLE_MS - arrivalMs) / 1000,
                        ease: 'linear',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="relative grid flex-1 overflow-hidden border-t border-ink/15 px-6 py-5 md:px-8">
            {/* An invisible copy of every stage sits in the same cell, so the panel is always as tall as the longest one and nothing shifts between stages */}
            <div
              className="invisible col-start-1 row-start-1 grid"
              aria-hidden="true"
            >
              {disc.stages.map(({ title, body }) => (
                <div key={title} className="col-start-1 row-start-1">
                  <p className="eyebrow">Stage</p>
                  <h3 className="mt-2 display-md">{title}</h3>
                  <p className="mt-3 max-w-xl">{body}</p>
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <m.div
                key={lit}
                id={`disc-panel-${lit}`}
                role="tabpanel"
                aria-labelledby={`disc-tab-${lit}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: easeOutExpo }}
                className="relative col-start-1 row-start-1"
              >
                <p className="eyebrow">
                  Stage {lit + 1} of {disc.stages.length}
                </p>
                <h3 className="mt-2 display-md text-brand-950">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-xl text-ink-muted">{stage.body}</p>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </>
  )
}
