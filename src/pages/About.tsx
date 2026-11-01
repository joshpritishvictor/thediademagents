import { Check } from 'lucide-react'
import { m } from 'motion/react'
import { Link } from 'react-router-dom'
import Reveal, { RevealItem } from '../components/Reveal'
import Seo from '../components/Seo'
import { about } from '../content/about'
import { site } from '../content/site'
import { easeOutExpo } from '../lib/motion'

export default function About() {
  const { table, promise } = about
  return (
    <>
      <Seo
        title="The Table"
        description={`${about.body} No commission splitting, ever.`}
      />

      {/* The page opens on who sits at the table, so its top padding clears the fixed header */}
      <section className="relative overflow-hidden bg-surface pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="container-page">
          <div>
            <m.p
              className="eyebrow"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {table.eyebrow}
            </m.p>
            <m.h1
              className="mt-6 display-page text-brand-950"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
            >
              {table.heading[0]}{' '}
              <em className="accent">{table.heading[1]}</em>
            </m.h1>
            <m.p
              className="mt-6 text-lg text-ink-muted md:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
            >
              {table.intro}
            </m.p>
          </div>

          <Reveal
            staggerChildren={0.1}
            className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {table.seats.map(({ name, icon: Icon, body }) => (
              <RevealItem key={name} className="h-full">
                <article className="group panel flex h-full flex-col p-7 transition-colors hover:border-gold-500/60">
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[33%] border-2 border-gold-500 bg-brand-950 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-brand-950">
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-2xl text-brand-950">
                      {name}
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    {body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* The promise to advisors: no commission splitting. One dark panel: the figure beside what it means, the three points in a row beneath */}
      <section className="border-t border-ink/10 bg-surface-alt py-16 md:py-20">
        <Reveal className="container-page">
          <div className="panel-dark mx-auto max-w-5xl overflow-hidden p-8 text-on-dark md:p-10 lg:p-12">
            <div className="glow-soft" aria-hidden="true" />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
              {/* The headline figure */}
              <div className="lg:col-span-4 lg:border-r lg:border-gold-500/25 lg:pr-8">
                <p className="eyebrow text-gold-400">{promise.eyebrow}</p>
                <p className="mt-5 font-display text-[6rem] leading-none text-gold-500 lining-nums md:text-[7.5rem]">
                  {promise.note.value}
                </p>
                <p className="mt-2 font-sans text-[0.72rem] font-bold tracking-[0.3em] text-on-dark/60 uppercase">
                  {promise.note.label}
                </p>
              </div>

              {/* What the figure means */}
              <div className="lg:col-span-8">
                <h2 className="display-lg text-on-dark">
                  {promise.heading[0]}{' '}
                  <em className="accent">{promise.heading[1]}</em>
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-dark/70">
                  {promise.body}
                </p>
                <Link to="/services/" className="btn-gold mt-8">
                  <span>See {site.shortName} pricing</span>
                </Link>
              </div>
            </div>

            {/* The three points, in a row (two on mid-size screens); shown with the panel, not on a reveal of their own */}
            <ul className="relative mt-10 grid gap-4 border-t border-on-dark/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {promise.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-lg border border-gold-500/25 bg-white/5 px-4 py-3.5"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-gold-500 text-brand-950">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-snug text-on-dark/85">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  )
}
