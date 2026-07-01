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
}) {
  const imgClass =
    imgFit === 'contain'
      ? 'object-contain object-center'
      : 'object-cover object-center lg:group-hover:scale-105'

  return (
    <Link
      to={to}
      className="group flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-neon/35 hover:shadow-[0_0_32px_rgba(0,255,136,0.1)] transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full transition-transform duration-700 ${imgClass}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
      </div>
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <span className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/25 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-neon" />
        </span>
        <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed flex-1">{desc}</p>
        <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-neon group-hover:text-white transition-colors">
          {ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
