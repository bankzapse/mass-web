import { Link } from 'react-router-dom'
import { Home, UtensilsCrossed } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export default function NotFound() {
  const { lang } = useI18n()
  return (
    <div className="container-mass flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="animate-float-mid text-8xl">🛵💨</div>
      <p className="mt-6 font-display text-7xl font-extrabold text-gradient">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink-900">
        {lang === 'th' ? 'อุ๊ปส์! ไม่พบหน้านี้' : "Oops! Page not found"}
      </h1>
      <p className="mt-2 max-w-md text-[15px] text-ink-500">
        {lang === 'th'
          ? 'หน้าที่คุณกำลังหาอาจถูกย้ายหรือไม่มีอยู่ แต่ไม่ต้องห่วง เดี๋ยวเราพากลับบ้าน'
          : "The page you're looking for may have moved. Let's get you back."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary btn-lg">
          <Home className="h-5 w-5" />
          {lang === 'th' ? 'กลับหน้าแรก' : 'Back home'}
        </Link>
        <Link to="/food" className="btn-ghost btn-lg">
          <UtensilsCrossed className="h-5 w-5" />
          {lang === 'th' ? 'สั่งอาหาร' : 'Order food'}
        </Link>
      </div>
    </div>
  )
}
