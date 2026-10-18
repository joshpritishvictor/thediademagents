import { benefits } from '../../content/advisors'
import Reveal, { RevealItem } from '../Reveal'
import SectionHeading from '../SectionHeading'

/** The four drains on an advisor's week that the platform removes. Sized to fit one screen on desktop. */
export default function Benefits() {
  return (
    <section
      id="benefits"
      className="flex flex-col bg-surface lg:min-h-[calc(100svh-var(--snap-top))]"
    >
      <div className="container-page py-16 lg:my-auto lg:py-12">
        <SectionHeading
          eyebrow={benefits.eyebrow}
          title={[benefits.heading[0], benefits.heading[1]]}
        />

        {/* One row of four on desktop, divided by hairlines rather than boxed in */}
        <Reveal
          staggerChildren={0.08}
          className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
          delay={0.1}
        >
          {benefits.items.map(({ title, body }) => (
            <RevealItem key={title} className="h-full">
              <article className="group flex h-full flex-col bg-card p-7 transition-colors hover:bg-surface-alt lg:p-8">
                {/* Hairline with a diamond at its centre; stretches across the card on hover */}
                <span
                  className="flex w-16 items-center gap-2 transition-[width] duration-500 ease-out-expo group-hover:w-full"
                  aria-hidden="true"
                >
                  <span className="h-px flex-1 bg-gold-500/60" />
                  <span className="size-1.5 shrink-0 rotate-45 bg-gold-500" />
                  <span className="h-px flex-1 bg-gold-500/60" />
                </span>
                <h3 className="mt-6 font-display text-xl leading-snug text-brand-950 md:text-[1.35rem]">
                  {title}
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
  )
}
