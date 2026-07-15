// One-time bootstrap: dump current content data to JSON so it becomes
// editable via the /admin CMS. Run: npx tsx scripts/gen-content.ts
import { writeFileSync } from 'node:fs'
import { SERVICES_CONTENT } from '../src/content/services'
import { BLOG_POSTS } from '../src/content/blog'

writeFileSync('src/content/services.json', JSON.stringify(SERVICES_CONTENT, null, 2) + '\n')
writeFileSync('src/content/blog.json', JSON.stringify(BLOG_POSTS, null, 2) + '\n')
console.log('wrote services.json (' + SERVICES_CONTENT.length + ') + blog.json (' + BLOG_POSTS.length + ')')
