'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Zap, MapPin, LayoutGrid, BatteryCharging, Sun, Droplets, Wind,
  ShieldCheck, Star,
} from 'lucide-react'
import HeroVisual from './HeroVisual'
import { stats, serviceArea } from '@/data/localSeo'
import { useTranslation } from '@/i18n/LocaleProvider'
import { useIsMobile, usePrefersReducedMotion } from '@/lib/useMediaQuery'

function RotatingHeadline({ lines, isMobile, reducedMotion }) {
  const [index, setIndex] = useState(0)
  const staticHeadline = isMobile || reducedMotion

  useEffect(() => {
    setIndex(0)
  }, [lines])

  useEffect(() => {
    if (staticHeadline || lines.length <= 1) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % lines.length), 3200)
    return () => clearInterval(id)
  }, [lines.length, staticHeadline])

  if (staticHeadline) {
    return (
      <span className="hero-gradient-text font-display font-bold">
        {lines[0]}
      </span>
    )
  }

  return (
    <span className="relative flex w-full min-h-[1.35em] overflow-hidden justify-center lg:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={lines[index]}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hero-gradient-text hero-shimmer font-display font-bold"
        >
          {lines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function FadeBox({ isMobile, className, delay = 0, children, ...motionProps }) {
  if (isMobile) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div className={className} transition={{ delay, ...motionProps.transition }} {...motionProps}>
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  const rotatingLines = useMemo(
    () => [t('hero.rotate1'), t('hero.rotate2'), t('hero.rotate3'), t('hero.rotate4')],
    [t]
  )

  const heroServices = useMemo(
    () => [
      { label: t('hero.evCharger'), icon: Zap, href: '/residential-ev-charging' },
      { label: t('hero.panelUpgrade'), icon: LayoutGrid, href: '/panel-upgrades' },
      { label: t('hero.homeBatteries'), icon: BatteryCharging, href: '/battery' },
      { label: t('nav.solar'), icon: Sun, href: '/solar' },
      { label: t('hero.waterHeaters'), icon: Droplets, href: '/quote', hideMobile: true },
      { label: t('hero.dryersOvens'), icon: Wind, href: '/quote', hideMobile: true },
    ],
    [t]
  )

  const trustStats = useMemo(
    () => [
      { value: stats.installations, label: t('hero.homesElectrified'), icon: Zap },
      { value: stats.rating, label: t('hero.customerRating'), icon: Star },
      { value: stats.quoteTurnaround, label: t('hero.quoteTurnaround'), icon: ShieldCheck },
    ],
    [t]
  )

  const titleLine2 = t('hero.titleLine2')
  const titleAccent = t('hero.titleAccent')

  return (
    <section className="relative lg:min-h-screen flex items-center overflow-hidden pt-[max(4.25rem,env(safe-area-inset-top))] lg:pt-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 xl:gap-16 lg:items-center">
          <FadeBox
            isMobile={isMobile}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left order-1"
          >
            <FadeBox
              isMobile={isMobile}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              delay={0.1}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5 sm:mb-7 w-full"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light text-xs text-neon border border-neon/15">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="lg:animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
                </span>
                {t('hero.licensed')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-slate-400 bg-white/[0.03] border border-white/8">
                <MapPin className="w-3.5 h-3.5 text-neon/70 shrink-0" />
                {serviceArea.regionShort}
              </span>
            </FadeBox>

            <h1 className="font-display font-bold tracking-tight mb-4 sm:mb-5 w-full text-balance">
              <span className="block text-[1.75rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] text-white">
                {t('hero.titleLine1')}
              </span>
              {(titleLine2 || titleAccent) && (
                <span className="block text-[1.75rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] mt-1 lg:mt-1.5">
                  {titleLine2 ? `${titleLine2} ` : null}
                  {titleAccent ? (
                    <span className="hero-gradient-text hero-shimmer whitespace-nowrap">{titleAccent}</span>
                  ) : null}
                </span>
              )}
            </h1>

            <div className="hero-line-draw h-px w-full max-w-[4.5rem] sm:max-w-[6rem] bg-gradient-to-r from-neon via-neon/40 to-transparent mb-4 sm:mb-6 mx-auto lg:mx-0" />

            <p className="text-base sm:text-xl lg:text-2xl leading-snug font-medium text-slate-200 mb-2 w-full min-h-[1.35em]">
              <RotatingHeadline lines={rotatingLines} isMobile={isMobile} reducedMotion={reducedMotion} />
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6 sm:mb-8 w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
              {t('hero.subtitle', { region: serviceArea.regionShort })}
            </p>

            <div className="flex w-full sm:w-auto mb-6 sm:mb-8">
              <Link
                href="/quote"
                className="btn-primary w-full sm:w-auto justify-center !py-3.5 !px-8 !text-base min-h-[48px] max-lg:!shadow-none lg:shadow-[0_0_40px_rgba(0,255,136,0.2)]"
              >
                {t('hero.buildQuote')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mb-6 sm:mb-8">
              {trustStats.map((item, i) => {
                const Icon = item.icon
                return (
                  <FadeBox
                    key={item.label}
                    isMobile={isMobile}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    delay={0.35 + i * 0.08}
                    className="glass rounded-xl px-2 py-2.5 sm:px-4 sm:py-4 text-center lg:text-left border border-white/[0.06]"
                  >
                    <Icon className="w-3.5 h-3.5 text-neon mx-auto lg:mx-0 mb-1 opacity-80 hidden sm:block" />
                    <p className="font-display font-bold text-sm sm:text-lg text-white leading-none">{item.value}</p>
                    <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1 leading-tight">{item.label}</p>
                  </FadeBox>
                )
              })}
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full justify-center lg:justify-start">
              {heroServices.map((item, i) => {
                const Icon = item.icon
                return (
                  <FadeBox
                    key={item.label}
                    isMobile={isMobile}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    delay={0.2 + i * 0.04}
                    className={item.hideMobile ? 'hidden sm:block' : ''}
                  >
                    <Link
                      href={item.href}
                      className="group flex sm:inline-flex items-center gap-2 w-full sm:w-auto px-3 py-2.5 sm:px-3.5 rounded-xl sm:rounded-full text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:border-neon/40 hover:bg-neon/[0.07] hover:text-white active:scale-[0.98] transition-colors duration-200"
                    >
                      <span className="w-7 h-7 sm:w-6 sm:h-6 rounded-lg sm:rounded-md bg-neon/10 flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors">
                        <Icon className="w-3.5 h-3.5 text-neon shrink-0" />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </FadeBox>
                )
              })}
            </div>
          </FadeBox>

          <FadeBox
            isMobile={isMobile}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md mx-auto lg:max-w-none order-2 hidden sm:block"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-neon/15 via-transparent to-blue-500/10 blur-2xl opacity-60 pointer-events-none max-lg:hidden" />
            <HeroVisual />
          </FadeBox>
        </div>
      </div>
    </section>
  )
}
