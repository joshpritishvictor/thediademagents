import { m, useScroll, useSpring, type TargetAndTransition } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { ChannelChip } from '../components/ChannelIcon'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import { solution } from '../content/advisors'
import { easeOutExpo } from '../lib/motion'

/** Our Process: the eight steps from first click to closed file, all handled for the advisor */
export default function Process() {
  return (
    <>
      <Seo title="Our Process" description={solution.body} />

      <Steps />
    </>
  )
}

/**
 * A timeline: the steps alternate left and right of a central line that runs
 * from the first step's marker to the last. The line fills with gold as the
 * reader scrolls down it; each marker lights and reaches a branch out to its
 * card, and the card slides in from its own side to meet it.
 */
function Steps() {
  const track = useRef<HTMLDivElement>(null)
  const lineBox = useRef<HTMLDivElement>(null)
  const markers = useRef<(HTMLDivElement | null)[]>([])
  // Where the line starts and ends: the centres of the first and last markers
  const [insets, setInsets] = useState({ top: 0, bottom: 0 })

  useLayoutEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => {
      const first = markers.current[0]
      const last = markers.current[solution.steps.length - 1]
      if (!first || !last) return
      const t = el.getBoundingClientRect()
      const f = first.getBoundingClientRect()
      const l = last.getBoundingClientRect()
      setInsets({
        top: f.top + f.height / 2 - t.top,
        bottom: t.bottom - (l.top + l.height / 2),
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // The fill reaches a marker as that marker passes 60% of the way down the screen
  const { scrollYProgress } = useScroll({
    target: lineBox,
    offset: ['start 0.6', 'end 0.6'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  // The page opens with this section, so its top padding clears the fixed header
  return (
    <section className="bg-surface pt-24 pb-24 md:pt-28 md:pb-32">
      <div className="container-page">
        <SectionHeading
          eyebrow={solution.eyebrow}
          title={['From initial interest', 'to professional meeting.']}
        />

        <div ref={track} className="relative mt-16 lg:mt-20">
          {/* The line between the first and last markers (down the left on small screens) and its gold fill */}
          <div
            ref={lineBox}
            className="absolute left-6 w-px lg:left-1/2 lg:-translate-x-1/2"
            style={{ top: insets.top, bottom: insets.bottom }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-ink/15" />
            <m.div
              style={{ scaleY: fill }}
              className="absolute inset-0 origin-top bg-gold-500"
            />
          </div>

          <ol className="space-y-10 lg:space-y-16">
            {solution.steps.map(({ title, body, channels }, i) => {
              const left = i % 2 === 0
              // The first step is lit from the start; the rest light up as they scroll into view
              const reveal = (target: TargetAndTransition, margin: string) =>
                i === 0
                  ? { animate: target }
                  : { whileInView: target, viewport: { once: true, margin } }
              return (
                <li
                  key={title}
                  className="relative grid pl-20 lg:grid-cols-[1fr_8rem_1fr] lg:items-center lg:pl-0"
                >
                  {/* Step marker on the line, with a branch across to the card on its side */}
                  <div
                    ref={(el) => {
                      markers.current[i] = el
                    }}
                    className="absolute top-1/2 left-6 -translate-x-1/2 -translate-y-1/2 lg:relative lg:static lg:col-start-2 lg:row-start-1 lg:flex lg:h-10 lg:translate-x-0 lg:translate-y-0 lg:items-center lg:justify-center lg:self-center"
                    aria-hidden="true"
                  >
                    <m.span
                      className="relative grid size-10 place-items-center rounded-full border-2 border-gold-500 bg-surface font-display text-sm text-brand-950 italic"
                      initial={{ scale: 0.6, opacity: 0 }}
                      {...reveal({ scale: 1, opacity: 1 }, '-40% 0px -40% 0px')}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                    >
                      <m.span
                        className="absolute inset-0 rounded-full bg-gold-500"
                        initial={{ scale: 0 }}
                        {...reveal({ scale: 1 }, '-40% 0px -40% 0px')}
                        transition={{
                          duration: 0.45,
                          delay: 0.1,
                          ease: easeOutExpo,
                        }}
                      />
                      <span className="relative">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </m.span>
                    {/* Branch: from the marker's edge to the card's edge, drawn outward once the marker lights */}
                    <m.span
                      className={`absolute top-1/2 left-full h-px w-9 -translate-y-1/2 bg-gold-500 lg:w-auto ${
                        left
                          ? 'lg:right-[calc(50%+1.25rem)] lg:left-0 lg:origin-right'
                          : 'lg:right-0 lg:left-[calc(50%+1.25rem)] lg:origin-left'
                      } origin-left`}
                      initial={{ scaleX: 0 }}
                      {...reveal({ scaleX: 1 }, '-40% 0px -40% 0px')}
                      transition={{
                        duration: 0.5,
                        delay: 0.35,
                        ease: easeOutExpo,
                      }}
                    />
                  </div>

                  {/* The card slides in from its own side: left cards from the left, right cards from the right */}
                  <m.article
                    className={`panel relative w-full p-6 md:p-8 lg:max-w-lg ${
                      left
                        ? 'lg:col-start-1 lg:justify-self-end'
                        : 'lg:col-start-3'
                    } lg:row-start-1`}
                    initial={{ opacity: 0, x: left ? -72 : 72 }}
                    {...reveal({ opacity: 1, x: 0 }, '-80px')}
                    transition={{
                      duration: 0.9,
                      delay: 0.2,
                      ease: easeOutExpo,
                    }}
                  >
                    <h3 className="font-display text-xl text-brand-950 md:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-muted">
                      {body}
                    </p>
                    {channels && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {channels.map((channel) => (
                          <li key={channel}>
                            <ChannelChip channel={channel} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </m.article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
