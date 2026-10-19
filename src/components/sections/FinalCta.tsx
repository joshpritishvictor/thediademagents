import { ArrowRight, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { finalCta } from '../../content/advisors'
import { applyLink, cta } from '../../content/site'
import Reveal from '../Reveal'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-gold-500/30 bg-brand-900 py-20 text-on-dark md:py-24">
      <div className="glow-soft" aria-hidden="true" />
      {/* A light band sweeping along the top rule */}
      <span
        className="absolute top-0 left-0 h-px w-1/4 animate-sweep bg-gradient-to-r from-transparent via-gold-300 to-transparent"
        aria-hidden="true"
      />

      <Reveal className="relative container-page">
        {/* The ask, on a card so it reads as one compact unit */}
        <div className="panel-dark mx-auto max-w-4xl px-7 py-10 text-center md:px-14 md:py-14">
          <p className="eyebrow text-gold-400">Next step</p>
          <h2 className="mx-auto mt-5 display-md text-on-dark">
            {finalCta.heading[0]}
            <br />
            <em className="accent">{finalCta.heading[1]}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-on-dark/70">
            {finalCta.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
        </div>
      </Reveal>
    </section>
  )
}
