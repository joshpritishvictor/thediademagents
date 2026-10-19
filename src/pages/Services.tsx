import { m } from 'motion/react'
import FeePanels from '../components/FeePanels'
import Reveal from '../components/Reveal'
import FinalCta from '../components/sections/FinalCta'
import Seo from '../components/Seo'
import { pricing } from '../content/advisors'
import { site } from '../content/site'
import { easeOutExpo } from '../lib/motion'

/** The two services and what each costs, fee by fee */
export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description={pricing.body}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${site.shortName} advisor client acquisition and coordination`,
          serviceType:
            'Client acquisition and meeting coordination for insurance advisors',
          areaServed: 'Alberta, Canada',
          provider: {
            '@type': 'Organization',
            name: site.name,
            legalName: site.legalName,
            url: site.mainSiteUrl,
            email: site.contact.email,
            telephone: site.contact.phone,
          },
          offers: pricing.plans.map((plan) => ({
            '@type': 'Offer',
            name: `${plan.label} ${plan.name}`,
            description: plan.tagline,
            priceCurrency: 'CAD',
            price: plan.price.replace(/[^0-9.]/g, ''),
          })),
        }}
      />

      {/* The page opens with this section, like Our Process, so its top padding clears the fixed header */}
      <section className="bg-surface pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="container-page">
          <m.p
            className="eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {pricing.eyebrow}
          </m.p>
          <m.h1
            className="mt-6 font-display text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.05] font-medium text-brand-950 lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
          >
            {pricing.heading[0]}{' '}
            <em className="accent">{pricing.heading[1]}</em>
          </m.h1>
          <m.p
            className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
          >
            {pricing.body}
          </m.p>

          <div className="mt-14 lg:mt-16">
            <FeePanels delay={0.45} />
          </div>

          <Reveal>
            <p className="mx-auto mt-12 max-w-4xl border-t border-ink/10 pt-6 font-sans text-xs leading-relaxed text-ink/50">
              {pricing.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
