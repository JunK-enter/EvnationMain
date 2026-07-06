'use client'

import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useIsMobile } from '@/lib/useMediaQuery'
import { useTranslation } from '@/i18n/LocaleProvider'

function MotionBox({ isMobile, as: Tag = motion.div, className, children, ...props }) {
  if (isMobile) {
    return <div className={className}>{children}</div>
  }
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  )
}

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
  imageAspect = 'aspect-[4/3]',
  imageClassName = 'object-cover',
  imageOverlay = true,
  primaryCta = { to: '/quote', label: 'Get a Quote' },
  secondaryCta,
  stats = [],
  featuresTitle,
  features = [],
  middleContent,
  children,
}) {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const resolvedFeaturesTitle = featuresTitle ?? t('serviceLayout.featuresTitle')
  const resolvedPrimaryLabel = primaryCta?.label ?? t('common.getQuote')
  const resolvedSecondaryLabel = secondaryCta?.label

  return (
    <div className="page-top page-bottom lg:pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {!isMobile && <div className="glow-orb w-[480px] h-[480px] bg-neon/8 top-[-15%] right-[-8%]" />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
            <MotionBox
              isMobile={isMobile}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {(badge || eyebrow) && (
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-[11px] sm:text-sm mb-4 sm:mb-5">
                  {badge}
                  {!badge && eyebrow}
                </div>
              )}
              <h1 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] mb-4 sm:mb-5">
                {title} {highlight && <span className="neon-text">{highlight}</span>}
              </h1>
              <p className="text-sm sm:text-lg text-slate-400 leading-relaxed mb-4 sm:mb-6 max-w-xl">{description}</p>
              {tagline && (
                <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-neon mb-6 sm:mb-8">{tagline}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to={primaryCta.to} className="btn-primary justify-center">
                  {resolvedPrimaryLabel} <ArrowRight className="w-4 h-4" />
                </Link>
                {secondaryCta && (
                  <Link to={secondaryCta.to} className="btn-secondary justify-center">{resolvedSecondaryLabel}</Link>
                )}
              </div>
            </MotionBox>

            <MotionBox
              isMobile={isMobile}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              {!isMobile && (
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-neon/15 via-transparent to-blue-500/5 blur-2xl opacity-60" />
              )}
              <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden neon-border ${imageAspect}`}>
                <img src={image} alt={imageAlt || title} className={`w-full h-full ${imageClassName}`} />
                {imageOverlay && (
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                )}
              </div>
            </MotionBox>
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-8 sm:mt-14">
              {stats.map((s) => (
                <div key={s.label} className="glass-light rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                  <p className="font-display text-xl sm:text-3xl font-bold text-neon">{s.value}</p>
                  <p className="text-[10px] sm:text-sm text-slate-400 mt-0.5 sm:mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {middleContent}

      {/* Features */}
      {features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-4">
          <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12">
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-5 sm:mb-8">{resolvedFeaturesTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-5">
              {features.map((f) => {
                const text = typeof f === 'string' ? f : f.text
                return (
                  <div key={text} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neon/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon" />
                    </span>
                    <span className="text-xs sm:text-base text-slate-300">{text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {children}

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{t('serviceLayout.readyTitle')}</h2>
        <p className="text-sm sm:text-base text-slate-400 mb-5 sm:mb-6">{t('serviceLayout.readyDesc')}</p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
          <Link to="/quote" className="btn-primary">{t('common.getQuote')} <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/contact" className="btn-secondary">{t('serviceLayout.talkExpert')}</Link>
        </div>
      </section>
    </div>
  )
}
