// Deterministic gradient palettes so every card gets a stable, pretty cover
// without relying on external images (renders instantly, never breaks).
export const GRADIENTS = [
  'linear-gradient(135deg,#FF9B6E 0%,#FF5A1F 100%)',
  'linear-gradient(135deg,#FDBA74 0%,#F97316 100%)',
  'linear-gradient(135deg,#FCA5A5 0%,#EF4444 100%)',
  'linear-gradient(135deg,#F9A8D4 0%,#EC4899 100%)',
  'linear-gradient(135deg,#C4B5FD 0%,#8B5CF6 100%)',
  'linear-gradient(135deg,#93C5FD 0%,#3B82F6 100%)',
  'linear-gradient(135deg,#6EE7B7 0%,#10B981 100%)',
  'linear-gradient(135deg,#FDE68A 0%,#F59E0B 100%)',
  'linear-gradient(135deg,#A7F3D0 0%,#14B8A6 100%)',
  'linear-gradient(135deg,#FBCFE8 0%,#F472B6 100%)',
  'linear-gradient(135deg,#BAE6FD 0%,#0EA5E9 100%)',
  'linear-gradient(135deg,#DDD6FE 0%,#7C3AED 100%)',
]

export function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function gradientFor(seed: string): string {
  return GRADIENTS[hashString(seed) % GRADIENTS.length]
}

export function baht(n: number): string {
  return '฿' + n.toLocaleString('en-US')
}

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
