'use client'

import { useMemo } from 'react'
import { Bolt, BatteryCharging, LayoutGrid } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import ServiceOfferCard from './ServiceOfferCard'
import { useTranslation } from '@/i18n/LocaleProvider'
import Reveal from '@/lib/Reveal'

export default function SolutionsSection() {
  const { t } = useTranslation()

  const pillars = useMemo(
    () => [
      {
        title: t('home.solutions.residentialTitle'),
        desc: t('home.solutions.residentialDesc'),
        img: '/images/solutions/residential-ev-charger.jpg',
        to: '/residential-ev-charging',
        icon: Bolt,
      },
      {
        title: t('home.solutions.panelTitle'),
        desc: t('home.solutions.panelDesc'),
        img: '/images/projects/costa-mesa-panel/after-interior.png',
        to: '/panel-upgrades',
        icon: LayoutGrid,
      },
      {
        title: t('home.solutions.powerwallTitle'),
        desc: t('home.solutions.powerwallDesc'),
        img: '/images/tesla-powerwall-hero.png',
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

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.to}
              delay={index * 0.05}
              y={16}
              viewport={{ once: true, margin: '-40px', amount: 0.15 }}
            >
              <ServiceOfferCard {...pillar} ctaLabel={t('servicesHub.viewService')} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
