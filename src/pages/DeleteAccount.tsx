import { Link } from 'react-router-dom'
import { Seo, breadcrumb, SITE } from '../components/Seo'
import { Section, SectionHeading, Reveal } from '../components/Section'
import { useI18n } from '../i18n/I18nContext'

const EMAIL = 'info@massridedelivery.com'
const ADDRESS_TH =
  '42/42 ซอยขวัญเรือน ถนนศรีโสธรตัดใหม่ ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000'
const ADDRESS_EN =
  '42/42 Soi Khwan Ruean, Sri Sothon Tat Mai Rd, Na Mueang, Mueang Chachoengsao, Chachoengsao 24000, Thailand'
const REG_NO = '0245569003051'
const UPDATED: [string, string] = ['3 กันยายน 2569', '3 September 2026']

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2.5 text-[16px] leading-relaxed text-ink-500">{children}</p>
)
const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-ink-700">{children}</strong>
)
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-3 space-y-2 pl-5 text-[16px] leading-relaxed text-ink-500 [&>li]:list-disc">{children}</ul>
)
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="font-semibold text-mass-600 hover:text-mass-700" href={href}>
    {children}
  </a>
)

function buildSections(th: boolean): { n: string; title: React.ReactNode; body: React.ReactNode }[] {
  return [
    {
      n: '1',
      title: th ? 'วิธีขอลบบัญชี' : 'How to Request Deletion',
      body: th ? (
        <UL>
          <li>
            <B>ในแอป:</B> เข้า <B>การตั้งค่า &gt; บัญชี</B> แล้วเลือก “ขอลบบัญชี” (ถ้ามีในเวอร์ชันของคุณ)
          </li>
          <li>
            <B>ทางอีเมล:</B> ส่งคำขอมาที่ <A href={`mailto:${EMAIL}`}>{EMAIL}</A>{' '}
            จากอีเมล/เบอร์ที่ผูกกับบัญชี ระบุหัวข้อ “ขอลบบัญชี” พร้อมเบอร์โทรศัพท์ที่ลงทะเบียน เพื่อยืนยันตัวตน
          </li>
        </UL>
      ) : (
        <UL>
          <li>
            <B>In the app:</B> go to <B>Settings &gt; Account</B> and choose “Request account deletion”
            (if available in your version).
          </li>
          <li>
            <B>By email:</B> send a request to <A href={`mailto:${EMAIL}`}>{EMAIL}</A> from the email/phone
            linked to your account, with the subject “Account deletion” and your registered phone number for
            identity verification.
          </li>
        </UL>
      ),
    },
    {
      n: '2',
      title: th ? 'ข้อมูลที่จะถูกลบ' : 'Data That Will Be Deleted',
      body: th ? (
        <UL>
          <li>ชื่อ-นามสกุล เบอร์โทรศัพท์ อีเมล ที่อยู่จัดส่ง</li>
          <li>ประวัติออเดอร์/การเดินทาง ตำแหน่งที่บันทึกไว้ วิธีการชำระเงินที่บันทึกในแอป</li>
          <li>(ไรเดอร์) เอกสารยืนยันตัวตนและข้อมูลบัญชีธนาคารสำหรับรับรายได้</li>
        </UL>
      ) : (
        <UL>
          <li>Name, phone number, email, and delivery addresses</li>
          <li>Order/trip history, saved locations, and payment methods saved in the app</li>
          <li>(Riders) identity documents and bank account details for receiving income</li>
        </UL>
      ),
    },
    {
      n: '3',
      title: th ? 'ข้อมูลที่เก็บต่อ (ตามกฎหมาย)' : 'Data We Retain (as Required by Law)',
      body: th ? (
        <P>
          เราอาจเก็บบันทึกธุรกรรม/บัญชี/ภาษี ตามระยะเวลาที่กฎหมายกำหนด (เช่น เอกสารทางบัญชีตามที่กฎหมายไทยกำหนด)
          หลังพ้นกำหนดจะลบหรือทำให้ไม่สามารถระบุตัวตนได้
        </P>
      ) : (
        <P>
          We may retain transaction/accounting/tax records for the period required by law (e.g. accounting
          documents as required by Thai law). After that period, we delete or anonymize them.
        </P>
      ),
    },
    {
      n: '4',
      title: th ? 'ระยะเวลาดำเนินการ' : 'Processing Time',
      body: th ? (
        <P>
          เราจะดำเนินการตามคำขอภายในระยะเวลาที่กฎหมาย PDPA กำหนด (โดยทั่วไปภายใน 30 วัน) และแจ้งผลกลับทางอีเมล
        </P>
      ) : (
        <P>
          We will process your request within the period required by the PDPA (generally within 30 days) and
          notify you of the result by email.
        </P>
      ),
    },
    {
      n: '5',
      title: th ? 'ติดต่อ' : 'Contact',
      body: th ? (
        <>
          <UL>
            <li>
              <B>{SITE.legalName}</B> (เลขทะเบียน {REG_NO})
            </li>
            <li>ที่อยู่: {ADDRESS_TH}</li>
            <li>
              อีเมล: <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
            </li>
          </UL>
          <P>
            ดูเพิ่มเติมที่{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/privacy">
              นโยบายความเป็นส่วนตัว
            </Link>{' '}
            และ{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/support">
              ศูนย์ช่วยเหลือ
            </Link>
          </P>
        </>
      ) : (
        <>
          <UL>
            <li>
              <B>{SITE.legalName}</B> (registration no. {REG_NO})
            </li>
            <li>Address: {ADDRESS_EN}</li>
            <li>
              Email: <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
            </li>
          </UL>
          <P>
            See also our{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/privacy">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/support">
              Help Center
            </Link>
          </P>
        </>
      ),
    },
  ]
}

export default function DeleteAccount() {
  const { lang } = useI18n()
  const th = lang === 'th'
  const SECTIONS = buildSections(th)

  return (
    <>
      <Seo
        title={th ? 'ขอลบบัญชี' : 'Account Deletion'}
        description={
          th
            ? 'ขอลบบัญชีและข้อมูลส่วนบุคคลของแอป MASS (ลูกค้า) และ MASS Driver (ไรเดอร์) ตาม PDPA — วิธีขอลบ ข้อมูลที่ถูกลบ และระยะเวลาดำเนินการ'
            : 'Request deletion of your account and personal data for the MASS (customer) and MASS Driver (rider) apps under PDPA — how to request, what is deleted, and processing time.'
        }
        path="/delete-account"
        jsonLd={breadcrumb([
          { name: th ? 'หน้าแรก' : 'Home', path: '/' },
          { name: th ? 'ขอลบบัญชี' : 'Account Deletion', path: '/delete-account' },
        ])}
      />

      <Section className="pb-8">
        <SectionHeading
          eyebrow={th ? 'การลบบัญชี · PDPA' : 'Account Deletion · PDPA'}
          title={th ? 'ขอลบบัญชีและข้อมูลส่วนบุคคล' : 'Delete Your Account & Personal Data'}
          subtitle={
            th
              ? 'ครอบคลุมแอป MASS (ลูกค้า) และ MASS Driver (ไรเดอร์) — บริษัท แมส ไรด์ แอนด์ เดลิเวอรี่ จำกัด'
              : 'Covering the MASS (customer) and MASS Driver (rider) apps — MASS RIDE & DELIVERY Co., Ltd.'
          }
        />
        <Reveal>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-ink-400">
            <span>
              {th ? 'ปรับปรุงล่าสุด: ' : 'Last updated: '}
              <span className="font-semibold text-ink-600">{th ? UPDATED[0] : UPDATED[1]}</span>
            </span>
            <span>
              {th ? 'ผู้ควบคุมข้อมูล: ' : 'Data Controller: '}
              <span className="font-semibold text-ink-600">{SITE.legalName}</span>
            </span>
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
              {th
                ? 'เอกสารนี้จัดทำเพื่อความโปร่งใสในการคุ้มครองข้อมูลส่วนบุคคล · '
                : 'Published for transparency in personal-data protection · '}
              <Link className="text-mass-600 hover:text-mass-700" to="/support">
                {th ? 'ติดต่อเรา' : 'Contact us'}
              </Link>
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
