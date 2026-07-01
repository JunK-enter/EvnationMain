'use client'

import { useMemo } from 'react'
import { Bolt, LayoutGrid, BatteryCharging, Home } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import ServiceOfferCard from '@/components/ServiceOfferCard'
import { useTranslation } from '@/i18n/LocaleProvider'

export default function ResidentialServicesPage() {
  const { t } = useTranslation()

  const offers = useMemo(
    () => [
      {
        title: t('servicesHub.residential.evTitle'),
        desc: t('servicesHub.residential.evDesc'),
        img: '/images/solutions/residential-ev-charger.jpg',
        to: '/residential-ev-charging',
        icon: Bolt,
      },
      {
        title: t('servicesHub.residential.panelTitle'),
        desc: t('servicesHub.residential.panelDesc'),
        img: '/images/projects/costa-mesa-panel/after-interior.png',
        to: '/panel-upgrades',
        icon: LayoutGrid,
      },
      {
        title: t('servicesHub.residential.powerwallTitle'),
        desc: t('servicesHub.residential.powerwallDesc'),
        img: '/images/tesla-powerwall-hero.png',
        to: '/battery',
        icon: BatteryCharging,
      },
    ],
    [t]
  )

  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden">
        <div className="glow-orb w-[420px] h-[420px] bg-neon/8 top-[-10%] right-[-5%]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-sm mb-6">
            <Home className="w-4 h-4" />
            {t('servicesHub.residential.badge')}
          </div>
          <SectionHeader
            title={t('servicesHub.residential.title')}
            accent
            subtitle={t('servicesHub.residential.subtitle')}
            className="max-w-2xl mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <ServiceOfferCard key={offer.to} {...offer} ctaLabel={t('servicesHub.viewService')} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
