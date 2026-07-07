import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { Seo, breadcrumb, SITE } from '../components/Seo'
import { Section, Reveal } from '../components/Section'
import { BLOG_POSTS } from '../content/blog'

export default function Blog() {
  const [featured, ...rest] = BLOG_POSTS

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'บทความ MASS',
    url: SITE.url + '/blog',
    inLanguage: 'th-TH',
    blogPost: BLOG_POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: SITE.url + '/blog/' + p.slug,
      datePublished: p.date,
    })),
  }

  return (
    <div>
      <Seo
        title="บทความและเคล็ดลับ — MASS RIDE & DELIVERY"
        description="รวมบทความ เคล็ดลับ และความรู้เกี่ยวกับบริการสั่งอาหาร เรียกรถ ส่งพัสดุ และซื้อของกับ MASS ซูเปอร์แอปสัญชาติไทย"
        path="/blog"
        keywords="บทความ MASS, เคล็ดลับสั่งอาหาร, บล็อกเดลิเวอรี"
        jsonLd={[jsonLd, breadcrumb([{ name: 'บทความ', path: '/blog' }])]}
      />

      {/* header */}
      <header className="relative overflow-hidden bg-ink-gradient text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mass-500/25 blur-3xl" />
        <div className="container-mass relative py-14 sm:py-20">
          <span className="eyebrow !bg-white/10 !text-mass-300">📝 บทความ</span>
          <h1 className="mt-4 max-w-2xl text-balance text-3xl font-extrabold leading-tight sm:text-5xl">
            บทความและเคล็ดลับจาก MASS
          </h1>
          <p className="mt-4 max-w-xl text-[17px] text-ink-100">
            ความรู้ เคล็ดลับ และเรื่องน่าสนใจเกี่ยวกับบริการเดลิเวอรี การเดินทาง และการใช้ชีวิตให้ง่ายขึ้นกับ MASS
          </p>
        </div>
      </header>

      <Section>
        {/* featured post */}
        <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-card lg:grid-cols-2"
          >
            <div className="overflow-hidden">
              <img
                src={featured.cover}
                alt={featured.coverAlt}
                loading="lazy"
                className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-mass-50 px-3 py-1 text-xs font-bold text-mass-600">
                {featured.category}
              </span>
              <h2 className="text-balance font-display text-2xl font-bold text-ink-900 group-hover:text-mass-600 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-500">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-sm text-ink-400">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {featured.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  อ่าน {featured.readMins} นาที
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-mass-600">
                อ่านบทความ
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link
                to={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.coverAlt}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 inline-flex w-fit items-center rounded-full bg-mass-50 px-2.5 py-0.5 text-[11px] font-bold text-mass-600">
                    {p.category}
                  </span>
                  <h3 className="font-display text-[18px] font-bold leading-snug text-ink-900 group-hover:text-mass-600">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-500 line-clamp-3">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 border-t border-ink-100 pt-3 text-xs text-ink-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {p.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {p.readMins} นาที
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  )
}
