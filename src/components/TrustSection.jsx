import { motion } from 'framer-motion'
import { Shield, FileCheck, Sparkles, DollarSign, Users, Award } from 'lucide-react'

const reasons = [
  { icon: Shield, title: 'Licensed Electricians', desc: 'Every install is performed by state-licensed, insured electricians — not handymen.' },
  { icon: FileCheck, title: 'Permit Support', desc: 'We handle all permit applications, inspections, and code compliance for you.' },
  { icon: Sparkles, title: 'Clean Installation', desc: 'Neat conduit runs, proper labeling, and professional finish you\'ll be proud to show off.' },
  { icon: DollarSign, title: 'Transparent Pricing', desc: 'No hidden fees. You see the price range upfront before anyone visits your home.' },
  { icon: Users, title: 'Residential EV Experts', desc: 'We specialize in home EV charging — not commercial, not general electrical.' },
  { icon: Award, title: 'Satisfaction Guaranteed', desc: 'Not happy with the install? We\'ll make it right. That\'s our promise.' },
]

export default function TrustSection() {
  return (
    <section className="section-padding bg-navy-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Why EVnation?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Built on Trust, Backed by Pros</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">We make home electrification simple because we've done it thousands of times.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:border-neon/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <r.icon className="w-6 h-6 text-neon" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { value: '2,000+', label: 'Installations' },
            { value: '4.9/5', label: 'Customer Rating' },
            { value: '48', label: 'States Served' },
            { value: '24hr', label: 'Quote Turnaround' },
          ].map((stat) => (
            <div key={stat.label} className="glass-light rounded-2xl p-6">
              <p className="font-display text-3xl font-bold text-neon">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
