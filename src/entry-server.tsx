import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { I18nProvider } from './i18n/I18nContext'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import DeleteAccount from './pages/DeleteAccount'
import DriverPrivacy from './pages/DriverPrivacy'
import type { ComponentType } from 'react'

/** Routes we prerender to static HTML so store reviewers / crawlers see real content. */
const PAGES: Record<string, ComponentType> = {
  '/privacy': Privacy,
  '/merchant/privacy': Privacy,
  '/terms': Terms,
  '/merchant/terms': Terms,
  '/delete-account': DeleteAccount,
  '/mass-driver/privacy-policy': DriverPrivacy,
}

export const ROUTES = Object.keys(PAGES)

export function render(url: string): string {
  const Page = PAGES[url]
  if (!Page) return ''
  return renderToString(
    <StaticRouter location={url}>
      <I18nProvider>
        <Page />
      </I18nProvider>
    </StaticRouter>,
  )
}
