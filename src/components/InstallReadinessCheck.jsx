'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Home, Gauge, Car, HelpCircle } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import { DEFAULT_ZONE_ID } from '@/data/serviceZones'
import { calculateQuizBaseEstimate, shouldSuggestPanelUpgrade } from '@/services/quoteCalculator'
import { useTranslation } from '@/i18n/LocaleProvider'
import { useIsMobile } from '@/lib/useMediaQuery'

const READINESS_KEY = 'evn_readiness_prefill'

function pickServiceNeed(panelId) {
  if (panelId === '100' || panelId === '125') return 'ev-panel'
  if (panelId === 'unknown') return 'ev-charger'
  return 'ev-charger'
}

export function saveReadinessPrefill(answers) {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem(READINESS_KEY, JSON.stringify(answers))
}

export default function InstallReadinessCheck() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ parking: '', panel: '', ev: '' })
  const [done, setDone] = useState(false)

  const STEPS = useMemo(
    () => [
      {
        id: 'parking',
        title: t('home.readiness.step1Title'),
        options: [
          { id: 'garage', label: t('home.readiness.optGarage'), icon: Home },
          { id: 'driveway', label: t('home.readiness.optDriveway'), icon: Car },
          { id: 'outdoor', label: t('home.readiness.optOutdoor'), icon: Car },
        ],
      },
      {
        id: 'panel',
        title: t('home.readiness.step2Title'),
        options: [
          { id: '100', label: t('home.readiness.opt100') },
          { id: '125', label: t('home.readiness.opt125') },
          { id: '150', label: t('home.readiness.opt150') },
          { id: '200', label: t('home.readiness.opt200') },
          { id: 'unknown', label: t('home.readiness.optUnknown'), icon: HelpCircle },
        ],
      },
      {
        id: 'ev',
        title: t('home.readiness.step3Title'),
        options: [
          { id: 'have', label: t('home.readiness.optHaveEv') },
          { id: 'ordered', label: t('home.readiness.optOrdered') },
          { id: 'shopping', label: t('home.readiness.optShopping') },
        ],
      },
    ],
    [t]
  )

  const current = STEPS[step]
  const progress = done ? 100 : ((step + 1) / STEPS.length) * 100

  const result = useMemo(() => {
    if (!done) return null
    const serviceNeed = pickServiceNeed(answers.panel)
    const panelAmps = answers.panel === 'unknown' ? '' : `${answers.panel}A`
    const needsPanel = shouldSuggestPanelUpgrade(panelAmps) || serviceNeed === 'ev-panel'
    const estimate = calculateQuizBaseEstimate(DEFAULT_ZONE_ID, serviceNeed)
    const distance = answers.parking === 'garage' ? 15 : answers.parking === 'driveway' ? 28 : 35

    return {
      serviceNeed,
      panelAmps,
      needsPanel,
      estimate,
      distance,
      notes: [
        answers.parking === 'outdoor' && t('home.readiness.noteOutdoor'),
        needsPanel && t('home.readiness.notePanel'),
        answers.ev === 'ordered' && t('home.readiness.noteOrdered'),
      ].filter(Boolean),
    }
  }, [done, answers, t])

  function select(optionId) {
    const key = current.id
    const next = { ...answers, [key]: optionId }
    setAnswers(next)
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
      saveReadinessPrefill({
        serviceNeed: pickServiceNeed(next.panel),
        mainServiceAmps: next.panel === 'unknown' ? '' : next.panel,
        panelSize: next.panel === 'unknown' ? '' : `${next.panel}A`,
        notes: `Readiness check: ${next.parking} parking, ${next.ev} EV status`,
      })
    }
  }

  function reset() {
    setStep(0)
    setAnswers({ parking: '', panel: '', ev: '' })
    setDone(false)
  }

  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <SectionAmbient />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow={t('home.readiness.eyebrow')}
          title={t('home.readiness.title')}
          subtitle={t('home.readiness.subtitle')}
          className="text-center mb-8 sm:mb-10"
        />

        <div className="glass rounded-3xl border border-white/[0.08] overflow-hidden">
          <div className="h-1 bg-white/[0.06]">
            <div className="h-full bg-neon transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="p-6 sm:p-8">
            {isMobile ? (
              !done ? (
                <div key={step}>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                    {t('home.readiness.stepOf', { current: step + 1, total: STEPS.length })}
                  </p>
                  <h3 className="font-display font-semibold text-xl text-white mb-5">{current.title}</h3>
                  <div className="grid gap-2 sm:gap-3">
                    {current.options.map((opt) => {
                      const Icon = opt.icon
                      const selected = answers[current.id] === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => select(opt.id)}
                          className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border transition-colors ${
                            selected
                              ? 'border-neon/40 bg-neon/[0.08] text-white'
                              : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-neon/25 hover:bg-neon/[0.04]'
                          }`}
                        >
                          {Icon && <Icon className="w-4 h-4 text-neon shrink-0" />}
                          <span className="text-sm font-medium">{opt.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div key="result" className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold mb-4">
                    <Check className="w-3.5 h-3.5" /> {t('home.readiness.estimateReady')}
                  </div>
                  <p className="text-sm text-slate-400 mb-1">{t('home.readiness.typicalFrom')}</p>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                    {result.estimate.display}
                  </p>
                  <p className="text-xs text-slate-500 mb-5">
                    {t('home.readiness.resultMeta', {
                      region: t('home.readiness.defaultRegion'),
                      distance: result.distance,
                      lineItem: result.estimate.lineItem,
                      panelNote: result.needsPanel ? t('home.readiness.panelLikely') : '',
                    })}
                  </p>

                  {result.notes.length > 0 && (
                    <ul className="text-sm text-slate-400 space-y-2 mb-6 text-left">
                      {result.notes.map((note) => (
                        <li key={note} className="flex gap-2">
                          <Gauge className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <Link href="/quote" className="btn-primary justify-center">
                      {t('common.buildFullQuote')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button type="button" onClick={reset} className="btn-secondary justify-center">
                      {t('common.startOver')}
                    </button>
                  </div>
                </div>
              )
            ) : (
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                    {t('home.readiness.stepOf', { current: step + 1, total: STEPS.length })}
                  </p>
                  <h3 className="font-display font-semibold text-xl text-white mb-5">{current.title}</h3>
                  <div className="grid gap-2 sm:gap-3">
                    {current.options.map((opt) => {
                      const Icon = opt.icon
                      const selected = answers[current.id] === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => select(opt.id)}
                          className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border transition-all ${
                            selected
                              ? 'border-neon/40 bg-neon/[0.08] text-white'
                              : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-neon/25 hover:bg-neon/[0.04]'
                          }`}
                        >
                          {Icon && <Icon className="w-4 h-4 text-neon shrink-0" />}
                          <span className="text-sm font-medium">{opt.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center sm:text-left"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold mb-4">
                    <Check className="w-3.5 h-3.5" /> {t('home.readiness.estimateReady')}
                  </div>
                  <p className="text-sm text-slate-400 mb-1">{t('home.readiness.typicalFrom')}</p>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                    {result.estimate.display}
                  </p>
                  <p className="text-xs text-slate-500 mb-5">
                    {t('home.readiness.resultMeta', {
                      region: t('home.readiness.defaultRegion'),
                      distance: result.distance,
                      lineItem: result.estimate.lineItem,
                      panelNote: result.needsPanel ? t('home.readiness.panelLikely') : '',
                    })}
                  </p>

                  {result.notes.length > 0 && (
                    <ul className="text-sm text-slate-400 space-y-2 mb-6 text-left">
                      {result.notes.map((note) => (
                        <li key={note} className="flex gap-2">
                          <Gauge className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <Link href="/quote" className="btn-primary justify-center">
                      {t('common.buildFullQuote')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button type="button" onClick={reset} className="btn-secondary justify-center">
                      {t('common.startOver')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
