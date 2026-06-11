import { motion } from 'framer-motion'
import { Fuel, Clock, TrendingUp, BatteryCharging, BadgeDollarSign } from 'lucide-react'
import { calculateGasSavings } from '../services/quoteCalculator'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'

const benefits = [
  { icon: Fuel, title: 'Save on Fuel', desc: 'Home charging costs a fraction of gas. Most drivers save $800–$1,500 per year.' },
  { icon: Clock, title: 'Overnight Charging', desc: 'Plug in at home and wake up with a full battery. No more gas station stops.' },
  { icon: TrendingUp, title: 'Boost Home Value', desc: 'EV-ready homes sell faster and command higher prices in today\'s market.' },
  { icon: BatteryCharging, title: 'Backup & Peak Savings', desc: 'Add a Tesla Powerwall to store energy and power through outages.' },
  { icon: BadgeDollarSign, title: 'Rebates & Incentives', desc: 'Federal tax credits, state rebates, and utility programs can offset install costs.' },
]

export default function SavingsSection() {
  const savings = calculateGasSavings()

  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <SectionAmbient sweep />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          eyebrow="Why Go Electric"
          title="The Savings Add Up Fast"
          className="text-center mb-16"
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center neon-border"
          >
            <p className="text-sm text-slate-400 mb-2">Annual Gas Cost</p>
            <p className="font-display text-4xl font-bold text-red-400 line-through decoration-2">${savings.annualGasCost.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 text-center neon-border"
          >
            <p className="text-sm text-slate-400 mb-2">Annual Home Charging</p>
            <p className="font-display text-4xl font-bold text-neon">${savings.annualEvCost.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 text-center neon-border"
          >
            <p className="text-sm text-slate-400 mb-2">5-Year Savings</p>
            <p className="font-display text-4xl font-bold text-white">${savings.fiveYearSavings.toLocaleString()}</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-light rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-neon" />
              </div>
              <h3 className="font-display font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
