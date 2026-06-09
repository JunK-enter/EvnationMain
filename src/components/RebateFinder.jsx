import { useState } from 'react'
import { DEFAULT_ZONE_ID, getZoneStateCode, getZoneLabel } from '../data/serviceZones'
import { getRebatesForState } from '../data/states'
import ZoneSelect from './ZoneSelect'
import { Search, Gift } from 'lucide-react'

export default function RebateFinder() {
  const [zone, setZone] = useState(DEFAULT_ZONE_ID)
  const state = getZoneStateCode(zone)
  const rebates = zone ? getRebatesForState(state) : null

  return (
    <div className="glass rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Gift className="w-5 h-5 text-neon" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Rebate Finder</h3>
          <p className="text-xs text-slate-500">Discover incentives in your service area</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
        <ZoneSelect
          value={zone}
          onChange={setZone}
          className="w-full bg-navy-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white"
          placeholder="Select service area"
        />
      </div>

      {rebates && (
        <div className="space-y-3 animate-in">
          <p className="text-xs text-slate-500 mb-2">{getZoneLabel(zone)}</p>
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
