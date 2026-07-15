// Content is stored in blog.json so it can be edited via the /admin CMS
// (and by hand on GitHub). This module just adds types + lookup helpers.
import data from './blog.json'

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

export const BLOG_POSTS = data as unknown as BlogPost[]

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
