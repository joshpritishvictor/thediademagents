import { testimonials } from '../../content/advisors'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

export default function Testimonials() {
  return (
    <section className="border-t border-ink/10 bg-surface section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={[testimonials.heading[0], testimonials.heading[1]]}
          align="center"
        />
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-2xl border-y border-gold-500/40 py-12 text-center">
            <span
              className="ghost-number -top-8 left-1/2 -translate-x-1/2 text-[8rem] text-gold-500/20"
              aria-hidden="true"
            >
              “
            </span>
            <p className="relative font-display text-lg leading-relaxed text-ink-muted italic md:text-xl">
              {testimonials.placeholder}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
