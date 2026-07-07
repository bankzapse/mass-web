export interface Cuisine {
  key: string
  emoji: string
  name: [string, string]
}

export const CUISINES: Cuisine[] = [
  { key: 'thai', emoji: '🍛', name: ['อาหารตามสั่ง', 'Thai'] },
  { key: 'noodle', emoji: '🍜', name: ['ก๋วยเตี๋ยว', 'Noodles'] },
  { key: 'ricebowl', emoji: '🍚', name: ['ข้าวราดแกง', 'Rice bowls'] },
  { key: 'somtam', emoji: '🥗', name: ['ส้มตำ–อีสาน', 'Isaan'] },
  { key: 'seafood', emoji: '🦐', name: ['ซีฟู้ด', 'Seafood'] },
  { key: 'bbq', emoji: '🍖', name: ['ปิ้งย่าง', 'BBQ & Grill'] },
  { key: 'japanese', emoji: '🍣', name: ['ญี่ปุ่น', 'Japanese'] },
  { key: 'korean', emoji: '🍲', name: ['เกาหลี', 'Korean'] },
  { key: 'chinese', emoji: '🥟', name: ['จีน–ติ่มซำ', 'Chinese'] },
  { key: 'pizza', emoji: '🍕', name: ['พิซซ่า', 'Pizza'] },
  { key: 'burger', emoji: '🍔', name: ['เบอร์เกอร์', 'Burgers'] },
  { key: 'chicken', emoji: '🍗', name: ['ไก่ทอด', 'Fried chicken'] },
  { key: 'dessert', emoji: '🍰', name: ['ของหวาน', 'Dessert'] },
  { key: 'bubbletea', emoji: '🧋', name: ['ชานม', 'Bubble tea'] },
  { key: 'coffee', emoji: '☕', name: ['กาแฟ–เครื่องดื่ม', 'Coffee'] },
  { key: 'healthy', emoji: '🥑', name: ['เฮลตี้–สลัด', 'Healthy'] },
  { key: 'veg', emoji: '🥦', name: ['เจ–มังสวิรัติ', 'Vegetarian'] },
  { key: 'breakfast', emoji: '🍳', name: ['อาหารเช้า', 'Breakfast'] },
]
