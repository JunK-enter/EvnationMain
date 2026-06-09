'use client'

import { motion } from 'framer-motion'
import Link from '@/components/Link'
import { MapPin, ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'Newport Beach Level 2 Install',
    location: 'Newport Beach, CA',
    type: 'EV Charger',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    desc: 'Garage-mounted ChargePoint Home Flex with clean conduit run and permit sign-off.',
  },
  {
    title: 'Costa Mesa 200A Panel Upgrade',
    location: 'Costa Mesa, CA',
    type: 'Panel Upgrade',
    before: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    desc: 'Full service upgrade to support dual EV chargers and future solar interconnection.',
  },
  {
    title: 'Irvine Solar + EV Hub',
    location: 'Irvine, CA',
    type: 'Solar + EV',
    before: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    desc: 'Roof-mounted array paired with Tesla Wall Connector — sized for daily commuting.',
  },
  {
    title: 'Huntington Beach Commercial',
    location: 'Huntington Beach, CA',
    type: 'Commercial',
    before: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1646148762217-62c9c67a5963?w=800&q=80',
    desc: 'Dual-port workplace chargers with load management for employee fleet.',
  },
]

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Our Work</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Projects Across Southern California
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Real installs from Orange County to San Diego. Replace placeholder images with your project photos when ready.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-3xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="grid grid-cols-2 gap-1 p-1 bg-navy-900/50">
                <div className="relative aspect-[4/3] overflow-hidden rounded-tl-2xl lg:rounded-bl-2xl">
                  <span className="absolute top-3 left-3 z-10 text-xs font-semibold bg-black/60 px-2 py-1 rounded">Before</span>
                  <img src={p.before} alt={`${p.title} before`} className="w-full h-full object-cover" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-tr-2xl lg:rounded-none">
                  <span className="absolute top-3 left-3 z-10 text-xs font-semibold bg-neon/90 text-black px-2 py-1 rounded">After</span>
                  <img src={p.after} alt={`${p.title} after`} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-neon text-xs font-semibold uppercase tracking-wider mb-2">{p.type}</span>
                <h2 className="font-display text-2xl font-bold mb-3">{p.title}</h2>
                <p className="flex items-center gap-1.5 text-slate-400 text-sm mb-4">
                  <MapPin className="w-4 h-4 text-neon" /> {p.location}
                </p>
                <p className="text-slate-300 leading-relaxed mb-6">{p.desc}</p>
                <Link href="/quote" className="inline-flex items-center gap-2 text-neon font-semibold hover:gap-3 transition-all">
                  Get a similar quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Link href="/quote" className="btn-primary inline-flex items-center gap-2">
          Start Your Project <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
