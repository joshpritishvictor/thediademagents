import { ArrowRight, Check } from 'lucide-react'
import { m } from 'motion/react'
import { Link } from 'react-router-dom'
import OrbitMark from '../components/OrbitMark'
import Reveal, { RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import FinalCta from '../components/sections/FinalCta'
import Seo from '../components/Seo'
import { about } from '../content/about'
import { applyLink, cta, site } from '../content/site'
import { easeOutExpo } from '../lib/motion'

export default function About() {
  const { table, promise } = about
  return (
    <>
      <Seo
        title="About Us"
        description={`${about.body} No commission splitting, ever.`}
      />

      <section className="relative overflow-hidden bg-brand-950 pt-36 pb-20 text-on-dark md:pt-44 md:pb-28">
        <div className="glow-soft" aria-hidden="true" />
        <div className="relative container-page grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <m.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow text-gold-400">{about.eyebrow}</p>
            </m.div>
            <m.h1
              className="mt-8 display-xl text-on-dark"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
            >
              {about.heading[0]}
              <br />
              <em className="accent">{about.heading[1]}</em>
            </m.h1>
            <m.p
              className="mt-8 max-w-xl text-lg text-on-dark/70 md:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
            >
              {about.body}
            </m.p>
          </div>

          <m.div
            className="mx-auto w-full max-w-xs lg:col-span-5 lg:max-w-sm lg:justify-self-end"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: easeOutExpo }}
          >
            <OrbitMark className="w-full" logoDelay={1.1} />
          </m.div>
        </div>
      </section>

      {/* The four seats */}
      <section className="bg-surface section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow={table.eyebrow}
            title={[table.heading[0], table.heading[1]]}
            description={table.intro}
          />

          <Reveal
            staggerChildren={0.1}
            className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {table.seats.map(({ name, icon: Icon, body }, i) => (
              <RevealItem key={name} className="h-full">
                <article className="group panel flex h-full flex-col p-7 transition-colors hover:border-gold-500/60">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-[33%] border-2 border-gold-500 bg-brand-950 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-brand-950">
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-display text-sm text-gold-600 italic">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-brand-950">
                    {name}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    {body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* The promise: no commission splitting */}
      <section className="bg-surface-alt section-y">
        <Reveal className="container-page">
          <div className="panel-dark grid gap-10 p-8 text-on-dark md:p-12 lg:grid-cols-12 lg:gap-14 lg:p-16">
            <div className="lg:col-span-5">
              <p className="eyebrow text-gold-400">{promise.eyebrow}</p>
              <p className="mt-8 font-display text-[6rem] leading-none text-gold-400 md:text-[8rem]">
                {promise.note.value}
              </p>
              <p className="mt-3 font-sans text-[0.72rem] font-bold tracking-[0.3em] text-on-dark/60 uppercase">
                {promise.note.label}
              </p>
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-gold-500/20 lg:pl-14">
              <h2 className="display-md text-on-dark">
                {promise.heading[0]}
                <br />
                <em className="accent">{promise.heading[1]}</em>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark/70">
                {promise.body}
              </p>
              <ul className="mt-8 grid gap-3">
                {promise.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-gold-500 text-brand-950">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-on-dark/80">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to={applyLink.to} className="btn-gold">
                  <span>{cta.apply}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/services/" className="btn-outline text-on-dark">
                  <span>See {site.shortName} pricing</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <FinalCta />
    </>
  )
}
