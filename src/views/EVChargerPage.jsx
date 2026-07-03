'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck,
  Gauge,
  Shield,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'
import { PRICING } from '../data/services'
import { STANDARD_HOME_CHARGERS } from '../data/homeChargers'

const METRICS = [
  { value: '40 mi/hr', label: 'Charge speed' },
  { value: '3–6 hrs', label: 'Install time' },
  { value: '2,000+', label: 'Homes served' },
  { value: 'C10', label: 'Licensed' },
]

const BRANDS = STANDARD_HOME_CHARGERS.map((c) => c.brand)

const INCLUDED = [
  { icon: Zap, text: 'Hardwired or plug-in Level 2 installation' },
  { icon: Gauge, text: 'Up to 40 miles of range per hour' },
  { icon: Wrench, text: 'Clean conduit routing & cable management' },
  { icon: Shield, text: 'Dedicated 240V circuit & breaker sizing' },
  { icon: FileCheck, text: 'Panel evaluation & load calculation' },
  { icon: Clock, text: 'Permits, inspection & code compliance' },
]

const STEPS = [
  { n: '1', title: 'Quote', desc: 'Share your panel, parking spot & charger preference.' },
  { n: '2', title: 'Site visit', desc: 'We confirm routing, load & hardware fit.' },
  { n: '3', title: 'Install', desc: 'C10 electricians wire, mount & test.' },
  { n: '4', title: 'Handoff', desc: 'Permits closed — plug in and go.' },
]

const FAQ = [
  {
    q: 'How long does install take?',
    a: 'Most Level 2 installs finish in one day. Complex panel or conduit work may take two — we quote upfront.',
  },
  {
    q: 'Do I need a panel upgrade?',
    a: 'Not always. We evaluate load on-site. If capacity exists, we add a dedicated circuit. If not, we quote an upgrade.',
  },
  {
    q: 'Can you install my own charger?',
    a: 'Yes — when hardware is UL-listed and compatible. We also supply and install leading brands.',
  },
]

const THEMES = {
  standard: {
    accent: 'text-neon',
    accentSoft: 'bg-neon/10',
    accentBorder: 'border-neon/25',
    glow: 'shadow-[0_0_32px_rgba(0,255,136,0.12)]',
    gradient: 'from-neon/15 via-neon/5 to-transparent',
    line: 'via-neon/50',
  },
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

function ChargerPicker({ eyebrow, title, subtitle, chargers }) {
  const [activeId, setActiveId] = useState(chargers[0]?.id)
  const active = chargers.find((c) => c.id === activeId) || chargers[0]
  const theme = THEMES.standard

  if (!active) return null

  return (
    <div id="chargers" className="scroll-mt-24">
      <div className="mb-8 sm:mb-10">
        <p className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-2 ${theme.accent}`}>{eyebrow}</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white leading-tight mb-2">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-slate-400 max-w-xl leading-relaxed">{subtitle}</p>}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {chargers.map((c) => {
          const on = c.id === activeId
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                on
                  ? `${theme.accentSoft} ${theme.accentBorder} text-white ${theme.glow}`
                  : 'border-white/10 text-slate-500 hover:text-white hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              {c.brand}
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
          <div className={`h-px bg-gradient-to-r from-transparent ${theme.line} to-transparent`} />
          <div className="grid md:grid-cols-2">
            <div className="relative flex items-center justify-center p-6 sm:p-10 min-h-[220px] md:min-h-[320px] bg-[#0a0c10]">
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
              <img
                src={active.image}
                alt={active.productName}
                className="relative max-h-[180px] sm:max-h-[220px] md:max-h-[280px] w-full object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/[0.06]">
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme.accent}`}>
                {active.brand}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{active.productName}</h3>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">{active.tagline}</p>
              <ul className="space-y-2 mb-6">
                {active.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[13px] text-slate-300">
                    <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${theme.accent}`} />
                    {h}
                  </li>
                ))}
              </ul>
              <Link to="/quote" className="btn-primary w-fit text-sm">
                Quote this charger <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function EVChargerPage() {
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
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon/10 border border-neon/25 text-neon text-[11px] font-bold uppercase tracking-wide">
                  <Zap className="w-3 h-3" /> Most popular
                </span>
                <span className="text-sm text-slate-500">
                  from{' '}
                  <strong className="text-neon font-display">{PRICING.l2Charger.label.replace('From ', '')}</strong>
                </span>
              </div>

              <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] text-white mb-4">
                Home EV{' '}
                <span className="hero-gradient-text">Charging</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                Licensed C10 electricians install Level 2 chargers that add 25–40 miles of range per hour —
                in your garage or driveway.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/quote" className="btn-primary">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#chargers" className="btn-secondary">
                  See chargers
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {BRANDS.map((b) => (
                  <a
                    key={b}
                    href="#chargers"
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 border border-white/[0.06] bg-white/[0.02] hover:text-white hover:border-white/15 transition-colors"
                  >
                    {b}
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
                  src="/images/solutions/residential-ev-charger.jpg"
                  alt="Home EV charger installation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10 px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span className="text-xs text-slate-300">
                    <strong className="text-white">Level 2</strong> · 240V · 25–40 mi/hr
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
              {METRICS.map((m) => (
                <div key={m.label} className="py-5 sm:py-6 text-center px-3">
                  <p className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">{m.value}</p>
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
            {[
              { icon: Gauge, title: 'Level 2 speed', desc: 'Full charge overnight — no public station waits.' },
              { icon: Shield, title: 'Code-compliant', desc: 'Permits, inspection & dedicated circuit included.' },
              { icon: Sparkles, title: 'Clean install', desc: 'Conduit routing that looks as good as it performs.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] text-neon" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chargers ── */}
      <section id="chargers" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/[0.06] bg-navy-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChargerPicker
            eyebrow="Level 2"
            title="Chargers we install"
            subtitle="Tesla, Emporia, ChargePoint, Mercedes-Benz, Wallbox & SolarEdge — matched to your panel and parking setup."
            chargers={STANDARD_HOME_CHARGERS}
          />
        </div>
      </section>

      {/* ── Included + Process ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">Turnkey</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">What&apos;s included</h2>
              <ul className="space-y-3">
                {INCLUDED.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                    <Icon className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">Process</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">Quote to plug-in</h2>
              <div className="space-y-0">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex gap-4 pb-6 last:pb-0 relative">
                    {i < STEPS.length - 1 && (
                      <span className="absolute left-[15px] top-8 bottom-0 w-px bg-white/[0.08]" />
                    )}
                    <span className="w-8 h-8 rounded-full bg-neon/10 border border-neon/25 flex items-center justify-center shrink-0 font-display text-xs font-bold text-neon">
                      {s.n}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-display font-bold text-white text-sm mb-0.5">{s.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8 text-center">FAQ</h2>
          <div>
            {FAQ.map((item, i) => (
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
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">Ready to charge at home?</h2>
            <p className="text-sm text-slate-400">Free estimate — usually within one business day.</p>
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
      </section>
    </div>
  )
}
