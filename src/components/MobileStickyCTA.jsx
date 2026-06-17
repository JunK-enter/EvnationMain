'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import { ArrowRight, Phone } from 'lucide-react'
import { companyContact } from '@/data/companyContact'
import { useTranslation } from '@/i18n/LocaleProvider'

const HIDDEN_PREFIXES = ['/quote', '/admin']

export default function MobileStickyCTA() {
  const pathname = usePathname()
  const { t } = useTranslation()

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="pointer-events-auto mx-3 mb-3 flex gap-2 p-1.5 rounded-2xl glass border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <Link
          href="/quote"
          className="btn-primary flex-1 justify-center !py-3 !text-sm min-h-[44px] !shadow-none"
        >
          {t('common.getQuoteShort')} <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href={`tel:${companyContact.phoneTel}`}
          className="btn-secondary !px-4 justify-center min-h-[44px] min-w-[44px]"
          aria-label={`Call ${companyContact.phone}`}
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
