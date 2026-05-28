import { useState } from 'react'
import { US_STATES, getRebatesForState } from '../data/states'
import { Search, Gift } from 'lucide-react'

export default function RebateFinder() {
  const [state, setState] = useState('')
  const rebates = state ? getRebatesForState(state) : null

  return (
    <div className="glass rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Gift className="w-5 h-5 text-neon" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Rebate Finder</h3>
          <p className="text-xs text-slate-500">Discover incentives available in your state</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full bg-navy-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white"
        >
          <option value="">Select your state</option>
          {US_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
      </div>

      {rebates && (
        <div className="space-y-3 animate-in">
          {Object.entries(rebates).map(([key, value]) => (
            <div key={key} className="glass-light rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-neon font-semibold mb-1">{key}</p>
              <p className="text-sm text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
