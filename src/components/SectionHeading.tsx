import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionHeadingProps = {
  /** Section number shown before the eyebrow, e.g. "02" */
  index?: string
  eyebrow?: string
  /** Plain words, then the italic gold phrase */
  title: string | [string, string]
  description?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

/** Numbered eyebrow with a hairline, serif heading with an italic accent, optional lead */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const [plain, accent] = Array.isArray(title) ? title : [title, undefined]
  const centered = align === 'center'
  return (
    <Reveal
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {(eyebrow || index) && (
        <div
          className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}
        >
          {index && (
            <span className="font-display text-sm text-gold-500 italic">
              {index}
            </span>
          )}
          {eyebrow && (
            <p className={`eyebrow ${light ? 'text-gold-400' : ''}`}>
              {eyebrow}
            </p>
          )}
        </div>
      )}
      <h2
        className={`mt-6 display-lg ${light ? 'text-on-dark' : 'text-brand-950'}`}
      >
        {plain}
        {accent && (
          <>
            {' '}
            <em className="accent">{accent}</em>
          </>
        )}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-on-dark/70' : 'text-ink-muted'}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
