import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Download } from 'lucide-react'
import { Seo, breadcrumb, SITE } from '../components/Seo'
import { Section, Reveal } from '../components/Section'
import { Breadcrumbs } from '../components/Article'
import { HeroPhoto } from '../components/ui'
import { getPost, getPosts } from '../content/blog'
import { useI18n } from '../i18n/I18nContext'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const { lang } = useI18n()
  const th = lang === 'th'
  const post = getPost(slug, lang)

  if (!post) {
    return (
      <div className="container-mass py-32 text-center">
        <h1 className="text-2xl font-bold">{th ? 'ไม่พบบทความนี้' : 'Article not found'}</h1>
        <Link to="/blog" className="btn-primary btn-lg mt-6">
          {th ? 'ดูบทความทั้งหมด' : 'View all articles'}
        </Link>
      </div>
    )
  }

  const related = getPosts(lang).filter((p) => p.slug !== post.slug).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: th ? 'th-TH' : 'en',
    mainEntityOfPage: SITE.url + '/blog/' + post.slug,
    author: { '@type': 'Organization', name: SITE.legalName },
    publisher: {
      '@type': 'Organization',
      name: SITE.legalName,
      logo: { '@type': 'ImageObject', url: SITE.logo },
    },
  }

  return (
    <article>
      <Seo
        title={post.title}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        keywords={post.keywords}
        published={post.date}
        modified={post.date}
        jsonLd={[
          articleSchema,
          breadcrumb([
            { name: th ? 'บทความ' : 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* hero */}
      <header className="relative overflow-hidden bg-ink-gradient text-white">
        <HeroPhoto src={post.cover} className="opacity-30 mix-blend-luminosity" />
        <div className="pointer-events-none absolute inset-0 bg-ink-900/55" />
        <div className="container-mass relative py-14 sm:py-20">
          <Breadcrumbs trail={[{ name: th ? 'บทความ' : 'Blog', path: '/blog' }, { name: post.category, path: '/blog' }]} />
          <span className="eyebrow !bg-white/10 !text-mass-300">{post.category}</span>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-ink-100">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {post.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {th ? `อ่าน ${post.readMins} นาที` : `${post.readMins} min read`}
            </span>
          </div>
        </div>
      </header>

      {/* body */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-[19px] font-medium leading-[1.9] text-ink-700">{post.intro}</p>

          <div className="mt-8 space-y-9">
            {post.sections.map((sec, i) => (
              <section key={i}>
                <h2 className="text-balance font-display text-2xl font-bold text-ink-900">{sec.h}</h2>
                <p className="mt-3 text-[17px] leading-[1.9] text-ink-600">{sec.body}</p>
                {sec.bullets && (
                  <ul className="mt-4 space-y-2 pl-1">
                    {sec.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-[16px] text-ink-700">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-mass-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-mass-gradient p-8 text-center text-white">
            <h2 className="font-display text-xl font-bold sm:text-2xl">{th ? 'เริ่มใช้งาน MASS วันนี้' : 'Start using MASS today'}</h2>
            <p className="max-w-md text-white/90">{th ? 'ดาวน์โหลดแอปฟรี แล้วสัมผัสบริการที่ครบจบในแอปเดียว' : 'Download the free app and experience everything in one place.'}</p>
            <a href="#download" className="btn bg-white btn-lg text-mass-600 hover:bg-white/90">
              <Download className="h-5 w-5" />
              {th ? 'ดาวน์โหลดแอป' : 'Get the app'}
            </a>
          </div>

          <div className="mt-8">
            <Link to="/blog" className="inline-flex items-center gap-1.5 font-semibold text-mass-600 hover:text-mass-700">
              <ArrowLeft className="h-4 w-4" />
              {th ? 'กลับไปหน้าบทความ' : 'Back to blog'}
            </Link>
          </div>
        </div>
      </Section>

      {/* related */}
      <Section className="bg-ink-50/50 !pt-4">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-ink-900 sm:text-3xl">
          {th ? 'บทความที่เกี่ยวข้อง' : 'Related articles'}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {related.map((p, i) => (
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
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-mass-600">
                    {th ? 'อ่านต่อ' : 'Read more'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </article>
  )
}
