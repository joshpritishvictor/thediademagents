import { Check } from 'lucide-react'
import { m } from 'motion/react'
import {
  fees,
  solution,
  type ComparisonGroup,
  type ComparisonItem,
  type FeePlan,
} from '../content/advisors'
import { easeOutExpo } from '../lib/motion'
import ChannelIcon from './ChannelIcon'

/**
 * The rows every card lays out, top to bottom. On desktop the two cards share
 * these rows (CSS subgrid), so each part of one card sits level with the same
 * part of the other whatever the length of its text.
 */
const ROWS = 10

/** The two services side by side as beige cards: fees first, then what each includes */
export default function FeePanels({ delay = 0 }: { delay?: number }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
      {fees.plans.map((plan, i) => (
        <FeePanel key={plan.id} plan={plan} delay={delay + i * 0.12} />
      ))}
    </div>
  )
}

/**
 * The groups a plan lists, each holding only the items the plan includes. A
 * plan that inherits another leaves out the items it shares with it: one
 * "Everything in …" line stands in for them.
 */
function groupsFor(plan: FeePlan): ComparisonGroup[] {
  const listed = (item: ComparisonItem) =>
    item.plans.includes(plan.id) &&
    !(plan.inherits && item.plans.includes(plan.inherits))
  return solution.groups
    .map((group) => ({ ...group, items: group.items.filter(listed) }))
    .filter((group) => group.items.length > 0)
}

function FeePanel({ plan, delay }: { plan: FeePlan; delay: number }) {
  const inherited = plan.inherits
    ? fees.plans.find((p) => p.id === plan.inherits)
    : undefined
  return (
    <m.article
      className={`panel flex flex-col p-7 md:p-9 lg:grid lg:grid-rows-subgrid ${
        plan.featured ? 'ring-2 ring-gold-500 ring-inset' : ''
      }`}
      style={{ gridRow: `span ${ROWS}` }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
    >
      {/* 1–2: what the service is */}
      <p className="eyebrow">{plan.kicker}</p>
      <h2 className="mt-2 font-display text-3xl text-brand-950 md:text-4xl">
        {plan.name}
      </h2>

      {/* 3: how many clients */}
      <p className="mt-5 flex items-center gap-3 self-start rounded-lg bg-gold-500/15 px-4 py-2.5 font-sans text-sm font-semibold text-brand-950">
        <span
          className="size-1.5 shrink-0 rotate-45 bg-gold-500"
          aria-hidden="true"
        />
        {plan.clients}
      </p>

      {/* 4–6: the headline fee */}
      <p className="mt-8 flex flex-wrap items-baseline gap-x-4">
        <span className="font-display text-6xl leading-none text-gold-600 lining-nums md:text-7xl">
          {plan.price}
        </span>
        <span className="font-sans text-lg font-semibold text-gold-600">
          {plan.tax}
        </span>
      </p>
      <p className="mt-4 text-lg text-brand-950">{plan.per}</p>
      <p className="mt-3 font-sans font-semibold text-gold-600">
        {plan.promise}
      </p>

      {/* 7–9: the management fee on top */}
      <div className="mt-7 border-t border-ink/10 pt-7">
        <p className="flex items-baseline gap-x-3">
          <span className="font-display text-3xl text-gold-600">+</span>
          <span className="font-display text-4xl leading-none text-gold-600 lining-nums">
            {plan.management.price}
          </span>
        </p>
        <p className="mt-2 text-brand-950">{plan.management.text}</p>
      </div>
      <p className="mt-5 leading-relaxed text-ink-muted">{plan.includes}</p>
      <p className="mt-3 leading-relaxed font-semibold text-brand-950">
        {plan.total}
      </p>

      {/* 10: what the plan includes, grouped by where it happens in the process */}
      <div className="mt-7 border-t border-ink/10 pt-7">
        <p className="eyebrow">{fees.includedLabel}</p>
        {inherited && (
          <p className="mt-5 flex items-start gap-3 font-sans font-bold text-brand-950">
            <Tick />
            <span>{fees.everythingIn(inherited.name)}</span>
          </p>
        )}
        {groupsFor(plan).map((group) => (
          <div key={group.label} className="mt-6">
            <p className="font-sans text-sm font-bold text-brand-950">
              {group.label}
            </p>
            <ul className="mt-3 space-y-3">
              {group.items.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-muted"
                >
                  <Tick />
                  <span>
                    {item.lead && (
                      <>
                        <strong className="font-bold text-brand-950">
                          {item.lead}
                        </strong>{' '}
                      </>
                    )}
                    {item.text}
                    {item.channels && (
                      <span
                        className="mt-1.5 flex flex-wrap gap-2.5 text-gold-600"
                        aria-hidden="true"
                      >
                        {item.channels.map((channel) => (
                          <ChannelIcon
                            key={channel}
                            channel={channel}
                            size={13}
                          />
                        ))}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </m.article>
  )
}

/** A gold check at the start of an included item */
function Tick() {
  return (
    <Check
      size={16}
      strokeWidth={2.5}
      className="mt-1.5 shrink-0 text-gold-600"
      aria-hidden="true"
    />
  )
}
