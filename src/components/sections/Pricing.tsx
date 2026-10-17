import { ArrowRight, Check, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pricing, type Plan } from '../../content/advisors'
import { applyLink } from '../../content/site'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

/** Every feature either plan lists, in the order first mentioned */
const allFeatures = Array.from(
  new Set(pricing.plans.flatMap((plan) => plan.features)),
)

const flexFeatures = pricing.plans.find((p) => p.id === 'flex')?.features ?? []

const has = (plan: Plan, feature: string) =>
  plan.features.includes(feature) ||
  // "Everything in Flex" means Premium inherits the Flex list
  (plan.id === 'premium' && flexFeatures.includes(feature))

export default function Pricing() {
  return (
    <section id="services" className="bg-surface section-y">
      <div className="container-page">
        <SectionHeading
          index="06"
          eyebrow={pricing.eyebrow}
          title={[pricing.heading[0], pricing.heading[1]]}
          description={pricing.body}
        />

        {/* Comparison table, from md up */}
        <Reveal className="mt-14 hidden md:block" delay={0.1}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="align-bottom">
                <th scope="col" className="w-[40%] pb-6 text-left">
                  <span className="eyebrow">Compare services</span>
                </th>
                {pricing.plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={`w-[30%] p-7 text-left align-bottom ${
                      plan.featured
                        ? 'panel-dark rounded-b-none text-on-dark'
                        : 'rounded-t-xl border border-b-0 border-ink/15 bg-card'
                    }`}
                  >
                    <PlanHeader plan={plan} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, i) => (
                <tr key={feature} className="border-t border-ink/15">
                  <th
                    scope="row"
                    className="py-4 pr-6 text-left font-sans text-[0.95rem] font-medium text-brand-950"
                  >
                    <span className="mr-4 font-display text-sm text-gold-600 italic">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {feature}
                  </th>
                  {pricing.plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`px-7 py-4 ${plan.featured ? 'border-x border-gold-500/30 bg-brand-950/[0.04]' : 'border-x border-ink/15'}`}
                    >
                      {has(plan, feature) ? (
                        <span className="grid size-6 place-items-center bg-gold-500 text-brand-950">
                          <Check
                            size={14}
                            strokeWidth={3}
                            aria-label="Included"
                          />
                        </span>
                      ) : (
                        <Minus
                          size={16}
                          className="text-ink/30"
                          aria-label="Not included"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-ink/15">
                <td className="py-6 pr-6 font-sans text-xs text-ink/55">
                  {pricing.plans[0].footnote}
                </td>
                {pricing.plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-7 py-6 ${plan.featured ? 'border-x border-b border-gold-500/30 bg-brand-950/[0.04]' : 'border-x border-b border-ink/15'}`}
                  >
                    <PlanCta plan={plan} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>

        {/* Stacked panels on small screens */}
        <div className="mt-12 grid gap-6 md:hidden">
          {pricing.plans.map((plan) => (
            <Reveal key={plan.id}>
              <article
                className={`p-7 ${plan.featured ? 'panel-dark text-on-dark' : 'panel'}`}
              >
                <PlanHeader plan={plan} />
                <ul className="mt-6 space-y-3 border-t border-current/15 pt-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-gold-500 text-brand-950">
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span
                        className={
                          plan.featured ? 'text-on-dark/80' : 'text-ink-muted'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {plan.footnote && (
                  <p className="mt-5 text-xs text-ink/55">{plan.footnote}</p>
                )}
                <div className="mt-7">
                  <PlanCta plan={plan} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-4xl border-t border-ink/15 pt-6 font-sans text-xs leading-relaxed text-ink/50">
            {pricing.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function PlanHeader({ plan }: { plan: Plan }) {
  const dark = plan.featured
  return (
    <div>
      {plan.badge && (
        <span className="mb-4 inline-block bg-gold-500 px-2.5 py-1 font-sans text-[0.6rem] font-bold tracking-[0.2em] text-brand-950 uppercase">
          {plan.badge}
        </span>
      )}
      <p className={`eyebrow ${dark ? 'text-gold-400' : ''}`}>{plan.label}</p>
      <h3
        className={`font-display text-3xl ${dark ? 'text-on-dark' : 'text-brand-950'}`}
      >
        {plan.name}
      </h3>
      <p
        className={`mt-1 font-display text-sm italic ${dark ? 'text-on-dark/60' : 'text-ink/55'}`}
      >
        {plan.tagline}
      </p>
      <p
        className={`mt-6 font-display text-5xl ${dark ? 'text-gold-400' : 'text-brand-950'}`}
      >
        {plan.price}
      </p>
      <p
        className={`mt-1 font-sans text-xs ${dark ? 'text-on-dark/60' : 'text-ink/55'}`}
      >
        {plan.period}
      </p>
      <p
        className={`mt-2 font-sans text-xs font-semibold ${dark ? 'text-gold-300' : 'text-gold-600'}`}
      >
        {plan.note}
      </p>
    </div>
  )
}

function PlanCta({ plan }: { plan: Plan }) {
  return (
    <Link
      to={`${applyLink.to}?plan=${plan.id}`}
      className={`w-full ${plan.featured ? 'btn-gold' : 'btn-navy'}`}
    >
      <span>{plan.cta}</span>
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  )
}
