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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step))
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const jump = (i: number) =>
    stepRefs.current[i]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

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
          {/* Sticky index */}
          <nav
            aria-label="Process steps"
            className="hidden lg:col-span-4 lg:block"
          >
            <ol className="sticky top-28 border-t border-ink/15">
              {process.steps.map(({ title }, i) => {
                const current = i === active
                return (
                  <li key={title} className="border-b border-ink/15">
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={current ? 'step' : undefined}
                      className="group flex w-full items-baseline gap-5 py-4 text-left"
                    >
                      <span
                        className={`font-display text-sm italic transition-colors ${current ? 'text-gold-600' : 'text-ink/40'}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-sans text-sm font-semibold transition-colors ${current ? 'text-brand-950' : 'text-ink/55 group-hover:text-ink'}`}
                      >
                        {title}
                      </span>
                      {current && (
                        <m.span
                          layoutId="process-marker"
                          className="ml-auto size-2 rotate-45 bg-gold-500"
                          transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.5,
                          }}
                        />
                      )}
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
                    className={featured ? 'my-10' : ''}
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
