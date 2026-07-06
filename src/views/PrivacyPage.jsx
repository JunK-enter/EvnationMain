'use client'

import LegalLayout from '../components/LegalLayout'
import { useLegalCopy } from '@/i18n/hooks/useExtraPages'

export default function PrivacyPage() {
  const copy = useLegalCopy('privacy')

  return (
    <LegalLayout
      eyebrow={copy.eyebrow}
      title={copy.title}
      lastUpdated={copy.lastUpdated}
      intro={copy.intro}
      sections={copy.sections}
    />
  )
}
