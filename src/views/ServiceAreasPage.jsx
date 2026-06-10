'use client'

import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight, Zap } from 'lucide-react'
import ServiceAreaMap from '@/components/ServiceAreaMap'
import {
  SERVICE_REGIONS,
  SERVICE_COUNTIES,
  getCountiesByRegion,
  getTotalCityCount,
} from '@/data/serviceAreasSeo'

export default function ServiceAreasPage() {
  const totalCities = getTotalCityCount()

  return (
    <div className="pb-24">
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="glow-orb w-[500px] h-[500px] bg-neon/5 top-[-15%] right-[-10%] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Service Coverage</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl">
              EV Charger Installation Across{' '}
              <span className="neon-text">Southern California, Central California & Nevada</span>
            </h1>
            <p className="text-slate-400 mt-5 text-lg leading-relaxed max-w-3xl">
              evNation provides licensed Level 2 EV charger installation, panel upgrades, and solar
              across {SERVICE_COUNTIES.length} counties and {totalCities}+ cities — from Orange County
              and Los Angeles to San Diego, San Luis Obispo, Clark County Nevada, and Maricopa County Arizona.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/quote" className="btn-primary inline-flex items-center gap-2">
                Get a Quote <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceAreaMap />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SERVICE_REGIONS.map((region, ri) => {
          const counties = getCountiesByRegion(region.id)
          if (!counties.length) return null

          return (
            <motion.div
              key={region.id}
              id={region.id}
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ri * 0.05 }}
            >
              <div className="mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-neon shrink-0" />
                  {region.name}
                </h2>
                <p className="text-slate-400 mt-2 max-w-2xl">{region.summary}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {counties.map((county) => (
                  <article
                    key={county.slug}
                    className="glass rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-neon/25 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold">
                          <Link
                            href={`/service-areas/${county.slug}`}
                            className="hover:text-neon transition-colors"
                          >
                            {county.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {county.state} · {county.cities.length} cities served
                        </p>
                      </div>
                      <Link
                        href={`/service-areas/${county.slug}`}
                        className="text-neon text-sm font-medium shrink-0 hover:underline"
                      >
                        View all →
                      </Link>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {county.cities.slice(0, 12).join(', ')}
                      {county.cities.length > 12 && `, and ${county.cities.length - 12} more`}
                    </p>
                  </article>
                ))}
              </div>
            </motion.div>
          )
        })}

        <div className="glass rounded-3xl p-8 sm:p-12 text-center neon-border">
          <Zap className="w-10 h-10 text-neon mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-3">Don&apos;t see your city?</h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            We may still serve your area. Request a quote and our team will confirm availability in your community.
          </p>
          <Link href="/quote" className="btn-primary inline-flex items-center gap-2">
            Check Availability
          </Link>
        </div>
      </section>
    </div>
  )
}
