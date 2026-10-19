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

      <section className="relative overflow-hidden bg-brand-950 pt-32 pb-20 text-on-dark md:pt-40 md:pb-28">
        <div className="glow-soft" aria-hidden="true" />
        <div className="relative container-page">
          <m.p
            className="eyebrow text-gold-400"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {pricing.eyebrow}
          </m.p>
          <m.h1
            className="mt-6 max-w-4xl display-xl text-on-dark"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
          >
            {pricing.heading[0]}{' '}
            <em className="accent">{pricing.heading[1]}</em>
          </m.h1>
          <m.p
            className="mt-6 max-w-2xl text-lg text-on-dark/70 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
          >
            {pricing.body}
          </m.p>

          <div className="mt-14 lg:mt-16">
            <FeePanels delay={0.45} />
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-16">
        <Reveal className="container-page">
          <p className="mx-auto max-w-4xl font-sans text-xs leading-relaxed text-ink/50">
            {pricing.disclaimer}
          </p>
        </Reveal>
      </section>

      <FinalCta />
    </>
  )
}
