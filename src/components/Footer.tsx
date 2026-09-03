import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Facebook, Instagram, Mail, MapPin, Send, Youtube } from 'lucide-react'
import { Logo } from './Logo'
import { AppBadges } from './ui'
import { useI18n } from '../i18n/I18nContext'
import { SERVICES } from '../data/services'

export function Footer() {
  const { t, lang, setLang } = useI18n()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-gradient text-ink-100">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mass-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="container-mass relative py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-200">
              {t('footer.tagline')}
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-ink-200">
              <p className="font-semibold text-white">{t('footer.company_name')}</p>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-mass-400" />
                {t('footer.address')}
              </p>
              <p className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 flex-none text-mass-400" />
                {t('footer.reg_no')}: 0245569003051
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-none text-mass-400" />
                info@massridedelivery.com
              </p>
            </div>

            <div className="mt-6 flex gap-2.5">
              {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-mass-500"
                  aria-label="social"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <FooterCol title={t('footer.services_col')}>
              {SERVICES.slice(0, 5).map((s) => (
                <FooterLink key={s.key} to={s.to}>
                  {t(s.nameKey)}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title={t('footer.company')}>
              <FooterLink to="/business">{t('footer.about')}</FooterLink>
              <FooterLink to="/partner">{t('footer.careers')}</FooterLink>
              <FooterLink to="/">{t('footer.newsroom')}</FooterLink>
              <FooterLink to="/">{t('footer.blog')}</FooterLink>
              <FooterLink to="/business">{t('footer.for_business')}</FooterLink>
            </FooterCol>
            <FooterCol title={t('footer.support')}>
              <FooterLink to="/support">{t('footer.help_center')}</FooterLink>
              <FooterLink to="/support">{t('footer.safety_center')}</FooterLink>
              <FooterLink to="/support">{t('footer.contact')}</FooterLink>
              <FooterLink to="/">{t('footer.terms')}</FooterLink>
              <FooterLink to="/privacy">{t('footer.privacy')}</FooterLink>
              <FooterLink to="/mass-driver/privacy-policy">{t('footer.privacy_driver')}</FooterLink>
              <FooterLink to="/delete-account">{t('footer.delete_account')}</FooterLink>
            </FooterCol>
          </div>

          <div className="lg:col-span-3">
            <p className="font-display text-[15px] font-bold text-white">{t('footer.newsletter')}</p>
            {subscribed ? (
              <p className="mt-3 rounded-2xl bg-go-500/20 px-4 py-3 text-sm font-medium text-go-200">
                ✅ {t('footer.subscribed')}
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSubscribed(true)
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.email_ph')}
                  className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white outline-none placeholder:text-ink-300 focus:border-mass-400"
                />
                <button className="grid h-11 w-11 flex-none place-items-center rounded-full bg-mass-500 text-white transition-colors hover:bg-mass-600" aria-label="subscribe">
                  <Send className="h-5 w-5" />
                </button>
              </form>
            )}

            <p className="mt-6 text-sm font-semibold text-white">{t('download.title')}</p>
            <AppBadges className="mt-3" light />

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-300">
                {t('footer.lang')}
              </p>
              <div className="inline-flex rounded-full bg-white/10 p-1">
                {(['th', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                      lang === l ? 'bg-white text-ink-900' : 'text-ink-200 hover:text-white'
                    }`}
                  >
                    {l === 'th' ? 'ไทย' : 'English'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-ink-300 sm:flex-row">
          <p>
            © 2026 {t('footer.company_name')} · {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/" className="hover:text-white">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="hover:text-white">
              {t('footer.privacy')}
            </Link>
            <span className="flex items-center gap-1.5">
              🇹🇭 <span>Made in Thailand</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-[15px] font-bold text-white">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-[15px] text-ink-200 transition-colors hover:text-mass-400">
        {children}
      </Link>
    </li>
  )
}
