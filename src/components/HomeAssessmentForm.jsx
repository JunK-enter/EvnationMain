import { useState } from 'react'
import { US_STATES } from '../data/states'
import { homeTypes, parkingTypes, panelSizes } from '../data/services'
import UploadBox from './UploadBox'
import { useQuote } from '../context/QuoteContext'
import { ArrowRight, CheckCircle } from 'lucide-react'

const inputClass = 'w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600'

export default function HomeAssessmentForm({ onSubmit, compact = false }) {
  const { assessment, setAssessment, cart } = useQuote()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    state: assessment.state || '',
    city: assessment.city || '',
    zip: assessment.zip || '',
    homeType: assessment.homeType || '',
    vehicleMake: assessment.vehicleMake || '',
    vehicleModel: assessment.vehicleModel || '',
    panelSize: assessment.panelSize || '',
    parking: assessment.parking || '',
    distance: assessment.distance || '',
    notes: assessment.notes || '',
    panelPhoto: null,
    garagePhoto: null,
  })

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setAssessment((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAssessment(form)
    if (onSubmit) onSubmit(form)
    setSubmitted(true)
  }

  if (submitted && !onSubmit) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-neon mx-auto mb-4" />
        <h3 className="font-display font-semibold text-xl mb-2">Assessment Saved!</h3>
        <p className="text-slate-400 text-sm">Your home details are ready. Continue to get your full quote.</p>
      </div>
    )
  }

  return (
    <form id="assessment" onSubmit={handleSubmit} className={`glass rounded-2xl ${compact ? 'p-6' : 'p-6 lg:p-8'}`}>
      <h3 className="font-display font-semibold text-xl mb-1">Home Assessment</h3>
      <p className="text-sm text-slate-400 mb-6">Tell us about your home so we can prepare an accurate quote.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">State *</label>
          <select required value={form.state} onChange={(e) => update('state', e.target.value)} className={inputClass}>
            <option value="">Select state</option>
            {US_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">City *</label>
          <input required type="text" value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Your city" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">ZIP Code *</label>
          <input required type="text" value={form.zip} onChange={(e) => update('zip', e.target.value)} placeholder="12345" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Home Type *</label>
          <select required value={form.homeType} onChange={(e) => update('homeType', e.target.value)} className={inputClass}>
            <option value="">Select type</option>
            {homeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Vehicle Make</label>
          <input type="text" value={form.vehicleMake} onChange={(e) => update('vehicleMake', e.target.value)} placeholder="e.g. Tesla" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Vehicle Model</label>
          <input type="text" value={form.vehicleModel} onChange={(e) => update('vehicleModel', e.target.value)} placeholder="e.g. Model 3" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Existing Panel Size</label>
          <select value={form.panelSize} onChange={(e) => update('panelSize', e.target.value)} className={inputClass}>
            <option value="">Select size</option>
            {panelSizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Garage / Parking</label>
          <select value={form.parking} onChange={(e) => update('parking', e.target.value)} className={inputClass}>
            <option value="">Select location</option>
            {parkingTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Distance from Panel to Charger (ft)</label>
          <input type="number" value={form.distance} onChange={(e) => update('distance', e.target.value)} placeholder="e.g. 30" className={inputClass} />
        </div>
      </div>

      {!compact && (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <UploadBox
            label="Electrical Panel Photo"
            description="Clear photo of your main electrical panel with door open"
            preview={form.panelPhoto?.preview}
            onUpload={(data) => update('panelPhoto', data)}
          />
          <UploadBox
            label="Garage / Parking Photo"
            description="Photo of where you'd like the charger installed"
            preview={form.garagePhoto?.preview}
            onUpload={(data) => update('garagePhoto', data)}
          />
        </div>
      )}

      <div className="mb-6">
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Additional Notes</label>
        <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} placeholder="Anything else we should know..." className={`${inputClass} resize-none`} />
      </div>

      {cart.length > 0 && (
        <p className="text-xs text-neon mb-4">{cart.length} service(s) added to your quote</p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Save Assessment
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}
