import { Check, Mail, Phone } from 'lucide-react'
import { m } from 'motion/react'
import ApplyForm from '../components/ApplyForm'
import LottieScene from '../components/LottieScene'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { applyForm, applyPage } from '../content/apply'
import { site } from '../content/site'
import { easeOutExpo } from '../lib/motion'

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

      <section className="relative overflow-hidden bg-brand-950 pt-36 pb-20 text-on-dark md:pt-44 md:pb-28">
        <div className="glow-soft" aria-hidden="true" />
        <div className="relative container-page grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <m.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow text-gold-400">{applyPage.eyebrow}</p>
            </m.div>
            <m.h1
              className="mt-8 display-xl text-on-dark"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
            >
              {applyPage.heading[0]}
              <br />
              <em className="accent">{applyPage.heading[1]}</em>
            </m.h1>
            <m.p
              className="mt-8 max-w-xl text-lg text-on-dark/70 md:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
            >
              {applyPage.body}
            </m.p>
            <m.ul
              className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: easeOutExpo }}
            >
              {applyPage.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-t border-on-dark/15 pt-4 text-sm"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-gold-500 text-brand-950">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-on-dark/80">{item}</span>
                </li>
              ))}
            </m.ul>
          </div>

          <m.div
            className="mx-auto w-full max-w-xs lg:col-span-5 lg:max-w-sm lg:justify-self-end"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: easeOutExpo }}
          >
            <div className="relative p-4">
              <div className="halo" aria-hidden="true" />
              <LottieScene
                src="/animations/growth.json"
                label="A bar chart growing with a rising gold trend line"
                className="relative aspect-square w-full"
              />
            </div>
          </m.div>
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <div className="panel p-6 md:p-10">
              <div className="flex items-center gap-4">
                <p className="eyebrow">Step one</p>
              </div>
              <h2
                id="apply-form-heading"
                className="mt-4 display-md text-brand-950"
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

          <Reveal delay={0.15} className="lg:col-span-4 lg:pt-4">
            <aside className="space-y-10">
              <div>
                <p className="eyebrow">Prefer to talk first?</p>
                <ul className="mt-5 space-y-3">
                  <li>
                    <a
                      href={site.contact.phoneHref}
                      className="link-line inline-flex items-center gap-2.5 font-sans text-sm font-semibold text-brand-950"
                    >
                      <Phone size={15} aria-hidden="true" />
                      {site.contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="link-line inline-flex items-center gap-2.5 font-sans text-sm font-semibold text-brand-950"
                    >
                      <Mail size={15} aria-hidden="true" />
                      {site.contact.email}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="eyebrow">What happens next</p>
                <ol className="mt-5 border-t border-ink/15">
                  {nextSteps.map((step, i) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-ink/15 py-4 text-sm text-ink-muted"
                    >
                      <span className="font-display text-base text-gold-600 italic">
                        0{i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  )
}
