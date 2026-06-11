'use client'

import { motion } from 'framer-motion'
import { CreditCard, Clock, Shield } from 'lucide-react'
import Link from '@/components/Link'

export default function FinancingSection() {
  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <div className="max-w-7xl mx-auto relative">
        <div className="glass rounded-3xl p-8 lg:p-12 neon-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,136,0.08),transparent_50%)]" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Financing</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Flexible Payment Options</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Spread your installation cost over time with 0% APR financing for qualified customers. No impact to your credit score to check rates.
              </p>
              <Link to="/quote" className="btn-primary">Check Your Rate</Link>
            </motion.div>
            <div className="grid gap-4">
              {[
                { icon: CreditCard, title: '0% APR for 12 Months', desc: 'Qualified customers pay no interest for the first year.' },
                { icon: Clock, title: 'Instant Approval', desc: 'Get a decision in minutes with a soft credit check.' },
                { icon: Shield, title: 'No Prepayment Penalty', desc: 'Pay off early anytime with zero fees.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 glass-light rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-neon" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
