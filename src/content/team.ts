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
  eyebrow: 'About Us',
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
}
