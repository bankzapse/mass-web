// Non-fatal prerender: after the client build, render the static legal/policy
// routes to real HTML so store reviewers & crawlers see content on curl/view-source.
// If anything fails, we warn and exit 0 so the SPA build still deploys fine.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const distDir = join(root, 'dist')
const serverDir = join(root, 'dist-server')

try {
  // Build the SSR bundle for entry-server.
  execSync('npx vite build --ssr src/entry-server.tsx --outDir dist-server', {
    cwd: root,
    stdio: 'inherit',
  })

  const mod = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href)
  const render = mod.render || mod.default?.render
  const routes = mod.ROUTES || mod.default?.ROUTES || []
  if (typeof render !== 'function' || routes.length === 0) {
    throw new Error('entry-server did not export render/ROUTES')
  }

  const template = readFileSync(join(distDir, 'index.html'), 'utf-8')
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('could not find <div id="root"></div> in dist/index.html')
  }

  for (const route of routes) {
    const appHtml = render(route)
    if (!appHtml) {
      console.warn(`[prerender] empty output for ${route} — skipped`)
      continue
    }
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    const outFile = join(distDir, route.replace(/^\//, ''), 'index.html')
    mkdirSync(dirname(outFile), { recursive: true })
    writeFileSync(outFile, html)
    console.log(`[prerender] wrote ${route} -> ${outFile.replace(root + '/', '')}`)
  }

  // Clean up the temporary SSR bundle.
  rmSync(serverDir, { recursive: true, force: true })
  console.log('[prerender] done')
} catch (err) {
  console.warn('[prerender] skipped (non-fatal):', err?.message || err)
  // Best-effort cleanup; never fail the build.
  try {
    rmSync(serverDir, { recursive: true, force: true })
  } catch {
    // ignore
  }
  process.exit(0)
}
