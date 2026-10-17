import { useLocation } from 'react-router-dom'
import { site } from '../content/site'

type SeoProps = {
  /** Page title; omit on the home page */
  title?: string
  description?: string
  image?: string
  /** Structured data (schema.org) for rich search results */
  jsonLd?: object
}

/** React 19 hoists these tags into <head>, both in the browser and when pre-rendering */
export default function Seo({
  title,
  description = site.description,
  image,
  jsonLd,
}: SeoProps) {
  const { pathname } = useLocation()
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `For Insurance Advisors | ${site.name}`
  const url = site.url + pathname
  const imageUrl = image && new URL(image, site.url).href

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta
        name="twitter:card"
        content={imageUrl ? 'summary_large_image' : 'summary'}
      />
      {jsonLd && (
        <script
          type="application/ld+json"
          // Serialised data we control; escape "<" so it can't close the tag
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </>
  )
}
