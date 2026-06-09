'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import {
  User, Zap, Camera, CheckCircle, Plus, X, Loader2,
} from 'lucide-react'
import UploadBox from '../components/UploadBox'
import { DEFAULT_ZONE_ID, getZoneStateCode, getZoneLabel } from '../data/serviceZones'
import ZoneSelect from '../components/ZoneSelect'
import {
  CHARGER_BRANDS, PROPERTY_TYPES, PANEL_SIZES, INSTALL_LOCATIONS,
  YES_NO, PERMIT_OPTIONS, PHOTO_SLOTS,
} from '../data/intakeOptions'
import { submitIntake, fileToDataUrl } from '../services/intakeService'

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  zone: DEFAULT_ZONE_ID,
  zip: '',
  vehicle: '',
  chargerBrand: 'Need Recommendation',
  propertyType: 'Single Family',
  panelSize: 'Unknown',
  distance: '',
  installLocation: 'Garage',
  hasCharger: 'No',
  permitNeeded: 'Not Sure',
  preferredDate: '',
  notes: '',
}

const inputClass =
  'w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600'
const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5'

function Field({ label, required, children }) {
  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-neon">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function CustomerIntakePage() {
  const [form, setForm] = useState(EMPTY_FORM)
  // Each photo slot holds the UploadBox result: { file, preview, name } | null
  const [photos, setPhotos] = useState({
    mainPanel: null,
    breakerCloseup: null,
    chargerLocation: null,
    parkingArea: null,
  })
  const [additional, setAdditional] = useState([]) // [{ file, preview, name }]
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addAdditionalPhotos(fileList) {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'))
    const mapped = files.map((file) => ({ file, preview: URL.createObjectURL(file), name: file.name }))
    setAdditional((prev) => [...prev, ...mapped])
  }

  function removeAdditional(index) {
    setAdditional((prev) => prev.filter((_, i) => i !== index))
  }

  function validate() {
    const required = ['fullName', 'phone', 'email', 'address', 'city', 'zone', 'zip']
    for (const key of required) {
      if (!String(form[key]).trim()) return 'Please complete all required customer information fields.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.'
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setError('')
    setSubmitting(true)

    try {
      // Convert photos to base64 data URLs for storage.
      const photoData = {}
      for (const slot of PHOTO_SLOTS) {
        photoData[slot.key] = photos[slot.key]?.file
          ? await fileToDataUrl(photos[slot.key].file)
          : null
      }
      const additionalData = await Promise.all(
        additional.map((p) => fileToDataUrl(p.file))
      )

      await submitIntake({
        ...form,
        state: getZoneStateCode(form.zone),
        zoneLabel: getZoneLabel(form.zone),
        photos: { ...photoData, additional: additionalData.filter(Boolean) },
      })

      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('[EVnation] Intake submission failed:', err)
      setError('Something went wrong while submitting. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10 neon-border">
            <CheckCircle className="w-16 h-16 text-neon mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-slate-300 leading-relaxed mb-8">
              Your information has been submitted. EVnation will review your installation
              details and contact you shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn-primary">Back to Home</Link>
              <button
                onClick={() => {
                  setForm(EMPTY_FORM)
                  setPhotos({ mainPanel: null, breakerCloseup: null, chargerLocation: null, parkingArea: null })
                  setAdditional([])
                  setSubmitted(false)
                }}
                className="btn-secondary"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">
            EV Charger Installation
          </p>
          <h1 className="font-display text-4xl font-bold">Customer Intake</h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Tell us about your home and charging needs. Add a few photos and our team will
            prepare your personalized installation plan.
          </p>
        </div>

        {error && (
          <div className="glass rounded-xl p-4 mb-6 border border-red-500/30 bg-red-500/5 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <section className="glass rounded-2xl p-6 lg:p-8">
            <h2 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-neon" /> Customer Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Full Name" required>
                  <input className={inputClass} value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Jane Doe" />
                </Field>
              </div>
              <Field label="Phone Number" required>
                <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" />
              </Field>
              <Field label="Email" required>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@example.com" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address" required>
                  <input className={inputClass} value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="123 Main St" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Service Area" required>
                  <ZoneSelect required value={form.zone} onChange={(v) => update('zone', v)} className={inputClass} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:col-span-2">
                <Field label="City" required>
                  <input className={inputClass} value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="San Diego" />
                </Field>
                <Field label="ZIP Code" required>
                  <input className={inputClass} value={form.zip} onChange={(e) => update('zip', e.target.value)} placeholder="92101" />
                </Field>
              </div>
            </div>
          </section>

          {/* Installation Information */}
          <section className="glass rounded-2xl p-6 lg:p-8">
            <h2 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-neon" /> Installation Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Vehicle Make / Model">
                <input className={inputClass} value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)} placeholder="Tesla Model 3" />
              </Field>
              <Field label="Charger Brand">
                <select className={inputClass} value={form.chargerBrand} onChange={(e) => update('chargerBrand', e.target.value)}>
                  {CHARGER_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Property Type">
                <select className={inputClass} value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)}>
                  {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Main Panel Size">
                <select className={inputClass} value={form.panelSize} onChange={(e) => update('panelSize', e.target.value)}>
                  {PANEL_SIZES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Est. distance from panel to charger">
                <input className={inputClass} value={form.distance} onChange={(e) => update('distance', e.target.value)} placeholder="e.g. 25 ft" />
              </Field>
              <Field label="Preferred installation location">
                <select className={inputClass} value={form.installLocation} onChange={(e) => update('installLocation', e.target.value)}>
                  {INSTALL_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Already have a charger?">
                <select className={inputClass} value={form.hasCharger} onChange={(e) => update('hasCharger', e.target.value)}>
                  {YES_NO.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Permit needed?">
                <select className={inputClass} value={form.permitNeeded} onChange={(e) => update('permitNeeded', e.target.value)}>
                  {PERMIT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Preferred installation date">
                <input type="date" className={inputClass} value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Additional notes">
                  <textarea rows={4} className={inputClass} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Anything else we should know?" />
                </Field>
              </div>
            </div>
          </section>

          {/* Photo Upload */}
          <section className="glass rounded-2xl p-6 lg:p-8">
            <h2 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
              <Camera className="w-5 h-5 text-neon" /> Photo Upload
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Photos help us prepare an accurate quote. They're optional but highly recommended.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {PHOTO_SLOTS.map((slot) => (
                <UploadBox
                  key={slot.key}
                  label={slot.label}
                  description={slot.description}
                  preview={photos[slot.key]?.preview}
                  onUpload={(result) => setPhotos((p) => ({ ...p, [slot.key]: result }))}
                />
              ))}
            </div>

            {/* Additional photos */}
            <div className="mt-6">
              <label className={labelClass}>Additional Photos</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {additional.map((p, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden border border-neon/20 aspect-video bg-navy-800">
                    <img src={p.preview} alt={p.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeAdditional(i)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-navy-950/80 hover:bg-red-500/80 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <label className="relative rounded-xl border-2 border-dashed border-white/10 hover:border-neon/30 bg-navy-800/50 aspect-video flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <input type="file" accept="image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => addAdditionalPhotos(e.target.files)} />
                  <Plus className="w-6 h-6 text-slate-500 mb-1" />
                  <span className="text-xs text-slate-500">Add photos</span>
                </label>
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-500">Fields marked with <span className="text-neon">*</span> are required.</p>
            <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>) : 'Submit Intake'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
