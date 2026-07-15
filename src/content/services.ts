// Content is stored in services.json so it can be edited via the /admin CMS
// (and by hand on GitHub). This module just adds types + lookup helpers.
import data from './services.json'

export interface Faq {
  q: string
  a: string
}

export interface ArticleSection {
  h: string
  body: string
  bullets?: string[]
  img?: string
  imgAlt?: string
}

export interface ServiceArticle {
  slug: string
  path: string
  emoji: string
  eyebrow: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string
  heroImage: string
  heroAlt: string
  intro: string
  highlights: { icon: string; h: string; body: string }[]
  steps: { h: string; body: string }[]
  sections: ArticleSection[]
  faq: Faq[]
}

export const SERVICES_CONTENT = data as unknown as ServiceArticle[]

export function getService(slug: string): ServiceArticle | undefined {
  return SERVICES_CONTENT.find((s) => s.slug === slug)
}
