import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  Bike,
  Building2,
  Car,
  CheckCircle2,
  Clock,
  CreditCard,
  Leaf,
  MapPin,
  MessageSquareText,
  MousePointerClick,
  Package,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sprout,
  Store,
  Tag,
  Truck,
  UtensilsCrossed,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { cx } from './ui'

/** Name → lucide icon component. Used by data-driven sections. */
export const ICONS: Record<string, LucideIcon> = {
  // services
  food: UtensilsCrossed,
  ride: Bike,
  messenger: Package,
  mart: ShoppingCart,
  grocery: Sprout,
  pay: Wallet,
  // generic
  bike: Bike,
  car: Car,
  store: Store,
  building: Building2,
  wallet: Wallet,
  bag: ShoppingBag,
  truck: Truck,
  fast: Zap,
  clock: Clock,
  shield: ShieldCheck,
  card: CreditCard,
  pin: MapPin,
  chat: MessageSquareText,
  leaf: Leaf,
  receipt: ReceiptText,
  tag: Tag,
  users: Users,
  check: CheckCircle2,
  verified: BadgeCheck,
  phone: Smartphone,
  tap: MousePointerClick,
}

export function getIcon(name?: string): LucideIcon {
  return (name && ICONS[name]) || Zap
}

type BadgeVariant = 'gradient' | 'tint' | 'dark' | 'glass'
type BadgeSize = 'sm' | 'md' | 'lg'

const SIZES: Record<BadgeSize, { box: string; icon: string; radius: string }> = {
  sm: { box: 'h-10 w-10', icon: 'h-5 w-5', radius: 'rounded-xl' },
  md: { box: 'h-14 w-14', icon: 'h-7 w-7', radius: 'rounded-2xl' },
  lg: { box: 'h-16 w-16', icon: 'h-8 w-8', radius: 'rounded-2xl' },
}

/** Consistent, polished icon container. */
export function IconBadge({
  icon,
  variant = 'tint',
  size = 'md',
  gradient,
  className,
}: {
  icon: LucideIcon
  variant?: BadgeVariant
  size?: BadgeSize
  gradient?: string
  className?: string
}) {
  const Icon = icon
  const s = SIZES[size]
  const base = cx('grid place-items-center', s.box, s.radius, className)

  if (variant === 'gradient') {
    return (
      <span
        className={cx(base, 'text-white shadow-lift')}
        style={{ background: gradient ?? 'linear-gradient(135deg,#FF5347,#E4002B)' }}
      >
        <Icon className={s.icon} strokeWidth={2} />
      </span>
    )
  }
  if (variant === 'dark') {
    return (
      <span className={cx(base, 'bg-ink-900 text-white')}>
        <Icon className={s.icon} strokeWidth={2} />
      </span>
    )
  }
  if (variant === 'glass') {
    return (
      <span className={cx(base, 'bg-white/10 text-white ring-1 ring-white/15 backdrop-blur')}>
        <Icon className={s.icon} strokeWidth={2} />
      </span>
    )
  }
  // tint (default): brand-red icon on soft tint
  return (
    <span className={cx(base, 'bg-mass-50 text-mass-600')}>
      <Icon className={s.icon} strokeWidth={2.1} />
    </span>
  )
}
