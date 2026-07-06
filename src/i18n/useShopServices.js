'use client'

import { useMemo } from 'react'
import { shopServices } from '@/data/services'
import { useTranslation } from '@/i18n/LocaleProvider'

export function useShopServices() {
  const { t } = useTranslation()

  return useMemo(
    () =>
      shopServices.map((service) => ({
        ...service,
        name: t(`services.items.${service.id}.name`),
        shortDesc: t(`services.items.${service.id}.shortDesc`),
        benefits: [1, 2, 3].map((i) => t(`services.items.${service.id}.benefit${i}`)),
      })),
    [t],
  )
}
