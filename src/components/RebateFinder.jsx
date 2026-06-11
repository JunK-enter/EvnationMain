import { useState } from 'react'
import { DEFAULT_ZONE_ID, getZoneStateCode, getZoneLabel } from '../data/serviceZones'
import { getStateRebateProgram } from '../data/stateRebatePrograms'
import { buildDriveCleanUrl, getChargerProgramsForZone } from '../data/driveClean'
import ZoneSelect from './ZoneSelect'
import { Search, Gift, ExternalLink, MapPin, Zap } from 'lucide-react'

export default function RebateFinder() {
  const [zone, setZone] = useState(DEFAULT_ZONE_ID)
  const [zip, setZip] = useState('')
  const state = getZoneStateCode(zone)
  const isCalifornia = state === 'CA'
  const stateProgram = !isCalifornia && zone ? getStateRebateProgram(state) : null
  const zipValid = /^\d{5}$/.test(zip)
  const zonePrograms = getChargerProgramsForZone(zone)

  return (
    <div className="glass rounded-2xl p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Gift className="w-5 h-5 text-neon" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Rebate Finder</h3>
          <p className="text-xs text-slate-500">
            {isCalifornia ? 'Powered by California Drive Clean' : 'Discover incentives in your service area'}
          </p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
        <ZoneSelect
          value={zone}
          onChange={setZone}
          className="w-full bg-navy-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white"
          placeholder="Select service area"
        />
      </div>

      {isCalifornia ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-neon/25 bg-neon/[0.04] p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-neon/15 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-neon" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-white">California Drive Clean</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Official state tool — search EV, charger, utility, and income-based incentives by ZIP code.
                  {' '}
                  <a
                    href="https://driveclean.ca.gov/search-incentives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon hover:underline inline-flex items-center gap-0.5"
                  >
                    driveclean.ca.gov
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>

            <label className="block text-xs font-medium text-slate-400 mb-1.5">Your California ZIP code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="e.g. 12345"
              className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 mobile-input text-sm text-white placeholder:text-slate-600 mb-3"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={buildDriveCleanUrl({ zip, chargingOnly: true })}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-primary justify-center !py-2.5 !text-sm flex-1 ${!zipValid ? 'opacity-60 pointer-events-none' : ''}`}
                aria-disabled={!zipValid}
              >
                <Zap className="w-4 h-4" />
                Charger incentives
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
              <a
                href={buildDriveCleanUrl({ zip, chargingOnly: false })}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-secondary justify-center !py-2.5 !text-sm flex-1 ${!zipValid ? 'opacity-60 pointer-events-none' : ''}`}
                aria-disabled={!zipValid}
              >
                All incentives
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {!zipValid && (
              <p className="text-[11px] text-slate-500 mt-2">Enter a 5-digit ZIP to open your personalized results.</p>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neon/80 font-semibold mb-2">
              Popular in {getZoneLabel(zone) || 'California'}
            </p>
            <ul className="space-y-2 max-h-44 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
              {zonePrograms.map((p) => (
                <li key={p.name} className="glass-light rounded-xl px-3 py-2.5">
                  <p className="text-sm font-medium text-slate-200">{p.name}</p>
                  <p className="text-[11px] text-slate-500">{p.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Amounts and eligibility vary by utility, air district, and income. Drive Clean shows official programs — evNation helps you apply during your install quote.
          </p>
        </div>
      ) : (
        stateProgram && (
          <div className="space-y-4 animate-in">
            <div className="rounded-2xl border border-neon/25 bg-neon/[0.04] p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-neon/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-white">{stateProgram.title}</p>
                  <p className="text-[11px] text-neon/70 mt-0.5">{stateProgram.source}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{stateProgram.description}</p>
                </div>
              </div>

              <a
                href={stateProgram.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center !py-2.5 !text-sm w-full"
              >
                <Zap className="w-4 h-4" />
                View official program
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-neon/80 font-semibold mb-2">
                Programs in {getZoneLabel(zone)}
              </p>
              <ul className="space-y-2">
                {stateProgram.programs.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-light rounded-xl px-3 py-2.5 block hover:border-neon/30 border border-transparent transition-colors group"
                    >
                      <p className="text-sm font-medium text-slate-200 group-hover:text-neon transition-colors inline-flex items-center gap-1">
                        {p.name}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </p>
                      <p className="text-[11px] text-slate-500">{p.note}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Amounts and eligibility vary by utility and income. evNation helps you apply rebates during your install quote.
              {' '}
              California property? Select a CA service area above for{' '}
              <a href="https://driveclean.ca.gov/search-incentives" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">
                Drive Clean
              </a>.
            </p>
          </div>
        )
      )}
    </div>
  )
}
