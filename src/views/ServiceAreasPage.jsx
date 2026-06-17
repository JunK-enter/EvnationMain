'use client'

import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import ServiceAreaMap from '@/components/ServiceAreaMap'
import {
  SERVICE_COUNTIES,
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
    </div>
  )
}
