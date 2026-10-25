import { ArrowRight, ChevronDown } from 'lucide-react'
import { m } from 'motion/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { hero } from '../../content/advisors'
import { applyLink, cta } from '../../content/site'
import { easeOutExpo } from '../../lib/motion'
import heroBg from '../../assets/images/hero-boardroom.jpg'

export default function Hero() {
  return (
    <section className="hero relative flex flex-col overflow-hidden bg-brand-950 text-on-dark lg:min-h-svh">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      {/* Navy wash so the copy on the left stays legible over the photo */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-brand-950/85 via-brand-950/45 to-brand-950/10"
        aria-hidden="true"
      />
      <div className="glow-soft" aria-hidden="true" />

      {/* The copy on the left, the block vertically centred in the hero */}
      <div className="hero-stage relative container-page grid items-center gap-10 pt-28 pb-14 md:pt-36 lg:flex-1 lg:grid-cols-12 lg:content-center lg:gap-12 lg:pt-28 lg:pb-24">
        <div className="@container lg:col-span-7">
          <m.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow text-gold-400">{hero.eyebrow}</p>
          </m.div>

          <h1 className="hero-title mt-6 display-xl text-on-dark lg:mt-7">
            {hero.headline.map((line, li) => (
              <span key={line} className="block sm:whitespace-nowrap">
                {line.split(' ').map((word, wi) => (
                  <Fragment key={wi}>
                    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <m.span
                        className={`inline-block ${li > 0 ? 'accent' : ''}`}
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + (li * 4 + wi) * 0.07,
                          ease: easeOutExpo,
                        }}
                      >
                        {word}
                      </m.span>
                    </span>{' '}
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>

          <m.p
            className="hero-body mt-6 max-w-xl text-lg leading-relaxed text-on-dark/70 lg:mt-7 xl:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: easeOutExpo }}
          >
            {hero.body}
          </m.p>

          <m.div
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 lg:mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: easeOutExpo }}
          >
            <Link to={applyLink.to} className="btn-gold">
              <span>{cta.apply}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </m.div>
        </div>

        {/* Scroll cue: desktop only, where the hero fills the screen */}
        <m.a
          href="#disc"
          aria-label="Scroll to the next section"
          className="scroll-cue absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-sans text-[0.6rem] font-bold tracking-[0.3em] text-on-dark/50 uppercase transition-colors hover:text-gold-400 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          Scroll
          <ChevronDown
            size={20}
            strokeWidth={2.25}
            className="animate-nudge"
            aria-hidden="true"
          />
        </m.a>
      </div>
    </section>
  )
}
