import { ArrowRight, ChevronDown } from 'lucide-react'
import { m } from 'motion/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { hero } from '../../content/advisors'
import { applyLink, cta } from '../../content/site'
import { easeOutExpo } from '../../lib/motion'
import OrbitMark from '../OrbitMark'

export default function Hero() {
  return (
    <section className="hero relative flex flex-col overflow-hidden bg-brand-950 text-on-dark lg:min-h-svh">
      <div className="glow-soft" aria-hidden="true" />

      {/*
       * The copy on the left and the orbit on the right, vertically centred on
       * each other and the block centred in the hero. On desktop the orbit
       * ring is as wide as the header's Apply button and ends on the same
       * right edge.
       */}
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

        <m.div
          // The ring fills 84% of its frame (8% inset each side): the frame is sized so the ring matches --apply-w (the header's Apply button, 13.25rem until measured), and shifted right by the inset so the ring, not the frame, meets the right edge
          className="hero-orbit mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:col-span-5 lg:mx-0 lg:w-[calc(var(--apply-w,13.25rem)/0.84)] lg:max-w-none lg:translate-x-[8%] lg:justify-self-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: easeOutExpo }}
        >
          <OrbitMark className="w-full" />
        </m.div>

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
