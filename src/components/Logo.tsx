import { Link } from 'react-router-dom'

/** MASS MOVE mark — red badge with the white speed-M (same symbol as the app). */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center overflow-hidden rounded-[27%] bg-mass-gradient shadow-sm"
      style={{ width: size, height: size }}
    >
      <img
        src="/logo-mark.png"
        alt=""
        aria-hidden
        draggable={false}
        className="h-[70%] w-[70%] object-contain"
      />
    </span>
  )
}

export function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="MASS MOVE home">
      <span className="transition-transform group-hover:scale-105 group-active:scale-95">
        <LogoMark />
      </span>
      <span className="flex items-baseline gap-1 font-display text-[20px] font-extrabold leading-none tracking-tight">
        <span className={variant === 'light' ? 'text-white' : 'text-ink-900'}>MASS</span>
        <span className="text-mass-500">MOVE</span>
      </span>
    </Link>
  )
}
