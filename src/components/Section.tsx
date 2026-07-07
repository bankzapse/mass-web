import { motion } from 'framer-motion'
import { cx } from '../lib/ui'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  action,
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        center && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cx('max-w-2xl', center && 'mx-auto')}>
        {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
        <h2 className="text-balance text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-3 text-balance text-[17px] leading-relaxed text-ink-500">{subtitle}</p>}
      </div>
      {action && <div className="flex-none">{action}</div>}
    </div>
  )
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cx('py-16 sm:py-20', className)}>
      <div className="container-mass">{children}</div>
    </section>
  )
}
