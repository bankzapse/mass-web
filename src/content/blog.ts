// Content is stored in blog.json (Thai) + blog.en.json (English). This module
// adds types + language-aware lookup helpers.
import dataTh from './blog.json'
import dataEn from './blog.en.json'

export type Lang = 'th' | 'en'

export interface BlogSection {
  h: string
  body: string
  bullets?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  excerpt: string
  category: string
  cover: string
  coverAlt: string
  date: string
  dateLabel: string
  readMins: number
  keywords: string
  intro: string
  sections: BlogSection[]
}

export const BLOG_POSTS = dataTh as unknown as BlogPost[]
export const BLOG_POSTS_EN = dataEn as unknown as BlogPost[]

export function getPosts(lang: Lang = 'th'): BlogPost[] {
  return lang === 'en' ? BLOG_POSTS_EN : BLOG_POSTS
}

export function getPost(slug: string, lang: Lang = 'th'): BlogPost | undefined {
  return getPosts(lang).find((p) => p.slug === slug)
}
