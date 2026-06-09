'use client'

import ServicePageLayout from '@/components/ServicePageLayout'
import { Sun, Battery, Zap, TrendingDown } from 'lucide-react'

const features = [
  'Site assessment & shade analysis',
  'Permit & utility interconnection support',
  'Premium panel options (REC, Qcells, etc.)',
  'Battery-ready inverter configurations',
  'Monitoring app setup & walkthrough',
  'Federal & California incentive guidance',
]

export default function SolarPage() {
  return (
    <ServicePageLayout
      eyebrow="Southern California Solar"
      title="Solar That Powers"
      highlight="Your EV & Home"
      description="Pair solar with your EV charger for lower bills and cleaner miles. We design systems sized for Southern California roofs — from coastal Newport Beach to inland Riverside."
      tagline="Consultation → Design → Permit → Install → Activation"
      image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80"
      imageAlt="Residential solar panels on a Southern California home"
      primaryCta={{ to: '/quote', label: 'Build Your Quote' }}
      secondaryCta={{ to: '/contact', label: 'Schedule Assessment' }}
      stats={[
        { value: '30%', label: 'Avg. bill reduction' },
        { value: '25 yr', label: 'Panel warranty' },
        { value: 'CA', label: 'Incentive experts' },
      ]}
      features={features}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Why Solar + EV?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sun, title: 'Charge from the sun', desc: 'Offset charging costs with daytime production.' },
            { icon: Battery, title: 'Battery ready', desc: 'Add storage when you\'re ready for backup power.' },
            { icon: Zap, title: 'Panel synergy', desc: 'Combine with panel upgrades for full electrification.' },
            { icon: TrendingDown, title: 'Rebates & credits', desc: 'Federal ITC plus California-specific programs.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6">
              <Icon className="w-8 h-8 text-neon mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </ServicePageLayout>
  )
}
