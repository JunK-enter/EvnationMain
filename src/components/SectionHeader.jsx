'use client'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = 'text-center mb-12',
  titleClassName = 'font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white',
  subtitleClassName = 'text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed',
  accent = false,
}) {
  const centered = className.includes('text-center') || !className.includes('text-left')

  return (
    <div className={className}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
          <span className={`h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-neon/45 ${centered ? '' : 'hidden sm:block'}`} />
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neon text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
            {eyebrow}
          </p>
          <span className={`h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-neon/45 ${centered ? '' : 'hidden sm:block'}`} />
        </div>
      )}
      {title && (
        <h2 className={titleClassName}>
          {accent ? (
            <>
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="hero-gradient-text">{title.split(' ').slice(-1)}</span>
            </>
          ) : (
            title
          )}
        </h2>
      )}
      {title && (
        <div className={`mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-neon/50 via-neon/80 to-accent-blue/50 ${centered ? 'mx-auto' : ''}`} />
      )}
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
    </div>
  )
}
