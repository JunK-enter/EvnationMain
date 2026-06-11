import { motion } from 'framer-motion'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'

const gallery = [
  { label: 'Clean Conduit Run', before: 'Messy temporary extension cord setup', after: 'Professional hardwired Level 2 install' },
  { label: 'Panel Upgrade', before: 'Outdated 100A fuse panel', after: 'Modern 200A breaker panel with EV breaker' },
  { label: 'Outdoor Install', before: 'No outdoor charging option', after: 'Weather-rated NEMA 14-50 outlet with cover' },
  { label: 'Garage Setup', before: 'Unorganized garage wall', after: 'Sleek wall-mounted charger with cable management' },
]

export default function GallerySection() {
  return (
    <section className="section-padding relative overflow-hidden section-scrim">
      <SectionAmbient sweep />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader eyebrow="Gallery" title="Before & After Installations" />

        <div className="grid sm:grid-cols-2 gap-6">
          {gallery.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <div className="p-6 bg-red-500/5 border-r border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-red-400 font-semibold">Before</span>
                  <div className="mt-3 h-32 rounded-xl bg-navy-800 flex items-center justify-center">
                    <p className="text-xs text-slate-500 text-center px-4">{item.before}</p>
                  </div>
                </div>
                <div className="p-6 bg-neon/5">
                  <span className="text-[10px] uppercase tracking-wider text-neon font-semibold">After</span>
                  <div className="mt-3 h-32 rounded-xl bg-navy-800 flex items-center justify-center neon-border">
                    <p className="text-xs text-slate-300 text-center px-4">{item.after}</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-white/5">
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
