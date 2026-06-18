'use client'

import Link from '@/components/Link'
import { memo, useMemo } from 'react'
import { ArrowUpRight, Bolt, Building2, BatteryCharging, ShieldCheck } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import { useTranslation } from '@/i18n/LocaleProvider'
import Reveal from '@/lib/Reveal'

const PillarCard = memo(function PillarCard({ title, desc, img, to, icon: Icon, span, big, index }) {
  return (
    <Reveal
      delay={index * 0.05}
      y={16}
      viewport={{ once: true, margin: '-40px', amount: 0.15 }}
      className={span}
    >
    <Link
      to={to}
      className={`group relative block rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-neon/40 hover:shadow-[0_0_36px_rgba(0,255,136,0.12)] active:scale-[0.99] transition-all min-h-[200px] sm:min-h-[220px] h-full ${big ? 'lg:min-h-[460px] ring-1 ring-neon/0 hover:ring-neon/25' : ''}`}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-9 h-9 rounded-xl bg-neon/15 backdrop-blur-sm border border-neon/30 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-neon" />
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`font-display font-bold text-white drop-shadow ${big ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{title}</h3>
            <p className={`text-slate-300/90 mt-1.5 leading-relaxed ${big ? 'text-sm max-w-md' : 'text-xs'}`}>{desc}</p>
          </div>
          <span className="w-9 h-9 rounded-full bg-neon text-navy-950 flex items-center justify-center shrink-0 opacity-100 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
    </Reveal>
  )
})

export default function SolutionsSection() {
  const { t } = useTranslation()

  const pillars = useMemo(
    () => [
      {
        title: t('home.solutions.residentialTitle'),
        desc: t('home.solutions.residentialDesc'),
        img: '/images/solutions/domestic-ev-charger-768x308.jpg',
        to: '/residential-ev-charging',
        icon: Bolt,
        span: 'lg:col-span-2 lg:row-span-2',
        big: true,
      },
      {
        title: t('home.solutions.solarTitle'),
        desc: t('home.solutions.solarDesc'),
        img: '/images/solutions/commercial-ev-charger-768x308.jpg',
        to: '/solar',
        icon: Building2,
        span: 'lg:col-span-2',
      },
      {
        title: t('home.solutions.panelTitle'),
        desc: t('home.solutions.panelDesc'),
        img: '/images/battery-hero.png',
        to: '/panel-upgrades',
        icon: BatteryCharging,
        span: 'lg:col-span-1',
      },
      {
        title: t('home.solutions.commercialTitle'),
        desc: t('home.solutions.commercialDesc'),
        img: '/images/warranty-hero.png',
        to: '/commercial',
        icon: ShieldCheck,
        span: 'lg:col-span-1',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px] gap-5">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
