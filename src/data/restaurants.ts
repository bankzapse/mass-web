export interface MenuItem {
  id: string
  name: [string, string]
  desc: [string, string]
  price: number
  emoji: string
  popular?: boolean
  spicy?: number
}

export interface MenuCategory {
  name: [string, string]
  items: MenuItem[]
}

export interface Restaurant {
  id: string
  name: [string, string]
  cuisines: string[]
  emoji: string
  rating: number
  reviews: number
  deliveryMin: number
  deliveryFee: number
  priceLevel: 1 | 2 | 3
  distanceKm: number
  tags: [string, string][]
  promo?: [string, string]
  featured?: boolean
  menu: MenuCategory[]
}

// Compact menu-item constructor
let seq = 0
function it(
  th: string,
  en: string,
  price: number,
  emoji: string,
  descTh = '',
  descEn = '',
  extra: Partial<MenuItem> = {},
): MenuItem {
  seq += 1
  return {
    id: 'm' + seq,
    name: [th, en],
    desc: [descTh, descEn],
    price,
    emoji,
    ...extra,
  }
}

// ---- Cuisine menu templates (base menu reused across similar restaurants) ----
const TEMPLATES: Record<string, () => MenuCategory[]> = {
  thai: () => [
    {
      name: ['เมนูจานเดียว', 'Rice dishes'],
      items: [
        it('ข้าวกะเพราหมูสับไข่ดาว', 'Basil pork rice & fried egg', 65, '🍳', 'เผ็ดร้อนถึงเครื่อง ไข่ดาวกรอบ ๆ', 'Spicy stir-fry with crispy fried egg', { popular: true, spicy: 3 }),
        it('ข้าวผัดปูเนื้อแน่น', 'Crab fried rice', 120, '🦀', 'ผัดหอมเนื้อปูก้อนโต', 'Wok-fried rice loaded with crab', { popular: true }),
        it('ข้าวผัดอเมริกัน', 'American fried rice', 89, '🍤', 'พร้อมไก่ทอด ไส้กรอก ไข่ดาว', 'With fried chicken, sausage & egg'),
        it('ข้าวไข่เจียวหมูสับ', 'Thai omelette rice', 55, '🍚', 'ไข่เจียวฟูกรอบ', 'Fluffy crispy omelette'),
      ],
    },
    {
      name: ['ผัด & ทอด', 'Stir-fried'],
      items: [
        it('ผัดไทยกุ้งสด', 'Pad Thai with prawns', 95, '🍜', 'เส้นเหนียวนุ่ม รสกลมกล่อม', 'Classic Pad Thai with fresh prawns', { popular: true }),
        it('ผัดซีอิ๊วหมู', 'Pad see ew', 69, '🍝', 'เส้นใหญ่ผัดซีอิ๊วหอมกระทะ', 'Wok-charred wide noodles'),
        it('ไก่ผัดเม็ดมะม่วง', 'Chicken with cashew nuts', 99, '🥜', '', ''),
      ],
    },
    {
      name: ['ต้ม & แกง', 'Soups & curry'],
      items: [
        it('ต้มยำกุ้งน้ำข้น', 'Tom Yum Goong', 149, '🦐', 'เข้มข้น เปรี้ยวเผ็ดจัดจ้าน', 'Rich, hot & sour prawn soup', { spicy: 3, popular: true }),
        it('แกงเขียวหวานไก่', 'Green curry chicken', 99, '🍛', '', '', { spicy: 2 }),
      ],
    },
    {
      name: ['เครื่องดื่ม', 'Drinks'],
      items: [
        it('ชาไทยเย็น', 'Thai iced tea', 39, '🧋'),
        it('น้ำมะนาวโซดา', 'Lime soda', 45, '🥤'),
      ],
    },
  ],
  noodle: () => [
    {
      name: ['ก๋วยเตี๋ยว', 'Noodle bowls'],
      items: [
        it('ก๋วยเตี๋ยวเรือน้ำตก', 'Boat noodles', 49, '🍜', 'น้ำซุปเข้มข้นสูตรโบราณ', 'Deep, aromatic broth', { popular: true, spicy: 2 }),
        it('เกาเหลาเนื้อตุ๋น', 'Braised beef soup', 89, '🥩', 'เนื้อตุ๋นเปื่อยนุ่ม', 'Slow-braised tender beef', { popular: true }),
        it('บะหมี่เกี๊ยวหมูแดง', 'Wonton egg noodles', 59, '🍲', '', ''),
        it('เย็นตาโฟทะเล', 'Yentafo seafood', 69, '🦑', 'น้ำสีชมพูรสกลมกล่อม', ''),
      ],
    },
    {
      name: ['ของทานเล่น', 'Snacks'],
      items: [
        it('เกี๊ยวทอดกรอบ', 'Fried wontons', 45, '🥟', '', '', { popular: true }),
        it('ลูกชิ้นทอด', 'Fried meatballs', 39, '🍢'),
      ],
    },
    {
      name: ['เครื่องดื่ม', 'Drinks'],
      items: [
        it('ชามะนาว', 'Iced lemon tea', 35, '🍋'),
        it('น้ำเก๊กฮวย', 'Chrysanthemum tea', 30, '🥤'),
      ],
    },
  ],
  japanese: () => [
    {
      name: ['ซูชิ & ซาชิมิ', 'Sushi & sashimi'],
      items: [
        it('แซลมอนซาชิมิ 5 ชิ้น', 'Salmon sashimi (5 pc)', 189, '🐟', 'แซลมอนนอร์เวย์สดใหม่', 'Fresh Norwegian salmon', { popular: true }),
        it('ซูชิหน้าแซลมอน 2 คำ', 'Salmon nigiri (2 pc)', 79, '🍣', '', '', { popular: true }),
        it('แคลิฟอร์เนียโรล', 'California roll', 129, '🍱', ''),
      ],
    },
    {
      name: ['ข้าวหน้า & ราเมง', 'Donburi & ramen'],
      items: [
        it('ข้าวหน้าแซลมอนย่าง', 'Grilled salmon don', 169, '🍚', '', '', { popular: true }),
        it('โทริคัตสึด้ง', 'Chicken katsu don', 139, '🍗', 'ไก่ชุบเกล็ดขนมปังทอดกรอบ', ''),
        it('ทงคตสึราเมง', 'Tonkotsu ramen', 159, '🍜', 'น้ำซุปกระดูกหมูเข้มข้น', 'Rich pork-bone broth', { popular: true }),
      ],
    },
    {
      name: ['ของทานเล่น', 'Sides'],
      items: [
        it('เกี๊ยวซ่า 5 ชิ้น', 'Gyoza (5 pc)', 89, '🥟'),
        it('เอดามาเมะ', 'Edamame', 59, '🫛'),
      ],
    },
  ],
  chicken: () => [
    {
      name: ['ไก่ทอด', 'Fried chicken'],
      items: [
        it('ไก่ทอดกรอบ 3 ชิ้น', 'Crispy chicken (3 pc)', 99, '🍗', 'กรอบนอกนุ่มใน', 'Crunchy outside, juicy inside', { popular: true }),
        it('ปีกไก่ซอสเกาหลี', 'Korean wings', 129, '🌶️', 'ซอสเผ็ดหวานสไตล์เกาหลี', '', { popular: true, spicy: 2 }),
        it('ไก่ป๊อป', 'Chicken popcorn', 69, '🍿', ''),
      ],
    },
    {
      name: ['ชุดสุดคุ้ม', 'Combos'],
      items: [
        it('ชุดไก่ 6 ชิ้น + เฟรนช์ฟรายส์', '6 pc combo + fries', 259, '🍟', '', '', { popular: true }),
        it('เบอร์เกอร์ไก่กรอบ', 'Crispy chicken burger', 109, '🍔'),
      ],
    },
    {
      name: ['เครื่องดื่ม', 'Drinks'],
      items: [
        it('โค้กเย็น', 'Iced cola', 29, '🥤'),
        it('เป๊ปซี่', 'Pepsi', 29, '🥤'),
      ],
    },
  ],
  pizza: () => [
    {
      name: ['พิซซ่า', 'Pizza'],
      items: [
        it('พิซซ่าหน้าฮาวายเอี้ยน', 'Hawaiian pizza', 259, '🍍', 'แฮม สับปะรด ชีสยืด', 'Ham, pineapple & mozzarella', { popular: true }),
        it('เปปเปอโรนีคลาสสิก', 'Pepperoni classic', 279, '🍕', '', '', { popular: true }),
        it('ซีฟู้ดเลิฟเวอร์', 'Seafood lover', 329, '🦐', 'กุ้ง ปลาหมึก หอยแมลงภู่', ''),
      ],
    },
    {
      name: ['ทานเล่น', 'Sides'],
      items: [
        it('การ์ลิกเบรด', 'Garlic bread', 89, '🥖', '', '', { popular: true }),
        it('สปาเก็ตตี้คาโบนาร่า', 'Spaghetti carbonara', 159, '🍝', ''),
        it('สลัดซีซาร์', 'Caesar salad', 119, '🥗'),
      ],
    },
    {
      name: ['เครื่องดื่ม', 'Drinks'],
      items: [it('น้ำอัดลม 1.25 ลิตร', 'Soft drink 1.25L', 45, '🥤')],
    },
  ],
  bubbletea: () => [
    {
      name: ['ชานมยอดฮิต', 'Signature milk tea'],
      items: [
        it('ชานมไข่มุกบราวน์ชูการ์', 'Brown sugar boba', 65, '🧋', 'หอมหวานน้ำตาลไหม้', 'Caramelised brown sugar', { popular: true }),
        it('ชาไทยไข่มุก', 'Thai milk tea boba', 55, '🧋', '', '', { popular: true }),
        it('ชาเขียวมัทฉะลาเต้', 'Matcha latte', 69, '🍵', ''),
      ],
    },
    {
      name: ['ชาผลไม้', 'Fruit tea'],
      items: [
        it('ชาพีชอิตาเลียนโซดา', 'Peach soda', 59, '🍑', '', '', { popular: true }),
        it('ชามะนาวสตรอว์เบอร์รี', 'Strawberry lemon tea', 59, '🍓'),
      ],
    },
    {
      name: ['ท็อปปิ้ง', 'Toppings'],
      items: [
        it('ไข่มุกทาปิโอกา', 'Tapioca pearls', 15, '⚫'),
        it('พุดดิ้งไข่', 'Egg pudding', 15, '🍮'),
      ],
    },
  ],
  seafood: () => [
    {
      name: ['เมนูซีฟู้ด', 'Seafood'],
      items: [
        it('กุ้งเผาตัวใหญ่', 'Grilled river prawns', 289, '🦐', 'มันกุ้งเยิ้ม', 'Bursting with prawn roe', { popular: true }),
        it('ปูผัดผงกะหรี่', 'Curry crab', 359, '🦀', '', '', { popular: true }),
        it('ปลากะพงทอดน้ำปลา', 'Fried sea bass', 259, '🐟', '', '', { spicy: 1 }),
        it('หอยแมลงภู่อบสมุนไพร', 'Herbal steamed mussels', 159, '🦪'),
      ],
    },
    {
      name: ['ยำ& ต้ม', 'Salad & soup'],
      items: [
        it('ยำทะเลรวม', 'Spicy seafood salad', 149, '🥗', '', '', { spicy: 3, popular: true }),
        it('ต้มยำทะเลหม้อไฟ', 'Seafood tom yum hotpot', 259, '🍲', '', '', { spicy: 3 }),
      ],
    },
    { name: ['เครื่องดื่ม', 'Drinks'], items: [it('น้ำมะพร้าว', 'Coconut water', 49, '🥥')] },
  ],
  dessert: () => [
    {
      name: ['ของหวานไทย', 'Thai desserts'],
      items: [
        it('ข้าวเหนียวมะม่วง', 'Mango sticky rice', 89, '🥭', 'มะม่วงน้ำดอกไม้หวานฉ่ำ', 'Sweet golden mango', { popular: true }),
        it('บัวลอยไข่หวาน', 'Bua loy', 59, '🍡', '', '', { popular: true }),
        it('ทับทิมกรอบ', 'Water chestnut ruby', 55, '🍧'),
      ],
    },
    {
      name: ['เค้ก & เบเกอรี่', 'Cakes & bakery'],
      items: [
        it('บิงซูชาไทย', 'Thai tea bingsu', 129, '🍨', '', '', { popular: true }),
        it('ลาวาช็อกโกแลต', 'Chocolate lava cake', 99, '🍫'),
        it('ครัวซองต์เนยสด', 'Butter croissant', 55, '🥐'),
      ],
    },
    { name: ['เครื่องดื่ม', 'Drinks'], items: [it('โกโก้เย็น', 'Iced cocoa', 55, '🥤')] },
  ],
  coffee: () => [
    {
      name: ['กาแฟ', 'Coffee'],
      items: [
        it('เอสเปรสโซ่เย็น', 'Iced espresso', 55, '☕', '', '', { popular: true }),
        it('ลาเต้เย็น', 'Iced latte', 65, '☕', '', '', { popular: true }),
        it('อเมริกาโน่', 'Americano', 55, '☕'),
        it('คาปูชิโน่', 'Cappuccino', 65, '☕'),
      ],
    },
    {
      name: ['ไม่ใช่กาแฟ', 'Non-coffee'],
      items: [
        it('มัทฉะลาเต้', 'Matcha latte', 75, '🍵', '', '', { popular: true }),
        it('ช็อกโกแลตเย็น', 'Iced chocolate', 65, '🍫'),
      ],
    },
    {
      name: ['เบเกอรี่', 'Bakery'],
      items: [it('บราวนี่หน้ากรอบ', 'Fudge brownie', 55, '🍫'), it('ครัวซองต์', 'Croissant', 55, '🥐')],
    },
  ],
  korean: () => [
    {
      name: ['เมนูเกาหลี', 'Korean mains'],
      items: [
        it('บิบิมบับ', 'Bibimbap', 139, '🍲', 'ข้าวยำเกาหลีผักรวม', '', { popular: true }),
        it('ต็อกบกกีชีส', 'Cheese tteokbokki', 129, '🌶️', '', '', { spicy: 2, popular: true }),
        it('หมูย่างเกาหลี', 'Korean BBQ pork', 199, '🥓', ''),
        it('รามยอนทะเล', 'Seafood ramyeon', 119, '🍜', '', '', { spicy: 2 }),
      ],
    },
    {
      name: ['ทานเล่น', 'Sides'],
      items: [it('คิมบับ', 'Kimbap', 89, '🍙', '', '', { popular: true }), it('ไก่ทอดเกาหลี', 'Korean fried chicken', 149, '🍗')],
    },
    { name: ['เครื่องดื่ม', 'Drinks'], items: [it('โซจูสตรอว์เบอร์รี', 'Strawberry soju', 99, '🍾')] },
  ],
  burger: () => [
    {
      name: ['เบอร์เกอร์', 'Burgers'],
      items: [
        it('ชีสเบอร์เกอร์เนื้อ 2 ชั้น', 'Double cheeseburger', 189, '🍔', 'เนื้อฉ่ำ ชีสเยิ้ม', 'Juicy beef, melty cheese', { popular: true }),
        it('เบคอนบีบีคิวเบอร์เกอร์', 'Bacon BBQ burger', 199, '🥓', '', '', { popular: true }),
        it('เบอร์เกอร์เห็ดทรัฟเฟิล', 'Truffle mushroom burger', 209, '🍄', ''),
      ],
    },
    {
      name: ['ทานคู่', 'Sides'],
      items: [
        it('เฟรนช์ฟรายส์', 'French fries', 69, '🍟', '', '', { popular: true }),
        it('อนเนียนริง', 'Onion rings', 79, '🧅'),
        it('นักเก็ต 6 ชิ้น', 'Nuggets (6 pc)', 89, '🍗'),
      ],
    },
    { name: ['เครื่องดื่ม', 'Drinks'], items: [it('มิลค์เชคช็อกโกแลต', 'Chocolate shake', 89, '🥤')] },
  ],
  somtam: () => [
    {
      name: ['ส้มตำ & ยำ', 'Papaya salad'],
      items: [
        it('ส้มตำไทยใส่ปู', 'Som tam with crab', 69, '🥗', 'เผ็ดจี๊ดจ๊าดถึงใจ', '', { popular: true, spicy: 3 }),
        it('ตำปูปลาร้า', 'Som tam pla ra', 65, '🌶️', '', '', { spicy: 3 }),
        it('ยำวุ้นเส้นทะเล', 'Glass noodle salad', 99, '🍤', '', '', { spicy: 2, popular: true }),
      ],
    },
    {
      name: ['ปิ้งย่าง & ทอด', 'Grilled & fried'],
      items: [
        it('ไก่ย่างเขาสวนกวาง', 'Grilled chicken', 149, '🍗', '', '', { popular: true }),
        it('คอหมูย่าง', 'Grilled pork neck', 99, '🥩'),
        it('ลาบหมูทอด', 'Fried larb', 89, '🍖', '', '', { spicy: 2 }),
      ],
    },
    { name: ['ข้าว & เครื่องดื่ม', 'Rice & drinks'], items: [it('ข้าวเหนียว', 'Sticky rice', 15, '🍚'), it('น้ำเก๊กฮวย', 'Chrysanthemum tea', 30, '🥤')] },
  ],
}

function menuFor(cuisine: string): MenuCategory[] {
  return (TEMPLATES[cuisine] ?? TEMPLATES.thai)()
}

interface RSeed {
  id: string
  name: [string, string]
  cuisines: string[]
  emoji: string
  rating: number
  reviews: number
  deliveryMin: number
  deliveryFee: number
  priceLevel: 1 | 2 | 3
  distanceKm: number
  tags: [string, string][]
  promo?: [string, string]
  featured?: boolean
}

const SEEDS: RSeed[] = [
  { id: 'baan-krapao', name: ['บ้านกะเพรา เดือด', 'Baan Krapao'], cuisines: ['thai', 'ricebowl'], emoji: '🍳', rating: 4.8, reviews: 2410, deliveryMin: 20, deliveryFee: 0, priceLevel: 1, distanceKm: 1.2, tags: [['อาหารตามสั่ง', 'Thai'], ['จานเดียว', 'Rice']], promo: ['ลด 50%', '50% off'], featured: true },
  { id: 'boat-noodle', name: ['เรือทองก๋วยเตี๋ยวเรือ', 'Ruea Thong Boat Noodle'], cuisines: ['noodle'], emoji: '🍜', rating: 4.7, reviews: 1890, deliveryMin: 25, deliveryFee: 0, priceLevel: 1, distanceKm: 2.1, tags: [['ก๋วยเตี๋ยว', 'Noodles']], promo: ['ส่งฟรี', 'Free delivery'], featured: true },
  { id: 'sushi-hana', name: ['ซูชิ ฮานะ', 'Sushi Hana'], cuisines: ['japanese', 'seafood'], emoji: '🍣', rating: 4.9, reviews: 3120, deliveryMin: 30, deliveryFee: 19, priceLevel: 3, distanceKm: 3.4, tags: [['ญี่ปุ่น', 'Japanese'], ['ซูชิ', 'Sushi']], promo: ['ลด 100฿', '฿100 off'], featured: true },
  { id: 'crispy-bird', name: ['คริสปี้ เบิร์ด ไก่ทอด', 'Crispy Bird'], cuisines: ['chicken', 'burger'], emoji: '🍗', rating: 4.6, reviews: 5210, deliveryMin: 20, deliveryFee: 0, priceLevel: 2, distanceKm: 1.8, tags: [['ไก่ทอด', 'Chicken']], promo: ['1 แถม 1', 'Buy 1 get 1'], featured: true },
  { id: 'mama-pizza', name: ['มาม่า พิซซ่า', 'Mama Pizza Napoli'], cuisines: ['pizza'], emoji: '🍕', rating: 4.7, reviews: 2760, deliveryMin: 35, deliveryFee: 19, priceLevel: 2, distanceKm: 4.0, tags: [['พิซซ่า', 'Pizza'], ['อิตาเลียน', 'Italian']], promo: ['ลด 20%', '20% off'], featured: true },
  { id: 'boba-lab', name: ['โบบา แล็บ', 'Boba Lab'], cuisines: ['bubbletea', 'coffee'], emoji: '🧋', rating: 4.8, reviews: 8900, deliveryMin: 15, deliveryFee: 0, priceLevel: 1, distanceKm: 0.9, tags: [['ชานม', 'Bubble tea']], promo: ['ซื้อ 2 ลด 30฿', '฿30 off 2'], featured: true },
  { id: 'talay-thong', name: ['ทะเลทอง ซีฟู้ด', 'Talay Thong Seafood'], cuisines: ['seafood', 'thai'], emoji: '🦐', rating: 4.8, reviews: 1540, deliveryMin: 35, deliveryFee: 29, priceLevel: 3, distanceKm: 5.2, tags: [['ซีฟู้ด', 'Seafood']], featured: true },
  { id: 'sweet-spoon', name: ['สวีท สปูน', 'Sweet Spoon Dessert'], cuisines: ['dessert', 'coffee'], emoji: '🍰', rating: 4.9, reviews: 4300, deliveryMin: 20, deliveryFee: 0, priceLevel: 2, distanceKm: 1.5, tags: [['ของหวาน', 'Dessert']], promo: ['ลด 15%', '15% off'], featured: true },
  { id: 'seoul-street', name: ['โซล สตรีท', 'Seoul Street'], cuisines: ['korean'], emoji: '🍲', rating: 4.6, reviews: 2010, deliveryMin: 30, deliveryFee: 19, priceLevel: 2, distanceKm: 3.0, tags: [['เกาหลี', 'Korean']] },
  { id: 'tam-zabb', name: ['ตำแซ่บ นัวร์', 'Tam Zabb Noir'], cuisines: ['somtam', 'thai'], emoji: '🥗', rating: 4.7, reviews: 3660, deliveryMin: 25, deliveryFee: 0, priceLevel: 1, distanceKm: 2.4, tags: [['ส้มตำ–อีสาน', 'Isaan']], promo: ['ส่งฟรี', 'Free delivery'] },
  { id: 'daily-grind', name: ['เดลี่ กรายด์ คาเฟ่', 'Daily Grind Café'], cuisines: ['coffee', 'dessert'], emoji: '☕', rating: 4.8, reviews: 6120, deliveryMin: 15, deliveryFee: 0, priceLevel: 2, distanceKm: 1.0, tags: [['กาแฟ', 'Coffee']] },
  { id: 'burger-yard', name: ['เบอร์เกอร์ ยาร์ด', 'Burger Yard'], cuisines: ['burger', 'chicken'], emoji: '🍔', rating: 4.7, reviews: 4780, deliveryMin: 25, deliveryFee: 19, priceLevel: 2, distanceKm: 2.8, tags: [['เบอร์เกอร์', 'Burgers']], promo: ['เฟรนช์ฟรายส์ฟรี', 'Free fries'] },
  { id: 'noodle-house', name: ['บ้านบะหมี่เกี๊ยว', 'The Noodle House'], cuisines: ['noodle', 'chinese'], emoji: '🥟', rating: 4.6, reviews: 1320, deliveryMin: 20, deliveryFee: 0, priceLevel: 1, distanceKm: 1.7, tags: [['ก๋วยเตี๋ยว', 'Noodles'], ['จีน', 'Chinese']] },
  { id: 'green-bowl', name: ['กรีน โบวล์ เฮลตี้', 'Green Bowl Healthy'], cuisines: ['healthy', 'thai'], emoji: '🥑', rating: 4.7, reviews: 980, deliveryMin: 25, deliveryFee: 19, priceLevel: 2, distanceKm: 2.2, tags: [['เฮลตี้', 'Healthy'], ['สลัด', 'Salad']], promo: ['ลด 10%', '10% off'] },
]

// Build a per-restaurant menu: signature "popular" category + cuisine templates.
function buildRestaurant(s: RSeed): Restaurant {
  const menu = menuFor(s.cuisines[0])
  return { ...s, menu }
}

export const RESTAURANTS: Restaurant[] = SEEDS.map(buildRestaurant)

export function getRestaurant(id: string): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.id === id)
}

export const FEATURED = RESTAURANTS.filter((r) => r.featured)

// Flat list of "popular near you" dishes for the home page
export interface PopularDish extends MenuItem {
  restaurantId: string
  restaurantName: [string, string]
}
export const POPULAR_DISHES: PopularDish[] = RESTAURANTS.flatMap((r) =>
  r.menu
    .flatMap((c) => c.items)
    .filter((i) => i.popular)
    .slice(0, 1)
    .map((i) => ({ ...i, restaurantId: r.id, restaurantName: r.name })),
).slice(0, 10)
