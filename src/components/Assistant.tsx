import { lazy, Suspense, useRef, useState } from 'react'
import { assistant } from '../content/assistant'
import AssistantIcon from './AssistantIcon'

// The chat window loads on first use, so it costs nothing until a visitor opens it
const loadPanel = () => import('./AssistantPanel')
const AssistantPanel = lazy(loadPanel)

/** The AI assistant: a floating button that opens the chat window */
export default function Assistant() {
  const [open, setOpen] = useState(false)
  // Stays mounted once opened, so closing it keeps the conversation (and any answer still arriving)
  const [mounted, setMounted] = useState(false)
  const launcher = useRef<HTMLButtonElement>(null)

  function close() {
    setOpen(false)
    // Back to the button that opened it, for keyboard users
    window.setTimeout(() => launcher.current?.focus(), 0)
  }

  return (
    <>
      <button
        ref={launcher}
        type="button"
        onClick={() => {
          setMounted(true)
          setOpen(true)
        }}
        onPointerEnter={loadPanel}
        onFocus={loadPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        hidden={open}
        title={assistant.launcher}
        className="group fixed right-3 bottom-3 z-[55] rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 sm:right-6 sm:bottom-6"
      >
        {/* Floats on its own layer, so the hover lift and the drift don't fight over transform */}
        <span className="relative block animate-float">
          {/* A gold ring spreading out now and then, to draw the eye without nagging */}
          <span
            className="pointer-events-none absolute inset-0 animate-halo rounded-full border-2 border-gold-500"
            aria-hidden="true"
          />
          <span className="block rounded-full border border-gold-500/50 bg-brand-950 p-1 shadow-[0_12px_28px_-12px_rgb(0_0_0/0.6)] transition duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-gold-500 sm:p-1.5 sm:shadow-[0_20px_40px_-15px_rgb(0_0_0/0.6)]">
            <AssistantIcon
              mood="launcher"
              className="size-9 transition-[filter] duration-300 group-hover:brightness-110 sm:size-12"
            />
          </span>
        </span>
        <span className="sr-only">{assistant.launcher}</span>
      </button>

      {mounted && (
        <Suspense fallback={null}>
          <AssistantPanel open={open} onClose={close} />
        </Suspense>
      )}
    </>
  )
}
