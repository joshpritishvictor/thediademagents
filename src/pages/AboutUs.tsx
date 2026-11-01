import { m } from 'motion/react'
import Reveal, { RevealItem } from '../components/Reveal'
import Seo from '../components/Seo'
import { team } from '../content/team'
import { site } from '../content/site'
import { easeOutExpo } from '../lib/motion'

/** About Us: the founders, a portrait and a short profile each */
export default function AboutUs() {
  return (
    <>
      <Seo
        title="About Us"
        description={`Meet the founders of ${site.shortName}: ${team.members.map((p) => `${p.name}, ${p.role}`).join('; ')}.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          legalName: site.legalName,
          url: site.mainSiteUrl,
          founder: team.members.map((p) => ({
            '@type': 'Person',
            name: p.name,
            jobTitle: p.role,
          })),
        }}
      />

      {/* The page opens on a light section, so its top padding clears the fixed header */}
      <section className="relative overflow-hidden bg-surface pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="relative container-page">
          <m.p
            className="eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {team.eyebrow}
          </m.p>
          <m.h1
            className="mt-6 display-page text-brand-950"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
          >
            {team.heading[0]}{' '}
            <em className="accent">{team.heading[1]}</em>
          </m.h1>

          {/* One profile per card: the portrait above, the name, role and story beneath */}
          <Reveal
            staggerChildren={0.15}
            delay={0.2}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8"
          >
            {team.members.map((person) => (
              <RevealItem key={person.name} className="h-full">
                <article className="panel flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-950 sm:aspect-[5/4]">
                    <img
                      src={person.photo}
                      alt={person.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <p className="eyebrow">{person.role}</p>
                    <h2 className="mt-3 font-display text-3xl text-brand-950 md:text-4xl">
                      {person.name}
                    </h2>
                    {person.credentials && (
                      <p className="mt-1.5 font-sans text-sm font-semibold tracking-[0.04em] text-gold-600">
                        {person.credentials}
                      </p>
                    )}
                    <p className="mt-5 leading-relaxed text-ink-muted">
                      {person.bio}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
