/** evNation regional service areas — not nationwide coverage */
export const SERVICE_ZONES = [
  { id: 'zone-1', label: 'Southern Cal', shortLabel: 'Southern Cal', state: 'CA', region: 'Southern California' },
  { id: 'zone-2', label: 'Central Cal', shortLabel: 'Central Cal', state: 'CA', region: 'Central California' },
  { id: 'zone-3', label: 'San Fran Bay', shortLabel: 'San Fran Bay', state: 'CA', region: 'San Francisco Bay Area' },
  { id: 'zone-4', label: 'North San Fran Bay', shortLabel: 'North San Fran Bay', state: 'CA', region: 'North San Francisco Bay' },
  { id: 'zone-5', label: 'Chicago 1', shortLabel: 'Chicago', state: 'IL', region: 'Chicago Metro' },
  { id: 'zone-6', label: 'Las Vegas', shortLabel: 'Las Vegas', state: 'NV', region: 'Las Vegas Metro' },
  { id: 'zone-7', label: 'San Antonio Tx', shortLabel: 'San Antonio', state: 'TX', region: 'San Antonio Metro' },
  { id: 'zone-8', label: 'New Jersey', shortLabel: 'New Jersey', state: 'NJ', region: 'New Jersey' },
  { id: 'zone-9', label: 'Arizona', shortLabel: 'Arizona', state: 'AZ', region: 'Arizona' },
  { id: 'zone-10', label: 'Reno Nevada', shortLabel: 'Reno', state: 'NV', region: 'Reno Metro' },
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
