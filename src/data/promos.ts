export interface Promo {
  code: string
  title: [string, string]
  desc: [string, string]
  emoji: string
  gradient: string
  tag: [string, string]
}

export const PROMOS: Promo[] = [
  {
    code: 'NEW100',
    title: ['ลูกค้าใหม่ ลด 100฿', 'New user: ฿100 off'],
    desc: ['สำหรับออเดอร์แรกขั้นต่ำ 250฿', 'First order, min. spend ฿250'],
    emoji: '🎁',
    gradient: 'linear-gradient(135deg,#FF7438,#FF2D8E)',
    tag: ['ยอดฮิต', 'Popular'],
  },
  {
    code: 'FREESHIP',
    title: ['ส่งฟรีทั้งวัน', 'Free delivery all day'],
    desc: ['ไม่มีขั้นต่ำ ใช้ได้ทุกร้านส่งฟรี', 'No minimum on selected stores'],
    emoji: '🚚',
    gradient: 'linear-gradient(135deg,#34D399,#0EA5E9)',
    tag: ['ส่งฟรี', 'Free'],
  },
  {
    code: 'MASS15',
    title: ['ลด 15% ทุกออเดอร์', '15% off every order'],
    desc: ['ลดสูงสุด 120฿ ขั้นต่ำ 200฿', 'Up to ฿120 off, min. ฿200'],
    emoji: '⚡',
    gradient: 'linear-gradient(135deg,#818CF8,#6366F1)',
    tag: ['จำกัดเวลา', 'Limited'],
  },
  {
    code: 'MASS50',
    title: ['ลด 50฿ มื้อเที่ยง', 'Lunch: ฿50 off'],
    desc: ['11:00–14:00 ทุกวัน ขั้นต่ำ 150฿', 'Daily 11am–2pm, min. ฿150'],
    emoji: '🍱',
    gradient: 'linear-gradient(135deg,#FBBF24,#F97316)',
    tag: ['มื้อเที่ยง', 'Lunch'],
  },
]
