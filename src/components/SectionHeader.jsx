'use client'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = 'text-center mb-12',
  titleClassName = 'font-display text-2xl sm:text-3xl lg:text-4xl font-bold',
  subtitleClassName = 'text-slate-400 mt-4 max-w-2xl mx-auto',
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{eyebrow}</p>
      )}
      {title && <h2 className={titleClassName}>{title}</h2>}
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
    </div>
  )
}
