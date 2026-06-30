'use client'

import { useCallback, useRef, useState } from 'react'
import { Camera, GripVertical } from 'lucide-react'

const TYPE_ACCENT = {
  ev: '#00ff88',
  panel: '#60a5fa',
  solar: '#fbbf24',
  commercial: '#34d399',
}

/** Compact frame for portrait install photos — keeps swipe layers aligned. */
const SWIPE_FRAME_CLASS =
  'mx-auto w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4]'

function useRevealSlider(initial = 50) {
  const [pct, setPct] = useState(initial)
  const dragging = useRef(false)

  const update = useCallback((clientX, ref) => {
    if (!ref.current) return
    const { left, width } = ref.current.getBoundingClientRect()
    setPct(Math.min(96, Math.max(4, ((clientX - left) / width) * 100)))
  }, [])

  const bind = useCallback((ref) => ({
    onPointerDown: (e) => {
      dragging.current = true
      ref.current?.setPointerCapture(e.pointerId)
      update(e.clientX, ref)
    },
    onPointerMove: (e) => {
      if (!dragging.current) return
      update(e.clientX, ref)
    },
    onPointerUp: (e) => {
      dragging.current = false
      ref.current?.releasePointerCapture(e.pointerId)
    },
  }), [update])

  return { pct, setPct, bind }
}

function RevealLayer({ side, image, text, label, accent, pct, isImageMode, imageFit = 'cover', imagePosition = 'center' }) {
  const isBefore = side === 'before'

  if (isImageMode && image) {
    return (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: isBefore ? `inset(0 ${100 - pct}% 0 0)` : `inset(0 0 0 ${pct}%)` }}
      >
        <img
          src={image}
          alt={label}
          className={`absolute inset-0 w-full h-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
          style={{ objectPosition: imagePosition }}
          draggable={false}
        />
        <span
          className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
          style={{
            background: isBefore ? 'rgba(0,0,0,0.65)' : accent,
            color: isBefore ? '#fff' : '#04060f',
          }}
        >
          {label}
        </span>
        <div className={`absolute inset-0 ${isBefore ? 'bg-red-950/10' : 'bg-neon/5'}`} />
      </div>
    )
  }

  return (
    <div
      className="absolute inset-0 flex items-end p-6 sm:p-8"
      style={{
        clipPath: isBefore ? `inset(0 ${100 - pct}% 0 0)` : `inset(0 0 0 ${pct}%)`,
        background: isBefore
          ? 'linear-gradient(135deg, rgba(127,29,29,0.35) 0%, rgba(15,22,41,0.95) 100%)'
          : `linear-gradient(135deg, rgba(15,22,41,0.9) 0%, ${accent}18 100%)`,
      }}
    >
      <div>
        <span
          className="text-[10px] font-bold uppercase tracking-widest mb-2 block"
          style={{ color: isBefore ? '#f87171' : accent }}
        >
          {label}
        </span>
        <p className={`leading-relaxed max-w-sm ${isBefore ? 'text-slate-400 text-sm' : 'text-slate-200 text-sm sm:text-base'}`}>
          {text}
        </p>
      </div>
    </div>
  )
}

/**
 * Side-by-side before/after — use when photos weren't taken from the same angle.
 */
export function BeforeAfterSideBySide({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
  beforePosition = 'center',
  afterPosition = 'center',
  fit = 'cover',
  className = '',
}) {
  if (!before || !after) return null

  return (
    <div className={`grid grid-cols-2 gap-1 sm:gap-1.5 ${className}`}>
      <div className="relative overflow-hidden bg-navy-950 rounded-sm">
        <img
          src={before}
          alt={beforeAlt}
          className="w-full h-auto block"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-red-500/90 text-white">
          Before
        </span>
      </div>
      <div className="relative overflow-hidden bg-navy-950 rounded-sm">
        <img
          src={after}
          alt={afterAlt}
          className="w-full h-auto block"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-neon text-navy-950">
          After
        </span>
      </div>
    </div>
  )
}

/**
 * Drag the center handle to compare before / after.
 * Uses real photos when available, otherwise text panels.
 * Set comparisonMode="side-by-side" when photos differ in framing.
 */
export default function BeforeAfterReveal({ project, className = '', beforeSrc, afterSrc, comparisonMode, imageFit = 'cover', imagePosition = 'center top' }) {
  const ref = useRef(null)
  const { pct, bind } = useRevealSlider(50)
  const images = project.images || {}
  const before = beforeSrc ?? images.before
  const after = afterSrc ?? images.after
  const mode = comparisonMode ?? project.comparisonMode ?? 'swipe'
  const { cover } = images
  const accent = TYPE_ACCENT[project.type] || TYPE_ACCENT.ev
  const hasBothImages = before && after

  if (hasBothImages && mode === 'side-by-side') {
    return (
      <BeforeAfterSideBySide
        before={before}
        after={after}
        beforeAlt={`${project.title} before`}
        afterAlt={`${project.title} after`}
        beforePosition={beforeSrc ? 'top center' : 'center'}
        afterPosition={afterSrc ? 'top center' : 'center'}
        className={className}
      />
    )
  }

  const hasSingleImage = !hasBothImages && (after || cover || before)
  const isImageMode = hasBothImages || hasSingleImage

  if (hasSingleImage && !hasBothImages) {
    const src = after || cover || before
    const label = after ? 'After' : before ? 'Before' : 'Project'
    return (
      <div className={`relative overflow-hidden rounded-sm bg-navy-900 ${className}`}>
        <img src={src} alt={project.title} className="w-full h-auto block" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-neon text-navy-950">
          {label}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`relative select-none touch-pan-y sm:touch-none cursor-col-resize group ${SWIPE_FRAME_CLASS} ${className}`}
      {...bind(ref)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-sm bg-navy-900">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <RevealLayer
        side="before"
        image={before}
        text={project.before}
        label="Before"
        accent={accent}
        pct={pct}
        isImageMode={hasBothImages}
        imageFit={imageFit}
        imagePosition={imagePosition}
      />
      <RevealLayer
        side="after"
        image={after}
        text={project.after}
        label="After"
        accent={accent}
        pct={pct}
        isImageMode={hasBothImages}
        imageFit={imageFit}
        imagePosition={imagePosition}
      />

      {!hasBothImages && !before && !after && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-500 bg-navy-950/80 px-2 sm:px-2.5 py-1 rounded-full border border-white/10 max-w-[55%] sm:max-w-none text-right leading-tight">
          <Camera className="w-3 h-3 shrink-0 hidden sm:block" />
          <span>Swipe to compare · photos coming</span>
        </div>
      )}

      {/* Divider */}
      <div className="absolute inset-y-0 z-20 pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
        <div className="h-full w-px bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 border-white bg-navy-950/90 shadow-xl transition-transform group-active:scale-95"
          style={{ boxShadow: `0 0 20px ${accent}55` }}
        >
          <GripVertical className="w-5 h-5 sm:w-4 sm:h-4 text-white" />
        </div>
      </div>
      </div>
    </div>
  )
}

export function projectHasPhotos(project) {
  const { before, after, cover } = project.images || {}
  return !!(before || after || cover)
}

export { TYPE_ACCENT }
