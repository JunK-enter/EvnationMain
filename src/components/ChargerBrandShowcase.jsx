'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from './SectionHeader'

const THEMES = {
  standard: {
    accent: 'text-neon',
    accentBg: 'bg-neon',
    accentSoft: 'bg-neon/10',
    accentBorder: 'border-neon/30',
    glow: 'shadow-[0_0_40px_rgba(0,255,136,0.15)]',
    gradient: 'from-neon/20 via-neon/5 to-transparent',
    line: 'via-neon/60',
    ring: 'ring-neon/40',
  },
  bidirectional: {
    accent: 'text-accent-blue',
    accentBg: 'bg-accent-blue',
    accentSoft: 'bg-accent-blue/10',
    accentBorder: 'border-accent-blue/30',
    glow: 'shadow-[0_0_40px_rgba(96,165,250,0.18)]',
    gradient: 'from-accent-blue/25 via-accent-blue/5 to-transparent',
    line: 'via-accent-blue/60',
    ring: 'ring-accent-blue/40',
  },
}

function BrandTab({ charger, selected, onClick, theme, variantKey }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative shrink-0 snap-start px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-left transition-all duration-300 ${
        selected
          ? `${theme.accentSoft} ${theme.accentBorder} border ${theme.glow}`
          : 'border border-transparent text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
      }`}
    >
      <span className={`block font-display font-bold text-sm sm:text-base tracking-tight ${selected ? 'text-white' : ''}`}>
        {charger.brand}
      </span>
      {selected && (
        <motion.span
          layoutId={`brand-tab-${variantKey}`}
          className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${theme.accentBg} opacity-80`}
        />
      )}
    </button>
  )
}

export default function ChargerBrandShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  chargers,
  variant = 'standard',
}) {
  const [activeId, setActiveId] = useState(chargers[0]?.id)
  const active = chargers.find((c) => c.id === activeId) || chargers[0]
  const theme = THEMES[variant] || THEMES.standard
  const isBi = variant === 'bidirectional'

  if (!active) return null

  return (
    <section id={id} className="relative scroll-mt-28">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        subtitleClassName="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
      />

      {/* Brand selector rail */}
      <div className="rounded-2xl border border-white/[0.08] bg-navy-950/50 p-2 sm:p-2.5 mb-5">
        <div className="flex gap-1.5 overflow-x-auto scroll-touch scrollbar-hide snap-x snap-mandatory sm:snap-none sm:flex-wrap sm:justify-center">
          {chargers.map((charger) => (
            <BrandTab
              key={charger.id}
              charger={charger}
              selected={charger.id === activeId}
              onClick={() => setActiveId(charger.id)}
              theme={theme}
              variantKey={`${variant}-${charger.id}`}
            />
          ))}
        </div>
      </div>

      {/* Product panel */}
      <AnimatePresence mode="wait">
        <motion.article
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-navy-950/80"
        >
          <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent ${theme.line} to-transparent`} />

          <div className="grid lg:grid-cols-[1.05fr_1fr] min-h-[420px]">
            {/* Image stage */}
            <div className="relative flex items-center justify-center p-8 sm:p-12 lg:p-14 min-h-[280px] overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-navy-950 to-transparent" />

              {/* Spotlight */}
              <div
                className={`absolute w-[70%] aspect-square rounded-full blur-3xl opacity-30 ${
                  isBi ? 'bg-accent-blue' : 'bg-neon'
                }`}
                style={{ top: '15%', left: '15%' }}
              />

              <motion.img
                key={active.image}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                src={active.image}
                alt={active.productName}
                className="relative z-10 w-full max-w-[340px] max-h-[300px] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
                loading="lazy"
              />

              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.accentSoft} ${theme.accentBorder} ${theme.accent}`}>
                  {isBi ? 'Bi-Directional' : 'Level 2'}
                </span>
              </div>
            </div>

            {/* Copy */}
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/[0.06] bg-navy-900/30">
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-3 ${theme.accent}`}>
                {active.brand}
              </p>
              <h3 className="font-display text-2xl sm:text-[1.75rem] lg:text-3xl font-bold text-white leading-tight mb-3">
                {active.productName}
              </h3>
              <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-md">
                {active.tagline}
              </p>

              <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
                {active.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-3"
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`} />
                    <span className="text-[13px] text-slate-300 leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link to="/quote" className="btn-primary inline-flex justify-center text-sm">
                  Get a quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Talk to an expert <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

      {isBi && (
        <p className="text-center text-xs text-slate-500 mt-5 max-w-lg mx-auto leading-relaxed">
          V2H availability varies by vehicle, hardware, and utility. We confirm scope during your site visit.
        </p>
      )}
    </section>
  )
}

export function ChargerCatalogSection({ standardChargers, biChargers }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="glow-orb w-[520px] h-[520px] bg-neon/6 top-[10%] -left-[20%] pointer-events-none" />
      <div className="glow-orb w-[420px] h-[420px] bg-accent-blue/5 bottom-[5%] -right-[15%] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-24 sm:space-y-32">
        <ChargerBrandShowcase
          id="level-2-chargers"
          eyebrow="Charger lineup"
          title="Pick the brand. We handle the install."
          subtitle="We stock and install leading Level 2 chargers — matched to your panel, parking spot, and daily driving."
          chargers={standardChargers}
          variant="standard"
        />

        <div className="relative">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <ChargerBrandShowcase
            id="bi-directional-chargers"
            eyebrow="Next-gen charging"
            title="Bi-directional & vehicle-to-home"
            subtitle="Backup power from your driveway — Tesla and GM today, with more brands on the way."
            chargers={biChargers}
            variant="bidirectional"
          />
        </div>
      </div>
    </div>
  )
}
