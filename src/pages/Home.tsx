import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Sparkles,
  Timer,
  Wallet,
} from 'lucide-react'
import { Seo, SITE } from '../components/Seo'
import { Section, Reveal, SectionHeading } from '../components/Section'
import { AppBadges } from '../components/ui'
import { SERVICES_CONTENT } from '../content/services'
import { BLOG_POSTS } from '../content/blog'
import { STATS, TESTIMONIALS } from '../data/misc'
import { IMG } from '../lib/images'
import { getIcon, IconBadge } from '../lib/icons'

export default function Home() {
  return (
    <>
      <Seo
        title="MASS RIDE & DELIVERY — สั่งอาหาร เรียกรถ ส่งพัสดุ ซื้อของ ครบในแอปเดียว"
        description="MASS RIDE & DELIVERY ซูเปอร์แอปสัญชาติไทย บริการสั่งอาหารเดลิเวอรี เรียกรถ ส่งพัสดุด่วน และซื้อของเข้าบ้าน รวดเร็ว ปลอดภัย ราคาคุ้มค่า ครบจบในแอปเดียว"
        path="/"
        keywords="MASS, สั่งอาหาร, เรียกรถ, ส่งพัสดุ, ซื้อของออนไลน์, ซูเปอร์แอป, เดลิเวอรี, ฉะเชิงเทรา"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: SITE.name,
          url: SITE.url,
          inLanguage: 'th-TH',
          about: 'บริการสั่งอาหาร เรียกรถ ส่งพัสดุ และซื้อของ',
        }}
      />
      <Hero />
      <StatsStrip />
      <ServicesOverview />
      <HowItWorks />
      <WhyChoose />
      <BlogTeasers />
      <Testimonials />
      <PartnerTeaser />
    </>
  )
}

/* --------------------------------- HERO --------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-mass-100/60 blur-3xl" />
      <div className="container-mass relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            <Sparkles className="h-4 w-4" />
            ซูเปอร์แอปสัญชาติไทย
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-balance text-[2.6rem] font-extrabold leading-[1.05] text-ink-900 sm:text-6xl"
          >
            ทุกบริการที่คุณต้องการ
            <br />
            <span className="text-gradient">ครบจบในแอปเดียว</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500"
          >
            MASS RIDE & DELIVERY รวมบริการ<strong className="font-semibold text-ink-700">สั่งอาหาร เรียกรถ
            ส่งพัสดุ และซื้อของ</strong> ไว้ในแอปเดียว รวดเร็ว ปลอดภัย ราคาคุ้มค่า
            พร้อมดูแลคนไทยในทุกวัน
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col gap-5"
          >
            <AppBadges />
            <p className="flex items-center gap-2 text-sm text-ink-500">
              <BadgeCheck className="h-4 w-4 text-go-500" />
              ได้รับความไว้วางใจจากคนไทยกว่า 8 ล้านคนทั่วประเทศ
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-ink-100">
            <img
              src={IMG.heroSpread}
              alt="บริการหลากหลายของ MASS ทั้งอาหาร การเดินทาง และการจัดส่ง"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -left-5 bottom-8 hidden animate-float-mid rounded-2xl bg-white p-4 shadow-card sm:block">
            <p className="text-xs text-ink-400">ส่งไวเฉลี่ย</p>
            <p className="text-xl font-bold text-mass-600">20 นาที 🛵</p>
          </div>
          <div className="absolute -right-4 top-8 hidden animate-float-slow rounded-2xl bg-white p-4 shadow-card sm:block">
            <p className="flex items-center gap-1.5 text-sm font-bold text-ink-900">⭐ 4.9 / 5</p>
            <p className="text-xs text-ink-400">จากผู้ใช้จริง</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------ STATS STRIP ----------------------------- */
function StatsStrip() {
  return (
    <div className="container-mass -mt-2 pb-6">
      <Reveal>
        <div className="grid grid-cols-2 gap-4 rounded-4xl bg-white p-6 shadow-card ring-1 ring-ink-100 sm:grid-cols-4 sm:p-8">
          {STATS.map((s) => {
            const Icon = getIcon(statIcon(s.labelKey))
            return (
              <div key={s.labelKey} className="flex flex-col items-center text-center">
                <span className="mb-2.5 grid h-10 w-10 place-items-center rounded-full bg-mass-50 text-mass-600">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <p className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{s.value}</p>
                <p className="mt-0.5 text-sm text-ink-400">{statLabel(s.labelKey)}</p>
              </div>
            )
          })}
        </div>
      </Reveal>
    </div>
  )
}
function statLabel(key: string) {
  return (
    {
      'hero.stat_users': 'ผู้ใช้งาน',
      'hero.stat_partners': 'ร้านค้าพาร์ทเนอร์',
      'hero.stat_riders': 'ไรเดอร์',
      'hero.stat_cities': 'จังหวัดทั่วไทย',
    }[key] ?? key
  )
}
function statIcon(key: string) {
  return (
    {
      'hero.stat_users': 'users',
      'hero.stat_partners': 'store',
      'hero.stat_riders': 'bike',
      'hero.stat_cities': 'pin',
    }[key] ?? 'verified'
  )
}

/* --------------------------- SERVICES OVERVIEW -------------------------- */
function ServicesOverview() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="บริการของเรา"
          title="บริการครบครัน ในแอปเดียว"
          subtitle="ไม่ว่าจะหิว จะเดินทาง จะส่งของ หรืออยากซื้อของเข้าบ้าน MASS พร้อมดูแลคุณในทุกวัน"
          center
        />
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {SERVICES_CONTENT.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 2) * 0.08}>
            <Link
              to={s.path}
              className="group grid overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card sm:grid-cols-[42%_1fr]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={s.heroImage}
                  alt={s.heroAlt}
                  loading="lazy"
                  className="h-full min-h-[160px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-mass-600 shadow-soft backdrop-blur">
                  {(() => {
                    const Icon = getIcon(s.slug)
                    return <Icon className="h-6 w-6" strokeWidth={2.1} />
                  })()}
                </span>
              </div>
              <div className="flex flex-col p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-mass-500">{s.eyebrow}</span>
                <h3 className="mt-1 font-display text-xl font-bold text-ink-900 group-hover:text-mass-600">
                  {s.title.replace('บริการ', '').trim()}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500 line-clamp-3">{s.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mass-600">
                  ดูรายละเอียด
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------------------- HOW IT WORKS ------------------------------ */
function HowItWorks() {
  const steps = [
    { n: '1', icon: 'phone', h: 'ดาวน์โหลดแอป MASS', d: 'ติดตั้งฟรีทั้งบน App Store และ Google Play สมัครง่ายในไม่กี่ขั้นตอน' },
    { n: '2', icon: 'tap', h: 'เลือกบริการที่ต้องการ', d: 'สั่งอาหาร เรียกรถ ส่งพัสดุ หรือซื้อของ เลือกได้ทั้งหมดจากหน้าจอเดียว' },
    { n: '3', icon: 'check', h: 'รับบริการอย่างอุ่นใจ', d: 'ติดตามสถานะแบบเรียลไทม์ ชำระเงินสะดวก และรับบริการที่รวดเร็วปลอดภัย' },
  ]
  return (
    <Section className="bg-ink-50/50">
      <Reveal>
        <SectionHeading eyebrow="วิธีใช้งาน" title="เริ่มต้นใช้งานง่าย ๆ ใน 3 ขั้นตอน" center />
      </Reveal>
      <div className="relative mt-12 grid gap-6 md:grid-cols-3">
        <div className="absolute left-1/2 top-9 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-mass-200 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div className="relative flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center ring-1 ring-ink-100 shadow-soft">
              <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-mass-gradient text-white shadow-lift">
                {(() => {
                  const Icon = getIcon(s.icon)
                  return <Icon className="h-8 w-8" strokeWidth={2} />
                })()}
                <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-ink-900 text-xs font-bold text-white ring-4 ring-white">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{s.h}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ----------------------------- WHY CHOOSE ------------------------------- */
function WhyChoose() {
  const feats = [
    { icon: Timer, h: 'รวดเร็วทันใจ', d: 'ระบบจับคู่อัจฉริยะและเครือข่ายไรเดอร์จำนวนมาก ช่วยให้ทุกบริการถึงมือคุณอย่างรวดเร็ว' },
    { icon: ShieldCheck, h: 'ปลอดภัยมั่นใจ', d: 'ไรเดอร์และร้านค้าผ่านการตรวจสอบ พร้อมระบบติดตามและความคุ้มครองในทุกบริการ' },
    { icon: Wallet, h: 'ราคาคุ้มค่า', d: 'ราคาโปร่งใสตั้งแต่ก่อนยืนยัน ไม่มีค่าใช้จ่ายแอบแฝง พร้อมโปรโมชันให้เลือกอยู่เสมอ' },
    { icon: MapPin, h: 'ครอบคลุมทั่วไทย', d: 'ให้บริการครอบคลุมทั้งในเมืองและปริมณฑล และขยายพื้นที่อย่างต่อเนื่อง' },
  ]
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="eyebrow mb-3">ทำไมต้อง MASS</span>
            <h2 className="text-balance text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              ซูเปอร์แอปที่ออกแบบมาเพื่อคนไทย
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-500">
              MASS เข้าใจไลฟ์สไตล์และความต้องการของคนไทย เราจึงรวมบริการที่จำเป็นในชีวิตประจำวันไว้ในแอปเดียว
              พร้อมใส่ใจทั้งความรวดเร็ว ความปลอดภัย และความคุ้มค่า เพื่อให้ทุกวันของคุณง่ายขึ้น
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {feats.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-mass-50 text-mass-600">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-ink-900">{f.h}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            <img src={IMG.rider} alt="ไรเดอร์ MASS จัดส่งอาหาร" loading="lazy" className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
            <img src={IMG.grocery} alt="ซื้อของกับ MASS Mart" loading="lazy" className="mt-8 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ----------------------------- BLOG TEASERS ----------------------------- */
function BlogTeasers() {
  const posts = BLOG_POSTS.slice(0, 3)
  return (
    <Section className="bg-ink-50/50">
      <Reveal>
        <SectionHeading
          eyebrow="บทความล่าสุด"
          title="ความรู้และเคล็ดลับจาก MASS"
          action={
            <Link to="/blog" className="btn-ghost btn-md">
              ดูบทความทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link
              to={`/blog/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <img
                src={p.cover}
                alt={p.coverAlt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-flex w-fit items-center rounded-full bg-mass-50 px-2.5 py-0.5 text-[11px] font-bold text-mass-600">
                  {p.category}
                </span>
                <h3 className="font-display text-[17px] font-bold leading-snug text-ink-900 group-hover:text-mass-600">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-500 line-clamp-2">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {p.dateLabel}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ----------------------------- TESTIMONIALS ----------------------------- */
function Testimonials() {
  return (
    <Section>
      <Reveal>
        <SectionHeading eyebrow="เสียงจากผู้ใช้จริง" title="คนไทยไว้วางใจ MASS" center />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((tm, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-ink-100 shadow-soft">
              <div className="flex gap-0.5 text-lg">{'⭐'.repeat(tm.rating)}</div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">“{tm.quote[0]}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mass-50 text-2xl">{tm.emoji}</span>
                <span>
                  <span className="block font-bold text-ink-900">{tm.name[0]}</span>
                  <span className="block text-[13px] text-ink-400">{tm.role[0]}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------------------- PARTNER TEASER ---------------------------- */
function PartnerTeaser() {
  return (
    <Section className="!pb-8">
      <div className="grid items-center gap-10 overflow-hidden rounded-4xl bg-ink-gradient p-8 text-white sm:p-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="eyebrow !bg-white/10 !text-mass-300">ร่วมงานกับเรา</span>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl">
              เติบโตไปกับ MASS
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-200">
              ไม่ว่าคุณจะเป็นไรเดอร์ ร้านอาหาร หรือเจ้าของธุรกิจ MASS พร้อมเป็นพันธมิตรที่ช่วยให้คุณมีรายได้และเติบโตไปด้วยกัน
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/partner" className="btn-primary btn-lg">
                สมัครเป็นพาร์ทเนอร์
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/business" className="btn bg-white/10 btn-lg text-white hover:bg-white/20">
                MASS for Business
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['bike', 'เป็นไรเดอร์'],
              ['store', 'เปิดร้านบน MASS'],
              ['building', 'โซลูชันธุรกิจ'],
              ['wallet', 'รายได้ที่ยืดหยุ่น'],
            ].map(([ic, t]) => (
              <div key={t} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <IconBadge icon={getIcon(ic)} variant="glass" />
                <p className="mt-3 font-semibold">{t}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
