import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, Download } from 'lucide-react'
import { Seo, serviceSchema, faqSchema, breadcrumb } from '../components/Seo'
import { Section, Reveal } from '../components/Section'
import { Breadcrumbs, Prose, FaqAccordion } from '../components/Article'
import { AppBadges, HeroPhoto } from '../components/ui'
import { getService } from '../content/services'
import { getIcon, IconBadge } from '../lib/icons'
import { useI18n } from '../i18n/I18nContext'
import { cx } from '../lib/ui'

export default function ServiceArticle({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const { lang } = useI18n()
  const th = lang === 'th'
  const slug = slugProp ?? params.slug ?? ''
  const s = getService(slug, lang)

  if (!s) {
    return (
      <div className="container-mass py-32 text-center">
        <h1 className="text-2xl font-bold">{th ? 'ไม่พบหน้านี้' : 'Page not found'}</h1>
        <Link to="/" className="btn-primary btn-lg mt-6">
          {th ? 'กลับหน้าแรก' : 'Back home'}
        </Link>
      </div>
    )
  }

  return (
    <article>
      <Seo
        title={s.metaTitle}
        description={s.metaDescription}
        path={s.path}
        image={s.heroImage}
        keywords={s.keywords}
        jsonLd={[
          serviceSchema(s.title, s.metaDescription, s.path),
          faqSchema(s.faq),
          breadcrumb([
            { name: th ? 'บริการ' : 'Services', path: '/#services' },
            { name: s.eyebrow, path: s.path },
          ]),
        ]}
      />

      {/* hero */}
      <header className="relative overflow-hidden bg-ink-gradient text-white">
        <HeroPhoto src={s.heroImage} className="opacity-30 mix-blend-luminosity" />
        <div className="pointer-events-none absolute inset-0 bg-ink-900/50" />
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-mass-500/25 blur-3xl" />
        <div className="container-mass relative py-14 sm:py-20">
          <Breadcrumbs trail={[{ name: s.eyebrow, path: s.path }]} />
          <span className="eyebrow !bg-white/10 !text-mass-300">
            {s.emoji} {s.eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-5xl">
            {s.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-100">{s.intro}</p>
          <div className="mt-8">
            <AppBadges light />
          </div>
        </div>
      </header>

      {/* highlights */}
      <Section className="!pb-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.highlights.map((h, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-mass-100 hover:shadow-card">
                <IconBadge icon={getIcon(h.icon)} variant="gradient" />
                <h2 className="mt-4 font-display text-lg font-bold text-ink-900">{h.h}</h2>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* how it works */}
      <Section className="!pt-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-3">{th ? 'ขั้นตอนการใช้งาน' : 'How it works'}</span>
            <h2 className="text-balance text-3xl font-bold text-ink-900 sm:text-4xl">
              {th ? `ใช้ ${s.eyebrow} ง่าย ๆ ใน 3 ขั้นตอน` : `Use ${s.eyebrow} in 3 easy steps`}
            </h2>
          </div>
        </Reveal>
        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          <div className="absolute left-1/2 top-8 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-mass-200 to-transparent md:block" />
          {s.steps.map((st, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative flex h-full flex-col items-center rounded-3xl bg-white p-7 text-center ring-1 ring-ink-100 shadow-soft">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-mass-gradient text-2xl font-bold text-white shadow-lift">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{st.h}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{st.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* article body sections (alternating) */}
      <Section className="!pt-4">
        <div className="space-y-16">
          {s.sections.map((sec, i) => (
            <Reveal key={i}>
              <div
                className={cx(
                  'grid items-center gap-8 lg:grid-cols-2 lg:gap-14',
                  sec.img && i % 2 === 1 && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <div>
                  <h2 className="text-balance text-2xl font-bold text-ink-900 sm:text-3xl">{sec.h}</h2>
                  <Prose className="mt-4">
                    <p>{sec.body}</p>
                  </Prose>
                  {sec.bullets && (
                    <ul className="mt-5 space-y-2.5">
                      {sec.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-[16px] text-ink-700">
                          <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-mass-100 text-mass-600">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {sec.img && (
                  <div className="overflow-hidden rounded-4xl shadow-card ring-1 ring-ink-100">
                    <img
                      src={sec.img}
                      alt={sec.imgAlt ?? sec.h}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-ink-50/50">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-3">{th ? 'คำถามที่พบบ่อย' : 'FAQ'}</span>
            <h2 className="text-balance text-3xl font-bold text-ink-900 sm:text-4xl">
              {th ? `คำถามที่พบบ่อยเกี่ยวกับ ${s.eyebrow}` : `Frequently asked questions about ${s.eyebrow}`}
            </h2>
          </div>
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion faqs={s.faq} />
        </div>
      </Section>

      {/* inline CTA */}
      <Section className="!pt-0">
        <div className="flex flex-col items-center gap-5 rounded-4xl bg-mass-gradient px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-balance text-2xl font-extrabold sm:text-3xl">
            {th ? `พร้อมใช้ ${s.eyebrow} แล้วหรือยัง?` : `Ready to use ${s.eyebrow}?`}
          </h2>
          <p className="max-w-xl text-[17px] text-white/90">
            {th
              ? 'ดาวน์โหลดแอป MASS วันนี้ แล้วเริ่มต้นใช้งานบริการที่ครบจบในแอปเดียว'
              : 'Download the MASS app today and start using everything in one app.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#download" className="btn bg-white btn-lg text-mass-600 hover:bg-white/90">
              <Download className="h-5 w-5" />
              {th ? 'ดาวน์โหลดแอป' : 'Get the app'}
            </a>
            <Link to="/blog" className="btn bg-white/15 btn-lg text-white hover:bg-white/25">
              {th ? 'อ่านบทความเพิ่มเติม' : 'Read more articles'}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Section>
    </article>
  )
}
