import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, ExternalLink, KeyRound, Loader2, LogOut, RefreshCw, Save } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Logo } from '../components/Logo'
import { cx } from '../lib/ui'

/* ----------------------------- config ----------------------------- */
const OWNER = 'bankzapse'
const REPO = 'mass-web'
const BRANCH = 'main'
const API = 'https://api.github.com'
const TOKEN_KEY = 'mass-gh-token'
const PATHS = {
  services: 'src/content/services.json',
  blog: 'src/content/blog.json',
}

/* --------------------------- utf-8 base64 -------------------------- */
function b64ToUtf8(b64: string): string {
  const bin = atob(b64.replace(/\n/g, ''))
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
function utf8ToB64(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

interface FileState {
  data: any[]
  sha: string
  original: string
}

/* ------------------------------ page ------------------------------ */
export default function Admin() {
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) || '')
  const [tokenInput, setTokenInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'saving'>('idle')
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [tab, setTab] = useState<'services' | 'blog'>('services')
  const [services, setServices] = useState<FileState | null>(null)
  const [blog, setBlog] = useState<FileState | null>(null)

  const headers = useCallback(
    () => ({
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }),
    [token],
  )

  const loadFile = useCallback(
    async (path: string): Promise<FileState> => {
      const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, {
        headers: headers(),
      })
      if (!res.ok) throw new Error(`โหลด ${path} ไม่สำเร็จ (${res.status})`)
      const json = await res.json()
      const text = b64ToUtf8(json.content)
      return { data: JSON.parse(text), sha: json.sha, original: text }
    },
    [headers],
  )

  const loadAll = useCallback(async () => {
    if (!token) return
    setStatus('loading')
    setMsg(null)
    try {
      const [s, b] = await Promise.all([loadFile(PATHS.services), loadFile(PATHS.blog)])
      setServices(s)
      setBlog(b)
      setStatus('ready')
    } catch (e: any) {
      setStatus('idle')
      setMsg({ ok: false, text: e.message || 'เกิดข้อผิดพลาด — token อาจไม่ถูกต้อง' })
    }
  }, [token, loadFile])

  useEffect(() => {
    if (token) loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  function connect(e: React.FormEvent) {
    e.preventDefault()
    const t = tokenInput.trim()
    if (!t) return
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken('')
    setServices(null)
    setBlog(null)
    setStatus('idle')
  }

  async function saveFile(path: string, file: FileState, setter: (f: FileState) => void) {
    const content = JSON.stringify(file.data, null, 2) + '\n'
    if (content === file.original) return { changed: false, ok: true }
    const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message: `content: แก้ไขเนื้อหาผ่าน /admin (${path.split('/').pop()})`,
        content: utf8ToB64(content),
        sha: file.sha,
        branch: BRANCH,
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(`บันทึก ${path} ไม่สำเร็จ (${res.status}) ${err.message || ''}`)
    }
    const json = await res.json()
    setter({ ...file, sha: json.content.sha, original: content })
    return { changed: true, ok: true }
  }

  async function saveAll() {
    if (!services || !blog) return
    setStatus('saving')
    setMsg(null)
    try {
      const r1 = await saveFile(PATHS.services, services, setServices)
      const r2 = await saveFile(PATHS.blog, blog, setBlog)
      const changed = r1.changed || r2.changed
      setStatus('ready')
      setMsg({
        ok: true,
        text: changed
          ? '✅ บันทึกแล้ว! Vercel กำลัง deploy — เว็บจะอัปเดตใน ~1 นาที'
          : 'ไม่มีการเปลี่ยนแปลงให้บันทึก',
      })
    } catch (e: any) {
      setStatus('ready')
      setMsg({ ok: false, text: e.message || 'บันทึกไม่สำเร็จ' })
    }
  }

  const updateServices = (i: number, mutate: (s: any) => void) =>
    setServices((prev) => {
      if (!prev) return prev
      const data = structuredClone(prev.data)
      mutate(data[i])
      return { ...prev, data }
    })
  const updateBlog = (i: number, mutate: (p: any) => void) =>
    setBlog((prev) => {
      if (!prev) return prev
      const data = structuredClone(prev.data)
      mutate(data[i])
      return { ...prev, data }
    })

  const dirty =
    (services && JSON.stringify(services.data, null, 2) + '\n' !== services.original) ||
    (blog && JSON.stringify(blog.data, null, 2) + '\n' !== blog.original)

  /* ------------------------- not connected ------------------------- */
  if (!token) {
    return (
      <div className="container-mass max-w-xl py-16">
        <Seo title="Admin — จัดการเนื้อหา" description="ระบบจัดการเนื้อหาเว็บไซต์ MASS" path="/admin" noindex />
        <div className="rounded-4xl border border-ink-100 bg-white p-8 shadow-card">
          <Logo />
          <h1 className="mt-6 font-display text-2xl font-bold text-ink-900">เข้าสู่ระบบจัดการเนื้อหา</h1>
          <p className="mt-2 text-[15px] text-ink-500">
            วาง GitHub Personal Access Token เพื่อแก้ไขข้อความบนเว็บ (เก็บไว้ในเบราว์เซอร์นี้เท่านั้น
            ไม่ถูกส่งไปที่อื่นนอกจาก GitHub)
          </p>
          <form onSubmit={connect} className="mt-6">
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink-700">
              <KeyRound className="h-4 w-4" /> GitHub Token
            </label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="github_pat_..."
              className="w-full rounded-xl border border-ink-200 px-4 py-3 text-[15px] outline-none focus:border-mass-400 focus:ring-4 focus:ring-mass-500/10"
            />
            <button className="btn-primary btn-lg mt-4 w-full">เชื่อมต่อ</button>
          </form>
          {msg && !msg.ok && (
            <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-500">
              <AlertCircle className="h-4 w-4" /> {msg.text}
            </p>
          )}
          <div className="mt-6 rounded-2xl bg-ink-50 p-4 text-[13px] leading-relaxed text-ink-500">
            <p className="font-semibold text-ink-700">วิธีสร้าง Token (ครั้งเดียว):</p>
            <ol className="mt-1.5 list-decimal space-y-1 pl-4">
              <li>
                ไปที่{' '}
                <a
                  href="https://github.com/settings/personal-access-tokens/new"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-0.5 font-semibold text-mass-600"
                >
                  Fine-grained token <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>Repository access → Only select repositories → เลือก <b>bankzapse/mass-web</b></li>
              <li>Permissions → Repository → <b>Contents</b> = <b>Read and write</b></li>
              <li>Generate token → คัดลอกมาวางด้านบน</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  /* --------------------------- connected --------------------------- */
  return (
    <div className="min-h-screen bg-ink-50/40">
      <Seo title="Admin — จัดการเนื้อหา" description="ระบบจัดการเนื้อหาเว็บไซต์ MASS" path="/admin" noindex />

      {/* top bar */}
      <div className="sticky top-[76px] z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="container-mass flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-mass-500 px-2 py-1 text-xs font-bold text-white">ADMIN</span>
            <div className="hidden gap-1 sm:flex">
              {(['services', 'blog'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cx(
                    'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                    tab === t ? 'bg-mass-50 text-mass-700' : 'text-ink-500 hover:bg-ink-50',
                  )}
                >
                  {t === 'services' ? 'บริการ' : 'บทความบล็อก'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadAll} className="btn-ghost btn-sm" title="โหลดใหม่">
              <RefreshCw className={cx('h-4 w-4', status === 'loading' && 'animate-spin')} />
            </button>
            <button onClick={saveAll} disabled={status === 'saving' || !dirty} className="btn-primary btn-md">
              {status === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              บันทึก{dirty ? ' •' : ''}
            </button>
            <button onClick={logout} className="btn-ghost btn-sm" title="ออกจากระบบ">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-mass py-6">
        {msg && (
          <div
            className={cx(
              'mb-5 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium',
              msg.ok ? 'bg-go-50 text-go-700' : 'bg-red-50 text-red-600',
            )}
          >
            {msg.ok ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {msg.text}
          </div>
        )}

        {status === 'loading' && (
          <div className="flex items-center gap-2 py-20 text-ink-500">
            <Loader2 className="h-5 w-5 animate-spin" /> กำลังโหลดเนื้อหา...
          </div>
        )}

        {/* mobile tab switch */}
        <div className="mb-5 flex gap-1 sm:hidden">
          {(['services', 'blog'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cx(
                'flex-1 rounded-full px-4 py-2 text-sm font-semibold',
                tab === t ? 'bg-mass-500 text-white' : 'bg-white text-ink-500 ring-1 ring-ink-200',
              )}
            >
              {t === 'services' ? 'บริการ' : 'บทความ'}
            </button>
          ))}
        </div>

        {tab === 'services' && services && (
          <div className="space-y-4">
            {services.data.map((s, i) => (
              <Card key={s.slug} title={`${s.emoji} ${s.eyebrow}`} subtitle={s.title}>
                <Field label="ชื่อหัวข้อ (H1)" value={s.title} onChange={(v) => updateServices(i, (x) => (x.title = v))} />
                <Field label="Meta Title (SEO)" value={s.metaTitle} onChange={(v) => updateServices(i, (x) => (x.metaTitle = v))} />
                <Field label="Meta Description (SEO)" value={s.metaDescription} onChange={(v) => updateServices(i, (x) => (x.metaDescription = v))} multiline />
                <Field label="เกริ่นนำ (Intro)" value={s.intro} onChange={(v) => updateServices(i, (x) => (x.intro = v))} multiline />

                <Group title="จุดเด่น">
                  {s.highlights.map((h: any, j: number) => (
                    <Row key={j}>
                      <Field label="หัวข้อ" value={h.h} onChange={(v) => updateServices(i, (x) => (x.highlights[j].h = v))} />
                      <Field label="รายละเอียด" value={h.body} onChange={(v) => updateServices(i, (x) => (x.highlights[j].body = v))} multiline />
                    </Row>
                  ))}
                </Group>

                <Group title="ขั้นตอนการใช้งาน">
                  {s.steps.map((st: any, j: number) => (
                    <Row key={j}>
                      <Field label="หัวข้อ" value={st.h} onChange={(v) => updateServices(i, (x) => (x.steps[j].h = v))} />
                      <Field label="รายละเอียด" value={st.body} onChange={(v) => updateServices(i, (x) => (x.steps[j].body = v))} multiline />
                    </Row>
                  ))}
                </Group>

                <Group title="เนื้อหา (Sections)">
                  {s.sections.map((sec: any, j: number) => (
                    <Row key={j}>
                      <Field label="หัวข้อ" value={sec.h} onChange={(v) => updateServices(i, (x) => (x.sections[j].h = v))} />
                      <Field label="เนื้อหา" value={sec.body} onChange={(v) => updateServices(i, (x) => (x.sections[j].body = v))} multiline />
                      {sec.bullets && (
                        <Field
                          label="รายการย่อย (บรรทัดละ 1 ข้อ)"
                          value={sec.bullets.join('\n')}
                          onChange={(v) => updateServices(i, (x) => (x.sections[j].bullets = v.split('\n')))}
                          multiline
                        />
                      )}
                    </Row>
                  ))}
                </Group>

                <Group title="คำถามที่พบบ่อย (FAQ)">
                  {s.faq.map((f: any, j: number) => (
                    <Row key={j}>
                      <Field label="คำถาม" value={f.q} onChange={(v) => updateServices(i, (x) => (x.faq[j].q = v))} />
                      <Field label="คำตอบ" value={f.a} onChange={(v) => updateServices(i, (x) => (x.faq[j].a = v))} multiline />
                    </Row>
                  ))}
                </Group>
              </Card>
            ))}
          </div>
        )}

        {tab === 'blog' && blog && (
          <div className="space-y-4">
            {blog.data.map((p, i) => (
              <Card key={p.slug} title={`📝 ${p.category}`} subtitle={p.title}>
                <Field label="ชื่อบทความ (H1)" value={p.title} onChange={(v) => updateBlog(i, (x) => (x.title = v))} />
                <Field label="Meta Description (SEO)" value={p.metaDescription} onChange={(v) => updateBlog(i, (x) => (x.metaDescription = v))} multiline />
                <Field label="สรุปย่อ (Excerpt)" value={p.excerpt} onChange={(v) => updateBlog(i, (x) => (x.excerpt = v))} multiline />
                <Field label="เกริ่นนำ (Intro)" value={p.intro} onChange={(v) => updateBlog(i, (x) => (x.intro = v))} multiline />
                <Group title="เนื้อหา (Sections)">
                  {p.sections.map((sec: any, j: number) => (
                    <Row key={j}>
                      <Field label="หัวข้อ" value={sec.h} onChange={(v) => updateBlog(i, (x) => (x.sections[j].h = v))} />
                      <Field label="เนื้อหา" value={sec.body} onChange={(v) => updateBlog(i, (x) => (x.sections[j].body = v))} multiline />
                      {sec.bullets && (
                        <Field
                          label="รายการย่อย (บรรทัดละ 1 ข้อ)"
                          value={sec.bullets.join('\n')}
                          onChange={(v) => updateBlog(i, (x) => (x.sections[j].bullets = v.split('\n')))}
                          multiline
                        />
                      )}
                    </Row>
                  ))}
                </Group>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* --------------------------- UI helpers --------------------------- */
function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <details className="group overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 hover:bg-ink-50/50">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-mass-500">{title}</p>
          <p className="truncate font-display text-lg font-bold text-ink-900">{subtitle}</p>
        </div>
        <span className="text-ink-400 transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="space-y-4 border-t border-ink-100 p-6">{children}</div>
    </details>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-ink-50/50 p-4">
      <p className="mb-3 text-sm font-bold text-ink-700">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2 rounded-xl bg-white p-3 ring-1 ring-ink-100">{children}</div>
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-semibold text-ink-600">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(8, Math.max(2, Math.ceil(value.length / 60)))}
          className="w-full resize-y rounded-xl border border-ink-200 px-3.5 py-2.5 text-[15px] leading-relaxed outline-none focus:border-mass-400 focus:ring-4 focus:ring-mass-500/10"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-[15px] outline-none focus:border-mass-400 focus:ring-4 focus:ring-mass-500/10"
        />
      )}
    </label>
  )
}
