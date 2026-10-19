import { m } from 'motion/react'
import { fees, type FeePlan } from '../content/advisors'
import { easeOutExpo } from '../lib/motion'

/** The two services' fees side by side on a dark background, each panel laid out fee by fee */
export default function FeePanels({ delay = 0 }: { delay?: number }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {fees.plans.map((plan, i) => (
        <m.div
          key={plan.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.12,
            ease: easeOutExpo,
          }}
        >
          <FeePanel plan={plan} />
        </m.div>
      ))}
    </div>
  )
}

function FeePanel({ plan }: { plan: FeePlan }) {
  const gold = plan.featured
  return (
    <article
      className={`flex h-full flex-col rounded-xl border p-7 md:p-9 ${
        gold
          ? 'border-gold-500/40 bg-brand-800/60'
          : 'border-on-dark/15 bg-brand-900/70'
      }`}
    >
      <p className="eyebrow text-gold-400">{plan.kicker}</p>
      <h3
        className={`mt-2 font-display text-3xl md:text-4xl ${gold ? 'text-gold-400' : 'text-on-dark'}`}
      >
        {plan.name}
      </h3>

      {/* The headline fee */}
      <p className="mt-8 flex flex-wrap items-baseline gap-x-4">
        <span className="font-display text-6xl leading-none text-gold-400 md:text-7xl">
          {plan.price}
        </span>
        <span className="font-sans text-lg font-semibold text-gold-400/90">
          {plan.tax}
        </span>
      </p>
      <p className="mt-4 text-lg text-on-dark">{plan.per}</p>
      <p className="mt-4 font-sans font-semibold text-gold-300">
        {plan.promise}
      </p>

      {/* The management fee on top */}
      <div className="mt-7 border-t border-on-dark/15 pt-7">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-3xl text-gold-400">+</span>
          <span className="font-display text-4xl leading-none text-gold-400">
            {plan.management.price}
          </span>
          <span className="text-on-dark">{plan.management.text}</span>
        </p>
        <p className="mt-5 leading-relaxed text-on-dark/70">{plan.includes}</p>
        {plan.total && (
          <p className="mt-5 leading-relaxed text-on-dark/70">{plan.total}</p>
        )}
      </div>
    </article>
  )
}
