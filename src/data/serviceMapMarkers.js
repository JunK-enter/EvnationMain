/** Map projection + service landmarks for the /service-areas interactive map */

export const MAP_VIEW = { width: 960, height: 520, minLng: -130, maxLng: -63, minLat: 23, maxLat: 51 }

export function projectLatLng(lat, lng) {
  const { width, height, minLng, maxLng, minLat, maxLat } = MAP_VIEW
  return {
    x: ((lng - minLng) / (maxLng - minLng)) * width,
    y: ((maxLat - lat) / (maxLat - minLat)) * height,
  }
}

export const CONUS_OUTLINE = [
  [-124.7, 48.4], [-123.1, 46.2], [-124.0, 42.0], [-124.2, 40.0], [-122.5, 37.8],
  [-121.8, 36.6], [-117.6, 32.5], [-111.0, 31.3], [-108.2, 31.3], [-106.4, 31.8],
  [-103.0, 29.3], [-99.0, 26.4], [-97.2, 25.9], [-96.8, 28.3], [-93.9, 29.6],
  [-90.0, 29.0], [-88.0, 30.0], [-87.5, 30.3], [-83.3, 29.8], [-81.0, 25.2],
  [-80.1, 25.2], [-81.0, 30.5], [-75.5, 35.2], [-75.0, 39.0], [-74.0, 40.5],
  [-71.0, 41.3], [-69.9, 43.7], [-67.0, 44.9], [-67.0, 47.5], [-69.5, 47.4],
  [-75.0, 45.0], [-79.8, 43.4], [-82.5, 45.0], [-84.5, 46.5], [-88.5, 48.2],
  [-95.0, 49.0], [-123.5, 49.0], [-124.7, 48.4],
]

export function conusPath() {
  return CONUS_OUTLINE.map(([lng, lat], i) => {
    const { x, y } = projectLatLng(lat, lng)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ') + ' Z'
}

export const SERVICED_STATE_CODES = ['CA', 'NV', 'AZ', 'IL', 'TX', 'NJ']

export const STATE_META = {
  CA: { name: 'California', color: 'rgba(0, 255, 136, 0.14)' },
  NV: { name: 'Nevada', color: 'rgba(0, 255, 136, 0.12)' },
  AZ: { name: 'Arizona', color: 'rgba(0, 255, 136, 0.11)' },
  IL: { name: 'Illinois', color: 'rgba(0, 255, 136, 0.10)' },
  TX: { name: 'Texas', color: 'rgba(0, 255, 136, 0.10)' },
  NJ: { name: 'New Jersey', color: 'rgba(0, 255, 136, 0.10)' },
}

export const STATE_GLOWS = [
  { state: 'CA', lat: 37.2, lng: -119.5, rx: 78, ry: 130 },
  { state: 'NV', lat: 39.3, lng: -116.6, rx: 38, ry: 72 },
  { state: 'AZ', lat: 34.2, lng: -111.6, rx: 42, ry: 58 },
  { state: 'IL', lat: 40.6, lng: -89.4, rx: 36, ry: 52 },
  { state: 'TX', lat: 31.5, lng: -99.4, rx: 62, ry: 78 },
  { state: 'NJ', lat: 40.2, lng: -74.7, rx: 28, ry: 38 },
]

export const SERVICE_MAP_MARKERS = [
  {
    id: 'southern-california',
    state: 'CA',
    label: 'Southern California',
    landmark: 'Orange County · LA · San Diego',
    lat: 33.67,
    lng: -117.78,
    anchor: 'southern-california',
    primary: true,
  },
  {
    id: 'central-california',
    state: 'CA',
    label: 'Central California',
    landmark: 'San Luis Obispo · Central Coast',
    lat: 35.28,
    lng: -120.66,
    anchor: 'central-california',
    countySlug: 'san-luis-obispo',
  },
  {
    id: 'northern-california',
    state: 'CA',
    label: 'Northern California',
    landmark: 'Bay Area · Sacramento · North Coast',
    lat: 37.9,
    lng: -122.2,
    primary: true,
  },
  {
    id: 'illinois',
    state: 'IL',
    label: 'Illinois',
    landmark: 'Chicago metro & statewide',
    lat: 41.88,
    lng: -87.63,
  },
  {
    id: 'nevada',
    state: 'NV',
    label: 'Nevada',
    landmark: 'Las Vegas · Reno · Clark County',
    lat: 38.5,
    lng: -116.5,
    anchor: 'nevada',
    countySlug: 'clark-county',
    primary: true,
  },
  {
    id: 'texas',
    state: 'TX',
    label: 'Texas',
    landmark: 'San Antonio & surrounding areas',
    lat: 29.42,
    lng: -98.49,
  },
  {
    id: 'new-jersey',
    state: 'NJ',
    label: 'New Jersey',
    landmark: 'Statewide service',
    lat: 40.73,
    lng: -74.17,
  },
  {
    id: 'arizona',
    state: 'AZ',
    label: 'Arizona',
    landmark: 'Phoenix · Maricopa County',
    lat: 33.45,
    lng: -112.07,
    anchor: 'arizona',
    countySlug: 'maricopa-county',
    primary: true,
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
