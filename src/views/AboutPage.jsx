'use client'

import Link from '@/components/Link'
import {
  BatteryCharging, Bolt, ShieldCheck, HeartHandshake, Leaf, Award, MapPin, ArrowRight,
} from 'lucide-react'

const values = [
  { icon: Leaf, title: 'Radical Transparency', text: 'No vague claims. We break down costs, tax credits, and financing so you can make a confident decision.' },
  { icon: ShieldCheck, title: 'Licensed & Insured', text: 'We are a licensed C10 Electrical Contractor. Every install is code-compliant and warranty-backed.' },
  { icon: HeartHandshake, title: 'Concierge Service', text: 'Our team is with you every step of the way — from estimate to permitting to final inspection.' },
  { icon: BatteryCharging, title: 'Charging + Battery', text: 'We pair EV charging with Tesla Powerwall storage so your home stays powered and efficient.' },
]

const stats = [
  { value: '2,000+', label: 'Homeowners served' },
  { value: '30%', label: 'Federal tax credit support' },
  { value: '2.99%', label: 'Financing available' },
  { value: 'C10', label: 'Licensed contractor' },
]

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">About EVnation</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Powering the <span className="text-neon">electric home</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            EVnation’s mission is to make home and commercial EV charging, battery storage, and energy
            backup effortless — so going fully electric is simple and worry-free.
          </p>
        </div>

        {/* Mission */}
        <div className="glass rounded-3xl p-8 lg:p-12 mb-16">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
            <Bolt className="w-6 h-6 text-neon" /> Who We Are
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              EVnation is a licensed C10 Electrical Contractor specializing in home and commercial EV charging,
              Tesla Powerwall battery storage, and warranty-backed installation. We believe switching to a fully
              electric life should be simple, transparent, and rewarding.
            </p>
            <p>
              From a single home charger to networked commercial stations and whole-home battery backup, our concierge
              team guides you through every step — from your free estimate to financing, permitting, and final inspection.
              With easy-to-qualify financing as low as 2.99% and no money down, going electric has never been more accessible.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-neon">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="font-display text-2xl font-bold text-center mb-8">What We Stand For</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
                <v.icon className="w-6 h-6 text-neon" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1.5">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="glass rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-neon" />
            </div>
            <div>
              <h3 className="font-display font-semibold mb-1">Visit Us</h3>
              <p className="text-sm text-slate-400">3100 Airway Avenue, Suite 133<br />Costa Mesa, CA 92626</p>
              <p className="text-sm text-slate-400 mt-2">GoGreen@evnation.us · 866-913-6199</p>
            </div>
          </div>
          <Award className="w-16 h-16 text-neon/20 hidden md:block" />
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-3">Ready to go electric?</h2>
          <p className="text-slate-400 mb-6">Get a free, no-pressure estimate today.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote" className="btn-primary">Get a Free Estimate <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/blog" className="btn-secondary">Read the Blog</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
