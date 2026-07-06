'use client'

import LegalLayout from '../components/LegalLayout'
import { useLegalCopy } from '@/i18n/hooks/useExtraPages'

export default function TermsPage() {
  const copy = useLegalCopy('terms')

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
