import { solution } from '../../content/advisors'
import Reveal, { RevealItem } from '../Reveal'

export default function Solution() {
  const [lead, accent, tail] = solution.heading
  return (
    <section className="bg-surface-alt section-y">
      <div className="container-page">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="font-display text-sm text-gold-500 italic">
                03
              </span>
              <p className="eyebrow">What we take off your plate</p>
            </div>
            <h2 className="mt-6 display-lg text-brand-950">
              {lead} <em className="accent">{accent}</em> {tail}
            </h2>
          </div>
          <p className="text-lg text-ink-muted lg:col-span-5 lg:pb-2">
            {solution.body}
          </p>
        </Reveal>

        <Reveal
          staggerChildren={0.06}
          className="mt-14 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4"
        >
          {solution.points.map((point, i) => (
            <RevealItem key={point}>
              <div className="group border-t border-brand-950/20 py-6 transition-colors hover:border-gold-500">
                <span className="font-display text-sm text-gold-600 italic">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 font-sans text-[0.95rem] leading-relaxed font-medium text-brand-950">
                  {point}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
