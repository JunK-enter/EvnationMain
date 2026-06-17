'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from '@/components/Link'
import { getCaliforniaZones, getStateZones } from '@/data/serviceZones'
import { useTranslation } from '@/i18n/LocaleProvider'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'

export default function ServiceZonesSection() {
  const { t } = useTranslation()
  const california = getCaliforniaZones()
  const states = getStateZones()

  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <SectionAmbient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow={t('home.zones.eyebrow')}
          title={t('home.zones.title')}
          subtitle={t('home.zones.subtitle')}
        />

        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-wider text-neon/80 font-semibold mb-3">{t('common.california')}</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {california.map((zone, i) => (
                <ZoneCard key={zone.id} zone={zone} index={i} featured={zone.id === 'zone-1'} subtitle={t('common.california')} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neon/80 font-semibold mb-3">{t('common.byState')}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {states.map((zone, i) => (
                <ZoneCard key={zone.id} zone={zone} index={i} subtitle={zone.state} />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          {t('home.zones.outsideAreas')}{' '}
          <Link href="/service-areas" className="text-neon hover:underline">
            {t('common.viewAllCities')}
          </Link>
          {' '}{t('common.or')}{' '}
          <Link href="/contact" className="text-neon hover:underline">
            {t('common.contactUs')}
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

function ZoneCard({ zone, index, featured = false, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className={`glass rounded-2xl p-4 border transition-colors ${
        featured ? 'border-neon/40 bg-neon/[0.04]' : 'border-white/10 hover:border-neon/25'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4 text-neon" />
        </span>
        <div className="min-w-0">
          <p className="font-display font-semibold text-sm text-white leading-snug">{zone.label}</p>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  )
}
