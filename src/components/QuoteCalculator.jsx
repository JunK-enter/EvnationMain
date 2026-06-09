import { useState, useMemo } from 'react'
import { chargerTypes, complexityLevels } from '../data/services'
import { DEFAULT_ZONE_ID, getZoneStateCode } from '../data/serviceZones'
import { calculateQuote } from '../services/quoteCalculator'
import ZoneSelect from './ZoneSelect'
import { Calculator, Info } from 'lucide-react'

export default function QuoteCalculator() {
  const [zone, setZone] = useState(DEFAULT_ZONE_ID)
  const state = getZoneStateCode(zone)
  const [chargerType, setChargerType] = useState('hardwired')
  const [distance, setDistance] = useState(25)
  const [panelUpgrade, setPanelUpgrade] = useState(false)
  const [permitNeeded, setPermitNeeded] = useState(true)
  const [complexity, setComplexity] = useState('simple')

  const quote = useMemo(
    () => calculateQuote({ state, chargerType, distance, panelUpgrade, permitNeeded, complexity }),
    [state, chargerType, distance, panelUpgrade, permitNeeded, complexity]
  )

  const fmt = (n) => `$${n.toLocaleString()}`

  return (
    <div className="glass rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-neon" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Instant Quote Estimate</h3>
          <p className="text-xs text-slate-500">Adjust inputs to see your estimated range</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Service Area</label>
          <ZoneSelect value={zone} onChange={setZone} className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Select area" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Charger Type</label>
          <select value={chargerType} onChange={(e) => setChargerType(e.target.value)} className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white">
            {chargerTypes.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Distance from Panel: {distance} ft</label>
          <input type="range" min="5" max="100" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-neon" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Installation Complexity</label>
          <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white">
            {complexityLevels.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={panelUpgrade} onChange={(e) => setPanelUpgrade(e.target.checked)} className="w-4 h-4 accent-neon rounded" />
          <span className="text-sm text-slate-300">Panel upgrade needed</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={permitNeeded} onChange={(e) => setPermitNeeded(e.target.checked)} className="w-4 h-4 accent-neon rounded" />
          <span className="text-sm text-slate-300">Permit required</span>
        </label>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Installation</span>
          <span className="text-white">{fmt(quote.installCost.low)} – {fmt(quote.installCost.high)}</span>
        </div>
        {quote.panelCost && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Panel Upgrade</span>
            <span className="text-white">{fmt(quote.panelCost.low)} – {fmt(quote.panelCost.high)}</span>
          </div>
        )}
        {quote.permitCost && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Permits</span>
            <span className="text-white">{fmt(quote.permitCost.low)} – {fmt(quote.permitCost.high)}</span>
          </div>
        )}
        <div className="border-t border-white/10 pt-3 flex justify-between">
          <span className="font-display font-semibold">Estimated Total</span>
          <span className="font-display font-bold text-xl text-neon">{fmt(quote.total.low)} – {fmt(quote.total.high)}</span>
        </div>
      </div>

      <div className="flex items-start gap-2 text-xs text-slate-500 bg-navy-800/50 rounded-xl p-3">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-neon/60" />
        <p>Final quote requires EVnation review of your home assessment and photos. This estimate is for planning purposes only.</p>
      </div>
    </div>
  )
}
