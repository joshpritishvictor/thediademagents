import { site } from './site'

const env = import.meta.env
const brand = site.shortName
/** The assistant's own name (Latin for "golden", after the gold crown); VITE_ASSISTANT_NAME overrides it */
const name = env.VITE_ASSISTANT_NAME?.trim() || 'Aurelia'
// The two services, as named in src/content/advisors.ts (pricing.plans)
const flex = `${brand} Flex`
const premium = `${brand} Premium`

/** The AI assistant's chat window (src/components/Assistant.tsx); answers come from functions/api/assistant.ts */
export const assistant = {
  /** Set VITE_ASSISTANT_ENABLED=false to hide the assistant */
  enabled: env.VITE_ASSISTANT_ENABLED !== 'false',
  endpoint: env.VITE_ASSISTANT_ENDPOINT || '/api/assistant',
  name,
  launcher: `Ask ${name}`,
  greeting: `Hi, I’m ${name}, ${brand}’s AI assistant. Ask me about our process, services and pricing, or apply right here.`,
  /** The intro's main action: starts an application in the chat */
  applyAction: {
    label: `Apply with ${name}`,
    /** Sent as the visitor's message when they tap it */
    prompt: 'I’d like to apply. Can you take my application here in the chat?',
  },
  /** Shown in the chat while an answer is being prepared */
  thinking: `${name} is thinking…`,
  /** Shown under the reply once an application taken in the chat is saved to the CRM */
  applied: `✓ Application received. The ${brand} team will be in touch.`,
  placeholder: 'Ask a question…',
  restart: 'New conversation',
  close: 'Close',
  send: 'Send',
  stop: 'Stop',
  errors: {
    busy: 'The assistant is busy right now. Please try again in a moment.',
    unavailable: `The assistant isn’t available right now. You can reach us at ${site.contact.email} or ${site.contact.phone}.`,
    declined: `I can’t help with that one. For anything else about ${brand}, I’m happy to help, or contact ${site.contact.email}.`,
    truncated: '(The answer was cut short. Ask me to continue.)',
  },
  /** Starter questions, matched to the page the visitor is on; "*" is the default */
  suggestions: {
    '/': [
      `How is ${brand} different from a lead generation company?`,
      `What’s the difference between ${flex} and ${premium}?`,
      'What is the D.I.S.C. process?',
    ],
    '/process/': [
      'What happens before I meet a client?',
      'Who attends the meeting with me?',
      'What happens after the meeting?',
    ],
    '/services/': [
      `What’s the difference between ${flex} and ${premium}?`,
      'What does the monthly management fee cover?',
      `Is the ${premium} rate locked in?`,
    ],
    '/who-thrives/': [
      'Do I need to be licensed in Alberta?',
      `Is ${brand} a fit if I’m new to business owner clients?`,
      'What do you expect from advisors?',
    ],
    '/about/': [
      'Who sits at the table in a meeting?',
      `Does ${brand} take a share of my commission?`,
      'Is the accountant independent?',
    ],
    '/about-us/': [
      `Who founded ${brand}?`,
      `Where is ${brand} based?`,
      'How do I get in touch?',
    ],
    '/apply/': [
      'What happens after I apply?',
      'Can I book an introduction call first?',
      'What do I need to apply?',
    ],
    '*': [
      `What does ${brand} do for advisors?`,
      `What’s the difference between ${flex} and ${premium}?`,
      'How do I apply?',
    ],
  } as Record<string, string[]>,
}
