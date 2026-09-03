import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react'
import { Seo, breadcrumb, faqSchema, SITE } from '../components/Seo'
import { Section, Reveal, SectionHeading } from '../components/Section'
import { HeroPhoto } from '../components/ui'
import { FaqAccordion } from '../components/Article'
import { useI18n } from '../i18n/I18nContext'
import { IMG } from '../lib/images'
import { cx } from '../lib/ui'

const EMAIL = 'info@massridedelivery.com'
const PHONE = '0892616445'
const PHONE_DISPLAY = '089-261-6445'
const LINE_ID = '@massride'
const LINE_URL = 'https://line.me/R/ti/p/@massride'
const ADDRESS_TH = '42/42 ซอยขวัญเรือน ถนนศรีโสธรตัดใหม่ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000'
const ADDRESS_EN = '42/42 Soi Khwan Ruean, Sri Sothon Tat Mai Rd, Na Mueang, Mueang Chachoengsao, Chachoengsao 24000, Thailand'

const TOPICS_TH = [
  'สอบถามบริการสั่งอาหาร (MASS Food)',
  'สอบถามบริการเรียกรถ (MASS Ride)',
  'สอบถามบริการส่งพัสดุ (MASS Messenger)',
  'สอบถามบริการซื้อของ (MASS Mart)',
  'สมัครเป็นไรเดอร์ / ร้านค้าพาร์ทเนอร์',
  'ติดต่อฝ่ายธุรกิจ (Business)',
  'แจ้งปัญหาการใช้งาน',
  'อื่น ๆ',
]
const TOPICS_EN = [
  'Food delivery enquiry (MASS Food)',
  'Ride enquiry (MASS Ride)',
  'Parcel enquiry (MASS Messenger)',
  'Shopping enquiry (MASS Mart)',
  'Become a rider / merchant partner',
  'Contact the business team',
  'Report a problem',
  'Other',
]

const FAQS_TH = [
  { q: 'MASS ให้บริการพื้นที่ไหนบ้าง?', a: 'MASS ขยายพื้นที่ให้บริการอย่างต่อเนื่องทั่วประเทศไทย ครอบคลุมทั้งในเมืองและปริมณฑล ตรวจสอบพื้นที่ให้บริการล่าสุดได้ในแอป MASS' },
  { q: 'ต้องการความช่วยเหลือเรื่องออเดอร์ ติดต่ออย่างไร?', a: 'สำหรับปัญหาเกี่ยวกับออเดอร์ที่กำลังดำเนินอยู่ แนะนำให้ติดต่อผ่านแอป MASS โดยตรงเพื่อความรวดเร็ว หรือส่งอีเมลมาที่ ' + EMAIL + ' พร้อมหมายเลขออเดอร์' },
  { q: 'สนใจสมัครเป็นไรเดอร์หรือเปิดร้านกับ MASS ทำอย่างไร?', a: 'กรอกใบสมัครได้ที่หน้า "ร่วมงานกับเรา" ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง หรือกรอกแบบฟอร์มติดต่อด้านล่างแล้วเลือกหัวข้อ "สมัครเป็นไรเดอร์ / ร้านค้าพาร์ทเนอร์"' },
  { q: 'MASS ดูแลความปลอดภัยอย่างไร?', a: 'ไรเดอร์และคนขับทุกคนผ่านการตรวจสอบและยืนยันตัวตน มีระบบติดตามการเดินทางแบบเรียลไทม์ และปุ่มขอความช่วยเหลือฉุกเฉิน (SOS) ในแอปตลอด 24 ชั่วโมง' },
]
const FAQS_EN = [
  { q: 'Which areas does MASS serve?', a: 'MASS is continuously expanding coverage across Thailand, in cities and surrounding areas. Check the latest service areas in the MASS app.' },
  { q: 'How do I get help with an order?', a: 'For issues with an order in progress, we recommend contacting us directly in the MASS app for the fastest response, or email ' + EMAIL + ' with your order number.' },
  { q: 'How do I become a rider or list my store with MASS?', a: 'Apply on the "Partner with us" page — our team will get back to you within 24 hours — or use the contact form below and select "Become a rider / merchant partner".' },
  { q: 'How does MASS handle safety?', a: 'All riders and drivers are screened and identity-verified, with real-time trip tracking and an in-app emergency (SOS) button available 24/7.' },
]

export default function Support() {
  const { lang } = useI18n()
  const th = lang === 'th'
  const TOPICS = th ? TOPICS_TH : TOPICS_EN
  const FAQS = th ? FAQS_TH : FAQS_EN
  const ADDRESS = th ? ADDRESS_TH : ADDRESS_EN

  const [form, setForm] = useState({ name: '', email: '', topicIndex: 0, message: '' })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, boolean> = {}
    if (!form.name.trim()) errs.name = true
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = true
    if (!form.message.trim()) errs.message = true
    setErrors(errs)
    if (Object.keys(errs).length) return

    const topic = TOPICS[form.topicIndex]
    const subject = th ? `[ติดต่อจากเว็บไซต์] ${topic}` : `[Website contact] ${topic}`
    const body = th
      ? `ชื่อ: ${form.name}\nอีเมล: ${form.email}\nหัวข้อ: ${topic}\n\nข้อความ:\n${form.message}`
      : `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${topic}\n\nMessage:\n${form.message}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div>
      <Seo
        title={th ? 'ติดต่อเรา / ศูนย์ช่วยเหลือ — MASS RIDE & DELIVERY' : 'Contact / Help Center — MASS RIDE & DELIVERY'}
        description={
          th
            ? 'ติดต่อ MASS RIDE & DELIVERY — สอบถามบริการสั่งอาหาร เรียกรถ ส่งพัสดุ ซื้อของ สมัครเป็นพาร์ทเนอร์ หรือแจ้งปัญหาการใช้งาน อีเมล info@massridedelivery.com'
            : 'Contact MASS RIDE & DELIVERY — enquire about food, ride, parcel and shopping services, become a partner, or report an issue. Email info@massridedelivery.com'
        }
        path="/support"
        keywords={th ? 'ติดต่อ MASS, ศูนย์ช่วยเหลือ, support' : 'contact MASS, help center, support'}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: th ? 'ติดต่อเรา — MASS RIDE & DELIVERY' : 'Contact — MASS RIDE & DELIVERY',
            url: SITE.url + '/support',
            inLanguage: th ? 'th-TH' : 'en',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE.legalName,
            email: EMAIL,
            telephone: '+66892616445',
            url: SITE.url,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '42/42 ซอยขวัญเรือน ถนนศรีโสธรตัดใหม่ ตำบลหน้าเมือง',
              addressLocality: 'อำเภอเมืองฉะเชิงเทรา',
              addressRegion: 'ฉะเชิงเทรา',
              postalCode: '24000',
              addressCountry: 'TH',
            },
          },
          faqSchema(FAQS),
          breadcrumb([{ name: th ? 'ติดต่อเรา' : 'Contact', path: '/support' }]),
        ]}
      />

      {/* hero */}
      <header className="relative overflow-hidden bg-ink-gradient text-white">
        <HeroPhoto src={IMG.cafe} className="opacity-25 mix-blend-luminosity" />
        <div className="pointer-events-none absolute inset-0 bg-ink-900/55" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mass-500/25 blur-3xl" />
        <div className="container-mass relative py-14 sm:py-20">
          <span className="eyebrow !bg-white/10 !text-mass-300">💬 {th ? 'ศูนย์ช่วยเหลือ' : 'Help Center'}</span>
          <h1 className="mt-4 max-w-2xl text-balance text-3xl font-extrabold leading-tight sm:text-5xl">
            {th ? 'ติดต่อเรา' : 'Contact us'}
          </h1>
          <p className="mt-4 max-w-xl text-[17px] text-ink-100">
            {th
              ? 'มีคำถามเกี่ยวกับบริการ อยากร่วมงานกับเรา หรือต้องการความช่วยเหลือ? ทีมงาน MASS พร้อมดูแลคุณ'
              : 'Questions about our services, want to partner with us, or need help? The MASS team is here for you.'}
          </p>
        </div>
      </header>

      {/* contact channels */}
      <Section className="!pb-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard icon={Mail} title={th ? 'อีเมล' : 'Email'} desc={th ? 'ตอบกลับภายใน 24 ชั่วโมง' : 'We reply within 24 hours'}>
            <a href={`mailto:${EMAIL}`} className="font-semibold text-mass-600 hover:text-mass-700">
              {EMAIL}
            </a>
          </ContactCard>
          <ContactCard icon={Phone} title={th ? 'โทรศัพท์' : 'Phone'} desc={th ? 'โทรได้ในเวลาทำการ' : 'Call during service hours'}>
            <a href={`tel:${PHONE}`} className="font-semibold text-mass-600 hover:text-mass-700">
              {PHONE_DISPLAY}
            </a>
          </ContactCard>
          <ContactCard icon={MessageSquare} title="LINE" desc={th ? 'แอดไลน์เพื่อสอบถาม' : 'Add us on LINE'}>
            <a href={LINE_URL} target="_blank" rel="noreferrer" className="font-semibold text-mass-600 hover:text-mass-700">
              {LINE_ID}
            </a>
          </ContactCard>
          <ContactCard icon={MessageCircle} title={th ? 'ในแอป MASS' : 'In the MASS app'} desc={th ? 'เร็วที่สุดสำหรับปัญหาออเดอร์' : 'Fastest for order issues'}>
            <span className="text-ink-700">{th ? 'แชทกับฝ่ายช่วยเหลือได้ในแอปตลอด 24 ชม.' : 'Chat with support in the app, 24/7.'}</span>
          </ContactCard>
          <ContactCard icon={Clock} title={th ? 'เวลาให้บริการ' : 'Service hours'} desc={th ? 'ฝ่ายช่วยเหลือลูกค้า' : 'Customer support'}>
            <span className="text-ink-700">{th ? 'ทุกวัน 08:00 – 22:00 น.' : 'Daily 08:00 – 22:00'}</span>
          </ContactCard>
          <ContactCard icon={MapPin} title={th ? 'ที่อยู่บริษัท' : 'Company address'} desc={th ? 'สำนักงานใหญ่' : 'Head office'}>
            <span className="text-ink-700">{ADDRESS}</span>
          </ContactCard>
          <ContactCard icon={Building2} title={th ? 'ข้อมูลบริษัท' : 'Company details'} desc={th ? 'นิติบุคคล' : 'Legal entity'}>
            <span className="text-ink-700">
              {SITE.legalName}
              <br />
              {th ? 'เลขทะเบียน 0245569003051' : 'Reg. no. 0245569003051'}
            </span>
          </ContactCard>
          <ContactCard icon={Send} title={th ? 'โซเชียลมีเดีย' : 'Social media'} desc={th ? 'ติดตามข่าวสารและโปรโมชัน' : 'Follow news & promotions'}>
            <span className="flex gap-2">
              {[Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-ink-50 text-ink-700 transition-colors hover:bg-mass-500 hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </span>
          </ContactCard>
        </div>
      </Section>

      {/* contact form */}
      <Section className="!pt-0">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-4xl bg-white shadow-card ring-1 ring-ink-100">
          <div className="bg-mass-gradient p-8 text-white">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{th ? 'ส่งข้อความถึงเรา' : 'Send us a message'}</h2>
            <p className="mt-2 text-white/90">{th ? 'กรอกแบบฟอร์มด้านล่าง ทีมงานจะติดต่อกลับโดยเร็วที่สุด' : "Fill in the form below and our team will get back to you as soon as possible."}</p>
          </div>

          {sent ? (
            <div className="flex flex-col items-center px-8 py-16 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-go-100 text-4xl">✉️</div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">{th ? 'เปิดอีเมลให้แล้ว!' : 'Your email is ready!'}</h3>
              <p className="mt-2 max-w-md text-[15px] text-ink-500">
                {th ? 'โปรแกรมอีเมลของคุณจะเปิดขึ้นพร้อมข้อความที่กรอก — กดส่งเพื่อติดต่อเรา หรือส่งตรงมาที่ ' : 'Your email app will open with your message — hit send to reach us, or email us directly at '}
                <a href={`mailto:${EMAIL}`} className="font-semibold text-mass-600">{EMAIL}</a>
              </p>
              <button onClick={() => setSent(false)} className="btn-ghost btn-lg mt-6">
                {th ? 'กรอกใหม่อีกครั้ง' : 'Fill in again'}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5 p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={th ? 'ชื่อ–นามสกุล' : 'Full name'} error={errors.name} errorMsg={th ? 'กรุณากรอกข้อมูล' : 'Required'}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={th ? 'เช่น สมชาย ใจดี' : 'e.g. Somchai J.'}
                    className={inputCls(errors.name)}
                  />
                </Field>
                <Field label={th ? 'อีเมล' : 'Email'} error={errors.email} errorMsg={th ? 'อีเมลไม่ถูกต้อง' : 'Invalid email'}>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className={inputCls(errors.email)}
                  />
                </Field>
              </div>
              <Field label={th ? 'หัวข้อที่ต้องการติดต่อ' : 'Topic'}>
                <select
                  value={form.topicIndex}
                  onChange={(e) => setForm({ ...form, topicIndex: Number(e.target.value) })}
                  className={cx(inputCls(false), 'bg-white')}
                >
                  {TOPICS.map((t, i) => (
                    <option key={i} value={i}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={th ? 'ข้อความ' : 'Message'} error={errors.message} errorMsg={th ? 'กรุณากรอกข้อมูล' : 'Required'}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder={th ? 'รายละเอียดที่ต้องการสอบถาม...' : 'Tell us what you need...'}
                  className={cx(inputCls(errors.message), 'resize-y')}
                />
              </Field>
              <button className="btn-primary btn-lg w-full">
                <Send className="h-5 w-5" />
                {th ? 'ส่งข้อความ' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-ink-50/50 !pt-0">
        <Reveal>
          <SectionHeading eyebrow={th ? 'คำถามที่พบบ่อย' : 'FAQ'} title={th ? 'คำถามที่พบบ่อย' : 'Frequently asked questions'} center />
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion faqs={FAQS} />
        </div>
        <p className="mt-8 text-center text-[15px] text-ink-500">
          {th ? 'ยังไม่เจอคำตอบ? ' : "Didn't find your answer? "}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-mass-600">
            {th ? 'ส่งอีเมลหาเรา' : 'Email us'}
          </a>{' '}
          {th ? 'หรือดู ' : 'or read '}
          <Link to="/blog" className="font-semibold text-mass-600">
            {th ? 'บทความช่วยเหลือ' : 'our articles'}
          </Link>
        </p>
      </Section>

      {/* quick links */}
      <Section className="!pt-0">
        <div className="flex flex-col items-center gap-5 rounded-4xl bg-ink-gradient px-6 py-12 text-center text-white">
          <h2 className="text-balance text-2xl font-bold sm:text-3xl">{th ? 'อยากร่วมงานกับ MASS?' : 'Want to partner with MASS?'}</h2>
          <p className="max-w-xl text-white/90">{th ? 'สมัครเป็นไรเดอร์ ร้านค้าพาร์ทเนอร์ หรือปรึกษาโซลูชันสำหรับองค์กร' : 'Become a rider or merchant partner, or explore solutions for your organisation.'}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/partner" className="btn-primary btn-lg">
              {th ? 'ร่วมงานกับเรา' : 'Partner with us'}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/business" className="btn bg-white/15 btn-lg text-white hover:bg-white/25">
              {th ? 'สำหรับธุรกิจ' : 'For business'}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}

/* --------------------------- helpers --------------------------- */
function ContactCard({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: typeof Mail
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <Reveal>
      <div className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mass-50 text-mass-600">
          <Icon className="h-6 w-6" strokeWidth={2.1} />
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{title}</h3>
        <p className="text-[13px] text-ink-400">{desc}</p>
        <div className="mt-3 text-[15px] leading-relaxed">{children}</div>
      </div>
    </Reveal>
  )
}

function inputCls(error?: boolean) {
  return cx(
    'w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-colors focus:ring-4 focus:ring-mass-500/10',
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
      {error && <p className="mt-1 text-xs font-medium text-red-500">{errorMsg ?? 'Required'}</p>}
    </div>
  )
}
