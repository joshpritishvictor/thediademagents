import {
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  Handshake,
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
      body: 'The client confirms their availability and consent, and a meeting is scheduled at a time that works for them. We strive to bring every decision-maker into the consult, setting you up for success from the first conversation.',
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

export const solution = {
  heading: ['The', `${brand}`, 'difference.'],
  body: 'We don’t just hand you a list of names. We manage the entire process, from finding the right client to putting a qualified team around the table.',
  points: [
    'We run the targeted digital advertising campaigns',
    'We personally reach out to every interested prospect',
    'We complete a structured D.I.S.C. (Discovery, Intake, Strategic & Consult) intake before your meeting',
    'We schedule the meeting at the client’s convenience',
    'An independent CPA attends every meeting alongside you',
    'Lawyers available for corporate and legal needs',
    'You focus entirely on providing insurance advice',
    'We handle all follow-up and appointment coordination',
  ],
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
