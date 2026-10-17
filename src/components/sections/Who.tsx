import { who } from '../../content/advisors'
import Counter from '../Counter'
import Reveal, { RevealItem } from '../Reveal'
import SectionHeading from '../SectionHeading'

export default function Who() {
  const { aside } = who
  return (
    <section id="who" className="bg-surface-alt section-y">
      <div className="container-page">
        <SectionHeading
          index="07"
          eyebrow={who.eyebrow}
          title={[who.heading[0], who.heading[1]]}
          description={who.intro}
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal staggerChildren={0.08} className="lg:col-span-7">
            <ul className="border-t border-brand-950/20">
              {who.traits.map(({ icon: Icon, title, body }) => (
                <RevealItem key={title}>
                  <li className="group grid grid-cols-[2.75rem_1fr] gap-5 border-b border-brand-950/20 py-7 transition-colors hover:border-gold-500">
                    <span className="grid size-10 place-items-center border border-brand-950/30 text-brand-950 transition-colors group-hover:border-gold-500 group-hover:bg-gold-500">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-brand-950 md:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                        {body}
                      </p>
                    </div>
                  </li>
                </RevealItem>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <aside className="panel-dark sticky top-28 p-8 text-on-dark md:p-10">
              <h3 className="display-md text-on-dark">
                {aside.heading[0]}
                <br />
                <em className="accent">{aside.heading[1]}</em>
              </h3>
              <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-on-dark/70">
                {aside.paragraphs.map((p, i) => (
                  <p
                    key={p.slice(0, 24)}
                    className={
                      i === aside.paragraphs.length - 1
                        ? 'font-display text-lg text-on-dark italic'
                        : ''
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 border-t border-gold-500/30 pt-7">
                <p className="eyebrow text-gold-400">{aside.founding.title}</p>
                <div className="mt-5 flex items-end gap-5">
                  <Counter
                    value={aside.founding.spots}
                    className="font-display text-7xl leading-none text-gold-400"
                  />
                  <p className="pb-2 font-sans text-[0.68rem] leading-snug font-bold tracking-[0.2em] text-on-dark/60 uppercase">
                    {aside.founding.spotsLabel[0]}
                    <br />
                    {aside.founding.spotsLabel[1]}
                  </p>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-on-dark/60">
                  {aside.founding.body}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
