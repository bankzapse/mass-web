import { Link } from 'react-router-dom'

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="massLogoG" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5347" />
          <stop offset="0.5" stopColor="#E4002B" />
          <stop offset="1" stopColor="#A80E37" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#massLogoG)" />
      <path
        d="M15 45V21c0-1.2 1.5-1.8 2.3-.9L30 33.5c1.1 1.2 3 1.2 4.1 0L46.7 20.1c.8-.9 2.3-.3 2.3.9V45"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="45" r="4.5" fill="white" />
    </svg>
  )
}

export function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="MASS RIDE & DELIVERY home">
      <span className="transition-transform group-hover:scale-105 group-active:scale-95">
        <LogoMark />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[19px] font-extrabold tracking-tight ${
            variant === 'light' ? 'text-white' : 'text-ink-900'
          }`}
        >
          MASS
        </span>
        <span
          className={`text-[9.5px] font-semibold uppercase tracking-[0.18em] ${
            variant === 'light' ? 'text-white/70' : 'text-mass-500'
          }`}
        >
          Ride &amp; Delivery
        </span>
      </span>
    </Link>
  )
}
