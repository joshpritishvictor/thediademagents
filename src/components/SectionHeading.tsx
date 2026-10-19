import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  /** Plain words, then the italic gold phrase, then optional plain words after it */
  title: string | [string, string] | [string, string, string]
  description?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
  /** Heading size; "md" for a heading that shares a row with content */
  size?: 'lg' | 'md'
  className?: string
}

/** Eyebrow, serif heading with an italic accent, optional lead */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  size = 'lg',
  className = '',
}: SectionHeadingProps) {
  const [plain, accent, tail] = Array.isArray(title) ? title : [title]
  const centered = align === 'center'
  return (
    <Reveal
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow ${light ? 'text-gold-400' : ''}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-6 ${size === 'md' ? 'display-md' : 'display-lg'} ${light ? 'text-on-dark' : 'text-brand-950'}`}
      >
        {plain}
        {accent && (
          <>
            {' '}
            <em className="accent">{accent}</em>
          </>
        )}
        {tail && <> {tail}</>}
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
