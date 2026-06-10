'use client'

import { useState, useMemo } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'
import {
  MAP_VIEW,
  projectLatLng,
  conusPath,
  STATE_GLOWS,
  STATE_META,
  SERVICE_MAP_MARKERS,
  getMarkersByState,
} from '@/data/serviceMapMarkers'

function MarkerPin({ marker, active, onEnter, onLeave, onClick }) {
  const { x, y } = projectLatLng(marker.lat, marker.lng)

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${marker.label}, ${marker.landmark}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {marker.primary && (
        <circle cx={x} cy={y} r={18} className="fill-neon/10 animate-pulse" />
      )}
      <circle
        cx={x}
        cy={y}
        r={active ? 9 : 7}
        className={`transition-all duration-200 ${active ? 'fill-neon' : 'fill-neon/90'}`}
        style={{ filter: active ? 'drop-shadow(0 0 12px rgba(0,255,136,0.9))' : 'drop-shadow(0 0 6px rgba(0,255,136,0.5))' }}
      />
      <circle cx={x} cy={y} r={2.5} className="fill-navy-950" />
      {(active || marker.primary) && (
        <text
          x={x}
          y={y - 14}
          textAnchor="middle"
          className="fill-white text-[10px] font-semibold pointer-events-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {marker.label}
        </text>
      )}
    </g>
  )
}

export default function ServiceAreaMap() {
  const [activeId, setActiveId] = useState(null)
  const byState = useMemo(() => getMarkersByState(), [])
  const active = SERVICE_MAP_MARKERS.find((m) => m.id === activeId)

  function handleMarkerClick(marker) {
    if (marker.anchor) {
      document.getElementById(marker.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    if (marker.countySlug) {
      window.location.href = `/service-areas/${marker.countySlug}`
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="glass rounded-3xl overflow-hidden border border-white/10 neon-border">
        <div className="grid lg:grid-cols-[1fr_280px]">
          {/* Map canvas */}
          <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-navy-900/80 via-navy-950 to-navy-900">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="relative">
              <p className="text-neon text-xs font-semibold uppercase tracking-wider mb-1">Coverage Map</p>
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4">Where evNation Installs</h2>

              <svg
                viewBox={`0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
                className="w-full h-auto max-h-[420px] select-none"
                aria-label="United States service area map"
              >
                <defs>
                  <linearGradient id="mapOcean" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0a0e1a" />
                    <stop offset="100%" stopColor="#04060f" />
                  </linearGradient>
                  <linearGradient id="mapLand" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#121a2e" />
                    <stop offset="100%" stopColor="#0c1220" />
                  </linearGradient>
                  <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect width={MAP_VIEW.width} height={MAP_VIEW.height} fill="url(#mapOcean)" rx="12" />

                {/* Regional glow */}
                {STATE_GLOWS.map((g) => {
                  const { x, y } = projectLatLng(g.lat, g.lng)
                  return (
                    <ellipse
                      key={g.state}
                      cx={x}
                      cy={y}
                      rx={g.rx}
                      ry={g.ry}
                      fill={STATE_META[g.state]?.color || 'rgba(0,255,136,0.08)'}
                      filter="url(#mapGlow)"
                    />
                  )
                })}

                {/* US outline */}
                <path
                  d={conusPath()}
                  fill="url(#mapLand)"
                  stroke="rgba(0, 255, 136, 0.22)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Markers */}
                {SERVICE_MAP_MARKERS.map((marker) => (
                  <MarkerPin
                    key={marker.id}
                    marker={marker}
                    active={activeId === marker.id}
                    onEnter={() => setActiveId(marker.id)}
                    onLeave={() => setActiveId(null)}
                    onClick={() => handleMarkerClick(marker)}
                  />
                ))}
              </svg>

              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-4 glass-light rounded-xl px-4 py-3 border border-neon/20"
                  >
                    <p className="font-display font-semibold text-neon text-sm">{active.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{active.landmark} · {active.state}</p>
                    {active.anchor && (
                      <button
                        type="button"
                        onClick={() => handleMarkerClick(active)}
                        className="text-xs text-slate-300 hover:text-neon mt-2 underline-offset-2 hover:underline"
                      >
                        Jump to region details ↓
                      </button>
                    )}
                    {active.countySlug && !active.anchor && (
                      <Link href={`/service-areas/${active.countySlug}`} className="text-xs text-neon mt-2 inline-block hover:underline">
                        View cities →
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Legend by state */}
          <aside className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 sm:p-6 bg-navy-900/40">
            <h3 className="font-display font-semibold text-sm mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neon" /> By State
            </h3>
            <p className="text-xs text-slate-500 mb-5">{SERVICE_MAP_MARKERS.length} service landmarks</p>

            <ul className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-hide">
              {Object.entries(byState).map(([state, markers]) => (
                <li key={state}>
                  <p className="text-[10px] uppercase tracking-wider text-neon/80 font-semibold mb-2">
                    {STATE_META[state]?.name || state}
                  </p>
                  <ul className="space-y-1.5">
                    {markers.map((m) => (
                      <li key={m.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveId(m.id)}
                          onMouseLeave={() => setActiveId(null)}
                          onClick={() => handleMarkerClick(m)}
                          className={`w-full text-left text-xs rounded-lg px-2.5 py-1.5 transition-colors ${
                            activeId === m.id
                              ? 'bg-neon/15 text-neon border border-neon/30'
                              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <span className="font-medium block">{m.label}</span>
                          <span className="text-[10px] text-slate-500">{m.landmark}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <Link href="/quote" className="btn-primary w-full justify-center !py-2.5 !text-xs mt-6">
              Get a Quote
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
