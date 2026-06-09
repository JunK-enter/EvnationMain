'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { useQuote } from '../context/QuoteContext'
import HomeAssessmentForm from '../components/HomeAssessmentForm'
import QuoteCalculator from '../components/QuoteCalculator'
import StatusTracker from '../components/StatusTracker'
import { createSubmission, sendNotificationEmail } from '../services/api'
import { calculateQuote } from '../services/quoteCalculator'
import { CheckCircle, ShoppingCart, Trash2 } from 'lucide-react'

export default function QuotePage() {
  const { cartItems, cartTotal, removeFromQuote, clearCart, assessment } = useQuote()
  const [submitted, setSubmitted] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [personal, setPersonal] = useState({ firstName: '', lastName: '', email: '', phone: '' })

  async function handleFullSubmit(formData) {
    if (!personal.firstName || !personal.email) return
    setSubmitting(true)

    const quote = calculateQuote({
      state: formData.state || 'CA',
      distance: Number(formData.distance) || 25,
      panelUpgrade: cartItems.some((i) => i.id === 'panel-upgrade'),
      permitNeeded: cartItems.some((i) => i.id === 'permit-handling'),
    })

    const submission = await createSubmission({
      personal,
      home: {
        state: formData.state,
        city: formData.city,
        zip: formData.zip,
        homeType: formData.homeType,
        panelSize: formData.panelSize,
        parking: formData.parking,
        distance: formData.distance,
      },
      vehicle: { make: formData.vehicleMake, model: formData.vehicleModel },
      services: cartItems.map((i) => i.id),
      notes: formData.notes,
      photos: {
        panel: !!formData.panelPhoto,
        garage: !!formData.garagePhoto,
      },
      estimatedTotal: quote.total,
    })

    await sendNotificationEmail(submission)
    setSubmitted(submission)
    clearCart()
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-neon mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">Quote Request Submitted!</h1>
          <p className="text-slate-400 mb-2">Reference: <span className="text-neon font-mono">{submitted.id}</span></p>
          <p className="text-slate-400 mb-8">Our team will review your home assessment and send a detailed quote within 24 hours.</p>
          <div className="glass rounded-2xl p-8 mb-8">
            <StatusTracker currentStatus="submitted" />
          </div>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Get a Quote</p>
          <h1 className="font-display text-4xl font-bold">Build Your Custom Quote</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-2xl p-6 lg:p-8">
              <h2 className="font-display font-semibold text-lg mb-4">Your Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'firstName', label: 'First Name *', type: 'text' },
                  { key: 'lastName', label: 'Last Name', type: 'text' },
                  { key: 'email', label: 'Email *', type: 'email' },
                  { key: 'phone', label: 'Phone', type: 'tel' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs text-slate-500 mb-1 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={personal[field.key]}
                      onChange={(e) => setPersonal({ ...personal, [field.key]: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <HomeAssessmentForm onSubmit={handleFullSubmit} />

            {submitting && (
              <div className="text-center text-neon animate-pulse">Submitting your quote request...</div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-neon" /> Quote Cart
              </h3>
              {cartItems.length === 0 ? (
                <p className="text-sm text-slate-500 mb-4">No services added yet.</p>
              ) : (
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-neon">{item.priceRange}</span>
                        <button onClick={() => removeFromQuote(item.id)} className="p-1 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
                  <span>Estimated</span>
                  <span className="text-neon">~${cartTotal.toLocaleString()}</span>
                </div>
              )}
              <Link to="/shop" className="block text-center text-sm text-neon mt-4 hover:underline">Browse Services</Link>
            </div>

            <QuoteCalculator />
          </div>
        </div>
      </div>
    </div>
  )
}
