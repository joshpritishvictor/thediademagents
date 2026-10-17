import {
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  Handshake,
  Hourglass,
  Megaphone,
  MessagesSquare,
  RefreshCw,
  Scale,
  Star,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { site } from './site'

const brand = site.shortName

export const hero = {
  eyebrow: 'For Insurance Advisors',
  headline: ['Spend Less Time Prospecting.', 'More Time Advising.'],
  body: `${brand} handles the marketing, the qualification, the meeting coordination, and places an independent CPA at every client meeting to eliminate your most common objection before it even comes up.`,
  stats: [
    { value: 20, label: 'Founding Advisor Spots' },
    { value: 6, label: 'Step Acquisition Process' },
    { value: 4, label: 'Professions, One Table' },
    { value: 0, prefix: '$', label: 'Commission Splitting' },
  ],
}

export const disc = {
  eyebrow: 'What Sets Us Apart',
  heading: ['Before you ever meet a client,', 'we’ve already done the work.'],
  paragraphs: [
    'Most lead generation companies hand you a name and a phone number. What happens next is your problem.',
    `${brand} is different. Before any advisor introduction is made, every prospective client goes through our structured D.I.S.C. process: a four-stage conversation conducted by our team that ensures you walk into every meeting prepared, informed, and focused on what matters most: giving great advice.`,
    'No cold introductions. No discovery from scratch. No wasted meetings.',
  ],
  quote: {
    text: 'The D.I.S.C. process means every client we introduce has already been personally engaged, assessed, and prepared, so the first meeting with an advisor is a real conversation, not a cold pitch.',
    attribution: `${brand} Client Success Team`,
  },
  stages: [
    {
      letter: 'D',
      title: 'Discovery',
      body: 'We explore the prospect’s business structure, corporate goals, and financial picture to confirm they’re a suitable candidate.',
    },
    {
      letter: 'I',
      title: 'Intake',
      body: 'We gather key data: retained earnings, insurance gaps, family priorities, decision-makers, so nothing is missing when the meeting begins.',
    },
    {
      letter: 'S',
      title: 'Strategic',
      body: 'We identify which professional disciplines are most relevant (insurance, accounting, legal) and coordinate the right team for the meeting.',
    },
    {
      letter: 'C',
      title: 'Consult',
      body: 'The client confirms their availability and consent, and a coordinated professional meeting is scheduled at a time that works for them.',
    },
  ],
  result:
    'You walk in knowing exactly who you’re meeting, what they need, and who else is at the table.',
}

export const problem = {
  eyebrow: 'The Problem',
  heading: 'You know the feeling.',
  intro:
    'You spend hours prospecting, qualifying, and finally get a business owner in front of you. The meeting goes perfectly. The strategy is exactly what they need. And then they say it.',
  quote: {
    text: 'This all sounds incredible, but I need to run this by my accountant first. Why hasn’t my accountant told me about this?',
    attribution: 'The objection that kills files',
  },
  outro:
    'The file enters limbo. The client waits weeks for a reactive tax-filer to respond. The opportunity fades. And you start the prospecting cycle all over again.',
  pains: [
    {
      icon: Hourglass,
      title: 'Hours lost to cold prospecting',
      body: 'Every hour spent chasing unqualified leads is an hour not spent advising clients who actually need you.',
    },
    {
      icon: ClipboardList,
      title: 'No intake done before the meeting',
      body: 'Walking into a meeting without knowing the client’s real financial picture means starting from scratch every time.',
    },
    {
      icon: RefreshCw,
      title: 'The accountant objection stalls files',
      body: 'Without an accountant in the room, corporate tax questions create delays that kill momentum and close rates.',
    },
    {
      icon: Scale,
      title: 'Legal and corporate gaps slow everything down',
      body: 'When clients need corporate restructuring or shareholder agreements, you have no one to pass to. The file stalls.',
    },
  ] satisfies { icon: LucideIcon; title: string; body: string }[],
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

export type ProcessStep = {
  icon: LucideIcon
  label: string
  title: string
  paragraphs: string[]
  highlight?: string
}

export const process = {
  eyebrow: 'How It Works',
  heading: ['From Initial Interest to', 'Professional Meeting'],
  body: `Every step managed by ${brand}. Every meeting ready for you.`,
  steps: [
    {
      icon: Megaphone,
      label: 'Step One',
      title: 'Targeted Digital Advertising',
      paragraphs: [
        `${brand} creates and runs targeted digital marketing campaigns designed to reach incorporated business owners and professionals who may benefit from corporate insurance and financial planning advice. Our campaigns focus on education, not hard selling, so the people who respond are genuinely interested in exploring their options.`,
      ],
    },
    {
      icon: MessagesSquare,
      label: 'Step Two',
      title: 'Personal Outreach & Initial Engagement',
      paragraphs: [
        `When a business owner expresses interest, our client success team reaches out personally, by phone, email, and SMS. Not with an automated sequence, but with real human touchpoints at every stage. Prospects who engage are invited to a virtual meeting with a dedicated ${brand} Client Manager, who explores their business structure, financial priorities, retained corporate earnings, and what they’re hoping to accomplish.`,
        'This multi-touch, human-led process separates genuine prospects from general inquiries, and ensures every advisor introduction starts with a client who has already been personally engaged by our team.',
      ],
      highlight:
        'We only move forward with prospects who are appropriate for a professional introduction, protecting your time and your close rate.',
    },
    {
      icon: ClipboardList,
      label: 'Step Three',
      title: 'D.I.S.C. Intake & Discovery',
      paragraphs: [
        `Before any professional meeting is scheduled, ${brand} completes a structured Discovery, Intake, Strategic & Consult (D.I.S.C.) conversation with the prospective client. We capture their corporate structure, retained earnings ranges, advisory gaps, family financial priorities, and confirm all key decision-makers, including whether a spouse or business partner needs to be present.`,
      ],
      highlight:
        'You walk into every meeting already knowing exactly what the client needs. No starting from scratch. No discovery surprises.',
    },
    {
      icon: Users,
      label: `Step Four: The ${brand} Advantage`,
      title: 'Coordinated Professional Meeting. Four Professions, One Table.',
      paragraphs: [
        `This is where ${brand} is genuinely different. Every coordinated meeting includes an independent Chartered Professional Accountant (CPA) alongside you and the client. The CPA addresses corporate tax considerations, retained earnings strategies, and business structure questions in real time, within their professional scope, so the most common objection in corporate insurance disappears before it can stall your file.`,
        'If the client raises legal needs (corporate restructuring, shareholder agreements, or financial planning requiring legal work) we connect them directly with an independent lawyer from our network, right then and there. You stay focused on the insurance conversation. Every other professional discipline is already in place.',
      ],
      highlight:
        'Insurance Advisor + CPA + Lawyer + Corporate Insurance Specialist. Four professions, one coordinated process, one table. No delays. No dropped files.',
    },
    {
      icon: CalendarCheck,
      label: 'Step Five',
      title: 'Ongoing Follow-Up & Relationship Coordination',
      paragraphs: [
        `Not every client is ready to make a decision after one meeting. ${brand} coordinates all ongoing follow-up, maintains client engagement, and schedules subsequent conversations on your behalf. You focus on the advice. We handle the administrative continuity that keeps opportunities alive.`,
      ],
    },
    {
      icon: TrendingUp,
      label: 'Step Six',
      title: 'Advisor Support & Performance Reviews',
      paragraphs: [
        `${brand} is designed to be an ongoing working relationship, not a one-time lead delivery. Through regular advisor check-ins, appointment tracking, and performance reviews, we identify what’s working, refine the process, and ensure your pipeline continues to grow over time.`,
      ],
    },
  ] satisfies ProcessStep[],
}

export const advantage = {
  badge: `The ${brand} Advantage`,
  heading: ['The objection that kills files', 'dies at the table.'],
  paragraphs: [
    'The single biggest obstacle in corporate insurance, “I need to run this by my accountant”, is eliminated because the accountant is already in the room. And when legal, corporate, or structural questions come up, our network of independent lawyers and professionals means every discipline is represented.',
    `This is what ${brand} means by one integrated approach. Four professions. One coordinated process. One table.`,
  ],
  objections: [
    {
      title: 'The Accountant Objection',
      quote: 'This sounds great, but I need to check with my accountant first.',
      answer: `With ${brand}, the CPA is already at the meeting addressing tax considerations, retained earnings, and corporate structure in real time. The file keeps moving.`,
    },
    {
      title: 'The Legal Complexity Objection',
      quote:
        'We’d need to restructure the corporation before we can move forward.',
      answer: `${brand}’s network includes independent lawyers who handle corporate restructuring, shareholder agreements, and legal work so nothing falls through the cracks.`,
    },
    {
      title: 'The “I’m Not Ready” Stall',
      quote: 'Let me think about it.',
      answer: `${brand}’s follow-up coordination keeps the relationship alive without requiring you to personally chase every file. We maintain engagement until the client is ready to move forward.`,
    },
  ],
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
