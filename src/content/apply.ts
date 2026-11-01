import { site } from './site'

const brand = site.shortName

export const applyForm = {
  heading: 'Advisor Application',
  submit: 'Submit Application',
  success: {
    heading: 'Thank you. We’ve received your application.',
    body: `A member of the ${brand} team will review it and reach out within two business days to schedule your introduction call.`,
  },
  error: `Something went wrong sending your application. Please try again, or email us at ${site.contact.email}.`,
  consent: `I agree to receive electronic communications (programme updates, advisor resources, service announcements) from ${site.legalName}, operating as ${site.name}. I can withdraw consent anytime via the unsubscribe link.`,
  interests: [`${brand} Premium`, `${brand} Flex`, 'Not sure yet, let’s talk'],
  licences: [
    'Life & Accident and Sickness (Alberta)',
    'Life only (Alberta)',
    'Licensed in another province',
    'Not yet licensed',
  ],
  experience: ['Under 2 years', '2 to 5 years', '5 to 10 years', '10+ years'],
  businessOwnerFocus: [
    'Business owners are most of my practice',
    'Some business owners, want more',
    'New to the business owner market',
  ],
  preferredContact: ['Email', 'Phone', 'Video Call'],
}
