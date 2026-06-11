'use client'

import { useCallback, useRef, useState } from 'react'
import { Camera, GripVertical } from 'lucide-react'

const TYPE_ACCENT = {
  ev: '#00ff88',
  panel: '#60a5fa',
  solar: '#fbbf24',
  commercial: '#34d399',
}

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

function RevealLayer({ side, image, text, label, accent, pct, isImageMode }) {
  const isBefore = side === 'before'

  if (isImageMode && image) {
    return (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: isBefore ? `inset(0 ${100 - pct}% 0 0)` : `inset(0 0 0 ${pct}%)` }}
      >
        <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
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
 * Drag the center handle to compare before / after.
 * Uses real photos when available, otherwise text panels.
 */
export default function BeforeAfterReveal({ project, className = '' }) {
  const ref = useRef(null)
  const { pct, bind } = useRevealSlider(50)
  const { before, after, cover } = project.images || {}
  const accent = TYPE_ACCENT[project.type] || TYPE_ACCENT.ev
  const hasBothImages = before && after
  const hasSingleImage = !hasBothImages && (after || cover || before)
  const isImageMode = hasBothImages || hasSingleImage

  if (hasSingleImage && !hasBothImages) {
    const src = after || cover || before
    return (
      <div className={`relative overflow-hidden rounded-sm bg-navy-900 ${className}`}>
        <img src={src} alt={project.title} className="w-full h-full object-cover min-h-[280px]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-neon text-navy-950">
          After
        </span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`relative select-none touch-pan-y sm:touch-none overflow-hidden rounded-sm bg-navy-900 min-h-[220px] sm:min-h-[280px] md:min-h-[340px] cursor-col-resize group ${className}`}
      {...bind(ref)}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />

      <RevealLayer
        side="before"
        image={before}
        text={project.before}
        label="Before"
        accent={accent}
        pct={pct}
        isImageMode={hasBothImages}
      />
      <RevealLayer
        side="after"
        image={after}
        text={project.after}
        label="After"
        accent={accent}
        pct={pct}
        isImageMode={hasBothImages}
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
  )
}

export function projectHasPhotos(project) {
  const { before, after, cover } = project.images || {}
  return !!(before || after || cover)
}

export { TYPE_ACCENT }
