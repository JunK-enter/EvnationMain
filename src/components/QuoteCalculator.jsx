import { useState, useMemo, useEffect } from 'react'
import Link from '@/components/Link'
import { chargerTypes, complexityLevels, panelSizes } from '../data/services'
import { DEFAULT_ZONE_ID, getZoneLabel } from '../data/serviceZones'
import { formatRetailRange } from '../data/zonePriceDetail'
import {
  calculateQuote,
  QUOTE_EXTRAS,
  shouldSuggestPanelUpgrade,
} from '../services/quoteCalculator'
import { useQuote } from '../context/QuoteContext'
import ZoneSelect from './ZoneSelect'
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  MapPin,
  Sparkles,
  Wrench,
} from 'lucide-react'

const COMPLEXITY_HINTS = {
  simple: 'Straight run, no trenching or drywall',
  moderate: 'Some trenching or routing around obstacles',
  complex: 'Long trench, concrete work, or difficult access',
}

const inputClass =
  'w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white [color-scheme:dark]'

const selectClass = `${inputClass} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`

function StepHeader({ step, title, subtitle, icon: Icon }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
        <span className="text-neon text-xs font-bold">{step}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-neon shrink-0" />}
          <h4 className="font-display font-semibold text-sm">{title}</h4>
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

export default function QuoteCalculator({
  compact = false,
  zone: controlledZone,
  onZoneChange,
}) {
  const { assessment } = useQuote()
  const [internalZone, setInternalZone] = useState(assessment.zone || DEFAULT_ZONE_ID)
  const [chargerType, setChargerType] = useState('hardwired')
  const [distance, setDistance] = useState(25)
  const [panelSize, setPanelSize] = useState('')
  const [panelUpgrade, setPanelUpgrade] = useState(false)
  const [permitNeeded, setPermitNeeded] = useState(true)
  const [complexity, setComplexity] = useState('simple')
  const [extras, setExtras] = useState({})
  const [showExtras, setShowExtras] = useState(false)
  const [panelHintDismissed, setPanelHintDismissed] = useState(false)

  useEffect(() => {
    if (assessment.zone) {
      if (onZoneChange) onZoneChange(assessment.zone)
      else setInternalZone(assessment.zone)
    }
  }, [assessment.zone, onZoneChange])

  const zone = controlledZone ?? internalZone
  const setZone = onZoneChange ?? setInternalZone

  useEffect(() => {
    if (distance > 50 && complexity === 'simple') setComplexity('moderate')
  }, [distance, complexity])

  useEffect(() => {
    if (shouldSuggestPanelUpgrade(panelSize) && !panelHintDismissed) {
      setPanelUpgrade(true)
    }
  }, [panelSize, panelHintDismissed])

  const quote = useMemo(
    () =>
      calculateQuote({
        zoneId: zone,
        chargerType,
        distance,
        panelUpgrade,
        permitNeeded,
        complexity,
        extras,
      }),
    [zone, chargerType, distance, panelUpgrade, permitNeeded, complexity, extras]
  )

  const toggleExtra = (id) => {
    setExtras((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const suggestPanel = shouldSuggestPanelUpgrade(panelSize) && !panelHintDismissed

  return (
    <div className={`glass rounded-2xl ${compact ? 'p-5' : 'p-6 lg:p-8'}`}>
      <div className={`flex items-center gap-3 ${compact ? 'mb-5' : 'mb-8'}`}>
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-neon" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Instant Quote Estimate</h3>
          <p className="text-xs text-slate-500">
            {compact ? 'Adjust inputs — price updates live' : 'Answer a few questions — see your price update live'}
          </p>
        </div>
      </div>

      <div className={compact ? 'space-y-5' : 'xl:grid xl:grid-cols-[1fr_minmax(280px,340px)] xl:items-start xl:gap-8'}>
        <div className={compact ? 'space-y-5' : 'space-y-8'}>
        {/* Step 1 — Location */}
        <section>
          {!compact && (
            <StepHeader
              step="1"
              icon={MapPin}
              title="Where is your home?"
              subtitle="Pricing varies by service area"
            />
          )}
          {compact && (
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Service area</label>
          )}
          <ZoneSelect
            variant="menu"
            value={zone}
            onChange={setZone}
            className={inputClass}
            placeholder="Select your area"
          />
          {zone && !compact && (
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neon" />
              Showing retail rates for {getZoneLabel(zone)}
            </p>
          )}
        </section>

        {/* Step 2 — Installation details */}
        <section>
          {!compact && (
            <StepHeader
              step="2"
              icon={Wrench}
              title="About your installation"
              subtitle="How far is the charger from your electrical panel?"
            />
          )}

          <div className={compact ? 'grid sm:grid-cols-2 gap-3' : 'space-y-5'}>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Charger type
              </label>
              <select
                value={chargerType}
                onChange={(e) => setChargerType(e.target.value)}
                className={selectClass}
              >
                {chargerTypes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-400">
                  Distance from panel to charger
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={5}
                    max={150}
                    value={distance}
                    onChange={(e) =>
                      setDistance(Math.min(150, Math.max(5, Number(e.target.value) || 5)))
                    }
                    className="w-16 bg-navy-800 border border-white/10 rounded-lg px-2 py-1 text-sm text-neon text-center"
                  />
                  <span className="text-xs text-slate-500">ft</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={Math.min(distance, 100)}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-neon"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                <span>5 ft (same wall)</span>
                <span>50 ft</span>
                <span>100 ft</span>
              </div>
            </div>

            {!compact && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  How complex is the install?
                </label>
                <div className="grid gap-2">
                  {complexityLevels.map((c) => (
                    <label
                      key={c.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        complexity === c.id
                          ? 'border-neon/40 bg-neon/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="complexity"
                        value={c.id}
                        checked={complexity === c.id}
                        onChange={() => setComplexity(c.id)}
                        className="mt-0.5 accent-neon"
                      />
                      <div>
                        <span className="text-sm text-white font-medium">{c.label}</span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {COMPLEXITY_HINTS[c.id]}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {compact && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Complexity
                </label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className={selectClass}
                >
                  {complexityLevels.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!compact && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Current electrical panel size
                  <span className="text-slate-600 font-normal"> (optional)</span>
                </label>
                <select
                  value={panelSize}
                  onChange={(e) => setPanelSize(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Not sure / skip</option>
                  {panelSizes.filter((s) => s !== 'Unknown').map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {suggestPanel && (
                  <div className="mt-2 flex items-start gap-2 text-xs bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-200/90">
                        A {panelSize} panel often needs an upgrade for Level 2 charging — we&apos;ve
                        included it in your estimate.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPanelUpgrade(false)
                          setPanelHintDismissed(true)
                        }}
                        className="text-amber-400/70 hover:text-amber-300 mt-1 underline"
                      >
                        My panel is fine — remove upgrade
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Step 3 — Options */}
        <section>
          {!compact && (
            <StepHeader
              step="3"
              title="Add-ons & permits"
              subtitle="Toggle what applies to your project"
            />
          )}

          <div className={`space-y-2 ${compact ? 'grid sm:grid-cols-2 gap-2 space-y-0' : ''}`}>
            <label
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                panelUpgrade ? 'border-neon/40 bg-neon/5' : 'border-white/10'
              }`}
            >
              <input
                type="checkbox"
                checked={panelUpgrade}
                onChange={(e) => {
                  setPanelUpgrade(e.target.checked)
                  if (!e.target.checked) setPanelHintDismissed(true)
                }}
                className="w-4 h-4 accent-neon rounded"
              />
              <div>
                <span className="text-sm text-slate-200">Electrical panel upgrade</span>
                <p className="text-xs text-slate-500">Upgrade to 200A service if needed</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                permitNeeded ? 'border-neon/40 bg-neon/5' : 'border-white/10'
              }`}
            >
              <input
                type="checkbox"
                checked={permitNeeded}
                onChange={(e) => setPermitNeeded(e.target.checked)}
                className="w-4 h-4 accent-neon rounded"
              />
              <div>
                <span className="text-sm text-slate-200">Permits & inspection</span>
                <p className="text-xs text-slate-500">We handle city paperwork for you</p>
              </div>
            </label>

            {!compact && (
              <>
                <button
                  type="button"
                  onClick={() => setShowExtras(!showExtras)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 text-sm text-slate-400 hover:border-white/20 transition-colors"
                >
                  <span>More add-ons (optional)</span>
                  {showExtras ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showExtras && (
                  <div className="space-y-2 pl-1">
                    {QUOTE_EXTRAS.map((extra) => (
                      <label
                        key={extra.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          extras[extra.id] ? 'border-neon/40 bg-neon/5' : 'border-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!extras[extra.id]}
                          onChange={() => toggleExtra(extra.id)}
                          className="w-4 h-4 accent-neon rounded mt-0.5"
                        />
                        <div>
                          <span className="text-sm text-slate-200">{extra.label}</span>
                          <p className="text-xs text-slate-500">{extra.hint}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        </div>

        {/* Estimate — sticky sidebar on desktop */}
        <section className={`rounded-2xl bg-navy-900/60 border border-white/10 ${compact ? 'p-4' : 'p-5 xl:sticky xl:top-24'}`}>
          {!compact && (
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold">Your estimate</h4>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                Live · updates as you go
              </span>
            </div>
          )}
          {compact && (
            <h4 className="font-display font-semibold text-sm mb-3">Estimate breakdown</h4>
          )}

          <ul className="space-y-2.5 mb-4">
            {quote.breakdown.map((line) => (
              <li key={line.id} className="flex justify-between gap-4 text-sm">
                <div className="min-w-0">
                  <span className="text-slate-300">{line.label}</span>
                  {line.detail && (
                    <p className="text-[11px] text-slate-600 truncate">{line.detail}</p>
                  )}
                </div>
                <span className="text-white shrink-0 tabular-nums">{line.display}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 pt-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-500">Estimated total</p>
              {quote.total.low !== quote.total.high && (
                <p className="text-[11px] text-slate-600 mt-0.5">Range depends on on-site conditions</p>
              )}
            </div>
            <p className="font-display font-bold text-2xl text-neon tabular-nums">
              {formatRetailRange(quote.total)}
            </p>
          </div>

          {!compact && (
            <Link
              to="/quote"
              className="btn-primary w-full justify-center mt-5 !py-3"
            >
              Get your exact quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </section>
      </div>

      {!compact && (
      <div className="flex items-start gap-2 text-xs text-slate-500 bg-navy-800/50 rounded-xl p-3 mt-6">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-neon/60" />
        <p>
          This is a planning estimate based on your area&apos;s published rates. A licensed
          evNation electrician confirms the final price after reviewing your home assessment and
          photos.
        </p>
      </div>
      )}
    </div>
  )
}
