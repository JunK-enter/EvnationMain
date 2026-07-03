'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck,
  Home,
  Shield,
  Zap,
} from 'lucide-react'
import { BIDIRECTIONAL_HOME_CHARGERS } from '../data/homeChargers'

const METRICS = [
  { value: 'V2H', label: 'Vehicle-to-home' },
  { value: 'Tesla', label: '& GM today' },
  { value: 'C10', label: 'Licensed install' },
  { value: '24hr', label: 'Quote turnaround' },
]

const BRANDS = BIDIRECTIONAL_HOME_CHARGERS.map((c) => c.brand)

const INCLUDED = [
  { icon: ArrowLeftRight, text: 'Bi-directional charger hardware evaluation & install' },
  { icon: Home, text: 'Vehicle-to-home backup when vehicle & utility allow' },
  { icon: Shield, text: 'Panel load study & code-compliant wiring' },
  { icon: FileCheck, text: 'Utility interconnection & permit coordination' },
  { icon: Zap, text: 'Integration with Powerwall on supported Tesla setups' },
  { icon: Clock, text: 'Commissioning, testing & homeowner walkthrough' },
]

const STEPS = [
  { n: '1', title: 'Quote', desc: 'Share your vehicle, panel, and backup goals.' },
  { n: '2', title: 'Eligibility check', desc: 'We confirm V2H hardware, vehicle model & utility rules.' },
  { n: '3', title: 'Install', desc: 'Licensed electricians mount, wire & test bi-directional hardware.' },
  { n: '4', title: 'Handoff', desc: 'App setup, backup modes explained — ready when the grid goes down.' },
]

const FAQ = [
  {
    q: 'What is bi-directional (V2H) charging?',
    a: 'Bi-directional charging lets a compatible EV send power back to your home during outages or peak rate windows — when your vehicle, charger, and utility program support it.',
  },
  {
    q: 'Which brands do you install today?',
    a: 'We install Tesla Wall Connector setups integrated with Powerwall, and GM Ultium V2H-ready hardware. More brands are added as they become available in our service areas.',
  },
  {
    q: 'Do I need Powerwall for V2H?',
    a: 'Not always. Requirements vary by brand and vehicle. Tesla V2H often pairs with Powerwall; GM Ultium has its own hardware path. We confirm scope on site.',
  },
  {
    q: 'Will my utility allow vehicle-to-home?',
    a: 'Utility rules vary. We check interconnection requirements during the site evaluation and handle paperwork where required.',
  },
]

const THEME = {
  accent: 'text-accent-blue',
  accentSoft: 'bg-accent-blue/10',
  accentBorder: 'border-accent-blue/25',
  glow: 'shadow-[0_0_32px_rgba(96,165,250,0.14)]',
  gradient: 'from-accent-blue/20 via-accent-blue/5 to-transparent',
  line: 'via-accent-blue/50',
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="font-medium text-white text-sm sm:text-[15px] group-hover:text-accent-blue transition-colors">
          {item.q}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180 text-accent-blue' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
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

function ChargerPicker() {
  const [activeId, setActiveId] = useState(BIDIRECTIONAL_HOME_CHARGERS[0]?.id)
  const active = BIDIRECTIONAL_HOME_CHARGERS.find((c) => c.id === activeId) || BIDIRECTIONAL_HOME_CHARGERS[0]

  if (!active) return null

  return (
    <div id="chargers" className="scroll-mt-24">
      <div className="mb-8 sm:mb-10">
        <p className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-2 ${THEME.accent}`}>Hardware</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white leading-tight mb-2">
          Bi-directional chargers we install
        </h2>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Tesla and GM today — matched to your vehicle, panel, and backup goals.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {BIDIRECTIONAL_HOME_CHARGERS.map((c) => {
          const on = c.id === activeId
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                on
                  ? `${THEME.accentSoft} ${THEME.accentBorder} text-white ${THEME.glow}`
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
          <div className={`h-px bg-gradient-to-r from-transparent ${THEME.line} to-transparent`} />
          <div className="grid md:grid-cols-2">
            <div className="relative flex items-center justify-center p-6 sm:p-10 min-h-[220px] md:min-h-[320px] bg-[#0a0c10]">
              <div className={`absolute inset-0 bg-gradient-to-br ${THEME.gradient}`} />
              <img
                src={active.image}
                alt={active.productName}
                className="relative max-h-[180px] sm:max-h-[220px] md:max-h-[280px] w-full object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/[0.06]">
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${THEME.accent}`}>
                {active.brand}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{active.productName}</h3>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">{active.tagline}</p>
              <ul className="space-y-2 mb-6">
                {active.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[13px] text-slate-300">
                    <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${THEME.accent}`} />
                    {h}
                  </li>
                ))}
              </ul>
              <Link to="/quote" className="btn-primary w-fit text-sm">
                Quote this setup <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-slate-500 mt-3 leading-relaxed">
        V2H depends on vehicle, hardware & utility — confirmed at site visit.
      </p>
    </div>
  )
}

export default function BiDirectionalChargingPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="pt-20 lg:pt-[4.5rem]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <div className="glow-orb w-[360px] h-[360px] bg-accent-blue/8 -top-[20%] -right-[10%] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-10 sm:pb-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/25 text-accent-blue text-[11px] font-bold uppercase tracking-wide">
                  <ArrowLeftRight className="w-3 h-3" /> V2H ready
                </span>
                <Link to="/residential-ev-charging" className="text-sm text-slate-500 hover:text-white transition-colors">
                  Level 2 charging →
                </Link>
              </div>

              <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] text-white mb-4">
                Bi-Directional{' '}
                <span className="text-accent-blue">Charging</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                Power your home from your driveway. Licensed C10 electricians install vehicle-to-home
                hardware for supported Tesla and GM setups.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/quote" className="btn-primary">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#chargers" className="btn-secondary">
                  See hardware
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-blue/15 to-transparent blur-2xl opacity-70" />
              <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-accent-blue/20">
                <img
                  src="/images/chargers/tesla-wall-connector.png"
                  alt="Bi-directional EV charger"
                  className="w-full h-full object-contain bg-[#0a0c10] p-8"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10 px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                  <span className="text-xs text-slate-300">
                    <strong className="text-white">V2H</strong> · Backup from your EV
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
              {METRICS.map((m) => (
                <div key={m.label} className="py-5 sm:py-6 text-center px-3">
                  <p className="font-display text-xl sm:text-2xl font-bold text-accent-blue tabular-nums">{m.value}</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wide mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Home, title: 'Home backup', desc: 'Keep essentials running when the grid goes down.' },
              { icon: ArrowLeftRight, title: 'Two-way power', desc: 'Charge from the grid — discharge to your home when supported.' },
              { icon: Shield, title: 'Licensed & permitted', desc: 'C10 electricians, load calcs, and utility coordination.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] text-accent-blue" />
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

      <section className="py-16 sm:py-20 border-t border-white/[0.06] bg-navy-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChargerPicker />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-2 ${THEME.accent}`}>Turnkey</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">What&apos;s included</h2>
              <ul className="space-y-3">
                {INCLUDED.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                    <Icon className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-2 ${THEME.accent}`}>Process</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">Quote to backup-ready</h2>
              <div className="space-y-0">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex gap-4 pb-6 last:pb-0 relative">
                    {i < STEPS.length - 1 && (
                      <span className="absolute left-[15px] top-8 bottom-0 w-px bg-white/[0.08]" />
                    )}
                    <span className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/25 flex items-center justify-center shrink-0 font-display text-xs font-bold text-accent-blue">
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

      <section className="pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl sm:rounded-3xl border border-accent-blue/20 bg-gradient-to-r from-accent-blue/10 to-transparent px-8 py-8 sm:py-10">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">Ready for vehicle-to-home?</h2>
            <p className="text-sm text-slate-400">Free estimate — we confirm V2H eligibility on site.</p>
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
