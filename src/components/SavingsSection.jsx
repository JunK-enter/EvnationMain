'use client'

import { useMemo } from 'react'
import { Fuel, Clock, TrendingUp, BatteryCharging, BadgeDollarSign } from 'lucide-react'
import { calculateGasSavings } from '../services/quoteCalculator'
import { useTranslation } from '@/i18n/LocaleProvider'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import Reveal from '@/lib/Reveal'

export default function SavingsSection({ embedded = false }) {
  const { t } = useTranslation()
  const savings = calculateGasSavings()

  const benefits = useMemo(
    () => [
      { icon: Fuel, title: t('home.savings.benefit1Title'), desc: t('home.savings.benefit1Desc') },
      { icon: Clock, title: t('home.savings.benefit2Title'), desc: t('home.savings.benefit2Desc') },
      { icon: TrendingUp, title: t('home.savings.benefit3Title'), desc: t('home.savings.benefit3Desc') },
      { icon: BatteryCharging, title: t('home.savings.benefit4Title'), desc: t('home.savings.benefit4Desc') },
      { icon: BadgeDollarSign, title: t('home.savings.benefit5Title'), desc: t('home.savings.benefit5Desc') },
    ],
    [t]
  )

  return (
    <section className={embedded ? 'relative pt-14 sm:pt-16 lg:pt-20 mt-2 border-t border-white/[0.06]' : 'section-padding relative overflow-hidden section-scrim-alt'}>
      {!embedded && <SectionAmbient sweep />}
      <div className={embedded ? '' : 'max-w-7xl mx-auto relative'}>
        <SectionHeader
          eyebrow={t('home.savings.eyebrow')}
          title={t('home.savings.title')}
          className={`text-center ${embedded ? 'mb-10' : 'mb-16'}`}
        />

        <div className={`grid lg:grid-cols-3 gap-6 sm:gap-8 ${embedded ? 'mb-10' : 'mb-16'}`}>
          <Reveal className="glass rounded-2xl p-8 text-center neon-border">
            <p className="text-sm text-slate-400 mb-2">{t('home.savings.annualGas')}</p>
            <p className="font-display text-4xl font-bold text-red-400 line-through decoration-2">${savings.annualGasCost.toLocaleString()}</p>
          </Reveal>
          <Reveal delay={0.1} className="glass rounded-2xl p-8 text-center neon-border">
            <p className="text-sm text-slate-400 mb-2">{t('home.savings.annualEv')}</p>
            <p className="font-display text-4xl font-bold text-neon">${savings.annualEvCost.toLocaleString()}</p>
          </Reveal>
          <Reveal delay={0.2} className="glass rounded-2xl p-8 text-center neon-border">
            <p className="text-sm text-slate-400 mb-2">{t('home.savings.fiveYear')}</p>
            <p className="font-display text-4xl font-bold text-white">${savings.fiveYearSavings.toLocaleString()}</p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.08}
              className="glass-light rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-neon" />
              </div>
              <h3 className="font-display font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
