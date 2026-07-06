'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { Handshake, CheckCircle, ArrowRight } from 'lucide-react'
import { useAutoDealerCopy } from '@/i18n/hooks/useExtraPages'

const inputClass = 'w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600'

export default function AutoDealerPage() {
  const copy = useAutoDealerCopy()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ dealership: '', name: '', email: '', phone: '' })

  function submit(e) {
    e.preventDefault()
    console.info('[EVnation] Dealer partner inquiry:', form)
    setSent(true)
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{copy.hero.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {copy.hero.title} <span className="text-neon">{copy.hero.titleAccent}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{copy.hero.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {copy.benefits.map((b) => (
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

        <h2 className="font-display text-2xl font-bold text-center mb-8">{copy.steps.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {copy.steps.items.map((s) => (
            <div key={s.step} className="glass rounded-2xl p-6">
              <span className="font-display text-3xl font-bold text-neon/30">{s.step}</span>
              <h3 className="font-display font-semibold mt-2 mb-1.5">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-8 lg:p-10 neon-border">
          {sent ? (
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-neon mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-2">{copy.form.successTitle}</h3>
              <p className="text-slate-400">{copy.form.successDesc}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Handshake className="w-6 h-6 text-neon" />
                <h2 className="font-display text-2xl font-bold">{copy.form.title}</h2>
              </div>
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{copy.form.dealership}</label>
                  <input required className={inputClass} value={form.dealership} onChange={(e) => setForm({ ...form, dealership: e.target.value })} placeholder={copy.form.dealershipPlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{copy.form.contactName}</label>
                  <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={copy.form.contactPlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{copy.form.email}</label>
                  <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={copy.form.emailPlaceholder} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{copy.form.phone}</label>
                  <input type="tel" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={copy.form.phonePlaceholder} />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary w-full sm:w-auto">{copy.form.submit} <ArrowRight className="w-4 h-4" /></button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          {copy.form.preferTalk}{' '}
          <span className="text-neon">GoGreen@evnation.us</span> {copy.form.orCall}{' '}
          <span className="text-neon">866-913-6199</span>.
          <br />
          <Link to="/contact" className="text-neon hover:underline">{copy.form.contactLink}</Link>
        </p>
      </div>
    </div>
  )
}
