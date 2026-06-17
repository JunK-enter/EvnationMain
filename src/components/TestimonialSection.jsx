'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import { useTranslation } from '@/i18n/LocaleProvider'

export default function TestimonialSection() {
  const { t } = useTranslation()

  const reviews = useMemo(
    () => [
      { name: 'Sarah M.', location: t('home.reviews.review1Location'), rating: 5, text: t('home.reviews.review1Text') },
      { name: 'James T.', location: t('home.reviews.review2Location'), rating: 5, text: t('home.reviews.review2Text') },
      { name: 'Lisa K.', location: t('home.reviews.review3Location'), rating: 5, text: t('home.reviews.review3Text') },
      { name: 'Robert H.', location: t('home.reviews.review4Location'), rating: 4, text: t('home.reviews.review4Text') },
    ],
    [t]
  )

  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <SectionAmbient />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader eyebrow={t('home.reviews.eyebrow')} title={t('home.reviews.title')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-neon text-neon" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-slate-500">{r.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
