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
} from 'lucide-react'
import { PRICING } from '@/data/services'
import {
  EVNATION_INSTALL_INCLUDES,
  POWERWALL_EV_FEATURES,
  POWERWALL_FAQ,
  POWERWALL_HERO,
  POWERWALL_IMAGES,
  POWERWALL_INSTALL_STEPS,
  POWERWALL_METRICS,
  POWERWALL_PILLARS,
  POWERWALL_SELLING_POINTS,
  POWERWALL_STORY,
} from '@/data/powerwallContent'

const FEATURE_CHIPS = POWERWALL_SELLING_POINTS.map((p) => p.title)

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
  const [activeId, setActiveId] = useState(POWERWALL_SELLING_POINTS[0].id)
  const active = POWERWALL_SELLING_POINTS.find((p) => p.id === activeId) || POWERWALL_SELLING_POINTS[0]
  const ActiveIcon = active.icon

  return (
    <div id="features" className="scroll-mt-24">
      <div className="mb-8 sm:mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">Features</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white leading-tight mb-2">
          Explore Powerwall 3
        </h2>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Whole-home backup, smarter energy use, and EV integration — in one integrated unit.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {POWERWALL_SELLING_POINTS.map((p) => {
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
                {POWERWALL_EV_FEATURES.map((f) => {
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

export default function BatteryPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="pt-20 lg:pt-[4.5rem]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <div className="glow-orb w-[360px] h-[360px] bg-neon/6 -top-[20%] -right-[10%] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-10 sm:pb-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon/10 border border-neon/25 text-neon text-[11px] font-bold uppercase tracking-wide">
                  <BatteryCharging className="w-3 h-3" /> {POWERWALL_HERO.badge}
                </span>
                <span className="text-sm text-slate-500">
                  from{' '}
                  <strong className="text-neon font-display">
                    {PRICING.teslaPowerwall.label.replace('From ', '')}
                  </strong>
                </span>
              </div>

              <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] text-white mb-2">
                {POWERWALL_HERO.tagline}
              </h1>
              <p className="font-display text-lg sm:text-xl text-slate-400 mb-4">
                {POWERWALL_HERO.title}{' '}
                <span className="text-neon">{POWERWALL_HERO.highlight}</span>
              </p>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                {POWERWALL_HERO.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/quote" className="btn-primary">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#features" className="btn-secondary">
                  See features
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {FEATURE_CHIPS.map((label) => (
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
                  src={POWERWALL_IMAGES.hero}
                  alt="Tesla Powerwall home battery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10 px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span className="text-xs text-slate-300">
                    <strong className="text-white">13.5 kWh</strong> · Whole-home backup
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
              {POWERWALL_METRICS.map((m) => (
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

      {/* ── Value props ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {POWERWALL_PILLARS.map(({ label, desc }, i) => (
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

      {/* ── How it works ── */}
      <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/[0.06] bg-navy-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">How it works</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Built for real homes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {POWERWALL_STORY.map((block, i) => (
              <motion.article
                key={block.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-navy-900/40 overflow-hidden"
              >
                <div className="aspect-[16/10] relative">
                  <img src={block.image} alt={block.imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <span className="absolute top-3 left-3 font-display text-2xl font-bold text-neon/40">{block.index}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-bold text-white text-base sm:text-lg mb-2 leading-snug">{block.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{block.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturePicker />
        </div>
      </section>

      {/* ── Install + Included ── */}
      <section id="install" className="scroll-mt-24 py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">Install with evNation</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">Quote to flip the switch</h2>
              <div className="space-y-0">
                {POWERWALL_INSTALL_STEPS.map((s, i) => (
                  <div key={s.step} className="flex gap-4 pb-6 last:pb-0 relative">
                    {i < POWERWALL_INSTALL_STEPS.length - 1 && (
                      <span className="absolute left-[15px] top-8 bottom-0 w-px bg-white/[0.08]" />
                    )}
                    <span className="w-8 h-8 rounded-full bg-neon/10 border border-neon/25 flex items-center justify-center shrink-0 font-display text-xs font-bold text-neon">
                      {i + 1}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-display font-bold text-white text-sm mb-0.5">{s.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">Turnkey</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">What&apos;s included</h2>
              <ul className="space-y-3 mb-8">
                {EVNATION_INSTALL_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] mb-6">
                <img
                  src={POWERWALL_IMAGES.install}
                  alt="Professional Powerwall installation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <Link to="/quote" className="btn-primary w-fit text-sm">
                Start your quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8 text-center">FAQ</h2>
          <div>
            {POWERWALL_FAQ.map((item, i) => (
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
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">Power your home with confidence</h2>
            <p className="text-sm text-slate-400">Free quote · Licensed C10 install · Tesla Certified Installer</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/quote" className="btn-primary text-sm">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Contact <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <p className="text-[10px] text-slate-600 text-center mt-6 max-w-xl mx-auto leading-relaxed">
          Tesla, Powerwall, and Tesla Energy are trademarks of Tesla, Inc. evNation is an independent Tesla Certified Installer.
        </p>
      </section>
    </div>
  )
}
