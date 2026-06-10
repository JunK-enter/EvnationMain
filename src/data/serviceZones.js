/** evNation service areas — California by region; all other markets by state */
export const SERVICE_ZONES = [
  { id: 'zone-1', label: 'Southern California', shortLabel: 'Southern California', state: 'CA', region: 'California', isCalifornia: true, masterZoneKey: 'So Cal' },
  { id: 'zone-2', label: 'Central California', shortLabel: 'Central California', state: 'CA', region: 'California', isCalifornia: true, masterZoneKey: 'Monterey' },
  { id: 'zone-3', label: 'Northern California', shortLabel: 'Northern California', state: 'CA', region: 'California', isCalifornia: true, masterZoneKey: 'No Cal' },
  { id: 'zone-4', label: 'Illinois', shortLabel: 'Illinois', state: 'IL', region: 'Illinois', isCalifornia: false, masterZoneKey: 'Chicago' },
  { id: 'zone-5', label: 'Nevada', shortLabel: 'Nevada', state: 'NV', region: 'Nevada', isCalifornia: false, masterZoneKey: 'Vegas Baby' },
  { id: 'zone-6', label: 'Texas', shortLabel: 'Texas', state: 'TX', region: 'Texas', isCalifornia: false, masterZoneKey: 'Texas' },
  { id: 'zone-7', label: 'New Jersey', shortLabel: 'New Jersey', state: 'NJ', region: 'New Jersey', isCalifornia: false, masterZoneKey: 'NJ' },
  { id: 'zone-8', label: 'Arizona', shortLabel: 'Arizona', state: 'AZ', region: 'Arizona', isCalifornia: false, masterZoneKey: 'AZ' },
]

export const DEFAULT_ZONE_ID = 'zone-1'

export function getZoneById(id) {
  return SERVICE_ZONES.find((z) => z.id === id) || null
}

export function getZoneStateCode(zoneId) {
  return getZoneById(zoneId)?.state || 'CA'
}

export function getZoneLabel(zoneId) {
  return getZoneById(zoneId)?.label || ''
}

export function getCaliforniaZones() {
  return SERVICE_ZONES.filter((z) => z.isCalifornia)
}

export function getStateZones() {
  return SERVICE_ZONES.filter((z) => !z.isCalifornia)
}

/** Master Page zone key — used for zone price detail retail (evnation-master.vercel.app) */
export function getMasterZoneKey(zoneId) {
  return getZoneById(zoneId)?.masterZoneKey || SERVICE_ZONES[0].masterZoneKey
}
