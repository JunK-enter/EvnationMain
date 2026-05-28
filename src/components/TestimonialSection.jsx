import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Sarah M.', location: 'San Jose, CA', rating: 5, text: 'EVnation made the whole process effortless. From the online assessment to installation day, everything was transparent and professional.' },
  { name: 'James T.', location: 'Austin, TX', rating: 5, text: 'Got my Tesla Wall Connector installed in one afternoon. The electrician was knowledgeable and left my garage cleaner than he found it.' },
  { name: 'Lisa K.', location: 'Denver, CO', rating: 5, text: 'They handled the panel upgrade AND the charger install. Permits, inspection, everything. Worth every penny for the peace of mind.' },
  { name: 'Robert H.', location: 'Miami, FL', rating: 4, text: 'Great experience overall. The quote was accurate and the install team showed up on time. Highly recommend for any EV owner.' },
]

export default function TestimonialSection() {
  return (
    <section className="section-padding bg-navy-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Reviews</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">What Homeowners Say</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-neon text-neon" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">"{r.text}"</p>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-slate-500">{r.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
