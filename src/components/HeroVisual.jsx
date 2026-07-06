'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import { Images, ArrowUpRight } from 'lucide-react'
import { getFeaturedGalleryPhotos } from '@/data/gallery'
import { useTranslation } from '@/i18n/LocaleProvider'
import { usePrefersReducedMotion } from '@/lib/useMediaQuery'

const ROTATE_MS = 4500

function HeroGalleryCarousel({ className = '' }) {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const slides = useMemo(() => getFeaturedGalleryPhotos(12), [])
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (next) => {
      if (!slides.length) return
      setIndex((next + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    setIndex(0)
  }, [slides])

  useEffect(() => {
    if (reducedMotion || slides.length <= 1) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [reducedMotion, slides.length])

  if (!slides.length) return null

  const active = slides[index]

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-square max-w-lg mx-auto w-full rounded-2xl sm:rounded-3xl neon-border overflow-hidden bg-navy-950 shadow-[0_0_48px_rgba(0,255,136,0.08)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.id}
            src={active.src}
            alt={active.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-navy-950/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(0,255,136,0.12),transparent_45%)] pointer-events-none" />

        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-start justify-between gap-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wide text-neon bg-navy-950/75 border border-neon/20 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              {!reducedMotion && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 animate-ping" />
              )}
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon" />
            </span>
            {t('home.gallery.eyebrow')}
          </span>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium text-slate-300 bg-navy-950/75 border border-white/10 backdrop-blur-sm hover:text-white hover:border-neon/30 transition-colors"
          >
            {t('home.gallery.viewAll')}
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          </Link>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display font-bold text-white text-sm sm:text-base leading-snug mb-0.5">
                {active.title}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {active.caption}
              </p>
            </motion.div>
          </AnimatePresence>

          {slides.length > 1 && (
            <div className="flex items-center gap-2 mt-3 sm:mt-4">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={slide.title}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-neon' : 'w-2 bg-white/25 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((cls) => (
          <div key={cls} className={`absolute w-4 h-4 sm:w-5 sm:h-5 border-neon/25 pointer-events-none z-10 ${cls}`} />
        ))}
      </div>

      <div className="mt-3 hidden sm:flex items-center justify-center gap-2 text-[11px] text-slate-500">
        <Images className="w-3.5 h-3.5 text-neon/60 shrink-0" />
        <span>{t('home.gallery.subtitle')}</span>
      </div>
    </div>
  )
}

export default function HeroVisual() {
  return <HeroGalleryCarousel />
}
