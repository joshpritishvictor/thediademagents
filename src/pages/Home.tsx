import Seo from '../components/Seo'
import Benefits from '../components/sections/Benefits'
import Disc from '../components/sections/Disc'
import Hero from '../components/sections/Hero'
import Problem from '../components/sections/Problem'
import { pricing } from '../content/advisors'
import { site } from '../content/site'

export default function Home() {
  return (
    <>
      <Seo
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
      <Hero />
      <Disc />
      <Problem />
      <Benefits />
    </>
  )
}
