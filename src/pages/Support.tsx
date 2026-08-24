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
  Send,
} from 'lucide-react'
import { Seo, breadcrumb, faqSchema, SITE } from '../components/Seo'
import { Section, Reveal, SectionHeading } from '../components/Section'
import { HeroPhoto } from '../components/ui'
import { FaqAccordion } from '../components/Article'
import { IMG } from '../lib/images'
import { cx } from '../lib/ui'

const EMAIL = 'info@massridedelivery.com'
const ADDRESS = '42/42 ซอยขวัญเรือน ถนนศรีโสธรตัดใหม่ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000'

const TOPICS = [
  'สอบถามบริการสั่งอาหาร (MASS Food)',
  'สอบถามบริการเรียกรถ (MASS Ride)',
  'สอบถามบริการส่งพัสดุ (MASS Messenger)',
  'สอบถามบริการซื้อของ (MASS Mart)',
  'สมัครเป็นไรเดอร์ / ร้านค้าพาร์ทเนอร์',
  'ติดต่อฝ่ายธุรกิจ (Business)',
  'แจ้งปัญหาการใช้งาน',
  'อื่น ๆ',
]

const FAQS = [
  { q: 'MASS ให้บริการพื้นที่ไหนบ้าง?', a: 'MASS ขยายพื้นที่ให้บริการอย่างต่อเนื่องทั่วประเทศไทย ครอบคลุมทั้งในเมืองและปริมณฑล ตรวจสอบพื้นที่ให้บริการล่าสุดได้ในแอป MASS' },
  { q: 'ต้องการความช่วยเหลือเรื่องออเดอร์ ติดต่ออย่างไร?', a: 'สำหรับปัญหาเกี่ยวกับออเดอร์ที่กำลังดำเนินอยู่ แนะนำให้ติดต่อผ่านแอป MASS โดยตรงเพื่อความรวดเร็ว หรือส่งอีเมลมาที่ ' + EMAIL + ' พร้อมหมายเลขออเดอร์' },
  { q: 'สนใจสมัครเป็นไรเดอร์หรือเปิดร้านกับ MASS ทำอย่างไร?', a: 'กรอกใบสมัครได้ที่หน้า "ร่วมงานกับเรา" ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง หรือกรอกแบบฟอร์มติดต่อด้านล่างแล้วเลือกหัวข้อ "สมัครเป็นไรเดอร์ / ร้านค้าพาร์ทเนอร์"' },
  { q: 'MASS ดูแลความปลอดภัยอย่างไร?', a: 'ไรเดอร์และคนขับทุกคนผ่านการตรวจสอบและยืนยันตัวตน มีระบบติดตามการเดินทางแบบเรียลไทม์ และปุ่มขอความช่วยเหลือฉุกเฉิน (SOS) ในแอปตลอด 24 ชั่วโมง' },
]

export default function Support() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
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

    const subject = `[ติดต่อจากเว็บไซต์] ${form.topic}`
    const body = `ชื่อ: ${form.name}\nอีเมล: ${form.email}\nหัวข้อ: ${form.topic}\n\nข้อความ:\n${form.message}`
    // เปิดโปรแกรมอีเมลของผู้ใช้พร้อมเนื้อหาที่กรอก (ส่งจริงถึง info@)
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div>
      <Seo
        title="ติดต่อเรา / ศูนย์ช่วยเหลือ — MASS RIDE & DELIVERY"
        description="ติดต่อ MASS RIDE & DELIVERY — สอบถามบริการสั่งอาหาร เรียกรถ ส่งพัสดุ ซื้อของ สมัครเป็นพาร์ทเนอร์ หรือแจ้งปัญหาการใช้งาน อีเมล info@massridedelivery.com"
        path="/support"
        keywords="ติดต่อ MASS, ศูนย์ช่วยเหลือ, support, ติดต่อบริษัท แมส ไรด์ แอนด์ เดลิเวอรี่"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'ติดต่อเรา — MASS RIDE & DELIVERY',
            url: SITE.url + '/support',
            inLanguage: 'th-TH',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE.legalName,
            email: EMAIL,
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
          breadcrumb([{ name: 'ติดต่อเรา', path: '/support' }]),
        ]}
      />

      {/* hero */}
      <header className="relative overflow-hidden bg-ink-gradient text-white">
        <HeroPhoto src={IMG.cafe} className="opacity-25 mix-blend-luminosity" />
        <div className="pointer-events-none absolute inset-0 bg-ink-900/55" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mass-500/25 blur-3xl" />
        <div className="container-mass relative py-14 sm:py-20">
          <span className="eyebrow !bg-white/10 !text-mass-300">💬 ศูนย์ช่วยเหลือ</span>
          <h1 className="mt-4 max-w-2xl text-balance text-3xl font-extrabold leading-tight sm:text-5xl">
            ติดต่อเรา
          </h1>
          <p className="mt-4 max-w-xl text-[17px] text-ink-100">
            มีคำถามเกี่ยวกับบริการ อยากร่วมงานกับเรา หรือต้องการความช่วยเหลือ? ทีมงาน MASS พร้อมดูแลคุณ
          </p>
        </div>
      </header>

      {/* contact channels */}
      <Section className="!pb-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard icon={Mail} title="อีเมล" desc="ตอบกลับภายใน 24 ชั่วโมง">
            <a href={`mailto:${EMAIL}`} className="font-semibold text-mass-600 hover:text-mass-700">
              {EMAIL}
            </a>
          </ContactCard>
          <ContactCard icon={MessageCircle} title="ในแอป MASS" desc="เร็วที่สุดสำหรับปัญหาออเดอร์">
            <span className="text-ink-700">แชทกับฝ่ายช่วยเหลือได้ในแอปตลอด 24 ชม.</span>
          </ContactCard>
          <ContactCard icon={Clock} title="เวลาให้บริการ" desc="ฝ่ายช่วยเหลือลูกค้า">
            <span className="text-ink-700">ทุกวัน 08:00 – 22:00 น.</span>
          </ContactCard>
          <ContactCard icon={MapPin} title="ที่อยู่บริษัท" desc="สำนักงานใหญ่">
            <span className="text-ink-700">{ADDRESS}</span>
          </ContactCard>
          <ContactCard icon={Building2} title="ข้อมูลบริษัท" desc="นิติบุคคล">
            <span className="text-ink-700">
              บริษัท แมส ไรด์ แอนด์ เดลิเวอรี่ จำกัด
              <br />
              เลขทะเบียน 0245569003051
            </span>
          </ContactCard>
          <ContactCard icon={Send} title="โซเชียลมีเดีย" desc="ติดตามข่าวสารและโปรโมชัน">
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
            <h2 className="font-display text-2xl font-bold sm:text-3xl">ส่งข้อความถึงเรา</h2>
            <p className="mt-2 text-white/90">กรอกแบบฟอร์มด้านล่าง ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>
          </div>

          {sent ? (
            <div className="flex flex-col items-center px-8 py-16 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-go-100 text-4xl">✉️</div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">เปิดอีเมลให้แล้ว!</h3>
              <p className="mt-2 max-w-md text-[15px] text-ink-500">
                โปรแกรมอีเมลของคุณจะเปิดขึ้นพร้อมข้อความที่กรอก — กดส่งเพื่อติดต่อเรา หรือส่งตรงมาที่{' '}
                <a href={`mailto:${EMAIL}`} className="font-semibold text-mass-600">{EMAIL}</a>
              </p>
              <button onClick={() => setSent(false)} className="btn-ghost btn-lg mt-6">
                กรอกใหม่อีกครั้ง
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5 p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="ชื่อ–นามสกุล" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="เช่น สมชาย ใจดี"
                    className={inputCls(errors.name)}
                  />
                </Field>
                <Field label="อีเมล" error={errors.email} errorMsg="อีเมลไม่ถูกต้อง">
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className={inputCls(errors.email)}
                  />
                </Field>
              </div>
              <Field label="หัวข้อที่ต้องการติดต่อ">
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className={cx(inputCls(false), 'bg-white')}
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="ข้อความ" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="รายละเอียดที่ต้องการสอบถาม..."
                  className={cx(inputCls(errors.message), 'resize-y')}
                />
              </Field>
              <button className="btn-primary btn-lg w-full">
                <Send className="h-5 w-5" />
                ส่งข้อความ
              </button>
            </form>
          )}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-ink-50/50 !pt-0">
        <Reveal>
          <SectionHeading eyebrow="คำถามที่พบบ่อย" title="คำถามที่พบบ่อย" center />
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion faqs={FAQS} />
        </div>
        <p className="mt-8 text-center text-[15px] text-ink-500">
          ยังไม่เจอคำตอบ?{' '}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-mass-600">
            ส่งอีเมลหาเรา
          </a>{' '}
          หรือดู{' '}
          <Link to="/blog" className="font-semibold text-mass-600">
            บทความช่วยเหลือ
          </Link>
        </p>
      </Section>

      {/* quick links */}
      <Section className="!pt-0">
        <div className="flex flex-col items-center gap-5 rounded-4xl bg-ink-gradient px-6 py-12 text-center text-white">
          <h2 className="text-balance text-2xl font-bold sm:text-3xl">อยากร่วมงานกับ MASS?</h2>
          <p className="max-w-xl text-white/90">สมัครเป็นไรเดอร์ ร้านค้าพาร์ทเนอร์ หรือปรึกษาโซลูชันสำหรับองค์กร</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/partner" className="btn-primary btn-lg">
              ร่วมงานกับเรา
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/business" className="btn bg-white/15 btn-lg text-white hover:bg-white/25">
              สำหรับธุรกิจ
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
      {error && <p className="mt-1 text-xs font-medium text-red-500">{errorMsg ?? 'กรุณากรอกข้อมูล'}</p>}
    </div>
  )
}
