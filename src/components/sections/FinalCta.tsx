import { ArrowRight, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { finalCta } from '../../content/advisors'
import { applyLink, cta } from '../../content/site'
import Reveal from '../Reveal'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-gold-500/30 bg-brand-900 py-28 text-on-dark md:py-36">
      <div className="glow-soft" aria-hidden="true" />
      {/* A light band sweeping along the top rule */}
      <span
        className="absolute top-0 left-0 h-px w-1/4 animate-sweep bg-gradient-to-r from-transparent via-gold-300 to-transparent"
        aria-hidden="true"
      />

      <Reveal className="relative container-page text-center">
        <div className="mx-auto flex items-center justify-center gap-4">
          <span className="rule-gold" aria-hidden="true" />
          <p className="eyebrow text-gold-400">Next step</p>
          <span className="rule-gold" aria-hidden="true" />
        </div>
        <h2 className="mx-auto mt-8 max-w-5xl display-xl text-on-dark">
          {finalCta.heading[0]}
          <br />
          <em className="accent">{finalCta.heading[1]}</em>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-on-dark/70">
          {finalCta.body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to={applyLink.to} className="btn-gold">
            <span>{cta.apply}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            to={`${applyLink.to}?intent=call`}
            className="btn-outline text-on-dark"
          >
            <PhoneCall size={15} aria-hidden="true" />
            <span>{cta.introCall}</span>
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
