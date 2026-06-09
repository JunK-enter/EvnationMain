'use client'

import Link from '@/components/Link'
import { LayoutGrid, Check, ArrowRight } from 'lucide-react'

const features = [
  'Full electrical panel replacement or upgrade',
  '200A service upgrade for modern power demands',
  'EV-ready breaker space allocation',
  'Code-compliant installation with permit',
  'Future-proof for solar, battery, and heat pump',
  'Coordination with utility company if needed',
]

export default function PanelUpgradePage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 text-neon text-sm mb-4">
              <LayoutGrid className="w-4 h-4" /> Electrical Upgrade
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Panel Upgrade</h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Older 100A panels often can't safely support an EV charger alongside your home's existing loads. We upgrade your panel to 200A service so you have room to grow.
            </p>
            <p className="font-display text-3xl font-bold text-neon mb-6">$2,500 – $5,500</p>
            <Link to="/quote" className="btn-primary">Get Your Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="aspect-square rounded-3xl neon-border bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
            <LayoutGrid className="w-32 h-32 text-neon/30" />
          </div>
        </div>

        <div className="glass rounded-2xl p-8 lg:p-12">
          <h2 className="font-display text-2xl font-bold mb-6">What's Included</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                <span className="text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
