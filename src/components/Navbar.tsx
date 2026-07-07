import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { useI18n } from '../i18n/I18nContext'
import { SERVICES } from '../data/services'
import { getIcon } from '../lib/icons'
import { cx } from '../lib/ui'

export function Navbar() {
  const { t, lang, toggle } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks = [
    { to: '/food', label: t('nav.food') },
    { to: '/ride', label: t('nav.ride') },
    { to: '/messenger', label: t('nav.messenger') },
    { to: '/mart', label: t('nav.mart') },
    { to: '/blog', label: t('nav.blog') },
  ]

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-soft ring-1 ring-ink-100/60' : 'bg-white/0',
      )}
    >
      <nav className="container-mass flex h-[76px] items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {/* Services mega-menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900"
                onClick={() => setServicesOpen((v) => !v)}
              >
                {t('nav.services')}
                <ChevronDown className={cx('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-0 top-full w-[560px] pt-3"
                  >
                    <div className="grid grid-cols-2 gap-1.5 rounded-3xl border border-ink-100 bg-white p-3 shadow-card">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.key}
                          to={s.to}
                          className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-ink-50"
                        >
                          <span
                            className="grid h-11 w-11 flex-none place-items-center rounded-xl text-white shadow-soft"
                            style={{ background: s.gradient }}
                          >
                            {(() => {
                              const Icon = getIcon(s.key)
                              return <Icon className="h-[22px] w-[22px]" strokeWidth={2.1} />
                            })()}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[15px] font-semibold text-ink-900">
                              {t(s.nameKey)}
                            </span>
                            <span className="block text-[13px] leading-snug text-ink-400">
                              {t(s.descKey)}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cx(
                    'rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors',
                    isActive ? 'bg-mass-50 text-mass-700' : 'text-ink-700 hover:bg-ink-50 hover:text-ink-900',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/partner"
              className={({ isActive }) =>
                cx(
                  'rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors',
                  isActive ? 'bg-mass-50 text-mass-700' : 'text-ink-700 hover:bg-ink-50 hover:text-ink-900',
                )
              }
            >
              {t('nav.partner')}
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggle}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 sm:flex"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {lang === 'th' ? 'ไทย' : 'EN'}
          </button>

          <Link to="/business" className="hidden text-sm font-semibold text-ink-700 hover:text-ink-900 md:block">
            <span className="rounded-full px-3 py-2 transition-colors hover:bg-ink-50">{t('nav.business')}</span>
          </Link>

          <a href="#download" className="btn-primary btn-md hidden sm:inline-flex">
            {t('nav.signup')}
          </a>

          <button
            onClick={() => setMobileOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink-800 hover:bg-ink-50 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="fixed right-0 top-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink-50"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                  {t('nav.all_services')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.key}
                      to={s.to}
                      className="flex flex-col gap-2 rounded-2xl border border-ink-100 p-3.5 hover:bg-ink-50"
                    >
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl text-white"
                        style={{ background: s.gradient }}
                      >
                        {(() => {
                          const Icon = getIcon(s.key)
                          return <Icon className="h-5 w-5" strokeWidth={2.1} />
                        })()}
                      </span>
                      <span className="text-sm font-semibold text-ink-900">{t(s.nameKey)}</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-5 space-y-1">
                  {[
                    { to: '/blog', label: t('nav.blog') },
                    { to: '/partner', label: t('nav.partner') },
                    { to: '/business', label: t('nav.business') },
                  ].map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block rounded-xl px-3 py-3 text-[15px] font-medium text-ink-800 hover:bg-ink-50"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-ink-100 p-4">
                <button
                  onClick={toggle}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 py-3 text-sm font-semibold text-ink-800"
                >
                  <Globe className="h-4 w-4" />
                  {lang === 'th' ? 'เปลี่ยนเป็น English' : 'เปลี่ยนเป็น ไทย'}
                </button>
                <a href="#download" className="btn-primary btn-lg w-full">
                  {t('nav.signup')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
