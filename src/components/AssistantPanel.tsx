import { ArrowUp, RotateCcw, Square, X } from 'lucide-react'
import AssistantIcon from './AssistantIcon'
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assistant } from '../content/assistant'

type Message = {
  role: 'user' | 'assistant'
  content: string
  /** A notice from the site (not the model); never sent back to the server */
  notice?: boolean
}

/** One line of the server's response stream (functions/api/assistant.ts) */
type StreamEvent =
  | { type: 'text'; text: string }
  | { type: 'done'; truncated?: boolean }
  /** An application from the chat was saved to the CRM */
  | { type: 'applied' }
  | { type: 'error'; code: keyof typeof assistant.errors }

const STORAGE_KEY = 'assistant-conversation'

// Kept for the browser tab only, so a reload doesn't lose the conversation
function loadConversation(): Message[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}
function saveConversation(messages: Message[]) {
  try {
    if (messages.length)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked: the conversation just won't survive a reload
  }
}

/** Starter questions for the current page */
const suggestionsFor = (pathname: string) =>
  assistant.suggestions[pathname] ?? assistant.suggestions['*']

export default function AssistantPanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { pathname } = useLocation()
  const [messages, setMessages] = useState<Message[]>(loadConversation)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const request = useRef<AbortController | null>(null)
  const log = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!busy) saveConversation(messages)
  }, [messages, busy])

  // Follow the answer as it is written
  useEffect(() => {
    const el = log.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, open])

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  // Stop any answer still arriving if the panel goes away
  useEffect(() => () => request.current?.abort(), [])

  /** Changes the last message (the answer being written) */
  const updateLast = (change: (message: Message) => Message) =>
    setMessages((current) => [
      ...current.slice(0, -1),
      change(current[current.length - 1]),
    ])

  /** Shows a notice in place of an empty answer, or after a partial one */
  const notify = (text: string) =>
    setMessages((current) => {
      const last = current[current.length - 1]
      const notice: Message = { role: 'assistant', content: text, notice: true }
      return last?.role === 'assistant' && !last.content
        ? [...current.slice(0, -1), notice]
        : [...current, notice]
    })

  async function ask(question: string) {
    const text = question.trim()
    if (!text || busy) return
    setDraft('')

    const history = [
      ...messages.filter((m) => !m.notice),
      { role: 'user' as const, content: text },
    ]
    setMessages((current) => [
      ...current,
      { role: 'user', content: text },
      { role: 'assistant', content: '' },
    ])
    setBusy(true)
    const controller = new AbortController()
    request.current = controller

    try {
      const response = await fetch(assistant.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          page: pathname,
        }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) {
        // Validation problems (400) have a message worth showing
        const { error } = await response.json().catch(() => ({}))
        notify(
          response.status === 400 && error
            ? error
            : response.status === 429
              ? assistant.errors.busy
              : assistant.errors.unavailable,
        )
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let finished = false
      let applied = false
      const handle = (line: string) => {
        if (!line.trim()) return
        const event = JSON.parse(line) as StreamEvent
        if (event.type === 'text') {
          updateLast((m) => ({ ...m, content: m.content + event.text }))
        } else if (event.type === 'applied') {
          applied = true
        } else if (event.type === 'done') {
          finished = true
          if (event.truncated) notify(assistant.errors.truncated)
        } else if (event.type === 'error') {
          finished = true
          notify(assistant.errors[event.code] ?? assistant.errors.unavailable)
        }
      }
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        lines.forEach(handle)
      }
      handle(buffer)
      // Confirmation under the reply, so it's clear the application really went through
      if (applied) notify(assistant.applied)
      if (!finished) notify(assistant.errors.unavailable)
    } catch {
      if (controller.signal.aborted) {
        // Stopped by the visitor: keep what arrived, drop an empty answer
        setMessages((current) => {
          const last = current[current.length - 1]
          return last?.role === 'assistant' && !last.content
            ? current.slice(0, -1)
            : current
        })
      } else {
        notify(assistant.errors.unavailable)
      }
    } finally {
      if (request.current === controller) request.current = null
      setBusy(false)
    }
  }

  function restart() {
    request.current?.abort()
    setMessages([])
    setDraft('')
    input.current?.focus()
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    ask(draft)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends; Shift+Enter starts a new line
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      ask(draft)
    }
  }

  // On a phone the panel covers the page, so following a link closes it
  const onLink = () => {
    if (window.matchMedia('(max-width: 639px)').matches) onClose()
  }

  const last = messages[messages.length - 1]
  const waiting = busy && last?.role === 'assistant' && !last.content

  return (
    <section
      role="dialog"
      aria-label={assistant.name}
      hidden={!open}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
      className="fixed inset-2 z-[55] flex flex-col overflow-hidden rounded-xl border border-gold-500/25 bg-surface text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(40rem,calc(100dvh-3rem))] sm:w-[25rem]"
    >
      <header className="relative flex items-center gap-2.5 bg-brand-950 px-4 py-2.5 text-on-dark">
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
          aria-hidden="true"
        />
        <AssistantIcon className="size-8" />
        <h2 className="min-w-0 flex-1 truncate font-display text-base">
          {assistant.launcher}
        </h2>
        {messages.length > 0 && (
          <IconButton label={assistant.restart} onClick={restart}>
            <RotateCcw className="size-4" aria-hidden="true" />
          </IconButton>
        )}
        <IconButton label={assistant.close} onClick={onClose}>
          <X className="size-5" aria-hidden="true" />
        </IconButton>
      </header>

      <div
        ref={log}
        role="log"
        aria-live="polite"
        aria-busy={busy}
        className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 text-[0.92rem] leading-relaxed sm:px-5 sm:py-5"
      >
        <Bubble role="assistant">{assistant.greeting}</Bubble>

        {messages.length === 0 && (
          <ul className="flex flex-col items-start gap-2 pt-1">
            {suggestionsFor(pathname).map((question) => (
              <li key={question}>
                <button
                  type="button"
                  onClick={() => ask(question)}
                  className="rounded-lg border border-gold-500/40 bg-card px-3 py-2 text-left text-[0.85rem] text-brand-950 transition-colors hover:border-gold-500 hover:bg-gold-300/40"
                >
                  {question}
                </button>
              </li>
            ))}
          </ul>
        )}

        {messages.map((message, i) =>
          message.role === 'assistant' && !message.content ? null : (
            <Bubble key={i} role={message.role} notice={message.notice}>
              {message.role === 'assistant' && !message.notice ? (
                <Markdown text={message.content} onLink={onLink} />
              ) : (
                message.content
              )}
            </Bubble>
          ),
        )}

        {waiting && (
          <p className="text-[0.82rem] text-ink-muted italic">
            {assistant.thinking}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-ink/10 bg-card px-3 pt-3 pb-2 sm:px-4"
      >
        <div className="flex items-end gap-2">
          <label htmlFor="assistant-input" className="sr-only">
            {assistant.placeholder}
          </label>
          <textarea
            id="assistant-input"
            ref={input}
            rows={1}
            value={draft}
            maxLength={2000}
            placeholder={assistant.placeholder}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            className="[field-sizing:content] max-h-32 min-h-10 flex-1 resize-none rounded-lg border border-ink/15 bg-surface px-3 py-2 text-base text-ink placeholder:text-ink-muted focus:border-gold-500 focus:outline-none sm:text-[0.92rem]"
          />
          {busy ? (
            <button
              type="button"
              onClick={() => request.current?.abort()}
              className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-900 text-on-dark transition-colors hover:bg-brand-800"
            >
              <Square className="size-3.5 fill-current" aria-hidden="true" />
              <span className="sr-only">{assistant.stop}</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!draft.trim()}
              className="grid size-10 shrink-0 place-items-center rounded-lg bg-gold-500 text-brand-950 transition-colors hover:bg-gold-300 disabled:opacity-40 disabled:hover:bg-gold-500"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
              <span className="sr-only">{assistant.send}</span>
            </button>
          )}
        </div>
        <p className="pt-2 text-center text-[0.68rem] leading-snug text-ink-muted">
          {assistant.disclaimer}
        </p>
      </form>
    </section>
  )
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="grid size-9 place-items-center rounded-full text-on-dark transition-colors hover:bg-brand-800 hover:text-gold-300"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  )
}

function Bubble({
  role,
  notice,
  children,
}: {
  role: Message['role']
  notice?: boolean
  children: ReactNode
}) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-xl rounded-br-sm bg-brand-900 px-4 py-2.5 whitespace-pre-wrap text-on-dark">
          {children}
        </p>
      </div>
    )
  }
  return (
    <div
      className={`max-w-[92%] rounded-xl rounded-bl-sm border px-4 py-2.5 text-left ${
        notice
          ? 'border-gold-500/40 bg-gold-300/20 text-ink-muted italic'
          : 'border-ink/10 bg-card text-ink'
      }`}
    >
      {children}
    </div>
  )
}

/* ---- A small, safe Markdown renderer for answers: paragraphs, lists, bold and links ---- */

const BULLET = /^\s*[-*•]\s+/
const NUMBERED = /^\s*\d+[.)]\s+/

function Markdown({ text, onLink }: { text: string; onLink: () => void }) {
  const blocks: ReactNode[] = []
  let paragraph: string[] = []
  let list: { ordered: boolean; items: string[] } | null = null

  const flush = () => {
    const key = blocks.length
    if (paragraph.length) {
      blocks.push(
        <p key={key}>
          {paragraph.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {inline(line, onLink)}
            </span>
          ))}
        </p>,
      )
      paragraph = []
    }
    if (list) {
      const items = list.items.map((item, i) => (
        <li key={i}>{inline(item, onLink)}</li>
      ))
      blocks.push(
        list.ordered ? (
          <ol key={key} className="list-decimal space-y-1 pl-5">
            {items}
          </ol>
        ) : (
          <ul
            key={key}
            className="list-disc space-y-1 pl-5 marker:text-gold-600"
          >
            {items}
          </ul>
        ),
      )
      list = null
    }
  }

  for (const raw of text.split('\n')) {
    const line = raw.replace(/^#{1,6}\s+(.*)$/, '**$1**')
    const ordered = NUMBERED.test(line)
    if (ordered || BULLET.test(line)) {
      if (paragraph.length || (list && list.ordered !== ordered)) flush()
      list ??= { ordered, items: [] }
      list.items.push(line.replace(ordered ? NUMBERED : BULLET, ''))
    } else if (!line.trim()) {
      flush()
    } else {
      if (list) flush()
      paragraph.push(line)
    }
  }
  flush()

  return <div className="space-y-3">{blocks}</div>
}

const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

function inline(text: string, onLink: () => void): ReactNode[] {
  const nodes: ReactNode[] = []
  let at = 0
  for (const match of text.matchAll(INLINE)) {
    const [whole, bold, label, href] = match
    if (match.index > at) nodes.push(text.slice(at, match.index))
    const key = match.index
    if (bold) {
      nodes.push(
        <strong key={key} className="font-semibold text-brand-950">
          {bold}
        </strong>,
      )
    } else {
      nodes.push(
        <AnswerLink key={key} href={href} onLink={onLink}>
          {label}
        </AnswerLink>,
      )
    }
    at = match.index + whole.length
  }
  if (at < text.length) nodes.push(text.slice(at))
  return nodes
}

const linkClass =
  'font-semibold text-gold-600 underline decoration-gold-500/40 underline-offset-2 hover:decoration-gold-600'

function AnswerLink({
  href,
  onLink,
  children,
}: {
  href: string
  onLink: () => void
  children: ReactNode
}) {
  // Pages on this site
  if (/^\/(?!\/)/.test(href)) {
    return (
      <Link to={href} onClick={onLink} className={linkClass}>
        {children}
      </Link>
    )
  }
  if (/^(mailto|tel):/i.test(href)) {
    return (
      <a href={href} className={linkClass}>
        {children}
      </a>
    )
  }
  if (/^https?:\/\//i.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {children}
      </a>
    )
  }
  // Anything else (e.g. javascript:) is shown as plain text
  return <>{children}</>
}
