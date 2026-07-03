'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from '@/components/Link'
import {
  GALLERY_CATEGORIES,
  galleryPhotos,
  getGalleryByCategory,
} from '@/data/gallery'
import { stats } from '@/data/localSeo'
import { ArrowRight, MapPin, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'

const CATEGORY_ACCENT = {
  all: '#00e5a0',
  installation: '#38bdf8',
  completed: '#00e5a0',
  partnership: '#a78bfa',
  ev: '#fbbf24',
  panel: '#f472b6',
  powerwall: '#34d399',
}

function GalleryCard({ photo, index, onOpen }) {
  const accent = CATEGORY_ACCENT[photo.categories[0]] || CATEGORY_ACCENT.all

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.32) }}
      onClick={() => onOpen(photo.id)}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-white/[0.08] bg-navy-900/40 hover:border-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80" />
        {photo.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-neon/15 text-neon border border-neon/25">
            Featured
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {GALLERY_CATEGORIES.find((c) => c.id === photo.categories[0])?.label}
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

function Lightbox({ photoId, onClose, onNavigate }) {
  const photos = useMemo(() => getGalleryByCategory('all'), [])
  const index = photos.findIndex((p) => p.id === photoId)
  const photo = photos[index]
  const hasPrev = index > 0
  const hasNext = index < photos.length - 1

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

  if (!photo) return null

  const accent = CATEGORY_ACCENT[photo.categories[0]] || CATEGORY_ACCENT.all

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/90 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close gallery"
      />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        className="relative w-full max-w-5xl max-h-[min(92vh,900px)] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-navy-900 shadow-2xl"
      >
        <div className="relative flex-1 min-h-0 bg-black/40">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full max-h-[min(62vh,640px)] object-contain"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-navy-950/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-950/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {hasNext && (
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
        <div className="p-5 sm:p-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {photo.categories.map((catId) => {
              const cat = GALLERY_CATEGORIES.find((c) => c.id === catId)
              if (!cat || catId === 'all') return null
              return (
                <span
                  key={catId}
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{
                    color: CATEGORY_ACCENT[catId],
                    borderColor: `${CATEGORY_ACCENT[catId]}44`,
                    background: `${CATEGORY_ACCENT[catId]}12`,
                  }}
                >
                  {cat.label}
                </span>
              )
            })}
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{photo.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{photo.caption}</p>
          {photo.location && (
            <p className="flex items-center gap-1.5 mt-3 text-sm text-slate-500">
              <MapPin className="w-4 h-4 shrink-0" style={{ color: accent }} />
              {photo.location}
            </p>
          )}
          <p className="mt-4 text-[11px] text-slate-600 font-mono tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
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

  return (
    <div className="pt-[max(5.5rem,calc(4.25rem+env(safe-area-inset-top,0px)))] pb-[max(2rem,env(safe-area-inset-bottom,0px))] overflow-x-clip">
      <section className="relative min-h-0 sm:min-h-[36vh] lg:min-h-[48vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-orb w-[min(420px,90vw)] h-[min(420px,90vw)] sm:w-[560px] sm:h-[560px] bg-neon/6 top-[-25%] right-[-10%]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 sm:pb-10 lg:pb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-neon/80 mb-4 sm:mb-6 flex items-center gap-2">
              <Images className="w-3.5 h-3.5" />
              Field photos · {stats.installations} installs
            </p>
            <h1 className="font-display font-bold leading-[0.92] tracking-tight">
              <span className="block text-[clamp(2.25rem,12vw,7rem)] text-white">INSTALL</span>
              <span className="block text-[clamp(2.25rem,12vw,7rem)] hero-gradient-text -mt-1 sm:-mt-3">GALLERY</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-slate-400 max-w-lg text-sm leading-relaxed">
              Real crew photos from the field — installation day, finished work, and partner &amp; dealer visits across our service areas.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-[max(4.25rem,env(safe-area-inset-top,0px))] lg:top-16 z-30 border-y border-white/5 bg-navy-950/92 max-lg:backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-3 py-2.5 sm:py-3 overflow-x-auto scrollbar-hide scroll-touch">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            const accent = CATEGORY_ACCENT[cat.id] || CATEGORY_ACCENT.all
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 relative flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-full border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-white border-white/20 bg-white/[0.06]'
                    : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/[0.03]'
                }`}
              >
                {cat.label}
                <span
                  className="font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-full"
                  style={{
                    color: isActive ? accent : undefined,
                    background: isActive ? `${accent}18` : 'rgba(255,255,255,0.04)',
                  }}
                >
                  {categoryCounts[cat.id] ?? 0}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-x-2 -bottom-[11px] h-0.5 rounded-full"
                    style={{ background: accent }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 py-24">No photos in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((photo, i) => (
                  <GalleryCard key={photo.id} photo={photo} index={i} onOpen={setLightboxId} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      <section className="relative mt-4 sm:mt-8 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/[0.03] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-2xl sm:text-3xl font-bold mb-3">Want your home in the gallery?</p>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Licensed C-10 installs across California and our national service markets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/quote" className="btn-primary inline-flex items-center gap-2">
              Get a quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auto-dealer" className="btn-secondary inline-flex items-center gap-2">
              Dealer partnerships
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
          />
        )}
      </AnimatePresence>
    </div>
  )
}
