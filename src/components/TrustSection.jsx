'use client'

import { useMemo } from 'react'
import { Shield, FileCheck, Sparkles, DollarSign, Users, Award } from 'lucide-react'
import { stats as localStats, serviceArea } from '@/data/localSeo'
import { useTranslation } from '@/i18n/LocaleProvider'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import Reveal from '@/lib/Reveal'

export default function TrustSection() {
  const { t } = useTranslation()

  const reasons = useMemo(
    () => [
      { icon: Shield, title: t('home.trust.reason1Title'), desc: t('home.trust.reason1Desc') },
      { icon: FileCheck, title: t('home.trust.reason2Title'), desc: t('home.trust.reason2Desc') },
      { icon: Sparkles, title: t('home.trust.reason3Title'), desc: t('home.trust.reason3Desc') },
      { icon: DollarSign, title: t('home.trust.reason4Title'), desc: t('home.trust.reason4Desc') },
      { icon: Users, title: t('home.trust.reason5Title'), desc: t('home.trust.reason5Desc') },
      { icon: Award, title: t('home.trust.reason6Title'), desc: t('home.trust.reason6Desc') },
    ],
    [t]
  )

  const statLabels = useMemo(
    () => [
      { value: localStats.installations, label: t('home.trust.statInstalls') },
      { value: localStats.rating, label: t('home.trust.statRating') },
      { value: localStats.serviceArea, label: t('home.trust.statAreas') },
      { value: localStats.quoteTurnaround, label: t('home.trust.statQuote') },
    ],
    [t]
  )

  return (
    <section className="section-padding relative overflow-hidden section-scrim">
      <div className="section-glow section-glow-neon" aria-hidden />
      <SectionAmbient />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          eyebrow={t('home.trust.eyebrow')}
          title={t('home.trust.title')}
          subtitle={t('home.trust.subtitle', { region: serviceArea.region })}
          className="text-center mb-8 sm:mb-16"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.08}
              className="mobile-card glass rounded-xl sm:rounded-2xl p-3.5 sm:p-6 max-lg:hover:border-white/10 lg:hover:border-neon/20 transition-colors"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-neon/10 flex items-center justify-center mb-2.5 sm:mb-4">
                <r.icon className="w-4 h-4 sm:w-6 sm:h-6 text-neon" />
              </div>
              <h3 className="font-display font-semibold text-xs sm:text-lg mb-1 sm:mb-2 leading-snug">{r.title}</h3>
              <p className="text-[10px] sm:text-sm text-slate-400 leading-relaxed line-clamp-4 sm:line-clamp-none">{r.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 text-center">
          {statLabels.map((stat) => (
            <div key={stat.label} className="glass-light rounded-xl sm:rounded-2xl p-3.5 sm:p-6">
              <p className="font-display text-xl sm:text-3xl font-bold text-neon">{stat.value}</p>
              <p className="text-[10px] sm:text-sm text-slate-400 mt-0.5 sm:mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
