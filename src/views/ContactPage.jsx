'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { useQuote } from '../context/QuoteContext'
import UploadBox from '../components/UploadBox'
import { createSubmission, sendNotificationEmail } from '../services/api'
import { calculateQuote } from '../services/quoteCalculator'
import { DEFAULT_ZONE_ID, getZoneLabel, getZoneStateCode } from '../data/serviceZones'
import ZoneSelect from '../components/ZoneSelect'
import { homeTypes, parkingTypes, panelSizes } from '../data/services'
import { CheckCircle } from 'lucide-react'
import StatusTracker from '../components/StatusTracker'
import { useTranslation } from '@/i18n/LocaleProvider'

const HOME_TYPE_KEYS = ['singleFamily', 'townhouse', 'condo', 'multiFamily', 'other']
const PARKING_KEYS = ['attachedGarage', 'detachedGarage', 'carport', 'driveway', 'street']

const inputClass = 'w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white'

export default function ContactPage() {
  const { t } = useTranslation()
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
        state: getZoneStateCode(form.zone),
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
      <div className="page-top page-bottom min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-neon mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">{t('contact.receivedTitle')}</h1>
          <p className="text-slate-400 mb-2">{t('contact.reference')} <span className="text-neon font-mono">{submitted.id}</span></p>
          <p className="text-slate-400 mb-8">{t('contact.receivedDesc')}</p>
          <div className="glass rounded-2xl p-8">
            <StatusTracker currentStatus="submitted" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-top page-bottom">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{t('contact.eyebrow')}</p>
          <h1 className="font-display text-4xl font-bold">{t('contact.title')}</h1>
          <p className="text-slate-400 mt-3">{t('contact.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 lg:p-8 space-y-8">
          <div>
            <h3 className="font-display font-semibold mb-4">{t('contact.personalInfo')}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder={t('contact.firstName')} value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} />
              <input placeholder={t('contact.lastName')} value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} />
              <input required type="email" placeholder={t('contact.email')} value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
              <input type="tel" placeholder={t('contact.phone')} value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">{t('contact.homeInfo')}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <ZoneSelect required value={form.zone} onChange={(v) => update('zone', v)} className={inputClass} />
              <input placeholder={t('contact.city')} value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} />
              <input placeholder={t('contact.zip')} value={form.zip} onChange={(e) => update('zip', e.target.value)} className={inputClass} />
              <select value={form.homeType} onChange={(e) => update('homeType', e.target.value)} className={inputClass}>
                <option value="">{t('contact.homeType')}</option>
                {HOME_TYPE_KEYS.map((key, i) => (
                  <option key={key} value={homeTypes[i]}>{t(`forms.homeTypes.${key}`)}</option>
                ))}
              </select>
              <select value={form.panelSize} onChange={(e) => update('panelSize', e.target.value)} className={inputClass}>
                <option value="">{t('contact.panelSize')}</option>
                {panelSizes.map((s) => (
                  <option key={s} value={s}>{s === 'Unknown' ? t('forms.panelUnknown') : s}</option>
                ))}
              </select>
              <select value={form.parking} onChange={(e) => update('parking', e.target.value)} className={inputClass}>
                <option value="">{t('contact.parking')}</option>
                {PARKING_KEYS.map((key, i) => (
                  <option key={key} value={parkingTypes[i]}>{t(`forms.parkingTypes.${key}`)}</option>
                ))}
              </select>
              <input type="number" placeholder={t('contact.distance')} value={form.distance} onChange={(e) => update('distance', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">{t('contact.vehicleInfo')}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder={t('contact.vehicleMake')} value={form.vehicleMake} onChange={(e) => update('vehicleMake', e.target.value)} className={inputClass} />
              <input placeholder={t('contact.vehicleModel')} value={form.vehicleModel} onChange={(e) => update('vehicleModel', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">{t('contact.photos')}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <UploadBox label={t('contact.panelPhoto')} preview={form.panelPhoto?.preview} onUpload={(f) => update('panelPhoto', f)} />
              <UploadBox label={t('contact.garagePhoto')} preview={form.garagePhoto?.preview} onUpload={(f) => update('garagePhoto', f)} />
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">{t('contact.notes')}</h3>
            <textarea rows={4} placeholder={t('contact.notesPlaceholder')} value={form.notes} onChange={(e) => update('notes', e.target.value)} className={inputClass} />
          </div>

          <button type="submit" className="btn-primary w-full justify-center">{t('contact.submit')}</button>
        </form>
      </div>
    </div>
  )
}
