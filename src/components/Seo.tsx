import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SITE = {
  name: 'MASS RIDE & DELIVERY',
  legalName: 'บริษัท แมส ไรด์ แอนด์ เดลิเวอรี่ จำกัด',
  url: 'https://massridedelivery.com',
  logo: 'https://massridedelivery.com/favicon.svg',
  themeColor: '#E4002B',
  defaultOgImage:
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=70',
}

type JsonLd = Record<string, unknown>

interface SeoProps {
  title: string
  description: string
  /** path only, e.g. "/food" — canonical is derived from SITE.url */
  path?: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string
  /** one or more JSON-LD structured-data objects */
  jsonLd?: JsonLd | JsonLd[]
  /** article metadata */
  published?: string
  modified?: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Declarative <head> manager — no external dependency. */
export function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  keywords,
  jsonLd,
  published,
  modified,
}: SeoProps) {
  const location = useLocation()
  const url = SITE.url + (path ?? location.pathname)
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`
  const ogImage = image ?? SITE.defaultOgImage

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    if (keywords) upsertMeta('name', 'keywords', keywords)
    upsertLink('canonical', url)

    // Open Graph
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:locale', 'th_TH')

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    if (type === 'article') {
      if (published) upsertMeta('property', 'article:published_time', published)
      if (modified) upsertMeta('property', 'article:modified_time', modified)
    }

    // JSON-LD structured data
    const existing = document.head.querySelectorAll('script[data-seo-jsonld="1"]')
    existing.forEach((n) => n.remove())
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      for (const block of blocks) {
        const s = document.createElement('script')
        s.type = 'application/ld+json'
        s.setAttribute('data-seo-jsonld', '1')
        s.textContent = JSON.stringify(block)
        document.head.appendChild(s)
      }
    }
  }, [fullTitle, description, keywords, url, type, ogImage, jsonLd, published, modified])

  return null
}

// Reusable schema builders
export function breadcrumb(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE.url + it.path,
    })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchema(name: string, description: string, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    areaServed: { '@type': 'Country', name: 'Thailand' },
    url: SITE.url + path,
  }
}
