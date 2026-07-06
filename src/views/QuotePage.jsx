'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import QuoteQuizFunnel from '@/components/QuoteQuizFunnel'
import StatusTracker from '@/components/StatusTracker'
import { useQuote } from '@/context/QuoteContext'
import { createSubmission, sendNotificationEmail } from '@/services/api'
import { getZoneStateCode, getZoneLabel } from '@/data/serviceZones'
import { useQuoteQuizCopy } from '@/i18n/useQuoteQuizCopy'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from '@/i18n/LocaleProvider'

export default function QuotePage() {
  const { t } = useTranslation()
  const { serviceNeeds } = useQuoteQuizCopy()
  const { cartItems, clearCart } = useQuote()
  const [submitted, setSubmitted] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleQuizSubmit(data) {
    setSubmitting(true)
    const serviceLabel = serviceNeeds.find((s) => s.id === data.serviceNeed)?.title || data.serviceNeed

    const submission = await createSubmission({
      personal: data.personal,
      home: {
        zone: data.zone,
        zoneLabel: getZoneLabel(data.zone),
        state: data.state || getZoneStateCode(data.zone),
        street: data.street,
        city: data.city,
        zip: data.zip,
        panelSize: data.panelSize,
        panelLocation: data.panelLocation,
        breakerSize: data.breakerSize,
      },
      services: cartItems.map((i) => i.id),
      serviceNeed: data.serviceNeed,
      serviceLabel,
      notes: data.notes,
      install: {
        chargerType: data.chargerType,
        panelUpgrade: data.panelUpgrade,
        permitNeeded: data.permitNeeded,
      },
      estimatedTotal: data.estimatedTotal,
    })

    await sendNotificationEmail(submission)
    setSubmitted(submission)
    clearCart()
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="page-top page-bottom min-h-screen flex items-center bg-navy-950">
        <div className="max-w-lg mx-auto px-4 text-center w-full">
          <CheckCircle className="w-16 h-16 text-neon mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">{t('quote.successTitle')}</h1>
          <p className="text-slate-400 mb-2">
            {t('quote.successReference')} <span className="text-neon font-mono">{submitted.id}</span>
          </p>
          <p className="text-slate-400 mb-8">{t('quote.successDesc')}</p>
          <div className="glass rounded-2xl p-8 mb-8">
            <StatusTracker currentStatus="submitted" />
          </div>
          <Link href="/" className="btn-primary">{t('quote.backHome')}</Link>
        </div>
      </div>
    )
  }

  return <QuoteQuizFunnel onSubmit={handleQuizSubmit} submitting={submitting} />
}
