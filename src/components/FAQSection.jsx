'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { useTranslation } from '@/i18n/LocaleProvider'

export default function FAQSection() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(null)

  const faqs = useMemo(
    () => [
      { q: t('home.faq.q1'), a: t('home.faq.a1') },
      { q: t('home.faq.q2'), a: t('home.faq.a2') },
      { q: t('home.faq.q3'), a: t('home.faq.a3') },
      { q: t('home.faq.q4'), a: t('home.faq.a4') },
      { q: t('home.faq.q5'), a: t('home.faq.a5') },
      { q: t('home.faq.q6'), a: t('home.faq.a6') },
    ],
    [t]
  )

  return (
    <section className="section-padding relative overflow-hidden section-scrim">
      <div className="max-w-3xl mx-auto relative">
        <SectionHeader eyebrow={t('home.faq.eyebrow')} title={t('home.faq.title')} />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-neon shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
