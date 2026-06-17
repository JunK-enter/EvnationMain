'use client'

import Link from '@/components/Link'
import { ArrowRight, Phone } from 'lucide-react'
import { useTranslation } from '@/i18n/LocaleProvider'

export default function HomeFinalCTA() {
  const { t } = useTranslation()

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-glow section-glow-neon" aria-hidden />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-3xl overflow-hidden border border-neon/20 p-8 sm:p-12 lg:p-14 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-neon/[0.12] via-navy-900/40 to-blue-500/[0.08]" />
          <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
          <div className="relative">
            <p className="text-neon text-xs font-bold tracking-[0.25em] uppercase mb-4">{t('home.finalCta.eyebrow')}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">
              {t('home.finalCta.title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              {t('home.finalCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote" className="btn-primary justify-center">
                {t('common.buildQuote')} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:8669136199" className="btn-secondary justify-center">
                <Phone className="w-4 h-4" /> 866-913-6199
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
