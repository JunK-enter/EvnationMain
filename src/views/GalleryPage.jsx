'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from '@/components/Link'
import {
  GALLERY_CATEGORIES,
  galleryPhotos,
  getGalleryByCategory,
} from '@/data/gallery'
import { stats } from '@/data/localSeo'
import { useTranslation } from '@/i18n/LocaleProvider'
import { useIsMobile, usePrefersReducedMotion } from '@/lib/useMediaQuery'
import { ArrowRight, MapPin, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'

const CATEGORY_ACCENT = {
  all: '#00e5a0',
  installation: '#38bdf8',
  completed: '#00e5a0',
  partnership: '#a78bfa',
  ev: '#fbbf24',
  battery: '#34d399',
}

function getCategoryLabel(t, catId, compact) {
  const key = compact ? `galleryPage.categoriesShort.${catId}` : `galleryPage.categories.${catId}`
  return t(key)
}

function getPrimaryCategoryLabel(t, photo, compact) {
  const catId = photo.categories[0]
  if (!GALLERY_CATEGORIES.some((c) => c.id === catId)) return ''
  return getCategoryLabel(t, catId, compact)
}

function GalleryCard({ photo, index, onOpen, compact, animate, t }) {
  const accent = CATEGORY_ACCENT[photo.categories[0]] || CATEGORY_ACCENT.all
  const categoryLabel = getPrimaryCategoryLabel(t, photo, compact)

  const sharedProps = {
    type: 'button',
    onClick: () => onOpen(photo.id),
  }

  if (compact) {
    const card = (
      <button
        {...sharedProps}
        className="group relative w-full text-left rounded-xl overflow-hidden border border-white/[0.06] bg-navy-900/50 active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/10" />
          {photo.featured && (
            <span className="absolute top-2 left-2 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-neon/20 text-neon border border-neon/30">
              {t('home.gallery.featured')}
            </span>
          )}
          <div className="absolute bottom-0 inset-x-0 p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
              <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400 truncate">
                {categoryLabel}
              </span>
            </div>
            <h3 className="font-display font-semibold text-white text-[11px] leading-snug line-clamp-2">
              {photo.title}
            </h3>
          </div>
        </div>
      </button>
    )

    if (!animate) return card

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.12) }}
      >
        {card}
      </motion.div>
    )
  }

  const card = (
    <button
      {...sharedProps}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-white/[0.08] bg-navy-900/40 hover:border-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80" />
        {photo.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-neon/15 text-neon border border-neon/25">
            {t('home.gallery.featured')}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {categoryLabel}
          </span>
        </div>
        <h3 className="font-display font-semibold text-white text-sm sm:text-base leading-snug mb-1.5 group-hover:text-neon transition-colors">
          {photo.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">{photo.caption}</p>
        {photo.location && (
          <p className="flex items-center gap-1 mt-3 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 shrink-0" style={{ color: accent }} />
            {photo.location}
          </p>
        )}
      </div>
    </button>
  )

  if (!animate) return card

  return (
    <motion.button
      {...sharedProps}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.32) }}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-white/[0.08] bg-navy-900/40 hover:border-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80" />
        {photo.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-neon/15 text-neon border border-neon/25">
            {t('home.gallery.featured')}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {categoryLabel}
          </span>
        </div>
        <h3 className="font-display font-semibold text-white text-sm sm:text-base leading-snug mb-1.5 group-hover:text-neon transition-colors">
          {photo.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">{photo.caption}</p>
        {photo.location && (
          <p className="flex items-center gap-1 mt-3 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 shrink-0" style={{ color: accent }} />
            {photo.location}
          </p>
        )}
      </div>
    </motion.button>
  )
}

function Lightbox({ photoId, onClose, onNavigate, compact, animate }) {
  const photos = useMemo(() => getGalleryByCategory('all'), [])
  const index = photos.findIndex((p) => p.id === photoId)
  const photo = photos[index]
  const hasPrev = index > 0
  const hasNext = index < photos.length - 1
  const touchStartX = useRef(null)

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(photos[index - 1].id)
  }, [hasPrev, index, onNavigate, photos])

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(photos[index + 1].id)
  }, [hasNext, index, onNavigate, photos])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0]?.clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 48) return
    if (delta > 0) goPrev()
    else goNext()
  }

  if (!photo) return null

  const accent = CATEGORY_ACCENT[photo.categories[0]] || CATEGORY_ACCENT.all

  const panel = (
    <div
      className={`relative w-full flex flex-col overflow-hidden bg-navy-950 ${
        compact
          ? 'h-[100dvh] max-h-[100dvh] rounded-none border-0'
          : 'max-w-5xl max-h-[min(92vh,900px)] rounded-2xl border border-white/10 bg-navy-900 shadow-2xl'
      }`}
    >
      <div
        className={`relative flex-1 min-h-0 bg-black flex items-center justify-center ${
          compact ? 'pt-[env(safe-area-inset-top,0px)]' : ''
        }`}
        onTouchStart={compact ? onTouchStart : undefined}
        onTouchEnd={compact ? onTouchEnd : undefined}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full object-contain ${
            compact ? 'max-h-[calc(100dvh-11rem-env(safe-area-inset-bottom,0px))]' : 'max-h-[min(62vh,640px)]'
          }`}
        />
        <button
          type="button"
          onClick={onClose}
          className={`absolute p-2 rounded-full bg-navy-950/85 border border-white/10 text-slate-200 active:scale-95 transition-transform ${
            compact ? 'top-[max(0.75rem,env(safe-area-inset-top))] right-3' : 'top-3 right-3 text-slate-300 hover:text-white'
          }`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {!compact && hasPrev && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-950/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {!compact && hasNext && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-950/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div
        className={`border-t border-white/10 shrink-0 ${
          compact
            ? 'px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))] bg-navy-950/95'
            : 'p-5 sm:p-6'
        }`}
      >
        {compact && (
          <div className="flex items-center justify-between gap-3 mb-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasPrev}
              className="p-2 rounded-full border border-white/10 text-slate-300 disabled:opacity-30 active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-500 font-mono tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={goNext}
              disabled={!hasNext}
              className="p-2 rounded-full border border-white/10 text-slate-300 disabled:opacity-30 active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className={`flex flex-wrap items-center gap-1.5 ${compact ? 'mb-1.5' : 'mb-2'}`}>
          {photo.categories.map((catId) => {
            const cat = GALLERY_CATEGORIES.find((c) => c.id === catId)
            if (!cat || catId === 'all') return null
            const label = compact ? (MOBILE_CATEGORY_LABELS[catId] || cat.label) : cat.label
            return (
              <span
                key={catId}
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  color: CATEGORY_ACCENT[catId],
                  borderColor: `${CATEGORY_ACCENT[catId]}44`,
                  background: `${CATEGORY_ACCENT[catId]}12`,
                }}
              >
                {label}
              </span>
            )
          })}
        </div>
        <h3 className={`font-display font-bold text-white ${compact ? 'text-base mb-1' : 'text-xl sm:text-2xl mb-2'}`}>
          {photo.title}
        </h3>
        <p className={`text-slate-400 leading-relaxed ${compact ? 'text-xs line-clamp-2' : 'text-sm'}`}>
          {photo.caption}
        </p>
        {photo.location && (
          <p className={`flex items-center gap-1.5 text-slate-500 ${compact ? 'mt-2 text-[11px]' : 'mt-3 text-sm'}`}>
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
            {photo.location}
          </p>
        )}
        {!compact && (
          <p className="mt-4 text-[11px] text-slate-600 font-mono tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>
        )}
      </div>
    </div>
  )

  if (!animate) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={photo.title}>
        <button type="button" className="absolute inset-0 bg-navy-950/95" onClick={onClose} aria-label="Close gallery" />
        <div className={`relative z-10 ${compact ? 'w-full h-full' : 'w-full p-4 sm:p-6'}`}>{panel}</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${compact ? '' : 'p-4 sm:p-6'}`}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button
        type="button"
        className={`absolute inset-0 ${compact ? 'bg-black' : 'bg-navy-950/90 backdrop-blur-md'}`}
        onClick={onClose}
        aria-label="Close gallery"
      />
      <motion.div
        initial={compact ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        animate={compact ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={compact ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
        className={`relative z-10 ${compact ? 'w-full h-full' : 'w-full'}`}
      >
        {panel}
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const animate = !isMobile && !reducedMotion

  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxId, setLightboxId] = useState(null)

  const filtered = useMemo(() => getGalleryByCategory(activeCategory), [activeCategory])
  const categoryCounts = useMemo(() => {
    const counts = { all: galleryPhotos.length }
    GALLERY_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') return
      counts[cat.id] = galleryPhotos.filter((p) => p.categories.includes(cat.id)).length
    })
    return counts
  }, [])

  const grid = filtered.length === 0 ? (
    <p className="text-center text-slate-500 py-16 sm:py-24">{t('galleryPage.emptyCategory')}</p>
  ) : (
    <div className={`grid gap-2.5 sm:gap-5 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
      {filtered.map((photo, i) => (
        <GalleryCard
          key={photo.id}
          photo={photo}
          index={i}
          onOpen={setLightboxId}
          compact={isMobile}
          animate={animate}
          t={t}
        />
      ))}
    </div>
  )

  return (
    <div className="pt-[max(5rem,calc(4.25rem+env(safe-area-inset-top,0px)))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] overflow-x-clip">
      <section className="relative overflow-hidden sm:min-h-[36vh] lg:min-h-[48vh] flex flex-col justify-end">
        {!isMobile && (
          <>
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 hero-mesh pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="glow-orb w-[min(420px,90vw)] h-[min(420px,90vw)] sm:w-[560px] sm:h-[560px] bg-neon/6 top-[-25%] right-[-10%]" />
            </div>
          </>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-4 sm:pb-10 lg:pb-14 pt-1 sm:pt-0">
          {animate ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <HeroCopy isMobile={isMobile} t={t} />
            </motion.div>
          ) : (
            <HeroCopy isMobile={isMobile} />
          )}
        </div>
      </section>

      <div className="sticky top-[max(4.25rem,env(safe-area-inset-top,0px))] lg:top-16 z-30 border-y border-white/[0.06] bg-navy-950 max-lg:bg-navy-950/98 lg:bg-navy-950/92 lg:backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto scrollbar-hide scroll-touch snap-x snap-mandatory">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              const accent = CATEGORY_ACCENT[cat.id] || CATEGORY_ACCENT.all
              const label = getCategoryLabel(t, cat.id, isMobile)
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`snap-start shrink-0 relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 min-h-[40px] sm:min-h-[44px] rounded-full border text-[11px] sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-white border-white/20 bg-white/[0.08]'
                      : 'text-slate-500 border-white/[0.04] bg-white/[0.02] active:bg-white/[0.05]'
                  }`}
                  style={isActive ? { boxShadow: `inset 0 -2px 0 0 ${accent}` } : undefined}
                >
                  {label}
                  <span
                    className="font-mono text-[9px] sm:text-[10px] tabular-nums px-1 py-0.5 rounded-full min-w-[1.25rem] text-center"
                    style={{
                      color: isActive ? accent : undefined,
                      background: isActive ? `${accent}18` : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {categoryCounts[cat.id] ?? 0}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-14">
        {animate ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {grid}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div key={activeCategory}>{grid}</div>
        )}
      </div>

      <section className="relative mt-2 sm:mt-8 py-10 sm:py-20 overflow-hidden">
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/[0.03] to-transparent" />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-xl sm:text-3xl font-bold mb-2 sm:mb-3">{t('galleryPage.ctaTitle')}</p>
          <p className="text-slate-400 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
            {t('galleryPage.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-xs sm:max-w-none mx-auto">
            <Link href="/quote" className="btn-primary inline-flex items-center justify-center gap-2">
              {t('galleryPage.getQuote')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auto-dealer" className="btn-secondary inline-flex items-center justify-center gap-2">
              {t('galleryPage.dealerPartnerships')}
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxId && (
          <Lightbox
            photoId={lightboxId}
            onClose={() => setLightboxId(null)}
            onNavigate={setLightboxId}
            compact={isMobile}
            animate={animate}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function HeroCopy({ isMobile, t }) {
  if (isMobile) {
    return (
      <>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon/80 mb-2 flex items-center gap-1.5">
          <Images className="w-3 h-3" />
          {t('galleryPage.installsCount', { count: stats.installations })}
        </p>
        <h1 className="font-display text-[clamp(1.75rem,8vw,2.25rem)] font-bold tracking-tight text-white">
          {t('galleryPage.heroTitle1')}{' '}
          <span className="hero-gradient-text">{t('galleryPage.heroTitle2')}</span>
        </h1>
        <p className="mt-2 text-slate-400 text-xs leading-relaxed line-clamp-2">
          {t('galleryPage.heroMobileDesc')}
        </p>
      </>
    )
  }

  return (
    <>
      <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-neon/80 mb-4 sm:mb-6 flex items-center gap-2">
        <Images className="w-3.5 h-3.5" />
        {t('home.gallery.eyebrow')} · {t('galleryPage.installsCount', { count: stats.installations })}
      </p>
      <h1 className="font-display font-bold leading-[0.92] tracking-tight">
        <span className="block text-[clamp(2.25rem,12vw,7rem)] text-white">{t('galleryPage.heroTitle1')}</span>
        <span className="block text-[clamp(2.25rem,12vw,7rem)] hero-gradient-text -mt-1 sm:-mt-3">{t('galleryPage.heroTitle2')}</span>
      </h1>
      <p className="mt-4 sm:mt-6 text-slate-400 max-w-lg text-sm leading-relaxed">
        {t('galleryPage.heroDesktopDesc')}
      </p>
    </>
  )
}
