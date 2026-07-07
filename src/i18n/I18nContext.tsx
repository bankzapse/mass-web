import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { DICT, type Lang } from './strings'

interface I18nValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  /** Resolve a dot-path key like "nav.food" to the current language string. */
  t: (key: string) => string
  /** Pick from a [th, en] tuple directly (for data). */
  pick: (pair: readonly [string, string] | string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function resolve(key: string): readonly [string, string] | undefined {
  const parts = key.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = DICT
  for (const p of parts) {
    node = node?.[p]
    if (node === undefined) return undefined
  }
  return node as readonly [string, string]
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'th'
    return (localStorage.getItem('mass-lang') as Lang) || 'th'
  })

  useEffect(() => {
    localStorage.setItem('mass-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'th' ? 'en' : 'th')), [])

  const t = useCallback(
    (key: string) => {
      const pair = resolve(key)
      if (!pair) return key
      return lang === 'th' ? pair[0] : pair[1]
    },
    [lang],
  )

  const pick = useCallback(
    (pair: readonly [string, string] | string) => {
      if (typeof pair === 'string') return pair
      return lang === 'th' ? pair[0] : pair[1]
    },
    [lang],
  )

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t, pick }}>{children}</I18nContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
