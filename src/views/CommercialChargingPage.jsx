'use client'

import { useMemo } from 'react'
import Link from '@/components/Link'
import { Building2, Zap, Gauge, Users, Truck, ArrowRight, Phone, Leaf, Calculator } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { useTranslation } from '@/i18n/LocaleProvider'

const COMMERCIAL_PROFIT_CALCULATOR_URL =
  'https://cdn.creatify.ai/agent/ads/e11bcf41-a62a-4d2d-a40b-e9e041c2ad74/final-calculator.html'

function OfferBlock({ icon: Icon, title, desc }) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-7 h-full border border-white/[0.08]">
      <div className="w-11 h-11 rounded-xl bg-neon/10 border border-neon/25 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-neon" />
      </div>
      <h3 className="font-display font-semibold text-lg text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  )
}

export default function CommercialChargingPage() {
  const { t } = useTranslation()

  const offers = useMemo(
    () => [
      {
        icon: Zap,
        title: t('servicesHub.commercial.l2Title'),
        desc: t('servicesHub.commercial.l2Desc'),
      },
      {
        icon: Gauge,
        title: t('servicesHub.commercial.l3Title'),
        desc: t('servicesHub.commercial.l3Desc'),
      },
      {
        icon: Users,
        title: t('servicesHub.commercial.multifamilyTitle'),
        desc: t('servicesHub.commercial.multifamilyDesc'),
      },
      {
        icon: Truck,
        title: t('servicesHub.commercial.fleetTitle'),
        desc: t('servicesHub.commercial.fleetDesc'),
      },
    ],
    [t]
  )

  const co2Stats = useMemo(
    () => [
      {
        value: t('servicesHub.commercial.co2Stat1Value'),
        label: t('servicesHub.commercial.co2Stat1Label'),
        desc: t('servicesHub.commercial.co2Stat1Desc'),
      },
      {
        value: t('servicesHub.commercial.co2Stat2Value'),
        label: t('servicesHub.commercial.co2Stat2Label'),
        desc: t('servicesHub.commercial.co2Stat2Desc'),
      },
      {
        value: t('servicesHub.commercial.co2Stat3Value'),
        label: t('servicesHub.commercial.co2Stat3Label'),
        desc: t('servicesHub.commercial.co2Stat3Desc'),
      },
    ],
    [t]
  )

  return (
    <div className="page-top page-bottom lg:pb-20">
      <section className="relative overflow-hidden">
        <div className="glow-orb w-[480px] h-[480px] bg-neon/8 top-[-12%] left-[-8%]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-sm mb-6">
                <Building2 className="w-4 h-4" />
                {t('servicesHub.commercial.badge')}
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-5">
                {t('servicesHub.commercial.title')}{' '}
                <span className="neon-text">{t('servicesHub.commercial.titleAccent')}</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                {t('servicesHub.commercial.subtitle')}
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden neon-border aspect-[4/3]">
              <img
                src="/images/solutions/commercial-ev-charging.png"
                alt={t('servicesHub.commercial.imageAlt')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
            </div>
          </div>

          <SectionHeader
            eyebrow={t('servicesHub.commercial.offersEyebrow')}
            title={t('servicesHub.commercial.offersTitle')}
            subtitle={t('servicesHub.commercial.offersSubtitle')}
            className="text-center max-w-2xl mx-auto mb-10"
          />

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {offers.map((offer) => (
              <OfferBlock key={offer.title} {...offer} />
            ))}
          </div>

          <div className="mb-14 rounded-3xl border border-neon/25 bg-gradient-to-br from-neon/[0.08] via-white/[0.02] to-transparent overflow-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-wider mb-4">
                  <Calculator className="w-3.5 h-3.5" />
                  {t('servicesHub.commercial.profitCalcEyebrow')}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                  {t('servicesHub.commercial.profitCalcTitle')}
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {t('servicesHub.commercial.profitCalcDesc')}
                </p>
              </div>
              <a
                href={COMMERCIAL_PROFIT_CALCULATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center shrink-0 inline-flex items-center gap-2"
              >
                {t('servicesHub.commercial.profitCalcButton')} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mb-14 rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl mb-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">
                  {t('servicesHub.commercial.co2Eyebrow')}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                  {t('servicesHub.commercial.co2Title')}
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {t('servicesHub.commercial.co2Intro')}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {co2Stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-light rounded-2xl p-5 border border-white/[0.06]"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Leaf className="w-4 h-4 text-neon shrink-0" />
                      <p className="font-display text-2xl sm:text-3xl font-bold text-neon tabular-nums leading-none">
                        {stat.value}
                      </p>
                    </div>
                    <p className="font-semibold text-sm text-white mb-2 leading-snug">{stat.label}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{stat.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed border-t border-white/[0.06] pt-5">
                {t('servicesHub.commercial.co2Note')}
              </p>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 sm:p-10 text-center border border-neon/20 bg-neon/[0.03]">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              {t('servicesHub.commercial.ctaTitle')}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
              {t('servicesHub.commercial.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-primary justify-center">
                {t('servicesHub.commercial.contactUs')} <Phone className="w-4 h-4" />
              </Link>
              <Link to="/quote" className="btn-secondary justify-center">
                {t('nav.getQuote')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
