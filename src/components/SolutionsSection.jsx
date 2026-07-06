'use client'

import { useMemo } from 'react'
import { ArrowLeftRight, BatteryCharging, Bolt, LayoutGrid } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import ServiceOfferCard from './ServiceOfferCard'
import { useTranslation } from '@/i18n/LocaleProvider'
import { useIsMobile } from '@/lib/useMediaQuery'
import Reveal from '@/lib/Reveal'

export default function SolutionsSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const pillars = useMemo(
    () => [
      {
        title: t('home.solutions.evChargingTitle'),
        desc: t('home.solutions.evChargingDesc'),
        img: '/images/solutions/residential-ev-charger.jpg',
        to: '/residential-ev-charging',
        icon: Bolt,
      },
      {
        title: t('home.solutions.biDirectionalTitle'),
        desc: t('home.solutions.biDirectionalDesc'),
        img: '/images/solutions/tesla-bidirectional-charging.png',
        to: '/bi-directional-charging',
        icon: ArrowLeftRight,
      },
      {
        title: t('home.solutions.panelTitle'),
        desc: t('home.solutions.panelDesc'),
        img: '/images/solutions/panel-upgrade.jpg',
        to: '/panel-upgrades',
        icon: LayoutGrid,
      },
      {
        title: t('home.solutions.powerwallBatteryTitle'),
        desc: t('home.solutions.powerwallBatteryDesc'),
        img: '/images/batteries/tesla-powerwall-hero.png',
        to: '/battery',
        icon: BatteryCharging,
      },
    ],
    [t]
  )

  return (
    <section className="section-padding relative overflow-hidden">
      <SectionAmbient sweep />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow={t('home.solutions.eyebrow')}
          title={t('home.solutions.title')}
          accent
          subtitle={t('home.solutions.subtitle')}
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-6">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.to}
              delay={index * 0.05}
              y={16}
              viewport={{ once: true, margin: '-40px', amount: 0.15 }}
            >
              <ServiceOfferCard {...pillar} ctaLabel={t('servicesHub.viewService')} compact={isMobile} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
