import { Handshake, Hourglass, Orbit, type LucideIcon } from 'lucide-react'
import { m, type TargetAndTransition, type Transition } from 'motion/react'
import Reveal, { RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import { team } from '../content/team'
import { site } from '../content/site'
import { easeOutExpo } from '../lib/motion'

/** About Us: the founders, a portrait and a short profile each, then the story behind the network */
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

      {/* The page opens on the story; the founders follow */}
      <Story />

      {/* Same beige as the story above, so the page reads as one */}
      <section className="relative overflow-hidden bg-surface py-12 md:py-14 lg:py-4">
        <div className="relative container-page">
          <SectionHeading
            eyebrow={team.eyebrow}
            title={[team.heading[0], team.heading[1]]}
            size="md"
          />

          {/*
            One wide profile per row: the portrait on the left, the name, role and story
            on the right. On phones the portrait sits above the text.
          */}
          <Reveal
            staggerChildren={0.15}
            delay={0.2}
            className="mt-6 grid gap-4 lg:gap-5"
          >
            {team.members.map((person) => (
              <RevealItem key={person.name} className="h-full">
                <article className="panel flex h-full flex-col overflow-hidden md:flex-row">
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-brand-950 sm:aspect-[2/1] md:aspect-auto md:min-h-[13rem] md:w-[28%] lg:min-h-0 lg:w-[22%]">
                    <img
                      src={person.photo}
                      alt={person.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:px-10 lg:py-5">
                    <p className="eyebrow">{person.role}</p>
                    {/* Letters after the name sit beside it, wrapping below on narrow screens */}
                    <h3 className="mt-3 lg:mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-3xl text-brand-950 md:text-4xl">
                      <span>{person.name}</span>
                      {person.credentials && (
                        <span className="font-sans text-sm font-semibold tracking-[0.04em] text-gold-600 md:text-base">
                          <span className="sr-only">, </span>
                          {person.credentials}
                        </span>
                      )}
                    </h3>
                    <p className="mt-4 leading-relaxed text-ink-muted lg:mt-3 lg:text-lg">
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

/**
 * Icons for the three story cards, in the same order as `team.story.points`, each with
 * its own smooth loop: the hourglass turns over, the handshake rocks, the orbit circles.
 * Reduced-motion users get the static icon (MotionConfig reducedMotion="user" in App).
 */
const storyIcons: { Icon: LucideIcon; loop: TargetAndTransition; transition: Transition }[] = [
  {
    // A slow, full turn-over; the hourglass is symmetric, so each loop restarts seamlessly
    Icon: Hourglass,
    loop: { rotate: [0, 180] },
    transition: { duration: 1.6, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' },
  },
  {
    // A clear, rocking handshake
    Icon: Handshake,
    loop: { y: [0, -5, 0], rotate: [0, -12, 0, 12, 0] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    // One centre with others circling it: independent, but never alone
    Icon: Orbit,
    loop: { rotate: 360 },
    transition: { duration: 6, repeat: Infinity, ease: 'linear' },
  },
]

/** Animated gold icon badge shown before each story card title */
function StoryIcon({ index }: { index: number }) {
  const icon = storyIcons[index]
  if (!icon) return null
  const { Icon, loop, transition } = icon
  return (
    <m.span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-600 ring-1 ring-gold-500/30"
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 + index * 0.1 }}
    >
      <m.span className="flex" animate={loop} transition={transition}>
        <Icon className="size-6" strokeWidth={1.75} />
      </m.span>
    </m.span>
  )
}

/**
 * "The Heart of The Diadem Family", opening the page: that name as the eyebrow, the
 * founding idea as the page title, then the three parts of the story as stacked
 * horizontal cards
 */
function Story() {
  const { story } = team
  return (
    // First on the page, so its top padding clears the fixed header
    <section className="relative overflow-hidden bg-surface pt-24 pb-12 md:pt-28 md:pb-14 lg:pt-[5.5rem] lg:pb-4">
      <div className="relative container-page">
        <m.p
          className="eyebrow"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {story.eyebrow}
        </m.p>
        {/* The founding idea as the page title: what you built, then (in gold) what we built */}
        <m.h1
          className="mt-5 display-page text-brand-950 lg:whitespace-nowrap"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
        >
          {story.heading[0]}{' '}
          <em className="accent">{story.heading[1]}</em>
        </m.h1>

        <Reveal
          staggerChildren={0.15}
          delay={0.2}
          className="mt-8 flex flex-col gap-4 lg:mt-6 lg:gap-3"
        >
          {story.points.map((point, i) => (
            <RevealItem key={point.title}>
              <article className="panel grid gap-4 p-6 md:grid-cols-12 md:gap-8 md:px-8 md:py-6 lg:py-4">
                <div className="flex items-center gap-4 md:col-span-4 md:items-start">
                  <StoryIcon index={i} />
                  <h3 className="font-display text-2xl text-brand-950 md:pt-2">
                    {point.title}
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <p className="leading-relaxed text-ink-muted">{point.body}</p>
                  {point.quote && (
                    <p className="mt-2 font-display text-xl leading-snug text-gold-600 italic">
                      {point.quote}
                    </p>
                  )}
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
