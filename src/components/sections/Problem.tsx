import { problem } from '../../content/advisors'
import Reveal, { RevealItem } from '../Reveal'
import SectionHeading from '../SectionHeading'

export default function Problem() {
  return (
    <section className="relative overflow-hidden bg-brand-950 section-y text-on-dark">
      <div className="glow-soft" aria-hidden="true" />

      <div className="relative container-page grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHeading
            index="02"
            eyebrow={problem.eyebrow}
            title={problem.heading}
            light
          />
          <Reveal className="mt-8 text-lg text-on-dark/70" delay={0.1}>
            <p>{problem.intro}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <figure className="relative mt-10">
              <span
                className="ghost-number -top-10 -left-4 text-[10rem] text-gold-500/15"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="relative font-display text-2xl leading-snug text-gold-300 italic md:text-[2rem]">
                {problem.quote.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-4">
                <span className="eyebrow text-gold-400">
                  {problem.quote.attribution}
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="mt-10 text-on-dark/70" delay={0.3}>
            <p>{problem.outro}</p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren={0.1}
          className="lg:col-span-6 lg:pl-8"
          delay={0.15}
        >
          <ol className="border-t border-on-dark/15">
            {problem.pains.map(({ icon: Icon, title, body }, i) => (
              <RevealItem key={title}>
                <li className="group grid grid-cols-[3rem_1fr_auto] items-start gap-5 border-b border-on-dark/15 py-7 transition-colors hover:bg-on-dark/[0.03]">
                  <span className="font-display text-xl text-gold-500 italic">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-on-dark md:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-dark/60">
                      {body}
                    </p>
                  </div>
                  <span className="mt-1 text-on-dark/30 transition-colors group-hover:text-gold-400">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                </li>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
