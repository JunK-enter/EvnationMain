'use client'

import Link from '@/components/Link'
import { ArrowRight } from 'lucide-react'

export default function ServiceOfferCard({
  title,
  desc,
  img,
  to,
  icon: Icon,
  ctaLabel,
  imgFit = 'cover',
  compact = false,
}) {
  const imgClass =
    imgFit === 'contain'
      ? 'object-contain object-center'
      : 'object-cover object-center lg:group-hover:scale-105'

  if (compact) {
    return (
      <Link
        to={to}
        className="mobile-card group flex flex-col h-full rounded-xl overflow-hidden border border-white/[0.08] bg-navy-900/50 active:scale-[0.98] transition-transform"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-950">
          <img
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full ${imgClass}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
          <span className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-neon/15 border border-neon/25 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-neon" />
          </span>
        </div>
        <div className="p-2.5">
          <h3 className="font-display font-semibold text-[11px] leading-snug text-white line-clamp-2">{title}</h3>
          <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-neon">
            {ctaLabel}
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={to}
      className="group flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-neon/35 hover:shadow-[0_0_32px_rgba(0,255,136,0.1)] transition-all max-lg:hover:shadow-none max-lg:hover:border-white/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
        <img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full transition-transform duration-700 max-lg:transition-none ${imgClass}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
      </div>
      <div className="flex flex-col flex-1 p-4 sm:p-6 lg:p-7">
        <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neon/10 border border-neon/25 flex items-center justify-center mb-3 sm:mb-4">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-neon" />
        </span>
        <h3 className="font-display font-bold text-base sm:text-xl text-white mb-1.5 sm:mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed flex-1 line-clamp-3 sm:line-clamp-none">{desc}</p>
        <span className="inline-flex items-center gap-1.5 mt-4 sm:mt-5 text-xs sm:text-sm font-semibold text-neon group-hover:text-white transition-colors">
          {ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform max-lg:group-hover:translate-x-0" />
        </span>
      </div>
    </Link>
  )
}
