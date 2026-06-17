/** Service landmarks for the /service-areas interactive map */

export const STATE_META = {
  CA: { name: 'California', fips: '06' },
  NV: { name: 'Nevada', fips: '32' },
  AZ: { name: 'Arizona', fips: '04' },
  IL: { name: 'Illinois', fips: '17' },
  TX: { name: 'Texas', fips: '48' },
  NJ: { name: 'New Jersey', fips: '34' },
}

export const SERVICE_MAP_MARKERS = [
  {
    id: 'southern-california',
    state: 'CA',
    label: 'Southern California',
    shortLabel: 'So Cal',
    landmark: 'Orange County · LA · San Diego',
    anchor: 'southern-california',
  },
  {
    id: 'central-california',
    state: 'CA',
    label: 'Central California',
    shortLabel: 'Central',
    landmark: 'San Luis Obispo · Central Coast',
    anchor: 'central-california',
    countySlug: 'san-luis-obispo',
  },
  {
    id: 'northern-california',
    state: 'CA',
    label: 'Northern California',
    shortLabel: 'Nor Cal',
    landmark: 'Bay Area · Sacramento · North Coast',
    anchor: 'map-cities-ca',
  },
  {
    id: 'nevada',
    state: 'NV',
    label: 'Nevada',
    shortLabel: 'Nevada',
    landmark: 'Las Vegas · Reno · Clark County',
    anchor: 'nevada',
    countySlug: 'clark-county',
  },
  {
    id: 'arizona',
    state: 'AZ',
    label: 'Arizona',
    shortLabel: 'Arizona',
    landmark: 'Phoenix · Maricopa County',
    anchor: 'arizona',
    countySlug: 'maricopa-county',
  },
  {
    id: 'illinois',
    state: 'IL',
    label: 'Illinois',
    shortLabel: 'Illinois',
    landmark: 'Chicago metro & statewide',
    anchor: 'map-cities-il',
  },
  {
    id: 'texas',
    state: 'TX',
    label: 'Texas',
    shortLabel: 'Texas',
    landmark: 'San Antonio & surrounding areas',
    anchor: 'map-cities-tx',
  },
  {
    id: 'new-jersey',
    state: 'NJ',
    label: 'New Jersey',
    shortLabel: 'New Jersey',
    landmark: 'Statewide service',
    anchor: 'map-cities-nj',
  },
]

export function getMarkersByState() {
  const grouped = {}
  for (const m of SERVICE_MAP_MARKERS) {
    if (!grouped[m.state]) grouped[m.state] = []
    grouped[m.state].push(m)
  }
  return grouped
}

export function getMarkerByState(state) {
  return SERVICE_MAP_MARKERS.find((m) => m.state === state) || null
}

export function getStateFips(stateCode) {
  return STATE_META[stateCode]?.fips ?? null
}
