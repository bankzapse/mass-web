import { Link } from 'react-router-dom'
import { Seo, breadcrumb, SITE } from '../components/Seo'
import { Section, SectionHeading, Reveal } from '../components/Section'
import { useI18n } from '../i18n/I18nContext'
import { cx } from '../lib/ui'

const EMAIL = 'info@massridedelivery.com'
const ADDRESS_TH =
  '42/42 ซอยขวัญเรือน ถนนศรีโสธรตัดใหม่ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000'
const ADDRESS_EN =
  '42/42 Soi Khwan Ruean, Sri Sothon Tat Mai Rd, Na Mueang, Mueang Chachoengsao, Chachoengsao 24000, Thailand'
const REG_NO = '0245569003051'
const EFFECTIVE: [string, string] = ['1 กันยายน 2569', '1 September 2026']
const UPDATED: [string, string] = ['3 กันยายน 2569', '3 September 2026']

function Tag({ app, th }: { app: 'customer' | 'rider'; th: boolean }) {
  return (
    <span
      className={cx(
        'ml-1 inline-flex items-center rounded-full px-2.5 py-0.5 align-middle text-[12px] font-semibold',
        app === 'customer' ? 'bg-ink-50 text-ink-600' : 'bg-mass-50 text-mass-600',
      )}
    >
      {app === 'customer' ? (th ? 'ลูกค้า' : 'Customer') : th ? 'ไรเดอร์' : 'Rider'}
    </span>
  )
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-6 text-[17px] font-bold text-ink-900">{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2.5 text-[16px] leading-relaxed text-ink-500">{children}</p>
)
const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-ink-700">{children}</strong>
)
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-3 space-y-2 pl-5 text-[16px] leading-relaxed text-ink-500 [&>li]:list-disc">{children}</ul>
)

function buildSections(th: boolean): { n: string; title: React.ReactNode; body: React.ReactNode }[] {
  const C = <Tag app="customer" th={th} />
  const R = <Tag app="rider" th={th} />
  return [
    {
      n: '1',
      title: th ? 'ภาพรวมและขอบเขต' : 'Overview & Scope',
      body: th ? (
        <>
          <P>
            {SITE.legalName} (“เรา”) ให้บริการแอปพลิเคชัน <B>MASS (MassRide)</B> สำหรับลูกค้า และ{' '}
            <B>MASS Driver (MassDrive)</B> สำหรับไรเดอร์/ผู้ให้บริการ นโยบายนี้อธิบายว่าเราเก็บ ใช้ เปิดเผย
            และคุ้มครองข้อมูลส่วนบุคคลของคุณอย่างไร ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
            และกฎหมายที่เกี่ยวข้อง
          </P>
          <P>
            เมื่อคุณดาวน์โหลด สมัคร หรือใช้แอปของเรา ถือว่าคุณได้อ่านและเข้าใจนโยบายฉบับนี้แล้ว
            ส่วนที่ใช้กับแอปใดแอปหนึ่งโดยเฉพาะจะมีป้ายกำกับ {C} หรือ {R}
          </P>
        </>
      ) : (
        <>
          <P>
            {SITE.legalName} (“we”) provides the <B>MASS (MassRide)</B> app for customers and{' '}
            <B>MASS Driver (MassDrive)</B> app for riders/partners. This policy explains how we collect, use,
            disclose, and protect your personal data in accordance with Thailand's Personal Data Protection Act
            B.E. 2562 (PDPA) and related laws.
          </P>
          <P>
            By downloading, signing up for, or using our apps, you acknowledge that you have read and understood
            this policy. Sections specific to one app are labelled {C} or {R}.
          </P>
        </>
      ),
    },
    {
      n: '2',
      title: th ? 'ข้อมูลที่เราเก็บรวบรวม' : 'Information We Collect',
      body: th ? (
        <>
          <P>เราเก็บข้อมูลเท่าที่จำเป็นต่อการให้บริการ ได้แก่</P>
          <UL>
            <li><B>ข้อมูลบัญชี</B> — ชื่อ-นามสกุล เบอร์โทรศัพท์ อีเมล และรหัส OTP (ทั้งสองแอป)</li>
            <li><B>ตำแหน่งที่ตั้ง</B> — พิกัด GPS ระหว่างใช้งาน และขณะออนไลน์รับงานสำหรับไรเดอร์ (ดูข้อ 4)</li>
            <li><B>ที่อยู่</B> — ที่อยู่รับ-ส่งอาหาร/พัสดุ และจุดรับ-ส่งผู้โดยสาร {C}</li>
            <li><B>ข้อมูลการชำระเงิน</B> — วิธีชำระเงินและประวัติธุรกรรม (หมายเลขบัตรจัดการโดยผู้ให้บริการชำระเงิน) {C}</li>
            <li><B>รูปโปรไฟล์</B> — รูปภาพที่คุณเลือกอัปโหลดจากกล้องหรือคลังภาพในอุปกรณ์ เพื่อใช้เป็นรูปประจำตัวในบัญชีของคุณ {C}</li>
            <li><B>เอกสารยืนยันตัวตน</B> — บัตรประชาชน ใบขับขี่ ทะเบียนรถ รูปถ่าย และบัญชีธนาคาร {R}</li>
            <li><B>ข้อมูลอุปกรณ์</B> — รุ่นอุปกรณ์ ระบบปฏิบัติการ ตัวระบุอุปกรณ์ และโทเคนการแจ้งเตือน (FCM)</li>
            <li><B>ข้อมูลการใช้งาน</B> — ประวัติออเดอร์/งาน การใช้ฟีเจอร์ และบันทึกข้อผิดพลาด</li>
          </UL>
        </>
      ) : (
        <>
          <P>We collect only the data necessary to provide our services, including:</P>
          <UL>
            <li><B>Account data</B> — full name, phone number, email, and OTP code (both apps)</li>
            <li><B>Location</B> — GPS coordinates during use, and while online for jobs for riders (see Section 4)</li>
            <li><B>Addresses</B> — food/parcel pick-up and drop-off addresses, and passenger pick-up/drop-off points {C}</li>
            <li><B>Payment data</B> — payment method and transaction history (card numbers handled by the payment provider) {C}</li>
            <li><B>Profile photo</B> — an image you choose to upload from your device camera or photo library to use as your account profile picture {C}</li>
            <li><B>Identity documents</B> — national ID card, driver's license, vehicle registration, photo, and bank account {R}</li>
            <li><B>Device data</B> — device model, operating system, device identifiers, and notification token (FCM)</li>
            <li><B>Usage data</B> — order/job history, feature usage, and error logs</li>
          </UL>
        </>
      ),
    },
    {
      n: '3',
      title: th ? 'วัตถุประสงค์และฐานทางกฎหมาย' : 'Purposes & Legal Bases',
      body: th ? (
        <UL>
          <li><B>การปฏิบัติตามสัญญา</B> — สร้างบัญชี จับคู่ออเดอร์/งาน จัดส่ง นำทาง ประมวลผลการชำระเงินและการจ่ายรายได้ และแสดงรูปประจำตัวที่คุณอัปโหลดในบัญชีและการติดต่อระหว่างใช้บริการ</li>
          <li><B>ความยินยอม</B> — การเข้าถึงตำแหน่ง การแจ้งเตือน และการสื่อสารการตลาด (ถอนได้ทุกเมื่อ)</li>
          <li><B>หน้าที่ตามกฎหมาย</B> — การยืนยันตัวตน (KYC) ภาษี และการเก็บบันทึกธุรกรรมตามที่กฎหมายกำหนด</li>
          <li><B>ประโยชน์โดยชอบด้วยกฎหมาย</B> — ป้องกันการฉ้อโกง รักษาความปลอดภัย และปรับปรุงบริการ</li>
        </UL>
      ) : (
        <UL>
          <li><B>Contract performance</B> — creating accounts, matching orders/jobs, delivery, navigation, processing payments and payouts, and displaying the profile photo you upload in your account and interactions.</li>
          <li><B>Consent</B> — location access, notifications, and marketing communications (withdrawable anytime)</li>
          <li><B>Legal obligation</B> — identity verification (KYC), tax, and transaction record-keeping as required by law</li>
          <li><B>Legitimate interest</B> — fraud prevention, security, and service improvement</li>
        </UL>
      ),
    },
    {
      n: '4',
      title: th ? 'ข้อมูลตำแหน่งที่ตั้ง' : 'Location Data',
      body: th ? (
        <>
          <P>{C} เราใช้ตำแหน่งของคุณเพื่อค้นหาร้าน/บริการใกล้เคียง คำนวณค่าจัดส่ง และติดตามออเดอร์ เฉพาะขณะที่คุณเปิดใช้งานแอป</P>
          <P>
            {R} แอป MASS Driver ใช้ตำแหน่งแบบ <B>“ขณะใช้งาน” และแบบ “พื้นหลัง” (Background Location)</B>{' '}
            เพื่อรับงานที่อยู่ใกล้ตัว นำทาง และให้ลูกค้าติดตามระหว่างจัดส่ง{' '}
            <B>การเก็บตำแหน่งแบบพื้นหลังจะทำงานเฉพาะเมื่อคุณกด “ออนไลน์/พร้อมรับงาน” เท่านั้น</B>{' '}
            และจะหยุดเมื่อคุณออฟไลน์ คุณสามารถปิดสิทธิ์การเข้าถึงตำแหน่งได้ในการตั้งค่าอุปกรณ์ แต่จะไม่สามารถรับงานได้
          </P>
        </>
      ) : (
        <>
          <P>{C} We use your location to find nearby restaurants/services, calculate delivery fees, and track orders — only while you are actively using the app.</P>
          <P>
            {R} The MASS Driver app uses <B>“in-use” and “background” location</B> to receive nearby jobs,
            navigate, and let customers track deliveries.{' '}
            <B>Background location only works when you tap “Online / available for jobs”</B> and stops when you go
            offline. You can disable location permission in your device settings, but you won't be able to receive jobs.
          </P>
        </>
      ),
    },
    {
      n: '5',
      title: th ? 'การชำระเงินและการเงิน' : 'Payments & Finance',
      body: th ? (
        <>
          <P>
            {C} การชำระเงินดำเนินการผ่าน<B>ผู้ให้บริการระบบชำระเงินที่ได้รับอนุญาต</B>{' '}
            เราไม่จัดเก็บหมายเลขบัตรเต็มไว้ในระบบของเรา ข้อมูลบัตรถูกจัดการและเข้ารหัสโดยผู้ให้บริการชำระเงินตามมาตรฐาน PCI-DSS
          </P>
          <P>{R} เราเก็บข้อมูลบัญชีธนาคารของคุณเพื่อโอนรายได้ และเก็บประวัติรายได้/การถอนเพื่อการบัญชีและภาษี</P>
        </>
      ) : (
        <>
          <P>
            {C} Payments are processed by <B>licensed payment providers</B>. We do not store full card numbers in
            our systems; card data is handled and encrypted by the payment provider under the PCI-DSS standard.
          </P>
          <P>{R} We store your bank account details to transfer earnings, and keep earnings/withdrawal history for accounting and tax.</P>
        </>
      ),
    },
    {
      n: '6',
      title: th ? <>การยืนยันตัวตน {R}</> : <>Identity Verification {R}</>,
      body: th ? (
        <P>
          เพื่อความปลอดภัยและตามข้อกำหนดทางกฎหมาย ไรเดอร์ต้องอัปโหลดเอกสารยืนยันตัวตน (บัตรประชาชน ใบขับขี่
          ทะเบียนรถ และรูปถ่าย) เราใช้ข้อมูลนี้เพื่อตรวจสอบคุณสมบัติ ป้องกันการสวมรอย และปฏิบัติตามกฎหมาย
          เอกสารเหล่านี้จัดเก็บอย่างปลอดภัยและเข้าถึงได้เฉพาะเจ้าหน้าที่ที่เกี่ยวข้อง
        </P>
      ) : (
        <P>
          For safety and legal requirements, riders must upload identity documents (national ID card, driver's
          license, vehicle registration, and photo). We use this to verify eligibility, prevent impersonation, and
          comply with the law. These documents are stored securely and accessible only to relevant staff.
        </P>
      ),
    },
    {
      n: '7',
      title: th ? 'การเปิดเผยต่อบุคคลภายนอก' : 'Disclosure to Third Parties',
      body: th ? (
        <>
          <P>เราไม่ขายข้อมูลส่วนบุคคลของคุณ เราเปิดเผยข้อมูลเท่าที่จำเป็นให้กับ:</P>
          <UL>
            <li><B>ระหว่างลูกค้าและไรเดอร์</B> — ชื่อ เบอร์ติดต่อ และตำแหน่งที่จำเป็นต่อการทำออเดอร์ให้สำเร็จ</li>
            <li><B>ร้านค้า/ผู้ขาย</B> — รายละเอียดออเดอร์ที่จำเป็น</li>
            <li><B>ผู้ให้บริการภายนอก</B> — Google Firebase (การแจ้งเตือน/วิเคราะห์), Google Maps Platform (แผนที่/นำทาง), ผู้ให้บริการชำระเงิน และผู้ให้บริการส่ง SMS/OTP</li>
            <li><B>หน่วยงานราชการ</B> — เมื่อมีคำสั่งตามกฎหมายหรือเพื่อปฏิบัติตามกฎหมาย</li>
          </UL>
        </>
      ) : (
        <>
          <P>We do not sell your personal data. We disclose data only as necessary to:</P>
          <UL>
            <li><B>Between customers and riders</B> — name, contact number, and location needed to complete an order</li>
            <li><B>Merchants/sellers</B> — necessary order details</li>
            <li><B>Third-party providers</B> — Google Firebase (notifications/analytics), Google Maps Platform (maps/navigation), payment providers, and SMS/OTP providers</li>
            <li><B>Government authorities</B> — upon lawful request or to comply with the law</li>
          </UL>
        </>
      ),
    },
    {
      n: '8',
      title: th ? 'การส่ง/โอนข้อมูลไปต่างประเทศ' : 'International Data Transfers',
      body: th ? (
        <P>
          ผู้ให้บริการบางราย (เช่น Google/Firebase) อาจประมวลผลข้อมูลบนเซิร์ฟเวอร์นอกประเทศไทย
          เราดำเนินการให้มีมาตรการคุ้มครองที่เหมาะสมตาม PDPA เมื่อมีการส่งหรือโอนข้อมูลไปต่างประเทศ
        </P>
      ) : (
        <P>
          Some providers (e.g. Google/Firebase) may process data on servers outside Thailand. We ensure
          appropriate safeguards under the PDPA when data is sent or transferred abroad.
        </P>
      ),
    },
    {
      n: '9',
      title: th ? 'ระยะเวลาการเก็บรักษา' : 'Data Retention',
      body: th ? (
        <P>
          เราเก็บข้อมูลส่วนบุคคลไว้เท่าที่จำเป็นต่อการให้บริการและตามที่กฎหมายกำหนด (เช่น เอกสารบัญชี/ภาษี
          ตามระยะเวลาที่กฎหมายกำหนด) เมื่อไม่จำเป็นแล้ว เราจะลบหรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้
          หากคุณลบบัญชี เราจะลบหรือปกปิดข้อมูลของคุณ เว้นแต่ต้องเก็บตามกฎหมาย
        </P>
      ) : (
        <P>
          We retain personal data only as long as necessary to provide services and as required by law (e.g.
          accounting/tax documents for legally required periods). When no longer needed, we delete or anonymize it.
          If you delete your account, we delete or mask your data unless retention is legally required.
        </P>
      ),
    },
    {
      n: '10',
      title: th ? 'สิทธิของเจ้าของข้อมูล' : 'Your Rights',
      body: th ? (
        <>
          <P>
            ภายใต้ PDPA คุณมีสิทธิเข้าถึงและขอสำเนา ขอแก้ไขให้ถูกต้อง ขอลบหรือทำลาย ขอระงับการใช้ คัดค้านการประมวลผล
            ขอให้โอนย้ายข้อมูล และถอนความยินยอม รวมถึงสิทธิร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล
          </P>
          <P>ในการใช้สิทธิ โปรดติดต่อเราตามช่องทางในข้อ 14 เราจะดำเนินการภายในระยะเวลาที่กฎหมายกำหนด</P>
        </>
      ) : (
        <>
          <P>
            Under the PDPA you have the right to access and obtain a copy, request correction, request erasure or
            destruction, request restriction, object to processing, request data portability, and withdraw consent,
            as well as to lodge a complaint with the Personal Data Protection Committee.
          </P>
          <P>To exercise your rights, please contact us via Section 14. We will act within the legally required period.</P>
        </>
      ),
    },
    {
      n: '11',
      title: th ? 'ความปลอดภัยของข้อมูล' : 'Data Security',
      body: th ? (
        <P>
          เราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสม เช่น การเข้ารหัสข้อมูลระหว่างส่ง (HTTPS/TLS) การควบคุมการเข้าถึง
          และการยืนยันตัวตนด้วย OTP เพื่อปกป้องข้อมูลของคุณ อย่างไรก็ตาม ไม่มีระบบใดปลอดภัย 100%
          เราจึงแนะนำให้คุณรักษาความปลอดภัยของอุปกรณ์และบัญชีของคุณด้วย
        </P>
      ) : (
        <P>
          We use appropriate technical and organizational measures, such as encryption in transit (HTTPS/TLS),
          access controls, and OTP authentication, to protect your data. However, no system is 100% secure, so we
          also recommend keeping your device and account secure.
        </P>
      ),
    },
    {
      n: '12',
      title: th ? 'ผู้เยาว์' : 'Minors',
      body: th ? (
        <P>
          บริการของเราไม่ได้มุ่งเป้าไปที่ผู้เยาว์อายุต่ำกว่า 20 ปี โดยไม่ได้รับความยินยอมจากผู้ปกครองตามที่กฎหมายกำหนด
          หากทราบว่ามีการเก็บข้อมูลของผู้เยาว์โดยไม่ได้รับความยินยอมที่ถูกต้อง เราจะดำเนินการลบข้อมูลนั้น
        </P>
      ) : (
        <P>
          Our services are not directed at minors under 20 without parental consent as required by law. If we learn
          that a minor's data has been collected without valid consent, we will delete it.
        </P>
      ),
    },
    {
      n: '13',
      title: th ? 'การเปลี่ยนแปลงนโยบาย' : 'Changes to This Policy',
      body: th ? (
        <P>
          เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว เราจะแจ้งการเปลี่ยนแปลงที่มีนัยสำคัญผ่านแอปหรือช่องทางอื่นที่เหมาะสม
          และจะระบุวันที่ปรับปรุงล่าสุดไว้ด้านบน
        </P>
      ) : (
        <P>
          We may update this policy from time to time. We will notify you of significant changes through the app or
          other appropriate channels, and the last-updated date above will reflect the latest revision.
        </P>
      ),
    },
    {
      n: '14',
      title: th ? 'ติดต่อเรา' : 'Contact Us',
      body: th ? (
        <>
          <P>หากมีคำถามเกี่ยวกับนโยบายนี้ หรือต้องการใช้สิทธิของคุณ โปรดติดต่อ:</P>
          <UL>
            <li>ผู้ควบคุมข้อมูล: <B>{SITE.legalName}</B> (เลขทะเบียนนิติบุคคล {REG_NO})</li>
            <li>ที่อยู่: {ADDRESS_TH}</li>
            <li>อีเมล: <a className="font-semibold text-mass-600 hover:text-mass-700" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </UL>
          <P>
            ดูช่องทางช่วยเหลืออื่น ๆ ได้ที่หน้า{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/support">ศูนย์ช่วยเหลือ</Link>
          </P>
        </>
      ) : (
        <>
          <P>If you have questions about this policy or wish to exercise your rights, please contact:</P>
          <UL>
            <li>Data Controller: <B>{SITE.legalName}</B> (company registration no. {REG_NO})</li>
            <li>Address: {ADDRESS_EN}</li>
            <li>Email: <a className="font-semibold text-mass-600 hover:text-mass-700" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </UL>
          <P>
            See other support channels on our{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/support">Help Center</Link>
          </P>
        </>
      ),
    },
  ]
}

export default function Privacy() {
  const { lang } = useI18n()
  const th = lang === 'th'
  const SECTIONS = buildSections(th)

  return (
    <>
      <Seo
        title={th ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
        description={
          th
            ? 'นโยบายความเป็นส่วนตัวของ MASS RIDE & DELIVERY ตาม PDPA — ครอบคลุมแอปลูกค้า (MassRide) และไรเดอร์ (MassDrive) การเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคล'
            : 'MASS RIDE & DELIVERY Privacy Policy under PDPA — covering the customer app (MassRide) and rider app (MassDrive): how we collect, use, and protect personal data.'
        }
        path="/privacy"
        jsonLd={breadcrumb([
          { name: th ? 'หน้าแรก' : 'Home', path: '/' },
          { name: th ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy', path: '/privacy' },
        ])}
      />

      <Section className="pb-8">
        <SectionHeading
          eyebrow={th ? 'ความเป็นส่วนตัว · PDPA' : 'Privacy · PDPA'}
          title={th ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
          subtitle={
            th
              ? 'ครอบคลุมแอป MASS (ลูกค้า) และ MASS Driver (ไรเดอร์) — เราให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณตามกฎหมาย PDPA'
              : 'Covering the MASS (customer) and MASS Driver (rider) apps — we are committed to protecting your personal data under Thailand’s PDPA.'
          }
        />
        <Reveal>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-ink-400">
            <span>{th ? 'มีผลบังคับใช้: ' : 'Effective: '}<span className="font-semibold text-ink-600">{th ? EFFECTIVE[0] : EFFECTIVE[1]}</span></span>
            <span>{th ? 'ปรับปรุงล่าสุด: ' : 'Last updated: '}<span className="font-semibold text-ink-600">{th ? UPDATED[0] : UPDATED[1]}</span></span>
            <span>{th ? 'ผู้ควบคุมข้อมูล: ' : 'Data Controller: '}<span className="font-semibold text-ink-600">{SITE.legalName}</span></span>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-5">
          {SECTIONS.map((s) => (
            <Reveal key={s.n}>
              <article className="card p-6 sm:p-8">
                <h2 className="flex items-baseline gap-3 text-[22px] font-bold text-ink-900">
                  <span className="flex-none font-display text-[15px] font-semibold text-mass-500">
                    {s.n.padStart(2, '0')}
                  </span>
                  <span>{s.title}</span>
                </h2>
                <div>{s.body}</div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <p className="pt-2 text-center text-[13px] text-ink-400">
              {th ? 'เอกสารนี้จัดทำเพื่อความโปร่งใสในการคุ้มครองข้อมูลส่วนบุคคล · ' : 'Published for transparency in personal-data protection · '}
              <Link className="text-mass-600 hover:text-mass-700" to="/support">{th ? 'ติดต่อเรา' : 'Contact us'}</Link>
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
