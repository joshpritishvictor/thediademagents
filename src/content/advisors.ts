import {
  BadgeCheck,
  Briefcase,
  Calculator,
  CalendarCheck,
  ClipboardList,
  Handshake,
  Megaphone,
  MessagesSquare,
  RefreshCw,
  Scale,
  Star,
  type LucideIcon,
} from 'lucide-react'

import { site } from './site'

const brand = site.shortName

export const hero = {
  eyebrow: 'For Insurance Advisors',
  headline: ['Spend Less Time Prospecting.', 'More Time Advising.'],
  body: `We handle what happens before the meeting so you can focus on what happens in it. Targeted acquisition, structured qualification, and an independent CPA at the table — so the objection that kills most files never comes up.`,
}

export const disc = {
  eyebrow: 'What Sets Us Apart',
  heading: ['Before you ever meet a client,', 'we’ve already done the work.'],
  paragraphs: [
    'Most lead generation companies hand you a name and a phone number. What happens next is your problem.',
    `${brand} is different, we are not a lead generation company. Before any advisor introduction is made, every prospective client goes through our structured D.I.S.C. process.`,
  ],
  quote: {
    text: 'No cold introductions. No discovery from scratch. No wasted meetings.',
  },
  stages: [
    {
      letter: 'D',
      title: 'Discovery',
      body: 'We explore their business structure, retained earnings, and financial gaps — so you arrive knowing their pain points before the first conversation.',
    },
    {
      letter: 'I',
      title: 'Intake',
      body: 'We complete a full Financial Needs Analysis (FNA) by capturing family priorities, existing coverage, and any gaps in protection.',
    },
    {
      letter: 'S',
      title: 'Strategic',
      body: 'We identify which professional disciplines are most relevant (insurance, accounting, investments,legal) and coordinate the right team for the meeting.',
    },
    {
      letter: 'C',
      title: 'Consult',
      body: 'The client confirms their availability and a meeting is scheduled. We strive to bring every decision-maker into the consult, setting you up for success from the first conversation.',
    },
  ],
  result:
    'You walk in knowing exactly who you’re meeting, what they need, and who else is at the table.',
}

export const problem = {
  heading: ['The objections we help', 'you handle.'],
  /** Label on each slide's answer */
  answerLabel: `How ${brand} solves it`,
  /** The objections advisors hear, one slide each: the client's words, what they do to a file, and the answer */
  objections: [
    {
      title: 'The Accountant Objection',
      eyebrow: 'Objection 01 — The deal-killer',
      quote:
        'This sounds incredible, but I need to run this by my accountant first. Why hasn’t my accountant told me about this?',
      tagline: 'The objection that stalls corporate files',
      answer: `The file doesn’t enter limbo waiting weeks for an accountant who wasn’t in the room. ${brand} brings an independent Chartered Professional Accountant (CPA) to the table for the consult to address corporate tax rules, retained earnings, and structure in real time.`,
    },
    {
      title: 'The Decision-Maker Runaround',
      eyebrow: 'Objection 02 — The delay tactic',
      quote:
        'I love this strategy, but I need to talk to my spouse and business partners before I can make any decisions.',
      tagline: 'The runaround that kills closing momentum',
      answer:
        'During our 10–15 minute D.I.S.C. intake call, our Client Relationship Managers identify all voting shareholders, partners, and spouses in advance. We confirm that every primary decision-maker is present at the consultation — so you never have to pitch twice.',
    },
    {
      title: 'The Legal Complexity Stall',
      eyebrow: 'Objection 03 — The structural excuse',
      quote:
        'We need to update our shareholder agreement and restructure our holding company before we can touch this.',
      tagline: 'The roadblock that shelves complex plans',
      answer: `Legal and corporate roadblocks don’t derail the opportunity. ${brand} coordinates an established network of independent legal professionals who handle corporate restructuring, shareholder agreements, and contract execution — keeping the file moving without ever stalling.`,
    },
    {
      title: 'The Cash-Flow Uncertainty',
      eyebrow: 'Objection 04 — The unqualified time-waster',
      quote:
        'This makes complete sense, but we simply don’t have the funds or cash flow to commit to this right now.',
      tagline: 'The objection that proves the lead was unvetted',
      answer: `You never spend your valuable advisory time in meetings with cash-strapped leads. ${brand}’s front-end qualification screens for corporate surplus and cash-flow capacity before anything is booked. If a prospect isn’t in a position to act, they don’t reach your calendar — they stay in our nurture pipeline until they are.`,
    },
  ] satisfies {
    title: string
    eyebrow: string
    quote: string
    tagline: string
    answer: string
  }[],
}

export const benefits = {
  eyebrow: 'Where We Help',
  heading: ['Four things you’ll', 'never deal with again.'],
  items: [
    {
      title: 'Hours lost to cold prospecting',
      body: 'Every hour spent chasing unqualified leads is an hour not spent advising clients who actually need you.',
    },
    {
      title: 'No intake done before the meeting',
      body: 'Walking into a meeting without knowing the client’s real financial picture means starting from scratch every time.',
    },
    {
      title: 'The accountant objection stalls files',
      body: 'Without an accountant in the room, corporate tax questions create delays that kill momentum and close rates.',
    },
    {
      title: 'Legal and corporate gaps slow everything down',
      body: 'When clients need corporate restructuring or shareholder agreements, you have no one to pass to. The file stalls.',
    },
  ] satisfies { title: string; body: string }[],
}

/** A channel a service reaches people through; drawn with its brand mark by <ChannelIcon> */
export type Channel =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'linkedin'
  | 'googleads'
  | 'email'
  | 'phone'
  | 'text'

export type ComparisonItem = {
  /** Bold opening phrase, when the item has one */
  lead?: string
  text: string
  /** Which services include it */
  plans: Plan['id'][]
  /** Shown as a row of marks under the text */
  channels?: Channel[]
}

export type ComparisonGroup = {
  label: string
  items: ComparisonItem[]
}

const both: Plan['id'][] = ['flex', 'premium']
const premium: Plan['id'][] = ['premium']

export type ProcessStep = {
  icon: LucideIcon
  label: string
  title: string
  body: string
  /** Set apart in the list: the step that makes the service different */
  featured?: boolean
  /** Platforms or contact methods the step uses, shown as badges under the text */
  channels?: Channel[]
}

export const solution = {
  eyebrow: 'What we take off your plate',
  heading: ['The', `${brand}`, 'difference.'],
  body: 'No cold lists. No chasing. We pre-qualify every client, get them hot, and pave a clear path for you to close. Everything in between, we handle.',
  /** The process end to end, in the order it happens */
  steps: [
    {
      icon: Megaphone,
      label: 'Step One',
      title: 'Targeted Digital Advertising',
      body: 'We run the targeted digital advertising campaigns across the platforms your future clients already use.',
      channels: [
        'facebook',
        'instagram',
        'tiktok',
        'youtube',
        'linkedin',
        'googleads',
      ],
    },
    {
      icon: MessagesSquare,
      label: 'Step Two',
      title: 'Personal Outreach',
      body: 'We personally reach out to every interested prospect.',
      channels: ['email', 'phone', 'text'],
    },
    {
      icon: ClipboardList,
      label: 'Step Three',
      title: 'D.I.S.C. Intake',
      body: 'We gather the business background and key priorities through our custom DISC process, so you walk in fully prepared',
    },
    {
      icon: CalendarCheck,
      label: 'Step Four',
      title: 'Meeting Scheduled',
      body: 'We schedule the meeting at the client’s convenience.',
    },
    {
      icon: Calculator,
      label: `Step Five: The ${brand} Advantage`,
      title: 'Independent CPA at the Table',
      body: 'Our In-House accountant attends every meeting alongside you.',
      featured: true,
    },
    {
      icon: Scale,
      label: 'Step Six',
      title: 'Legal Support on Call',
      body: 'Lawyers available for corporate and legal needs.',
    },
    {
      icon: BadgeCheck,
      label: 'Step Seven',
      title: 'You Give the Advice',
      body: 'You focus entirely on providing advice.',
    },
    {
      icon: RefreshCw,
      label: 'Step Eight',
      title: 'Follow-Up & Coordination',
      body: 'We handle all follow-up and appointment coordination.',
    },
  ] satisfies ProcessStep[],
  /** What each service includes, grouped by where it happens in the process; a column lists only its own items */
  groups: [
    {
      label: 'Client acquisition',
      items: [
        {
          text: 'Targeted digital client acquisition campaigns',
          plans: both,
          channels: [
            'facebook',
            'instagram',
            'tiktok',
            'youtube',
            'linkedin',
            'googleads',
          ],
        },
        {
          text: 'Personal prospect engagement and qualification',
          plans: both,
          channels: ['email', 'phone', 'text'],
        },
      ],
    },
    {
      label: 'Before the meeting',
      items: [
        { text: 'D.I.S.C. process completed before your meeting', plans: both },
        {
          text: 'Appointments booked into your calendar (no-shows rescheduled or replaced)',
          plans: both,
        },
      ],
    },
    {
      label: 'At the meeting',
      items: [
        {
          text: 'Our in-house accountant at every coordinated meeting',
          plans: both,
        },
        {
          text: 'Access to independent legal professionals when needed',
          plans: both,
        },
      ],
    },
    {
      label: 'After the meeting',
      items: [
        {
          lead: 'Ongoing client opportunities',
          text: `through ${brand}’s rotating allocation system, with no per-appointment fees`,
          plans: premium,
        },
        {
          lead: 'Dedicated follow-up support',
          text: 'to keep prospective clients engaged after their meetings',
          plans: premium,
        },
        {
          lead: 'Priority access to reassigned clients:',
          text: 'first consideration for suitable opportunities released by other advisors',
          plans: premium,
        },
      ],
    },
    {
      label: 'Partnership and support',
      items: [
        {
          lead: 'Senior Advisor Partnership:',
          text: 'co-advise with an experienced advisor on eligible cases, under a 50/50 commission split agreed between the two licensed advisors',
          plans: premium,
        },
        {
          text: 'Regular advisor check-ins and performance reviews',
          plans: premium,
        },
        {
          text: 'Dedicated administrative and coordination support',
          plans: premium,
        },
      ],
    },
  ] satisfies ComparisonGroup[],
}

export const process = {
  eyebrow: 'Advisor Support & Performance Reviews',
  heading: [
    'An ongoing working relationship,',
    'not a one-time lead delivery.',
  ],
  body: 'Through regular advisor check-ins, appointment tracking, and performance reviews, we identify what’s working, refine the process, and ensure your pipeline continues to grow over time.',
}

export type Plan = {
  id: 'flex' | 'premium'
  label: string
  name: string
  tagline: string
  price: string
  period: string
  note: string
  features: string[]
  footnote?: string
  cta: string
  featured?: boolean
  badge?: string
}

export const pricing = {
  eyebrow: 'Our Services',
  heading: ['Choose the Service That Fits', 'Your Practice'],
  body: `Whether you want qualified appointments on a flexible basis or a comprehensive acquisition service, ${brand} offers two clear options.`,
  plans: [
    {
      id: 'flex',
      label: `${brand}`,
      name: 'Flex',
      tagline: 'Qualified Appointments. Greater Flexibility.',
      price: '$750',
      period: 'per month management fee',
      note: '+ $750 per qualified, attended appointment',
      features: [
        'Targeted digital client acquisition campaigns',
        'Personal prospect engagement and qualification',
        'D.I.S.C. intake completed before your meeting',
        'Independent CPA at every coordinated meeting',
        'Appointment scheduling at client’s convenience',
        'Appointment administration and tracking',
        'Access to independent legal professionals when needed',
      ],
      footnote:
        'Enhanced management with ongoing follow-up and advisor check-ins available at $999/month.',
      cta: `Explore ${brand} Flex`,
    },
    {
      id: 'premium',
      label: `${brand}`,
      name: 'Premium',
      tagline: 'Your Comprehensive Acquisition & Coordination Service.',
      price: '$4,999',
      period: `per month, ${brand} Premium Advisor rate`,
      note: 'Locked in for the life of your contract. First 20 advisors only.',
      features: [
        `Everything in ${brand} Flex`,
        'Comprehensive targeted acquisition campaigns',
        'Dedicated client qualification and discovery process',
        'Full D.I.S.C. intake coordination',
        'Independent CPA at every coordinated meeting',
        'Access to independent legal professionals when needed',
        'Ongoing prospective-client follow-up and relationship tracking',
        'Regular advisor check-ins and performance reviews',
        'Dedicated administrative and coordination support',
      ],
      cta: `Apply as a ${brand} Premium Advisor`,
      featured: true,
      badge: `${brand} Premium Advisor Offer`,
    },
  ] satisfies Plan[],
  disclaimer: `${brand} Premium is a comprehensive monthly coordination service. No minimum or maximum appointment volume is guaranteed. ${brand} Premium Advisor pricing is locked in for the life of the advisor’s service contract and is available exclusively to the first 20 enrolled advisors. Once all 20 spots are filled, standard rates will apply to new enrolments. ${brand} reserves the right to close ${brand} Premium Advisor enrolment at any time. Appointment fees under ${brand} Flex are separate from monthly management fees. All regulated professional services are provided by independent licensed professionals.`,
}

export type FeePlan = {
  id: Plan['id']
  /** Billing model, e.g. "Pay as you go" */
  kicker: string
  name: string
  /** How many clients the service covers */
  clients: string
  /** The headline fee and what it is charged per */
  price: string
  tax: string
  per: string
  /** The one-line promise under the fee */
  promise: string
  /** The management fee on top */
  management: { price: string; text: string }
  /** What the management fee covers */
  includes: string
  /** Optional all-in total line */
  total?: string
  /** A plan whose features this one includes; they are summed up in one line rather than repeated */
  inherits?: Plan['id']
  featured?: boolean
}

/** What each service costs, laid out fee by fee, then what it includes */
export const fees = {
  includedLabel: 'What’s included',
  /** The one line that stands in for an inherited plan's features, e.g. "Everything in Diadem Flex" */
  everythingIn: (name: string) => `Everything in ${name}`,
  plans: [
    {
      id: 'flex',
      kicker: 'Pay as you go',
      name: `${brand} Flex`,
      clients: 'You choose how many clients you take on',
      price: 'CAD 750',
      tax: '+ GST',
      per: 'per client, billed only after you’ve met with them',
      promise: 'No appointment, no charge.',
      management: {
        price: 'CAD 750',
        text: 'per month management fee + GST, paid upfront',
      },
      includes:
        'Includes CAD 250 CRM, CAD 250 operations, and CAD 250 client manager and scheduling.',
    },
    {
      id: 'premium',
      kicker: 'Flat rate',
      name: `${brand} Premium Advisor`,
      clients: 'Unlimited clients',
      price: 'CAD 4,000',
      tax: '+ GST',
      per: 'per month for ongoing client appointments, with no per-client fees',
      promise: 'Unlimited qualified appointments through rotating allocation.',
      management: {
        price: 'CAD 999',
        text: 'per month management fee + GST',
      },
      includes:
        'Includes CAD 250 CRM, CAD 250 operations, and CAD 499 client manager, scheduling, and personal follow-up. We chase the client so you never have to.',
      total:
        'CAD 4,999 per month all-in, plus GST. Founding rate, first 20 advisors only.',
      inherits: 'flex',
      featured: true,
    },
  ] satisfies FeePlan[],
}

export const who = {
  eyebrow: `Who Thrives With ${brand}`,
  heading: ['The advisors who get the most from', `${brand}`],
  intro: `${brand} works best for advisors who are ready to spend less time chasing leads and more time doing what they’re best at: building relationships and providing meaningful advice to business owners who need it.`,
  traits: [
    {
      icon: BadgeCheck,
      title: 'You’re licensed and active in Alberta',
      body: 'You hold an appropriate insurance licence in Alberta and are in good standing, ready to engage clients professionally from day one.',
    },
    {
      icon: Briefcase,
      title: 'Business owners are your sweet spot',
      body: 'You understand incorporated business owners and the unique corporate planning considerations they face, or you’re ready to make them your focus.',
    },
    {
      icon: Handshake,
      title: 'You enjoy collaborative meetings',
      body: 'Having an accountant and lawyer at the table energizes you. You see it as a better client experience, not competition.',
    },
    {
      icon: Star,
      title: 'You lead with the client’s interests',
      body: 'You give advice you’d give your own family. Long-term relationships matter more to you than short-term close rates.',
    },
    {
      icon: CalendarCheck,
      title: 'You show up and follow through',
      body: 'You attend your scheduled meetings, follow up thoughtfully, and take the time to serve clients properly, not just get signatures.',
    },
  ] satisfies { icon: LucideIcon; title: string; body: string }[],
  aside: {
    heading: ['We Build the Connections.', 'You Build the Relationships.'],
    paragraphs: [
      'Growing an advisory practice should not depend entirely on cold calling, personal referrals, or managing every marketing responsibility yourself.',
      `${brand} connects targeted client acquisition with professional collaboration, ongoing coordination, and administrative support, so you can focus on what you do best.`,
      'Your expertise. Our system. One integrated approach.',
    ],
    founding: {
      title: `${brand} Premium Advisor Spots: Limited Availability`,
      body: `The first 20 insurance advisors who enrol in ${brand} Premium receive our ${brand} Premium Advisor rate, locked in for the life of their contract. Once all 20 spots are filled, new enrolments will be at standard rates. These spots will not be re-offered once filled. ${brand} reserves the right to close ${brand} Premium Advisor enrolment at any time.`,
      spots: 20,
      spotsLabel: [`${brand} Premium Advisor`, 'Spots Available'],
    },
  },
}

export const testimonials = {
  eyebrow: 'Trusted By Advisors',
  heading: ['What Our Advisors', 'Say'],
  placeholder: `Advisor testimonials and case studies coming soon. ${brand} is currently onboarding its first ${brand} Premium Advisors. If you’re interested in securing one of the 20 available spots, apply below.`,
}

export const finalCta = {
  heading: ['Ready to spend more time', 'advising and less time prospecting?'],
  body: `Apply to become a ${brand} Advisor or schedule an introduction call to learn more about how our system works.`,
}

export const disclosure = [
  `${site.legalName} (operating as ${site.name}) provides marketing, client acquisition, educational, and coordination services only. ${brand} is not an insurance company, insurance agency, accounting firm, law firm, or investment dealer, and does not solicit or sell insurance products, nor does it receive or split insurance commissions. All platform fees cover advertising, administration, and coordination services only.`,
  `D.I.S.C. (Discovery, Intake, Strategic & Consult) conversations are conducted by ${brand} administrative staff and do not constitute professional financial, insurance, legal, or tax advice. All regulated professional advice and services are provided independently by appropriately licensed professionals who maintain their own professional obligations and regulatory compliance.`,
  `Participation in a ${brand} service does not establish a legal partnership, employment relationship, or shared ownership. Appointments do not guarantee applications, sales, commissions, or particular financial outcomes. ${brand} reserves the right to close ${brand} Premium Advisor enrolment at any time.`,
]
