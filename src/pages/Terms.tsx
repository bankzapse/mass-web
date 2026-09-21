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
const EFFECTIVE: [string, string] = ['21 กันยายน 2569', '21 September 2026']
const UPDATED: [string, string] = ['21 กันยายน 2569', '21 September 2026']

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
  return [
    {
      n: '1',
      title: th ? 'การยอมรับข้อกำหนด' : 'Acceptance of Terms',
      body: th ? (
        <>
          <P>
            ข้อกำหนดและเงื่อนไขนี้ (“ข้อกำหนด”) ใช้บังคับกับการใช้งานแอปพลิเคชัน <B>MASS Merchant</B>{' '}
            และบริการที่เกี่ยวข้อง โดยร้านค้า/ผู้ขาย (“ร้านค้า” หรือ “คุณ”) ที่เป็นพาร์ทเนอร์กับ {SITE.legalName} (“MASS” หรือ “เรา”)
          </P>
          <P>
            เมื่อคุณลงทะเบียน เข้าถึง หรือใช้งานแอป Merchant ถือว่าคุณได้อ่าน เข้าใจ และตกลงผูกพันตามข้อกำหนดนี้ รวมถึง{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/privacy">
              นโยบายความเป็นส่วนตัว
            </Link>{' '}
            หากคุณไม่ยอมรับ กรุณาหยุดใช้งานบริการ
          </P>
        </>
      ) : (
        <>
          <P>
            These Terms and Conditions (“Terms”) govern the use of the <B>MASS Merchant</B> app and related
            services by stores/sellers (“Merchant” or “you”) partnering with {SITE.legalName} (“MASS” or “we”).
          </P>
          <P>
            By registering for, accessing, or using the Merchant app, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and our{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/privacy">
              Privacy Policy
            </Link>
            . If you do not accept them, please stop using the service.
          </P>
        </>
      ),
    },
    {
      n: '2',
      title: th ? 'คุณสมบัติและการลงทะเบียนร้านค้า' : 'Eligibility & Registration',
      body: th ? (
        <>
          <P>
            ร้านค้าต้องเป็นบุคคลหรือนิติบุคคลที่ประกอบกิจการโดยชอบด้วยกฎหมายและมีความสามารถในการทำสัญญา
            ในการลงทะเบียน คุณต้องให้ข้อมูลและเอกสารที่ถูกต้อง ครบถ้วน และเป็นปัจจุบัน ได้แก่
          </P>
          <UL>
            <li>ข้อมูลร้าน — ชื่อร้าน ประเภทธุรกิจ ที่อยู่ และเวลาทำการ</li>
            <li>เอกสารยืนยันตัวตน/นิติบุคคล (KYC) — บัตรประชาชนหรือหนังสือรับรองบริษัท ทะเบียนพาณิชย์ และรูปถ่ายร้าน</li>
            <li>ข้อมูลบัญชีธนาคารสำหรับรับโอนยอดขาย</li>
          </UL>
          <P>เราขอสงวนสิทธิ์ในการตรวจสอบ อนุมัติ หรือปฏิเสธการลงทะเบียน และขอเอกสารเพิ่มเติมเมื่อจำเป็น</P>
        </>
      ) : (
        <>
          <P>
            The Merchant must be a legally operating individual or entity with the capacity to enter into
            contracts. When registering, you must provide accurate, complete, and current information and
            documents, including:
          </P>
          <UL>
            <li>Store details — store name, business type, address, and operating hours</li>
            <li>Identity/entity documents (KYC) — national ID card or company certificate, commercial registration, and store photos</li>
            <li>Bank account details for receiving sales proceeds</li>
          </UL>
          <P>We reserve the right to verify, approve, or reject registrations, and to request additional documents when necessary.</P>
        </>
      ),
    },
    {
      n: '3',
      title: th ? 'บัญชีร้านค้าและความปลอดภัย' : 'Merchant Account & Security',
      body: th ? (
        <P>
          คุณมีหน้าที่รักษาข้อมูลบัญชีและรหัสผ่านไว้เป็นความลับ และรับผิดชอบต่อกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ
          หากพบการเข้าถึงโดยไม่ได้รับอนุญาต กรุณาแจ้งเราทันที
        </P>
      ) : (
        <P>
          You are responsible for keeping your account credentials confidential and for all activity that occurs
          under your account. If you become aware of any unauthorized access, please notify us immediately.
        </P>
      ),
    },
    {
      n: '4',
      title: th ? 'ความรับผิดชอบของร้านค้า' : 'Merchant Responsibilities',
      body: th ? (
        <UL>
          <li>ให้ข้อมูลเมนู ราคา รายละเอียด และรูปภาพสินค้าที่ถูกต้องและเป็นปัจจุบัน</li>
          <li>อัปเดตสถานะการเปิด-ปิดร้านและความพร้อมจำหน่ายสินค้าให้ตรงกับความเป็นจริง</li>
          <li>ปฏิบัติตามมาตรฐานความสะอาด ความปลอดภัยด้านอาหาร และกฎหมาย/ใบอนุญาตที่เกี่ยวข้อง</li>
          <li>เตรียมและส่งมอบสินค้าตามคำสั่งซื้อที่ตอบรับด้วยคุณภาพและความถูกต้อง</li>
          <li>รับผิดชอบต่อคุณภาพ ความปลอดภัย และความถูกต้องของสินค้าที่จำหน่าย</li>
        </UL>
      ) : (
        <UL>
          <li>Provide accurate and current menu items, prices, descriptions, and product photos</li>
          <li>Keep your open/closed status and product availability up to date and truthful</li>
          <li>Comply with hygiene standards, food safety, and applicable laws/licenses</li>
          <li>Prepare and fulfil accepted orders with quality and accuracy</li>
          <li>Be responsible for the quality, safety, and correctness of the products you sell</li>
        </UL>
      ),
    },
    {
      n: '5',
      title: th ? 'คำสั่งซื้อ การเตรียม และการจัดส่ง' : 'Orders, Preparation & Delivery',
      body: th ? (
        <P>
          เมื่อคุณตอบรับคำสั่งซื้อ คุณตกลงจะเตรียมสินค้าให้พร้อมภายในเวลาที่เหมาะสม การจัดส่งดำเนินการโดยไรเดอร์ของ MASS
          หรือตามที่ตกลงกัน การยกเลิกและการคืนเงินให้เป็นไปตามนโยบายที่เรากำหนดและกฎหมายที่เกี่ยวข้อง
          การยกเลิกซ้ำ ๆ หรือการปฏิเสธคำสั่งซื้อโดยไม่มีเหตุอันควรอาจมีผลต่อสถานะบัญชีของคุณ
        </P>
      ) : (
        <P>
          When you accept an order, you agree to prepare it within a reasonable time. Delivery is carried out by
          MASS riders or as otherwise arranged. Cancellations and refunds follow our policies and applicable law.
          Repeated cancellations or unjustified order rejections may affect your account status.
        </P>
      ),
    },
    {
      n: '6',
      title: th ? 'การชำระเงินและการโอนยอดขาย' : 'Payments & Settlement',
      body: th ? (
        <P>
          การชำระเงินจากลูกค้าดำเนินการผ่านแพลตฟอร์มและผู้ให้บริการระบบชำระเงินที่ได้รับอนุญาต (Omise)
          ยอดขายจะถูกโอนเข้าบัญชีธนาคารที่คุณลงทะเบียนไว้ตามรอบการโอนที่ตกลงกัน คุณมีหน้าที่ตรวจสอบความถูกต้องของบัญชีธนาคาร
          และรับผิดชอบภาษีที่เกี่ยวข้องกับรายได้ของคุณตามกฎหมาย
        </P>
      ) : (
        <P>
          Customer payments are processed through the platform and a licensed payment provider (Omise). Sales
          proceeds are transferred to your registered bank account per the agreed settlement cycle. You are
          responsible for ensuring your bank details are correct and for any taxes relating to your income under
          the law.
        </P>
      ),
    },
    {
      n: '7',
      title: th ? 'เนื้อหา รูปภาพ และทรัพย์สินทางปัญญา' : 'Content, Images & IP',
      body: th ? (
        <P>
          คุณให้สิทธิ์แก่ MASS ในการใช้ จัดเก็บ และแสดงเนื้อหาที่คุณอัปโหลด (เช่น ชื่อร้าน โลโก้ เมนู และรูปภาพสินค้า)
          เพื่อการแสดงผลและประชาสัมพันธ์ร้านของคุณบนแพลตฟอร์ม คุณรับรองว่าคุณเป็นเจ้าของหรือมีสิทธิ์ในเนื้อหาดังกล่าว
          และเนื้อหานั้นไม่ละเมิดสิทธิ์ของบุคคลอื่น
        </P>
      ) : (
        <P>
          You grant MASS a license to use, store, and display the content you upload (such as store name, logo,
          menu, and product photos) to present and promote your store on the platform. You warrant that you own
          or have the rights to such content and that it does not infringe the rights of others.
        </P>
      ),
    },
    {
      n: '8',
      title: th ? 'สินค้าและการกระทำต้องห้าม' : 'Prohibited Products & Conduct',
      body: th ? (
        <UL>
          <li>จำหน่ายสินค้าผิดกฎหมาย สินค้าอันตราย หรือสินค้าที่ต้องห้ามตามกฎหมาย</li>
          <li>ให้ข้อมูลสินค้า ราคา หรือรูปภาพอันเป็นเท็จหรือทำให้เข้าใจผิด</li>
          <li>ปั่นยอด สร้างออเดอร์ปลอม หรือบิดเบือนคะแนนรีวิว</li>
          <li>ละเมิดทรัพย์สินทางปัญญาหรือสิทธิ์ของบุคคลอื่น</li>
        </UL>
      ) : (
        <UL>
          <li>Selling illegal, unsafe, or legally prohibited products</li>
          <li>Providing false or misleading product information, prices, or images</li>
          <li>Manipulating orders, creating fake orders, or distorting review ratings</li>
          <li>Infringing intellectual property or the rights of others</li>
        </UL>
      ),
    },
    {
      n: '9',
      title: th ? 'การระงับและยกเลิกบัญชี' : 'Suspension & Termination',
      body: th ? (
        <P>
          เราอาจระงับหรือยกเลิกบัญชีร้านค้าของคุณ หากพบการฝ่าฝืนข้อกำหนดนี้ การทุจริต ปัญหาด้านความปลอดภัย
          หรือเมื่อจำเป็นตามกฎหมาย คุณสามารถหยุดใช้บริการและขอปิดบัญชีได้ตลอดเวลา
          เมื่อบัญชีสิ้นสุด สิทธิ์ในการเข้าถึงแอปจะยุติ แต่ภาระผูกพันที่เกิดขึ้นก่อนหน้ายังคงมีผล
        </P>
      ) : (
        <P>
          We may suspend or terminate your Merchant account if we detect a breach of these Terms, fraud, safety
          concerns, or where required by law. You may stop using the service and request account closure at any
          time. Upon termination, your access to the app ends, but obligations incurred before termination remain
          in effect.
        </P>
      ),
    },
    {
      n: '10',
      title: th ? 'ข้อจำกัดความรับผิด' : 'Disclaimers & Limitation of Liability',
      body: th ? (
        <P>
          บริการจัดให้ “ตามสภาพที่เป็นอยู่” เท่าที่กฎหมายอนุญาต MASS ไม่รับผิดต่อความเสียหายทางอ้อม
          ความเสียหายสืบเนื่อง หรือการสูญเสียรายได้ที่เกิดจากการใช้บริการ ร้านค้าเป็นผู้รับผิดชอบต่อสินค้าและบริการของตนเอง
          รวมถึงข้อพิพาทกับลูกค้าที่เกี่ยวกับคุณภาพหรือความปลอดภัยของสินค้า
        </P>
      ) : (
        <P>
          The service is provided “as is” to the extent permitted by law. MASS is not liable for indirect,
          consequential, or lost-profit damages arising from use of the service. The Merchant is responsible for
          its own products and services, including disputes with customers regarding product quality or safety.
        </P>
      ),
    },
    {
      n: '11',
      title: th ? 'การชดใช้ค่าเสียหาย' : 'Indemnity',
      body: th ? (
        <P>
          คุณตกลงจะชดใช้และปกป้อง MASS จากข้อเรียกร้อง ความรับผิด หรือค่าใช้จ่ายที่เกิดจากการที่คุณฝ่าฝืนข้อกำหนดนี้
          หรือจากสินค้า/บริการของร้านค้า
        </P>
      ) : (
        <P>
          You agree to indemnify and hold MASS harmless from any claims, liabilities, or expenses arising from your
          breach of these Terms or from your products/services.
        </P>
      ),
    },
    {
      n: '12',
      title: th ? 'กฎหมายที่ใช้บังคับ' : 'Governing Law',
      body: th ? (
        <P>ข้อกำหนดนี้อยู่ภายใต้บังคับและการตีความตามกฎหมายแห่งราชอาณาจักรไทย ข้อพิพาทให้อยู่ในเขตอำนาจของศาลไทย</P>
      ) : (
        <P>
          These Terms are governed by and construed under the laws of the Kingdom of Thailand, and disputes are
          subject to the jurisdiction of the Thai courts.
        </P>
      ),
    },
    {
      n: '13',
      title: th ? 'การเปลี่ยนแปลงข้อกำหนด' : 'Changes to These Terms',
      body: th ? (
        <P>
          เราอาจปรับปรุงข้อกำหนดนี้เป็นครั้งคราว หากมีการเปลี่ยนแปลงที่สำคัญ เราจะแจ้งผ่านแอปหรือช่องทางอื่นที่เหมาะสม
          การใช้งานต่อเนื่องหลังการเปลี่ยนแปลงถือว่าคุณยอมรับข้อกำหนดที่ปรับปรุงแล้ว
        </P>
      ) : (
        <P>
          We may update these Terms from time to time. For significant changes, we will notify you through the app
          or other appropriate channels. Continued use after changes constitutes acceptance of the updated Terms.
        </P>
      ),
    },
    {
      n: '14',
      title: th ? 'ติดต่อเรา' : 'Contact Us',
      body: th ? (
        <>
          <UL>
            <li>
              <B>{SITE.legalName}</B> (เลขทะเบียนนิติบุคคล {REG_NO})
            </li>
            <li>ที่อยู่: {ADDRESS_TH}</li>
            <li>
              อีเมล:{' '}
              <a className="font-semibold text-mass-600 hover:text-mass-700" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
          </UL>
          <P>
            ดูช่องทางช่วยเหลืออื่น ๆ ได้ที่หน้า{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/support">
              ศูนย์ช่วยเหลือ
            </Link>
          </P>
        </>
      ) : (
        <>
          <UL>
            <li>
              <B>{SITE.legalName}</B> (company registration no. {REG_NO})
            </li>
            <li>Address: {ADDRESS_EN}</li>
            <li>
              Email:{' '}
              <a className="font-semibold text-mass-600 hover:text-mass-700" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
          </UL>
          <P>
            See other support channels on our{' '}
            <Link className="font-semibold text-mass-600 hover:text-mass-700" to="/support">
              Help Center
            </Link>
          </P>
        </>
      ),
    },
  ]
}

export default function Terms() {
  const { lang } = useI18n()
  const th = lang === 'th'
  const SECTIONS = buildSections(th)

  return (
    <>
      <Seo
        title={th ? 'ข้อกำหนดและเงื่อนไข — ร้านค้า' : 'Terms & Conditions — Merchant'}
        description={
          th
            ? 'ข้อกำหนดและเงื่อนไขสำหรับร้านค้าพาร์ทเนอร์ที่ใช้แอป MASS Merchant — การลงทะเบียน ความรับผิดชอบ การชำระเงิน และการยกเลิกบัญชี'
            : 'Terms & Conditions for merchant partners using the MASS Merchant app — registration, responsibilities, payments, and account termination.'
        }
        path="/terms"
        jsonLd={breadcrumb([
          { name: th ? 'หน้าแรก' : 'Home', path: '/' },
          { name: th ? 'ข้อกำหนดและเงื่อนไข' : 'Terms & Conditions', path: '/terms' },
        ])}
      />

      <Section className="pb-8">
        <SectionHeading
          eyebrow={th ? 'ข้อกำหนด · ร้านค้า' : 'Terms · Merchant'}
          title={th ? 'ข้อกำหนดและเงื่อนไข — ร้านค้า' : 'Terms & Conditions — Merchant'}
          subtitle={
            th
              ? 'สำหรับร้านค้า/ผู้ขายที่เป็นพาร์ทเนอร์และใช้แอป MASS Merchant — บริษัท แมส ไรด์ แอนด์ เดลิเวอรี่ จำกัด'
              : 'For merchant partners using the MASS Merchant app — MASS RIDE & DELIVERY Co., Ltd.'
          }
        />
        <Reveal>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-ink-400">
            <span>
              {th ? 'มีผลบังคับใช้: ' : 'Effective: '}
              <span className="font-semibold text-ink-600">{th ? EFFECTIVE[0] : EFFECTIVE[1]}</span>
            </span>
            <span>
              {th ? 'ปรับปรุงล่าสุด: ' : 'Last updated: '}
              <span className="font-semibold text-ink-600">{th ? UPDATED[0] : UPDATED[1]}</span>
            </span>
            <span>
              {th ? 'ผู้ให้บริการ: ' : 'Provider: '}
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
                ? 'เอกสารนี้เป็นข้อกำหนดการใช้งานสำหรับร้านค้าพาร์ทเนอร์ · '
                : 'These are the terms of use for merchant partners · '}
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
