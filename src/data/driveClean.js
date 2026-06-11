/** California Drive Clean — official incentive search (no public API; deep-link only) */
export const DRIVE_CLEAN_BASE = 'https://driveclean.ca.gov/search-incentives'

export function buildDriveCleanUrl({ zip, chargingOnly = false, includeIncome = true } = {}) {
  const params = new URLSearchParams()
  const cleaned = String(zip || '').replace(/\D/g, '').slice(0, 5)
  if (cleaned.length === 5) params.set('field_zipcode_target_id', cleaned)
  if (chargingOnly) params.set('incentive_type', 'Charging')
  if (includeIncome) {
    params.set('include_income', '1')
    params.set('include_income_triggered', '1')
  }
  const qs = params.toString()
  return qs ? `${DRIVE_CLEAN_BASE}?${qs}` : DRIVE_CLEAN_BASE
}

export const DRIVE_CLEAN_CHARGER_PROGRAMS = [
  { name: 'SCE Charge Ready Home', note: 'Southern California Edison — home charging infrastructure' },
  { name: 'PG&E EV Charge Network', note: 'Pacific Gas & Electric — residential charging rebates' },
  { name: 'SDG&E Power Your Drive', note: 'San Diego Gas & Electric — charger incentives' },
  { name: 'LADWP Charge Up LA!', note: 'Los Angeles DWP — Level 2 charger rebates' },
  { name: 'South Coast AQMD', note: 'Orange County & LA basin — EV charging incentive' },
]

const PROGRAMS_BY_ZONE = {
  'zone-1': ['SCE Charge Ready Home', 'LADWP Charge Up LA!', 'South Coast AQMD'],
  'zone-2': ['PG&E EV Charge Network'],
  'zone-3': ['PG&E EV Charge Network', 'SDG&E Power Your Drive'],
}

export function getChargerProgramsForZone(zoneId) {
  const names = PROGRAMS_BY_ZONE[zoneId]
  if (!names) return DRIVE_CLEAN_CHARGER_PROGRAMS.slice(0, 3)
  return DRIVE_CLEAN_CHARGER_PROGRAMS.filter((p) => names.includes(p.name))
}
