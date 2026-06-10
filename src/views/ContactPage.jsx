'use client'

import { useState } from 'react'
import { useQuote } from '../context/QuoteContext'
import UploadBox from '../components/UploadBox'
import { createSubmission, sendNotificationEmail } from '../services/api'
import { calculateQuote } from '../services/quoteCalculator'
import { DEFAULT_ZONE_ID, getZoneStateCode, getZoneLabel } from '../data/serviceZones'
import ZoneSelect from '../components/ZoneSelect'
import { homeTypes, parkingTypes, panelSizes } from '../data/services'
import { CheckCircle, Send } from 'lucide-react'
import StatusTracker from '../components/StatusTracker'

const inputClass = 'w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white'

export default function ContactPage() {
  const { cartItems } = useQuote()
  const [submitted, setSubmitted] = useState(null)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    zone: DEFAULT_ZONE_ID, city: '', zip: '', homeType: '',
    vehicleMake: '', vehicleModel: '', panelSize: '', parking: '', distance: '',
    notes: '', panelPhoto: null, garagePhoto: null,
  })

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  async function handleSubmit(e) {
    e.preventDefault()
    const quote = calculateQuote({
      zoneId: form.zone,
      distance: Number(form.distance) || 25,
      panelUpgrade: cartItems.some((i) => i.id === 'panel-upgrade'),
      permitNeeded: cartItems.some((i) => i.id === 'permit-handling'),
    })

    const submission = await createSubmission({
      personal: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
      home: {
        zone: form.zone,
        zoneLabel: getZoneLabel(form.zone),
        state,
        city: form.city,
        zip: form.zip,
        homeType: form.homeType,
        panelSize: form.panelSize,
        parking: form.parking,
        distance: form.distance,
      },
      vehicle: { make: form.vehicleMake, model: form.vehicleModel },
      services: cartItems.map((i) => i.id),
      notes: form.notes,
      photos: { panel: !!form.panelPhoto, garage: !!form.garagePhoto },
      estimatedTotal: quote.total,
    })

    await sendNotificationEmail(submission)
    setSubmitted(submission)
  }

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-neon mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">Submission Received!</h1>
          <p className="text-slate-400 mb-2">Reference: <span className="text-neon font-mono">{submitted.id}</span></p>
          <p className="text-slate-400 mb-8">We'll review your information and reach out within 24 hours. A confirmation email has been sent.</p>
          <div className="glass rounded-2xl p-8">
            <StatusTracker currentStatus="submitted" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Contact</p>
          <h1 className="font-display text-4xl font-bold">Submit Your Project</h1>
          <p className="text-slate-400 mt-3">Fill out the form below and our team will prepare a custom quote for your home.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 lg:p-8 space-y-8">
          <div>
            <h3 className="font-display font-semibold mb-4">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="First Name *" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} />
              <input placeholder="Last Name" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} />
              <input required type="email" placeholder="Email *" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Home Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <ZoneSelect required value={form.zone} onChange={(v) => update('zone', v)} className={inputClass} />
              <input required placeholder="City *" value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} />
              <input required placeholder="ZIP Code *" value={form.zip} onChange={(e) => update('zip', e.target.value)} className={inputClass} />
              <select value={form.homeType} onChange={(e) => update('homeType', e.target.value)} className={inputClass}>
                <option value="">Home Type</option>
                {homeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={form.panelSize} onChange={(e) => update('panelSize', e.target.value)} className={inputClass}>
                <option value="">Panel Size</option>
                {panelSizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={form.parking} onChange={(e) => update('parking', e.target.value)} className={inputClass}>
                <option value="">Parking Location</option>
                {parkingTypes.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Vehicle Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Vehicle Make" value={form.vehicleMake} onChange={(e) => update('vehicleMake', e.target.value)} className={inputClass} />
              <input placeholder="Vehicle Model" value={form.vehicleModel} onChange={(e) => update('vehicleModel', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <UploadBox label="Panel Photo" preview={form.panelPhoto?.preview} onUpload={(d) => update('panelPhoto', d)} />
            <UploadBox label="Garage / Parking Photo" preview={form.garagePhoto?.preview} onUpload={(d) => update('garagePhoto', d)} />
          </div>

          <textarea placeholder="Additional notes..." value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} className={`${inputClass} resize-none`} />

          {cartItems.length > 0 && (
            <p className="text-sm text-neon">{cartItems.length} service(s) selected from your quote cart</p>
          )}

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Submit for Review
          </button>
        </form>
      </div>
    </div>
  )
}
