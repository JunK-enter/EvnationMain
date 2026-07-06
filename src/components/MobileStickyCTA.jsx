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
      <div className="pointer-events-auto mx-2.5 mb-2.5 flex gap-1.5 p-1 rounded-xl bg-navy-950/95 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <Link
          href="/quote"
          className="btn-primary flex-1 justify-center !py-2.5 !text-[13px] min-h-[42px] !shadow-none !px-3"
        >
          {t('common.getQuoteShort')} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={`tel:${companyContact.phoneTel}`}
          className="btn-secondary !px-3 justify-center min-h-[42px] min-w-[42px] !py-2.5"
          aria-label={`Call ${companyContact.phone}`}
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
