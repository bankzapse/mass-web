import { AppBadges, FauxQR } from './ui'
import { Section } from './Section'
import { IMG } from '../lib/images'

/** Global app-download call-to-action shown before the footer on every page. */
export function DownloadBand() {
  return (
    <Section id="download">
      <div className="relative overflow-hidden rounded-4xl bg-mass-gradient px-6 py-12 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-wider backdrop-blur">
              📱 ดาวน์โหลดฟรีวันนี้
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
              เริ่มใช้ MASS ได้แล้ววันนี้
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/90">
              ดาวน์โหลดแอป MASS ฟรีทั้งบน App Store และ Google Play แล้วสัมผัสบริการที่ครบจบในแอปเดียว
            </p>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-card">
                <FauxQR size={104} seed="mass-download" />
                <div className="max-w-[110px]">
                  <p className="text-sm font-bold text-ink-900">สแกนเพื่อดาวน์โหลด</p>
                  <p className="mt-1 text-xs text-ink-400">เปิดกล้องแล้วสแกนได้เลย</p>
                </div>
              </div>
              <AppBadges light />
            </div>
          </div>
          <div className="hidden justify-end lg:flex">
            <img
              src={IMG.rider}
              alt="ไรเดอร์ MASS พร้อมให้บริการ"
              loading="lazy"
              className="aspect-[3/4] w-64 rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/20"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
