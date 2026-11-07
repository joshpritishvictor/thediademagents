import { applyOptions } from './applyOptions'
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
  interests: [
    ...applyOptions.interestSuffixes.map((service) => `${brand} ${service}`),
    applyOptions.interestUndecided,
  ],
  licences: applyOptions.licences,
  experience: applyOptions.experience,
  businessOwnerFocus: applyOptions.businessOwnerFocus,
  preferredContact: applyOptions.preferredContact,
}
