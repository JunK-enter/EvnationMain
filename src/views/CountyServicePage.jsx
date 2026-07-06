'use client'

import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react'
import { getRegionById, buildCountyDescription } from '@/data/serviceAreasSeo'
import { useCountyCopy } from '@/i18n/hooks/useExtraPages'

export default function CountyServicePage({ county }) {
  const region = getRegionById(county.regionId)
  const copy = useCountyCopy(county)

  return (
    <div className="pb-24">
      <section className="relative pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {copy.backLink}
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-2">
              {region?.name || county.state}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {copy.title}
            </h1>
            <p className="text-slate-400 mt-4 text-lg leading-relaxed max-w-3xl">
              {buildCountyDescription(county)}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/quote" className="btn-primary inline-flex items-center gap-2">
                {copy.getQuote} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/residential-ev-charging" className="btn-secondary">
                {copy.evServices}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10">
          <h2 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-neon" />
            {copy.citiesHeading}
          </h2>
          <p className="text-sm text-slate-500 mb-8">{copy.citiesMeta}</p>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
            {county.cities.map((city) => (
              <li key={city} className="text-sm text-slate-300">
                {city}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {copy.related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass rounded-2xl p-5 hover:border-neon/30 border border-white/10 transition-colors group"
            >
              <h3 className="font-display font-semibold group-hover:text-neon transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
