// Content is stored in services.json (Thai) + services.en.json (English) so it
// can be edited via the /admin CMS or by hand on GitHub. This module adds types
// + language-aware lookup helpers.
import dataTh from './services.json'
import dataEn from './services.en.json'

export type Lang = 'th' | 'en'

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

export const SERVICES_CONTENT = dataTh as unknown as ServiceArticle[]
export const SERVICES_CONTENT_EN = dataEn as unknown as ServiceArticle[]

export function getServices(lang: Lang = 'th'): ServiceArticle[] {
  return lang === 'en' ? SERVICES_CONTENT_EN : SERVICES_CONTENT
}

export function getService(slug: string, lang: Lang = 'th'): ServiceArticle | undefined {
  return getServices(lang).find((s) => s.slug === slug)
}
