import { Plus } from 'lucide-react'
import { m } from 'motion/react'
import { useId, useState } from 'react'
import { advantage } from '../../content/advisors'
import { easeOutExpo } from '../../lib/motion'
import LottieScene from '../LottieScene'
import Reveal from '../Reveal'

export default function Advantage() {
  return (
    <section
      id="advantage"
      className="relative overflow-hidden bg-brand-900 section-y text-on-dark"
    >
      <div className="glow-soft" aria-hidden="true" />

      <div className="relative container-page grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm text-gold-500 italic">
                05
              </span>
              <span className="rule-gold" aria-hidden="true" />
              <p className="eyebrow text-gold-400">{advantage.badge}</p>
            </div>
            <h2 className="mt-6 display-lg text-on-dark">
              {advantage.heading[0]}{' '}
              <em className="accent">{advantage.heading[1]}</em>
            </h2>
            <div className="mt-8 space-y-4 text-on-dark/70">
              {advantage.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <LottieScene
              src="/animations/objection-check.json"
              label="A speech bubble with a hesitant pause that resolves into a gold checkmark"
              className="mt-6 aspect-square w-full max-w-[18rem]"
            />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7 lg:pl-6" delay={0.1}>
          <ObjectionAccordion />
        </Reveal>
      </div>
    </section>
  )
}

/** Each objection opens to show how the table answers it; one open at a time */
function ObjectionAccordion() {
  const [open, setOpen] = useState(0)
  const id = useId()

  return (
    <div className="border-t border-on-dark/15">
      {advantage.objections.map(({ title, quote, answer }, i) => {
        const isOpen = open === i
        const panelId = `${id}-panel-${i}`
        return (
          <div key={title} className="border-b border-on-dark/15">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left"
              >
                <span>
                  <span className="eyebrow text-gold-400">{title}</span>
                  <span
                    className={`mt-3 block font-display text-xl leading-snug italic transition-colors md:text-2xl ${isOpen ? 'text-on-dark' : 'text-on-dark/70 group-hover:text-on-dark'}`}
                  >
                    “{quote}”
                  </span>
                </span>
                <span
                  className={`mt-1 grid size-9 shrink-0 place-items-center border transition duration-300 ${
                    isOpen
                      ? 'rotate-45 border-gold-500 bg-gold-500 text-brand-950'
                      : 'border-on-dark/25 text-on-dark/70 group-hover:border-gold-500'
                  }`}
                >
                  <Plus size={16} aria-hidden="true" />
                </span>
              </button>
            </h3>
            {/* Always in the DOM so the answers are in the pre-rendered HTML; inert when closed */}
            <m.div
              id={panelId}
              role="region"
              inert={!isOpen}
              className="overflow-hidden"
              initial={false}
              animate={
                isOpen
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.45, ease: easeOutExpo }}
            >
              <p className="max-w-2xl border-l-2 border-gold-500 pb-8 pl-5 text-on-dark/70">
                {answer}
              </p>
            </m.div>
          </div>
        )
      })}
    </div>
  )
}
