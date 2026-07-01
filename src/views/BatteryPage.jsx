'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BatteryCharging, Check, ChevronRight } from 'lucide-react'
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

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'story', label: 'How it works' },
  { id: 'features', label: 'Features' },
  { id: 'install', label: 'Install' },
  { id: 'faq', label: 'FAQ' },
]

const SECTION_SCROLL_MT = 'scroll-mt-[7.75rem] lg:scroll-mt-[8.25rem]'

function getNavScrollOffset() {
  const subnav = document.querySelector('[data-powerwall-subnav]')
  const subnavH = subnav?.getBoundingClientRect().height ?? 52
  const mainNavH = window.matchMedia('(min-width: 1024px)').matches ? 72 : 64
  return mainNavH + subnavH + 8
}

export default function BatteryPage() {
  const [activeFeature, setActiveFeature] = useState(POWERWALL_SELLING_POINTS[0].id)
  const [activeSection, setActiveSection] = useState(NAV[0].id)
  const scrollingToRef = useRef(false)
  const scrollEndTimerRef = useRef(null)

  const active = POWERWALL_SELLING_POINTS.find((p) => p.id === activeFeature) || POWERWALL_SELLING_POINTS[0]
  const ActiveIcon = active.icon

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return

    scrollingToRef.current = true
    setActiveSection(id)

    const top = el.getBoundingClientRect().top + window.scrollY - getNavScrollOffset()
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    window.history.replaceState(null, '', `#${id}`)

    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = setTimeout(() => {
      scrollingToRef.current = false
    }, 900)
  }, [])

  useEffect(() => {
    const sectionEls = NAV.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!sectionEls.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingToRef.current) return

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const id = visible[0]?.target?.id
        if (id) setActiveSection(id)
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      },
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash || !NAV.some((n) => n.id === hash)) return undefined

    const t = window.setTimeout(() => scrollToSection(hash), 120)
    return () => window.clearTimeout(t)
  }, [scrollToSection])

  useEffect(
    () => () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    },
    [],
  )

  return (
    <div className="pt-24 pb-0">
      {/* Cinematic hero */}
      <section className="relative min-h-[78svh] flex items-end overflow-hidden">
        <img
          src={POWERWALL_IMAGES.hero}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/15 border border-neon/30 text-neon text-xs font-semibold mb-6 backdrop-blur-sm">
              <BatteryCharging className="w-3.5 h-3.5" />
              {POWERWALL_HERO.badge}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
              {POWERWALL_HERO.tagline}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-lg">
              {POWERWALL_HERO.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link to="/quote" className="btn-primary">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-sm text-slate-400">
                From{' '}
                <strong className="text-neon font-display text-lg">
                  {PRICING.teslaPowerwall.label.replace('From ', '')}
                </strong>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Floating metrics */}
        <div className="hidden lg:flex absolute bottom-12 right-8 xl:right-[max(2rem,calc((100vw-80rem)/2+2rem))] flex-col gap-2">
          {POWERWALL_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="glass px-4 py-2.5 rounded-xl border border-white/10 min-w-[140px] text-right"
            >
              <p className="font-display text-xl font-bold tabular-nums">
                {m.value}
                <span className="text-sm text-neon ml-0.5">{m.unit}</span>
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sticky subnav */}
      <nav
        data-powerwall-subnav
        className="sticky top-16 lg:top-[4.5rem] z-20 border-y border-white/[0.06] bg-navy-950/95 backdrop-blur-xl"
        aria-label="Powerwall page sections"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-x-auto scroll-touch scrollbar-hide snap-x snap-mandatory sm:snap-none">
            {NAV.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`snap-start shrink-0 sm:shrink sm:flex-1 min-w-[max(7.5rem,28%)] sm:min-w-0 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap text-center ${
                    isActive
                      ? 'bg-neon/15 text-neon border border-neon/30 shadow-[0_0_20px_rgba(0,255,136,0.08)]'
                      : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Overview — pillars */}
      <section id="overview" className={`py-16 sm:py-20 border-b border-white/[0.06] ${SECTION_SCROLL_MT}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/80 font-semibold mb-3">Overview</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                {POWERWALL_HERO.title}
                <span className="block text-slate-500 text-2xl sm:text-3xl mt-1 font-semibold">
                  {POWERWALL_HERO.highlight}
                </span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              {POWERWALL_PILLARS.map((pillar, i) => (
                <div key={pillar.label} className="relative pl-5 border-l-2 border-neon/40">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-navy-950 border-2 border-neon" />
                  <p className="font-display font-bold text-white mb-1">{pillar.label}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                  {i < POWERWALL_PILLARS.length - 1 && (
                    <span className="hidden sm:block absolute top-8 -left-[1px] w-0.5 h-[calc(100%+1.5rem)] bg-neon/15" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile metrics scroll */}
          <div className="lg:hidden flex gap-3 mt-10 overflow-x-auto scroll-touch pb-2 scrollbar-hide">
            {POWERWALL_METRICS.map((m) => (
              <div key={m.label} className="shrink-0 glass rounded-xl px-5 py-3 border border-white/10">
                <p className="font-display text-2xl font-bold tabular-nums">
                  {m.value}
                  <span className="text-sm text-neon">{m.unit}</span>
                </p>
                <p className="text-[10px] uppercase text-slate-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial story sections */}
      <section id="story" className={`border-b border-white/[0.06] ${SECTION_SCROLL_MT}`}>
        {POWERWALL_STORY.map((block, i) => (
          <article
            key={block.id}
            className={`grid lg:grid-cols-2 min-h-[420px] ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
          >
            <div className="relative min-h-[280px] lg:min-h-full lg:[direction:ltr]">
              <img src={block.image} alt={block.imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-navy-950/20 lg:bg-transparent" />
            </div>
            <div className="flex items-center px-6 sm:px-10 lg:px-16 py-14 lg:py-20 bg-navy-900/40 lg:[direction:ltr]">
              <div className="max-w-md">
                <span className="font-display text-6xl sm:text-7xl font-bold text-neon/15 leading-none block mb-4">
                  {block.index}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                  {block.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{block.body}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Interactive feature explorer */}
      <section id="features" className={`py-16 sm:py-24 section-scrim-alt relative overflow-hidden ${SECTION_SCROLL_MT}`}>
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/80 font-semibold mb-3">Features</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Explore the details</h2>
              <ul className="space-y-1">
                {POWERWALL_SELLING_POINTS.map((point) => (
                  <li key={point.id}>
                    <button
                      type="button"
                      onClick={() => setActiveFeature(point.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between gap-2 ${
                        activeFeature === point.id
                          ? 'bg-neon/10 text-neon border border-neon/25'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {point.title}
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeFeature === point.id ? 'rotate-90' : ''}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-navy-900/60 p-8 sm:p-10"
              >
                <div className="w-12 h-12 rounded-2xl bg-neon/10 flex items-center justify-center mb-6">
                  <ActiveIcon className="w-6 h-6 text-neon" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{active.title}</h3>
                <p className="text-slate-400 mb-8">{active.summary}</p>
                <ul className="space-y-4">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-slate-300">
                      <span className="w-6 h-6 rounded-full bg-neon/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-neon" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {activeFeature === 'ev' && (
                  <div className="mt-10 pt-8 border-t border-white/[0.06] grid sm:grid-cols-3 gap-4">
                    {POWERWALL_EV_FEATURES.map((f) => {
                      const Icon = f.icon
                      return (
                        <div key={f.title} className="text-center sm:text-left">
                          <Icon className="w-4 h-4 text-neon mx-auto sm:mx-0 mb-2" />
                          <p className="text-xs font-semibold text-white mb-1">{f.title}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Install timeline */}
      <section id="install" className={`py-16 sm:py-24 border-t border-white/[0.06] ${SECTION_SCROLL_MT}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/80 font-semibold mb-3">Install with evNation</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">From first call to flip the switch</h2>
              <p className="text-slate-400 leading-relaxed mb-10">
                Licensed C-10 electricians handle everything — no handymen, no guesswork.
              </p>

              <div className="space-y-0">
                {POWERWALL_INSTALL_STEPS.map((item, i) => (
                  <div key={item.step} className="flex gap-5 pb-8 last:pb-0 relative">
                    {i < POWERWALL_INSTALL_STEPS.length - 1 && (
                      <span className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-neon/40 to-transparent" aria-hidden />
                    )}
                    <span className="w-8 h-8 rounded-full bg-neon text-navy-950 font-display font-bold text-xs flex items-center justify-center shrink-0 z-10">
                      {item.step}
                    </span>
                    <div className="pt-0.5">
                      <p className="font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10">
                <img
                  src={POWERWALL_IMAGES.install}
                  alt="Professional Powerwall installation"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                {EVNATION_INSTALL_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                    <Check className="w-3.5 h-3.5 text-neon shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/quote" className="btn-primary w-fit inline-flex mt-2">
                Start your quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-16 sm:py-20 bg-navy-900/30 border-t border-white/[0.06] ${SECTION_SCROLL_MT}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">Questions & answers</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {POWERWALL_FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-white/[0.06] bg-navy-950/50 open:border-neon/20 transition-colors"
              >
                <summary className="cursor-pointer list-none p-5 text-sm font-medium text-white flex justify-between gap-3">
                  {item.q}
                  <ChevronRight className="w-4 h-4 text-neon/60 shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <img src={POWERWALL_IMAGES.hero} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-navy-950/85" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Power your home with confidence</h2>
          <p className="text-slate-400 mb-8">Free quote · Licensed install · Tesla Certified Installer</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote" className="btn-primary justify-center">
              Get a Powerwall Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary justify-center">
              Talk to an Expert
            </Link>
          </div>
          <p className="text-[10px] text-slate-600 mt-10 leading-relaxed">
            Tesla, Powerwall, and Tesla Energy are trademarks of Tesla, Inc. evNation is an independent Tesla Certified Installer.
          </p>
        </div>
      </section>
    </div>
  )
}
