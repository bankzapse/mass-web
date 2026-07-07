export interface Testimonial {
  name: [string, string]
  role: [string, string]
  quote: [string, string]
  emoji: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: ['คุณนภา ส.', 'Napha S.'],
    role: ['พนักงานออฟฟิศ กรุงเทพฯ', 'Office worker, Bangkok'],
    quote: [
      'สั่งข้าวเที่ยงทุกวันผ่าน MASS ส่งไวมาก ไม่เคยผิดออเดอร์เลย ค่าส่งก็ถูกกว่าเจ้าอื่น',
      'I order lunch on MASS every day — super fast, always accurate, and cheaper delivery than the rest.',
    ],
    emoji: '👩‍💼',
    rating: 5,
  },
  {
    name: ['คุณธนา ก.', 'Thana K.'],
    role: ['ไรเดอร์ MASS 2 ปี', 'MASS rider, 2 years'],
    quote: [
      'รายได้ดี งานเข้าต่อเนื่อง แอปใช้ง่าย ถอนเงินได้ทันที ดูแลไรเดอร์ดีมากครับ',
      'Steady income, non-stop orders, instant payouts. MASS really takes care of its riders.',
    ],
    emoji: '🧑‍🔧',
    rating: 5,
  },
  {
    name: ['ร้านครัวคุณแม่', 'Mae Kitchen'],
    role: ['ร้านอาหารพาร์ทเนอร์', 'Merchant partner'],
    quote: [
      'ตั้งแต่เข้า MASS ยอดขายเพิ่มขึ้น 3 เท่า มีลูกค้าใหม่ทุกวัน ระบบจัดการออเดอร์ดีมาก',
      'Since joining MASS our sales tripled, with new customers daily. Order management is excellent.',
    ],
    emoji: '👩‍🍳',
    rating: 5,
  },
]

export interface Stat {
  value: string
  labelKey: string
  emoji: string
}

export const STATS: Stat[] = [
  { value: '8M+', labelKey: 'hero.stat_users', emoji: '👥' },
  { value: '120K+', labelKey: 'hero.stat_partners', emoji: '🏪' },
  { value: '250K+', labelKey: 'hero.stat_riders', emoji: '🛵' },
  { value: '77', labelKey: 'hero.stat_cities', emoji: '📍' },
]

export interface RideBenefit {
  emoji: string
  title: [string, string]
  desc: [string, string]
}

export const RIDE_BENEFITS: RideBenefit[] = [
  { emoji: '💰', title: ['ราคาชัดเจนก่อนเรียก', 'Upfront pricing'], desc: ['รู้ค่าโดยสารก่อนกดยืนยัน ไม่มีบวกเพิ่ม', 'Know the fare before you book — no surprises'] },
  { emoji: '🛡️', title: ['ปลอดภัยทุกเที่ยว', 'Safe every trip'], desc: ['คนขับผ่านการตรวจสอบ พร้อมปุ่ม SOS', 'Verified drivers with an in-app SOS button'] },
  { emoji: '⏱️', title: ['รอไม่นาน', 'Short waits'], desc: ['ไรเดอร์กว่า 250,000 คนพร้อมรับคุณ', '250,000+ drivers ready to pick you up'] },
  { emoji: '⭐', title: ['สะสมแต้มทุกการเดินทาง', 'Earn on every ride'], desc: ['แลกส่วนลดค่าอาหารและค่าเดินทางได้', 'Redeem points for food & ride discounts'] },
]
