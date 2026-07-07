import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, DollarSign, LineChart, Rocket, ShieldCheck } from 'lucide-react'
import { Reveal, Section, SectionHeading } from '../components/Section'
import { Cover, HeroPhoto } from '../components/ui'
import { Seo, breadcrumb } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'
import { gradientFor, cx } from '../lib/ui'
import { IMG } from '../lib/images'

const ROLES = [
  { key: 'rider', emoji: '🛵', labelKey: 'partner.role_rider' },
  { key: 'driver', emoji: '🚗', labelKey: 'partner.role_driver' },
  { key: 'merchant', emoji: '🏪', labelKey: 'partner.role_merchant' },
  { key: 'business', emoji: '🏢', labelKey: 'partner.role_business' },
] as const

export default function Partner() {
  const { t, lang } = useI18n()
  const [role, setRole] = useState<string>('rider')
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', msg: '' })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const cards = [
    { key: 'rider', emoji: '🛵', t: t('partner.rider_t'), d: t('partner.rider_d'), stat: ['฿30,000+', lang === 'th' ? 'รายได้เฉลี่ย/เดือน' : 'avg/month'] },
    { key: 'merchant', emoji: '🏪', t: t('partner.merchant_t'), d: t('partner.merchant_d'), stat: ['+3x', lang === 'th' ? 'ยอดขายเฉลี่ย' : 'avg sales'] },
    { key: 'biz', emoji: '🏢', t: t('partner.biz_t'), d: t('partner.biz_d'), stat: ['8M+', lang === 'th' ? 'ผู้ใช้งาน' : 'users'] },
  ]

  const benefits = [
    { icon: DollarSign, t: lang === 'th' ? 'รายได้ดี ถอนไว' : 'Great pay, fast payouts', d: lang === 'th' ? 'ถอนเงินได้ทันทีทุกวัน ไม่มีขั้นต่ำ' : 'Cash out daily, no minimum' },
    { icon: Rocket, t: lang === 'th' ? 'เริ่มง่ายใน 3 วัน' : 'Start in 3 days', d: lang === 'th' ? 'สมัคร อบรม แล้วเริ่มรับงานได้เลย' : 'Sign up, train and start earning' },
    { icon: ShieldCheck, t: lang === 'th' ? 'มีประกันดูแล' : 'Insurance included', d: lang === 'th' ? 'คุ้มครองอุบัติเหตุระหว่างทำงาน' : 'Accident cover while you work' },
    { icon: LineChart, t: lang === 'th' ? 'เครื่องมือครบ' : 'Powerful tools', d: lang === 'th' ? 'แดชบอร์ดจัดการออเดอร์และยอดขาย' : 'Dashboard for orders & sales' },
  ]

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, boolean> = {}
    if (!form.name.trim()) errs.name = true
    if (!/^[0-9]{9,10}$/.test(form.phone.replace(/[-\s]/g, ''))) errs.phone = true
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = true
    if (!form.city.trim()) errs.city = true
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  return (
    <div>
      <Seo
        title="ร่วมงานกับ MASS — สมัครเป็นไรเดอร์ ร้านค้า และพาร์ทเนอร์"
        description="ร่วมเป็นพาร์ทเนอร์กับ MASS ไม่ว่าจะเป็นไรเดอร์ ร้านอาหาร ร้านค้า หรือองค์กร สร้างรายได้และเติบโตไปกับซูเปอร์แอปสัญชาติไทย สมัครง่าย ทีมงานติดต่อกลับใน 24 ชม."
        path="/partner"
        keywords="สมัครไรเดอร์ MASS, เปิดร้านบน MASS, พาร์ทเนอร์ MASS, ร่วมงานกับ MASS"
        jsonLd={breadcrumb([{ name: 'ร่วมงานกับเรา', path: '/partner' }])}
      />
      {/* hero */}
      <div className="relative overflow-hidden bg-mass-gradient text-white">
        <HeroPhoto src={IMG.rider} className="opacity-20 mix-blend-luminosity" />
        <div className="pointer-events-none absolute inset-0 bg-mass-900/30" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="container-mass relative grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <span className="eyebrow !bg-white/15 !text-white">💼 {t('partner.hero_badge')}</span>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight sm:text-6xl">
              {t('partner.hero_title')}
            </h1>
            <p className="mt-4 max-w-md text-[17px] text-white/90">{t('partner.hero_sub')}</p>
            <div className="mt-7 flex flex-wrap gap-6">
              {[['250K+', lang === 'th' ? 'ไรเดอร์' : 'riders'], ['120K+', lang === 'th' ? 'ร้านค้า' : 'merchants'], ['฿0', lang === 'th' ? 'ค่าสมัคร' : 'to join']].map((s) => (
                <div key={s[1]}>
                  <p className="text-3xl font-extrabold">{s[0]}</p>
                  <p className="text-sm text-white/80">{s[1]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden justify-center lg:flex">
            <div className="grid grid-cols-2 gap-4">
              {['🛵', '🏪', '🚗', '📦'].map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={cx('grid h-28 w-28 place-items-center rounded-3xl bg-white/15 text-5xl backdrop-blur', i % 2 !== 0 && 'translate-y-6')}
                >
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* opportunity cards */}
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08}>
              <div className="flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-ink-100 shadow-soft">
                <Cover emoji={c.emoji} gradient={gradientFor(c.key + 'p')} rounded="rounded-none" className="aspect-[16/9] text-6xl" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-ink-900">{c.t}</h3>
                  <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-ink-500">{c.d}</p>
                  <div className="mt-4 flex items-baseline gap-2 border-t border-ink-100 pt-4">
                    <span className="text-2xl font-extrabold text-mass-600">{c.stat[0]}</span>
                    <span className="text-sm text-ink-400">{c.stat[1]}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* benefits */}
      <Section className="!pt-0">
        <Reveal>
          <SectionHeading eyebrow="Why partner with us" title={lang === 'th' ? 'สิทธิประโยชน์ของพาร์ทเนอร์' : 'Partner benefits'} center />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-mass-50 text-mass-600">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{b.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* application form */}
      <Section className="!pt-0">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-4xl bg-white shadow-card ring-1 ring-ink-100">
          <div className="bg-ink-gradient p-8 text-white">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('partner.form_title')}</h2>
            <p className="mt-2 text-ink-200">{t('partner.form_sub')}</p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center px-8 py-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="grid h-24 w-24 place-items-center rounded-full bg-go-100"
              >
                <CheckCircle2 className="h-14 w-14 text-go-500" />
              </motion.div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">
                {lang === 'th' ? 'ส่งใบสมัครสำเร็จ!' : 'Application sent!'}
              </h3>
              <p className="mt-2 max-w-md text-[15px] text-ink-500">{t('partner.success')}</p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', phone: '', email: '', city: '', msg: '' })
                }}
                className="btn-ghost btn-lg mt-6"
              >
                {lang === 'th' ? 'ส่งอีกใบ' : 'Submit another'}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5 p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink-700">{t('partner.f_role')}</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ROLES.map((r) => (
                    <button
                      type="button"
                      key={r.key}
                      onClick={() => setRole(r.key)}
                      className={cx(
                        'flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all',
                        role === r.key ? 'border-mass-500 bg-mass-50 ring-2 ring-mass-500/20' : 'border-ink-200 hover:border-ink-300',
                      )}
                    >
                      <span className="text-2xl">{r.emoji}</span>
                      <span className="text-xs font-semibold text-ink-700">{t(r.labelKey)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t('partner.f_name')} error={errors.name} errorMsg={lang === 'th' ? 'กรุณากรอกชื่อ' : 'Required'}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={lang === 'th' ? 'เช่น สมชาย ใจดี' : 'e.g. Somchai J.'}
                    className={inputCls(errors.name)}
                  />
                </Field>
                <Field label={t('partner.f_phone')} error={errors.phone} errorMsg={lang === 'th' ? 'เบอร์ไม่ถูกต้อง' : 'Invalid phone'}>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="08X-XXX-XXXX"
                    className={inputCls(errors.phone)}
                  />
                </Field>
                <Field label={t('partner.f_email')} error={errors.email} errorMsg={lang === 'th' ? 'อีเมลไม่ถูกต้อง' : 'Invalid email'}>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className={inputCls(errors.email)}
                  />
                </Field>
                <Field label={t('partner.f_city')} error={errors.city} errorMsg={lang === 'th' ? 'กรุณาเลือกจังหวัด' : 'Required'}>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder={lang === 'th' ? 'กรุงเทพฯ' : 'Bangkok'}
                    className={inputCls(errors.city)}
                  />
                </Field>
              </div>

              <Field label={t('partner.f_msg')}>
                <textarea
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  rows={3}
                  placeholder={lang === 'th' ? 'บอกเราเพิ่มเติมเกี่ยวกับคุณ...' : 'Tell us more about you...'}
                  className={cx(inputCls(false), 'resize-none')}
                />
              </Field>

              <button className="btn-primary btn-lg w-full">{t('partner.f_submit')}</button>
              <p className="text-center text-xs text-ink-400">
                {lang === 'th'
                  ? 'เมื่อกดส่ง ถือว่ายอมรับข้อกำหนดและนโยบายความเป็นส่วนตัวของ MASS'
                  : 'By submitting you agree to MASS Terms & Privacy Policy'}
              </p>
            </form>
          )}
        </div>
      </Section>
    </div>
  )
}

function inputCls(error?: boolean) {
  return cx(
    'w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:ring-4 focus:ring-mass-500/10',
    error ? 'border-red-400 focus:border-red-400' : 'border-ink-200 focus:border-mass-400',
  )
}

function Field({
  label,
  error,
  errorMsg,
  children,
}: {
  label: string
  error?: boolean
  errorMsg?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink-700">{label}</label>
      {children}
      {error && errorMsg && <p className="mt-1 text-xs font-medium text-red-500">{errorMsg}</p>}
    </div>
  )
}
