# MASS RIDE & DELIVERY — เว็บโปรโมทแอป

เว็บไซต์การตลาด (landing page) สำหรับโปรโมทแอป **MASS RIDE & DELIVERY**
ซูเปอร์แอปสัญชาติไทย: สั่งอาหาร · เรียกรถ · ส่งพัสดุ · ซื้อของ

> เว็บนี้เป็น **เว็บโปรโมทแอป** — โชว์บริการและชวนดาวน์โหลด
> ไม่มีระบบล็อกอิน ไม่มีตะกร้า/การสั่งซื้อจริง (ตามที่ตกลงไว้)

บริษัท แมส ไรด์ แอนด์ เดลิเวอรี่ จำกัด · เลขทะเบียน 0245569003051
42/42 ซอยขวัญเรือน ถนนศรีโสธรตัดใหม่ ต.หน้าเมือง อ.เมืองฉะเชิงเทรา จ.ฉะเชิงเทรา 24000

---

## เทคโนโลยี
React 18 · Vite 5 · TypeScript · Tailwind CSS · Framer Motion · React Router
รองรับ 2 ภาษา (ไทย/อังกฤษ) · Responsive มือถือ–เดสก์ท็อป

## รันบนเครื่อง (Development)
```bash
npm install --legacy-peer-deps   # ครั้งแรก
npm run dev                      # เปิด http://localhost:5273
```
> หมายเหตุ: ถ้า `npm install` ติด error เรื่อง cache ให้ใช้
> `npm install --legacy-peer-deps --cache ./.npm-cache`

## สร้างไฟล์สำหรับขึ้นเว็บจริง (Production build)
```bash
npm run build      # ได้โฟลเดอร์ dist/ พร้อมอัปโหลด
npm run preview    # ทดสอบ build ที่ http://localhost:5273
```

## นำขึ้น https://massridedelivery.com/

เลือกวิธีที่ตรงกับโฮสติ้งของโดเมน:

### A) Shared hosting / cPanel (Apache) — พบบ่อยสุดในไทย
1. `npm run build`
2. อัปโหลด **เนื้อหาทั้งหมดใน `dist/`** (รวมไฟล์ `.htaccess`) ไปที่ `public_html/`
3. ไฟล์ `.htaccess` จัดการ deep link (`/food`, `/ride` ฯลฯ) ให้อัตโนมัติ

### B) Netlify / Cloudflare Pages
- Build command: `npm run build` · Publish directory: `dist`
- ไฟล์ `public/_redirects` ทำ SPA fallback ให้แล้ว

### C) Vercel
- Framework: **Vite** · ไฟล์ `vercel.json` ตั้ง rewrite ให้แล้ว

จากนั้นชี้ DNS ของ `massridedelivery.com` ไปที่โฮสต์ที่เลือก (A record / CNAME ตามผู้ให้บริการ)

## โครงสร้างหลัก
```
src/
  pages/        Home, Food, Restaurant, Ride, Messenger, Mart, Partner, Business
  components/   Navbar, Footer, DownloadBand, PhoneMock, MapMock, cards, ui
  i18n/         พจนานุกรม ไทย/อังกฤษ + context
  data/         บริการ, หมวดอาหาร, ร้าน(ตัวอย่าง), รถ, โปรโมชัน
```

## แก้ลิงก์ดาวน์โหลดแอปจริง
ปุ่ม App Store / Google Play อยู่ที่ `src/components/ui.tsx` (คอมโพเนนต์ `AppBadges`)
เปลี่ยน `href="#download"` เป็น URL จริงของแอปได้เลย
