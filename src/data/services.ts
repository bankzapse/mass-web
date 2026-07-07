export interface Service {
  key: string
  to: string
  emoji: string
  icon: string // lucide icon name used in Navbar mega menu
  nameKey: string
  descKey: string
  gradient: string
  accent: string // tailwind text color
  bg: string // tailwind bg tint
}

export const SERVICES: Service[] = [
  {
    key: 'food',
    to: '/food',
    emoji: '🍜',
    icon: 'UtensilsCrossed',
    nameKey: 'services.food_name',
    descKey: 'services.food_desc',
    gradient: 'linear-gradient(135deg,#FF5347,#E4002B)',
    accent: 'text-mass-600',
    bg: 'bg-mass-50',
  },
  {
    key: 'ride',
    to: '/ride',
    emoji: '🛵',
    icon: 'Bike',
    nameKey: 'services.ride_name',
    descKey: 'services.ride_desc',
    gradient: 'linear-gradient(135deg,#34D399,#0EA5E9)',
    accent: 'text-go-600',
    bg: 'bg-go-50',
  },
  {
    key: 'messenger',
    to: '/messenger',
    emoji: '📦',
    icon: 'Package',
    nameKey: 'services.messenger_name',
    descKey: 'services.messenger_desc',
    gradient: 'linear-gradient(135deg,#818CF8,#6366F1)',
    accent: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    key: 'mart',
    to: '/mart',
    emoji: '🛒',
    icon: 'ShoppingBag',
    nameKey: 'services.mart_name',
    descKey: 'services.mart_desc',
    gradient: 'linear-gradient(135deg,#FBBF24,#F97316)',
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    key: 'grocery',
    to: '/mart',
    emoji: '🥬',
    icon: 'Carrot',
    nameKey: 'services.grocery_name',
    descKey: 'services.grocery_desc',
    gradient: 'linear-gradient(135deg,#4ADE80,#16A34A)',
    accent: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    key: 'pay',
    to: '/business',
    emoji: '💳',
    icon: 'Wallet',
    nameKey: 'services.pay_name',
    descKey: 'services.pay_desc',
    gradient: 'linear-gradient(135deg,#F472B6,#DB2777)',
    accent: 'text-pink-600',
    bg: 'bg-pink-50',
  },
]
