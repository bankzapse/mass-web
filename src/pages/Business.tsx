import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Building2, CheckCircle2, CreditCard, Receipt, Users } from 'lucide-react'
import { HeroPhoto } from '../components/ui'
import { Seo, breadcrumb } from '../components/Seo'
import { Reveal, Section, SectionHeading } from '../components/Section'
import { useI18n } from '../i18n/I18nContext'
import { IMG } from '../lib/images'

export default function Business() {
  const { t, lang } = useI18n()

  const solutions = [
    { icon: Users, t: lang === 'th' ? 'อาหารพนักงาน' : 'Staff meals', d: lang === 'th' ? 'จัดสวัสดิการมื้ออาหารให้ทีม พร้อมงบที่ควบคุมได้' : 'Feed your team with controlled meal budgets' },
    { icon: Building2, t: lang === 'th' ? 'การเดินทางองค์กร' : 'Corporate rides', d: lang === 'th' ? 'จองรถให้พนักงานและลูกค้า บิลเดียวจบ' : 'Book rides for staff & clients, one invoice' },
    { icon: Receipt, t: lang === 'th' ? 'จัดการค่าใช้จ่าย' : 'Expense management', d: lang === 'th' ? 'รายงานอัตโนมัติ ลดงานเอกสารทีมบัญชี' : 'Automated reports, less paperwork' },
    { icon: CreditCard, t: lang === 'th' ? 'เครดิตองค์กร' : 'Business credit', d: lang === 'th' ? 'วงเงินกลาง จ่ายรายเดือน ไม่ต้องสำรองจ่าย' : 'Central credit, monthly billing' },
    { icon: BarChart3, t: lang === 'th' ? 'แดชบอร์ดวิเคราะห์' : 'Analytics dashboard', d: lang === 'th' ? 'เห็นทุกการใช้จ่ายแบบเรียลไทม์' : 'Real-time visibility on all spend' },
    { icon: CheckCircle2, t: lang === 'th' ? 'ดูแลระดับองค์กร' : 'Dedicated support', d: lang === 'th' ? 'ผู้จัดการบัญชีดูแลคุณโดยเฉพาะ' : 'A dedicated account manager' },
  ]

  return (
    <div>
      <Seo
        title="MASS for Business — โซลูชันอาหาร การเดินทาง และการจัดส่งสำหรับองค์กร"
        description="MASS for Business โซลูชันครบวงจรสำหรับองค์กร ทั้งอาหารพนักงาน การเดินทาง การจัดส่ง และการจัดการค่าใช้จ่าย พร้อมแดชบอร์ดและการดูแลระดับองค์กร"
        path="/business"
        keywords="MASS for Business, โซลูชันองค์กร, สวัสดิการพนักงาน, การเดินทางองค์กร"
        jsonLd={breadcrumb([{ name: 'สำหรับธุรกิจ', path: '/business' }])}
      />
      <div className="relative overflow-hidden bg-ink-gradient text-white">
        <HeroPhoto src={IMG.market} className="opacity-20 mix-blend-luminosity" />
        <div className="pointer-events-none absolute inset-0 bg-ink-900/50" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mass-500/20 blur-3xl" />
        <div className="container-mass relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow !bg-white/10 !text-mass-300">🏢 {t('business.title')}</span>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight sm:text-6xl">
              {lang === 'th' ? 'ขับเคลื่อนทีมของคุณ ด้วย MASS' : 'Power your team with MASS'}
            </h1>
            <p className="mt-4 max-w-md text-[17px] text-ink-200">{t('business.subtitle')}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary btn-lg">
                {t('business.cta')}
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link to="/partner" className="btn bg-white/10 btn-lg text-white hover:bg-white/20">
                {t('nav.partner')}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['🍱', '🚗', '📦', '💳', '📊', '🏢'].map((e, i) => (
              <div key={i} className="grid aspect-square place-items-center rounded-3xl bg-white/10 text-4xl backdrop-blur ring-1 ring-white/10">
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* trusted by */}
      <div className="border-b border-ink-100 bg-white py-10">
        <div className="container-mass">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink-400">
            {lang === 'th' ? 'ได้รับความไว้วางใจจากองค์กรชั้นนำกว่า 3,000 แห่ง' : 'Trusted by 3,000+ leading companies'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {['◆ NimbusTech', '▲ SiamCorp', '● BangkokBank+', '★ ThaiVenture', '❖ GreenLeaf', '⬢ MetroGroup'].map((n) => (
              <span key={n} className="text-lg font-bold text-ink-400">{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* solutions */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Solutions"
            title={lang === 'th' ? 'ทุกอย่างที่องค์กรต้องการ ในที่เดียว' : 'Everything your business needs'}
            center
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-mass-50 text-mass-600">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink-900">{s.t}</h3>
                <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-ink-500">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* stats band */}
      <Section className="!pt-0">
        <div className="grid gap-6 rounded-4xl bg-mass-gradient p-8 text-center text-white sm:grid-cols-3 sm:p-12">
          {[
            ['30%', lang === 'th' ? 'ประหยัดค่าใช้จ่าย' : 'cost savings'],
            ['5 ชม.', lang === 'th' ? 'ลดงานเอกสาร/สัปดาห์' : 'admin saved/week'],
            ['99.9%', lang === 'th' ? 'ความพร้อมใช้งาน' : 'uptime SLA'],
          ].map((s) => (
            <div key={s[1]}>
              <p className="text-4xl font-extrabold sm:text-5xl">{s[0]}</p>
              <p className="mt-1 text-white/85">{s[1]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* contact CTA */}
      <Section id="contact" className="!pt-0">
        <div className="mx-auto max-w-2xl rounded-4xl border border-ink-100 bg-white p-8 text-center shadow-card sm:p-12">
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            {lang === 'th' ? 'พร้อมเริ่มต้นกับ MASS for Business?' : 'Ready to get started?'}
          </h2>
          <p className="mt-3 text-[17px] text-ink-500">
            {lang === 'th' ? 'ทีมของเราพร้อมออกแบบโซลูชันที่เหมาะกับองค์กรคุณ' : 'Our team will tailor a solution for your organisation.'}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder={lang === 'th' ? 'อีเมลบริษัทของคุณ' : 'Your work email'}
              className="min-w-0 flex-1 rounded-full border border-ink-200 px-5 py-3 text-[15px] outline-none focus:border-mass-400 focus:ring-4 focus:ring-mass-500/10"
            />
            <button className="btn-primary btn-lg justify-center">{t('business.cta')}</button>
          </form>
        </div>
      </Section>
    </div>
  )
}
