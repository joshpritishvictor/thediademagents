import { m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { process } from '../../content/advisors'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

/**
 * Scroll-driven: the step list on the left stays put while the full steps
 * scroll past on the right, and the list highlights the step in view.
 */
export default function Process() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  // The active step is the last one whose top has passed the upper part of the
  // viewport. A scroll listener (one read per frame) is steadier than an
  // intersection band, so the index never flickers between two steps.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = 0
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i
      })
      setActive((prev) => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const jump = (i: number) =>
    stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="how-it-works" className="bg-surface section-y">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow={process.eyebrow}
          title={[process.heading[0], process.heading[1]]}
          description={process.body}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky index: fixed number column, titles aligned, one gold bar that slides between rows */}
          <nav
            aria-label="Process steps"
            className="hidden lg:col-span-4 lg:block"
          >
            <ol className="sticky top-28 border-t border-ink/15">
              {process.steps.map(({ title }, i) => {
                const current = i === active
                return (
                  <li key={title} className="relative border-b border-ink/15">
                    {current && (
                      <m.span
                        layoutId="process-marker"
                        aria-hidden="true"
                        className="absolute top-0 bottom-0 -left-px w-0.5 bg-gold-500"
                        transition={{
                          type: 'spring',
                          bounce: 0,
                          duration: 0.45,
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={current ? 'step' : undefined}
                      className="group grid w-full grid-cols-[2.25rem_1fr] items-start gap-3 py-4 pl-4 text-left"
                    >
                      <span
                        className={`pt-0.5 font-display text-sm italic transition-colors duration-300 ${current ? 'text-gold-600' : 'text-ink/40'}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-sans text-sm leading-snug transition-colors duration-300 ${current ? 'font-bold text-brand-950' : 'font-semibold text-ink/55 group-hover:text-ink'}`}
                      >
                        {title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* Steps */}
          <ol className="lg:col-span-8">
            {process.steps.map(
              ({ icon: Icon, label, title, paragraphs, highlight }, i) => {
                const featured = i === 3
                return (
                  <li
                    key={title}
                    data-step={i}
                    ref={(el) => {
                      stepRefs.current[i] = el
                    }}
                    className={`scroll-mt-28 ${featured ? 'my-10' : ''}`}
                  >
                    <Reveal>
                      <article
                        className={`relative overflow-hidden ${
                          featured
                            ? 'panel-dark p-8 text-on-dark md:p-12'
                            : 'border-t border-ink/15 py-10 md:py-12'
                        }`}
                      >
                        <span
                          className={`ghost-number -top-4 right-0 text-[7rem] md:text-[9rem] ${featured ? 'text-gold-500/10' : 'text-brand-950/[0.05]'}`}
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="relative">
                          <div className="flex items-center gap-4">
                            <span
                              className={`grid size-11 place-items-center border ${featured ? 'border-gold-500 text-gold-400' : 'border-brand-950/30 text-brand-950'}`}
                            >
                              <Icon size={20} aria-hidden="true" />
                            </span>
                            <p
                              className={`eyebrow ${featured ? 'text-gold-400' : ''}`}
                            >
                              {label}
                            </p>
                          </div>
                          <h3
                            className={`mt-5 display-md ${featured ? 'text-on-dark' : 'text-brand-950'}`}
                          >
                            {title}
                          </h3>
                          <div
                            className={`mt-5 max-w-2xl space-y-4 leading-relaxed ${featured ? 'text-on-dark/70' : 'text-ink-muted'}`}
                          >
                            {paragraphs.map((p) => (
                              <p key={p.slice(0, 32)}>{p}</p>
                            ))}
                          </div>
                          {highlight && (
                            <p
                              className={`mt-6 max-w-2xl border-l-2 border-gold-500 pl-5 font-display text-lg italic ${featured ? 'text-gold-300' : 'text-brand-950'}`}
                            >
                              {highlight}
                            </p>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  </li>
                )
              },
            )}
          </ol>
        </div>
      </div>
    </section>
  )
}
