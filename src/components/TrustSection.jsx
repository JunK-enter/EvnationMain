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
          className="text-center mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.08}
              className="glass rounded-2xl p-6 hover:border-neon/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <r.icon className="w-6 h-6 text-neon" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {statLabels.map((stat) => (
            <div key={stat.label} className="glass-light rounded-2xl p-6">
              <p className="font-display text-3xl font-bold text-neon">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
