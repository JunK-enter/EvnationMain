'use client'

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  HelpCircle,
  Home,
  Layers,
  LayoutGrid,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plug,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
  BatteryCharging,
  Building2,
  Briefcase,
} from 'lucide-react'
import {
  QUOTE_QUIZ_STEPS,
  SERVICE_NEEDS,
  SERVICE_ZONES,
  BREAKER_SIZES,
  getServiceNeed,
  parseFullName,
} from '@/data/quoteQuizSteps'
import { DEFAULT_ZONE_ID, getZoneLabel } from '@/data/serviceZones'
import { calculateQuizBaseEstimate, shouldSuggestPanelUpgrade } from '@/services/quoteCalculator'
import { useQuote } from '@/context/QuoteContext'
import { stats } from '@/data/localSeo'

const SERVICE_ICONS = {
  'ev-charger': Zap,
  'nema-outlet': Plug,
  'panel-upgrade': LayoutGrid,
  'ev-panel': Layers,
  'charger-swap': RefreshCw,
  'tesla-powerwall': BatteryCharging,
  multifamily: Building2,
  'commercial-project': Briefcase,
  'not-sure': HelpCircle,
}

const STEP_ICONS = {
  service: Zap,
  region: MapPin,
  info: User,
  location: Home,
  detail: ClipboardList,
}

const inputClass =
  'mobile-input w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:border-neon/40 focus:ring-2 focus:ring-neon/10 transition-all'

const slide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

function StepRail({ currentIndex, onJump }) {
  return (
    <div className="hidden sm:flex items-center justify-between gap-1 mb-8 lg:mb-10 overflow-x-auto pb-1 scrollbar-hide max-w-3xl mx-auto lg:max-w-none">
      {QUOTE_QUIZ_STEPS.map((s, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        const Icon = STEP_ICONS[s.id]
        return (
          <Fragment key={s.id}>
            {i > 0 && (
              <div
                className={`h-px flex-1 min-w-[12px] max-w-[40px] shrink transition-colors duration-500 ${
                  done ? 'bg-neon/50' : 'bg-white/10'
                }`}
              />
            )}
            <button
              type="button"
              disabled={i > currentIndex}
              onClick={() => i < currentIndex && onJump(i)}
              aria-label={`${s.shortLabel}${active ? ', current step' : done ? ', completed' : ''}`}
              aria-current={active ? 'step' : undefined}
              className={`flex flex-col items-center gap-1.5 shrink-0 transition-colors ${
                i <= currentIndex ? 'cursor-pointer' : 'cursor-default opacity-40'
              }`}
            >
              <span
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                  active
                    ? 'bg-neon text-navy-950 border-neon'
                    : done
                      ? 'bg-neon/15 text-neon border-neon/30'
                      : 'bg-white/[0.03] text-slate-500 border-white/10'
                }`}
              >
                {done ? <Check className="w-4 h-4" strokeWidth={2.5} /> : <Icon className="w-4 h-4" strokeWidth={2} />}
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${
                  active ? 'text-neon' : done ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {s.shortLabel}
              </span>
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}

function ServiceOption({ opt, selected, index, onClick }) {
  const Icon = SERVICE_ICONS[opt.id] || Zap
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      onClick={onClick}
      className={`group w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
        selected
          ? 'border-neon/50 bg-neon/[0.07] shadow-[0_0_32px_rgba(0,255,136,0.12)]'
          : 'border-white/10 bg-white/[0.02] hover:border-neon/25 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(0,255,136,0.06)]'
      }`}
    >
      <span
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          selected ? 'bg-neon/20 text-neon' : 'bg-white/[0.04] text-slate-400 group-hover:text-neon group-hover:bg-neon/10'
        }`}
      >
        <Icon className="w-5 h-5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm sm:text-[15px] ${selected ? 'text-white' : 'text-slate-200'}`}>
          {opt.title}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
      </div>
      <span
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
          selected ? 'border-neon bg-neon scale-100' : 'border-slate-600 scale-90 opacity-0 group-hover:opacity-40'
        }`}
      >
        {selected && <Check className="w-3 h-3 text-navy-950" strokeWidth={3} />}
      </span>
      {!selected && (
        <ArrowUpRight className="w-4 h-4 text-slate-600 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      )}
    </motion.button>
  )
}

function RegionOption({ title, selected, onClick, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
        compact ? 'text-sm' : ''
      } ${
        selected
          ? 'border-neon/40 bg-neon/[0.06] text-white'
          : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-neon/20 hover:text-white'
      }`}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-medium">{title}</span>
        {selected && <Check className="w-4 h-4 text-neon shrink-0" />}
      </span>
    </button>
  )
}

function FieldGroup({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-neon/70" />}
        {label}
      </label>
      {children}
    </div>
  )
}

function EstimatePanel({ quote, serviceNeed, zoneId, stepIndex, className = '' }) {
  if (!serviceNeed) return null
  const meta = getServiceNeed(serviceNeed)

  return (
    <div className={`glass rounded-2xl border border-white/10 overflow-hidden ${className}`}>
      <div className="quiz-top-line h-[2px] w-full" />
      <div className="p-5 sm:p-6">
        <p className="text-[11px] uppercase tracking-wider text-neon/80 font-semibold mb-1">Starting estimate</p>
        <p className="font-display text-3xl font-bold text-neon tabular-nums mb-1">
          {quote.display}
        </p>
        <p className="text-xs text-slate-500 mb-5">{meta.title}</p>

        {stepIndex >= 1 && (
          <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4 pb-4 border-b border-white/5">
            <MapPin className="w-3.5 h-3.5 text-neon/60" />
            {getZoneLabel(zoneId)}
          </p>
        )}

        <p className="text-xs text-slate-500 leading-relaxed">
          {quote.custom
            ? 'Multifamily and commercial projects are scoped on-site. Our team will follow up with a detailed proposal.'
            : 'Cable runs, permits, panel upgrades, and other add-ons are quoted after your licensed electrician review.'}
        </p>

        <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
          <p className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-neon/50" />
            Licensed C-10 contractor
          </p>
          <p className="flex items-center gap-2 text-[11px] text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-neon/50" />
            {stats.quoteTurnaround} quote turnaround
          </p>
        </div>
      </div>
    </div>
  )
}

function MobileEstimateStrip({ quote, serviceNeed, zoneId, stepIndex }) {
  if (!serviceNeed) return null
  const meta = getServiceNeed(serviceNeed)

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-neon/20 bg-navy-950/95 backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-neon/70 font-semibold">Starting estimate</p>
          <p className="font-display font-bold text-xl text-neon tabular-nums leading-tight">{quote.display}</p>
          <p className="text-[11px] text-slate-500 truncate">{meta.title}</p>
        </div>
        {stepIndex >= 1 && (
          <p className="text-[10px] text-slate-500 text-right shrink-0 max-w-[40%] truncate">
            {getZoneLabel(zoneId)}
          </p>
        )}
      </div>
    </div>
  )
}

export default function QuoteQuizFunnel({ onSubmit, submitting = false }) {
  const { replaceCart, setAssessment } = useQuote()
  const [stepIndex, setStepIndex] = useState(0)

  const [answers, setAnswers] = useState({
    serviceNeed: '',
    zone: DEFAULT_ZONE_ID,
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: 'CA',
    zip: '',
    mainServiceAmps: '',
    breakerSize: '',
    panelLocation: '',
    notes: '',
  })

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('evn_readiness_prefill')
      if (!raw) return
      const prefill = JSON.parse(raw)
      sessionStorage.removeItem('evn_readiness_prefill')
      setAnswers((prev) => ({
        ...prev,
        serviceNeed: prefill.serviceNeed || prev.serviceNeed,
        mainServiceAmps: prefill.mainServiceAmps || prev.mainServiceAmps,
        notes: prefill.notes ? [prefill.notes, prev.notes].filter(Boolean).join('\n') : prev.notes,
      }))
    } catch {
      /* ignore */
    }
  }, [])

  const step = QUOTE_QUIZ_STEPS[stepIndex]
  const totalSteps = QUOTE_QUIZ_STEPS.length
  const progress = ((stepIndex + 1) / totalSteps) * 100
  const serviceMeta = getServiceNeed(answers.serviceNeed || 'ev-charger')
  const StepIcon = STEP_ICONS[step?.id] || Sparkles

  const panelUpgradeBool = useMemo(() => {
    if (serviceMeta.panelUpgrade) return true
    const amps = parseInt(answers.mainServiceAmps, 10)
    if (!Number.isNaN(amps) && amps <= 125) return true
    return shouldSuggestPanelUpgrade(answers.mainServiceAmps ? `${answers.mainServiceAmps}A` : '')
  }, [serviceMeta.panelUpgrade, answers.mainServiceAmps])

  const quote = useMemo(
    () => calculateQuizBaseEstimate(answers.zone, answers.serviceNeed || 'ev-charger'),
    [answers.zone, answers.serviceNeed],
  )

  useEffect(() => {
    if (!answers.serviceNeed) return
    replaceCart(getServiceNeed(answers.serviceNeed).cartIds)
  }, [answers.serviceNeed, replaceCart])

  useEffect(() => {
    setAssessment({
      zone: answers.zone,
      city: answers.city,
      zip: answers.zip,
      panelSize: answers.mainServiceAmps ? `${answers.mainServiceAmps}A` : '',
      notes: answers.notes,
    })
  }, [answers, setAssessment])

  const setField = useCallback((field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }, [])

  const pickAndAdvance = useCallback((field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    setTimeout(() => setStepIndex((i) => Math.min(i + 1, totalSteps - 1)), 320)
  }, [totalSteps])

  const canContinue = useMemo(() => {
    if (!step) return false
    switch (step.id) {
      case 'service':
        return !!answers.serviceNeed
      case 'region':
        return !!answers.zone
      case 'info':
        return (
          answers.fullName.trim().length > 1
          && answers.phone.trim().length >= 7
          && /\S+@\S+\.\S+/.test(answers.email)
        )
      case 'location':
        return (
          answers.street.trim().length > 2
          && answers.city.trim().length > 1
          && answers.state.trim().length >= 2
          && /^\d{5}$/.test(answers.zip)
        )
      case 'detail':
        return true
      default:
        return false
    }
  }, [step, answers])

  const goNext = () => {
    if (!canContinue) return
    if (step.id === 'detail') {
      const { firstName, lastName } = parseFullName(answers.fullName)
      onSubmit?.({
        zone: answers.zone,
        serviceNeed: answers.serviceNeed,
        street: answers.street,
        city: answers.city,
        state: answers.state,
        zip: answers.zip,
        panelSize: answers.mainServiceAmps ? `${answers.mainServiceAmps}A` : '',
        breakerSize: answers.breakerSize,
        panelLocation: answers.panelLocation,
        notes: answers.notes,
        chargerType: serviceMeta.chargerType,
        panelUpgrade: panelUpgradeBool,
        permitNeeded: true,
        personal: {
          firstName,
          lastName,
          email: answers.email,
          phone: answers.phone,
        },
        estimatedTotal: quote.from,
      })
      return
    }
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1))
  }

  const showContinue = step.id !== 'service' && step.id !== 'region'

  return (
    <div className="min-h-screen pt-24 pb-28 lg:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="glow-orb hero-orb-drift w-[500px] h-[500px] bg-neon/8 top-[-10%] right-[-15%] pointer-events-none" />
      <div
        className="glow-orb hero-orb-drift w-[380px] h-[380px] bg-blue-500/6 bottom-[5%] left-[-15%] pointer-events-none"
        style={{ animationDelay: '-5s' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-light text-xs text-neon border border-neon/15 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
            </span>
            Free estimate · No obligation
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white mb-3">
            Your install,{' '}
            <span className="hero-gradient-text hero-shimmer">priced in minutes</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            {totalSteps} quick questions — then a licensed electrician confirms your final quote.
          </p>
        </motion.div>

        {/* Step rail — full width so left/right cards align */}
        <StepRail currentIndex={stepIndex} onJump={setStepIndex} />

        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
          {/* Main column */}
          <div>
            {/* Progress bar — mobile step indicator */}
            <div className="mb-6 lg:hidden">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-2">
                <span className="text-neon">{step.shortLabel}</span>
                <span>
                  Step {stepIndex + 1} / {totalSteps}
                </span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-neon rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/30">
              <div className="quiz-top-line h-[2px] w-full absolute top-0 inset-x-0 z-10" />
              <div className="absolute inset-0 quiz-card-shine pointer-events-none" />

              <div className="relative glass p-6 sm:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div key={step.id} {...slide}>
                    {/* Step header */}
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-neon/10 border border-neon/25 flex items-center justify-center shrink-0">
                        <StepIcon className="w-5 h-5 text-neon" strokeWidth={2} />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neon/70 mb-1.5">
                          Step {stepIndex + 1} of {totalSteps}
                        </p>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                          {step.title}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{step.subtitle}</p>
                      </div>
                    </div>

                    {step.id === 'service' && (
                      <div className="space-y-2.5 max-h-[min(46vh,420px)] overflow-y-auto scroll-touch pr-1 scrollbar-hide">
                        {SERVICE_NEEDS.map((opt, i) => (
                          <ServiceOption
                            key={opt.id}
                            opt={opt}
                            index={i}
                            selected={answers.serviceNeed === opt.id}
                            onClick={() => pickAndAdvance('serviceNeed', opt.id)}
                          />
                        ))}
                      </div>
                    )}

                    {step.id === 'region' && (
                      <div className="space-y-3 max-h-[min(46vh,420px)] overflow-y-auto scroll-touch pr-1 scrollbar-hide">
                        <p className="text-[11px] uppercase tracking-wider text-neon/60 font-semibold">California</p>
                        <div className="grid gap-2">
                          {SERVICE_ZONES.filter((z) => z.isCalifornia).map((z) => (
                            <RegionOption
                              key={z.id}
                              title={z.label}
                              selected={answers.zone === z.id}
                              onClick={() => pickAndAdvance('zone', z.id)}
                            />
                          ))}
                        </div>
                        <p className="text-[11px] uppercase tracking-wider text-neon/60 font-semibold pt-2">Other states</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {SERVICE_ZONES.filter((z) => !z.isCalifornia).map((z) => (
                            <RegionOption
                              key={z.id}
                              title={z.shortLabel}
                              selected={answers.zone === z.id}
                              compact
                              onClick={() => pickAndAdvance('zone', z.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {step.id === 'info' && (
                      <div className="space-y-5">
                        <FieldGroup label="Full name" icon={User}>
                          <input
                            type="text"
                            value={answers.fullName}
                            onChange={(e) => setField('fullName', e.target.value)}
                            placeholder="Jane Smith"
                            className={inputClass}
                            autoFocus
                          />
                        </FieldGroup>
                        <FieldGroup label="Phone number" icon={Phone}>
                          <input
                            type="tel"
                            value={answers.phone}
                            onChange={(e) => setField('phone', e.target.value)}
                            placeholder="(555) 123-4567"
                            className={inputClass}
                          />
                        </FieldGroup>
                        <FieldGroup label="Email" icon={Mail}>
                          <input
                            type="email"
                            value={answers.email}
                            onChange={(e) => setField('email', e.target.value)}
                            placeholder="you@email.com"
                            className={inputClass}
                          />
                        </FieldGroup>
                      </div>
                    )}

                    {step.id === 'location' && (
                      <div className="space-y-5">
                        <FieldGroup label="Street address" icon={Home}>
                          <input
                            type="text"
                            value={answers.street}
                            onChange={(e) => setField('street', e.target.value)}
                            placeholder="123 Main St"
                            className={inputClass}
                            autoFocus
                          />
                        </FieldGroup>
                        <FieldGroup label="City" icon={MapPin}>
                          <input
                            type="text"
                            value={answers.city}
                            onChange={(e) => setField('city', e.target.value)}
                            placeholder="Irvine"
                            className={inputClass}
                          />
                        </FieldGroup>
                        <div className="grid grid-cols-2 gap-4">
                          <FieldGroup label="State">
                            <input
                              type="text"
                              value={answers.state}
                              onChange={(e) => setField('state', e.target.value.toUpperCase().slice(0, 2))}
                              placeholder="CA"
                              className={inputClass}
                              maxLength={2}
                            />
                          </FieldGroup>
                          <FieldGroup label="ZIP code">
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={5}
                              value={answers.zip}
                              onChange={(e) => setField('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                              placeholder="12345"
                              className={inputClass}
                            />
                          </FieldGroup>
                        </div>
                      </div>
                    )}

                    {step.id === 'detail' && (
                      <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FieldGroup label="Main service amps" icon={Zap}>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={answers.mainServiceAmps}
                              onChange={(e) => setField('mainServiceAmps', e.target.value.replace(/\D/g, '').slice(0, 3))}
                              placeholder="e.g. 200"
                              className={inputClass}
                              autoFocus
                            />
                          </FieldGroup>
                          <FieldGroup label="Breaker size" icon={LayoutGrid}>
                            <select
                              value={answers.breakerSize}
                              onChange={(e) => setField('breakerSize', e.target.value)}
                              className={`${inputClass} cursor-pointer`}
                            >
                              <option value="">Select size…</option>
                              {BREAKER_SIZES.map((b) => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </FieldGroup>
                        </div>
                        <FieldGroup label="Panel location" icon={MapPin}>
                          <input
                            type="text"
                            value={answers.panelLocation}
                            onChange={(e) => setField('panelLocation', e.target.value)}
                            placeholder="e.g. Garage, exterior wall"
                            className={inputClass}
                          />
                        </FieldGroup>
                        <FieldGroup label="Notes" icon={ClipboardList}>
                          <textarea
                            value={answers.notes}
                            onChange={(e) => setField('notes', e.target.value)}
                            placeholder="Anything else we should know?"
                            rows={3}
                            className={`${inputClass} resize-none`}
                          />
                        </FieldGroup>

                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center gap-3 mt-10 pt-6 border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={stepIndex > 0 ? () => setStepIndex((i) => i - 1) : () => window.history.back()}
                        className="btn-secondary !py-3 !px-5 !text-sm shrink-0"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      {showContinue && (
                        <button
                          type="button"
                          onClick={goNext}
                          disabled={!canContinue || submitting}
                          className="btn-primary flex-1 justify-center !py-3 !text-sm min-h-[48px] disabled:opacity-40 disabled:pointer-events-none group"
                        >
                          {step.id === 'detail' ? (
                            submitting ? 'Submitting…' : 'Get my estimate'
                          ) : (
                            <>
                              Continue
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {step.id === 'detail' && (
              <p className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-6">
                <Lock className="w-3.5 h-3.5 text-neon/40" />
                Your information is private and only used to prepare your estimate.
              </p>
            )}
          </div>

          {/* Sidebar — desktop, top-aligned with main card */}
          <aside className="hidden lg:flex lg:flex-col sticky top-28 self-start">
            {answers.serviceNeed ? (
              <EstimatePanel
                quote={quote}
                serviceNeed={answers.serviceNeed}
                zoneId={answers.zone}
                stepIndex={stepIndex}
              />
            ) : (
              <div className="glass rounded-2xl border border-white/10 p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-neon/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-5 h-5 text-neon" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Select a project type to see your live estimate update here.
                </p>
              </div>
            )}

            {/* Mini progress desktop */}
            <div className="mt-4 px-1">
              <div className="flex justify-between text-[11px] text-slate-500 mb-2">
                <span>Progress</span>
                <span className="text-neon tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-neon/80 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <MobileEstimateStrip
        quote={quote}
        serviceNeed={answers.serviceNeed}
        zoneId={answers.zone}
        stepIndex={stepIndex}
      />
    </div>
  )
}
