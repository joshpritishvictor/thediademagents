import { Check } from 'lucide-react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import heroBg from '../assets/images/hero-boardroom.jpg'
import Counter from '../components/Counter'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import { who } from '../content/advisors'
import { easeOutExpo } from '../lib/motion'

const inView = { once: true, margin: '-80px' } as const

/** Who Thrives: the kind of advisor who gets the most from the service */
export default function WhoThrives() {
  return (
    <>
      <Seo title="Who Thrives" description={who.intro} />
      <Hero />
      <Traits />
    </>
  )
}

/** Light opening, like Services: the headline on the left, the Premium spots count on the right */
function Hero() {
  const { founding } = who.aside
  return (
    <section className="relative overflow-hidden bg-surface pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="relative container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <m.p
            className="eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {who.eyebrow}
          </m.p>
          <h1 className="mt-6 display-page text-brand-950">
            {who.heading.map((line, li) => (
              <span key={line} className="block">
                {line.split(' ').map((word, wi) => (
                  <Fragment key={wi}>
                    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <m.span
                        className={`inline-block ${li > 0 ? 'accent' : ''}`}
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 1,
                          delay: 0.15 + (li * 6 + wi) * 0.06,
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
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easeOutExpo }}
          >
            {who.intro}
          </m.p>
        </div>

        <m.div
          className="mx-auto w-full max-w-md lg:col-span-5 lg:mr-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: easeOutExpo }}
        >
          <SpotsCount
            spots={founding.spots}
            label={founding.spotsLabel}
            terms={founding.body}
          />
        </m.div>
      </div>
    </section>
  )
}

/**
 * The Premium spots offer: the count rises from 0, a gold rule draws in
 * beneath it and a soft shine sweeps through the digits on a loop; then the
 * terms, one sentence per line, tick in.
 */
function SpotsCount({
  spots,
  label,
  terms,
}: {
  spots: number
  label: readonly string[]
  terms: string
}) {
  const points = terms.split(/(?<=\.)\s+/)
  return (
    <div className="panel px-6 py-6 text-center sm:px-8 sm:py-7">
      {/* One line from small tablets up; it may wrap on the narrowest phones */}
      <p className="eyebrow leading-relaxed sm:whitespace-nowrap">{label.join(' ')}</p>

      <Counter
        value={spots}
        delay={0.7}
        duration={2.2}
        // The gradient only paints inside the box, so the box keeps a full line plus padding around the digits; the negative margins (in em, so they scale with the number) pull it back tight under the label
        className="-mt-[0.04em] -mb-[0.12em] block animate-gleam bg-[linear-gradient(110deg,var(--gold-600)_40%,var(--gold-300)_50%,var(--gold-600)_60%)] bg-[length:250%_100%] bg-clip-text py-[0.08em] font-numeral text-[6rem] leading-none font-semibold text-transparent lining-nums tabular-nums sm:text-[7.25rem]"
      />

      <m.span
        className="rule-gold mx-auto mt-3 w-16"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: easeOutExpo }}
        aria-hidden="true"
      />

      <ul className="mt-6 space-y-2.5 text-left">
        {points.map((point, i) => (
          <m.li
            key={point}
            className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.5 + i * 0.12, ease: easeOutExpo }}
          >
            <span
              className="mt-[0.2rem] grid size-4 shrink-0 place-items-center rounded-full bg-gold-500 text-brand-950"
              aria-hidden="true"
            >
              <Check size={10} strokeWidth={3.5} />
            </span>
            {point}
          </m.li>
        ))}
      </ul>
    </div>
  )
}

/** Seconds each trait stays open before the next one does */
const TRAIT_SECONDS = 6

/**
 * The five traits as expanding panels over one shared photo: the open panel
 * widens under a gold wash to show the trait in full, the rest narrow to
 * navy strips with the trait's label running up them. Panels open on hover,
 * focus or click, and step through on their own while on screen (a thin line
 * along the open panel's foot shows the timing). Phones get the plain list.
 */
function Traits() {
  const { traits } = who
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  // A mouse opens a panel once it rests on it, so sweeping across the strip
  // doesn't flick through every panel on the way; touch and keys open at once
  const openOnRest = (i: number, pointerType: string) => {
    clearTimeout(hoverTimer.current)
    if (pointerType !== 'mouse') return
    hoverTimer.current = setTimeout(() => setActive(i), 120)
  }
  useEffect(() => () => clearTimeout(hoverTimer.current), [])
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { margin: '-20% 0px' })
  const reduceMotion = useReducedMotion()
  const running = visible && !held && !reduceMotion

  useEffect(() => {
    if (!running) return
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % traits.length),
      TRAIT_SECONDS * 1000,
    )
    return () => clearTimeout(timer)
  }, [running, active, traits.length])

  return (
    <section className="border-t border-ink/10 bg-surface-alt py-16 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={who.profile.eyebrow}
          title={[who.profile.heading[0], who.profile.heading[1]]}
        />

        {/* Phones and tablets: every trait listed */}
        <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10 lg:hidden">
          {traits.map(({ icon: Icon, title, body }, i) => (
            <m.li
              key={title}
              className="flex gap-4 py-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: i * 0.05, ease: easeOutExpo }}
            >
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full border border-gold-500/50 text-gold-600"
                aria-hidden="true"
              >
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-display text-lg leading-snug text-brand-950">
                  {title}
                </h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-muted">
                  {body}
                </p>
              </div>
            </m.li>
          ))}
        </ul>

        {/* Desktop: the expanding panels */}
        <m.div
          ref={ref}
          className="@container relative mt-12 hidden h-[19rem] overflow-hidden 2xl:h-[16rem] rounded-xl shadow-[0_40px_80px_-50px_rgb(0_0_0/0.55)] lg:flex"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => {
            clearTimeout(hoverTimer.current)
            setHeld(false)
          }}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
          role="tablist"
          aria-label={who.profile.eyebrow}
        >
          {/* One photo behind every panel; each panel tints its own slice of it */}
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />

          {traits.map(({ icon: Icon, label, title, body }, i) => {
            const open = i === active
            return (
              <div
                key={title}
                role="tab"
                tabIndex={0}
                aria-selected={open}
                aria-label={title}
                onPointerEnter={(e) => openOnRest(i, e.pointerType)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  clearTimeout(hoverTimer.current)
                  setActive(i)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') setActive((i + 1) % traits.length)
                  if (e.key === 'ArrowLeft')
                    setActive((i - 1 + traits.length) % traits.length)
                }}
                className={`relative min-w-0 cursor-pointer overflow-hidden border-l border-on-dark/10 outline-offset-[-4px] transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-[flex-grow] first:border-l-0 ${
                  open ? 'grow-[5]' : 'grow'
                }`}
                style={{ flexBasis: 0 }}
              >
                {/* The tint: navy when closed, gold when open */}
                <span
                  className={`absolute inset-0 transition-colors duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    open ? 'bg-gold-500/92' : 'bg-brand-950/85 hover:bg-brand-950/75'
                  }`}
                  aria-hidden="true"
                />

                {/* Top row: the trait's icon, with its label beside it once open (closed strips centre the icon) */}
                <div
                  className={`relative flex items-center p-6 ${open ? 'justify-start' : 'justify-center'}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                        open
                          ? 'border-brand-950/25 text-brand-950'
                          : 'border-on-dark/25 text-gold-400'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon size={19} strokeWidth={1.6} />
                    </span>
                    {open && (
                      <m.span
                        className="rounded-full border border-brand-950/30 px-3 py-1 font-sans text-[0.62rem] font-bold tracking-[0.2em] whitespace-nowrap text-brand-950 uppercase"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.45, ease: easeOutExpo }}
                      >
                        {label}
                      </m.span>
                    )}
                  </div>
                </div>

                {/* Closed: the label running up the strip, centred in the space below the icon */}
                <span
                  className={`absolute top-[5.5rem] bottom-5 left-1/2 flex -translate-x-1/2 rotate-180 items-center font-sans text-[0.66rem] font-bold tracking-[0.24em] whitespace-nowrap text-on-dark/60 uppercase transition-opacity [writing-mode:vertical-rl] ${
                    open
                      ? 'opacity-0 duration-200'
                      : 'opacity-100 delay-500 duration-500'
                  }`}
                  aria-hidden="true"
                >
                  {label}
                </span>

                {/* Open: the trait in full, under the top row, sized to the open panel's final width (5 of the strip's 9 shares) so it fills it without reflowing as the panel grows */}
                <div
                  className={`absolute top-[5.5rem] left-0 w-[calc(100cqw*5/9)] pr-10 pb-6 pl-6 transition ease-out-expo ${
                    open
                      ? 'translate-y-0 opacity-100 delay-[450ms] duration-700'
                      : 'pointer-events-none translate-y-3 opacity-0 duration-200'
                  }`}
                  role="tabpanel"
                  aria-hidden={!open}
                >
                  <h3 className="font-display text-3xl leading-tight text-brand-950 xl:text-4xl">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-brand-950/80">
                    {body}
                  </p>
                </div>

                {/* The timing line along the open panel's foot */}
                {open && (
                  <m.span
                    key={`${active}-${running}`}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand-950/60"
                    initial={{ scaleX: running ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: running ? TRAIT_SECONDS : 0,
                      ease: 'linear',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}
