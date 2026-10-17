import { ArrowDown, ArrowRight } from 'lucide-react'
import { m } from 'motion/react'
import { Link } from 'react-router-dom'
import { hero } from '../../content/advisors'
import bundledMark from '../../assets/images/logo-mark.svg'
import { applyLink, cta, site } from '../../content/site'
import { easeOutExpo } from '../../lib/motion'
import Counter from '../Counter'
import LottieScene from '../LottieScene'

const professions = [
  'Insurance Advisor',
  'Chartered Professional Accountant',
  'Independent Lawyer',
  'Corporate Insurance Specialist',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-on-dark">
      <div className="glow-soft" aria-hidden="true" />

      <div className="relative container-page grid items-center gap-14 pt-32 pb-16 md:pt-40 lg:min-h-svh lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <m.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="rule-gold" aria-hidden="true" />
            <p className="eyebrow text-gold-400">{hero.eyebrow}</p>
          </m.div>

          <h1 className="mt-8 display-xl text-on-dark">
            {hero.headline.map((line, li) => (
              <span key={line} className="block">
                {line.split(' ').map((word, wi) => (
                  <span
                    key={wi}
                    className="inline-block overflow-hidden pb-[0.12em] align-bottom"
                  >
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
                    {' '}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <m.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-on-dark/70 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: easeOutExpo }}
          >
            {hero.body}
          </m.p>

          <m.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: easeOutExpo }}
          >
            <Link to={applyLink.to} className="btn-gold">
              <span>{cta.apply}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/#how-it-works" className="btn-outline text-on-dark">
              <span>{cta.howItWorks}</span>
            </Link>
          </m.div>
        </div>

        <m.div
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: easeOutExpo }}
        >
          <div className="relative p-4">
            <div className="halo" aria-hidden="true" />
            <LottieScene
              src="/animations/one-table.json"
              label={`Four professions taking their seats around one table, with the ${site.shortName} mark at its centre`}
              className="relative aspect-square w-full"
              poster={<TablePoster />}
            />
            {/* The brand mark at the centre of the table, landing as the seats settle (the animation leaves the centre clear) */}
            <m.img
              src={site.logo.mark || bundledMark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[26%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_6px_18px_rgb(0_0_0/0.45)]"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.9, ease: easeOutExpo }}
            />
            <p className="relative mt-2 text-center font-sans text-[0.65rem] font-bold tracking-[0.3em] text-on-dark/45 uppercase">
              Four professions · One table
            </p>
          </div>
        </m.div>

        {/* Scroll cue: desktop only, where the hero fills the screen */}
        <m.a
          href="#disc"
          aria-label="Scroll to the next section"
          className="absolute bottom-8 left-12 hidden items-center gap-3 font-sans text-[0.65rem] font-bold tracking-[0.3em] text-on-dark/50 uppercase transition-colors hover:text-gold-400 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <ArrowDown size={14} className="animate-nudge" aria-hidden="true" />
          Scroll
        </m.a>
      </div>

      {/* Key figures */}
      <m.dl
        className="relative container-page grid grid-cols-2 border-t border-on-dark/10 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        {hero.stats.map(({ value, prefix, label }, i) => (
          <div
            key={label}
            className={`py-8 pr-6 ${i % 2 === 1 ? 'border-l border-on-dark/10 pl-6' : ''} ${i >= 2 ? 'border-t border-on-dark/10 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
          >
            <dd className="font-display text-5xl text-gold-400 md:text-6xl">
              <Counter value={value} prefix={prefix} />
            </dd>
            <dt className="mt-2 font-sans text-[0.68rem] font-bold tracking-[0.22em] text-on-dark/50 uppercase">
              {label}
            </dt>
          </div>
        ))}
      </m.dl>

      {/* Professions ticker */}
      <div
        className="relative overflow-hidden border-y border-gold-500/25 bg-brand-900/60 py-4"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee gap-12 font-display text-sm tracking-[0.2em] whitespace-nowrap text-gold-400/80 uppercase">
          {[...professions, ...professions, ...professions, ...professions].map(
            (p, i) => (
              <span key={i} className="flex items-center gap-12">
                {p}
                <span className="size-1.5 rotate-45 bg-gold-500/70" />
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

/** Still version of the "one table" animation, shown until the player loads. Colours come from the palette classes. */
function TablePoster() {
  const seats = [-90, 0, 90, 180]
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <circle
        cx="200"
        cy="200"
        r="186"
        className="fill-none stroke-gold-500/20"
      />
      <circle
        cx="200"
        cy="200"
        r="140"
        strokeWidth="2"
        strokeDasharray="6 9"
        className="fill-none stroke-gold-300/70"
      />
      <circle
        cx="200"
        cy="200"
        r="95"
        strokeWidth="3"
        className="fill-brand-800 stroke-gold-500"
      />
      <circle
        cx="200"
        cy="200"
        r="75"
        className="fill-none stroke-gold-500/35"
      />
      {seats.map((deg) => (
        <g
          key={deg}
          transform={`rotate(${deg} 200 200) translate(340 200) rotate(90)`}
        >
          <rect
            x="-23"
            y="-23"
            width="46"
            height="46"
            rx="15"
            strokeWidth="2"
            className="fill-brand-800 stroke-gold-500"
          />
          <rect
            x="-12"
            y="0"
            width="24"
            height="14"
            rx="7"
            className="fill-on-dark"
          />
          <circle cx="0" cy="-7" r="7.5" className="fill-on-dark" />
        </g>
      ))}
    </svg>
  )
}
