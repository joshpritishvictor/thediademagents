/**
 * The application's answer choices, shared by the form (src/content/apply.ts) and the
 * AI assistant (functions/api/assistant.ts), so both send GoHighLevel the same values.
 * No Vite env here: the Cloudflare function imports this file too.
 */
export const applyOptions = {
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
  /** The services, after the brand name (e.g. "Diadem Premium"), plus a "let's talk" choice */
  interestSuffixes: ['Premium', 'Flex'],
  interestUndecided: 'Not sure yet, let’s talk',
}
