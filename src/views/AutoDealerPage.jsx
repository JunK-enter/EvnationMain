'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import {
  Handshake, Car, Users, TrendingUp, CheckCircle, ArrowRight, Building2,
} from 'lucide-react'

const benefits = [
  { icon: Car, title: 'Turnkey Home Charging', text: 'Offer your EV buyers a seamless home charger installation as part of the purchase experience.' },
  { icon: Users, title: 'Concierge Handoff', text: 'We coordinate directly with your customers — scheduling, permitting, and install — so your team stays focused on selling.' },
  { icon: TrendingUp, title: 'Boost EV Sales', text: 'Remove range and charging anxiety at the point of sale and close more electric vehicle deals.' },
  { icon: Building2, title: 'Co-Branded Options', text: 'Custom referral programs and co-branded materials that fit your dealership’s brand.' },
]

const steps = [
  { step: '01', title: 'Partner Onboarding', text: 'We set up your dealership with a simple referral workflow and dedicated point of contact.' },
  { step: '02', title: 'Customer Referral', text: 'At the point of sale, your team refers EV buyers to evNation for home charging.' },
  { step: '03', title: 'We Handle the Rest', text: 'Estimate, permitting, licensed install, and inspection — fully managed by our team.' },
  { step: '04', title: 'Happy EV Owner', text: 'Your customer drives home ready to charge, with a great experience tied to your brand.' },
]

const inputClass = 'w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600'

export default function AutoDealerPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ dealership: '', name: '', email: '', phone: '' })

  function submit(e) {
    e.preventDefault()
    // Placeholder: hook this up to your CRM / Pipedrive / email later.
    console.info('[EVnation] Dealer partner inquiry:', form)
    setSent(true)
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">For Auto Dealers</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Auto Dealer <span className="text-neon">Partners</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Give every EV buyer a complete home charging solution. Partner with evNation and turn charging anxiety into
            a closing advantage.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {benefits.map((b) => (
            <div key={b.title} className="glass rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
                <b.icon className="w-6 h-6 text-neon" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1.5">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <h2 className="font-display text-2xl font-bold text-center mb-8">How the Partnership Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {steps.map((s) => (
            <div key={s.step} className="glass rounded-2xl p-6">
              <span className="font-display text-3xl font-bold text-neon/30">{s.step}</span>
              <h3 className="font-display font-semibold mt-2 mb-1.5">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Partner form */}
        <div className="glass rounded-3xl p-8 lg:p-10 neon-border">
          {sent ? (
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-neon mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-2">Thanks for reaching out!</h3>
              <p className="text-slate-400">Our partnerships team will contact you shortly to get your dealership set up.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Handshake className="w-6 h-6 text-neon" />
                <h2 className="font-display text-2xl font-bold">Become a Partner</h2>
              </div>
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Dealership Name</label>
                  <input required className={inputClass} value={form.dealership} onChange={(e) => setForm({ ...form, dealership: e.target.value })} placeholder="ABC Motors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact Name</label>
                  <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                  <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@dealer.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone</label>
                  <input type="tel" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary w-full sm:w-auto">Request Partnership Info <ArrowRight className="w-4 h-4" /></button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Prefer to talk? Email <span className="text-neon">GoGreen@evnation.us</span> or call <span className="text-neon">866-913-6199</span>.
          <br />Or <Link to="/contact" className="text-neon hover:underline">contact us here</Link>.
        </p>
      </div>
    </div>
  )
}
