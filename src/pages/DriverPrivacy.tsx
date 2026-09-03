import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo, breadcrumb, SITE } from '../components/Seo'
import { Section, SectionHeading, Reveal } from '../components/Section'
import { cx } from '../lib/ui'

type L = [th: string, en: string]

const EMAIL = 'admin@massridedelivery.com'
const REG_NO = '0245569003051'
const LEGAL: L = ['บริษัท แมส ไรด์ แอนด์ เดลิเวอรี่ จำกัด', 'MASS RIDE & DELIVERY Co., Ltd.']
const ADDRESS: L = [
  '42/42 ซอยขวัญเรือน ถนนศรีโสธรตัดใหม่ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000',
  '42/42 Soi Khwan Ruean, Sri Sothon Tat Mai Rd, Na Mueang, Mueang Chachoengsao District, Chachoengsao 24000, Thailand',
]
const EFFECTIVE: L = ['3 กันยายน 2026', '3 September 2026']
const UPDATED: L = ['3 กันยายน 2026', '3 September 2026']

type Block =
  | { t: 'p'; v: L }
  | { t: 'h'; v: L }
  | { t: 'ul'; v: L[] }

interface Sec {
  n: string
  title: L
  body: Block[]
}

const INTRO: Block[] = [
  {
    t: 'p',
    v: [
      'นโยบายความเป็นส่วนตัวนี้อธิบายวิธีที่ Mass (“เรา”) เก็บรวบรวม ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคลของพาร์ทเนอร์คนขับ (“คุณ” หรือ “ผู้ขับ”) ที่ใช้แอปพลิเคชัน Mass Driver (com.massapp.massdrive) สำหรับการรับงานส่งผู้โดยสาร ส่งพัสดุ และส่งอาหาร',
      'This Privacy Policy explains how Mass (“we”) collects, uses, discloses, and protects the personal data of driver-partners (“you” or “driver”) who use the Mass Driver application (com.massapp.massdrive) to accept ride-hailing, parcel, and food-delivery jobs.',
    ],
  },
  {
    t: 'p',
    v: [
      'แอปนี้มีไว้สำหรับพาร์ทเนอร์คนขับที่ลงทะเบียนกับ Mass เท่านั้น การใช้งานแอปถือว่าคุณได้อ่านและยอมรับนโยบายฉบับนี้',
      'This app is intended solely for driver-partners registered with Mass. By using the app, you acknowledge that you have read and accepted this Policy.',
    ],
  },
]

const SECTIONS: Sec[] = [
  {
    n: '1',
    title: ['ข้อมูลที่เราเก็บรวบรวม', 'Information We Collect'],
    body: [
      { t: 'h', v: ['1.1 ข้อมูลบัญชีและการยืนยันตัวตน', '1.1 Account & Identity Verification'] },
      {
        t: 'ul',
        v: [
          ['ชื่อ-นามสกุล เบอร์โทรศัพท์ อีเมล', 'Full name, phone number, email'],
          ['เอกสารยืนยันตัวตน เช่น บัตรประชาชน ใบขับขี่ รูปถ่าย', 'Identity documents such as national ID card, driver’s license, and photo'],
          ['ข้อมูลยานพาหนะ (ทะเบียน ประเภทรถ) ตามบริการที่ให้', 'Vehicle information (registration, vehicle type) according to the service provided'],
          ['ข้อมูลบัญชีธนาคาร/สมุดบัญชี สำหรับการโอนรายได้', 'Bank account / passbook details for income transfers'],
        ],
      },
      { t: 'h', v: ['1.2 ข้อมูลตำแหน่งที่ตั้ง (Location)', '1.2 Location Data'] },
      {
        t: 'ul',
        v: [
          [
            'เราเก็บตำแหน่ง GPS แบบเรียลไทม์ ขณะที่คุณเปิดสถานะออนไลน์/รับงาน เพื่อจับคู่งาน นำทาง และแสดงตำแหน่งให้ลูกค้าติดตามระหว่างการเดินทาง',
            'We collect real-time GPS location while you are online / available for jobs, in order to match jobs, provide navigation, and let customers track you during a trip.',
          ],
          [
            'แอปเข้าถึงตำแหน่งเฉพาะเมื่อแอปทำงานและคุณออนไลน์เพื่อรับงาน คุณสามารถหยุดแชร์ตำแหน่งได้โดยออกจากสถานะออนไลน์หรือปิดสิทธิ์ในตั้งค่าเครื่อง',
            'The app accesses location only when it is running and you are online to receive jobs. You may stop sharing location by going offline or disabling the permission in your device settings.',
          ],
        ],
      },
      { t: 'h', v: ['1.3 ข้อมูลการทำงานและการเงิน', '1.3 Work & Financial Data'] },
      {
        t: 'ul',
        v: [
          ['ประวัติงานที่รับ (จุดรับ-ส่ง ระยะทาง เวลา)', 'Job history (pick-up/drop-off points, distance, time)'],
          ['รายได้ ค่าคอมมิชชัน ยอดเครดิต และประวัติการถอนเงิน', 'Earnings, commission, credit balance, and withdrawal history'],
          ['วิธีการชำระเงินของงาน (เงินสด / QR พร้อมเพย์)', 'Job payment methods (cash / PromptPay QR)'],
        ],
      },
      { t: 'h', v: ['1.4 ข้อมูลการสื่อสาร', '1.4 Communication Data'] },
      {
        t: 'ul',
        v: [
          ['ข้อความแชทและรูปภาพที่คุณส่งผ่านแอปเพื่อประสานงานกับลูกค้า', 'Chat messages and images you send through the app to coordinate with customers'],
          ['คำขอความช่วยเหลือและการติดต่อฝ่ายสนับสนุน', 'Support requests and contact with our support team'],
        ],
      },
      { t: 'h', v: ['1.5 ข้อมูลอุปกรณ์และการใช้งาน', '1.5 Device & Usage Data'] },
      {
        t: 'ul',
        v: [
          ['รุ่นอุปกรณ์ ระบบปฏิบัติการ ตัวระบุอุปกรณ์', 'Device model, operating system, device identifiers'],
          ['โทเคนการแจ้งเตือน (Push token) เพื่อส่งการแจ้งเตือนงานใหม่', 'Push notification token to send new-job alerts'],
          ['ข้อมูลบันทึกการทำงาน (log) สำหรับวิเคราะห์และแก้ไขปัญหา', 'Log data for analytics and troubleshooting'],
        ],
      },
    ],
  },
  {
    n: '2',
    title: ['วิธีที่เราใช้ข้อมูล', 'How We Use Your Information'],
    body: [
      { t: 'p', v: ['เราใช้ข้อมูลของคุณเพื่อ:', 'We use your information to:'] },
      {
        t: 'ul',
        v: [
          ['จับคู่และมอบหมายงานส่งผู้โดยสาร ส่งพัสดุ และส่งอาหาร', 'Match and assign ride-hailing, parcel, and food-delivery jobs'],
          ['นำทางไปยังจุดรับและจุดส่ง', 'Provide navigation to pick-up and drop-off points'],
          ['คำนวณค่าโดยสาร ค่าคอมมิชชัน และดำเนินการจ่ายรายได้', 'Calculate fares, commission, and process income payouts'],
          ['ยืนยันตัวตนและตรวจสอบคุณสมบัติของผู้ขับ เพื่อความปลอดภัยของทุกฝ่าย', 'Verify identity and driver eligibility for everyone’s safety'],
          ['ส่งการแจ้งเตือนเกี่ยวกับงานและบัญชีของคุณ', 'Send notifications about your jobs and account'],
          ['ให้บริการช่วยเหลือและแก้ไขปัญหา', 'Provide support and resolve issues'],
          ['ป้องกันการทุจริต การใช้งานที่ผิด และปฏิบัติตามกฎหมาย', 'Prevent fraud and misuse, and comply with the law'],
        ],
      },
    ],
  },
  {
    n: '3',
    title: ['การเปิดเผยข้อมูลแก่บุคคลภายนอก', 'Disclosure to Third Parties'],
    body: [
      { t: 'p', v: ['เราเปิดเผยข้อมูลเท่าที่จำเป็นแก่:', 'We disclose information only as necessary to:'] },
      {
        t: 'ul',
        v: [
          ['ลูกค้า/ผู้ใช้บริการ — ชื่อ ข้อมูลยานพาหนะ และตำแหน่งของคุณระหว่างให้บริการงานนั้น เพื่อให้ลูกค้าติดตามและติดต่อได้', 'Customers — your name, vehicle information, and location during a job, so customers can track and contact you'],
          ['ผู้ให้บริการชำระเงินและธนาคาร — เพื่อดำเนินการรับชำระและโอนรายได้', 'Payment providers and banks — to process payments and income transfers'],
          ['ผู้ให้บริการภายนอกที่จำเป็น — เช่น บริการแผนที่/นำทาง (Google Maps) และบริการแจ้งเตือน (Firebase Cloud Messaging)', 'Necessary third-party providers — such as maps/navigation (Google Maps) and notifications (Firebase Cloud Messaging)'],
          ['หน่วยงานราชการหรือตามกฎหมาย — เมื่อมีคำสั่งหรือข้อกำหนดทางกฎหมาย', 'Government authorities or as required by law — upon lawful request or legal obligation'],
        ],
      },
      { t: 'p', v: ['เราไม่ขายข้อมูลส่วนบุคคลของคุณให้บุคคลภายนอกเพื่อการโฆษณา', 'We do not sell your personal data to third parties for advertising.'] },
    ],
  },
  {
    n: '4',
    title: ['บริการของบุคคลภายนอก', 'Third-Party Services'],
    body: [
      { t: 'p', v: ['แอปใช้บริการต่อไปนี้ ซึ่งมีนโยบายความเป็นส่วนตัวของตนเอง:', 'The app uses the following services, each with its own privacy policy:'] },
      {
        t: 'ul',
        v: [
          ['Google Maps Platform — แผนที่และการนำทาง', 'Google Maps Platform — maps and navigation'],
          ['Google Firebase (Cloud Messaging) — การแจ้งเตือน', 'Google Firebase (Cloud Messaging) — notifications'],
          ['ผู้ให้บริการเกตเวย์ชำระเงิน (สำหรับ QR พร้อมเพย์)', 'Payment gateway provider (for PromptPay QR)'],
        ],
      },
    ],
  },
  {
    n: '5',
    title: ['การเก็บรักษาข้อมูล', 'Data Retention'],
    body: [
      {
        t: 'p',
        v: [
          'เราเก็บรักษาข้อมูลของคุณตราบเท่าที่บัญชียังใช้งานอยู่ และเท่าที่จำเป็นเพื่อวัตถุประสงค์ที่ระบุไว้ รวมถึงเพื่อปฏิบัติตามภาระผูกพันทางกฎหมาย ภาษี และการบัญชี หลังจากนั้นเราจะลบหรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้',
          'We retain your data for as long as your account is active and as necessary for the purposes described, including to comply with legal, tax, and accounting obligations. Afterwards, we delete or anonymize the data.',
        ],
      },
    ],
  },
  {
    n: '6',
    title: ['ความปลอดภัยของข้อมูล', 'Data Security'],
    body: [
      {
        t: 'p',
        v: [
          'เราใช้มาตรการทางเทคนิคและการจัดการที่เหมาะสมเพื่อคุ้มครองข้อมูลของคุณ เช่น การเข้ารหัสการเชื่อมต่อ และการจำกัดสิทธิ์การเข้าถึง อย่างไรก็ตาม ไม่มีระบบใดปลอดภัย 100% เราจึงไม่สามารถรับประกันความปลอดภัยได้อย่างสมบูรณ์',
          'We use appropriate technical and organizational measures to protect your data, such as encrypted connections and access controls. However, no system is 100% secure, so we cannot guarantee absolute security.',
        ],
      },
    ],
  },
  {
    n: '7',
    title: ['สิทธิของคุณ (ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล PDPA)', 'Your Rights (under Thailand’s PDPA)'],
    body: [
      { t: 'p', v: ['คุณมีสิทธิ:', 'You have the right to:'] },
      {
        t: 'ul',
        v: [
          ['ขอเข้าถึงและขอสำเนาข้อมูลส่วนบุคคลของคุณ', 'Access and request a copy of your personal data'],
          ['ขอแก้ไขข้อมูลให้ถูกต้องเป็นปัจจุบัน', 'Request correction of your data'],
          ['ขอลบหรือระงับการใช้ข้อมูล', 'Request erasure or restriction of processing'],
          ['คัดค้านหรือเพิกถอนความยินยอมในการประมวลผล', 'Object to or withdraw consent for processing'],
          ['ขอให้โอนย้ายข้อมูล', 'Request data portability'],
        ],
      },
      {
        t: 'p',
        v: [
          'หากต้องการใช้สิทธิ กรุณาติดต่อเราตามช่องทางในข้อ 10 การเพิกถอนความยินยอมบางอย่าง (เช่น ตำแหน่งที่ตั้ง) อาจทำให้ไม่สามารถรับงานผ่านแอปได้',
          'To exercise your rights, please contact us via the channels in Section 10. Withdrawing certain consents (such as location) may prevent you from receiving jobs through the app.',
        ],
      },
    ],
  },
  {
    n: '8',
    title: ['ผู้เยาว์', 'Minors'],
    body: [
      {
        t: 'p',
        v: [
          'แอปนี้มีไว้สำหรับผู้ขับที่มีคุณสมบัติตามกฎหมาย (อายุ 18 ปีขึ้นไป) เท่านั้น เราไม่เก็บข้อมูลจากผู้เยาว์โดยเจตนา',
          'This app is intended only for legally eligible drivers (aged 18 or older). We do not knowingly collect data from minors.',
        ],
      },
    ],
  },
  {
    n: '9',
    title: ['การเปลี่ยนแปลงนโยบาย', 'Changes to This Policy'],
    body: [
      {
        t: 'p',
        v: [
          'เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว หากมีการเปลี่ยนแปลงที่สำคัญ เราจะแจ้งผ่านแอปหรือช่องทางอื่นที่เหมาะสม วันที่ “ปรับปรุงล่าสุด” ด้านบนจะสะท้อนการแก้ไขล่าสุด',
          'We may update this Policy from time to time. For significant changes, we will notify you through the app or other appropriate channels. The “Last updated” date above reflects the latest revision.',
        ],
      },
    ],
  },
  {
    n: '10',
    title: ['ติดต่อเรา', 'Contact Us'],
    body: [
      {
        t: 'p',
        v: [
          'หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ หรือต้องการใช้สิทธิของคุณ กรุณาติดต่อ:',
          'If you have questions about this Privacy Policy or wish to exercise your rights, please contact:',
        ],
      },
      {
        t: 'ul',
        v: [
          [`ผู้ควบคุมข้อมูล: ${LEGAL[0]} (เลขทะเบียนนิติบุคคล ${REG_NO})`, `Data Controller: ${LEGAL[1]} (company registration no. ${REG_NO})`],
          [`ที่อยู่: ${ADDRESS[0]}`, `Address: ${ADDRESS[1]}`],
          [`อีเมล: ${EMAIL}`, `Email: ${EMAIL}`],
        ],
      },
    ],
  },
]

export default function DriverPrivacy() {
  const [lang, setLang] = useState<0 | 1>(0) // 0 = TH, 1 = EN

  const t = (l: L) => l[lang]

  return (
    <>
      <Seo
        title={lang === 0 ? 'นโยบายความเป็นส่วนตัว — Mass Driver' : 'Privacy Policy — Mass Driver'}
        description={
          lang === 0
            ? 'นโยบายความเป็นส่วนตัวสำหรับแอป Mass Driver (com.massapp.massdrive) พาร์ทเนอร์คนขับ — การเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลตาม PDPA'
            : 'Privacy Policy for the Mass Driver app (com.massapp.massdrive) for driver-partners — how we collect, use, and protect personal data under PDPA.'
        }
        path="/mass-driver/privacy-policy"
        keywords="Mass Driver privacy policy, นโยบายความเป็นส่วนตัว Mass Driver, com.massapp.massdrive, PDPA"
        jsonLd={breadcrumb([
          { name: lang === 0 ? 'หน้าแรก' : 'Home', path: '/' },
          { name: lang === 0 ? 'นโยบายความเป็นส่วนตัว — Mass Driver' : 'Privacy Policy — Mass Driver', path: '/mass-driver/privacy-policy' },
        ])}
      />

      <Section className="pb-8">
        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-full border border-ink-200 bg-white p-1 text-sm font-semibold">
            {(['ไทย', 'EN'] as const).map((label, i) => (
              <button
                key={label}
                onClick={() => setLang(i as 0 | 1)}
                className={cx(
                  'rounded-full px-4 py-1.5 transition-colors',
                  lang === i ? 'bg-mass-500 text-white' : 'text-ink-500 hover:text-ink-800',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <SectionHeading
          eyebrow={lang === 0 ? 'ความเป็นส่วนตัว · PDPA · Mass Driver' : 'Privacy · PDPA · Mass Driver'}
          title={lang === 0 ? 'นโยบายความเป็นส่วนตัว — Mass Driver' : 'Privacy Policy — Mass Driver'}
          subtitle={
            lang === 0
              ? 'สำหรับแอปพาร์ทเนอร์คนขับ Mass Driver (com.massapp.massdrive) — เราให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณตามกฎหมาย PDPA'
              : 'For the Mass Driver partner app (com.massapp.massdrive) — we are committed to protecting your personal data in accordance with Thailand’s PDPA.'
          }
        />
        <Reveal>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-ink-400">
            <span>
              {lang === 0 ? 'มีผลบังคับใช้: ' : 'Effective: '}
              <span className="font-semibold text-ink-600">{t(EFFECTIVE)}</span>
            </span>
            <span>
              {lang === 0 ? 'ปรับปรุงล่าสุด: ' : 'Last updated: '}
              <span className="font-semibold text-ink-600">{t(UPDATED)}</span>
            </span>
            <span>
              {lang === 0 ? 'ผู้ควบคุมข้อมูล: ' : 'Data Controller: '}
              <span className="font-semibold text-ink-600">{t(LEGAL)}</span>
            </span>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-5">
          <Reveal>
            <div className="card p-6 sm:p-8">
              {INTRO.map((b, i) => (
                <RenderBlock key={i} block={b} lang={lang} />
              ))}
            </div>
          </Reveal>

          {SECTIONS.map((s) => (
            <Reveal key={s.n}>
              <article className="card p-6 sm:p-8">
                <h2 className="flex items-baseline gap-3 text-[22px] font-bold text-ink-900">
                  <span className="flex-none font-display text-[15px] font-semibold text-mass-500">
                    {s.n.padStart(2, '0')}
                  </span>
                  <span>{t(s.title)}</span>
                </h2>
                <div>
                  {s.body.map((b, i) => (
                    <RenderBlock key={i} block={b} lang={lang} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <p className="pt-2 text-center text-[13px] text-ink-400">
              {lang === 0 ? 'เอกสารนี้จัดทำเพื่อความโปร่งใสในการคุ้มครองข้อมูลส่วนบุคคล · ' : 'Published for transparency in personal-data protection · '}
              <Link className="text-mass-600 hover:text-mass-700" to="/support">
                {lang === 0 ? 'ติดต่อเรา' : 'Contact us'}
              </Link>
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}

function RenderBlock({ block, lang }: { block: Block; lang: 0 | 1 }) {
  if (block.t === 'h') {
    return <h3 className="mt-6 text-[17px] font-bold text-ink-900">{block.v[lang]}</h3>
  }
  if (block.t === 'ul') {
    return (
      <ul className="mt-3 space-y-2 pl-5 text-[16px] leading-relaxed text-ink-500 [&>li]:list-disc">
        {block.v.map((item, i) => (
          <li key={i}>{item[lang]}</li>
        ))}
      </ul>
    )
  }
  return <p className="mt-2.5 text-[16px] leading-relaxed text-ink-500">{block.v[lang]}</p>
}
