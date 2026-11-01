import { Mail, Phone } from 'lucide-react'
import ApplyForm from '../components/ApplyForm'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { applyForm } from '../content/apply'
import { site } from '../content/site'

const nextSteps = [
  'We review your application within two business days.',
  'A 20-minute introduction call to talk through your practice.',
  'If it is a fit, onboarding and your first coordinated campaign.',
]

export default function Apply() {
  return (
    <>
      <Seo
        title="Apply as an Advisor"
        description={`Apply to become a ${site.shortName} Advisor. Qualified business-owner appointments, a D.I.S.C. intake done before you meet, and an independent CPA at every coordinated meeting.`}
      />

      {/* The page opens on the form, so its top padding clears the fixed header */}
      <section className="bg-surface pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="container-page mx-auto max-w-6xl">
          <Reveal>
            <div className="panel p-6 md:p-10">
              <h2
                id="apply-form-heading"
                className="display-md text-brand-950"
              >
                {applyForm.heading}
              </h2>
              <p className="mt-2 font-sans text-sm text-ink/55">
                Fields marked <span className="text-gold-600">*</span> are
                required.
              </p>
              <div className="mt-10">
                <ApplyForm />
              </div>
            </div>
          </Reveal>

          {/* Under the form: the three steps that follow an application, then how to reach us first */}
          <Reveal delay={0.15} className="mt-12">
            <p className="eyebrow">What happens next</p>
            <ol className="mt-5 grid gap-4 md:grid-cols-3">
              {nextSteps.map((step, i) => (
                <li key={step} className="panel flex items-start gap-4 p-5 md:p-6">
                  <span className="shrink-0 font-display text-2xl leading-none text-gold-600 lining-nums">
                    0{i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            {/* A dark strip: the question on the left, the two ways to reach us as pills on the right */}
            <div className="panel-dark mt-6 overflow-hidden p-6 text-on-dark md:p-8">
              <div className="glow-soft" aria-hidden="true" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
                <div>
                  <p className="eyebrow text-gold-400">Prefer to talk first?</p>
                  <p className="mt-2 font-display text-xl text-on-dark md:text-2xl">
                    Call or email, and we’ll take it from there.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={site.contact.phoneHref}
                    className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 bg-white/5 px-5 py-3 font-sans text-sm font-semibold whitespace-nowrap text-on-dark transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-brand-950"
                  >
                    <Phone size={15} aria-hidden="true" />
                    {site.contact.phone}
                  </a>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 bg-white/5 px-5 py-3 font-sans text-sm font-semibold whitespace-nowrap text-on-dark transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-brand-950"
                  >
                    <Mail size={15} aria-hidden="true" />
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
