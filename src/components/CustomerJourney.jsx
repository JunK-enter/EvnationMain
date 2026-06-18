'use client'

import { useMemo } from 'react'
import { Home, Camera, FileText, CalendarCheck, ArrowRight } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import { useTranslation } from '@/i18n/LocaleProvider'
import Reveal from '@/lib/Reveal'

function MobileStepCard({ step, index, className = '' }) {
  return (
    <Reveal delay={index * 0.08} y={16} className={`glass rounded-2xl p-5 sm:p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="shrink-0 flex flex-col items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-neon text-navy-950 text-sm font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/15 flex items-center justify-center">
            <step.icon className="w-6 h-6 text-neon" />
          </div>
        </div>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-display font-semibold text-base sm:text-lg mb-2 leading-snug">{step.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </Reveal>
  )
}

function DesktopStepCard({ step, index, isLast }) {
  return (
    <Reveal as="li" delay={index * 0.1} y={20} className="relative flex flex-col">
      {!isLast && (
        <ArrowRight
          className="absolute -right-3 top-[calc(50%-0.75rem)] w-5 h-5 text-neon/35 z-10 hidden xl:block"
          aria-hidden
        />
      )}

      <div className="glass rounded-2xl p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-9 h-9 rounded-full bg-neon text-navy-950 text-sm font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <div className="w-11 h-11 rounded-xl bg-neon/10 border border-neon/15 flex items-center justify-center shrink-0">
            <step.icon className="w-5 h-5 text-neon" />
          </div>
        </div>
        <h3 className="font-display font-semibold text-lg mb-2 leading-snug">{step.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed flex-1">{step.desc}</p>
      </div>
    </Reveal>
  )
}

export default function CustomerJourney() {
  const { t } = useTranslation()

  const steps = useMemo(
    () => [
      { icon: Home, title: t('home.journey.step1Title'), desc: t('home.journey.step1Desc') },
      { icon: Camera, title: t('home.journey.step2Title'), desc: t('home.journey.step2Desc') },
      { icon: FileText, title: t('home.journey.step3Title'), desc: t('home.journey.step3Desc') },
      { icon: CalendarCheck, title: t('home.journey.step4Title'), desc: t('home.journey.step4Desc') },
    ],
    [t]
  )

  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <div className="section-glow section-glow-blue" aria-hidden />
      <SectionAmbient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          className="text-center mb-8 lg:mb-12"
          titleClassName="font-display text-2xl sm:text-3xl lg:text-4xl font-bold"
          subtitleClassName="text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          eyebrow={t('home.journey.eyebrow')}
          title={t('home.journey.title')}
          subtitle={t('home.journey.subtitle')}
        />

        {/* Mobile & tablet: swipe cards */}
        <div className="lg:hidden -mx-4 sm:-mx-6">
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-touch scrollbar-hide px-4 sm:px-6 pb-1"
            style={{ scrollPaddingInline: '1rem' }}
          >
            {steps.map((step, i) => (
              <MobileStepCard
                key={step.title}
                step={step}
                index={i}
                className="snap-center shrink-0 w-[min(88vw,340px)] sm:w-[360px]"
              />
            ))}
          </div>
          <p className="text-center text-[11px] text-slate-600 mt-3 px-4">{t('home.journey.swipeHint')}</p>
        </div>

        {/* Desktop: connected step cards */}
        <ol className="hidden lg:grid lg:grid-cols-4 gap-5 xl:gap-6 list-none m-0 p-0">
          {steps.map((step, i) => (
            <DesktopStepCard
              key={step.title}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
