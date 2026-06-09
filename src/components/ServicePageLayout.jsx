'use client'

import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

/**
 * Shared, image-forward layout for the core service pages
 * (Home Charging, Commercial Charging, Battery, Warranty).
 */
export default function ServicePageLayout({
  eyebrow,
  badge,
  title,
  highlight,
  description,
  tagline,
  image,
  imageAlt,
  primaryCta = { to: '/quote', label: 'Get a Quote' },
  secondaryCta,
  stats = [],
  featuresTitle = "What's Included",
  features = [],
  children,
}) {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="glow-orb w-[480px] h-[480px] bg-neon/8 top-[-15%] right-[-8%]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {(badge || eyebrow) && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs sm:text-sm mb-5">
                  {badge}
                  {!badge && eyebrow}
                </div>
              )}
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-5">
                {title} {highlight && <span className="neon-text">{highlight}</span>}
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-6 max-w-xl">{description}</p>
              {tagline && <p className="font-display text-2xl sm:text-3xl font-bold text-neon mb-8">{tagline}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={primaryCta.to} className="btn-primary justify-center">
                  {primaryCta.label} <ArrowRight className="w-4 h-4" />
                </Link>
                {secondaryCta && (
                  <Link to={secondaryCta.to} className="btn-secondary justify-center">{secondaryCta.label}</Link>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-neon/15 via-transparent to-blue-500/5 blur-2xl opacity-60" />
              <div className="relative rounded-3xl overflow-hidden neon-border aspect-[4/3]">
                <img src={image} alt={imageAlt || title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
              {stats.map((s) => (
                <div key={s.label} className="glass-light rounded-2xl p-6 text-center">
                  <p className="font-display text-3xl font-bold text-neon">{s.value}</p>
                  <p className="text-sm text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="glass rounded-3xl p-8 lg:p-12">
            <h2 className="font-display text-2xl font-bold mb-8">{featuresTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {features.map((f) => {
                const text = typeof f === 'string' ? f : f.text
                return (
                  <div key={text} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-neon/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-neon" />
                    </span>
                    <span className="text-slate-300">{text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {children}

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h2 className="font-display text-3xl font-bold mb-3">Ready to get started?</h2>
        <p className="text-slate-400 mb-6">Get a free, transparent estimate from our licensed team.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/quote" className="btn-primary">Get a Quote <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/contact" className="btn-secondary">Talk to an Expert</Link>
        </div>
      </section>
    </div>
  )
}
