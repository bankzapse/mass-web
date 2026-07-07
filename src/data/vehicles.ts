export interface Vehicle {
  key: string
  name: [string, string]
  desc: [string, string]
  emoji: string
  base: number // base fare THB
  perKm: number
  seats: number
  etaMin: number
  gradient: string
  popular?: boolean
}

export const VEHICLES: Vehicle[] = [
  {
    key: 'bike',
    name: ['มอเตอร์ไซค์', 'MASS Bike'],
    desc: ['เร็ว ทะลุรถติด ประหยัดสุด', 'Beat the traffic, cheapest'],
    emoji: '🛵',
    base: 15,
    perKm: 6,
    seats: 1,
    etaMin: 3,
    gradient: 'linear-gradient(135deg,#34D399,#059669)',
    popular: true,
  },
  {
    key: 'car',
    name: ['รถยนต์', 'MASS Car'],
    desc: ['สบาย แอร์เย็น นั่งได้ 4 คน', 'Comfy & air-conditioned'],
    emoji: '🚗',
    base: 45,
    perKm: 11,
    seats: 4,
    etaMin: 5,
    gradient: 'linear-gradient(135deg,#60A5FA,#2563EB)',
    popular: true,
  },
  {
    key: 'premium',
    name: ['พรีเมียม', 'MASS Premium'],
    desc: ['รถหรู คนขับมืออาชีพ', 'Luxury cars, pro drivers'],
    emoji: '🚙',
    base: 90,
    perKm: 16,
    seats: 4,
    etaMin: 7,
    gradient: 'linear-gradient(135deg,#1F2937,#0F172A)',
  },
  {
    key: 'taxi',
    name: ['แท็กซี่', 'MASS Taxi'],
    desc: ['แท็กซี่มิเตอร์ เรียกง่าย', 'Metered taxi, easy hail'],
    emoji: '🚕',
    base: 35,
    perKm: 9,
    seats: 4,
    etaMin: 6,
    gradient: 'linear-gradient(135deg,#FBBF24,#F59E0B)',
  },
  {
    key: 'tuktuk',
    name: ['ตุ๊กตุ๊ก', 'MASS TukTuk'],
    desc: ['เที่ยวเมืองสไตล์ไทย ๆ', 'Iconic Thai city rides'],
    emoji: '🛺',
    base: 40,
    perKm: 10,
    seats: 3,
    etaMin: 5,
    gradient: 'linear-gradient(135deg,#F472B6,#DB2777)',
  },
  {
    key: 'van',
    name: ['รถตู้ / XL', 'MASS XL Van'],
    desc: ['กลุ่มใหญ่ สัมภาระเยอะ 6 ที่นั่ง', 'Groups & luggage, 6 seats'],
    emoji: '🚐',
    base: 110,
    perKm: 18,
    seats: 6,
    etaMin: 9,
    gradient: 'linear-gradient(135deg,#A78BFA,#7C3AED)',
  },
]
