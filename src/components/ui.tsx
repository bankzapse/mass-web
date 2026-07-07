import { useState } from 'react'
import { Star } from 'lucide-react'
import { cx, hashString } from '../lib/ui'

/**
 * Cover art. Draws a gradient + emoji (always available) and, when `src` is
 * given, layers a real photo on top. If the photo fails to load it is hidden
 * and the gradient+emoji fallback shows through — layout never breaks.
 */
export function Cover({
  emoji,
  gradient,
  src,
  alt = '',
  overlay = false,
  className,
  size = 'text-6xl',
  rounded = 'rounded-2xl',
}: {
  emoji: string
  gradient: string
  src?: string
  alt?: string
  overlay?: boolean
  className?: string
  size?: string
  rounded?: string
}) {
  const [failed, setFailed] = useState(false)
  const showImg = !!src && !failed
  return (
    <div
      className={cx('relative overflow-hidden grid place-items-center', rounded, className)}
      style={{ background: gradient }}
    >
      {/* soft light blobs */}
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/25 blur-xl" />
      <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-black/10 blur-xl" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
      <span className={cx('relative drop-shadow-sm', size)}>{emoji}</span>
      {showImg && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {showImg && overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      )}
    </div>
  )
}

/** Decorative full-bleed hero photo that self-hides if it fails to load. */
export function HeroPhoto({ src, className }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setFailed(true)}
      className={cx('pointer-events-none absolute inset-0 h-full w-full object-cover', className)}
    />
  )
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1', className)}>
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      <span className="font-semibold text-ink-900">{rating.toFixed(1)}</span>
    </span>
  )
}

export function SpiceLevel({ level }: { level?: number }) {
  if (!level) return null
  return (
    <span className="inline-flex" title={`Spicy ${level}/3`} aria-label={`Spicy level ${level}`}>
      {Array.from({ length: level }).map((_, i) => (
        <span key={i} className="text-xs">
          🌶️
        </span>
      ))}
    </span>
  )
}

/** Deterministic faux-QR that looks like a real QR code (no external calls). */
export function FauxQR({ size = 132, seed = 'mass-app' }: { size?: number; seed?: string }) {
  const N = 21
  const cell = size / N
  const h = hashString(seed)
  const cells: JSX.Element[] = []
  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7)
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (isFinder(r, c)) continue
      // pseudo-random fill
      const on = ((h >> ((r * N + c) % 30)) ^ (r * 7 + c * 13)) % 3 === 0
      if (on)
        cells.push(
          <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} rx={cell * 0.2} />,
        )
    }
  }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={cell * 7} height={cell * 7} rx={cell * 1.6} className="fill-ink-900" />
      <rect x={cell} y={cell} width={cell * 5} height={cell * 5} rx={cell} className="fill-white" />
      <rect x={cell * 2} y={cell * 2} width={cell * 3} height={cell * 3} rx={cell * 0.8} className="fill-ink-900" />
    </g>
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl">
      <rect width={size} height={size} className="fill-white" />
      <g className="fill-ink-900">{cells}</g>
      <Finder x={0} y={0} />
      <Finder x={cell * (N - 7)} y={0} />
      <Finder x={0} y={cell * (N - 7)} />
    </svg>
  )
}

export function AppBadges({ className, light = false }: { className?: string; light?: boolean }) {
  const base = light
    ? 'bg-white text-ink-900 hover:bg-white/90'
    : 'bg-ink-900 text-white hover:bg-ink-800'
  return (
    <div className={cx('flex flex-wrap gap-3', className)}>
      <a href="#download" className={cx('flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors shadow-soft', base)}>
        <AppleLogo />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] opacity-80">Download on the</span>
          <span className="text-[15px] font-semibold -mt-0.5">App Store</span>
        </span>
      </a>
      <a href="#download" className={cx('flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors shadow-soft', base)}>
        <PlayLogo />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] opacity-80">GET IT ON</span>
          <span className="text-[15px] font-semibold -mt-0.5">Google Play</span>
        </span>
      </a>
    </div>
  )
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d="M17.05 12.04c-.03-2.7 2.2-3.99 2.3-4.06-1.25-1.83-3.2-2.08-3.9-2.11-1.66-.17-3.24.98-4.08.98-.84 0-2.14-.96-3.52-.93-1.81.03-3.48 1.05-4.41 2.67-1.88 3.27-.48 8.1 1.35 10.76.89 1.3 1.96 2.76 3.36 2.71 1.35-.05 1.86-.87 3.49-.87 1.63 0 2.09.87 3.52.84 1.45-.03 2.37-1.33 3.26-2.63 1.03-1.51 1.45-2.97 1.47-3.05-.03-.01-2.82-1.08-2.85-4.28zM14.37 4.2c.74-.9 1.24-2.15 1.1-3.4-1.07.04-2.36.71-3.13 1.6-.69.79-1.29 2.06-1.13 3.27 1.19.09 2.42-.61 3.16-1.47z" />
    </svg>
  )
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path d="M3.6 2.3c-.2.2-.35.55-.35 1v17.4c0 .45.15.8.35 1l.1.1L13 12.1v-.2L3.7 2.2l-.1.1z" fill="#00D0FF" />
      <path d="M16.3 15.3 13 12.1v-.2l3.3-3.2.07.04 3.9 2.22c1.12.63 1.12 1.67 0 2.31l-3.9 2.22-.07.03z" fill="#FFD400" />
      <path d="M16.37 15.26 13 12 3.6 21.7c.37.4.98.44 1.66.06l11.1-6.5z" fill="#FF3D47" />
      <path d="M16.37 8.74 5.26 2.24c-.68-.39-1.29-.34-1.66.06L13 12l3.37-3.26z" fill="#00E676" />
    </svg>
  )
}
