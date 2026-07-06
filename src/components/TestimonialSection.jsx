'use client'

import { useMemo } from 'react'
import { Star } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import { useTranslation } from '@/i18n/LocaleProvider'
import { getStaticReviews } from '@/lib/googleReviews'
import Reveal from '@/lib/Reveal'

function ReviewStars({ rating }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < rating ? 'fill-neon text-neon' : 'text-slate-600'}`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  return (
    <Reveal delay={index * 0.1} className="mobile-card glass rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col">
      <ReviewStars rating={review.rating} />
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 flex-1">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center gap-2.5">
        {review.photoUrl ? (
          <img
            src={review.photoUrl}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover shrink-0"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{review.name}</p>
          {review.relativeTime ? (
            <p className="text-xs text-slate-500">{review.relativeTime}</p>
          ) : review.location ? (
            <p className="text-xs text-slate-500">{review.location}</p>
          ) : null}
        </div>
      </div>
    </Reveal>
  )
}

export default function TestimonialSection() {
  const { t } = useTranslation()
  const { reviews } = useMemo(() => getStaticReviews(t), [t])

  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <SectionAmbient />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader eyebrow={t('home.reviews.eyebrow')} title={t('home.reviews.title')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
