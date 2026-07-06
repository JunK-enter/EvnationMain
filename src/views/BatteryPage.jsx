'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Handshake,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { useBatteryCopy } from '@/i18n/hooks/useExtraPages'
import { POWERWALL_LOGOS } from '@/data/powerwallContent'
import { BATTERY_BRAND_LOGOS } from '@/data/homeBatteries'

function TeslaSectionLabel({ className = '', subtle = false, label = 'Tesla Powerwall' }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-2 ${
        subtle ? 'text-slate-500' : 'text-neon'
      } ${className}`}
    >
      {label}
    </p>
  )
}

function TeslaBrandLogo({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={`block h-auto max-w-full select-none ${className}`}
    />
  )
}

function BatteryBrandLogoRow() {
  return (
    <div className="mt-5 sm:mt-6 flex items-center justify-between gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0 lg:max-w-none">
      {BATTERY_BRAND_LOGOS.map((brand) => (
        <a
          key={brand.id}
          href={brand.href}
          title={brand.name}
          className="flex-1 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            draggable={false}
            className="h-7 sm:h-8 w-auto max-w-full object-contain"
          />
        </a>
      ))}
    </div>
  )
}

function TeslaHeroMeta() {
  const { hero } = useBatteryCopy()
  return (
    <div className="mb-6 sm:mb-7">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-4">
        {hero.pageTitle}
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-neon/10 border border-neon/25 text-neon text-xs font-bold uppercase tracking-wide">
          {hero.badge}
        </span>
        <span className="text-sm sm:text-base text-slate-500">
          {hero.from}{' '}
          <strong className="text-neon font-display text-lg sm:text-xl">
            {hero.price}
          </strong>
        </span>
      </div>
    </div>
  )
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="font-medium text-white text-sm sm:text-[15px] group-hover:text-neon transition-colors">
          {item.q}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180 text-neon' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-400 leading-relaxed max-w-2xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FeaturePicker() {
  const copy = useBatteryCopy()
  const sellingPoints = copy.sellingPoints.items
  const [activeId, setActiveId] = useState(sellingPoints[0]?.id)
  const active = sellingPoints.find((p) => p.id === activeId) || sellingPoints[0]
  const ActiveIcon = active?.icon

  if (!active) return null

  return (
    <div id="features" className="scroll-mt-24">
      <div className="mb-8 sm:mb-10">
        <TeslaSectionLabel label={copy.sellingPoints.sectionLabel} />
        <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white leading-tight mb-2">
          {copy.sellingPoints.title}
        </h2>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          {copy.sellingPoints.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {sellingPoints.map((p) => {
          const on = p.id === activeId
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                on
                  ? 'bg-neon/10 border-neon/25 text-white shadow-[0_0_32px_rgba(0,255,136,0.12)]'
                  : 'border-white/10 text-slate-500 hover:text-white hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              {p.title}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-navy-900/40 overflow-hidden"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
                <ActiveIcon className="w-5 h-5 text-neon" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">{active.title}</h3>
                <p className="text-sm text-slate-400">{active.summary}</p>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6">
              {active.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-neon" />
                  {b}
                </li>
              ))}
            </ul>

            {activeId === 'ev' && (
              <div className="pt-5 border-t border-white/[0.06] grid sm:grid-cols-3 gap-4">
                {copy.evFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title}>
                      <Icon className="w-4 h-4 text-neon mb-2" />
                      <p className="text-xs font-semibold text-white mb-0.5">{f.title}</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function BatteryBrandSection({ battery, index }) {
  const copy = useBatteryCopy()
  const reversed = index % 2 === 1

  return (
    <motion.article
      id={battery.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className="scroll-mt-24 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-navy-900/40 overflow-hidden"
    >
      <div className="grid lg:grid-cols-2">
        <div
          className={`relative min-h-[240px] sm:min-h-[280px] lg:min-h-[360px] ${
            battery.imageBg === 'dark' || battery.imageFit !== 'contain'
              ? 'bg-[#0a0c10]'
              : 'bg-[#eef0f3]'
          } ${reversed ? 'lg:order-2' : ''}`}
        >
          {battery.image ? (
            <>
              {battery.imageBg !== 'dark' && battery.imageFit === 'contain' ? null : (
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
              )}
              <img
                src={battery.image}
                alt={battery.productName}
                className={`absolute inset-0 w-full h-full ${
                  battery.imageFit === 'contain' ? 'object-contain p-6 sm:p-10' : 'object-cover'
                }`}
                loading="lazy"
              />
              {battery.imageFit !== 'contain' || battery.imageBg === 'dark' ? (
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-navy-950/30" />
              ) : null}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <p className="text-xs text-slate-600 uppercase tracking-widest">{copy.otherBatteries.photoSoon}</p>
            </div>
          )}
        </div>

        <div
          className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/[0.06] ${
            reversed ? 'lg:order-1 lg:border-l-0 lg:border-r' : ''
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">{battery.brand}</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            {battery.productName}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mb-6 leading-relaxed">{battery.tagline}</p>
          <ul className="space-y-2.5 mb-8">
            {battery.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                {h}
              </li>
            ))}
          </ul>
          <Link to="/quote" className="btn-secondary w-fit text-sm">
            {copy.otherBatteries.quoteBrand(battery.brand)} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

const INSTALL_STEP_ICONS = [ClipboardCheck, ShieldCheck, Wrench, Handshake]

function InstallSection() {
  const copy = useBatteryCopy()
  const { install, images } = copy
  return (
    <section id="install" className="scroll-mt-24 py-16 sm:py-24 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">{install.eyebrow}</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white leading-tight mb-2">
            {install.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            {install.subtitle}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-navy-900/40 overflow-hidden">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {images.install && (
              <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[420px]">
                <img
                  src={images.install}
                  alt="Professional Powerwall installation"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-navy-950/50" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-navy-950/75 backdrop-blur-md border border-white/10 px-3 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                    <span className="text-xs text-slate-300">{install.exampleLabel}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/[0.06]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">{install.includedEyebrow}</p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-5">{install.includedTitle}</h3>
              <ul className="space-y-3 mb-8">
                {install.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/quote" className="btn-primary w-fit text-sm">
                {install.startQuote} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="border-t border-white/[0.06] bg-white/[0.02] px-4 sm:px-6 py-5 sm:py-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600 mb-4">{install.howItWorks}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {install.steps.map((step, i) => {
                const Icon = INSTALL_STEP_ICONS[i] || ClipboardCheck
                return (
                  <div
                    key={step.step}
                    className="rounded-xl border border-white/[0.06] bg-navy-950/30 px-4 py-4"
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="w-7 h-7 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-neon" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                        {install.stepLabel(i + 1)}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-white text-sm mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OtherBatteryBrands() {
  const copy = useBatteryCopy()
  const { otherBatteries } = copy
  return (
    <div id="other-batteries" className="scroll-mt-24">
      <div className="mb-10 sm:mb-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">{otherBatteries.eyebrow}</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white leading-tight mb-2">
          {otherBatteries.title}
        </h2>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          {otherBatteries.subtitle}
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {otherBatteries.list.map((battery, index) => (
          <BatteryBrandSection key={battery.id} battery={battery} index={index} />
        ))}
      </div>
    </div>
  )
}

export default function BatteryPage() {
  const copy = useBatteryCopy()
  const [openFaq, setOpenFaq] = useState(0)
  const featureChips = copy.sellingPoints.items.map((p) => p.title)

  return (
    <div className="pt-20 lg:pt-[4.5rem]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <div className="glow-orb w-[360px] h-[360px] bg-neon/6 -top-[20%] -right-[10%] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-10 sm:pb-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TeslaHeroMeta />

              <h1 className="font-display text-[2rem] sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-white mb-2">
                {copy.hero.title}
              </h1>
              <p className="font-display text-xl sm:text-2xl text-neon mb-4">{copy.hero.tagline}</p>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                {copy.hero.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/quote" className="btn-primary">
                  {copy.hero.getQuote} <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#features" className="btn-secondary">
                  {copy.hero.seeFeatures}
                </a>
                <a href="#gm" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-white transition-colors px-1">
                  {copy.hero.otherBrands} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {featureChips.map((label) => (
                  <a
                    key={label}
                    href="#features"
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 border border-white/[0.06] bg-white/[0.02] hover:text-white hover:border-white/15 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-neon/12 to-transparent blur-2xl opacity-70" />
              <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden neon-border">
                <img
                  src={copy.images.hero}
                  alt={copy.hero.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10 px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                    <span className="text-xs text-slate-300">{copy.hero.overlay}</span>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600 mb-3">
                  {copy.hero.allBrandsLabel}
                </p>
                <BatteryBrandLogoRow />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Metrics strip — Tesla Powerwall 3 */}
        <div className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600 text-center">
              {copy.hero.specsLabel}
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
              {copy.metrics.map((m) => (
                <div key={m.label} className="py-5 sm:py-6 text-center px-3">
                  <p className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {m.value}
                    <span className="text-neon text-sm sm:text-base ml-0.5">{m.unit}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wide mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tesla Powerwall — value props ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <TeslaSectionLabel label={copy.sellingPoints.sectionLabel} />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{copy.pillars.title}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {copy.pillars.items.map(({ label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
                  <BatteryCharging className="w-[18px] h-[18px] text-neon" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">{label}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tesla Powerwall — how it works ── */}
      <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/[0.06] bg-navy-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <TeslaSectionLabel label={copy.sellingPoints.sectionLabel} />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{copy.stories.title}</h2>
            <p className="text-sm text-slate-400 mt-2">{copy.stories.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {copy.stories.items.map((block, i) => (
              <motion.article
                key={block.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-navy-900/40 overflow-hidden"
              >
                {block.image ? (
                  <div className={`aspect-[16/10] relative ${block.imageFit === 'contain' ? 'bg-black' : ''}`}>
                    <img
                      src={block.image}
                      alt={block.imageAlt}
                      className={`absolute inset-0 w-full h-full ${
                        block.imageFit === 'contain' ? 'object-contain p-6 sm:p-8' : 'object-cover'
                      }`}
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 ${block.imageFit === 'contain' ? 'bg-gradient-to-t from-navy-950/90 via-transparent to-transparent' : 'bg-gradient-to-t from-navy-950/80 to-transparent'}`} />
                    <span className="absolute top-3 left-3 font-display text-2xl font-bold text-neon/40">{block.index}</span>
                  </div>
                ) : (
                  <div className="px-5 sm:px-6 pt-5 sm:pt-6">
                    <span className="font-display text-2xl font-bold text-neon/40">{block.index}</span>
                  </div>
                )}
                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-bold text-white text-base sm:text-lg mb-2 leading-snug">{block.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{block.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tesla Powerwall — features ── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturePicker />
        </div>
      </section>

      <InstallSection />

      {/* ── Other battery brands ── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06] bg-navy-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <OtherBatteryBrands />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 text-center">{copy.faq.title}</h2>
          <p className="text-sm text-slate-500 text-center mb-8">{copy.faq.subtitle}</p>
          <div>
            {copy.faq.items.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl sm:rounded-3xl border border-neon/20 bg-gradient-to-r from-neon/8 to-transparent px-8 py-8 sm:py-10">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">{copy.cta.title}</h2>
            <p className="text-sm text-slate-400">{copy.cta.desc}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/quote" className="btn-primary text-sm">
              {copy.cta.getQuote} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {copy.cta.contact} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-8 mb-4">
          <TeslaBrandLogo src={POWERWALL_LOGOS.powerwall} alt="Tesla Powerwall" className="w-full max-w-[220px] sm:max-w-[260px]" />
        </div>
        <p className="text-[10px] text-slate-600 text-center max-w-xl mx-auto leading-relaxed">
          {copy.cta.trademark}
        </p>
      </section>
    </div>
  )
}
