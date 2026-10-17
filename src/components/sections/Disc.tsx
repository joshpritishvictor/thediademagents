import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import { disc } from '../../content/advisors'
import { easeOutExpo } from '../../lib/motion'
import LottieScene from '../LottieScene'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

const CYCLE_MS = 5000

export default function Disc() {
  return (
    <section id="disc" className="bg-surface section-y">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="01"
            eyebrow={disc.eyebrow}
            title={[disc.heading[0], disc.heading[1]]}
          />
          <Reveal className="mt-8 space-y-5 text-ink-muted" delay={0.1}>
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
          <Reveal delay={0.2}>
            <figure className="mt-10 border-l-2 border-gold-500 pl-6">
              <blockquote className="font-display text-lg leading-relaxed text-brand-950">
                “{disc.quote.text}”
              </blockquote>
              <figcaption className="mt-4 eyebrow">
                {disc.quote.attribution}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <LottieScene
              src="/animations/disc-flow.json"
              label="A pulse travelling through the four D.I.S.C. stages, lighting each one up"
              className="mx-auto aspect-[5/1] w-full"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <StageTabs />
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 border-t border-ink/15 pt-5 text-ink-muted">
              <span className="mr-3 eyebrow">Result</span>
              {disc.result}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** The four stages as big serif letters; one is open at a time and they advance on their own until hovered */
function StageTabs() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % disc.stages.length),
      CYCLE_MS,
    )
    return () => window.clearInterval(timer)
  }, [paused, active])

  const stage = disc.stages[active]

  return (
    <div
      className="panel mt-4 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        role="tablist"
        aria-label="D.I.S.C. stages"
        className="grid grid-cols-4"
      >
        {disc.stages.map(({ letter, title }, i) => {
          const selected = i === active
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
              className={`group relative flex flex-col items-center gap-2 border-r border-ink/15 px-2 py-6 transition-colors last:border-r-0 ${
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
                  key={active}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="relative min-h-[9.5rem] overflow-hidden border-t border-ink/15 px-6 py-7 md:px-8">
        <span
          className="ghost-number -top-6 right-4 text-[9rem] text-brand-950/[0.05]"
          aria-hidden="true"
        >
          {stage.letter}
        </span>
        <AnimatePresence mode="wait">
          <m.div
            key={active}
            id={`disc-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`disc-tab-${active}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="relative"
          >
            <p className="eyebrow">
              Stage {active + 1} of {disc.stages.length}
            </p>
            <h3 className="mt-2 display-md text-brand-950">{stage.title}</h3>
            <p className="mt-3 max-w-xl text-ink-muted">{stage.body}</p>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
