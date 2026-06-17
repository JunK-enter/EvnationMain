'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { DEFAULT_ZONE_ID, getZoneStateCode, getZoneLabel } from '../data/serviceZones'
import { getStateRebateProgram } from '../data/stateRebatePrograms'
import { buildDriveCleanUrl, getChargerProgramsForZone } from '../data/driveClean'
import ZoneSelect from './ZoneSelect'
import { useTranslation } from '@/i18n/LocaleProvider'
import {
  Search, Gift, ExternalLink, MapPin, Zap, Sparkles, ArrowRight, ChevronRight,
} from 'lucide-react'

function ProgramLink({ name, note, href, featured = false }) {
  const Tag = href ? 'a' : 'div'
  const props = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...props}
      className={`group flex items-start gap-3 rounded-xl border p-4 transition-colors ${
        featured
          ? 'border-neon/20 bg-neon/[0.04] hover:border-neon/35'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
      } ${href ? 'cursor-pointer' : ''}`}
    >
      <span className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/15 flex items-center justify-center shrink-0 mt-0.5">
        <Zap className="w-3.5 h-3.5 text-neon" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors inline-flex items-center gap-1.5">
          {name}
          {href && <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 shrink-0" />}
        </span>
        <span className="block text-[11px] text-slate-500 mt-1 leading-relaxed">{note}</span>
      </span>
      {href && <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-neon shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />}
    </Tag>
  )
}

export default function RebateFinder({
  zone: controlledZone,
  onZoneChange,
  showZoneSelect = true,
  className = '',
}) {
  const { t } = useTranslation()
  const [internalZone, setInternalZone] = useState(DEFAULT_ZONE_ID)
  const [zip, setZip] = useState('')

  const zone = controlledZone ?? internalZone

  const handleZoneChange = (nextZone) => {
    if (onZoneChange) onZoneChange(nextZone)
    else setInternalZone(nextZone)
    setZip('')
  }
  const state = getZoneStateCode(zone)
  const isCalifornia = state === 'CA'
  const stateProgram = !isCalifornia && zone ? getStateRebateProgram(state) : null
  const zipValid = /^\d{5}$/.test(zip)
  const zonePrograms = getChargerProgramsForZone(zone)
  const zoneLabel = getZoneLabel(zone) || (isCalifornia ? t('common.california') : t('common.yourArea'))

  return (
    <div className={`relative rounded-3xl border border-white/10 bg-navy-900/40 ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/45 to-transparent" aria-hidden />

      <div className="relative z-20 flex flex-col gap-4 border-b border-white/[0.06] bg-white/[0.02] px-5 py-5 sm:flex-row sm:items-center sm:px-7 lg:px-8">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-neon" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-lg text-white">{t('home.rebateFinder.title')}</h3>
            <p className="text-xs text-slate-500 truncate">
              {isCalifornia ? t('home.rebateFinder.caSubtitle') : t('home.rebateFinder.programsIn', { zone: zoneLabel })}
            </p>
          </div>
        </div>
        <div className="w-full sm:w-72 shrink-0">
          {showZoneSelect ? (
            <>
              <label className="sr-only">{t('common.serviceArea')}</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                <ZoneSelect
                  variant="menu"
                  value={zone}
                  onChange={handleZoneChange}
                  className="w-full rounded-xl border border-white/10 bg-navy-800/90 py-2.5 pl-10 pr-4 text-sm text-white"
                  placeholder={t('common.selectServiceArea')}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy-800/50 px-4 py-2.5 text-sm text-slate-300">
              <MapPin className="w-4 h-4 shrink-0 text-neon" />
              <span className="truncate">{zoneLabel}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 min-w-0">
        <div className="p-5 sm:p-7 lg:p-8 lg:border-r border-white/[0.06] min-w-0">
          {isCalifornia ? (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-neon" />
                <p className="font-display font-semibold text-white">{t('home.rebateFinder.searchZip')}</p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon/10 border border-neon/20 text-[10px] font-bold uppercase tracking-wider text-neon">
                  <Sparkles className="w-3 h-3" /> {t('common.official')}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                {t('home.rebateFinder.zipDesc')}{' '}
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

              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {t('home.rebateFinder.zipLabel')}
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder={t('home.rebateFinder.zipPlaceholder')}
                className="w-full bg-navy-800/90 border border-white/10 rounded-xl px-4 py-3.5 mobile-input text-sm text-white placeholder:text-slate-600 mb-4 focus:border-neon/40"
              />

              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href={buildDriveCleanUrl({ zip, chargingOnly: true })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-primary justify-center !py-3 !text-sm ${!zipValid ? 'opacity-50 pointer-events-none' : ''}`}
                  aria-disabled={!zipValid}
                >
                  <Zap className="w-4 h-4" />
                  {t('home.rebateFinder.chargerIncentives')}
                </a>
                <a
                  href={buildDriveCleanUrl({ zip, chargingOnly: false })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-secondary justify-center !py-3 !text-sm ${!zipValid ? 'opacity-50 pointer-events-none' : ''}`}
                  aria-disabled={!zipValid}
                >
                  {t('home.rebateFinder.allIncentives')}
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>

              {!zipValid && (
                <p className="text-xs text-slate-500 mt-3">{t('home.rebateFinder.zipHint')}</p>
              )}
            </>
          ) : stateProgram ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon/80 mb-2">{stateProgram.source}</p>
              <h4 className="font-display font-semibold text-xl text-white mb-3">{stateProgram.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{stateProgram.description}</p>
              <a
                href={stateProgram.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neon hover:text-white transition-colors"
              >
                {t('home.rebateFinder.viewOfficial')}
                <ExternalLink className="w-4 h-4" />
              </a>
            </>
          ) : (
            <p className="text-sm text-slate-400">{t('home.rebateFinder.selectArea')}</p>
          )}
        </div>

        <div className="p-5 sm:p-7 lg:p-8 bg-white/[0.02] min-w-0 border-t lg:border-t-0 border-white/[0.06]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-4">
            {isCalifornia
              ? t('home.rebateFinder.popularIn', { zone: zoneLabel })
              : t('home.rebateFinder.morePrograms', { zone: zoneLabel })}
          </p>

          <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
            {isCalifornia
              ? zonePrograms.map((p) => (
                  <li key={p.name}>
                    <ProgramLink name={p.name} note={p.note} />
                  </li>
                ))
              : stateProgram?.programs.map((p, i) => (
                  <li key={p.name}>
                    <ProgramLink name={p.name} note={p.note} href={p.url} featured={i === 0} />
                  </li>
                ))}
          </ul>

          {!isCalifornia && !stateProgram && (
            <p className="text-sm text-slate-500">{t('home.rebateFinder.chooseRegion')}</p>
          )}
        </div>
      </div>

      <div className="px-5 sm:px-7 lg:px-8 py-4 border-t border-white/[0.06] bg-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
          {t('home.rebateFinder.footerEligibility')}
          {isCalifornia ? t('home.rebateFinder.footerCa') : t('home.rebateFinder.footerNonCa')}
        </p>
        <Link
          href="/quote"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon hover:text-white transition-colors shrink-0"
        >
          {t('home.rebateFinder.applyQuote')} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
