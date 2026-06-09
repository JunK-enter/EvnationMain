'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from '@/components/Link'
import { SERVICE_ZONES } from '@/data/serviceZones'

export default function ServiceZonesSection() {
  return (
    <section className="section-padding bg-navy-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Where We Serve</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Regional Service Areas</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            evNation installs in select metro regions — not nationwide. Choose your area when requesting a quote.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SERVICE_ZONES.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`glass rounded-2xl p-4 border transition-colors ${
                zone.id === 'zone-1'
                  ? 'border-neon/40 bg-neon/[0.04]'
                  : 'border-white/10 hover:border-neon/25'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-neon" />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-white leading-snug">
                    {zone.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 truncate">{zone.region}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

          <p className="text-center text-sm text-slate-500 mt-8">
          Outside these areas?{' '}
          <Link href="/service-areas" className="text-neon hover:underline">
            View all cities we serve
          </Link>
          {' '}or{' '}
          <Link href="/contact" className="text-neon hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
