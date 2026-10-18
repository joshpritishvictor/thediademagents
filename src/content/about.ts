import {
  Calculator,
  Scale,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

import { site } from './site'

const brand = site.shortName

export const about = {
  eyebrow: 'About Us',
  heading: ['Four professions.', 'One table.'],
  body: `${brand} puts the right professionals around a business owner at the same time, so the advice is coordinated, the questions are answered in the room, and the advisor can focus on advising.`,

  table: {
    eyebrow: 'Who sits at the table',
    heading: ['Every seat has a purpose,', 'every meeting is coordinated.'],
    intro:
      'Business owners rarely have just one problem. Their insurance, their corporate structure, their tax position and their long-term plans all pull on each other, so we bring the people who handle each of them to the same meeting.',
    /** The four seats, in the order they appear around the table */
    seats: [
      {
        name: 'Financial Advisor',
        icon: TrendingUp,
        body: 'Brings the long-term planning picture: retirement, investments, and how the business fits into the owner’s personal goals.',
      },
      {
        name: 'Accountant',
        icon: Calculator,
        body: 'An independent CPA at every coordinated meeting, reviewing the numbers and confirming the structure before any decision is made.',
      },
      {
        name: 'Lawyer',
        icon: Scale,
        body: 'Available for corporate structure, shareholder agreements and the legal side of any strategy that comes out of the meeting.',
      },
      {
        name: 'Insurance Agent',
        icon: ShieldCheck,
        body: 'You. Focused entirely on the insurance advice, with the qualification, the coordination and the usual objections already handled.',
      },
    ] satisfies { name: string; icon: LucideIcon; body: string }[],
  },

  promise: {
    eyebrow: 'Our promise to advisors',
    /** The headline figure and what it refers to */
    note: { value: '$0', label: 'commission splitting' },
    heading: ['Your commission', 'stays yours.'],
    body: `${brand} is paid a service fee for the marketing, qualification and coordination it does, never a share of what you earn. The business you write is your business.`,
    points: [
      'No commission splitting, ever',
      'No share of the policies you place',
      'Clear pricing: a management fee and a per-appointment fee',
    ],
  },
}
