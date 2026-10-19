import { Mail, MessageSquare, Phone } from 'lucide-react'
import {
  siFacebook,
  siGoogleads,
  siInstagram,
  siTiktok,
  siYoutube,
  type SimpleIcon,
} from 'simple-icons'
import type { Channel } from '../content/advisors'

type Mark = Pick<SimpleIcon, 'title' | 'path'>

// LinkedIn's mark is no longer distributed by Simple Icons, so it is kept here
const linkedin: Mark = {
  title: 'LinkedIn',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

/** Platforms, drawn with their brand logos */
const brandMarks: Partial<Record<Channel, Mark>> = {
  facebook: siFacebook,
  instagram: siInstagram,
  tiktok: siTiktok,
  youtube: siYoutube,
  linkedin,
  googleads: { ...siGoogleads, title: 'Google Ads' },
}

/** Contact methods, drawn with line icons */
const contactMarks = {
  email: { title: 'Email', Icon: Mail },
  phone: { title: 'Calls', Icon: Phone },
  text: { title: 'Text messages', Icon: MessageSquare },
} as const

const isContact = (c: Channel): c is keyof typeof contactMarks =>
  c in contactMarks

/** The human name of a channel, for labels and screen readers */
function channelName(channel: Channel): string {
  return isContact(channel)
    ? contactMarks[channel].title
    : (brandMarks[channel]?.title ?? channel)
}

type ChannelIconProps = {
  channel: Channel
  /** Width and height in pixels */
  size?: number
  className?: string
}

/** A channel's mark. Decorative: label it in the parent (see channelName). */
export default function ChannelIcon({
  channel,
  size = 16,
  className,
}: ChannelIconProps) {
  if (isContact(channel)) {
    const { Icon } = contactMarks[channel]
    return <Icon size={size} className={className} aria-hidden="true" />
  }
  const mark = brandMarks[channel]
  if (!mark) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={mark.path} />
    </svg>
  )
}

/** A channel as a small labelled badge on beige: its mark, then its name */
export function ChannelChip({ channel }: { channel: Channel }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-surface-alt px-3 py-1.5 font-sans text-xs font-semibold text-brand-950">
      <ChannelIcon channel={channel} size={14} className="text-gold-600" />
      {channelName(channel)}
    </span>
  )
}
