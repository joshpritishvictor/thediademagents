import joshPhoto from '../assets/images/josh-victor.jpg'
import judithPhoto from '../assets/images/judith-victor.jpg'
import { site } from './site'

const brand = site.shortName

export type TeamMember = {
  name: string
  /** Letters after the name, if any */
  credentials?: string
  role: string
  bio: string
  photo: string
  /** Describes the portrait for screen readers */
  alt: string
}

export const team = {
  eyebrow: 'Our Founders',
  heading: ['The people', `behind ${brand}.`],
  members: [
    {
      name: 'Josh Victor',
      credentials: 'MPH, PG Dip (Fin Serv), HLLQP, CSC',
      role: 'Chief Executive Officer & Founder',
      bio: `Josh’s career spans healthcare and financial services. Working with business owners, he kept seeing capable people miss financial gaps they didn’t know to look for. He founded ${brand} to close those gaps by bringing the right professionals together.`,
      photo: joshPhoto,
      alt: 'Josh Victor, smiling, in a blue suit and white shirt',
    },
    {
      name: 'Judith Victor',
      role: 'President & Co-Founder',
      bio: `As a business owner and healthcare professional, Judith knows firsthand that a high income doesn’t make managing wealth simpler. She leads ${brand} strategically and oversees the structure behind its operations, keeping our approach practical.`,
      photo: judithPhoto,
      alt: 'Judith Victor, smiling, in a navy blazer and white top',
    },
  ] satisfies TeamMember[],
  /** "The Heart of The Diadem Family": why the network exists (About Us, under the founders) */
  story: {
    eyebrow: `The Heart of ${site.name}`,
    /** The page title; the second sentence is set in gold italic */
    heading: ['You built the expertise.', 'We bring the clients.'] as [string, string],
    /** One card each; the title is a short label above the paragraph */
    points: [
      {
        title: 'Less chasing',
        body: `We know how much of a professional’s week can disappear into prospecting, chasing replies and trying to get a first meeting on the calendar. We created ${site.name} to take that work off your plate and make the introduction itself more valuable.`,
      },
      {
        title: 'Introductions with context',
        body: 'Our team speaks with Alberta business owners about the decisions ahead of them. One owner may be preparing to expand. Another may be wondering how to pass the company to their children. When your expertise fits, we coordinate the meeting and make sure you know what the owner wants to discuss before you sit down together.',
      },
      {
        title: 'Independent, never alone',
        body: 'That’s where the Family comes in. You keep your independence and build your own client relationships, with a circle of professionals you can turn to when a client asks,',
        /** Shown as a gold pull-quote, finishing the sentence above */
        quote: '“Who do you trust to help me with this?”',
      },
    ],
  },
}
