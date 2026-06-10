'use client'

import { useState, useEffect } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Play, Zap, MapPin, LayoutGrid, BatteryCharging, Sun, Droplets, Wind,
  ShieldCheck, Star,
} from 'lucide-react'
import HeroVisual from './HeroVisual'
import { stats, serviceArea } from '@/data/localSeo'

const ROTATING_LINES = [
  'Charge faster.',
  'Store smarter.',
  'Power through outages.',
  'Save on every mile.',
]

const HERO_SERVICES = [
  { label: 'EV Charger', icon: Zap, href: '/residential-ev-charging' },
  { label: 'Panel Upgrade', icon: LayoutGrid, href: '/panel-upgrades' },
  { label: 'Home Batteries', icon: BatteryCharging, href: '/battery' },
  { label: 'Solar', icon: Sun, href: '/solar' },
  { label: 'Water Heaters', icon: Droplets, href: '/quote' },
  { label: 'Dryers & Ovens', icon: Wind, href: '/quote' },
]

const TRUST_STATS = [
  { value: stats.installations, label: 'Homes electrified', icon: Zap },
  { value: stats.rating, label: 'Customer rating', icon: Star },
  { value: stats.quoteTurnaround, label: 'Quote turnaround', icon: ShieldCheck },
]

function RotatingHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_LINES.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative flex w-full min-h-[1.35em] overflow-hidden justify-center lg:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_LINES[index]}
          initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -24, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hero-gradient-text hero-shimmer font-display font-bold"
        >
          {ROTATING_LINES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative lg:min-h-screen flex items-center overflow-hidden pt-[4.25rem] lg:pt-16">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="glow-orb hero-orb-drift w-[560px] h-[560px] bg-neon/10 top-[-15%] right-[-8%]" />
      <div className="glow-orb hero-orb-drift w-[420px] h-[420px] bg-blue-500/8 bottom-[5%] left-[-12%]" style={{ animationDelay: '-4s' }} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6 sm:mb-7 w-full"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-light text-xs sm:text-sm text-neon border border-neon/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
                </span>
                Licensed C-10 Electrical Contractor
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-slate-400 bg-white/[0.03] border border-white/8">
                <MapPin className="w-3.5 h-3.5 text-neon/70" />
                {serviceArea.regionShort}
              </span>
            </motion.div>

            <h1 className="font-display font-bold tracking-tight mb-4 sm:mb-5 w-full text-balance">
              <span className="block text-[2rem] leading-[1.06] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] text-white">
                Electrify your Home
              </span>
              <span className="block text-[2rem] leading-[1.06] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] mt-1 lg:mt-1.5">
                with{' '}
                <span className="hero-gradient-text hero-shimmer whitespace-nowrap">Confidence</span>
              </span>
            </h1>

            <div className="hero-line-draw h-px w-full max-w-[4.5rem] sm:max-w-[6rem] bg-gradient-to-r from-neon via-neon/40 to-transparent mb-5 sm:mb-6" />

            <p className="text-lg sm:text-xl lg:text-2xl leading-snug font-medium text-slate-200 mb-2 w-full min-h-[1.35em]">
              <RotatingHeadline />
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-7 sm:mb-8 w-full">
              One certified team for Level 2 charging, panel upgrades, Powerwall, and solar — installed cleanly across {serviceArea.regionShort}.
            </p>

            <div className="relative mb-7 sm:mb-8 w-full">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {HERO_SERVICES.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:border-neon/40 hover:bg-neon/[0.07] hover:text-white hover:shadow-[0_0_24px_rgba(0,255,136,0.12)] transition-all duration-300"
                      >
                        <span className="w-6 h-6 rounded-md bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                          <Icon className="w-3.5 h-3.5 text-neon shrink-0" />
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <Link href="/quote" className="btn-primary w-full sm:w-auto justify-center !py-3.5 !px-8 !text-base shadow-[0_0_40px_rgba(0,255,136,0.2)]">
                Build Your Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/quote#assessment" className="btn-secondary w-full sm:w-auto justify-center !py-3.5 !px-8">
                <Play className="w-4 h-4 fill-current opacity-80" />
                Home Assessment
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
              {TRUST_STATS.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.08 }}
                    className="glass rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-3 sm:py-4 text-center lg:text-left border border-white/[0.06] hover:border-neon/20 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-neon mx-auto lg:mx-0 mb-1.5 opacity-80 hidden sm:block" />
                    <p className="font-display font-bold text-sm sm:text-lg text-white leading-none">{item.value}</p>
                    <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1 leading-tight">{item.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-neon/15 via-transparent to-blue-500/10 blur-2xl opacity-70 pointer-events-none" />
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
