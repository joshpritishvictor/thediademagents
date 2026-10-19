import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pricing } from '../../content/advisors'
import Reveal, { RevealItem } from '../Reveal'
import SectionHeading from '../SectionHeading'

/** How many features each service card lists on the home page before pointing to the full comparison */
const PREVIEW_FEATURES = 3

/** The two services at a glance; the full comparison lives on the Services page */
export default function ServicesTeaser() {
  return (
    <section
      id="services"
      className="flex flex-col bg-surface lg:min-h-[calc(100svh-var(--snap-top))]"
    >
      <div className="container-page py-16 lg:my-auto lg:py-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={pricing.eyebrow}
              title={[pricing.heading[0], pricing.heading[1]]}
              description={pricing.body}
            />
            <Reveal delay={0.15}>
              <Link to="/services/" className="btn-navy mt-8">
                <span>Compare both services</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal
            staggerChildren={0.1}
            delay={0.1}
            className="grid gap-5 sm:grid-cols-2 lg:col-span-8"
          >
            {pricing.plans.map((plan) => (
              <RevealItem key={plan.id} className="h-full">
                <article
                  className={`flex h-full flex-col p-7 ${plan.featured ? 'panel-dark text-on-dark' : 'panel'}`}
                >
                  {plan.badge && (
                    <span className="mb-4 inline-block self-start bg-gold-500 px-2.5 py-1 font-sans text-[0.6rem] font-bold tracking-[0.2em] text-brand-950 uppercase">
                      {plan.badge}
                    </span>
                  )}
                  <p
                    className={`eyebrow ${plan.featured ? 'text-gold-400' : ''}`}
                  >
                    {plan.label}
                  </p>
                  <h3
                    className={`font-display text-3xl ${plan.featured ? 'text-on-dark' : 'text-brand-950'}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-1 font-display text-sm italic ${plan.featured ? 'text-on-dark/60' : 'text-ink/55'}`}
                  >
                    {plan.tagline}
                  </p>
                  <p
                    className={`mt-5 font-display text-4xl ${plan.featured ? 'text-gold-400' : 'text-brand-950'}`}
                  >
                    {plan.price}
                  </p>
                  <p
                    className={`mt-1 font-sans text-xs ${plan.featured ? 'text-on-dark/60' : 'text-ink/55'}`}
                  >
                    {plan.period}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-current/15 pt-5">
                    {plan.features.slice(0, PREVIEW_FEATURES).map((feature) => (
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
                  <Link
                    to="/services/"
                    className={`mt-auto inline-flex items-center gap-2 pt-6 font-sans text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors ${
                      plan.featured
                        ? 'text-gold-400 hover:text-gold-300'
                        : 'text-brand-950 hover:text-gold-600'
                    }`}
                  >
                    Everything in {plan.name}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
