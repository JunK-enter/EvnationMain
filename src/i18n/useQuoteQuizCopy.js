'use client'

import { useMemo } from 'react'
import { BREAKER_SIZES, QUOTE_QUIZ_STEPS, SERVICE_NEEDS } from '@/data/quoteQuizSteps'
import { useTranslation } from '@/i18n/LocaleProvider'

export function useQuoteQuizCopy() {
  const { t } = useTranslation()

  const steps = useMemo(
    () =>
      QUOTE_QUIZ_STEPS.map((step) => ({
        ...step,
        shortLabel: t(`quote.steps.${step.id}.shortLabel`),
        title: t(`quote.steps.${step.id}.title`),
        subtitle: t(`quote.steps.${step.id}.subtitle`),
      })),
    [t],
  )

  const serviceNeeds = useMemo(
    () =>
      SERVICE_NEEDS.map((item) => ({
        ...item,
        title: t(`quote.serviceNeeds.${item.id}.title`),
        desc: t(`quote.serviceNeeds.${item.id}.desc`),
      })),
    [t],
  )

  const breakerSizes = useMemo(
    () => BREAKER_SIZES.map((size) => (size === 'Not sure' ? t('quote.notSure') : size)),
    [t],
  )

  return { steps, serviceNeeds, breakerSizes }
}
