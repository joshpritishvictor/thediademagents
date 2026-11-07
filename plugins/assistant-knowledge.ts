import type { Plugin } from 'vite'

/**
 * The AI assistant's knowledge of the site, built from the pages themselves.
 *
 * Every page is rendered to HTML (the same render the pre-renderer uses) and its
 * text is extracted, so whatever the site says, in src/content/ or written
 * inline in a page, is what the assistant knows. Nothing is kept by hand: change
 * the copy and the assistant follows on the next build (or the next request in
 * development).
 *
 * The result is a plain-text file served at KNOWLEDGE_PATH. functions/api/assistant.ts
 * reads it and gives it to the model. It holds only text already public on the site.
 */
export const KNOWLEDGE_PATH = '/assistant-knowledge.txt'

/** What the SSR entry (src/entry-server.tsx) exposes for building the knowledge */
export type KnowledgeEntry = {
  render: (url: string) => Promise<string>
  urls: string[]
  assistantSite: {
    name: string
    shortName: string
    url: string
    location: string
    contact: { phone: string; email: string }
    /** What the assistant needs to take an application in the chat */
    application: {
      interests: string[]
      consent: string
      success: string
    }
  }
}

// Elements whose text is never page content
const SKIP = new Set([
  'script',
  'style',
  'svg',
  'template',
  'noscript',
  'header',
  'title',
])
const VOID = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
])
// Elements that start a new line in the text
const BLOCK = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'br',
  'button',
  'dd',
  'details',
  'dialog',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'label',
  'legend',
  'main',
  'nav',
  'ol',
  'option',
  'p',
  'section',
  'select',
  'summary',
  'table',
  'td',
  'th',
  'tr',
  'ul',
])
const HEADING = /^h[1-6]$/

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  mdash: '—',
  ndash: '–',
  hellip: '…',
}

function decode(text: string) {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const n =
        code[1] === 'x' || code[1] === 'X'
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10)
      return Number.isFinite(n) ? String.fromCodePoint(n) : match
    }
    return ENTITIES[code.toLowerCase()] ?? match
  })
}

const attr = (attrs: string, name: string) =>
  attrs.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i'))?.[1]

/**
 * Rendered page HTML → readable text: headings as "##", list items as "-",
 * links followed by their path so the assistant can point visitors to them.
 * The site footer is returned separately, since it is the same on every page.
 */
export function htmlToText(html: string) {
  const title = decode(
    html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '',
  ).trim()
  const out = { main: '', footer: '' }
  const stack: string[] = []
  let skipDepth = 0
  // Only text inside <main> (the page) and <footer> is kept; skip links and widgets are left out
  let mainDepth = 0
  let footerDepth = 0
  const links: { href?: string; from: number }[] = []

  const write = (text: string) => {
    if (footerDepth) out.footer += text
    else if (mainDepth) out.main += text
  }
  const written = () => (footerDepth ? out.footer : out.main)

  const TOKEN =
    /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|[^<]+/g
  for (const [token, rawName, attrs = ''] of html.matchAll(TOKEN)) {
    if (token.startsWith('<!--')) continue

    if (!rawName) {
      if (!skipDepth) write(decode(token).replace(/\s+/g, ' '))
      continue
    }

    const name = rawName.toLowerCase()
    const closing = token[1] === '/'

    if (!closing) {
      const selfClosing = VOID.has(name) || attrs.trimEnd().endsWith('/')
      if (SKIP.has(name) || skipDepth) {
        if (!selfClosing) {
          stack.push(name)
          skipDepth++
        }
        continue
      }
      if (name === 'main') mainDepth++
      if (name === 'footer') footerDepth++
      if (HEADING.test(name)) write('\n\n## ')
      else if (name === 'li') write('\n- ')
      else if (BLOCK.has(name)) write('\n')
      // Adjacent inline elements (a letter and its title, a price and its unit) still read as separate words
      else write(' ')
      if (name === 'a')
        links.push({ href: attr(attrs, 'href'), from: written().length })
      if (!selfClosing) stack.push(name)
      continue
    }

    // Close the element, and any left open inside it
    const at = stack.lastIndexOf(name)
    if (at === -1) continue
    while (stack.length > at) {
      const open = stack.pop()!
      if (skipDepth) {
        skipDepth--
        continue
      }
      if (open === 'a') {
        const link = links.pop()
        // Only links with visible text (not the logo) are worth naming
        const label = link && written().slice(link.from).trim()
        if (label && link.href && /^(\/|https?:|mailto:|tel:)/.test(link.href))
          write(` (${link.href})`)
      }
      if (HEADING.test(open) || BLOCK.has(open) || open === 'li') write('\n')
      else write(' ')
      if (open === 'main') mainDepth--
      if (open === 'footer') footerDepth--
    }
  }

  return { title, main: tidy(out.main), footer: tidy(out.footer) }
}

/** Trims lines, drops empty ones and repeats (carousels and tickers render the same text more than once) */
function tidy(text: string) {
  const seen = new Set<string>()
  const lines: string[] = []
  for (const raw of text.split('\n')) {
    const line = raw
      .replace(/\s+/g, ' ')
      .replace(/ ([,.;:!?’”)])/g, '$1')
      .replace(/([‘“(]) /g, '$1')
      .trim()
      // A ticker repeats its words to loop; keep one pass
      .replace(/^(.{8,}?)(?: \1)+$/, '$1')
    if (!line || line === '-' || line === '##') continue
    if (seen.has(line)) continue
    seen.add(line)
    // A heading starts a new paragraph
    if (line.startsWith('## ') && lines.length) lines.push('')
    lines.push(line)
  }
  return lines.join('\n')
}

/** Renders every page and joins their text into the assistant's knowledge file */
export async function buildKnowledge({
  render,
  urls,
  assistantSite: site,
}: KnowledgeEntry) {
  const pages = await Promise.all(
    urls.map(async (url) => ({ url, ...htmlToText(await render(url)) })),
  )
  const footer = pages.find((page) => page.footer)?.footer ?? ''

  return [
    `# ${site.name} — advisor website`,
    '',
    `Brand: ${site.shortName}`,
    `Website: ${site.url}`,
    `Location: ${site.location}`,
    `Phone: ${site.contact.phone}`,
    `Email: ${site.contact.email}`,
    `Pages: ${pages.map((page) => page.url).join(', ')}`,
    '',
    ...pages.flatMap((page) => [
      `=== PAGE ${page.url}${page.title ? ` — ${page.title}` : ''} ===`,
      '',
      page.main,
      '',
    ]),
    '=== APPLYING THROUGH THE CHAT ===',
    '',
    `Services to choose from (use these exact names): ${site.application.interests.join(' | ')}`,
    `Electronic communications consent (optional; quote it exactly when asking): "${site.application.consent}"`,
    `After applying: ${site.application.success}`,
    '',
    '=== SITE FOOTER (on every page) ===',
    '',
    footer,
    '',
  ].join('\n')
}

/**
 * Dev only: serves the knowledge file from `npm run dev`, rebuilt from the
 * current source on each request, so copy edits reach the assistant at once.
 * Production gets the same file from scripts/prerender.ts.
 */
export default function assistantKnowledge(): Plugin {
  return {
    name: 'diadem:assistant-knowledge',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'GET' || req.url?.split('?')[0] !== KNOWLEDGE_PATH)
          return next()
        try {
          const entry = (await server.ssrLoadModule(
            '/src/entry-server.tsx',
          )) as KnowledgeEntry
          const text = await buildKnowledge(entry)
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.setHeader('Cache-Control', 'no-store')
          res.end(text)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}
