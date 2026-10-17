import { CheckCircle2, ChevronDown, Loader2, X } from 'lucide-react'
import {
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactElement,
  type RefObject,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { applyForm } from '../content/apply'
import { site } from '../content/site'

type Status = 'idle' | 'sending' | 'error'

// Serverless function in functions/api/apply.ts (saves the application to GoHighLevel)
const endpoint = import.meta.env.VITE_APPLY_ENDPOINT || '/api/apply'

const selectClass = 'field select-field appearance-none pr-8'

/** ?plan=premium|flex from the pricing table pre-selects the service of interest */
const planToInterest: Record<string, string> = {
  premium: applyForm.interests[0],
  flex: applyForm.interests[1],
}

export default function ApplyForm() {
  const [params] = useSearchParams()
  const preselected = planToInterest[params.get('plan') ?? ''] ?? ''
  // The "Schedule a 20-minute introduction call" buttons send ?intent=call
  const wantsCall = params.get('intent') === 'call'
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState(applyForm.error)
  const successDialog = useRef<HTMLDialogElement>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.website) return // honeypot: only bots fill the hidden field

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        // Validation problems (400) have a message worth showing; anything else gets the generic one
        const { error: message } = await response.json().catch(() => ({}))
        setError(response.status === 400 && message ? message : applyForm.error)
        setStatus('error')
        return
      }
      form.reset()
      setStatus('idle')
      successDialog.current?.showModal()
    } catch {
      setError(applyForm.error)
      setStatus('error')
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid gap-x-10 gap-y-7 sm:grid-cols-2"
        aria-labelledby="apply-form-heading"
      >
        {wantsCall && (
          <p className="border-l-2 border-gold-500 pl-4 font-display text-base text-brand-950 italic sm:col-span-2">
            You asked for a 20-minute introduction call. Leave your details
            below and we’ll reach out to schedule it.
          </p>
        )}

        <Field label="First name" required>
          <input
            name="firstName"
            autoComplete="given-name"
            required
            className="field"
          />
        </Field>
        <Field label="Last name" required>
          <input
            name="lastName"
            autoComplete="family-name"
            required
            className="field"
          />
        </Field>
        <Field label="Email address" required>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
          />
        </Field>
        <Field label="Phone number" required>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className="field"
          />
        </Field>
        <Field label="Brokerage / MGA" wide>
          <input
            name="brokerage"
            autoComplete="organization"
            placeholder="Where you currently place business"
            className="field"
          />
        </Field>
        <Field label="Licence status" required>
          <Select name="licence" options={applyForm.licences} required />
        </Field>
        <Field label="Years advising" required>
          <Select name="experience" options={applyForm.experience} required />
        </Field>
        <Field label="Business owner clients">
          <Select
            name="businessOwnerFocus"
            options={applyForm.businessOwnerFocus}
          />
        </Field>
        <Field label="Service of interest">
          <Select
            key={preselected}
            name="interest"
            options={applyForm.interests}
            defaultValue={preselected}
          />
        </Field>
        <Field label="Preferred contact method">
          <Select
            name="preferredContact"
            options={applyForm.preferredContact}
          />
        </Field>
        <Field label="Anything you’d like us to know? (optional)" wide>
          <textarea
            name="message"
            rows={3}
            className="field resize-y"
            placeholder={`Your practice, your market, what you’re hoping ${site.shortName} can take off your plate…`}
          />
        </Field>

        {wantsCall && (
          <input type="hidden" name="intent" value="Introduction call" />
        )}

        {/* Honeypot: hidden from people, tempting to bots */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <label className="flex items-start gap-3 font-sans text-sm text-ink-muted sm:col-span-2">
          <input
            name="consent"
            type="checkbox"
            value="yes"
            className="consent-box mt-0.5 size-5 shrink-0 cursor-pointer appearance-none border border-brand-950/40 bg-surface transition checked:border-gold-500 checked:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          />
          {applyForm.consent}
        </label>

        {status === 'error' && (
          <p
            role="alert"
            className="border-l-2 border-red-700 pl-4 font-sans text-sm font-medium text-red-800 sm:col-span-2"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-gold disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
        >
          {status === 'sending' && (
            <Loader2 size={16} className="animate-spin" />
          )}
          <span>{applyForm.submit}</span>
        </button>
      </form>

      <SuccessDialog dialogRef={successDialog} />
    </>
  )
}

/**
 * Native <dialog>: showModal() gives focus trapping, Esc to close and a
 * backdrop for free. Fades/scales in with CSS (@starting-style), no JS animation.
 */
function SuccessDialog({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>
}) {
  const close = () => dialogRef.current?.close()
  // Clicks on the dimmed backdrop land on the <dialog> element itself
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={onBackdropClick}
      aria-labelledby="apply-success-title"
      className="panel m-auto w-[calc(100%-2rem)] max-w-md scale-95 bg-card p-0 text-ink opacity-0 shadow-2xl shadow-brand-950/40 transition-all transition-discrete duration-300 ease-out-expo backdrop:bg-brand-950/0 backdrop:backdrop-blur-none backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:scale-100 open:opacity-100 open:backdrop:bg-brand-950/70 open:backdrop:backdrop-blur-sm starting:open:scale-95 starting:open:opacity-0 starting:open:backdrop:bg-brand-950/0"
    >
      <div className="relative px-8 pt-12 pb-10 text-center">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 place-items-center text-ink/50 transition-colors hover:text-brand-950"
        >
          <X size={20} />
        </button>

        <CheckCircle2
          size={48}
          strokeWidth={1.5}
          className="mx-auto text-gold-500"
        />
        <h2 id="apply-success-title" className="mt-6 display-md text-brand-950">
          {applyForm.success.heading}
        </h2>
        <p className="mt-4 text-ink-muted">{applyForm.success.body}</p>

        <button type="button" onClick={close} className="btn-navy mt-8">
          <span>Close</span>
        </button>
      </div>
    </dialog>
  )
}

function Field({
  label,
  required,
  wide,
  children,
}: {
  label: string
  required?: boolean
  wide?: boolean
  children: ReactElement
}) {
  return (
    <label className={`grid gap-1 ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="eyebrow text-[0.62rem] text-brand-950/70">
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </span>
      {children}
    </label>
  )
}

function Select({
  name,
  options,
  defaultValue = '',
  required,
}: {
  name: string
  options: string[]
  defaultValue?: string
  required?: boolean
}) {
  return (
    <span className="relative block">
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={selectClass}
      >
        <option value="" disabled className="text-ink">
          Select…
        </option>
        {options.map((option) => (
          <option key={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>
      {/* Own arrow so it sits inside the field, in the text colour */}
      <ChevronDown
        size={16}
        strokeWidth={2.5}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-ink"
      />
    </span>
  )
}
