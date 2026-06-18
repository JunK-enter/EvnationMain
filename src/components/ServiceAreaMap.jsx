'use client'

import { memo, useMemo, useState, useRef, useCallback } from 'react'
import Link from '@/components/Link'
import { ArrowRight, MapPin } from 'lucide-react'
import {
  MAP_CLIP,
  NATION_PATH,
  SERVICED_STATE_PATHS,
  MARKER_POINTS,
} from '@/data/usMapPaths'
import {
  STATE_META,
  SERVICE_MAP_MARKERS,
  getStateFips,
} from '@/data/serviceMapMarkers'
import {
  getServiceAreaCards,
  getDirectoryCityCount,
  getTotalCityCount,
} from '@/data/serviceAreasSeo'
import { useIsMobile } from '@/lib/useMediaQuery'

const CITY_PREVIEW = 10

const MapMarker = memo(function MapMarker({ marker, point, active, dimmed, onEnter, onLeave, onClick, lite }) {
  const showLabel = active

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${marker.label}, ${marker.landmark}`}
      className={`cursor-pointer transition-opacity duration-300 ${dimmed ? 'opacity-25' : 'opacity-100'}`}
      transform={`translate(${point.x}, ${point.y})`}
      onMouseEnter={onEnter ? () => onEnter(marker.id) : undefined}
      onMouseLeave={onLeave}
      onFocus={onEnter ? () => onEnter(marker.id) : undefined}
      onBlur={onLeave}
      onClick={onClick ? () => onClick(marker) : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(marker)
        }
      }}
    >
      {active && !lite && (
        <>
          <circle r={22} fill="rgba(0,255,136,0.08)" className="animate-ping" />
          <circle r={16} fill="none" stroke="rgba(0,255,136,0.25)" strokeWidth="1" strokeDasharray="3 3" />
        </>
      )}
      {active && lite && (
        <circle r={14} fill="rgba(0,255,136,0.1)" />
      )}
      {!active && (
        <circle r={10} fill="rgba(0,255,136,0.06)" />
      )}
      {/* Pin body */}
      <path
        d="M0,-13 C-5.5,-13 -9,-9.2 -9,-4.5 C-9,1.5 0,11 0,11 C0,11 9,1.5 9,-4.5 C9,-9.2 5.5,-13 0,-13 Z"
        fill={active ? '#00ff88' : '#0a101c'}
        stroke="#00ff88"
        strokeWidth={active ? 2 : 1.5}
        style={lite ? undefined : {
          filter: active
            ? 'drop-shadow(0 0 10px rgba(0,255,136,0.85))'
            : 'drop-shadow(0 0 5px rgba(0,255,136,0.35))',
        }}
      />
      <circle cy={-5.5} r={2.5} fill={active ? '#060a14' : '#00ff88'} />

      {showLabel && (
        <g transform="translate(12, -6)">
          <rect
            x={0}
            y={-11}
            width={marker.shortLabel.length * 6.2 + 12}
            height={18}
            rx={4}
            fill="rgba(6,10,20,0.92)"
            stroke="rgba(0,255,136,0.35)"
            strokeWidth="0.8"
          />
          <text
            x={6}
            y={2}
            fill="#00ff88"
            fontSize="10"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            {marker.shortLabel}
          </text>
        </g>
      )}
    </g>
  )
})

function MapSidePanel({ markers, cards, activeId, filterState, onSelect, onStateSelect, totalCities }) {
  const active = markers.find((m) => m.id === activeId)
  const activeCard = cards.find((c) => c.id === activeId)

  return (
    <div className="flex flex-col h-full bg-[#070b15] border-t lg:border-t-0 lg:border-l border-white/[0.06]">
      {/* Stats strip */}
      <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-b border-white/[0.06]">
        {[
          { value: markers.length, label: 'Regions' },
          { value: `${totalCities}+`, label: 'Cities' },
          { value: Object.keys(STATE_META).length, label: 'States' },
        ].map((stat) => (
          <div key={stat.label} className="px-3 py-3 text-center">
            <p className="font-display font-bold text-lg text-neon leading-none">{stat.value}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Active region detail */}
      <div className="p-4 sm:p-5 border-b border-white/[0.06] min-h-[120px]">
        {active ? (
          <div key={active.id}>
            <div className="flex items-start gap-2.5 mb-2">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neon/15 border border-neon/30">
                <MapPin className="w-3.5 h-3.5 text-neon" />
              </span>
              <div>
                <p className="font-display font-semibold text-white text-sm leading-tight">{active.label}</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{active.landmark}</p>
              </div>
            </div>
            {activeCard && (
              <button
                type="button"
                onClick={() => onSelect(active)}
                className="mt-3 inline-flex items-center gap-1 text-[11px] text-neon hover:text-white transition-colors"
              >
                View {activeCard.sections.reduce((s, sec) => s + sec.cities.length, 0)} cities
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        ) : (
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Service coverage</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Hover or tap a pin to explore where evNation installs EV chargers, panel upgrades, and solar.
            </p>
          </div>
        )}
      </div>

      {/* Region list */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 px-1 mb-2">All regions</p>
        {markers.map((marker) => {
          const card = cards.find((c) => c.id === marker.id)
          const cityCount = card?.sections.reduce((s, sec) => s + sec.cities.length, 0) ?? 0
          const isActive = activeId === marker.id
          const isDimmed = filterState != null && filterState !== marker.state && !isActive

          return (
            <button
              key={marker.id}
              type="button"
              onMouseEnter={() => onSelect(marker, false)}
              onFocus={() => onSelect(marker, false)}
              onClick={() => onSelect(marker, true)}
              className={`w-full text-left rounded-xl px-3 py-2.5 border transition-all ${
                isActive
                  ? 'bg-neon/[0.08] border-neon/30'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04]'
              } ${isDimmed ? 'opacity-40' : ''}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-medium ${isActive ? 'text-neon' : 'text-slate-300'}`}>
                  {marker.label}
                </span>
                <span className="text-[10px] text-slate-500 shrink-0">{cityCount} cities</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">{marker.landmark}</p>
            </button>
          )
        })}
      </div>

      {/* State quick-filter */}
      <div className="p-3 sm:p-4 border-t border-white/[0.06]">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Filter by state</p>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(STATE_META).map(([code, meta]) => {
            const on = filterState === code
            return (
              <button
                key={code}
                type="button"
                onClick={() => onStateSelect(code)}
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium border transition-all ${
                  on
                    ? 'bg-neon/15 border-neon/40 text-neon'
                    : 'bg-white/[0.03] border-white/10 text-slate-500 hover:text-slate-300'
                }`}
              >
                {meta.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CountyCities({ section, preview = CITY_PREVIEW }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {section.cities.slice(0, preview).map((city) => (
        <span
          key={city}
          className="text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.07] rounded-md px-2 py-1"
        >
          {city}
        </span>
      ))}
      {section.cities.length > preview && (
        section.slug ? (
          <Link
            href={`/service-areas/${section.slug}`}
            className="text-[11px] text-neon/90 hover:text-neon border border-neon/20 bg-neon/[0.06] rounded-md px-2 py-1"
          >
            +{section.cities.length - preview} more
          </Link>
        ) : (
          <span className="text-[11px] text-slate-500 border border-white/[0.06] rounded-md px-2 py-1">
            +{section.cities.length - preview} more
          </span>
        )
      )}
    </div>
  )
}

function CountyBlock({ section, cityPreview }) {
  return (
    <div>
      {section.title && (
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <p className="text-sm font-semibold text-slate-200">{section.title}</p>
          {section.slug && (
            <Link
              href={`/service-areas/${section.slug}`}
              className="text-[11px] text-neon hover:text-white inline-flex items-center gap-0.5 shrink-0"
            >
              All {section.cities.length} cities <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}
      <CountyCities section={section} preview={cityPreview} />
    </div>
  )
}

function CitySection({ card, isHighlighted, className = '', wide = false }) {
  const sectionId = `map-cities-${card.id}`
  const cityCount = card.sections.reduce((s, sec) => s + sec.cities.length, 0)
  const cityPreview = wide ? 6 : card.sections.length > 2 ? 5 : CITY_PREVIEW

  return (
    <div
      id={sectionId}
      className={`glass rounded-2xl border p-5 sm:p-6 transition-colors scroll-mt-28 ${
        isHighlighted ? 'border-neon/35 bg-neon/[0.03]' : 'border-white/[0.08]'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <p className="font-display font-bold text-lg text-white">{card.name}</p>
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-white/[0.04] border border-white/[0.08] rounded-full px-2.5 py-1">
          {cityCount} cities
        </span>
      </div>

      <div className={wide ? 'grid sm:grid-cols-2 gap-x-5 gap-y-4' : 'space-y-4'}>
        {card.sections.map((section) => (
          <CountyBlock key={section.id} section={section} cityPreview={cityPreview} />
        ))}
      </div>
    </div>
  )
}

export default function ServiceAreaMap() {
  const [activeId, setActiveId] = useState(null)
  const [filterState, setFilterState] = useState(null)
  const citiesRef = useRef(null)
  const isMobile = useIsMobile()

  const cards = useMemo(() => getServiceAreaCards(), [])
  const totalListed = getDirectoryCityCount()
  const totalCountyCities = getTotalCityCount()

  const scrollToCard = useCallback((cardId) => {
    document.getElementById(`map-cities-${cardId}`)?.scrollIntoView({
      behavior: isMobile ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [isMobile])

  const handleMarkerClick = useCallback((marker, scroll = true) => {
    setActiveId(marker.id)
    setFilterState(marker.state)
    if (scroll) scrollToCard(marker.id)
  }, [scrollToCard])

  const handleMarkerEnter = useCallback((id) => {
    if (!isMobile) setActiveId(id)
  }, [isMobile])

  const handleMarkerLeave = useCallback(() => {
    if (!isMobile) setActiveId(null)
  }, [isMobile])

  const handleRegionSelect = useCallback((marker, scroll = false) => {
    setActiveId(marker.id)
    setFilterState(marker.state)
    if (scroll) scrollToCard(marker.id)
  }, [scrollToCard])

  function handleStateChip(stateCode) {
    if (filterState === stateCode) {
      setFilterState(null)
      setActiveId(null)
      return
    }
    const firstMarker = stateCode === 'CA'
      ? SERVICE_MAP_MARKERS.find((m) => m.id === 'southern-california')
      : SERVICE_MAP_MARKERS.find((m) => m.state === stateCode)
    setFilterState(stateCode)
    setActiveId(firstMarker?.id ?? null)
    if (firstMarker) scrollToCard(firstMarker.id)
  }

  function isCardHighlighted(card) {
    if (activeId === card.id) return true
    if (filterState === card.state && !activeId) return true
    return false
  }

  const caCards = cards.filter((c) => c.state === 'CA')
  const otherCards = cards.filter((c) => c.state !== 'CA')
  const southernCard = caCards.find((c) => c.id === 'southern-california')
  const centralCard = caCards.find((c) => c.id === 'central-california')
  const northernCard = caCards.find((c) => c.id === 'northern-california')

  const servicedFips = Object.values(STATE_META).map((m) => m.fips)
  const activeFips = filterState ? getStateFips(filterState) : null

  const renderCard = (card, opts = {}) => (
    <CitySection
      key={card.id}
      card={card}
      isHighlighted={isCardHighlighted(card)}
      {...opts}
    />
  )

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-8">
      {/* Map card */}
      <div className="glass rounded-3xl overflow-hidden border border-white/10">
        <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-2">
          <p className="text-neon text-xs font-semibold uppercase tracking-wider mb-1">Coverage Map</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold">Where evNation Installs</h2>
            <p className="text-xs text-slate-500">
              {SERVICE_MAP_MARKERS.length} regions · {totalCountyCities}+ cities in our directory
            </p>
          </div>
        </div>

        {/* Interactive map + side panel */}
        <div className="relative mx-4 sm:mx-6 mb-4 sm:mb-6 rounded-2xl overflow-hidden border border-white/[0.06] bg-[#060a14] grid lg:grid-cols-[1.2fr_0.8fr]">
          {/* Map */}
          <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
            <div className="absolute inset-0 grid-bg opacity-[0.12] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(0,255,136,0.07),transparent_60%)] pointer-events-none" />

            <svg
              viewBox={`${MAP_CLIP.x} ${MAP_CLIP.y} ${MAP_CLIP.width} ${MAP_CLIP.height}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="United States service coverage map"
            >
              <defs>
                <clipPath id="usClip">
                  <path d={NATION_PATH} />
                </clipPath>
                <linearGradient id="landFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#161f33" />
                  <stop offset="100%" stopColor="#0d1320" />
                </linearGradient>
                <radialGradient id="mapVignette" cx="45%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(0,255,136,0.04)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>

              <rect
                x={MAP_CLIP.x}
                y={MAP_CLIP.y}
                width={MAP_CLIP.width}
                height={MAP_CLIP.height}
                fill="#060a14"
              />
              <rect
                x={MAP_CLIP.x}
                y={MAP_CLIP.y}
                width={MAP_CLIP.width}
                height={MAP_CLIP.height}
                fill="url(#mapVignette)"
              />

              {!isMobile && (
                <g clipPath="url(#usClip)" opacity="0.28">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const x = MAP_CLIP.x + (MAP_CLIP.width / 10) * (i + 1)
                    return (
                      <line
                        key={`v${i}`}
                        x1={x}
                        y1={MAP_CLIP.y}
                        x2={x}
                        y2={MAP_CLIP.y + MAP_CLIP.height}
                        stroke="rgba(255,255,255,0.04)"
                      />
                    )
                  })}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const y = MAP_CLIP.y + (MAP_CLIP.height / 6) * (i + 1)
                    return (
                      <line
                        key={`h${i}`}
                        x1={MAP_CLIP.x}
                        y1={y}
                        x2={MAP_CLIP.x + MAP_CLIP.width}
                        y2={y}
                        stroke="rgba(255,255,255,0.04)"
                      />
                    )
                  })}
                </g>
              )}

              <path
                d={NATION_PATH}
                fill="url(#landFill)"
                stroke="rgba(0,255,136,0.2)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {servicedFips.map((fips) => {
                const path = SERVICED_STATE_PATHS[fips]
                if (!path) return null
                const isActive = activeFips === fips
                const isDimmed = activeFips != null && !isActive
                return (
                  <path
                    key={fips}
                    d={path}
                    fill={isActive ? 'rgba(0,255,136,0.18)' : 'rgba(0,255,136,0.06)'}
                    stroke={isActive ? 'rgba(0,255,136,0.4)' : 'rgba(0,255,136,0.14)'}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    className="transition-all duration-500"
                    style={{ opacity: isDimmed ? 0.4 : 1 }}
                  />
                )
              })}

              {SERVICE_MAP_MARKERS.map((marker) => {
                const point = MARKER_POINTS[marker.id]
                if (!point) return null
                return (
                  <MapMarker
                    key={marker.id}
                    marker={marker}
                    point={point}
                    active={activeId === marker.id}
                    dimmed={filterState != null && filterState !== marker.state}
                    lite={isMobile}
                    onEnter={isMobile ? undefined : handleMarkerEnter}
                    onLeave={isMobile ? undefined : handleMarkerLeave}
                    onClick={handleMarkerClick}
                  />
                )
              })}
            </svg>
          </div>

          <MapSidePanel
            markers={SERVICE_MAP_MARKERS}
            cards={cards}
            activeId={activeId}
            filterState={filterState}
            totalCities={totalCountyCities}
            onSelect={handleRegionSelect}
            onStateSelect={handleStateChip}
          />
        </div>

        {/* Mobile state filter */}
        <div className="px-5 sm:px-8 pb-6 lg:hidden">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-3">Select a state</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(STATE_META).map(([code, meta]) => {
              const on = filterState === code
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleStateChip(code)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                    on
                      ? 'bg-neon/15 border-neon/40 text-neon'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {meta.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* City directory below map */}
      <div ref={citiesRef}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-neon text-xs font-semibold uppercase tracking-wider mb-1">Service Areas</p>
            <h3 className="font-display text-xl sm:text-2xl font-bold">Cities &amp; counties we serve</h3>
            <p className="text-sm text-slate-500 mt-1">
              {totalListed}+ communities across {cards.length} regions — tap a pin or state above to jump here.
            </p>
          </div>
          <Link href="/quote" className="btn-primary !py-2.5 !text-sm shrink-0">
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* California — Southern Cal wide, Central + Northern stacked on the right */}
          <div className="md:col-span-2 lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {southernCard && renderCard(southernCard, {
              wide: true,
              className: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
            })}
            {centralCard && renderCard(centralCard, { className: 'lg:col-start-3' })}
            {northernCard && renderCard(northernCard, { className: 'lg:col-start-3' })}
          </div>

          {otherCards.map((card) => renderCard(card))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don&apos;t see your city?{' '}
          <Link href="/contact" className="text-neon hover:underline">Contact us</Link>
          {' '}— we may still serve your area.
        </p>
      </div>
    </section>
  )
}
