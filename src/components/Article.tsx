import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Home } from 'lucide-react'
import { cx } from '../lib/ui'
import { useI18n } from '../i18n/I18nContext'
import type { Faq } from '../content/services'

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const { lang } = useI18n()
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 hover:text-white">
            <Home className="h-3.5 w-3.5" />
            {lang === 'th' ? 'หน้าแรก' : 'Home'}
          </Link>
        </li>
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-1.5">
            <span className="text-white/40">/</span>
            {i === trail.length - 1 ? (
              <span className="font-medium text-white" aria-current="page">
                {t.name}
              </span>
            ) : (
              <Link to={t.path} className="hover:text-white">
                {t.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Long-form readable text block. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cx('text-[17px] leading-[1.9] text-ink-600', className)}>{children}</div>
  )
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="font-display text-[17px] font-semibold text-ink-900">{f.q}</span>
                <ChevronDown
                  className={cx('h-5 w-5 flex-none text-mass-500 transition-transform', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <div
              className={cx(
                'grid transition-all duration-300',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[16px] leading-relaxed text-ink-500 sm:px-6">{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
